import { useMemo, useState } from "react";
import { ChartContainer, downloadCSV, Tooltip, PrivateBadge } from "./primitives";
import { Info } from "lucide-react";

const AUDIT_SERVICES = ["All Services", "Physical Consultation", "Teleconsultation"] as const;
const RANGES = ["1W", "1M", "6M", "1Y", "Custom"] as const;
const ENDPOINTS = ["on_confirm", "on_update", "on_status", "on_cancel"] as const;

type Svc = (typeof AUDIT_SERVICES)[number];
type Range = (typeof RANGES)[number];

const baseSat: Record<Svc, Record<(typeof ENDPOINTS)[number], number>> = {
  "All Services":            { on_confirm: 48.2, on_update: 36.4, on_status: 52.1, on_cancel: 30.7 },
  "Physical Consultation":   { on_confirm: 62.5, on_update: 41.0, on_status: 58.3, on_cancel: 34.2 },
  "Teleconsultation":        { on_confirm: 39.1, on_update: 28.7, on_status: 47.9, on_cancel: 22.4 },
};

const rangeAdj: Record<Range, number> = { "1W": -3.2, "1M": 0, "6M": 2.1, "1Y": 4.6, "Custom": 0 };

function FilterBar({
  svc, setSvc, range, setRange, start, setStart, end, setEnd,
}: {
  svc: Svc; setSvc: (s: Svc) => void; range: Range; setRange: (r: Range) => void;
  start: string; setStart: (s: string) => void; end: string; setEnd: (s: string) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <select
        value={svc}
        onChange={(e) => setSvc(e.target.value as Svc)}
        className="text-xs border border-white/30 bg-white/10 text-white rounded px-2 py-1 min-w-[160px]"
      >
        {AUDIT_SERVICES.map((s) => <option key={s} className="text-foreground">{s}</option>)}
      </select>
      <div className="flex items-center gap-1 rounded border border-white/30 bg-white/10 p-0.5">
        {RANGES.map((r) => (
          <button key={r} onClick={() => setRange(r)}
            className={`text-[11px] px-2 py-1 rounded ${range === r ? "bg-white text-[var(--color-navy)] font-semibold" : "text-white/90 hover:bg-white/10"}`}>
            {r}
          </button>
        ))}
      </div>
      {range === "Custom" && (
        <div className="flex items-center gap-1">
          <input type="date" value={start} onChange={(e) => setStart(e.target.value)}
            className="text-[11px] bg-white/10 border border-white/30 text-white rounded px-2 py-1" />
          <span className="text-white/70 text-xs">→</span>
          <input type="date" value={end} onChange={(e) => setEnd(e.target.value)}
            className="text-[11px] bg-white/10 border border-white/30 text-white rounded px-2 py-1" />
        </div>
      )}
    </div>
  );
}

function SatCell({ pct }: { pct: number }) {
  const color = pct >= 60 ? "var(--color-live)" : pct >= 40 ? "var(--color-caution)" : "var(--color-paused)";
  return (
    <div className="flex items-center gap-2">
      <span className="num-amber tabular-nums text-xs w-10 text-right">{pct.toFixed(1)}%</span>
      <span className="flex-1 h-1 bg-muted/40 rounded overflow-hidden">
        <span className="block h-full rounded" style={{ width: `${pct}%`, background: color }} />
      </span>
    </div>
  );
}

export function AuditSaturationSection() {
  const [svc1, setSvc1] = useState<Svc>("All Services");
  const [range1, setRange1] = useState<Range>("1M");
  const [start1, setStart1] = useState("");
  const [end1, setEnd1] = useState("");

  const endpointRows = useMemo(() => {
    const adj = rangeAdj[range1];
    return ENDPOINTS.map((ep) => {
      const sat = Math.max(0, Math.min(100, baseSat[svc1][ep] + adj));
      const called = svc1 === "All Services" ? 24800 : svc1 === "Physical Consultation" ? 4200 : 20600;
      const audited = Math.round((called * sat) / 100);
      return { endpoint: ep, called, audited, sat: Math.round(sat * 10) / 10 };
    });
  }, [svc1, range1]);

  const overallCalled = endpointRows.reduce((a, r) => a + r.called, 0);
  const overallAudited = endpointRows.reduce((a, r) => a + r.audited, 0);
  const overallSat = overallCalled > 0 ? Math.round((overallAudited / overallCalled) * 1000) / 10 : 0;

  return (
    <section>
      <div className="section-label mb-1">PRIVATE VIEW ONLY</div>
      <h2 className="text-xl font-semibold tracking-tight">Audit API Saturation</h2>
      <p className="text-xs italic text-muted-foreground mt-0.5 mb-3">
        Share of fulfilment callbacks where the corresponding audit endpoint was also invoked.
      </p>

      <ChartContainer
        label="ENDPOINT VIEW"
        title="Audit API Saturation by Endpoint"
        right={<FilterBar svc={svc1} setSvc={setSvc1} range={range1} setRange={setRange1}
          start={start1} setStart={setStart1} end={end1} setEnd={setEnd1} />}
        onDownload={() => downloadCSV("audit-endpoints.csv", endpointRows)}
      >
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="py-1 px-2 text-[10px] tracking-wider text-[var(--color-navy)] font-semibold">
                <span className="inline-flex items-center gap-1">
                  AUDIT ENDPOINT
                  <Tooltip content={<><div className="font-semibold mb-1">Saturation calculation</div><div>Audit hits ÷ corresponding gateway calls per endpoint. Overall row uses aggregated totals.</div></>}>
                    <Info className="size-3" />
                  </Tooltip>
                </span>
              </th>
              <th className="py-1 px-2 text-[10px] tracking-wider text-[var(--color-navy)] font-semibold text-right">GATEWAY CALLS</th>
              <th className="py-1 px-2 text-[10px] tracking-wider text-[var(--color-navy)] font-semibold text-right">AUDIT HITS</th>
              <th className="py-1 px-2 text-[10px] tracking-wider text-[var(--color-navy)] font-semibold w-[200px]">SATURATION %</th>
            </tr>
          </thead>
          <tbody>
            {endpointRows.map((r, i) => (
              <tr key={r.endpoint} className={i % 2 ? "bg-muted/40" : ""}>
                <td className="py-1 px-2 font-medium font-mono text-[11px]">{r.endpoint}</td>
                <td className="py-1 px-2 text-right tabular-nums text-[11px]">{r.called.toLocaleString("en-IN")}</td>
                <td className="py-1 px-2 text-right tabular-nums text-[11px]">{r.audited.toLocaleString("en-IN")}</td>
                <td className="py-1 px-2"><SatCell pct={r.sat} /></td>
              </tr>
            ))}
            <tr className="border-t-2 border-[var(--color-navy)] bg-[var(--color-navy)]/5">
              <td className="py-1.5 px-2 font-semibold text-[var(--color-navy)] text-[11px]">Overall Audit API Saturation</td>
              <td className="py-1.5 px-2 text-right tabular-nums font-semibold text-[11px]">{overallCalled.toLocaleString("en-IN")}</td>
              <td className="py-1.5 px-2 text-right tabular-nums font-semibold text-[11px]">{overallAudited.toLocaleString("en-IN")}</td>
              <td className="py-1.5 px-2"><SatCell pct={overallSat} /></td>
            </tr>
          </tbody>
        </table>
      </ChartContainer>
    </section>
  );
}
