import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip as RTooltip, Cell, LineChart, Line } from "recharts";
import { ArrowUpRight, ArrowRight, Search, X } from "lucide-react";
import { DashboardHeader } from "@/components/uhi/DashboardHeader";
import { ServiceCard } from "@/components/uhi/ServiceCard";
import { CombinedGrowthChart } from "@/components/uhi/CombinedGrowthChart";
import { KPICard, CountUp, ChartContainer, StatusBadge, downloadCSV, Tooltip } from "@/components/uhi/primitives";
import { euaPartners, hspaPartners, integrationJourney, integrators, metricsLogic, serviceStatus, states, SERVICES } from "@/lib/uhi-data";
import { Info } from "lucide-react";
import { IndiaMap } from "@/components/uhi/IndiaMap";
import { AuditSaturationSection } from "@/components/uhi/AuditSaturationSection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Unified Health Interface – Gateway at a Glance | ABDM" },
      { name: "description", content: "UHI Insights Dashboard: live services, partners, geographic performance and adoption metrics for the Ayushman Bharat Digital Mission." },
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
  const [partnerService, setPartnerService] = useState("All Services");
  const [funnelService, setFunnelService] = useState("All Services");
  const [showMetricsLogic, setShowMetricsLogic] = useState(false);

  return (
    <div className="min-h-screen">
      <DashboardHeader service={service} onServiceChange={setService} />

      <main className="px-6 py-8 mx-auto max-w-[1600px] space-y-10">
        {/* GATEWAY AT A GLANCE */}
        <Section label="DASHBOARD OVERVIEW" title="Gateway at a Glance">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <ServicePortfolioCard />
            <KPICard title="Total Searches"
              value={<CountUp value={615001} />}
              footnote={<span className="text-[var(--color-live)] font-medium">↗ +123.6% vs last quarter</span>}
              tooltip={<><div className="font-semibold mb-1">Total Searches</div>Service-wise: PMJAY 354,484 · Blood Bank 163,185 · Physical 3,554 · Jan Aushadhi 1,435 · Ambulance 356 · Teleconsult 92,000.</>}
            />
            <KPICard title="EUAs Integrated" value={<CountUp value={22} />}
              footnote="End User Apps live across all services"
              tooltip="Count of EUAs that have reached Go Live status across all live services."
            />
            <KPICard title="HSPAs Integrated" value={<CountUp value={9} />}
              footnote="Health Service Provider Apps live across all services"
              tooltip="Count of HSPAs live across all services."
            />
            <KPICard title="Total Ecosystem Partners" value={<CountUp value={28} />}
              footnote="Number of unique integrators who are either EUA or HSPA or both"
              tooltip="Unique integrators counted once, whether they operate as an EUA, an HSPA, or both."
            />
            <KPICard title="Number of Bookings" value={<CountUp value={4000} />}
              footnote="Teleconsultation · Physical Consultation"
              tooltip="Total completed bookings from Teleconsultation + Physical Consultation."
            />
          </div>

        </Section>

        {/* REGISTRIES */}
        <Section label="ECOSYSTEM SATURATION · PRIVATE VIEW ONLY" title="Registries in UHI" desc="only in private view" descItalic>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl">
            <SmallStatCard title="ABHA Saturation" value="68.4%" foot="↗ +4.2pp QoQ" tip="Requests with ABHA ID or address ÷ Total API endpoint hits." />
            <SmallStatCard title="HFR Saturation" value="74.2%" foot="↗ +2.1pp QoQ" tip="Providers in UHI linked to HFR ÷ Total providers in UHI." />
            <SmallStatCard title="HPR Saturation" value="61.8%" foot="↗ +5.4pp QoQ" tip="Doctors in UHI linked to HPR ÷ Total doctors in UHI." />
          </div>
        </Section>

        {/* UHI LIVE SERVICES */}
        <Section label="SERVICE-LEVEL PERFORMANCE" title="UHI Live Services">
          <div className="text-[11px] tracking-widest text-muted-foreground font-semibold mb-3">DISCOVERY SERVICES <span className="text-muted-foreground/70 normal-case tracking-normal">(PMJAY Hospital Discovery, Blood Bank Discovery, Ambulance Discovery, Jan Aushadhi Kendra Discovery)</span></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
            <ServiceCard service="PMJAY Hospital Discovery" kind="discovery" />
            <ServiceCard service="Blood Bank Discovery" kind="discovery" />
            <ServiceCard service="Ambulance Discovery" kind="discovery" />
            <ServiceCard service="Jan Aushadhi Kendra Discovery" kind="discovery" />
          </div>
          <div className="text-[11px] tracking-widest text-muted-foreground font-semibold mb-3">BOOKING / FULFILMENT SERVICES <span className="text-muted-foreground/70 normal-case tracking-normal">(Physical Consultation, Teleconsultation)</span></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <ServiceCard service="Physical Consultation" kind="fulfilment" />
            <ServiceCard service="Teleconsultation" kind="fulfilment" />
          </div>
        </Section>


        {/* UHI LIVE SERVICES */}
        <Section label="SERVICE-LEVEL PERFORMANCE" title="UHI Live Services">
          <div className="text-[11px] tracking-widest text-muted-foreground font-semibold mb-3">DISCOVERY SERVICES <span className="text-muted-foreground/70 normal-case tracking-normal">(PMJAY Hospital Discovery, Blood Bank Discovery, Ambulance Discovery, Jan Aushadhi Kendra Discovery)</span></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
            <ServiceCard service="PMJAY Hospital Discovery" kind="discovery" />
            <ServiceCard service="Blood Bank Discovery" kind="discovery" />
            <ServiceCard service="Ambulance Discovery" kind="discovery" />
            <ServiceCard service="Jan Aushadhi Kendra Discovery" kind="discovery" />
          </div>
          <div className="text-[11px] tracking-widest text-muted-foreground font-semibold mb-3">BOOKING / FULFILMENT SERVICES <span className="text-muted-foreground/70 normal-case tracking-normal">(Teleconsultation, Physical Consultation)</span></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <ServiceCard service="Teleconsultation" kind="fulfilment" />
            <ServiceCard service="Physical Consultation" kind="fulfilment" />
          </div>
        </Section>

        {/* DETAILED INDICATORS */}
        <Section title="Detailed Indicators" desc="only in private view" descItalic>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <KPICard title="Search Growth (QoQ)" value={<span className="text-[var(--color-live)]">+38% <ArrowUpRight className="inline size-6"/></span>}
              footnote="Quarter-on-quarter total searches"
              tooltip="(Current quarter searches − Previous quarter searches) ÷ Previous quarter searches × 100."
            />
            <KPICard title="Booking Growth (QoQ)" value={<span className="text-[var(--color-live)]">+24% <ArrowUpRight className="inline size-6"/></span>}
              footnote="Quarter-on-quarter completed bookings"
              tooltip="(Current quarter bookings − Previous quarter bookings) ÷ Previous quarter bookings × 100. Covers Teleconsultation + Physical Consultation."
            />
          </div>
        </Section>


        {/* COMBINED GROWTH */}
        <CombinedGrowthChart />

        {/* PARTNER REGISTRY */}
        <Section label="ECOSYSTEM PARTNERS" title="EUA & HSPA Registry">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[11px] tracking-wider text-muted-foreground font-semibold">FILTER BY SERVICE</span>
            <select value={partnerService} onChange={(e) => setPartnerService(e.target.value)}
              className="text-xs border border-border rounded-md px-3 py-1.5 bg-white min-w-[180px]">
              {["All Services", ...SERVICES].map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <PartnerTable
              title="List of EUAs"
              columns={["Partner Name", "Searches", "Onboarded"]}
              rows={euaPartners.filter((p) => partnerService === "All Services" || p.service.includes(partnerService.replace(" Discovery", "")))
                .map((p) => [p.name, p.searches.toLocaleString("en-IN"), p.onboarded])}
              numericCol={1}
              onDownload={() => downloadCSV("eua-partners.csv", euaPartners)}
            />
            <PartnerTable
              title="List of HSPAs"
              columns={showBookingsForHspa(partnerService) ? ["Partner Name", "Bookings", "Onboarded"] : ["Partner Name", "Onboarded"]}
              rows={hspaPartners.filter((p) => partnerService === "All Services" || p.service.includes(partnerService.replace(" Discovery", "")))
                .map((p) => showBookingsForHspa(partnerService)
                  ? [p.name, p.bookings.toLocaleString("en-IN"), p.onboarded]
                  : [p.name, p.onboarded])}
              numericCol={showBookingsForHspa(partnerService) ? 1 : -1}
              onDownload={() => downloadCSV("hspa-partners.csv", hspaPartners)}
            />
          </div>
        </Section>


        {/* FUNNEL */}
        <ChartContainer label="THE SYSTEMIC VIEW · PRIVATE VIEW ONLY" title="Cross-Service Adoption Funnel"
          right={
            <select value={funnelService} onChange={(e) => setFunnelService(e.target.value)}
              className="text-xs border border-white/30 bg-white/10 text-white rounded-md px-3 py-1.5 min-w-[160px]">
              {["All Services", ...SERVICES].map((s) => <option key={s} className="text-foreground">{s}</option>)}
            </select>
          }
        >
          <AdoptionFunnel service={funnelService} />
        </ChartContainer>

        {/* INTEGRATION + GEOGRAPHIC side by side */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
          <IntegrationJourneyCard />
          <GeographicCard />
        </div>

        <AuditSaturationSection />

        <Footer onOpenMetrics={() => setShowMetricsLogic(true)} />
      </main>

      {showMetricsLogic && <MetricsLogicModal onClose={() => setShowMetricsLogic(false)} />}
    </div>
  );
}

function Section({ label, title, desc, descItalic, children }: { label?: string; title: string; desc?: string; descItalic?: boolean; children: React.ReactNode }) {
  return (
    <section>
      {label && <div className="section-label mb-1">{label}</div>}
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      {desc && <p className={`text-sm mt-1 mb-5 ${descItalic ? "italic text-muted-foreground" : "text-muted-foreground"}`}>{desc}</p>}
      {!desc && <div className="mb-5" />}
      {children}
    </section>
  );
}

function ServicePortfolioCard() {
  // Move Teleconsultation to the bottom (paused, not live)
  const items = [...SERVICES].sort((a, b) => (a === "Teleconsultation" ? 1 : b === "Teleconsultation" ? -1 : 0))
    .map((s) => ({ name: s, status: serviceStatus[s] }));
  return (
    <div className="card-cream p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <div className="section-label">Service Portfolio Status</div>
        <Tooltip content="Traffic-light status per live service. Green = Live, Red = Paused.">
          <Info className="size-4" />
        </Tooltip>
      </div>
      <ul className="space-y-1.5 mt-1">
        {items.map((i) => (
          <li key={i.name} className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2">
              <span className="size-2 rounded-full" style={{ background: i.status === "live" ? "var(--color-live)" : "var(--color-paused)" }} />
              {i.name}
            </span>
            <StatusBadge status={i.status} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function SmallStatCard({ title, value, foot, tip }: { title: string; value: string; foot: string; tip: string }) {
  return (
    <div className="card-cream p-4">
      <div className="flex items-start justify-between">
        <div className="section-label">{title}</div>
        <Tooltip content={tip}><Info className="size-3.5" /></Tooltip>
      </div>
      <div className="num-amber text-2xl mt-1">{value}</div>
      <div className="text-[11px] text-muted-foreground mt-1">{foot}</div>
    </div>
  );
}



function showBookingsForHspa(filter: string) {
  return filter === "All Services" || filter === "Physical Consultation" || filter === "Teleconsultation";
}

function PartnerTable({ title, columns, rows, numericCol, onDownload }: {
  title: string; columns: string[]; rows: Array<Array<string | number>>; numericCol: number; onDownload: () => void;
}) {
  const initialSort = numericCol >= 0 ? numericCol : 0;
  const [sortIdx, setSortIdx] = useState<number>(initialSort);
  const [dir, setDir] = useState<"asc" | "desc">("desc");
  const sorted = useMemo(() => {
    const cp = [...rows];
    cp.sort((a, b) => {
      const av = a[sortIdx], bv = b[sortIdx];
      if (sortIdx === numericCol) {
        const an = Number(String(av).replace(/[^\d.-]/g, ""));
        const bn = Number(String(bv).replace(/[^\d.-]/g, ""));
        return dir === "asc" ? an - bn : bn - an;
      }
      return dir === "asc" ? String(av).localeCompare(String(bv)) : String(bv).localeCompare(String(av));
    });
    return cp;
  }, [rows, sortIdx, dir, numericCol]);

  return (
    <ChartContainer label="PARTNER REGISTRY" title={title} onDownload={onDownload}>
      <div className="max-h-[260px] overflow-y-auto">
        <table className="w-full text-sm">
          <thead className="sticky top-0 bg-white">
            <tr className="border-b border-border text-left">
              <th className="py-2 pr-2 text-[11px] tracking-wider text-muted-foreground font-semibold w-8">#</th>
              {columns.map((c, i) => (
                <th key={c} className={`py-2 px-2 text-[11px] tracking-wider text-[var(--color-navy)] font-semibold cursor-pointer select-none ${i === numericCol ? "text-right" : ""}`}
                  onClick={() => { if (sortIdx === i) setDir(d => d === "asc" ? "desc" : "asc"); else { setSortIdx(i); setDir("desc"); } }}>
                  {c.toUpperCase()} {sortIdx === i ? (dir === "asc" ? "↑" : "↓") : ""}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((r, i) => (
              <tr key={i} className={i % 2 ? "bg-muted/40" : ""}>
                <td className="py-2.5 pr-2 text-muted-foreground">{i + 1}</td>
                {r.map((cell, ci) => (
                  <td key={ci} className={`py-2.5 px-2 ${ci === numericCol ? "text-right num-amber" : ci === 0 ? "font-medium" : "text-xs text-muted-foreground"}`}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ChartContainer>
  );
}


function AdoptionFunnel({ service }: { service: string }) {
  const base = service === "All Services" ? 1 : 0.25;
  const stages = [
    { label: "Service Discovery", value: Math.round(397500 * base), pct: "100% of cohort", color: "var(--color-navy)" },
    { label: "Provider Selection", value: Math.round(48200 * base), pct: "12.1% of cohort", color: "oklch(0.4 0.1 250)" },
    { label: "Booking Initiated", value: Math.round(14600 * base), pct: "3.7% of cohort", color: "var(--color-chart-blue)" },
    { label: "Booking Completed", value: Math.round(3100 * base), pct: "0.79% of cohort", color: "var(--color-chart-teal)" },
    { label: "Consultation Completed", value: Math.round(3050 * base), pct: "0.78% of cohort", color: "var(--color-bar-coral)" },
  ];
  const convs = ["12.1% conv.", "30.3% conv.", "21.6% conv.", "98.4% conv."];

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        {stages.map((s, i) => (
          <div key={s.label}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] tracking-wider text-muted-foreground font-semibold">STAGE {i+1}</span>
              {i > 0 && <span className="text-[11px] text-[var(--color-bar-coral)] font-medium">{convs[i-1]}</span>}
            </div>
            <div className="rounded-lg p-4 text-white" style={{ background: s.color }}>
              <div className="text-sm font-medium opacity-90">{s.label}</div>
              <div className="text-3xl font-bold mt-1">{s.value >= 1000 ? `${(s.value/1000).toFixed(s.value < 10000 ? 1 : 0)}K` : s.value}</div>
              <div className="text-xs opacity-75 mt-1">{s.pct}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
        <div className="bg-muted/60 rounded-md p-3"><div className="text-sm font-semibold">Biggest drop-off</div><div className="text-xs text-muted-foreground mt-0.5">Discovery → Selection · 87.9% leakage</div></div>
        <div className="bg-muted/60 rounded-md p-3"><div className="text-sm font-semibold">Selection → Booking</div><div className="text-xs text-muted-foreground mt-0.5">30.3% reach booking</div></div>
        <div className="bg-muted/60 rounded-md p-3"><div className="text-sm font-semibold">End-to-end conversion</div><div className="text-xs text-muted-foreground mt-0.5">0.78% of discoveries reach completion</div></div>
      </div>
      <div className="text-xs italic text-muted-foreground mt-3">only in private view</div>
    </div>
  );
}

function IntegrationJourneyCard() {
  const [view, setView] = useState<"public" | "private">("public");
  const [sortDesc, setSortDesc] = useState(true);
  const [serviceFilter, setServiceFilter] = useState("All Services");

  // PUBLIC: service-wise averages
  const publicMax = Math.max(...integrationJourney.map((d) => d.days));
  const publicRows = useMemo(() => {
    const cp = [...integrationJourney];
    cp.sort((a, b) => sortDesc ? b.days - a.days : a.days - b.days);
    return cp;
  }, [sortDesc]);

  // PRIVATE: integrator-wise timelines
  const privateRows = useMemo(() => {
    const filtered = integrators.filter((i) => serviceFilter === "All Services" || i.service === serviceFilter);
    const withDays = filtered.map((i) => {
      const o = new Date(i.onboardDate).getTime();
      const g = new Date(i.goLiveDate).getTime();
      return { ...i, days: Math.round((g - o) / (1000 * 60 * 60 * 24)), oMs: o, gMs: g };
    });
    withDays.sort((a, b) => sortDesc ? b.days - a.days : a.days - b.days);
    return withDays;
  }, [serviceFilter, sortDesc]);

  const tMin = privateRows.length ? Math.min(...privateRows.map((r) => r.oMs)) : 0;
  const tMax = privateRows.length ? Math.max(...privateRows.map((r) => r.gMs)) : 1;
  const tRange = tMax - tMin || 1;
  const fmtMonth = (ms: number) => new Date(ms).toLocaleDateString("en-IN", { month: "short", year: "2-digit" });

  // 4 evenly spaced timeline ticks
  const ticks = [0, 0.33, 0.66, 1].map((p) => tMin + p * tRange);

  return (
    <ChartContainer
      label={view === "private" ? "ONBOARDING · INTEGRATOR-WISE (PRIVATE VIEW ONLY)" : "ONBOARDING · SERVICE-WISE AVERAGE"}
      title="Integration Journey"
      right={
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex bg-white/10 rounded-md p-0.5">
            <button onClick={() => setView("public")} className={`px-2.5 py-1 rounded text-xs font-medium ${view === "public" ? "bg-white text-[var(--color-navy)]" : "text-white"}`}>Public View</button>
            <button onClick={() => setView("private")} className={`px-2.5 py-1 rounded text-xs font-medium ${view === "private" ? "bg-white text-[var(--color-navy)]" : "text-white"}`}>Private View</button>
          </div>
          {view === "private" && (
            <select value={serviceFilter} onChange={(e) => setServiceFilter(e.target.value)}
              className="text-xs border border-white/30 bg-white/10 text-white rounded px-2 py-1">
              {["All Services", ...SERVICES].map((s) => <option key={s} className="text-foreground">{s}</option>)}
            </select>
          )}
          <button onClick={() => setSortDesc((s) => !s)} className="text-xs opacity-80 hover:opacity-100">↕ Sort</button>
        </div>
      }
      onDownload={() => downloadCSV(view === "public" ? "integration-journey.csv" : "integration-journey-integrators.csv", view === "public" ? integrationJourney : privateRows)}
    >
      {view === "public" ? (
        <div className="space-y-4">
          {publicRows.map((r) => (
            <div key={r.service} className="grid grid-cols-12 items-center gap-3">
              <div className="col-span-3">
                <div className="font-semibold text-sm">{r.service}</div>
                <div className="text-xs text-muted-foreground">{r.integrators} integrators</div>
              </div>
              <div className="col-span-7">
                <div className="h-7 rounded relative bg-muted/40">
                  <div className="h-full rounded flex items-center px-2 text-xs font-semibold text-white"
                    style={{ width: `${(r.days / publicMax) * 100}%`, background: r.color }}>
                    {r.days} days
                  </div>
                </div>
              </div>
              <div className="col-span-2 text-xs text-muted-foreground text-right">{r.from} → {r.to}</div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          {/* Timeline header */}
          <div className="grid grid-cols-12 items-center gap-3 mb-2 pb-2 border-b border-border">
            <div className="col-span-3"></div>
            <div className="col-span-8 relative h-4">
              {ticks.map((t, i) => (
                <div key={i} className="absolute -top-0.5 text-[11px] text-muted-foreground" style={{ left: `${(i / (ticks.length - 1)) * 100}%`, transform: i === ticks.length - 1 ? "translateX(-100%)" : "translateX(-50%)" }}>
                  {fmtMonth(t)}
                </div>
              ))}
            </div>
            <div className="col-span-1 text-right text-[11px] tracking-wider text-muted-foreground font-semibold">DAYS</div>
          </div>

          <div className="space-y-3">
            {privateRows.map((r) => {
              const left = ((r.oMs - tMin) / tRange) * 100;
              const width = ((r.gMs - r.oMs) / tRange) * 100;
              return (
                <div key={r.name} className="grid grid-cols-12 items-center gap-3">
                  <div className="col-span-3">
                    <div className="font-semibold text-sm truncate" title={r.name}>{r.name}</div>
                    <div className="text-[11px] text-muted-foreground">{r.role} · {r.service}</div>
                  </div>
                  <div className="col-span-8">
                    <div className="relative h-6 bg-muted/30 rounded">
                      <div className="absolute top-1/2 -translate-y-1/2 h-1.5 rounded-full bg-[var(--color-bar-coral)]/70" style={{ left: `${left}%`, width: `${width}%` }} />
                      <div className="absolute top-1/2 -translate-y-1/2 size-2.5 rounded-full bg-[var(--color-chart-blue)] border-2 border-white" style={{ left: `calc(${left}% - 5px)` }} title={`Onboarded ${fmtMonth(r.oMs)}`} />
                      <div className="absolute top-1/2 -translate-y-1/2 size-2.5 rounded-full bg-[var(--color-live)] border-2 border-white" style={{ left: `calc(${left + width}% - 5px)` }} title={`Go Live ${fmtMonth(r.gMs)}`} />
                    </div>
                  </div>
                  <div className="col-span-1 text-sm font-semibold text-right num-amber">{r.days}</div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center gap-4 mt-5 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5"><span className="size-2.5 rounded-full bg-[var(--color-chart-blue)]" /> Date of Onboarding</span>
            <span className="inline-flex items-center gap-1.5"><span className="size-2.5 rounded-full bg-[var(--color-live)]" /> Date of Go Live</span>
          </div>
          <div className="text-xs italic text-muted-foreground mt-2">only in private view</div>
        </div>
      )}
    </ChartContainer>
  );
}

function GeographicCard() {
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
    { name: "PMJAY Hospital Discovery", searches: Math.round(92142 * share) },
    { name: "Blood Bank Discovery", searches: Math.round(91728 * share) },
    { name: "Ambulance Discovery", searches: Math.round(18240 * share) },
    { name: "Jan Aushadhi Kendra Discovery", searches: Math.round(12480 * share) },
  ] : [];
  const fulfilmentServices: Array<{ name: string; searches: number; bookings: number; status: "live" | "paused" }> = selectedState ? [
    { name: "Teleconsultation", searches: Math.round(92000 * share), bookings: Math.round(2050 * share), status: "paused" },
    { name: "Physical Consultation", searches: Math.round(1200 * share), bookings: Math.round(184 * share), status: "live" },
  ] : [];

  return (
    <ChartContainer label="WHERE THE ACTION IS" title="Geographic Performance"
      right={
        <select value={serviceFilter} onChange={(e) => setServiceFilter(e.target.value)}
          className="text-xs border border-white/30 bg-white/10 text-white rounded px-2 py-1">
          {["All Services", ...SERVICES].map((s) => <option key={s} className="text-foreground">{s}</option>)}
        </select>
      }
      onDownload={() => downloadCSV("geographic-performance.csv", data)}
    >
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
