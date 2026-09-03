# Remix of UHI Insights_Temp

xUHI Insights Dashboard — Final Consolidated Prompt

Unified Health Interface · Gateway at a Glance

For use in Lovable. Attach wireframe screenshots as supplementary visual references in the same message.

CONTEXT & ROLE

You are building a flagship public-facing UHI (Unified Health Interface) Insights Dashboard — an interactive web application for a multi-level audience: Central government programme officers, Ministry of Health officials, and State health department leads.

Dashboard title: "Unified Health Interface – Gateway at a Glance"

The dashboard must feel authoritative, data-rich, and immediately legible — designed for both a senior bureaucrat viewing it in a meeting and a programme analyst drilling into trends. The primary design reference is the live production dashboard at dashboard.abdm.gov.in/abdm/uhi.

PART 1 — DESIGN LANGUAGE (Apply Globally)

1.1 Color Palette

Token Hex Usage Navy (primary) #1a3553 Header bars, chart headers, active tabs, chart lines White #ffffff Page base, card fill Page background #f4f6f9 Light grey page canvas KPI card background #fdf6ec All KPI and metric cards Amber (numbers) #e07b2a All headline numbers in cards Green Muted green Positive indicators, live status dot, area chart fill Red dot #d32f2f Paused/Live-Paused status (Teleconsultation) Amber dot #f59e0b Caution status Chart stroke (green) Darker green Line on area charts Bar chart fill Salmon/coral red-orange Bar charts

Do not use: orange graph-like decorative backgrounds inside navy/blue cards. Remove any such patterns.

1.2 Typography

Clean sans-serif throughout

Section labels: small caps above section titles

