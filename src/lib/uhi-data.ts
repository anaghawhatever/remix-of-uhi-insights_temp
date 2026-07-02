// Mock data for UHI Insights Dashboard
export type ServiceKey = "PMJAY Hospital Discovery" | "Blood Bank Discovery" | "Teleconsultation" | "Physical Consultation" | "Ambulance Discovery" | "Jan Aushadhi Kendra Discovery";

export const SERVICES: ServiceKey[] = [
  "PMJAY Hospital Discovery",
  "Blood Bank Discovery",
  "Teleconsultation",
  "Physical Consultation",
  "Ambulance Discovery",
  "Jan Aushadhi Kendra Discovery",
];

export const serviceStatus: Record<ServiceKey, "live" | "paused"> = {
  "PMJAY Hospital Discovery": "live",
  "Blood Bank Discovery": "live",
  "Teleconsultation": "paused",
  "Physical Consultation": "live",
  "Ambulance Discovery": "live",
  "Jan Aushadhi Kendra Discovery": "live",
};

export const serviceColor: Record<ServiceKey, string> = {
  "PMJAY Hospital Discovery": "var(--color-chart-blue)",
  "Blood Bank Discovery": "var(--color-bar-coral)",
  "Teleconsultation": "var(--color-chart-teal)",
  "Physical Consultation": "var(--color-chart-purple)",
  "Ambulance Discovery": "var(--color-chart-orange)",
  "Jan Aushadhi Kendra Discovery": "var(--color-chart-green)",
};

export const liveServices = {
  "PMJAY Hospital Discovery": {
    totalSearches: 354484,
    euas: 5,
    hspas: 1,
    liveSince: "Nov 2025",
    extraLabel: "Empanelled Hospitals",
    extraValue: "30,864",
    monthly: [
      { month: "Nov", value: 4200 },
      { month: "Dec", value: 9800 },
      { month: "Jan", value: 16400 },
      { month: "Feb", value: 19200 },
      { month: "Mar", value: 35400 },
    ],
  },
  "Blood Bank Discovery": {
    totalSearches: 163185,
    euas: 13,
    hspas: 1,
    liveSince: "Aug 2025",
    extraLabel: "Blood Banks Listed",
    extraValue: "4,000+",
    monthly: [
      { month: "Jan", value: 5200 },
      { month: "Feb", value: 1800 },
      { month: "Mar", value: 1600 },
      { month: "Apr", value: 2400 },
      { month: "May", value: 3200 },
      { month: "Jun", value: 4100 },
      { month: "Jul", value: 6800 },
      { month: "Aug", value: 11200 },
      { month: "Sep", value: 17400 },
      { month: "Oct", value: 8200 },
      { month: "Nov", value: 7500 },
      { month: "Dec", value: 9800 },
    ],
  },
  "Ambulance Discovery": {
    totalSearches: 356,
    euas: 2,
    hspas: 1,
    liveSince: "May 2026",
    extraLabel: "Fleet Size",
    extraValue: "5,000+",
    monthly: [
      { month: "May", value: 4200 },
      { month: "Jun", value: 14040 },
    ],
  },
  "Teleconsultation": {
    totalBookings: 2050,
    euas: 5,
    hspas: 4,
    liveSince: "Jun 2023",
    extraLabel: "Doctors Onboarded",
    extraValue: "1,820",
    monthly: [
      { month: "Jun '23", value: 120 },
      { month: "Sep '23", value: 380 },
      { month: "Dec '23", value: 520 },
      { month: "Mar '24", value: 640 },
      { month: "Apr '24", value: 270 },
      { month: "Today", value: 120 },
    ],
  },
  "Physical Consultation": {
    totalBookings: 184,
    euas: 3,
    hspas: 2,
    liveSince: "Mar 2026",
    extraLabel: "Doctors Onboarded",
    extraValue: "184",
    monthly: [
      { month: "Dec", value: 0 },
      { month: "Jan", value: 0 },
      { month: "Feb", value: 4 },
      { month: "Mar", value: 22 },
    ],
  },
  "Jan Aushadhi Kendra Discovery": {
    totalSearches: 12480,
    euas: 2,
    hspas: 1,
    liveSince: "Apr 2026",
    extraLabel: "Kendras Listed",
    extraValue: "10,500+",
    monthly: [
      { month: "Apr", value: 3200 },
      { month: "May", value: 4180 },
      { month: "Jun", value: 5100 },
    ],
  },
} as const;

