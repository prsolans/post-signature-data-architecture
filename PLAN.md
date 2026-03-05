# Post-Signature Data Architecture — Plan

## Phase 1: Navigator Population
*Goal: Agreement family fully populated in Navigator — all 21 fields accounted for.*

- [x] **PRS-25** Review Navigator standard extractions
  - Audit complete — 5 OOTB, 1 partial, 5 table-blocked, 7 to test, 3 not in documents
  - Artifacts: NAVIGATOR_EXTRACTION_AUDIT.md, CLAUDE_EXTRACTION_AUDIT.md

- [ ] **PRS-26** Configure custom extractions + populate Navigator
  - Configure 7 text-based custom extractions (ETF, Payment Type, Penalty, Price Increase, Pricing Type, Shipping Date, Usage Entitlement)
  - Manually enter values for 5 table-blocked fields (Products & Services, Pricing & Discounts, Quantity, SLA, SLA Performance Conditions)
  - Verify 5 OOTB standard extractions are correctly captured
  - Quick check: does Navigator API support pushing extraction values? (timebox 30 min)
  - Reference: CUSTOM_EXTRACTION_PLAN.md

## Phase 2: API Research
*Goal: Understand the Navigator API schema before building the artifact.*

- [x] **PRS-39** Navigator API research and data model mapping *(sub-issue of PRS-27)*
  - Confirm API authentication and access
  - Map response schema: how extracted fields are returned, what identifiers link fields to source documents
  - Confirm whether the full agreement family can be queried in one call or per document
  - Output: documented data model ready for artifact build
  - Artifact: NAVIGATOR_API_DATA_MODEL.md

## Phase 3: Build the Artifact
*Goal: Branded, demo-ready web app dashboard presenting agreement data by job function.*

- [ ] **PRS-27** Build post-sign dashboard (Part 1 — mock data)
  - Job-function navigation (Billing, Renewal, Fulfillment, Rev Rec, Commissions, Obligations, Rev Assurance)
  - Each job shows: Term | Extracted Value | Source Document | field type badge (Standard / Custom / Manual)
  - Powered by `mock-navigator-data.js` — real Gigaroute/Fontara values
  - New standalone artifact (`dashboard.html`); hub-and-spoke viz archived to `archive/`
  - Audience: customers, product, sales — presentation-quality polish required

- [ ] **PRS-41** Connect dashboard to Navigator API (Part 2 — live data) *(blocked by PRS-26)*
  - Replace mock data with live Navigator API calls
  - Validate all 21 fields render correctly from real extractions

## Backlog / Next Pass
- Investigate 3rd-party extraction for table-blocked fields (Products & Services, Pricing & Discounts, Quantity, SLA, SLA Performance Conditions)
- Investigate Navigator API write capability for pushing sample extraction values
- Await Product response on cross-document querying and Agent release roadmap
- **PRS-40** Create 3 additional demo agreement families (different GigaFiber customers) for multi-customer dashboard demo *(low priority)*
