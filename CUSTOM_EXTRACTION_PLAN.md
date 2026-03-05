# Custom Extraction Configuration Plan

## Navigator — Post-Sign Agreement Terms

**Scope:** Fields confirmed extractable by Claude audit but not covered by Navigator standard extractions.
**Agreement family:** MSA · SOF · Fee Schedule & Services Exhibit · SLA
**Fields covered:** 12 custom extractions in recommended configuration order

> Fields excluded: **Minimum Commitment**, **Price Increase Date**, **Service Activation Date** — not present in the executed documents.

---

## Agreement Types to Configure First


| Agreement Type Label     | Maps To                         |
| ------------------------ | ------------------------------- |
| Master Service Agreement | MSA                             |
| Order Form               | SOF                             |
| Exhibit                  | Fee Schedule & Services Exhibit |
| Service Level Agreement  | SLA                             |


---

### 1. Products & Services


|                |                                      |
| -------------- | ------------------------------------ |
| **Field name** | Products & Services                  |
| **Field type** | Text                                 |
| **Category**   | General                              |
| **Attach to**  | Order Form, Master Service Agreement |


**Navigator definition (copy/paste):**

```
For each data row in the table, extract one entry. Move to the next row and extract the next entry. Repeat until you have processed every row. Do not stop after the first row. Capture each service name and configuration detail exactly as written. Found in: Services Ordered / Pricing section of the SOF; may appear in recitals of the MSA. Include: All named recurring service lines with configuration context. Exclude: CPE/hardware, one-time installation services, general capability descriptions that do not reflect a specific contracted order. Set to "No extraction" if no specific services are listed.
```

**Examples:**

*Example 1 — multi-row services table, each row → one entry:*

> Clause:
> ```
> | Service                               | Configuration                            |
> | GigaFiber Dedicated                   | 1 Gbps symmetrical, LOC-01               |  → Entry 1
> | GigaWAN Enterprise SD-WAN             | Dual-site active/active, LOC-01 & LOC-02 |  → Entry 2
> | GigaSecure Managed Network & Security | LOC-01 & LOC-02                          |  → Entry 3
> | GigaVoice Business VoIP               | 25 seats, hosted PBX, LOC-01             |  → Entry 4
> ```
> Desired value (4 rows → 4 entries):
> 1. GigaFiber Dedicated (1 Gbps symmetrical, LOC-01)
> 2. GigaWAN Enterprise SD-WAN (dual-site active/active, LOC-01 & LOC-02)
> 3. GigaSecure Managed Network & Security (LOC-01 & LOC-02)
> 4. GigaVoice Business VoIP (25 seats, hosted PBX, LOC-01)

*Example 2 — multi-row services table, each row → one entry:*

> Clause:
> ```
> | Service                   | Configuration              |
> | GigaFiber Dedicated       | 1 Gbps symmetrical, LOC-01 |  → Entry 1
> | GigaWAN Enterprise SD-WAN | Dual-site, LOC-01 & LOC-02 |  → Entry 2
> ```
> Desired value (2 rows → 2 entries):
> 1. GigaFiber Dedicated (1 Gbps symmetrical, LOC-01)
> 2. GigaWAN Enterprise SD-WAN (dual-site, LOC-01 & LOC-02)

*Example 3 — narrative format, 2 services described → 2 entries:*

> Clause: "The following services are ordered: dedicated fiber internet at 1 Gbps and enterprise SD-WAN across two locations."
> Desired value (2 services → 2 entries):
> 1. Dedicated fiber internet (1 Gbps)
> 2. Enterprise SD-WAN (2 locations)

*Example 4 — abbreviated labels, 3 services → 3 entries:*

> Clause: "Pursuant to this Order, Subscriber orders: Dedicated Fiber (1G), SD-WAN Enterprise, and Managed Security."
> Desired value (3 services → 3 entries):
> 1. Dedicated Fiber (1G)
> 2. SD-WAN Enterprise
> 3. Managed Security

*Example 5 — single service order, 1 row → 1 entry:*

> Clause: "Subscriber orders GigaFiber Dedicated internet access at 500 Mbps symmetrical for LOC-01 only."
> Desired value (1 service → 1 entry):
> 1. GigaFiber Dedicated (500 Mbps, LOC-01)

