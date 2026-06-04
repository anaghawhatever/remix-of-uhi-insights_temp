import { Fragment, useMemo, useState } from "react";
import { ChartContainer, KPICard, downloadCSV } from "./primitives";

const AUDIT_SERVICES = ["All Services", "Physical Consultation", "Teleconsultation"] as const;
const RANGES = ["1W", "1M", "6M", "1Y", "Custom"] as const;
const ENDPOINTS = ["on_confirm", "on_update", "on_status", "on_cancel"] as const;

type Svc = (typeof AUDIT_SERVICES)[number];
type Range = (typeof RANGES)[number];

// Mock saturation data per service+endpoint, varying slightly by range
const baseSat: Record<Svc, Record<(typeof ENDPOINTS)[number], number>> = {
  "All Services":            { on_confirm: 48.2, on_update: 36.4, on_status: 52.1, on_cancel: 30.7 },
  "Physical Consultation":   { on_confirm: 62.5, on_update: 41.0, on_status: 58.3, on_cancel: 34.2 },
  "Teleconsultation":        { on_confirm: 39.1, on_update: 28.7, on_status: 47.9, on_cancel: 22.4 },
};

const rangeAdj: Record<Range, number> = { "1W": -3.2, "1M": 0, "6M": 2.1, "1Y": 4.6, "Custom": 0 };

const integratorList: Array<{ name: string; service: Exclude<Svc, "All Services"> }> = [
  { name: "Apollo 24/7", service: "Physical Consultation" },
  { name: "Pristyn Care", service: "Physical Consultation" },
  { name: "Practo Tech", service: "Physical Consultation" },
  { name: "DocsApp", service: "Teleconsultation" },
  { name: "eSanjeevani", service: "Teleconsultation" },
  { name: "C-Dac E-Sushrut", service: "Teleconsultation" },
  { name: "MFine", service: "Teleconsultation" },
];

function seedPct(seed: string, base: number) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  const jitter = (h % 35) - 15; // -15..+19
  const v = Math.max(0, Math.min(100, base + jitter));
  return Math.round(v * 10) / 10;
}

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
          <button
            key={r}
            onClick={() => setRange(r)}
            className={`text-[11px] px-2 py-1 rounded ${range === r ? "bg-white text-[var(--color-navy)] font-semibold" : "text-white/90 hover:bg-white/10"}`}
          >
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
      <span className="num-amber tabular-nums text-sm w-12 text-right">{pct.toFixed(1)}%</span>
      <span className="flex-1 h-1.5 bg-muted/40 rounded overflow-hidden">
        <span className="block h-full rounded" style={{ width: `${pct}%`, background: color }} />
      </span>
    </div>
  );
}

