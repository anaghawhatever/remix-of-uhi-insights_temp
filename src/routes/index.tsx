import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowUpRight, Search, X, EyeOff } from "lucide-react";
import { DashboardHeader } from "@/components/uhi/DashboardHeader";
import { ServiceCard } from "@/components/uhi/ServiceCard";
import { CombinedGrowthChart } from "@/components/uhi/CombinedGrowthChart";
import { KPICard, CountUp, ChartContainer, StatusBadge, downloadCSV, Tooltip, ServiceTag } from "@/components/uhi/primitives";
import { integrators, metricsLogic, serviceStatus, serviceColor, states, SERVICES, METRIC_SHEETS, openSheet } from "@/lib/uhi-data";
import { Info } from "lucide-react";
import { IndiaMap } from "@/components/uhi/IndiaMap";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Unified Health Interface – Gateway at a Glance | ABDM" },
      { name: "description", content: "UHI Insights Dashboard: live services, integrators, geographic performance and adoption metrics for the Ayushman Bharat Digital Mission." },
      { property: "og:title", content: "UHI – Gateway at a Glance" },
      { property: "og:description", content: "Headline performance across UHI live services." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Dashboard,
});

function Dashboard() {
  const [service, setService] = useState("All");
  const [showMetricsLogic, setShowMetricsLogic] = useState(false);
  const [view, setView] = useState<"public" | "private">("private");
  const isPrivate = view === "private";

  return (
    <div className="min-h-screen">
      <DashboardHeader service={service} onServiceChange={setService} view={view} onViewChange={setView} />

      <main className="px-3 sm:px-5 py-4 mx-auto max-w-[1600px] space-y-5">
        {/* GATEWAY AT A GLANCE */}
        <Section label="DASHBOARD OVERVIEW" title="Gateway at a Glance">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 items-stretch">
            <KPICard title="Total Live Services" value={<CountUp value={9} />}
              tooltip={<LiveServicesTooltip />}
            />
            <KPICard title="Total Searches"
              value={<CountUp value={615001} />}
              footnote={<span className="text-[var(--color-live)] font-medium">↗ +123.6% vs last quarter</span>}
              tooltip="Aggregate searches across all live services."
            />
            <KPICard title="Total Bookings" value={<CountUp value={4128} />}
              tooltip="Aggregated Bookings across Teleconsultation, Physical Consultation and Ambulance Booking services."
            />
            <KPICard title="Citizen-Facing Applications (EUAs) Integrated" value={<CountUp value={22} />}
              tooltip="Count of Citizen-Facing Applications (EUAs) that have reached Go Live status across all live services."
            />
            <KPICard title="Provider Applications (HSPAs) Integrated" value={<CountUp value={9} />}
              tooltip="Count of Provider Applications (HSPAs) live across all services."
            />
          </div>
        </Section>

        {/* UHI LIVE SERVICES */}
        <Section label="SERVICE-LEVEL PERFORMANCE" title="UHI Live Services">
          <SubsectionLabel>DISCOVERY SERVICES</SubsectionLabel>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 mb-5">
            <ServiceCard service="PMJAY Hospital Discovery" kind="discovery" />
            <ServiceCard service="Blood Bank Discovery" kind="discovery" />
            <ServiceCard service="Jan Aushadhi Medicine Discovery" kind="discovery" />
            <ServiceCard service="NOTTO Service Discovery" kind="discovery" />
            <ServiceCard service="AMRIT Pharmacy Discovery" kind="discovery" />
            <ServiceCard service="Dialysis Centre Discovery" kind="discovery" />
          </div>
          <SubsectionLabel>BOOKING / FULFILMENT SERVICES</SubsectionLabel>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
            <ServiceCard service="Physical Consultation" kind="fulfilment" />
            <ServiceCard service="Teleconsultation" kind="fulfilment" />
            <ServiceCard service="Ambulance Booking" kind="fulfilment" />
          </div>
        </Section>

        {/* COMBINED GROWTH */}
        <CombinedGrowthChart />

        {/* INTEGRATION TABLE */}
        <Section label="NETWORK PARTNERS" title="Integration Table">
          <IntegrationTable />
        </Section>

        {/* GEOGRAPHIC */}
        <GeographicCard />

        {/* ===== PRIVATE VIEW ZONE ===== */}
        {isPrivate && (
          <div className="space-y-5">
            <div className="flex items-center gap-3 pt-2">
              <span className="h-px flex-1 bg-[color-mix(in_oklab,var(--color-navy)_30%,white)]" />
              <span className="private-badge"><EyeOff className="size-3" /> Private view only</span>
              <span className="h-px flex-1 bg-[color-mix(in_oklab,var(--color-navy)_30%,white)]" />
            </div>

            {/* Detailed Indicators + Registries in one line */}
            <div className="grid grid-cols-1 lg:grid-cols-6 gap-3 items-start">
              <div className="lg:col-span-3 min-w-0">
                <h2 className="text-xl font-semibold tracking-tight mb-3 h-7 flex items-center">Detailed Indicators</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <KPICard title="Search Growth (QoQ)" value={<span className="text-[var(--color-live)]">+38% <ArrowUpRight className="inline size-6"/></span>}
                    footnote="Quarter-on-quarter total searches"
                    tooltip="(Current quarter searches − Previous quarter searches) ÷ Previous quarter searches × 100."
                  />
                  <KPICard title="Booking Growth (QoQ)" value={<span className="text-[var(--color-live)]">+24% <ArrowUpRight className="inline size-6"/></span>}
                    footnote="Quarter-on-quarter completed bookings"
                    tooltip="(Current quarter bookings − Previous quarter bookings) ÷ Previous quarter bookings × 100."
                  />
                  <KPICard title="Total Network Partners" value={<CountUp value={28} />}
                    tooltip="Number of Unique EUAs, HSPAs, or Both."
                  />
                </div>
              </div>
              <div className="lg:col-span-3 min-w-0">
                <h2 className="text-xl font-semibold tracking-tight mb-3 h-7 flex items-center gap-2">
                  Registries in UHI
                  <Tooltip content="Only for Booking Services: Physical Consultation, Ambulance Booking, etc.">
                    <Info className="size-4" />
                  </Tooltip>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <SmallStatCard title="ABHA Saturation" value="68.4%" foot="↗ +4.2pp QoQ" tip="Requests with ABHA ID or address ÷ Total API endpoint hits." />
                  <SmallStatCard title="HFR Saturation" value="74.2%" foot="↗ +2.1pp QoQ" tip="Providers in UHI linked to HFR ÷ Total providers in UHI." />
                  <SmallStatCard title="HPR Saturation" value="61.8%" foot="↗ +5.4pp QoQ" tip="Doctors in UHI linked to HPR ÷ Total doctors in UHI." />
                </div>
              </div>
            </div>
          </div>
        )}

        <Footer onOpenMetrics={() => setShowMetricsLogic(true)} />
      </main>

      {showMetricsLogic && <MetricsLogicModal onClose={() => setShowMetricsLogic(false)} />}
    </div>
  );
}