*Example 6 — general MSA recital, no contracted services:*

> Clause: "Provider offers business internet access, SD-WAN, managed network and security, business voice, and hosted cloud services."
> Desired value: *No extraction*

---

### 2. Pricing & Discounts


|                |                     |
| -------------- | ------------------- |
| **Field name** | Pricing & Discounts |
| **Field type** | Text                |
| **Category**   | General             |
| **Attach to**  | Order Form, Exhibit |


**Navigator definition (copy/paste):**

```
This field requires a complete price list. If pricing appears in a table, you must extract every row — an extraction that stops after the first service line is incomplete and incorrect. Capture per-service MRC and NRC exactly as stated, plus total billing summary and any rate lock or promotional credits. Found in: Services Ordered table and Billing Summary of the SOF; pricing exhibit or fee schedule annex. Include: Every service line's MRC/NRC; promotional credits/waivers; total billing summary; rate lock provisions. Exclude: Taxes, regulatory surcharges, variable usage charges, CPE replacement values. Set to "No extraction" if no pricing is defined in this document.
```

**Examples:**

*Example 1 — multi-row pricing table (extract all rows):*

> Clause:
> ```
> | Service             | NRC         | MRC    |
> | GigaFiber Dedicated | $350        | $2,800 |
> | GigaWAN Enterprise  | $700        | $1,200 |
> | GigaSecure MNS      | $0 (waived) | $950   |
> | GigaVoice VoIP      | $300        | $875   |
> | Total               | $1,350      | $5,825 |
> ```
> Note: 2-year rate lock on all MRCs.
> Desired value: `GigaFiber Dedicated: NRC $350 / MRC $2,800 · GigaWAN Enterprise: NRC $700 / MRC $1,200 · GigaSecure MNS: NRC $0 (waived) / MRC $950 · GigaVoice VoIP: NRC $300 / MRC $875 · Total NRC $1,350 · Total MRC $5,825 · 2-year rate lock`

*Example 2 — narrative format, no brand names (extract as described):*

> Clause: "Monthly charges: dedicated fiber $2,800; SD-WAN $1,200; managed security $950; voice $875. Installation total $1,350 one-time. Security installation waived under bundle. All rates locked 24 months."
> Desired value: `Dedicated fiber: MRC $2,800 · SD-WAN: MRC $1,200 · Managed security: MRC $950 · Voice: MRC $875 · Total NRC $1,350 (security NRC waived, bundle) · Total MRC $5,825 · 24-month rate lock`

*Example 3 — same totals, itemized differently:*

> Clause: "Total monthly recurring: $5,825. Total non-recurring at activation: $1,350. Security NRC waived per bundle. Per-service detail in attached schedule."
> Desired value: `Total NRC $1,350 · Total MRC $5,825 · GigaSecure NRC waived (bundle promotion)`

*Example 4 — single service, no promotions:*

> Clause: "GigaFiber Dedicated: NRC $350, MRC $2,800 per month."
> Desired value: `GigaFiber Dedicated: NRC $350 / MRC $2,800`

*Example 5 — MSA only, no pricing defined:*

> Clause: "Subscriber shall pay all fees for the Services as set forth in the applicable Service Order and the Fee Schedule."
> Desired value: *No extraction*

---

### 3. Early Termination Fee


|                |                                               |
| -------------- | --------------------------------------------- |
| **Field name** | Early Termination Fee                         |
| **Field type** | Text                                          |
| **Category**   | Termination                                   |
| **Attach to**  | Master Service Agreement, Order Form, Exhibit |


**Navigator definition (copy/paste):**

```
The formula or rule the customer must pay for canceling before the committed term ends. Capture the calculation (e.g., "MRC × remaining months"), not just that an ETF applies. If formulas differ by service or term length, capture each. Found in: Early Termination section of the Fee Schedule; Term & Renewal in the SOF; Fees section of the MSA. Include: ETF formula; per-service/per-term variations; Instant Credit repayment add-backs; 30-day satisfaction guarantee waiver if present. Exclude: SLA credits, late payment fees, CPE charges. If no ETF: set to "No early termination fee applies". If absent: leave blank.
```

**Examples:**

*Example 1 — standard 100% MRC × remaining months:*

