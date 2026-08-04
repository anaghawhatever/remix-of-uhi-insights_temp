import { useMemo, useState } from "react";
import { ResponsiveContainer, ComposedChart, Area, Line, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";
import { combinedGrowth } from "@/lib/uhi-data";
import { ChartContainer } from "./primitives";

type ChartType = "line" | "area" | "bar";
type ViewType = "cumulative" | "incremental";
type Range = "ALL" | "1Y" | "6M";

const SERIES: Array<{ key: string; name: string; color: string; paused?: boolean }> = [
  { key: "PMJAY", name: "PMJAY Hospital Discovery", color: "var(--color-chart-blue)" },
  { key: "Blood", name: "Blood Bank Discovery", color: "var(--color-bar-coral)" },
  { key: "Tele", name: "Teleconsultation", color: "var(--color-chart-teal)", paused: true },
  { key: "Phys", name: "Physical Consultation", color: "var(--color-chart-purple)" },
  { key: "Amb", name: "Ambulance Discovery", color: "var(--color-chart-orange)" },
  { key: "JAK", name: "Jan Aushadhi Kendra Discovery", color: "var(--color-chart-green)" },
  { key: "JAM", name: "Jan Aushadhi Medicine Discovery", color: "oklch(0.6 0.15 140)" },
  { key: "NOTTO", name: "NOTTO Service Discovery", color: "oklch(0.5 0.18 280)" },
  { key: "AMRIT", name: "AMRIT Pharmacy Discovery", color: "oklch(0.55 0.16 20)" },
];


export function CombinedGrowthChart() {
  const [chart, setChart] = useState<ChartType>("area");
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


  return (
    <ChartContainer label="TRAJECTORY" title="Combined Growth · All Services" onDownload={() => window.print()}>
      <div className="flex flex-wrap items-center gap-4 mb-4 text-xs">
        <ToggleGroup label="Chart:" value={chart} onChange={setChart} options={[["line","Line"],["area","Area"],["bar","Bar"]]} />
        <ToggleGroup label="View:" value={view} onChange={setView} options={[["cumulative","Cumulative"],["incremental","Incremental"]]} />
        <ToggleGroup label="Range:" value={range} onChange={setRange} options={[["ALL","ALL"],["1Y","1Y"],["6M","6M"]]} />
        <div className="flex flex-wrap items-center gap-3 ml-auto">
          {SERIES.map((s) => (
            <span key={s.key} className="flex items-center gap-1.5 text-[11px]">
              <span className="size-2.5 rounded-full" style={{ background: s.color, outline: s.paused ? `1.5px solid var(--color-paused)` : "none", outlineOffset: 1 }} />
              {s.name}
            </span>
          ))}
          <span className="flex items-center gap-1.5 text-[11px]">
            <span className="w-4 border-t-2 border-dashed border-[var(--color-navy)]" /> Overall (Avg)
          </span>
        </div>
      </div>

      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 10, right: 16, left: 16, bottom: 24 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="month" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => v >= 1000 ? `${Math.round(v/1000)}K` : `${v}`} />
            <Tooltip contentStyle={{ fontSize: 12, borderRadius: 6 }} />
            <Legend wrapperStyle={{ display: "none" }} />
            {SERIES.map((s) => {
              if (chart === "bar") return <Bar key={s.key} dataKey={s.key} fill={s.color} name={s.name} />;
              if (chart === "area") return <Area key={s.key} type="monotone" dataKey={s.key} stroke={s.color} fill={s.color} fillOpacity={0.25} name={s.name} />;
              return <Line key={s.key} type="monotone" dataKey={s.key} stroke={s.color} strokeWidth={2} dot={false} name={s.name} />;
            })}
            <Line type="monotone" dataKey="Overall" stroke="var(--color-navy)" strokeDasharray="6 4" strokeWidth={2} dot={false} name="Overall (Avg)" />
          </ComposedChart>
        </ResponsiveContainer>
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
