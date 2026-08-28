import { LogOut } from "lucide-react";

const TABS_BEFORE = ["ABDM Insight"] as const;
const TABS_AFTER = [
  "Scan & Share", "Incentive Scheme", "Adoption",
  "Microsite", "NHPR", "Trends", "Model ABDM Facilities", "Reporting Solutions",
  "HIECM", "ABHA Transaction Visibility", "Scan & Pay", "CDSS", "Partner Reporting", "NMC",
] as const;

const SERVICES = ["All", "PMJAY Hospital Discovery", "Blood Bank Discovery", "Physical Consultation Booking", "Teleconsultation", "Ambulance Booking", "Jan Aushadhi Kendra Discovery", "NOTTO Service Discovery", "AMRIT Pharmacy Discovery", "Dialysis Centre Discovery"];

export type DashboardView = "public" | "private";

export function DashboardHeader({
  service, onServiceChange, view, onViewChange,
}: { service: string; onServiceChange: (s: string) => void; view: DashboardView; onViewChange: (v: DashboardView) => void }) {
  const renderTab = (t: string, opts?: { active?: boolean; onClick?: () => void }) => {
    const isActive = opts?.active ?? false;
    return (
      <button
        key={t}
        onClick={opts?.onClick}
        className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap border transition ${
          isActive
            ? "bg-[var(--color-navy)] text-white border-[var(--color-navy)]"
            : "bg-white text-foreground border-border hover:border-[var(--color-navy)]"
        }`}
      >
        {t}
      </button>
    );
  };
  return (
    <header className="sticky top-0 z-40 bg-background shadow-sm">
      {/* Row 1 */}
      <div className="bg-white border-b border-border">
        <div className="px-6 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="size-12 rounded-full bg-white border border-border flex items-center justify-center font-bold text-[var(--color-navy)] text-sm">NHA</div>
              <div>
                <div className="text-xs font-semibold tracking-wider text-[var(--color-navy)]">NATIONAL HEALTH AUTHORITY</div>
                <div className="text-[11px] text-muted-foreground">Ministry of Health &amp; Family Welfare · Govt. of India</div>
              </div>
            </div>
            <div className="flex items-center gap-3 pl-6 border-l border-border">
              <div className="size-12 rounded-md bg-[var(--color-bar-coral)] text-white font-bold flex items-center justify-center text-xs">ABDM</div>
              <div>
                <div className="text-sm font-semibold text-foreground">Ayushman Bharat Digital Mission</div>
                <div className="text-[11px] text-muted-foreground">Last updated · 17 Apr 2026 · 10:33 IST</div>
              </div>
            </div>
          </div>
          <button className="flex items-center gap-2 text-sm text-foreground hover:text-[var(--color-navy)]">
            <LogOut className="size-4" /> Logout
          </button>
        </div>
      </div>

      {/* Row 2 — navy bar */}
      <div className="bg-[var(--color-navy)] text-white">
        <div className="px-6 py-3 flex items-center gap-8 text-sm">
          <a href="#" className="hover:underline">Generate ABHA (Ayushman Bharat Health Account)</a>
          <span className="opacity-40">|</span>
          <a href="#" className="hover:underline">Register Health Facility</a>
          <span className="opacity-40">|</span>
          <a href="#" className="hover:underline">Healthcare Professionals Registry</a>
        </div>
      </div>

      {/* Row 3 — tabs */}
      <div className="bg-white border-b border-border">
        <div className="px-6 py-3 flex items-center gap-2 overflow-x-auto">
          <div className="flex items-center gap-2 flex-1">
            {TABS_BEFORE.map((t) => renderTab(t))}
            {renderTab("UHI (Public)", { active: view === "public", onClick: () => onViewChange("public") })}
            {renderTab("UHI (Private)", { active: view === "private", onClick: () => onViewChange("private") })}
            {TABS_AFTER.map((t) => renderTab(t))}
          </div>
          <div className="flex items-center gap-2 pl-3 border-l border-border">
            <span className="text-[11px] tracking-wider text-muted-foreground font-semibold">SERVICE</span>
            <select
              value={service}
              onChange={(e) => onServiceChange(e.target.value)}
              className="text-xs border border-border rounded-md px-3 py-1.5 bg-white min-w-[140px]"
            >
              {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
      </div>
    </header>
  );
}