> Clause: "If Subscriber terminates any Service prior to expiration of its Initial Service Term for any reason other than Provider's uncured material breach, Subscriber shall pay an ETF equal to 100% of the MRC multiplied by the number of months remaining in the Term."
> Desired value: `MRC × remaining months (all services)`

*Example 2 — same formula, condensed Fee Schedule table:*

> Clause: "1-Year Term: MRC × Remaining Months. 2-Year Term: MRC × Remaining Months."
> Desired value: `MRC × remaining months (all services)`

*Example 3 — same formula, SOF cross-reference:*

> Clause: "Termination prior to Committed Term expiry will result in ETFs as specified in the Fee Schedule. [Fee Schedule: 2-Year Term: MRC × Remaining Months.]"
> Desired value: `MRC × remaining months (all services)`

*Example 4 — reduced ETF for 3-year term on specific services:*

> Clause: "3-Year Term: 50% of MRC × Remaining Months (GigaFiber Dedicated — Core and GigaWAN Express only). All other services: MRC × Remaining Months."
> Desired value: `GigaFiber Core & GigaWAN Express (3-year): 50% MRC × remaining months · All other services: MRC × remaining months`

*Example 5 — no ETF:*

> Clause: "Either party may terminate this Agreement at any time upon thirty (30) days' written notice without penalty."
> Desired value: `No early termination fee applies`

---

### 4. SLA


|                |                         |
| -------------- | ----------------------- |
| **Field name** | SLA                     |
| **Field type** | Text                    |
| **Category**   | Legal and Compliance    |
| **Attach to**  | Service Level Agreement |


**Navigator definition (copy/paste):**

```
This field requires SLA metrics for every service. If commitments appear in a table, you must extract every row — an extraction that captures only the first service is incomplete and incorrect. Capture availability %, MTTR, latency, and packet delivery targets per service exactly as stated. Found in: SLA Summary table in the Service Level Agreement; MSA warranty section. Include: All per-service availability targets; MTTR targets; latency thresholds; packet delivery targets. Exclude: Credit amounts, remedy schedules, and general warranty language without specific metrics. If best-efforts only: set to "Best-efforts basis; no committed SLA metrics".
```

**Examples:**

*Example 1 — multi-row SLA summary table (extract all rows):*

> Clause:
> ```
> | Service             | Avail. (w/ failover) | Avail. (w/o failover) | MTTR          | Latency | Packet Delivery |
> | GigaFiber Dedicated | 99.99%               | 99.90%                | 4 hrs         | 110ms   | 99.90%          |
> | GigaWAN Enterprise  | 100%                 | 100%                  | 48/8/24 hrs   | —       | —               |
> | GigaSecure MNS      | 99.99%               | —                     | 24 hrs        | —       | —               |
> | GigaVoice VoIP      | 99.99%               | 99.90%                | 4 hrs         | —       | —               |
> ```
> Desired value: `GigaFiber Dedicated: 99.99% avail. (failover) / 99.90% (no failover) / MTTR 4 hrs / latency 110ms / packet delivery 99.90% · GigaWAN Enterprise: 100% avail. / MTTR 48/8/24 hrs · GigaSecure MNS: 99.99% avail. / MTTR 24 hrs · GigaVoice VoIP: 99.99% avail. (failover) / 99.90% (no failover) / MTTR 4 hrs`

*Example 2 — same metrics, narrative section format:*

> Clause: "GigaFiber Dedicated shall maintain 99.99% monthly availability with failover and 99.90% without. MTTR shall not exceed 4 hours. Roundtrip latency shall not exceed 110ms. Packet delivery shall meet or exceed 99.90%."
> Desired value: `GigaFiber: 99.99% avail. (failover) / 99.90% (no failover) / MTTR 4 hrs / latency 110ms / packet delivery 99.90%`

*Example 3 — same metrics, abbreviated SLA summary:*

> Clause: "GigaFiber SLA: 99.99% uptime (w/ failover), 4-hr restore, 110ms latency, 99.90% packet delivery. GigaWAN: 100% uptime, restore per ticket type. GigaSecure: 99.99%, 24-hr restore. GigaVoice: 99.99% (failover), 4-hr restore."
> Desired value: `GigaFiber: 99.99% avail. (failover) / 99.90% (no failover) / MTTR 4 hrs / latency 110ms / packet delivery 99.90% · GigaWAN Ent.: 100% avail. / MTTR 48/8/24 hrs · GigaSecure: 99.99% avail. / MTTR 24 hrs · GigaVoice: 99.99% avail. (failover) / 99.90% (no failover) / MTTR 4 hrs`