export const combinedGrowth = (() => {
  const months = [
    "Sep '25","Oct '25","Nov '25","Dec '25","Jan '26","Feb '26","Mar '26","Apr '26","May '26","Jun '26"
  ];
  const pmjay = [0,0,4200,14000,30400,49600,68800,82000,89000,92142];
  const blood = [38000,46000,55000,63000,72000,80000,91728,95000,99000,103000];
  const tele = [89000,90000,90800,91500,91900,92000,92000,92000,92000,92000];
  const phys = [0,0,0,0,0,8,25,90,140,184];
  const amb = [0,0,0,0,0,0,0,0,4200,18240];
  return months.map((m, i) => ({
    month: m,
    PMJAY: pmjay[i],
    Blood: blood[i],
    Tele: tele[i],
    Phys: phys[i],
    Amb: amb[i],
    Overall: Math.round((pmjay[i] + blood[i] + tele[i] + phys[i] + amb[i]) / 5),
  }));
})();

export const euaPartners = [
  { name: "Secure", service: "PMJAY Hospital Discovery", searches: 32420, onboarded: "Oct 2025" },
  { name: "Anahat Solutions Pvt Ltd", service: "Blood Bank Discovery · PMJAY Hospital Discovery", searches: 27809, onboarded: "Jul 2025" },
  { name: "Ublood Private Limited", service: "Blood Bank Discovery", searches: 14907, onboarded: "Aug 2025" },
  { name: "Pristyn Care", service: "Teleconsultation · Physical Consultation", searches: 4533, onboarded: "Feb 2024" },
  { name: "MyHealthRecords", service: "Blood Bank Discovery", searches: 2480, onboarded: "Sep 2025" },
  { name: "DocsApp", service: "Teleconsultation", searches: 8200, onboarded: "Jan 2024" },
  { name: "PMJAY Connect", service: "PMJAY Hospital Discovery", searches: 12420, onboarded: "Dec 2025" },
  { name: "AmbuFleet", service: "Ambulance Discovery", searches: 9140, onboarded: "May 2026" },
];

export const hspaPartners = [
  { name: "C-Dac E-Sushrut", service: "Teleconsultation", bookings: 820, onboarded: "Jun 2023" },
  { name: "eSanjeevani", service: "Teleconsultation", bookings: 1100, onboarded: "Jul 2023" },
  { name: "Apollo 24/7", service: "Teleconsultation · Physical Consultation", bookings: 184, onboarded: "Mar 2026" },
  { name: "Ziqitza HealthCare", service: "Ambulance Discovery", bookings: 0, onboarded: "May 2026" },
  { name: "Pmjay", service: "PMJAY Hospital Discovery", bookings: 0, onboarded: "Nov 2025" },
  { name: "Anahat Networks", service: "Blood Bank Discovery", bookings: 0, onboarded: "Aug 2025" },
];

export const states = [
  { name: "Maharashtra", value: 32480 },
  { name: "Tamil Nadu", value: 26840 },
  { name: "Karnataka", value: 24180 },
  { name: "Delhi", value: 22480 },
  { name: "Uttar Pradesh", value: 19840 },
  { name: "Gujarat", value: 18420 },
  { name: "Telangana", value: 17820 },
  { name: "Kerala", value: 16240 },
  { name: "Andhra Pradesh", value: 14820 },
  { name: "West Bengal", value: 14620 },
  { name: "Rajasthan", value: 11240 },
  { name: "Madhya Pradesh", value: 10840 },
  { name: "Haryana", value: 9240 },
  { name: "Bihar", value: 8950 },
  { name: "Punjab", value: 8420 },
  { name: "Odisha", value: 6840 },
  { name: "Jharkhand", value: 3120 },
  { name: "Assam", value: 2940 },
  { name: "Chhattisgarh", value: 2410 },
  { name: "Uttarakhand", value: 1820 },
];