export function AuditSaturationSection() {
  // Endpoint table state
  const [svc1, setSvc1] = useState<Svc>("All Services");
  const [range1, setRange1] = useState<Range>("1M");
  const [start1, setStart1] = useState("");
  const [end1, setEnd1] = useState("");

  // Defaulters table state
  const [svc2, setSvc2] = useState<Svc>("All Services");
  const [range2, setRange2] = useState<Range>("1M");
  const [start2, setStart2] = useState("");
  const [end2, setEnd2] = useState("");

  const endpointRows = useMemo(() => {
    const adj = rangeAdj[range1];
    return ENDPOINTS.map((ep) => {
      const sat = Math.max(0, Math.min(100, baseSat[svc1][ep] + adj));
      const called = svc1 === "All Services" ? 24800 : svc1 === "Physical Consultation" ? 4200 : 20600;
      const audited = Math.round((called * sat) / 100);
      return { endpoint: ep, called, audited, sat: Math.round(sat * 10) / 10 };
    });
  }, [svc1, range1]);

  const overallSat = useMemo(() => {
    const s = endpointRows.reduce((a, r) => a + r.sat, 0) / endpointRows.length;
    return Math.round(s * 10) / 10;
  }, [endpointRows]);

  const defaulterRows = useMemo(() => {
    const list = svc2 === "All Services" ? integratorList : integratorList.filter((i) => i.service === svc2);
    const adj = rangeAdj[range2];
    return list.map((it) => {
      const cells = ENDPOINTS.map((ep) => {
        const base = baseSat[it.service][ep] + adj;
        const pct = seedPct(`${it.name}-${ep}-${range2}`, base);
        const called = ep === "on_confirm" ? 420 : ep === "on_update" ? 380 : ep === "on_status" ? 510 : 180;
        const audited = Math.round((called * pct) / 100);
        return { ep, pct, called, audited };
      });
      const avg = cells.reduce((a, c) => a + c.pct, 0) / cells.length;
      return { name: it.name, service: it.service, cells, avg: Math.round(avg * 10) / 10 };
    }).sort((a, b) => a.avg - b.avg);
  }, [svc2, range2]);

  return (
    <section>
      <div className="section-label mb-1">PRIVATE VIEW ONLY</div>
      <h2 className="text-2xl font-semibold tracking-tight">Audit API Saturation</h2>
      <p className="text-sm italic text-muted-foreground mt-1 mb-5">
        Share of fulfilment callbacks where the corresponding audit endpoint was also invoked.
      </p>

      {/* Headline KPI moved from Gateway at a Glance */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <KPICard title="Overall Audit API Saturation" value={<>{overallSat}%</>}
          footnote={<span className="text-muted-foreground">{svc1} · {range1}</span>}
          tooltip="Audit API endpoint hits ÷ corresponding gateway API endpoint hits. Averaged across on_confirm, on_update, on_status, on_cancel."
        />
        <KPICard title="Best-performing endpoint"
          value={<>{endpointRows.reduce((a, b) => (a.sat > b.sat ? a : b)).endpoint}</>}
          footnote={`${endpointRows.reduce((a, b) => (a.sat > b.sat ? a : b)).sat.toFixed(1)}% saturation`}
          tooltip="Endpoint with the highest audit-to-call ratio in the selected window."
        />
        <KPICard title="Lowest-performing endpoint"
          value={<>{endpointRows.reduce((a, b) => (a.sat < b.sat ? a : b)).endpoint}</>}
          footnote={`${endpointRows.reduce((a, b) => (a.sat < b.sat ? a : b)).sat.toFixed(1)}% saturation`}
          tooltip="Endpoint with the lowest audit-to-call ratio in the selected window."
        />
      </div>

      {/* TABLE 1 — endpoint saturation */}
      <ChartContainer
        label="ENDPOINT VIEW"
        title="Audit API Saturation by Endpoint"
        right={<FilterBar svc={svc1} setSvc={setSvc1} range={range1} setRange={setRange1}
          start={start1} setStart={setStart1} end={end1} setEnd={setEnd1} />}
        onDownload={() => downloadCSV("audit-endpoints.csv", endpointRows)}
      >
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="py-2 px-2 text-[11px] tracking-wider text-[var(--color-navy)] font-semibold">AUDIT ENDPOINT</th>
              <th className="py-2 px-2 text-[11px] tracking-wider text-[var(--color-navy)] font-semibold text-right">GATEWAY CALLS</th>
              <th className="py-2 px-2 text-[11px] tracking-wider text-[var(--color-navy)] font-semibold text-right">AUDIT HITS</th>
              <th className="py-2 px-2 text-[11px] tracking-wider text-[var(--color-navy)] font-semibold w-[260px]">SATURATION %</th>
            </tr>
          </thead>
          <tbody>
            {endpointRows.map((r, i) => (
              <tr key={r.endpoint} className={i % 2 ? "bg-muted/40" : ""}>
                <td className="py-2.5 px-2 font-medium font-mono text-[13px]">{r.endpoint}</td>
                <td className="py-2.5 px-2 text-right tabular-nums">{r.called.toLocaleString("en-IN")}</td>
                <td className="py-2.5 px-2 text-right tabular-nums">{r.audited.toLocaleString("en-IN")}</td>
                <td className="py-2.5 px-2"><SatCell pct={r.sat} /></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="text-xs text-muted-foreground mt-3">
          Calc: For each endpoint, audit hits ÷ corresponding gateway calls. e.g. if <code className="font-mono">on_confirm</code> fires, <code className="font-mono">on_confirm_audit</code> is expected to fire too.
        </div>
      </ChartContainer>

      {/* TABLE 2 — defaulters by integrator */}
      <div className="mt-6">
        <ChartContainer
          label="INTEGRATOR VIEW"
          title="Audit API Defaulters by Integrator"
          right={<FilterBar svc={svc2} setSvc={setSvc2} range={range2} setRange={setRange2}
            start={start2} setStart={setStart2} end={end2} setEnd={setEnd2} />}
          onDownload={() => downloadCSV("audit-defaulters.csv",
            defaulterRows.map((r) => ({ integrator: r.name, service: r.service, avg: r.avg,
              ...Object.fromEntries(r.cells.map((c) => [c.ep, c.pct])) })))}
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[900px]">
              <thead>
                <tr className="border-b border-border">
                  <th rowSpan={2} className="py-2 px-2 text-left text-[11px] tracking-wider text-[var(--color-navy)] font-semibold align-bottom">INTEGRATOR</th>
                  <th rowSpan={2} className="py-2 px-2 text-left text-[11px] tracking-wider text-[var(--color-navy)] font-semibold align-bottom">SERVICE</th>
                  {ENDPOINTS.map((ep) => (
                    <th key={ep} colSpan={2}
                      className="py-2 px-2 text-center text-[11px] tracking-wider text-white font-semibold font-mono"
                      style={{ background: "var(--color-navy)" }}>
                      {ep}
                    </th>
                  ))}
                  <th rowSpan={2} className="py-2 px-2 text-right text-[11px] tracking-wider text-[var(--color-navy)] font-semibold align-bottom">AVG %</th>
                </tr>
                <tr className="border-b border-border">
                  {ENDPOINTS.map((ep) => (
                    <Fragment key={ep}>
                      <th className="py-1.5 px-2 text-right text-[10px] tracking-wider text-muted-foreground font-semibold border-l border-border">CALLS</th>
                      <th className="py-1.5 px-2 text-right text-[10px] tracking-wider text-muted-foreground font-semibold">SAT %</th>
                    </Fragment>
                  ))}
                </tr>
              </thead>
              <tbody>
                {defaulterRows.map((row, i) => (
                  <tr key={row.name} className={i % 2 ? "bg-muted/40" : ""}>
                    <td className="py-2.5 px-2 font-medium">{row.name}</td>
                    <td className="py-2.5 px-2 text-xs text-muted-foreground">{row.service}</td>
                    {row.cells.map((c) => {
                      const color = c.pct >= 60 ? "var(--color-live)" : c.pct >= 40 ? "var(--color-caution)" : "var(--color-paused)";
                      return (
                        <>
                          <td key={`${c.ep}-c`} className="py-2.5 px-2 text-right tabular-nums text-xs border-l border-border/40">{c.called.toLocaleString("en-IN")}</td>
                          <td key={`${c.ep}-s`} className="py-2.5 px-2 text-right tabular-nums text-sm" style={{ color }}>{c.pct.toFixed(1)}%</td>
                        </>
                      );
                    })}
                    <td className="py-2.5 px-2 text-right num-amber tabular-nums">{row.avg.toFixed(1)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-xs text-muted-foreground mt-3">
            Sorted ascending by average saturation — integrators at the top are the biggest defaulters. Red &lt; 40% · Amber 40–60% · Green ≥ 60%.
          </div>
        </ChartContainer>
      </div>
    </section>
  );
}