*Example 4 — single service, uptime only:*

> Clause: "Provider guarantees 99.9% monthly uptime, excluding scheduled maintenance windows."
> Desired value: `99.9% monthly availability (excluding scheduled maintenance)`

*Example 5 — best-efforts only:*

> Clause: "Provider will use commercially reasonable efforts to maintain service availability. No specific uptime commitment is made."
> Desired value: `Best-efforts basis; no committed SLA metrics`

---

### 5. SLA Performance Conditions


|                |                            |
| -------------- | -------------------------- |
| **Field name** | SLA Performance Conditions |
| **Field type** | Text                       |
| **Category**   | Legal and Compliance       |
| **Attach to**  | Service Level Agreement    |


**Navigator definition (copy/paste):**

```
This field requires the full credit schedule. If credits appear in a table, you must extract every row — an extraction that captures only one metric when multiple exist is incomplete and incorrect. For each row capture: the miss threshold, the credit formula (% of MRC), the monthly cap, and the claim deadline. Do not capture SLA target values here — those belong in the SLA field. Found in: Remedy Schedule sections of the SLA. Include: All per-metric credit formulas; monthly cap; claim deadline; chronic outage ETF-free exit right. Exclude: SLA target values; standard force majeure and subscriber-caused exclusions.
```

**Examples:**

*Example 1 — multi-row credit schedule table (extract all rows):*

> Clause:
> ```
> | Metric           | Miss Condition              | Credit                                        |
> | Availability     | 1 point below target        | 1% MRC per point                              |
> | Availability     | Below 50%                   | 100% MRC                                      |
> | MTTR             | Exceeds SLA target          | 10% MRC per affected circuit                  |
> | Latency          | >110ms–150ms                | 5% MRC                                        |
> | Latency          | >150ms–200ms                | 10% MRC                                       |
> | Latency          | >200ms                      | 25% MRC                                       |
> | Packet Delivery  | <99.90%                     | 10% MRC                                       |
> | Chronic Outage   | 3+ outages >15 min/month    | 25% MRC or ETF-free exit after 2 consec. months |
> ```
> Cap: 100% MRC per circuit per month. Claims submitted by 15th of following month.
> Desired value: `Availability: 1% MRC/point below metric; 100% MRC if <50% · MTTR miss: 10% MRC · Latency: 5–25% MRC by tier · Packet delivery <99.90%: 10% MRC · Chronic Outage: 25% MRC or ETF-free exit (2+ consecutive months) · Cap: 100% MRC/circuit/month · Claims by 15th of following month`

*Example 2 — same schedule, section-by-section format:*

> Clause: "§4.2 Availability: 1% MRC per point below target; 100% if <50%. §5.2 MTTR: 10% MRC per affected circuit. §6.2 Latency: 5%/10%/25% by tier. §7.1 Packet: 10% if <99.90%. §8.1 Chronic Outage: 25% + exit right after 2 months. Claims: by 15th. Cap: 100% MRC."
> Desired value: `Availability: 1% MRC/point below metric; 100% MRC if <50% · MTTR miss: 10% MRC · Latency: 5–25% MRC by tier · Packet delivery <99.90%: 10% MRC · Chronic Outage: 25% MRC or ETF-free exit (2+ consecutive months) · Cap: 100% MRC/circuit/month · Claims by 15th of following month`

*Example 3 — same schedule, abbreviated exhibit:*

> Clause: "SLA credits: availability shortfall 1%/pt, total outage 100%; restore miss 10%; latency tier 5/10/25%; packet miss 10%; chronic outage 25% + exit right. 100% MRC monthly cap. Submit by 15th."
> Desired value: `Availability: 1% MRC/point below metric; 100% MRC if <50% · MTTR miss: 10% MRC · Latency: 5–25% MRC by tier · Packet delivery <99.90%: 10% MRC · Chronic Outage: 25% MRC or ETF-free exit (2+ consecutive months) · Cap: 100% MRC/circuit/month · Claims by 15th of following month`