export const integrationJourney = [
  { service: "Blood Bank Discovery", days: 268, integrators: 6, from: "Sept 24", to: "Jun 25", color: "var(--color-bar-coral)" },
  { service: "Physical Consultation", days: 199, integrators: 3, from: "Sept 25", to: "Mar 26", color: "var(--color-chart-purple)" },
  { service: "Ambulance Discovery", days: 160, integrators: 2, from: "Nov 25", to: "May 26", color: "var(--color-chart-orange)" },
  { service: "PMJAY Hospital Discovery", days: 157, integrators: 4, from: "May 25", to: "Nov 25", color: "var(--color-chart-blue)" },
  { service: "Teleconsultation", days: 148, integrators: 5, from: "Jan 23", to: "Jun 23", color: "var(--color-chart-teal)" },
];

export const metricsLogic = [
  { metric: "Booking Conversion Rate", service: "All", definition: "% of searches that convert to completed bookings", source: "Gateway logs", calc: "Total completed bookings ÷ Total searches across all services", unit: "%", refresh: "Daily", location: "Detailed Indicators" },
  { metric: "ABHA Saturation", service: "All", definition: "% of UHI requests carrying ABHA ID/address", source: "Gateway logs", calc: "Requests with ABHA ID or ABHA address ÷ Total API endpoint hits", unit: "%", refresh: "Daily", location: "Registries / Gateway" },
  { metric: "HFR Saturation", service: "All", definition: "% of UHI providers linked to HFR", source: "HFR Registry", calc: "Providers in UHI linked to HFR ÷ Total providers in UHI", unit: "%", refresh: "Weekly", location: "Registries in UHI" },
  { metric: "HPR Saturation", service: "All", definition: "% of UHI doctors linked to HPR", source: "HPR Registry", calc: "Doctors in UHI linked to HPR ÷ Total doctors in UHI", unit: "%", refresh: "Weekly", location: "Registries in UHI" },
  { metric: "Audit API %", service: "All", definition: "Share of API calls that are Audit API hits", source: "Gateway logs", calc: "Audit API endpoint hits ÷ All API endpoint hits which have the Audit API endpoint designed", unit: "%", refresh: "Daily", location: "Gateway at a Glance (private)" },
  { metric: "Search Growth (QoQ %)", service: "All", definition: "Quarter-on-quarter % growth in searches", source: "Gateway logs", calc: "(Current quarter searches − Previous quarter searches) ÷ Previous quarter searches × 100", unit: "%", refresh: "Quarterly", location: "Detailed Indicators" },
  { metric: "EUAs Integrated", service: "All", definition: "Count of EUAs live", source: "Onboarding", calc: "Count of End User Applications that have reached Go Live status", unit: "Count", refresh: "On change", location: "Gateway / Service cards" },
  { metric: "Ecosystem Depth", service: "All", definition: "Live EUAs + HSPAs", source: "Onboarding", calc: "Total count of live EUAs + live HSPAs across all services", unit: "Count", refresh: "On change", location: "Detailed Indicators" },
  { metric: "Daily Search Requests", service: "All", definition: "Avg searches per day", source: "Gateway logs", calc: "Total searches ÷ Number of active days in period", unit: "Count/day", refresh: "Daily", location: "Gateway at a Glance" },
  { metric: "Number of Bookings", service: "Tele + Physical", definition: "Aggregate completed bookings", source: "Fulfilment logs", calc: "Total completed bookings from Teleconsultation + Physical Consultation", unit: "Count", refresh: "Daily", location: "Gateway at a Glance" },
];

