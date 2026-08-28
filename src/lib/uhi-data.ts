// Mock data for UHI Insights Dashboard
export type ServiceKey =
  | "PMJAY Hospital Discovery"
  | "Blood Bank Discovery"
  | "Physical Consultation Booking"
  | "Teleconsultation"
  | "Ambulance Booking"
  | "Jan Aushadhi Kendra Discovery"
  | "NOTTO Service Discovery"
  | "AMRIT Pharmacy Discovery"
  | "Dialysis Centre Discovery";

export const SERVICES: ServiceKey[] = [
  "PMJAY Hospital Discovery",
  "Blood Bank Discovery",
  "Physical Consultation Booking",
  "Teleconsultation",
  "Ambulance Booking",
  "Jan Aushadhi Kendra Discovery",
  "NOTTO Service Discovery",
  "AMRIT Pharmacy Discovery",
  "Dialysis Centre Discovery",
];

// External metric logic sheets (linked from download icons)
export const METRIC_SHEETS = {
  serviceCards: "https://docs.google.com/spreadsheets/d/1A5PAPoGP5ANfTCGuq83dTtq6lkIe0ABGbKzhPFx1X9E/edit?gid=0#gid=0",
  integrationTable: "https://docs.google.com/spreadsheets/d/1A5PAPoGP5ANfTCGuq83dTtq6lkIe0ABGbKzhPFx1X9E/edit?gid=1620469653#gid=1620469653",
  geographic: "https://docs.google.com/spreadsheets/d/1A5PAPoGP5ANfTCGuq83dTtq6lkIe0ABGbKzhPFx1X9E/edit?gid=188279482#gid=188279482",
  combinedGrowth: "https://docs.google.com/spreadsheets/d/1A5PAPoGP5ANfTCGuq83dTtq6lkIe0ABGbKzhPFx1X9E/edit?gid=1851795242#gid=1851795242",
} as const;

export const openSheet = (url: string) => {
  if (typeof window !== "undefined") window.open(url, "_blank", "noopener,noreferrer");
};

// Services where a booking is part of the flow
export const BOOKING_SERVICES: ServiceKey[] = [
  "Teleconsultation",
  "Physical Consultation Booking",
  "Ambulance Booking",
];

export const hasBooking = (name: string) =>
  (BOOKING_SERVICES as string[]).some((s) => name.includes(s));

export const serviceStatus: Record<ServiceKey, "live" | "paused"> = {
  "PMJAY Hospital Discovery": "live",
  "Blood Bank Discovery": "live",
  "Teleconsultation": "paused",
  "Physical Consultation Booking": "live",
  "Ambulance Booking": "live",
  "Jan Aushadhi Kendra Discovery": "live",
  "NOTTO Service Discovery": "live",
  "AMRIT Pharmacy Discovery": "live",
  "Dialysis Centre Discovery": "live",
};