*Example 4 — simple flat credit only:*

> Clause: "If monthly uptime falls below 99.9%, Provider will credit one day's MRC per hour of excess downtime, up to one month's MRC."
> Desired value: `Uptime miss: 1 day MRC per hour of excess downtime · Cap: 1 month MRC`

*Example 5 — no credits defined:*

> Clause: "Provider shall use commercially reasonable efforts to maintain service levels. No credits or penalties apply for service interruptions."
> Desired value: `No SLA credits defined`

---

### 6. Penalty


|                |                         |
| -------------- | ----------------------- |
| **Field name** | Penalty                 |
| **Field type** | Text                    |
| **Category**   | Legal and Compliance    |
| **Attach to**  | Service Level Agreement |


**Navigator definition (copy/paste):**

```
The maximum financial remedy for performance failures — whether credits or cash, any per-month cap, and whether SLA credits are the customer's sole and exclusive remedy. Also capture installation delay remedies if present. Found in: Credit limitations section of the SLA; limitation of liability section of the MSA. Include: Max credit/penalty amount; cash vs. credit distinction; sole remedy language; installation delay remedies. Exclude: ETF provisions (separate field); late payment interest; indemnification obligations. Set to "No extraction" if no penalty provision exists.
```

**Examples:**

*Example 1 — credits only, capped, sole remedy:*

> Clause: "Credits are capped at 100% of MRC per circuit per month. Credits are non-transferable and non-redeemable for cash. SLA credits are Subscriber's sole and exclusive remedy for any service level failure."
> Desired value: `Credits only (not cash) · Cap: 100% MRC per circuit per month · Sole and exclusive remedy`

*Example 2 — same structure, different wording:*

> Clause: "Customer's sole recourse for any service level failure is the SLA credits set forth herein. Credits shall not exceed one month's MRC for the affected service and are not redeemable for cash."
> Desired value: `Credits only (not cash) · Cap: 100% MRC per circuit per month · Sole and exclusive remedy`

*Example 3 — same structure with installation delay remedy:*

> Clause: "SLA credits are Customer's sole remedy, capped at 100% MRC per month, not redeemable for cash. For Provider-caused installation delays, the first month's MRC is waived upon request."
> Desired value: `Credits only (not cash) · Cap: 100% MRC per circuit per month · Sole and exclusive remedy · Installation delay: first month MRC waived (Provider-caused only)`

*Example 4 — cash penalty permitted:*

> Clause: "If Provider fails the availability SLA for two or more consecutive months, Provider shall pay Subscriber a cash penalty equal to 10% of the annual contract value, in addition to applicable monthly credits."
> Desired value: `Cash penalty: 10% ACV for 2+ consecutive SLA misses, plus monthly credits`

*Example 5 — no penalty provision:*

> Clause: "Provider shall use commercially reasonable efforts to maintain service levels. Provider shall have no liability for service interruptions or performance failures."
> Desired value: *No extraction*

---

> **Note — Term (Standard Extraction):** Before loading Term data downstream, validate that Navigator's standard extraction is capturing the SOF's 2-year Committed Term rather than the MSA/Fee Schedule/SLA 1-year initial terms. If Navigator returns 1 year, the SOF committed term should be configured as a custom override.

---

### 7. Pricing Type


|                |                     |
| -------------- | ------------------- |
| **Field name** | Pricing Type        |
| **Field type** | Text                |
| **Category**   | Payment             |
| **Attach to**  | Order Form, Exhibit |


**Navigator definition (copy/paste):**

```
The billing structure(s) for contracted services — whether charges are monthly recurring (billed in advance), one-time non-recurring (billed at activation), usage-based (billed in arrears), or a combination. Capture the cadence and advance/arrears distinction for each charge type. Found in: Billing summary or pricing notes in the SOF; billing terms in the Fee Schedule. Include: Billing cadence; advance vs. arrears distinction; usage-based billing if present. Exclude: Payment due dates (Net 30 etc.) and late fee provisions — those are separate fields. Set to "No extraction" if billing structure is not defined in this document.
```

**Examples:**

*Example 1 — standard MRC + NRC + usage:*