export type Integrator = {
  name: string;
  role: "EUA" | "HSPA";
  service: ServiceKey;
  onboardDate: string; // YYYY-MM-DD
  goLiveDate: string;
};

export const integrators: Integrator[] = [
  { name: "e-Raktkosh", role: "HSPA", service: "Blood Bank Discovery", onboardDate: "2024-09-15", goLiveDate: "2025-06-29" },
  { name: "Driefcase Healthtech Pvt Ltd", role: "EUA", service: "Blood Bank Discovery", onboardDate: "2024-12-02", goLiveDate: "2025-08-30" },
  { name: "Skearth Private Limited", role: "EUA", service: "Blood Bank Discovery", onboardDate: "2025-02-04", goLiveDate: "2025-10-29" },
  { name: "Jdeanz Healthtech Pvt Ltd", role: "EUA", service: "Blood Bank Discovery", onboardDate: "2025-02-18", goLiveDate: "2025-11-08" },
  { name: "Ublood Private Limited", role: "EUA", service: "Blood Bank Discovery", onboardDate: "2025-03-12", goLiveDate: "2025-11-30" },
  { name: "Anahat Solutions Pvt Ltd", role: "EUA", service: "Blood Bank Discovery", onboardDate: "2024-11-20", goLiveDate: "2025-07-30" },
  { name: "Secure", role: "EUA", service: "PMJAY Hospital Discovery", onboardDate: "2025-05-10", goLiveDate: "2025-10-15" },
  { name: "PMJAY Connect", role: "EUA", service: "PMJAY Hospital Discovery", onboardDate: "2025-06-22", goLiveDate: "2025-12-01" },
  { name: "Pmjay", role: "HSPA", service: "PMJAY Hospital Discovery", onboardDate: "2025-05-01", goLiveDate: "2025-11-04" },
  { name: "Apollo 24/7", role: "HSPA", service: "Physical Consultation", onboardDate: "2025-09-08", goLiveDate: "2026-03-26" },
  { name: "Pristyn Care", role: "EUA", service: "Physical Consultation", onboardDate: "2025-10-04", goLiveDate: "2026-03-20" },
  { name: "DocsApp", role: "EUA", service: "Teleconsultation", onboardDate: "2023-01-15", goLiveDate: "2023-06-12" },
  { name: "eSanjeevani", role: "HSPA", service: "Teleconsultation", onboardDate: "2023-02-01", goLiveDate: "2023-07-04" },
  { name: "C-Dac E-Sushrut", role: "HSPA", service: "Teleconsultation", onboardDate: "2023-01-20", goLiveDate: "2023-06-25" },
  { name: "AmbuFleet", role: "EUA", service: "Ambulance Discovery", onboardDate: "2025-11-12", goLiveDate: "2026-05-02" },
  { name: "Ziqitza HealthCare", role: "HSPA", service: "Ambulance Discovery", onboardDate: "2025-12-05", goLiveDate: "2026-05-20" },
];

// State name → key used in topojson india-states.json (st_nm)
export const stateNameMap: Record<string, string> = {
  "Maharashtra": "Maharashtra",
  "Tamil Nadu": "Tamil Nadu",
  "Karnataka": "Karnataka",
  "Delhi": "Delhi",
  "Uttar Pradesh": "Uttar Pradesh",
  "Gujarat": "Gujarat",
  "Telangana": "Telangana",
  "Kerala": "Kerala",
  "Andhra Pradesh": "Andhra Pradesh",
  "West Bengal": "West Bengal",
  "Rajasthan": "Rajasthan",
  "Madhya Pradesh": "Madhya Pradesh",
  "Haryana": "Haryana",
  "Bihar": "Bihar",
  "Punjab": "Punjab",
  "Odisha": "Odisha",
  "Jharkhand": "Jharkhand",
  "Assam": "Assam",
  "Chhattisgarh": "Chhattisgarh",
  "Uttarakhand": "Uttarakhand",
};