function Section({ label, title, desc, descItalic, children }: { label?: string; title: string; desc?: string; descItalic?: boolean; children: React.ReactNode }) {
  return (
    <section>
      {label && <div className="section-label mb-0.5">{label}</div>}
      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">{title}</h2>
      {desc && <p className={`text-xs mt-0.5 mb-3 ${descItalic ? "italic text-muted-foreground" : "text-muted-foreground"}`}>{desc}</p>}
      {!desc && <div className="mb-3" />}
      {children}
    </section>
  );
}

function SubsectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="sticky top-1 z-20 mb-2 rounded-md border border-border bg-white/95 px-2 py-1.5 backdrop-blur">
      <div className="flex items-center gap-2">
        <span className="h-4 w-1 rounded-full bg-[var(--color-navy)]" />
        <span className="text-[13px] font-bold uppercase tracking-widest text-[var(--color-navy)]">{children}</span>
      </div>
    </div>
  );
}

function LiveServicesTooltip() {
  const items = [...SERVICES]
    .sort((a, b) => (a === "Teleconsultation" ? 1 : b === "Teleconsultation" ? -1 : 0));
  return (
    <span className="block">
      <span className="block font-semibold mb-1.5">All live UHI services</span>
      <span className="block space-y-1">
        {items.map((s) => (
          <span key={s} className="flex items-center justify-between gap-2">
            <span className="flex min-w-0 items-center gap-1.5">
              <span className="size-2 shrink-0 rounded-full" style={{ background: serviceColor[s] }} />
              <span className="truncate">{s}</span>
            </span>
            <StatusBadge status={serviceStatus[s]} />
          </span>
        ))}
      </span>
    </span>
  );
}