> Clause: "Monthly Recurring Charges (MRC) are billed in advance; Non-Recurring Charges (NRC) are one-time charges billed upon the Billing Start Date. Usage-based charges are billed monthly in arrears."
> Desired value: `MRC — monthly, billed in advance · NRC — one-time, billed at Billing Start Date · Usage-based — billed in arrears`

*Example 2 — same structure, different phrasing:*

> Clause: "Recurring service fees are invoiced one month ahead. One-time installation fees are due at activation. Variable charges for international calls and overages appear on the following month's invoice."
> Desired value: `MRC — monthly, billed in advance · NRC — one-time, billed at Billing Start Date · Usage-based — billed in arrears`

*Example 3 — same structure, minimal language:*

> Clause: "MRC billed in advance. NRC billed at activation. Usage billed in arrears."
> Desired value: `MRC — monthly, billed in advance · NRC — one-time, billed at Billing Start Date · Usage-based — billed in arrears`

*Example 4 — annual billing model:*

> Clause: "All services are billed annually in advance. No usage-based charges apply."
> Desired value: `Annual, billed in advance`

*Example 5 — no billing cadence specified:*

> Clause: "Subscriber shall pay all fees as set forth in the applicable Service Order."
> Desired value: *No extraction*

---

### 8. Quantity


|                |            |
| -------------- | ---------- |
| **Field name** | Quantity   |
| **Field type** | Text       |
| **Category**   | General    |
| **Attach to**  | Order Form |


**Navigator definition (copy/paste):**

```
This field requires a quantity for every service line. If quantities appear in a table, you must extract every row — an extraction that captures only the first service is incomplete and incorrect. Pair each service name to its quantity and unit exactly as stated. Found in: Services Ordered / Pricing table of the SOF. Include: All per-service unit counts (seats, circuits, locations, lines, users). Exclude: CPE equipment quantities, phone handset counts, one-time service quantities. Set to "No extraction" if quantity is not defined at signing.
```

**Examples:**

*Example 1 — multi-row SOF table (extract all rows):*

> Clause:
> ```
> | Service             | Qty | Unit      |
> | GigaFiber Dedicated | 1   | Circuit   |
> | GigaWAN Enterprise  | 2   | Locations |
> | GigaSecure MNS      | 2   | Locations |
> | GigaVoice VoIP      | 25  | Seats     |
> ```
> Desired value: `GigaFiber Dedicated: 1 circuit · GigaWAN Enterprise: 2 locations · GigaSecure MNS: 2 locations · GigaVoice VoIP: 25 seats`

*Example 2 — narrative phrasing, no brand names (extract as described):*

> Clause: "Subscriber orders one dedicated fiber circuit, SD-WAN across two sites, managed security at both sites, and twenty-five hosted voice seats."
> Desired value: `Dedicated fiber: 1 circuit · SD-WAN: 2 sites · Managed security: 2 sites · Voice: 25 seats`

*Example 3 — inline list format:*

> Clause: "Qty: 1 circuit (fiber), 2 sites (SD-WAN), 2 sites (managed security), 25 users (voice)"
> Desired value: `Fiber: 1 circuit · SD-WAN: 2 sites · Managed security: 2 sites · Voice: 25 users`

*Example 4 — single service, higher seat count:*

> Clause: "Subscriber orders 50 hosted PBX seats with auto-attendant and unlimited domestic calling."
> Desired value: `GigaVoice: 50 seats`

*Example 5 — no explicit quantity defined:*

> Clause: "GigaSecure Managed Security — all Subscriber locations, as identified during provisioning."
> Desired value: *No extraction*

---

### 9. Payment Type


|                |              |
| -------------- | ------------ |
| **Field name** | Payment Type |
| **Field type** | Text         |
| **Category**   | Payment      |
| **Attach to**  | Order Form   |


**Navigator definition (copy/paste):**

```
The payment method designated for invoices under this agreement (e.g., ACH, wire transfer, check, credit card). Capture the specific method as stated. Do not capture payment terms (Net 30 etc.) — those are extracted separately. Found in: Account Details / Subscriber Information table in the SOF; billing section of the MSA. Include: ACH, EFT, wire transfer, check, credit card, direct debit. Exclude: Payment due dates; currency designations; late payment provisions. Set to "No extraction" if no payment method is specified.
```

**Examples:**

*Example 1 — ACH in account details table:*

