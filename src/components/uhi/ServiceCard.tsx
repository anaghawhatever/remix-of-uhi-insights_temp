import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip as RTooltip, Label } from "recharts";
import { liveServices, serviceStatus, type ServiceKey } from "@/lib/uhi-data";
import { StatusBadge, CountUp, Tooltip } from "./primitives";
import { Info, ArrowRight } from "lucide-react";

type Props = { service: ServiceKey; kind: "discovery" | "fulfilment" };

export function ServiceCard({ service, kind }: Props) {
  const d = liveServices[service] as typeof liveServices[ServiceKey];
  const status = serviceStatus[service];
  const isDiscovery = kind === "discovery";
  const value = isDiscovery ? (d as { totalSearches: number }).totalSearches : (d as { totalBookings: number }).totalBookings;
  const metricLabel = isDiscovery ? "TOTAL SEARCHES" : "TOTAL BOOKINGS";
  const graphTitle = isDiscovery ? "Number of Searches" : "Number of Bookings";
  const yLabel = isDiscovery ? "Searches" : "Bookings";
  const initial = service.charAt(0);
  const accent = isDiscovery ? "var(--color-bar-coral)" : "var(--color-chart-teal)";
  const iconBg = {
    "PMJAY Hospital Discovery": "var(--color-chart-blue)",
    "Blood Bank Discovery": "var(--color-bar-coral)",
    "Ambulance Discovery": "var(--color-chart-orange)",
    "Teleconsultation": "var(--color-chart-teal)",
    "Physical Consultation": "var(--color-chart-purple)",
    "Jan Aushadhi Kendra Discovery": "var(--color-chart-green)",
  }[service];

  return (
    <div className="card-cream p-5 flex flex-col gap-4">
      <div className="flex items-start gap-3">
        <div className="size-12 rounded-md flex items-center justify-center text-white font-bold" style={{ background: iconBg }}>
          {initial}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold leading-tight">{service}</h3>
          <div className="mt-1.5"><StatusBadge status={status} /></div>
        </div>
      </div>

      <div>
        <div className="section-label">{metricLabel}</div>
        <div className="num-amber text-5xl leading-none mt-1"><CountUp value={value} /></div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <MiniMetric label="EUAS INTEGRATED" value={d.euas} />
        <MiniMetric label="HSPAS INTEGRATED" value={d.hspas} />
        <MiniMetric label="LIVE SINCE" value={d.liveSince} />
        <MiniMetric label={d.extraLabel.toUpperCase()} value={d.extraValue} />
      </div>

      <div className="mt-2">
        <div className="flex items-center justify-between">
          <div className="section-label">{graphTitle}</div>
          <Tooltip content={<><div className="font-semibold mb-1">{graphTitle}</div><div>Monthly {yLabel.toLowerCase()} processed by the {service} service.</div></>}>
            <Info className="size-3.5" />
          </Tooltip>
        </div>
        <div className="h-44 mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={[...d.monthly]} margin={{ top: 8, right: 12, left: 18, bottom: 28 }}>
              <XAxis dataKey="month" tick={{ fontSize: 10 }} tickLine={false} axisLine={{ stroke: "#cbd5e1" }}>
                <Label value="Month" position="insideBottom" offset={-12} style={{ fontSize: 10, fill: "var(--color-muted-foreground)" }} />
              </XAxis>
              <YAxis tick={{ fontSize: 10 }} tickLine={false} axisLine={{ stroke: "#cbd5e1" }} width={42}>
                <Label value={yLabel} angle={-90} position="insideLeft" offset={-2} style={{ fontSize: 10, fill: "var(--color-muted-foreground)", textAnchor: "middle" }} />
              </YAxis>
              <RTooltip cursor={{ fill: "rgba(0,0,0,0.04)" }} contentStyle={{ fontSize: 12, borderRadius: 6 }} />
              <Bar dataKey="value" fill={accent} radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {status === "paused" && (
        <div className="text-xs text-[var(--color-paused)] font-medium">Service currently paused.</div>
      )}

      <button className="mt-auto w-full bg-white border border-border rounded-md py-3 px-4 text-sm font-medium hover:border-[var(--color-navy)] transition flex items-center justify-between">
        View Details <ArrowRight className="size-4" />
      </button>
    </div>
  );
}

function MiniMetric({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-white/60 rounded-md p-3 border border-border/50">
      <div className="text-[10px] tracking-wider text-muted-foreground font-semibold">{label}</div>
      <div className="text-base font-semibold mt-0.5">{value}</div>
    </div>
  );
}
