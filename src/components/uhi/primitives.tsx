import { Info, Download, Minus, Plus } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { serviceColor } from "@/lib/uhi-data";

export function ServiceTag({ name }: { name: string }) {
  const color = serviceColor[name] ?? "var(--color-muted-foreground)";
  return (
    <span
      title={name}
      className="inline-flex min-w-0 max-w-full items-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-semibold leading-tight"
      style={{ background: `color-mix(in oklab, ${color} 14%, white)`, color, border: `1px solid color-mix(in oklab, ${color} 40%, white)` }}
    >
      <span className="size-1.5 shrink-0 rounded-full" style={{ background: color }} />
      <span className="truncate">{name}</span>
    </span>
  );
}



export function StatusBadge({ status }: { status: "live" | "paused" | "caution" }) {
  const map = {
    live: { label: "LIVE", dot: "var(--color-live)", text: "text-[var(--color-live)]" },
    paused: { label: "LIVE / PAUSED", dot: "var(--color-paused)", text: "text-[var(--color-paused)]" },
    caution: { label: "CAUTION", dot: "var(--color-caution)", text: "text-[var(--color-caution)]" },
  } as const;
  const s = map[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded border ${s.text} text-[10px] font-semibold tracking-wider`}
      style={{ borderColor: s.dot }}>
      <span className="size-1.5 rounded-full" style={{ background: s.dot }} />
      {s.label}
    </span>
  );
}

export function Tooltip({ children, content }: { children: ReactNode; content: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <span className="relative inline-flex">
      <button
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        className="text-muted-foreground hover:text-foreground"
        aria-label="More info"
      >
        {children}
      </button>
      {open && (
        <span className="absolute z-50 right-0 top-full mt-1 w-72 p-3 rounded-md bg-white text-foreground text-xs shadow-lg border border-border">
          {content}
        </span>
      )}
    </span>
  );
}

export function CountUp({ value, format = (n: number) => n.toLocaleString("en-IN") }: { value: number; format?: (n: number) => string }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let start = 0;
    const dur = 900;
    const t0 = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / dur);
      setN(Math.round(start + (value - start) * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return <>{format(n)}</>;
}

export function KPICard({
  title, value, footnote, tooltip,
}: { title: string; value: ReactNode; footnote?: ReactNode; tooltip?: ReactNode }) {
  return (
    <div className="card-cream p-3 sm:p-4 flex flex-col min-w-0 min-h-[140px]">
      <div className="flex items-start justify-between gap-2 min-w-0 h-8">
        <div className="section-label min-w-0 break-words line-clamp-2 leading-[1rem]">{title}</div>
        {tooltip && (
          <Tooltip content={tooltip}><Info className="size-4 shrink-0" /></Tooltip>
        )}
      </div>
      <div className="num-amber text-left text-[clamp(1.5rem,2.4vw,2.25rem)] leading-none mt-2 break-words">{value}</div>
      {footnote && <div className="text-[11px] text-muted-foreground mt-auto pt-2 break-words">{footnote}</div>}
    </div>
  );
}


export function ChartContainer({
  label, title, right, children, onDownload, defaultCollapsed = false,
}: { label?: string; title: string; right?: ReactNode; children: ReactNode; onDownload?: () => void; defaultCollapsed?: boolean }) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  return (
    <div className="bg-white rounded-lg border border-border overflow-hidden min-w-0">
      <div className="chart-header px-3 sm:px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="min-w-0">
          {label && <div className="text-[10px] tracking-widest opacity-80 font-semibold">{label}</div>}
          <h3 className="text-base sm:text-lg font-semibold break-words">{title}</h3>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          {right}
          {onDownload && (
            <button onClick={onDownload} aria-label="Download" className="opacity-80 hover:opacity-100">
              <Download className="size-4" />
            </button>
          )}
          <button onClick={() => setCollapsed((c) => !c)} aria-label="Collapse" className="opacity-80 hover:opacity-100">
            {collapsed ? <Plus className="size-4" /> : <Minus className="size-4" />}
          </button>
        </div>
      </div>
      {!collapsed && <div className="p-3 sm:p-4 min-w-0 overflow-x-auto">{children}</div>}
    </div>

  );
}

export function downloadCSV(filename: string, rows: Array<Record<string, string | number>>) {
  if (!rows.length) return;
  const keys = Object.keys(rows[0]);
  const csv = [keys.join(","), ...rows.map((r) => keys.map((k) => `"${String(r[k]).replace(/"/g, '""')}"`).join(","))].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}