> Clause: "Preferred Payment Method: ACH / Electronic Funds Transfer"
> Desired value: `ACH / Electronic Funds Transfer`

*Example 2 — same method, narrative format:*

> Clause: "Customer agrees to pay all invoices via ACH transfer from the bank account on file."
> Desired value: `ACH / Electronic Funds Transfer`

*Example 3 — same method, abbreviated:*

> Clause: "Payment: EFT / ACH"
> Desired value: `ACH / Electronic Funds Transfer`

*Example 4 — wire transfer:*

> Clause: "All invoices shall be paid by wire transfer to the account designated by Provider."
> Desired value: `Wire transfer`

*Example 5 — no payment method specified:*

> Clause: "All amounts are due in US Dollars within thirty (30) days of the invoice date."
> Desired value: *No extraction*

---

### 10. Usage Entitlement


|                |                     |
| -------------- | ------------------- |
| **Field name** | Usage Entitlement   |
| **Field type** | Text                |
| **Category**   | General             |
| **Attach to**  | Order Form, Exhibit |


**Navigator definition (copy/paste):**

```
The contracted capacity, limits, or entitlements per service — the quantity of resource the customer may consume (e.g., bandwidth in Mbps/Gbps, seats, DID lines, storage, calling plan scope). Capture per-service. Include overage provisions and growth reserve entitlements if present. If usage is unlimited for a category, capture that explicitly. Found in: Services Ordered section of the SOF; service descriptions in the Fee Schedule. Include: Bandwidth/speed; seat counts; DID allocations; calling plan scope; growth reserve; overage rates. Exclude: CPE quantities; installation scope; service descriptions without a measurable entitlement. Set to "No extraction" if no entitlement is defined.
```

**Examples:**

*Example 1 — full multi-service entitlements:*

> Clause: "GigaFiber: 1 Gbps symmetrical. GigaVoice: 25 seats, hosted PBX, unlimited domestic calling, 1 DID block (25 numbers). GigaVoice Growth Reserve: up to 5 seats (20%) without ETF."
> Desired value: `GigaFiber: 1 Gbps symmetrical · GigaVoice: 25 seats / unlimited domestic calling / 1 DID block (25 numbers) / 5-seat growth reserve`

*Example 2 — same entitlements, narrative format:*

> Clause: "Subscriber is entitled to one gigabit of symmetrical fiber. Voice covers twenty-five hosted seats with unlimited US calling and a block of 25 DID numbers. Up to five seats may be held in growth reserve."
> Desired value: `GigaFiber: 1 Gbps symmetrical · GigaVoice: 25 seats / unlimited domestic calling / 1 DID block (25 numbers) / 5-seat growth reserve`

*Example 3 — same entitlements, abbreviated:*

> Clause: "Fiber: 1G symmetrical. Voice: 25 seats, unltd. domestic, 25 DIDs, 5-seat reserve."
> Desired value: `GigaFiber: 1 Gbps symmetrical · GigaVoice: 25 seats / unlimited domestic calling / 1 DID block (25 numbers) / 5-seat growth reserve`

*Example 4 — bandwidth with overage:*

> Clause: "Subscriber is entitled to 500 GB of monthly data transfer. Usage exceeding 500 GB is billed at $0.05 per GB."
> Desired value: `500 GB/month included; overages at $0.05/GB`

*Example 5 — no entitlement defined:*

> Clause: "GigaSecure Managed Network & Security will be provisioned at both Subscriber locations. Usage is not metered."
> Desired value: *No extraction*

---

### 11. Price Increase


|                |                                      |
| -------------- | ------------------------------------ |
| **Field name** | Price Increase                       |
| **Field type** | Text                                 |
| **Category**   | General                              |
| **Attach to**  | Master Service Agreement, Order Form |


**Navigator definition (copy/paste):**

```
The conditions under which fees may increase: (1) any % cap or formula; (2) required notice period; (3) any lock period protecting prices from increases; (4) supplier pass-through rights. If no % is defined but a mechanism exists, capture the mechanism. Found in: Fees & Pricing or Price Adjustments section of the MSA; Special Terms section of the SOF. Include: Lock periods; notice requirements; supplier pass-through rights; stated % cap. Exclude: Late payment interest; regulatory surcharge fluctuations. If no increase provision exists: set to "No price increase provision".
```

