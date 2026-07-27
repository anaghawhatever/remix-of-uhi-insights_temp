import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip as RTooltip, Label } from "recharts";
import { liveServices, serviceStatus, serviceColor, euaPartners, hspaPartners, type ServiceKey } from "@/lib/uhi-data";
import { StatusBadge, CountUp, Tooltip, ServiceTag, downloadCSV } from "./primitives";
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

  // Per-service integrator tables (fulfilment cards)
  const euaRows = !isDiscovery
    ? euaPartners
        .filter((p) => p.service.includes(service.replace(" Discovery", "")))
        .map((p) => ({
          name: p.name,
          searches: p.searches,
          bookings: Math.max(0, Math.round(p.searches * (totalSearches > 0 ? totalBookings / totalSearches : 0.04))),
        }))
    : [];
  const hspaRows = !isDiscovery
    ? hspaPartners
        .filter((p) => p.service.includes(service.replace(" Discovery", "")))
        .map((p) => ({
          name: p.name,
          searches: Math.max(0, Math.round(p.bookings * (totalBookings > 0 ? totalSearches / Math.max(totalBookings, 1) : 25))),
          bookings: p.bookings,
        }))
    : [];

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
    <div className="card-cream p-4 flex flex-col gap-3">
      <div className="flex items-start gap-3">
        <div className="size-10 rounded-md flex items-center justify-center text-white font-bold" style={{ background: iconBg }}>
          {initial}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-semibold leading-tight truncate">{service}</h3>
          <div className="mt-1 flex items-center gap-2">
            <StatusBadge status={status} />
          </div>
        </div>
        <button onClick={handleDownload} aria-label="Download" className="text-muted-foreground hover:text-foreground p-1 -m-1">
          <Download className="size-4" />
        </button>
      </div>

      {/* Top metrics: for discovery just Total Searches; for fulfilment both Searches + Bookings */}
      {isDiscovery ? (
        <div>
          <div className="section-label">TOTAL SEARCHES</div>
          <div className="num-amber text-4xl leading-none mt-0.5"><CountUp value={totalSearches} /></div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="section-label">TOTAL SEARCHES</div>
            <div className="num-amber text-3xl leading-none mt-0.5"><CountUp value={totalSearches} /></div>
          </div>
          <div>
            <div className="section-label">TOTAL BOOKINGS</div>
            <div className="num-amber text-3xl leading-none mt-0.5"><CountUp value={totalBookings} /></div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-2">
        <MiniMetric label="PATIENT APPS (EUAs)" value={d.euas} />
        <MiniMetric label="PROVIDER APPS (HSPAs)" value={d.hspas} />
        <MiniMetric label="LIVE SINCE" value={d.liveSince} />
        <MiniMetric label={d.extraLabel.toUpperCase()} value={d.extraValue} />
      </div>

      {/* Fulfilment inner tables */}
      {!isDiscovery && (
        <div className="space-y-3">
          <IntegratorTable title="Patient Applications (EUAs)" rows={euaRows} />
          <IntegratorTable title="Provider Applications (HSPAs)" rows={hspaRows} />
        </div>
      )}

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

      {status === "paused" && (
        <div className="text-xs text-[var(--color-paused)] font-medium">Service currently paused.</div>
      )}

      <button className="mt-auto w-full bg-white border border-border rounded-md py-2 px-3 text-xs font-medium hover:border-[var(--color-navy)] transition flex items-center justify-between">
        View Details <ArrowRight className="size-3.5" />
      </button>
    </div>
  );
}

function MiniMetric({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-white/60 rounded-md p-2 border border-border/50">
      <div className="text-[10px] tracking-wider text-muted-foreground font-semibold">{label}</div>
      <div className="text-sm font-semibold mt-0.5">{value}</div>
    </div>
  );
}

function IntegratorTable({ title, rows }: { title: string; rows: Array<{ name: string; searches: number; bookings: number }> }) {
  if (rows.length === 0) return null;
  return (
    <div>
      <div className="text-[10px] tracking-wider text-[var(--color-navy)] font-semibold mb-1">{title.toUpperCase()}</div>
      <div className="border border-border rounded-md overflow-hidden">
        <table className="w-full text-xs">
          <thead className="bg-muted/40">
            <tr>
              <th className="text-left py-1 px-2 text-[10px] font-semibold text-muted-foreground">Partner</th>
              <th className="text-right py-1 px-2 text-[10px] font-semibold text-muted-foreground">Searches</th>
              <th className="text-right py-1 px-2 text-[10px] font-semibold text-muted-foreground">Bookings</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.name} className="border-t border-border/40">
                <td className="py-1 px-2 truncate max-w-[130px]" title={r.name}>{r.name}</td>
                <td className="py-1 px-2 text-right tabular-nums">{r.searches.toLocaleString("en-IN")}</td>
                <td className="py-1 px-2 text-right tabular-nums num-amber">{r.bookings.toLocaleString("en-IN")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