Headline numbers: large, bold amber (#e07b2a)

Supporting text: dark slate grey

Strong weight contrast between numbers and labels

1.3 KPI Cards

Background: #fdf6ec (cream/off-white)

Headline number: bold amber

Subtle border, minimal shadow

Maximum 3 lines of visible information per card. Any additional detail (calculations, breakdowns, raw numbers) accessible only via an ⓘ icon tooltip

Do not use the word "calc" anywhere inside the ⓘ tooltip — write the full calculation in plain language instead

1.4 Chart Containers

Dark navy (#1a3553) header bar with white bold title text

Top-right of every chart header: download icon (↓) + collapse icon (−)

Each chart download triggers PNG (for charts) or CSV (for tables)

Add adequate spacing between Y-axis value markers and the Y-axis label — ensure readability at all times

All card-level mini-graphs must have X-axis label (Month) and Y-axis label (Values) clearly shown

1.5 Status Indicators (apply consistently across ALL sections and cards)

● Green dot = Live (PMJAY HEM, Blood Bank, Ambulance Discovery, Physical Consultation)

● Red dot = Live / Paused (Teleconsultation only) — applied everywhere Teleconsultation is mentioned

Badge style: rectangular outlined badge, coloured dot, ALL CAPS text

Remove the yellow notification bar on Teleconsultation cards — the red dot is sufficient

1.6 Tables

White background, alternating light grey rows

Bold dark navy header row, left-aligned text

Expandable rows (+ icon), sortable columns (click header to sort ascending/descending)

Sorting available on all tables and bar charts throughout

1.7 Hygiene Rules (apply to every element)

Replace all double dashes (--) with a single dash (-) or comma wherever they appear

Remove the word "Stable" from all service cards

Remove "LIVE" from the EUAs Integrated card brackets

Red dot (●) for Teleconsultation applied consistently across every section

No "calc" text in any ⓘ icon anywhere on the dashboard

"only in private view" footnote applied on: Detailed Indicators, Cross-Service Adoption Funnel, Audit API card, Integration Journey (private toggle view)

PART 2 — HEADER (Sticky, Fixed on Scroll)

Row 1 — White bar

Left: NHA logo + ABDM Digital Mission logo

Far right: "Logout" link

Row 2 — Navy bar

Three quick-action links:

"Generate ABHA (Ayushman Bharat Health Account)"

"Register Health Facility"

"Healthcare Professionals Registry"

Row 3 — Tab navigation (pill/outlined rounded-rectangle style)

Active tab: UHI — filled dark navy, white text. Remaining tabs (non-functional but visually present, outlined style): ABDM Insight | Scan & Share | Incentive Scheme | Adoption | Microsite | NHPR | Trends | Model ABDM Facilities | Reporting Solutions | HIECM | ABHA Transaction Visibility | Scan & Pay | CDSS | Partner Reporting | NMC

Service dropdown on far right of tab row (synced with heatmap and relevant sections):

All

PMJAY HEM

Blood Bank

Teleconsultation

Physical Consultation

Ambulance Discovery

PART 3 — PAGE STRUCTURE & SCROLL ORDER

The fixed scroll order is:

Header (sticky)

Gateway at a Glance — KPI strip

Registries in UHI — saturation metrics

UHI Live Services — 5 service cards (2 rows)

Detailed Indicators — private view

Combined Growth Chart

EUA & HSPA Partner Registry

Cross-Service Adoption Funnel (private view)

Integration Journey + Geographic Performance (side by side)

Footer

PART 4 — SECTION SPECIFICATIONS

4.1 GATEWAY AT A GLANCE

Full-width horizontal strip of KPI cards using cream card style with bold amber numbers. Maximum 3 visible lines per card; extras in ⓘ icon. Do not use "calc" inside any ⓘ tooltip.

Cards (in order — Service Portfolio Status card in position 1 or 2):

# Card Title Primary Display ⓘ Tooltip Content Notes 1 Service Portfolio Status Mini traffic-light: 5 colour-coded segments (one per live service). Green = Live, Red = Paused, Blue = Ready. No numbers. Service name + status for each segment Move to first or second position in the strip 2 Total Searches 2,75,000+ with trend sparkline Service-wise breakdown of searches — 3 EUAs Integrated Count of EUAs that have gone live only (exclude those not yet live) Service-wise EUA breakdown Remove "LIVE" from brackets in card 4 HSPAs Integrated 4 Service-wise HSPA breakdown — 5 Number of Bookings Aggregate bookings total. Sub-line (small text): "Teleconsultation · Physical Consultation" Calculation: Total completed bookings from Teleconsultation + Physical Consultation — 6 % ABHA Saturation in UHI Percentage with sparkline "Number of requests with ABHA ID or ABHA address shared ÷ Total number of API endpoint hits." Also show raw numerator and denominator on hover — 7 Audit API Calls Displayed as a %: Audit API endpoint hits ÷ All API endpoint hits which have the Audit API endpoint designed "vs [Fulfilment + Post-Fulfilment HSPA Calls]" — show only in ⓘ, not in card body Private view. Footnote: "only in private view" 8 Daily Search Requests Avg. searches per day through UHI Gateway with trend sparkline Peak day, weekly trend —

Remove: Gateway Uptime card entirely — do not include it.

Increase all percentage values (QoQ growth, conversion, saturation) to realistic but impactful figures. Document calculations in Metrics Logic Sheet.

4.2 REGISTRIES IN UHI

A distinct horizontal strip of 3 cards immediately below Gateway at a Glance. Remove any shaded/striped lines on cards in this section.

# Card Title Display ⓘ Calculation 1 ABHA Saturation % of UHI requests carrying ABHA ID or ABHA address "Number of requests with ABHA ID or ABHA address shared ÷ Total number of API endpoint hits" 2 HFR Saturation % of UHI providers linked to Health Facility Registry "Number of providers in UHI linked to HFR ÷ Total number of providers in UHI" 3 HPR Saturation % of UHI doctors linked to Health Professional Registry "Number of doctors in UHI linked to HPR ÷ Total number of doctors in UHI"

4.3 UHI LIVE SERVICES

Five service cards arranged in two clearly labelled rows:

Row 1 — Discovery Services (3 cards): PMJAY HEM | Blood Bank | Ambulance Discovery

Row 2 — Fulfilment Services (2 cards): Teleconsultation | Physical Consultation

Each Service Card Contains:

Service name + status badge (green/red dot, all-caps rectangular outlined badge)

Primary KPI — large bold amber number

Discovery services: Number of Searches

Fulfilment services: Number of Bookings

Mini graph at the bottom of each card with:

X-axis label: Month name

Y-axis label: "Searches" (discovery) or "Bookings" (fulfilment)

Title above graph: "Number of Searches" or "Number of Bookings"

Hover tooltip shows graph description and metric definition

3 common metrics (small type, all cards): EUAs Integrated | HSPAs Integrated | Live Since

4th service-specific metric:

PMJAY HEM → Empanelled Hospitals: 30,864

Blood Bank → Blood Banks Listed: 4,000+

Ambulance Discovery → Fleet Size: [placeholder]

Teleconsultation → Doctors Onboarded: [placeholder]

Physical Consultation → Doctors Onboarded: [placeholder]

Remove from all cards: "Confirmed Booking" metric, "Search Radius" metric, "Stable" label, yellow note bar

Teleconsultation-specific: Red dot (●) before status badge. Note at bottom of card: "Service currently paused."

Status Badges:

PMJAY HEM → ● LIVE

Blood Bank → ● LIVE

Ambulance Discovery → ● LIVE

Teleconsultation → ● LIVE / PAUSED (red dot)

Physical Consultation → ● LIVE

Ambulance Discovery Mock Data (new service, starting May 2026):

Total Searches: ~18,000 (and growing)

Apps Live: 2

Providers: [placeholder]

Fleet Size: ~5,000 vehicles

Live Since: May 2026

EUAs Integrated: 2

HSPAs Integrated: 1

Growth curve starts flat at May 2026, ramps up over subsequent months

4.4 DETAILED INDICATORS (Private View)

Section title: "Detailed Indicators"

Remove all previous titles: "Boardroom View", "C-Suite Indicators"

Footnote below title: "only in private view"

Cards:

Booking Conversion Rate — Total completed bookings ÷ Total searches (%). Trend sparkline. Remove decorative lines inside card.

Ecosystem Depth — Total EUAs + HSPAs integrated. Breakdown in ⓘ. Remove decorative lines.

Search Growth (QoQ %) — Quarter-on-quarter % growth. Directional arrow. Remove decorative lines.

Service Portfolio Status — If appearing here, sync with top strip; otherwise remove duplicate.

Teleconsultation in this section: Show red dot (●) and note at bottom: "Service currently paused."

4.5 COMBINED GROWTH CHART

Multi-line or stacked area chart — all 5 live services on one canvas

Colors: one distinct color per service; Ambulance Discovery starts from May 2026 with a clear start-point label

5th line: "Overall (Avg)" — dashed dark navy line — average of all active service lines at each point in time. Updates on toggle. Included in legend with dashed style.

Toggles: Line / Area / Bar | Cumulative / Incremental | ALL / 1Y / 6M

X-axis: Month names | Y-axis: Volume (lakhs/crores with labels)

Dark navy chart header bar with ↓ and − icons

4.6 EUA & HSPA PARTNER REGISTRY

Layout: Two tables side by side — EUA Partners (left) | HSPA Partners (right)

Single service dropdown (synced — both tables update together):

All Services

PMJAY HEM

Blood Bank

Teleconsultation

Physical Consultation

Ambulance Discovery

EUA Table columns: Partner Name | Service | Number of Searches | Onboarding Date

HSPA Table columns: Partner Name | Service | Bookings Completed | Onboarding Date

Both tables:

Show only 3-4 rows at a time with a vertical scroller (reduce vertical footprint)

Sortable columns

Alternating row style matching Blood_Bank_page.pdf reference

4.7 CROSS-SERVICE ADOPTION FUNNEL (Private View)

Footnote: "only in private view"

Remove black arrows between funnel stages

5 stages (horizontal funnel): Service Discovery → Provider Selection → Booking Initiated → Booking Completed → Consultation Completed

Percentage drop-off labels at each stage transition

Service dropdown above funnel:

All Services (default)

PMJAY HEM

Blood Bank

Teleconsultation

Physical Consultation

Ambulance Discovery

Funnel updates when service is selected (mock data per service acceptable)

4.8 INTEGRATION JOURNEY + GEOGRAPHIC PERFORMANCE (Side by Side)

Two-column layout on the same row. Integration Journey on the left, Geographic Performance on the right.

Integration Journey (Left Column)

Toggle button at top: [ Public View ] [ Private View ]

Public View:

Service-wise average integration duration (no integrator names)

Only 2 date markers shown: Date of Onboarding and Date of Go Live

Service dropdown: PMJAY HEM | Blood Bank | Teleconsultation | Physical Consultation | Ambulance Discovery

Show service-wise average duration as a horizontal timeline bar

Private View:

Integrator-wise and service-wise timelines

Same 2 date markers: Date of Onboarding | Date of Go Live

Remove Roles dropdown from private view entirely

Dropdowns available: Service | Integrator Name

Sortable by duration, go-live date

(Private view notation applies)

Milestone reference (shown on hover/legend only, not as axis points): Sandbox Onboarding → Initiated Development → Completed Development → Completed Demo → Passed Testcases → Go Live

Geographic Performance (Right Column)

Visualizations included (both shown):

Choropleth map of India — state-level heatmap coloured by search volume or selected metric. States darker = higher volume. Tooltip on hover shows state name + metric value.

Horizontal bar chart — brand-aligned, navy/brand color bars, state names on Y-axis, metric value on X-axis. Styled to match the attached screenshot reference.

Remove: Standalone pie chart view (does not capture all states effectively). Remove standalone map-only view. Replace with the map+bar combination above.

Metric dropdown to select which service/metric is visualised (synced between map and bar chart)

Sortable: Bar chart sortable by value (ascending/descending toggle)

Service-wise split is required — the dropdown above should filter both the map and bar chart simultaneously

PART 5 — FOOTER

NHA address | Important Links | Policies | Health Records QR code section

"View Metrics Logic" link → opens a full-screen modal with the complete Metrics Logic Sheet (searchable, filterable by service)

PART 6 — METRICS LOGIC SHEET

Accessible via footer "View Metrics Logic" link. Full-width modal, searchable and filterable by service.

Table columns: Metric Name | Service | Definition | Data Source | Calculation Method | Unit | Refresh Frequency | Display Location

Include the following calculations explicitly:

Metric Calculation Booking Conversion Rate Total completed bookings ÷ Total searches across all services ABHA Saturation Requests with ABHA ID or ABHA address ÷ Total API endpoint hits HFR Saturation Providers in UHI linked to HFR ÷ Total providers in UHI HPR Saturation Doctors in UHI linked to HPR ÷ Total doctors in UHI Audit API % Audit API endpoint hits ÷ All API endpoint hits with Audit API endpoint designed Search Growth (QoQ %) (Current quarter searches - Previous quarter searches) ÷ Previous quarter searches × 100 EUAs Integrated Count of End User Applications that have reached Go Live status Ecosystem Depth Total count of live EUAs + live HSPAs across all services Daily Search Requests Total searches ÷ Number of active days in period Number of Bookings Total completed bookings from Teleconsultation + Physical Consultation

Populate remaining rows from Services-Meta.pdf data.

PART 7 — MOCK DATA GUIDANCE

Use the following verified data points:

PMJAY HEM: 92,142 total searches | 3 EUAs live | 30,864 empanelled hospitals | Live: Nov 2025

Blood Bank: 91,728 total searches | 13 EUAs integrated | 4,000+ blood banks | Avg availability: 89.3%

Teleconsultation: ~92,000 searches | 2,000+ consultations | 4 DSC pilot partners | Jun 2023 – Apr 2024 | Status: Live/Paused (red dot)

Physical Consultation: Similar scale to Teleconsultation (placeholder data, realistic)

Ambulance Discovery: Starting May 2026 | ~18,000 searches (growing) | Fleet: ~5,000 | 2 EUAs | 1 HSPA

Overall: 2,75,000+ total searches | 5 live services | 13+ EUAs | 4 HSPAs

State distribution: Realistic variation across states. Top 5 states = ~60% of total searches. 3-4 states visibly lagging to make heatmap meaningful and honest.

Growth curve: Slow start 2022-2023, acceleration 2023-2024, strong present-day numbers. Ambulance Discovery flat until May 2026, then ramping.

PART 8 — INTERACTIVE ELEMENTS (Global)

Animated count-up on all headline KPIs on page load

Hover tooltips on all charts: clean white tooltip cards with precise values and dates

Per-chart download icon (↓) — PNG for charts, CSV for tables (no global "Download Report" button)

Sticky header fixed on scroll

Collapsible sections via − icon on chart headers

Sortable tables and bar charts throughout — clicking column header toggles ascending/descending

Smooth scrolling between sections

PART 9 — DELIVERABLE CHECKLIST

[ ] Sticky header with 3-row structure, tab navigation, service dropdown

[ ] Gateway at a Glance — 8 KPI cards (Service Portfolio Status in position 1 or 2), max 3 lines per card, ⓘ icons for extras, no "calc" text, Gateway Uptime card removed

[ ] Registries in UHI — 3 saturation cards, no shaded lines, ⓘ with calculation language

[ ] UHI Live Services — 2 labelled rows (Discovery | Fulfilment), 5 service cards, correct 4th metric per service, red dot on Teleconsultation, axis labels on graphs, no Confirmed Booking / Radius metrics

[ ] Detailed Indicators — title only (no "Boardroom View"), private view footnote, red dot on Teleconsultation paused note, no decorative lines in cards

[ ] Combined Growth Chart — 5 services + Overall (Avg) dashed line, Ambulance from May 2026, all toggles

[ ] EUA & HSPA Partner Registry — side by side, single synced dropdown, scrollable (3-4 rows), sortable

[ ] Cross-Service Adoption Funnel — 5 stages, no black arrows, service dropdown including Ambulance Discovery, private view footnote

[ ] Integration Journey — Public/Private toggle, 2 date markers only, Roles dropdown removed from private view, Ambulance Discovery in dropdown

[ ] Geographic Performance — India choropleth heatmap + brand-aligned horizontal bar chart, sortable, service dropdown, no standalone pie or map-only view

[ ] Side-by-side layout: Integration Journey (left) + Geographic Performance (right)

[ ] Footer with Metrics Logic Sheet modal (searchable, all calculations documented)

[ ] All double dashes replaced, all hygiene rules applied

[ ] Consistent red/green dots across every section

[ ] Metrics Logic Sheet updated with all new cards and calculations

End of prompt. Attach wireframe screenshots as supplementary visual references in the same Lovable message for design alignment. 

Have attached 7 screenshots for the wireframes of the existing Dashboard created with Lovable. Can make the new Dashboard as similar to it, only just add the changes explicitly mentioned. Keep the branding and visual language as similar too.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/b08bd7dd-9c1a-4a0f-8547-ee5bf3366625).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