export const serviceColor: Record<string, string> = {
  "PMJAY Hospital Discovery": "var(--color-chart-blue)",
  "Blood Bank Discovery": "var(--color-bar-coral)",
  "Teleconsultation": "var(--color-chart-teal)",
  "Physical Consultation Booking": "var(--color-chart-purple)",
  "Ambulance Booking": "var(--color-chart-orange)",
  "Ambulance Discovery": "var(--color-chart-orange)",
  "Jan Aushadhi Kendra Discovery": "oklch(0.6 0.15 140)",
  "AMRIT Pharmacy Discovery": "oklch(0.55 0.16 20)",
  "NOTTO Service Discovery": "oklch(0.5 0.18 280)",
  "Dialysis Centre Discovery": "oklch(0.55 0.14 200)",
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
      { month: "Jan", value: 16400 },
      { month: "Feb", value: 19200 },
      { month: "Mar", value: 35400 },
      { month: "Apr", value: 41200 },
      { month: "May", value: 46800 },
      { month: "Jun", value: 52100 },
      { month: "Jul", value: 58400 },
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
    ],
  },
  "Ambulance Booking": {
    totalSearches: 356,
    totalBookings: 128,
    euas: 2,
    hspas: 1,
    liveSince: "May 2026",
    extraLabel: "Fleet Size",
    extraValue: "5,000+",
    monthly: [
      { month: "Jan", value: 0 },
      { month: "Feb", value: 0 },
      { month: "Mar", value: 0 },
      { month: "Apr", value: 0 },
      { month: "May", value: 24 },
      { month: "Jun", value: 46 },
      { month: "Jul", value: 58 },
    ],
  },
  "Teleconsultation": {
    totalBookings: 3816,
    totalSearches: 92000,
    euas: 5,
    hspas: 4,
    liveSince: "Jun 2023",
    extraLabel: "Doctors Available",
    extraValue: "1,820",
    monthly: [
      { month: "Jan", value: 520 },
      { month: "Feb", value: 610 },
      { month: "Mar", value: 640 },
      { month: "Apr", value: 270 },
      { month: "May", value: 310 },
      { month: "Jun", value: 285 },
      { month: "Jul", value: 240 },
    ],
  },
  "Physical Consultation Booking": {
    totalBookings: 184,
    totalSearches: 3554,
    euas: 3,
    hspas: 2,
    liveSince: "Mar 2026",
    extraLabel: "Doctors Available",
    extraValue: "184",
    monthly: [
      { month: "Jan", value: 0 },
      { month: "Feb", value: 0 },
      { month: "Mar", value: 22 },
      { month: "Apr", value: 38 },
      { month: "May", value: 44 },
      { month: "Jun", value: 40 },
      { month: "Jul", value: 40 },
    ],
  },
  "Jan Aushadhi Kendra Discovery": {
    totalSearches: 986,
    euas: 2,
    hspas: 1,
    liveSince: "Apr 2026",
    extraLabel: "Kendras Listed",
    extraValue: "10,500+",
    monthly: [
      { month: "Jan", value: 0 },
      { month: "Feb", value: 0 },
      { month: "Mar", value: 0 },
      { month: "Apr", value: 210 },
      { month: "May", value: 320 },
      { month: "Jun", value: 456 },
      { month: "Jul", value: 512 },
    ],
  },
  "NOTTO Service Discovery": {
    totalSearches: 742,
    euas: 1,
    hspas: 1,
    liveSince: "May 2026",
    extraLabel: "Centres Listed",
    extraValue: "650+",
    monthly: [
      { month: "Jan", value: 0 },
      { month: "Feb", value: 0 },
      { month: "Mar", value: 0 },
      { month: "Apr", value: 0 },
      { month: "May", value: 280 },
      { month: "Jun", value: 462 },
      { month: "Jul", value: 508 },
    ],
  },
  "AMRIT Pharmacy Discovery": {
    totalSearches: 1180,
    euas: 2,
    hspas: 1,
    liveSince: "Jun 2026",
    extraLabel: "Pharmacies Listed",
    extraValue: "220+",
    monthly: [
      { month: "Jan", value: 0 },
      { month: "Feb", value: 0 },
      { month: "Mar", value: 0 },
      { month: "Apr", value: 0 },
      { month: "May", value: 0 },
      { month: "Jun", value: 540 },
      { month: "Jul", value: 640 },
    ],
  },
  "Dialysis Centre Discovery": {
    totalSearches: 412,
    euas: 1,
    hspas: 1,
    liveSince: "Jul 2026",
    extraLabel: "Centres Listed",
    extraValue: "1,300+",
    monthly: [
      { month: "Jan", value: 0 },
      { month: "Feb", value: 0 },
      { month: "Mar", value: 0 },
      { month: "Apr", value: 0 },
      { month: "May", value: 0 },
      { month: "Jun", value: 0 },
      { month: "Jul", value: 412 },
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
  const jak = [0,0,0,0,0,0,0,3200,7380,12480];
  const jam = [0,0,0,0,0,0,0,210,530,986];
  const notto = [0,0,0,0,0,0,0,0,280,742];
  const amrit = [0,0,0,0,0,0,0,240,640,1180];
  return months.map((m, i) => ({
    month: m,
    PMJAY: pmjay[i],
    Blood: blood[i],
    Tele: tele[i],
    Phys: phys[i],
    Amb: amb[i],
    JAK: jak[i],
    JAM: jam[i],
    NOTTO: notto[i],
    AMRIT: amrit[i],
    Overall: Math.round((pmjay[i] + blood[i] + tele[i] + phys[i] + amb[i] + jak[i] + jam[i] + notto[i] + amrit[i]) / 9),
  }));
})();