function SmallStatCard({ title, value, foot, tip }: { title: string; value: string; foot: string; tip: string }) {
  return (
    <div className="card-cream p-3 sm:p-4 flex flex-col min-w-0 min-h-[140px]">
      <div className="flex items-start justify-between gap-2 min-w-0 h-8">
        <div className="section-label min-w-0 break-words line-clamp-2 leading-[1rem]">{title}</div>
        <Tooltip content={tip}><Info className="size-4 shrink-0" /></Tooltip>
      </div>
      <div className="num-amber text-left text-[clamp(1.5rem,2.4vw,2.25rem)] leading-none mt-2 break-words">{value}</div>
      <div className="text-[11px] text-muted-foreground mt-auto pt-2 break-words">{foot}</div>
    </div>
  );
}



function MultiSelect({ label, options, selected, onToggle }: {
  label: string; options: string[]; selected: string[]; onToggle: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button onClick={() => setOpen((o) => !o)}
        className="text-xs border border-white/30 bg-white/10 text-white rounded px-2 py-1 min-w-[150px] text-left">
        {label}{selected.length ? ` · ${selected.length}` : ""} ▾
      </button>
      {open && (
        <div className="absolute right-0 z-30 mt-1 w-64 max-h-64 overflow-auto rounded-md border border-border bg-white p-1 shadow-lg">
          {options.map((o) => (
            <label key={o} className="flex items-center gap-2 rounded px-2 py-1 text-xs hover:bg-muted cursor-pointer">
              <input type="checkbox" checked={selected.includes(o)} onChange={() => onToggle(o)} />
              <span className="truncate">{o}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

function IntegrationTable() {
  const [svcFilter, setSvcFilter] = useState<string[]>([]);
  const [roleFilter, setRoleFilter] = useState<string[]>([]);
  const [sortKey, setSortKey] = useState<"name" | "role" | "service" | "goLiveDate">("goLiveDate");
  const [dir, setDir] = useState<"asc" | "desc">("desc");

  const rows = useMemo(() => {
    const filtered = integrators.filter((r) =>
      (svcFilter.length === 0 || svcFilter.includes(r.service)) &&
      (roleFilter.length === 0 || roleFilter.includes(r.role))
    );
    return [...filtered].sort((a, b) =>
      dir === "asc" ? a[sortKey].localeCompare(b[sortKey]) : b[sortKey].localeCompare(a[sortKey])
    );
  }, [svcFilter, roleFilter, sortKey, dir]);

  const th = (label: string, key: typeof sortKey) => (
    <th className="py-1.5 px-2 text-[10px] tracking-wider text-[var(--color-navy)] font-semibold cursor-pointer select-none"
      onClick={() => { if (sortKey === key) setDir((d) => d === "asc" ? "desc" : "asc"); else { setSortKey(key); setDir("asc"); } }}>
      {label.toUpperCase()} {sortKey === key ? (dir === "asc" ? "↑" : "↓") : ""}
    </th>
  );

  return (
    <ChartContainer
      label="INTEGRATORS"
      title="Integration Table"
      right={
        <div className="flex items-center gap-2">
          <MultiSelect label="Service" options={[...SERVICES]} selected={svcFilter}
            onToggle={(v) => setSvcFilter((s) => s.includes(v) ? s.filter((x) => x !== v) : [...s, v])} />
          <MultiSelect label="Role" options={["EUA", "HSPA"]} selected={roleFilter}
            onToggle={(v) => setRoleFilter((s) => s.includes(v) ? s.filter((x) => x !== v) : [...s, v])} />
        </div>
      }
      onDownload={() => openSheet(METRIC_SHEETS.integrationTable)}
    >
      <div className="max-h-[420px] overflow-y-auto">
        <table className="w-full text-xs">
          <thead className="sticky top-0 bg-white">
            <tr className="border-b border-border text-left">
              <th className="py-1.5 pr-2 text-[10px] tracking-wider text-muted-foreground font-semibold w-6">#</th>
              {th("Role", "role")}
              {th("Integrator Name", "name")}
              {th("Service", "service")}
              {th("Go Live Date", "goLiveDate")}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={`${r.name}-${r.service}-${r.role}`} className={i % 2 ? "bg-muted/40" : ""}>
                <td className="py-1.5 pr-2 text-muted-foreground">{i + 1}</td>
                <td className="py-1.5 px-2 font-semibold text-[var(--color-navy)]">{r.role}</td>
                <td className="py-1.5 px-2 font-medium">{r.name}</td>
                <td className="py-1.5 px-2"><ServiceTag name={r.service} /></td>
                <td className="py-1.5 px-2 tabular-nums text-muted-foreground">{r.goLiveDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ChartContainer>
  );
}


function GeographicCard() {
  const [mode, setMode] = useState<"map" | "table">("map");
  const [serviceFilter, setServiceFilter] = useState("All Services");
  const [selectedState, setSelectedState] = useState<string | null>(null);

  const data = useMemo(() => {
    const mult = serviceFilter === "All Services" ? 1 : 0.3;
    return states.map((s) => ({ ...s, value: Math.round(s.value * mult) }));
  }, [serviceFilter]);

  const sorted = useMemo(() => [...data].sort((a, b) => b.value - a.value), [data]);
  const max = Math.max(...data.map((d) => d.value));

  // Per-state per-service breakdown (proportional synth from national totals)
  const totalNational = states.reduce((a, s) => a + s.value, 0);
  const stateRow = data.find((s) => s.name === selectedState);
  const share = stateRow ? stateRow.value / totalNational : 0;

  const discoveryServices: Array<{ name: string; searches: number }> = selectedState ? [
    { name: "PMJAY Hospital Discovery", searches: Math.round(354484 * share) },
    { name: "Blood Bank Discovery", searches: Math.round(163185 * share) },
    { name: "Jan Aushadhi Medicine Discovery", searches: Math.round(986 * share) },
    { name: "NOTTO Service Discovery", searches: Math.round(742 * share) },
    { name: "AMRIT Pharmacy Discovery", searches: Math.round(1180 * share) },
    { name: "Dialysis Centre Discovery", searches: Math.round(612 * share) },
  ] : [];

  const fulfilmentServices: Array<{ name: string; searches: number; bookings: number; status: "live" | "paused" }> = selectedState ? [
    { name: "Physical Consultation", searches: Math.round(3554 * share), bookings: Math.round(184 * share), status: "live" },
    { name: "Teleconsultation", searches: Math.round(92000 * share), bookings: Math.round(3816 * share), status: "paused" },
    { name: "Ambulance Booking", searches: Math.round(356 * share), bookings: Math.round(128 * share), status: "live" },
  ] : [];


  return (
    <ChartContainer label="WHERE THE ACTION IS" title="Geographic Performance"
      right={
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 rounded border border-white/30 bg-white/10 p-0.5">
            {(["map", "table"] as const).map((m) => (
              <button key={m} onClick={() => setMode(m)}
                className={`text-[11px] px-2 py-1 rounded capitalize ${mode === m ? "bg-white text-[var(--color-navy)] font-semibold" : "text-white/90 hover:bg-white/10"}`}>
                {m}
              </button>
            ))}
          </div>
          <select value={serviceFilter} onChange={(e) => setServiceFilter(e.target.value)}
            className="text-xs border border-white/30 bg-white/10 text-white rounded px-2 py-1">
            {["All Services", ...SERVICES].map((s) => <option key={s} className="text-foreground">{s}</option>)}
          </select>
        </div>
      }
      onDownload={() => openSheet(METRIC_SHEETS.geographic)}
    >
      {mode === "table" ? (
        <div className="max-h-[520px] overflow-y-auto">
          <table className="w-full text-xs">
            <thead className="sticky top-0 bg-white">
              <tr className="border-b border-border text-left">
                <th className="py-1.5 pr-2 text-[10px] tracking-wider text-muted-foreground font-semibold w-6">#</th>
                <th className="py-1.5 px-2 text-[10px] tracking-wider text-[var(--color-navy)] font-semibold">STATE / UT</th>
                <th className="py-1.5 px-2 text-[10px] tracking-wider text-[var(--color-navy)] font-semibold text-right">SEARCHES</th>
                <th className="py-1.5 px-2 text-[10px] tracking-wider text-[var(--color-navy)] font-semibold text-right">SHARE</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((s, i) => (
                <tr key={s.name} className={i % 2 ? "bg-muted/40" : ""}>
                  <td className="py-1.5 pr-2 text-muted-foreground">{i + 1}</td>
                  <td className="py-1.5 px-2 font-medium">{s.name}</td>
                  <td className="py-1.5 px-2 text-right num-amber tabular-nums">{s.value.toLocaleString("en-IN")}</td>
                  <td className="py-1.5 px-2 text-right tabular-nums text-muted-foreground">
                    {totalNational > 0 ? ((s.value / (totalNational || 1)) * 100).toFixed(1) : "0.0"}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3">
          <IndiaMap data={data} max={max} onSelect={(n) => setSelectedState((cur) => cur === n ? null : n)} selected={selectedState} />
          <div className="text-[11px] text-muted-foreground mt-2 italic">Tip: click a state to see its service-wise breakdown.</div>
        </div>
        <div className="lg:col-span-2">
          {selectedState ? (
            <div>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-[11px] tracking-wider text-muted-foreground font-semibold">SELECTED STATE / UT</div>
                  <h4 className="text-lg font-semibold text-[var(--color-navy)]">{selectedState}</h4>
                </div>
                <button onClick={() => setSelectedState(null)} className="text-xs text-muted-foreground hover:text-foreground border border-border rounded px-2 py-1">Clear</button>
              </div>

              <div className="mb-4">
                <div className="text-[11px] tracking-wider text-[var(--color-navy)] font-semibold mb-1.5">DISCOVERY SERVICES</div>
                <table className="w-full text-sm border border-border rounded-md overflow-hidden">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left py-1.5 px-2 text-[11px] font-semibold text-muted-foreground">Service</th>
                      <th className="text-right py-1.5 px-2 text-[11px] font-semibold text-muted-foreground">Searches</th>
                    </tr>
                  </thead>
                  <tbody>
                    {discoveryServices.map((r) => (
                      <tr key={r.name} className="border-t border-border/40">
                        <td className="py-1.5 px-2">{r.name}</td>
                        <td className="py-1.5 px-2 text-right num-amber tabular-nums">{r.searches.toLocaleString("en-IN")}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div>
                <div className="text-[11px] tracking-wider text-[var(--color-navy)] font-semibold mb-1.5">FULFILMENT SERVICES</div>
                <table className="w-full text-sm border border-border rounded-md overflow-hidden">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left py-1.5 px-2 text-[11px] font-semibold text-muted-foreground">Service</th>
                      <th className="text-right py-1.5 px-2 text-[11px] font-semibold text-muted-foreground">Searches</th>
                      <th className="text-right py-1.5 px-2 text-[11px] font-semibold text-muted-foreground">Bookings</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fulfilmentServices.map((r) => (
                      <tr key={r.name} className="border-t border-border/40">
                        <td className="py-1.5 px-2">
                          {r.name}
                          {r.status === "paused" && <span className="ml-1.5 text-[10px] text-[var(--color-paused)] font-semibold">· paused</span>}
                        </td>
                        <td className="py-1.5 px-2 text-right num-amber tabular-nums">{r.searches.toLocaleString("en-IN")}</td>
                        <td className="py-1.5 px-2 text-right num-amber tabular-nums">{r.bookings.toLocaleString("en-IN")}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <>
              <div className="text-[11px] tracking-wider text-[var(--color-navy)] font-semibold mb-2">TOP STATES · {serviceFilter.toUpperCase()}</div>
              <div className="max-h-[520px] overflow-y-auto pr-2">
                <table className="w-full text-sm">
                  <tbody>
                    {sorted.map((s, i) => (
                      <tr key={s.name} className="border-b border-border/40 cursor-pointer hover:bg-muted/40" onClick={() => setSelectedState(s.name)}>
                        <td className="py-2 w-8 text-muted-foreground text-xs">{i + 1}</td>
                        <td className="py-2">
                          <div className="font-medium text-sm">{s.name}</div>
                          <div className="h-1.5 rounded mt-1 bg-muted/40 overflow-hidden">
                            <div className="h-full rounded" style={{ width: `${(s.value / max) * 100}%`, background: "var(--color-bar-coral)" }} />
                          </div>
                        </td>
                        <td className="py-2 pl-3 text-right num-amber tabular-nums text-sm">{s.value.toLocaleString("en-IN")}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </ChartContainer>
  );
}


function Footer({ onOpenMetrics }: { onOpenMetrics: () => void }) {
  return (
    <footer className="bg-[var(--color-navy)] text-white rounded-lg mt-10">
      <div className="px-6 py-8 grid grid-cols-1 md:grid-cols-4 gap-6 text-sm">
        <div>
          <div className="font-semibold mb-2">National Health Authority</div>
          <div className="text-white/70 text-xs leading-relaxed">9th Floor, Tower-L<br/>Jeevan Bharti Building, Connaught Place<br/>New Delhi - 110001, India</div>
        </div>
        <div>
          <div className="font-semibold mb-2">Important Links</div>
          <ul className="space-y-1.5 text-white/80 text-xs">
            <li><a href="#" className="hover:underline">ABDM Sandbox</a></li>
            <li><a href="#" className="hover:underline">Developer Docs</a></li>
            <li><a href="#" className="hover:underline">Integrator Portal</a></li>
            <li><button onClick={onOpenMetrics} className="hover:underline text-left">View Metrics Logic</button></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-2">Policies</div>
          <ul className="space-y-1.5 text-white/80 text-xs">
            <li><a href="#" className="hover:underline">Privacy Policy</a></li>
            <li><a href="#" className="hover:underline">Terms of Use</a></li>
            <li><a href="#" className="hover:underline">RTI</a></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-2">Health Records QR</div>
          <div className="size-24 bg-white rounded grid place-items-center text-[var(--color-navy)] text-xs font-semibold">QR</div>
        </div>
      </div>
      <div className="border-t border-white/10 px-6 py-3 text-xs text-white/60">© 2026 National Health Authority · Government of India</div>
    </footer>
  );
}

function MetricsLogicModal({ onClose }: { onClose: () => void }) {
  const [q, setQ] = useState("");
  const [svc, setSvc] = useState("All");
  const rows = useMemo(() => metricsLogic.filter((m) =>
    (svc === "All" || m.service.toLowerCase().includes(svc.toLowerCase())) &&
    (q === "" || m.metric.toLowerCase().includes(q.toLowerCase()) || m.definition.toLowerCase().includes(q.toLowerCase()))
  ), [q, svc]);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 grid place-items-center p-4" onClick={onClose}>
      <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="chart-header px-5 py-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Metrics Logic Sheet</h3>
          <button onClick={onClose}><X className="size-5" /></button>
        </div>
        <div className="p-5 flex items-center gap-3 border-b border-border">
          <div className="relative flex-1">
            <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search metric or definition…"
              className="w-full pl-9 pr-3 py-2 text-sm border border-border rounded-md" />
          </div>
          <select value={svc} onChange={(e) => setSvc(e.target.value)} className="text-sm border border-border rounded-md px-3 py-2">
            <option>All</option>{SERVICES.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div className="overflow-auto flex-1 p-5">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr className="text-left">
                {["Metric","Service","Definition","Source","Calculation","Unit","Refresh","Location"].map((c) => (
                  <th key={c} className="py-2 px-3 text-[11px] tracking-wider text-[var(--color-navy)] font-semibold">{c.toUpperCase()}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={r.metric} className={`border-b border-border/40 ${i % 2 ? "bg-muted/20" : ""}`}>
                  <td className="py-3 px-3 font-medium">{r.metric}</td>
                  <td className="py-3 px-3 text-xs">{r.service}</td>
                  <td className="py-3 px-3 text-xs">{r.definition}</td>
                  <td className="py-3 px-3 text-xs">{r.source}</td>
                  <td className="py-3 px-3 text-xs">{r.calc}</td>
                  <td className="py-3 px-3 text-xs">{r.unit}</td>
                  <td className="py-3 px-3 text-xs">{r.refresh}</td>
                  <td className="py-3 px-3 text-xs">{r.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