**Examples:**

*Example 1 — renewal increases, lock, and pass-through:*

> Clause: "Fees are fixed for the Initial Service Term. During any Renewal Term, Provider may modify fees upon 30 days' prior written notice. Provider may also pass through supplier increases with 30 days' notice." / SOF: "MRC rates locked for 2-Year Committed Term."
> Desired value: `Fees fixed for 2-year committed term. Increases at renewal with 30 days' notice — no % cap. Supplier pass-throughs permitted anytime with 30 days' notice.`

*Example 2 — same mechanism, different wording:*

> Clause: "Service charges will not increase during the committed service period. After the initial term, Provider may adjust pricing with 30 days' advance notice. Supplier cost increases may be passed through at any time with 30 days' notice."
> Desired value: `Fees fixed for 2-year committed term. Increases at renewal with 30 days' notice — no % cap. Supplier pass-throughs permitted anytime with 30 days' notice.`

*Example 3 — same mechanism, abbreviated:*

> Clause: "Pricing locked for 24-month committed term. Standard MSA price adjustment rights apply thereafter."
> Desired value: `Fees fixed for 2-year committed term. Increases at renewal with 30 days' notice — no % cap.`

*Example 4 — defined % cap:*

> Clause: "Provider may increase fees by no more than 5% per year during any Renewal Term upon 60 days' prior written notice."
> Desired value: `Maximum 5% per year at renewal; 60 days' notice required`

*Example 5 — no price increase provision:*

> Clause: "The fees set forth in this Agreement shall remain fixed for the duration of the Term and any renewal thereof."
> Desired value: `No price increase provision`

---

### 12. Shipping Date


|                |               |
| -------------- | ------------- |
| **Field name** | Shipping Date |
| **Field type** | Text          |
| **Category**   | General       |
| **Attach to**  | Order Form    |


**Navigator definition (copy/paste):**

```
The committed or target date(s) by which provider-supplied CPE will be shipped. If no calendar date is stated, capture the interval and its trigger condition (e.g., "within 14 days of serial/MAC receipt"). Capture per-location if timelines differ. Found in: CPE Schedule or Installation Schedule section of the SOF. Include: Specific ship dates; ship-by intervals with trigger; per-location timelines for self-install CPE. Exclude: Professional installation dates; installation intervals with no separate shipping; phone handset quantities. Set to "No extraction" for professional-install services.
```

**Examples:**

*Example 1 — interval-based with trigger:*

> Clause: "GigaWAN Enterprise — LOC-02: Self-Install. Ship within 14 days of serial/MAC receipt."
> Desired value: `LOC-02 (self-install CPE): within 14 days of serial/MAC address receipt`

*Example 2 — same interval, different wording:*

> Clause: "Provider will ship self-install equipment to LOC-02 no later than 14 calendar days after Subscriber provides required device serial numbers and MAC addresses."
> Desired value: `LOC-02 (self-install CPE): within 14 days of serial/MAC address receipt`

*Example 3 — same interval, abbreviated:*

> Clause: "LOC-02 CPE: 14-day ship window from serial/MAC submission."
> Desired value: `LOC-02 (self-install CPE): within 14 days of serial/MAC address receipt`

*Example 4 — specific calendar date:*

> Clause: "Provider will ship all CPE to Subscriber's locations no later than June 15, 2025."
> Desired value: `June 15, 2025`

*Example 5 — professional install only, no ship date:*

> Clause: "GigaFiber Dedicated — LOC-01: Professional Installation within 30 calendar days of Order Date."
> Desired value: *No extraction*

---

## Test Benchmark Guidance

For each extraction, build a benchmark set before reprocessing at scale:


| Benchmark Set                                            | What to Include                                               |
| -------------------------------------------------------- | ------------------------------------------------------------- |
| 3–4 docs with the target field present, standard wording | Primary signal — confirms extraction fires correctly          |
| 2–3 docs with the field present but differently phrased  | Tests generalization — avoids over-fitting to one template    |
| 2–3 docs where the field is absent                       | Tests false positive rate — ensures model doesn't hallucinate |


Run **Test for Accuracy** in Navigator after each definition revision. Stabilize on the benchmark before triggering historical reprocessing (baseline allowance: 1,500 agreements/user/year).