import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip as RTooltip, Label } from "recharts";
import { liveServices, serviceStatus, serviceColor, METRIC_SHEETS, openSheet, type ServiceKey } from "@/lib/uhi-data";
import { StatusBadge, CountUp, Tooltip } from "./primitives";
import { Info, ArrowRight, Download } from "lucide-react";

type Props = { service: ServiceKey; kind: "discovery" | "fulfilment" };

export function ServiceCard({ service, kind }: Props) {
  const d = liveServices[service] as typeof liveServices[ServiceKey];
  const status = serviceStatus[service];
  const isDiscovery = kind === "discovery";
  const totalSearches = (d as { totalSearches?: number }).totalSearches ?? 0;
  const totalBookings = (d as { totalBookings?: number }).totalBookings ?? 0;
  const graphTitle = isDiscovery ? "Number of Searches" : "Number of Bookings";
  const yLabel = isDiscovery ? "Searches" : "Bookings";
  const initial = service.charAt(0);
  const accent = isDiscovery ? "var(--color-bar-coral)" : "var(--color-chart-teal)";
  const iconBg = serviceColor[service];


  const handleDownload = () => {
    const rows = [
      { metric: "Total Searches", value: totalSearches },
      ...(isDiscovery ? [] : [{ metric: "Total Bookings", value: totalBookings }]),
      { metric: "EUAs Integrated", value: d.euas },
      { metric: "HSPAs Integrated", value: d.hspas },
      { metric: "Live Since", value: d.liveSince },
      ...d.monthly.map((m) => ({ metric: `Month · ${m.month}`, value: m.value })),
    ];
    downloadCSV(`${service.replace(/\s+/g, "-").toLowerCase()}.csv`, rows);
  };

  return (
    <div className="card-cream p-3 sm:p-4 flex flex-col gap-2.5 min-w-0">
      <div className="flex items-start gap-2.5 min-w-0">
        <div className="size-9 shrink-0 rounded-md flex items-center justify-center text-white font-bold" style={{ background: iconBg }}>
          {initial}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm sm:text-base font-medium leading-tight break-words">{service}</h3>
          <div className="mt-1 flex items-center gap-2">
            <StatusBadge status={status} />
          </div>
        </div>
        <button onClick={handleDownload} aria-label="Download" className="shrink-0 text-muted-foreground hover:text-foreground p-1 -m-1">
          <Download className="size-4" />
        </button>
      </div>

      {/* Top metrics: for discovery just Total Searches; for fulfilment both Searches + Bookings */}
      {isDiscovery ? (
        <div className="min-w-0">
          <div className="section-label">TOTAL SEARCHES</div>
          <div className="num-amber text-[clamp(1.5rem,2.2vw,2rem)] leading-none mt-0.5"><CountUp value={totalSearches} /></div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 min-w-0">
          <div className="min-w-0">
            <div className="section-label">TOTAL SEARCHES</div>
            <div className="num-amber text-[clamp(1.25rem,1.9vw,1.75rem)] leading-none mt-0.5"><CountUp value={totalSearches} /></div>
          </div>
          <div className="min-w-0">
            <div className="section-label">TOTAL BOOKINGS</div>
            <div className="num-amber text-[clamp(1.25rem,1.9vw,1.75rem)] leading-none mt-0.5"><CountUp value={totalBookings} /></div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-2 min-w-0">
        <MiniMetric label="END USER APPS (EUAs)" value={d.euas} />
        <MiniMetric label="PROVIDER APPS (HSPAs)" value={d.hspas} />
        <MiniMetric label="LIVE SINCE" value={d.liveSince} />
        <MiniMetric label={d.extraLabel.toUpperCase()} value={d.extraValue} />
      </div>



      <div className="mt-1">
        <div className="flex items-center justify-between">
          <div className="section-label">{graphTitle}</div>
          <Tooltip content={<><div className="font-semibold mb-1">{graphTitle}</div><div>Monthly {yLabel.toLowerCase()} processed by the {service} service.</div></>}>
            <Info className="size-3.5" />
          </Tooltip>
        </div>
        <div className="h-36 mt-1">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={[...d.monthly]} margin={{ top: 6, right: 10, left: 14, bottom: 22 }}>
              <XAxis dataKey="month" tick={{ fontSize: 10 }} tickLine={false} axisLine={{ stroke: "#cbd5e1" }}>
                <Label value="Month" position="insideBottom" offset={-10} style={{ fontSize: 10, fill: "var(--color-muted-foreground)" }} />
              </XAxis>
              <YAxis tick={{ fontSize: 10 }} tickLine={false} axisLine={{ stroke: "#cbd5e1" }} width={38}>
                <Label value={yLabel} angle={-90} position="insideLeft" offset={-2} style={{ fontSize: 10, fill: "var(--color-muted-foreground)", textAnchor: "middle" }} />
              </YAxis>
              <RTooltip cursor={{ fill: "rgba(0,0,0,0.04)" }} contentStyle={{ fontSize: 12, borderRadius: 6 }} />
              <Bar dataKey="value" fill={accent} radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>




      <button className="mt-auto w-full bg-white border border-border rounded-md py-2 px-3 text-xs font-medium hover:border-[var(--color-navy)] transition flex items-center justify-between">
        View Details <ArrowRight className="size-3.5" />
      </button>
    </div>
  );
}

function MiniMetric({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-white/60 rounded-md p-2 border border-border/50 min-w-0">
      <div className="text-[10px] tracking-wider text-muted-foreground font-semibold break-words">{label}</div>
      <div className="text-sm font-semibold mt-0.5 break-words">{value}</div>
    </div>
  );
}


