import { useMemo, useState } from "react";
import { ResponsiveContainer, ComposedChart, Area, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";
import { combinedGrowth, METRIC_SHEETS, openSheet } from "@/lib/uhi-data";
import { ChartContainer } from "./primitives";

type ViewType = "cumulative" | "incremental";
type Range = "ALL" | "1Y" | "6M";

const SERIES: Array<{ key: string; name: string; color: string; paused?: boolean }> = [
  { key: "PMJAY", name: "PMJAY Hospital Discovery", color: "var(--color-chart-blue)" },
  { key: "Blood", name: "Blood Bank Discovery", color: "var(--color-bar-coral)" },
  { key: "Tele", name: "Teleconsultation", color: "var(--color-chart-teal)", paused: true },
  { key: "Phys", name: "Physical Consultation", color: "var(--color-chart-purple)" },
  { key: "Amb", name: "Ambulance Booking", color: "var(--color-chart-orange)" },
  { key: "JAM", name: "Jan Aushadhi Medicine Discovery", color: "oklch(0.6 0.15 140)" },
  { key: "NOTTO", name: "NOTTO Service Discovery", color: "oklch(0.5 0.18 280)" },
  { key: "AMRIT", name: "AMRIT Pharmacy Discovery", color: "oklch(0.55 0.16 20)" },
];


export function CombinedGrowthChart() {
  const [view, setView] = useState<ViewType>("cumulative");
  const [range, setRange] = useState<Range>("1Y");

  const data = useMemo(() => {
    const arr = combinedGrowth.map((d) => ({ ...d }));
    const sliced = range === "6M" ? arr.slice(-6) : range === "1Y" ? arr.slice(-10) : arr;
    if (view === "incremental") {
      return sliced.map((d, i, all) => {
        if (i === 0) return d;
        const prev = all[i - 1];
        const out: Record<string, number | string> = { month: d.month };
        for (const k of ["PMJAY", "Blood", "Tele", "Phys", "Amb", "JAK", "JAM", "NOTTO", "AMRIT", "Overall"] as const) {
          out[k] = Math.max(0, (d as never as Record<string, number>)[k] - (prev as never as Record<string, number>)[k]);
        }
        return out as unknown as typeof d;
      });
    }
    return sliced;
  }, [view, range]);

  const [hidden, setHidden] = useState<Record<string, boolean>>({});
  const toggle = (k: string) => setHidden((h) => ({ ...h, [k]: !h[k] }));

  return (
    <ChartContainer label="TRAJECTORY" title="Combined Growth · All Services" onDownload={() => window.print()}>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-3 text-[11px]">
        <ToggleGroup label="Chart:" value={chart} onChange={setChart} options={[["line","Line"],["area","Area"],["bar","Bar"]]} />
        <ToggleGroup label="View:" value={view} onChange={setView} options={[["cumulative","Cumulative"],["incremental","Incremental"]]} />
        <ToggleGroup label="Range:" value={range} onChange={setRange} options={[["ALL","ALL"],["1Y","1Y"],["6M","6M"]]} />
      </div>

      <div className="flex flex-col lg:flex-row gap-4 min-w-0">
        <div className="h-[380px] min-w-0 lg:w-[68%]">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data} margin={{ top: 10, right: 12, left: 8, bottom: 16 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => v >= 1000 ? `${Math.round(v/1000)}K` : `${v}`} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 6 }} />
              <Legend wrapperStyle={{ display: "none" }} />
              {SERIES.filter((s) => !hidden[s.key]).map((s) => {
                if (chart === "bar") return <Bar key={s.key} dataKey={s.key} fill={s.color} name={s.name} />;
                if (chart === "area") return <Area key={s.key} type="monotone" dataKey={s.key} stroke={s.color} fill={s.color} fillOpacity={0.25} name={s.name} />;
                return <Line key={s.key} type="monotone" dataKey={s.key} stroke={s.color} strokeWidth={2} dot={false} name={s.name} />;
              })}
              {!hidden["Overall"] && (
                <Line type="monotone" dataKey="Overall" stroke="var(--color-navy)" strokeDasharray="6 4" strokeWidth={2} dot={false} name="Overall (Avg)" />
              )}
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <div className="lg:w-[32%] min-w-0 border border-border rounded-md p-2 self-start">
          <div className="text-[10px] font-semibold tracking-widest text-muted-foreground mb-1.5">SERIES</div>
          <ul className="space-y-0.5">
            {[...SERIES, { key: "Overall", name: "Overall (Avg)", color: "var(--color-navy)" }].map((s) => {
              const off = !!hidden[s.key];
              return (
                <li key={s.key}>
                  <button
                    onClick={() => toggle(s.key)}
                    className={`flex w-full min-w-0 items-center gap-2 rounded px-1.5 py-1 text-left text-[11px] hover:bg-muted ${off ? "opacity-40" : ""}`}
                  >
                    <span className="size-3 shrink-0 rounded-[3px] border" style={{ background: off ? "transparent" : s.color, borderColor: s.color }} />
                    <span className="truncate">{s.name}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </ChartContainer>
  );
}

function ToggleGroup<T extends string>({ label, value, onChange, options }: {
  label: string; value: T; onChange: (v: T) => void; options: Array<[T, string]>;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-muted-foreground">{label}</span>
      <div className="flex bg-muted rounded-md p-0.5">
        {options.map(([v, l]) => (
          <button
            key={v}
            onClick={() => onChange(v)}
            className={`px-3 py-1 rounded text-xs font-medium transition ${value === v ? "bg-[var(--color-navy)] text-white" : "text-foreground hover:bg-white"}`}
          >{l}</button>
        ))}
      </div>
    </div>
  );
}