export const euaPartners = [
  { name: "Secure", service: "PMJAY Hospital Discovery", searches: 32420, onboarded: "Oct 2025" },
  { name: "Anahat Solutions Pvt Ltd", service: "Blood Bank Discovery · PMJAY Hospital Discovery", searches: 27809, onboarded: "Jul 2025" },
  { name: "Ublood Private Limited", service: "Blood Bank Discovery", searches: 14907, onboarded: "Aug 2025" },
  { name: "Pristyn Care", service: "Teleconsultation · Physical Consultation Booking", searches: 4533, onboarded: "Feb 2024" },
  { name: "MyHealthRecords", service: "Blood Bank Discovery", searches: 2480, onboarded: "Sep 2025" },
  { name: "DocsApp", service: "Teleconsultation", searches: 8200, onboarded: "Jan 2024" },
  { name: "PMJAY Connect", service: "PMJAY Hospital Discovery", searches: 12420, onboarded: "Dec 2025" },
  { name: "AmbuFleet", service: "Ambulance Booking", searches: 9140, onboarded: "May 2026" },
];

export const hspaPartners = [
  { name: "C-Dac E-Sushrut", service: "Teleconsultation", bookings: 820, onboarded: "Jun 2023" },
  { name: "eSanjeevani", service: "Teleconsultation", bookings: 1100, onboarded: "Jul 2023" },
  { name: "Apollo 24/7", service: "Teleconsultation · Physical Consultation Booking", bookings: 184, onboarded: "Mar 2026" },
  { name: "Ziqitza HealthCare", service: "Ambulance Booking", bookings: 0, onboarded: "May 2026" },
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

export const metricsLogic = [
  { metric: "Booking Conversion Rate", service: "All", definition: "% of searches that convert to completed bookings", source: "Gateway logs", calc: "Total completed bookings ÷ Total searches across all services", unit: "%", refresh: "Daily", location: "Detailed Indicators" },
  { metric: "ABHA Saturation", service: "All", definition: "% of UHI requests carrying ABHA ID/address", source: "Gateway logs", calc: "Requests with ABHA ID or ABHA address ÷ Total API endpoint hits", unit: "%", refresh: "Daily", location: "Registries / Gateway" },
  { metric: "HFR Saturation", service: "All", definition: "% of UHI providers linked to HFR", source: "HFR Registry", calc: "Providers in UHI linked to HFR ÷ Total providers in UHI", unit: "%", refresh: "Weekly", location: "Registries in UHI" },
  { metric: "HPR Saturation", service: "All", definition: "% of UHI doctors linked to HPR", source: "HPR Registry", calc: "Doctors in UHI linked to HPR ÷ Total doctors in UHI", unit: "%", refresh: "Weekly", location: "Registries in UHI" },
  { metric: "Search Growth (QoQ %)", service: "All", definition: "Quarter-on-quarter % growth in searches", source: "Gateway logs", calc: "(Current quarter searches − Previous quarter searches) ÷ Previous quarter searches × 100", unit: "%", refresh: "Quarterly", location: "Detailed Indicators" },
  { metric: "EUAs Integrated", service: "All", definition: "Count of EUAs live", source: "Onboarding", calc: "Count of Citizen-Facing Applications that have reached Go Live status", unit: "Count", refresh: "On change", location: "Gateway / Service cards" },
  { metric: "Ecosystem Depth", service: "All", definition: "Live EUAs + HSPAs", source: "Onboarding", calc: "Total count of live EUAs + live HSPAs across all services", unit: "Count", refresh: "On change", location: "Detailed Indicators" },
  { metric: "Daily Search Requests", service: "All", definition: "Avg searches per day", source: "Gateway logs", calc: "Total searches ÷ Number of active days in period", unit: "Count/day", refresh: "Daily", location: "Gateway at a Glance" },
  { metric: "Number of Bookings", service: "Tele + Physical + Ambulance", definition: "Aggregate completed bookings", source: "Fulfilment logs", calc: "Total completed bookings from Teleconsultation + Physical Consultation Booking + Ambulance Booking", unit: "Count", refresh: "Daily", location: "Gateway at a Glance" },
];

export type Integrator = {
  name: string;
  role: "EUA" | "HSPA";
  service: ServiceKey;
  onboardDate: string; // YYYY-MM-DD
  goLiveDate: string;
  searches: number;
  bookings: number | null; // null for non-booking services
};

export const integrators: Integrator[] = [
  { name: "e-Raktkosh", role: "HSPA", service: "Blood Bank Discovery", onboardDate: "2024-09-15", goLiveDate: "2025-06-29" , searches: 24180, bookings: null },
  { name: "Driefcase Healthtech Pvt Ltd", role: "EUA", service: "Blood Bank Discovery", onboardDate: "2024-12-02", goLiveDate: "2025-08-30" , searches: 11240, bookings: null },
  { name: "Skearth Private Limited", role: "EUA", service: "Blood Bank Discovery", onboardDate: "2025-02-04", goLiveDate: "2025-10-29" , searches: 8420, bookings: null },
  { name: "Jdeanz Healthtech Pvt Ltd", role: "EUA", service: "Blood Bank Discovery", onboardDate: "2025-02-18", goLiveDate: "2025-11-08" , searches: 6180, bookings: null },
  { name: "Ublood Private Limited", role: "EUA", service: "Blood Bank Discovery", onboardDate: "2025-03-12", goLiveDate: "2025-11-30" , searches: 14907, bookings: null },
  { name: "Anahat Solutions Pvt Ltd", role: "EUA", service: "Blood Bank Discovery", onboardDate: "2024-11-20", goLiveDate: "2025-07-30" , searches: 27809, bookings: null },
  { name: "Secure", role: "EUA", service: "PMJAY Hospital Discovery", onboardDate: "2025-05-10", goLiveDate: "2025-10-15" , searches: 32420, bookings: null },
  { name: "PMJAY Connect", role: "EUA", service: "PMJAY Hospital Discovery", onboardDate: "2025-06-22", goLiveDate: "2025-12-01" , searches: 12420, bookings: null },
  { name: "Pmjay", role: "HSPA", service: "PMJAY Hospital Discovery", onboardDate: "2025-05-01", goLiveDate: "2025-11-04" , searches: 18640, bookings: null },
  { name: "Apollo 24/7", role: "HSPA", service: "Physical Consultation Booking", onboardDate: "2025-09-08", goLiveDate: "2026-03-26" , searches: 2140, bookings: 184 },
  { name: "Pristyn Care", role: "EUA", service: "Physical Consultation Booking", onboardDate: "2025-10-04", goLiveDate: "2026-03-20" , searches: 4533, bookings: 142 },
  { name: "DocsApp", role: "EUA", service: "Teleconsultation", onboardDate: "2023-01-15", goLiveDate: "2023-06-12" , searches: 8200, bookings: 980 },
  { name: "eSanjeevani", role: "HSPA", service: "Teleconsultation", onboardDate: "2023-02-01", goLiveDate: "2023-07-04" , searches: 41200, bookings: 1100 },
  { name: "C-Dac E-Sushrut", role: "HSPA", service: "Teleconsultation", onboardDate: "2023-01-20", goLiveDate: "2023-06-25" , searches: 22800, bookings: 820 },
  { name: "AmbuFleet", role: "EUA", service: "Ambulance Booking", onboardDate: "2025-11-12", goLiveDate: "2026-05-02" , searches: 9140, bookings: 128 },
  { name: "Ziqitza HealthCare", role: "HSPA", service: "Ambulance Booking", onboardDate: "2025-12-05", goLiveDate: "2026-05-20" , searches: 3120, bookings: 96 },
  { name: "MedNet Dialysis", role: "HSPA", service: "Dialysis Centre Discovery", onboardDate: "2026-01-14", goLiveDate: "2026-07-08" , searches: 412, bookings: null },
  { name: "NephroCare App", role: "EUA", service: "Dialysis Centre Discovery", onboardDate: "2026-01-28", goLiveDate: "2026-07-15" , searches: 286, bookings: null },
  { name: "AMRIT Connect", role: "EUA", service: "AMRIT Pharmacy Discovery", onboardDate: "2025-12-18", goLiveDate: "2026-06-10" , searches: 1180, bookings: null },
  { name: "NOTTO Portal", role: "HSPA", service: "NOTTO Service Discovery", onboardDate: "2025-11-30", goLiveDate: "2026-05-12" , searches: 742, bookings: null },
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
