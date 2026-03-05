/**
 * mock-navigator-data.js
 *
 * Simulates the DocuSign Navigator API response for the Gigaroute / Fontara
 * agreement family. Shape exactly matches the Navigator REST API v0.7.1-beta
 * (GET /v1/accounts/{accountId}/agreements/{agreementId}).
 *
 * Data sourced directly from the executed documents in /documents/.
 *
 * TO SWAP IN REAL API:
 *   Replace `MOCK_NAVIGATOR_DATA` with the result of:
 *     const res = await fetch(`https://api.docusign.com/v1/accounts/${accountId}/agreements/${msaId}`, {
 *       headers: { Authorization: `Bearer ${accessToken}` }
 *     });
 *   ...and a second call for children:
 *     const children = await fetch(`.../agreements?related_agreement_documents.parent_agreement_document_id=${msaId}`)
 *
 * Field type legend (used by dashboard UI):
 *   "standard"  — Navigator OOTB extraction (provisions.*)
 *   "custom"    — Configured custom extraction (custom_provisions.*)
 *   "manual"    — Not present in executed documents; must be entered manually
 *   "partial"   — OOTB extraction but incomplete (Termination Conditions)
 */

// ─────────────────────────────────────────────────────────────────────────────
// AGREEMENT ID → DOCUMENT NAME LOOKUP
// Used by the dashboard to derive "Source Document" for each field.
// ─────────────────────────────────────────────────────────────────────────────
const AGREEMENT_ID_MAP = {
  "agr-msa-fontara-001":  "Master Services Agreement",
  "agr-sof-fontara-002":  "Service Order Form",
  "agr-fee-fontara-003":  "Fee Schedule & Services Exhibit",
  "agr-sla-fontara-004":  "Service Level Agreement",
};

// ─────────────────────────────────────────────────────────────────────────────
// AGREEMENT 1: MASTER SERVICES AGREEMENT
// Signed: May 10, 2025 | Governs: legal terms, pricing policy, termination
// ─────────────────────────────────────────────────────────────────────────────
const MSA = {
  id: "agr-msa-fontara-001",
  title: "Master Services Agreement",
  file_name: "MASTER_SERVICES_AGREEMENT.pdf",
  document_id: "doc-msa-fontara-001",
  type: "Master Service Agreement",
  category: "BusinessServices",
  status: "COMPLETE",
  review_status: "ACCEPTED",
  review_completed_at: "2025-05-10T00:00:00Z",
  parties: [
    { id: "party-gigaroute", name_in_agreement: "Gigaroute Networks, LLC", preferred_name: "Gigaroute Networks" },
    { id: "party-fontara",   name_in_agreement: "Fontara, Inc.",           preferred_name: "Fontara" }
  ],
  provisions: {
    // ── Dates ──
    effective_date:               "2025-05-10T00:00:00Z",   // Effective Date per MSA preamble
    execution_date:               "2025-05-10T00:00:00Z",   // Signed May 10, 2025
    expiration_date:              "2026-05-10T00:00:00Z",   // 1-year initial term from effective date

    // ── Term ──
    term_length:                  "P1Y",                    // Art. 8.1.1: "initial term of 1 (1) year"

    // ── Financial ──
    annual_agreement_value:       69900.00,                 // $5,825/mo MRC × 12
    annual_agreement_value_currency_code: "USD",
    payment_terms_due_date:       "THIRTY_DAYS",            // Art. 5.1: "within thirty (30) days of the invoice date"
    can_charge_late_payment_fees: true,                     // Art. 5.3: 1.5%/month or max permitted by law
    late_payment_fee_percent:     1.5,                      // Art. 5.3

    // ── Lifecycle ──
    renewal_type:                 "AUTO_RENEW",             // Art. 8.1.2: auto-renews for successive 1-year periods
    renewal_notice_period:        "P30D",                   // Art. 8.1.2: "at least 30 days prior to end of term"
    termination_period_for_convenience: "P30D",             // Art. 8.3: "upon 30 days' prior written notice"

    // ── Legal ──
    governing_law:                "Texas",                  // Art. 16.2.1
    jurisdiction:                 "Austin, Texas",          // Art. 16.2.2
    assignment_type:              "YES_WITH_CONDITIONS",    // Art. 16.4: requires prior written consent

    // ── Liability ──
    // Art. 10.1.1: cap = fees paid in prior 3 months
    liability_cap_duration:       "P3M",
  },
  custom_provisions: {
    // Price adjustment policy (Art. 4.2) — not a numeric cap, a policy
    price_increase:
      "Fees fixed for Initial Service Term. During Renewal Terms, Provider may modify fees upon 30 days' prior written notice. " +
      "Supplier-driven increases may be passed through on 30 days' notice. " +
      "Subscriber may terminate without ETF if revised fees are not accepted within 30 days of notice.",

    // Termination Conditions — partial: convenience period extracted, cause conditions are additional
    termination_conditions:
      "For convenience: 30 days' written notice (Art. 8.3). " +
      "By Provider for cause: immediately upon Payment Default or material breach, including AUP violation (Art. 8.2). " +
      "Payment Default defined as: failure to pay undisputed amounts by Due Date, or filing for insolvency (Art. 6.1).",
  },
  related_agreement_documents: {
    parent_agreement_document_id: null,   // MSA is the parent
  },
  source_name: "Docusign eSign",
  source_id:   "env-msa-fontara-2025",
  metadata: {
    created_at:  "2025-05-10T00:00:00Z",
    modified_at: "2025-05-10T00:00:00Z",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// AGREEMENT 2: SERVICE ORDER FORM
// Signed: May 22, 2025 | Governs: services, pricing, committed term, locations
// ─────────────────────────────────────────────────────────────────────────────
const SOF = {
  id: "agr-sof-fontara-002",
  title: "Service Order Form",
  file_name: "SERVICE_ORDER_FORM.pdf",
  document_id: "doc-sof-fontara-002",
  type: "Order Form",
  category: "BusinessServices",
  status: "COMPLETE",
  review_status: "ACCEPTED",
  review_completed_at: "2025-05-22T00:00:00Z",
  parties: [
    { id: "party-gigaroute", name_in_agreement: "Gigaroute Networks, LLC", preferred_name: "Gigaroute Networks" },
    { id: "party-fontara",   name_in_agreement: "Fontara, Inc.",           preferred_name: "Fontara" }
  ],
  provisions: {
    // ── Dates ──
    effective_date:               "2025-05-22T00:00:00Z",   // Order Date per SOF preamble
    execution_date:               "2025-05-22T00:00:00Z",   // Signed May 22, 2025

    // ── Term ──
    // SOF Art. 6.1: 2-Year committed term selected (✓ checked in term table)
    term_length:                  "P2Y",                    // Committed Term = 2 years
    expiration_date:              "2027-05-22T00:00:00Z",   // 2 years from Order Date

    // ── Financial ──
    annual_agreement_value:       69900.00,                 // $5,825/mo × 12
    annual_agreement_value_currency_code: "USD",
    total_agreement_value:        139800.00,                // $5,825/mo × 24 months (2-year committed term)
    total_agreement_value_currency_code: "USD",
    payment_terms_due_date:       "THIRTY_DAYS",            // Art. 2.1 account table: "Net 30 from invoice date"

    // ── Lifecycle ──
    renewal_type:                 "AUTO_RENEW",             // Art. 6.1: auto-renews for successive 1-year terms
    renewal_notice_period:        "P30D",                   // Art. 6.1: "at least thirty (30) days prior to expiration"
  },
  custom_provisions: {
    // ── Products & Services (table-blocked in Navigator; first row only extracted natively) ──
    products_and_services:
      "GigaFiber Dedicated — 1 Gbps symmetrical dedicated fiber, professional installation, Provider-supplied CPE (LOC-01); " +
      "GigaWAN Enterprise (SD-WAN) — Dual-site active/active SD-WAN with failover, GigaSecure integration enabled (LOC-01, LOC-02); " +
      "GigaSecure Managed Network & Security — Managed firewall, IDS/IPS, threat monitoring, 24×7 NOC monitoring (LOC-01, LOC-02); " +
      "GigaVoice Business Voice over IP — 25 seats, hosted PBX, unlimited domestic calling, 1 DID block of 25 numbers (LOC-01)",

    // ── Pricing & Discounts (table-blocked) ──
    pricing_and_discounts:
      "GigaFiber Dedicated: MRC $2,800/mo, NRC $350 one-time; " +
      "GigaWAN Enterprise: MRC $1,200/mo, NRC $700 one-time; " +
      "GigaSecure: MRC $950/mo, NRC $0 (waived — bundled promotion); " +
      "GigaVoice: MRC $875/mo, NRC $300 one-time; " +
      "Total MRC: $5,825/mo | Total NRC: $1,350 | Estimated monthly invoice (excl. variable usage): ~$6,200",

    // ── Pricing Type ──
    pricing_type:
      "MRC + NRC — Monthly Recurring Charges billed in advance; Non-Recurring Charges billed at Billing Start Date. " +
      "Rates locked for full 24-month Committed Term (2-Year Rate Lock promotion).",

    // ── Quantity (table-blocked) ──
    quantity:
      "GigaFiber Dedicated: 1 circuit (1 Gbps) at LOC-01; " +
      "GigaWAN Enterprise: 2 sites (LOC-01, LOC-02); " +
      "GigaSecure: 2 sites (LOC-01, LOC-02); " +
      "GigaVoice: 25 seats at LOC-01",

    // ── Payment Type ──
    payment_type:
      "ACH / Electronic Funds Transfer",   // Art. 2.1: "Preferred Payment Method"

    // ── Usage Entitlement ──
    usage_entitlement:
      "GigaFiber Dedicated: 1 Gbps symmetrical, unlimited bandwidth, dedicated fiber circuit; " +
      "GigaVoice: 25 seats, unlimited domestic calling, 1 DID block (25 numbers, ported from CenturyLink/Lumen); " +
      "GigaVoice Growth Reserve: up to 5 additional seats may be activated at standard MRC without ETF; " +
      "GigaWAN Enterprise: dual-site active/active SD-WAN, failover enabled; " +
      "GigaSecure: managed firewall, IDS/IPS, unified security dashboard, 24×7 NOC",

    // ── Shipping Date ──
    // Not a specific calendar date — defined as installation intervals from Order Date
    shipping_date:
      "LOC-01 services (GigaFiber, GigaWAN, GigaVoice): professional installation target 30 calendar days from Order Date (May 22, 2025); " +
      "LOC-02 (GigaWAN branch appliance): self-install CPE ships within 14 days of serial/MAC receipt; " +
      "GigaSecure: concurrent with primary circuit installation",

    // ── Service Activation Date ──
    // Not a specific date in the documents — occurs on Billing Start Date (when provisioned)
    service_activation_date: null,  // Pending provisioning; set to Billing Start Date when confirmed
  },
  related_agreement_documents: {
    parent_agreement_document_id: "agr-msa-fontara-001",
  },
  source_name: "Docusign eSign",
  source_id:   "env-sof-fontara-2025",
  metadata: {
    created_at:  "2025-05-22T00:00:00Z",
    modified_at: "2025-05-22T00:00:00Z",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// AGREEMENT 3: FEE SCHEDULE AND SERVICES EXHIBIT
// Signed: June 11, 2025 | Governs: ETF schedule, installation fees, other charges
// ─────────────────────────────────────────────────────────────────────────────
const FEE_SCHEDULE = {
  id: "agr-fee-fontara-003",
  title: "Fee Schedule and Services Exhibit",
  file_name: "FEE_SCHEDULE_AND_SERVICES_EXHIBIT.pdf",
  document_id: "doc-fee-fontara-003",
  type: "Exhibit",
  category: "BusinessServices",
  status: "COMPLETE",
  review_status: "ACCEPTED",
  review_completed_at: "2025-06-11T00:00:00Z",
  parties: [
    { id: "party-gigaroute", name_in_agreement: "Gigaroute Networks, LLC", preferred_name: "Gigaroute Networks" },
    { id: "party-fontara",   name_in_agreement: "Fontara, Inc.",           preferred_name: "Fontara" }
  ],
  provisions: {
    // ── Dates ──
    effective_date:               "2025-06-11T00:00:00Z",
    execution_date:               "2025-06-11T00:00:00Z",   // Signed June 11, 2025

    // ── Term ──
    term_length:                  "P1Y",                    // Art. 6.1.1: initial term of 1 year
    expiration_date:              "2026-06-11T00:00:00Z",

    // ── Lifecycle ──
    renewal_type:                 "AUTO_RENEW",             // Art. 6.1.2: auto-renews for successive 1-year periods
    renewal_notice_period:        "P30D",                   // Art. 6.1.2: "at least 30 days prior to end of term"
  },
  custom_provisions: {
    // ── Early Termination Fee ──
    // Art. 2.1 ETF table: Fontara is on 2-year term for all services
    early_termination_fee:
      "2-Year Term (all services): MRC × Remaining Months. " +
      "GigaFiber Dedicated (Core Service Area, 2-year): MRC × Remaining Months. " +
      "GigaWAN Enterprise: MRC × Remaining Months. " +
      "GigaSecure: MRC × Remaining Months. " +
      "GigaVoice: MRC × Remaining Months (up to 20% of seats may be placed in growth reserve without ETF). " +
      "ETF is in addition to: all amounts owed through termination date, any outstanding Instant Credit repayment obligations. " +
      "30-day Satisfaction Guarantee: ETF-free exit available within 30 days of Billing Start Date (GigaFiber, GigaWAN, GigaSecure, GigaVoice only).",

    // ── Minimum Commitment ──
    // Not specified in the executed documents for this agreement
    minimum_commitment: null,

    // ── Price Increase Date ──
    // Not a specific date — tied to renewal period notice; no explicit date in documents
    price_increase_date: null,
  },
  related_agreement_documents: {
    parent_agreement_document_id: "agr-msa-fontara-001",
  },
  source_name: "Docusign eSign",
  source_id:   "env-fee-fontara-2025",
  metadata: {
    created_at:  "2025-06-11T00:00:00Z",
    modified_at: "2025-06-11T00:00:00Z",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// AGREEMENT 4: SERVICE LEVEL AGREEMENT
// Signed: June 21, 2025 | Governs: availability targets, MTTR, penalties, remedies
// ─────────────────────────────────────────────────────────────────────────────
const SLA = {
  id: "agr-sla-fontara-004",
  title: "Service Level Agreement",
  file_name: "SERVICE_LEVEL_AGREEMENT.pdf",
  document_id: "doc-sla-fontara-004",
  type: "Service Level Agreement",
  category: "BusinessServices",
  status: "COMPLETE",
  review_status: "ACCEPTED",
  review_completed_at: "2025-06-21T00:00:00Z",
  parties: [
    { id: "party-gigaroute", name_in_agreement: "Gigaroute Networks, LLC", preferred_name: "Gigaroute Networks" },
    { id: "party-fontara",   name_in_agreement: "Fontara, Inc.",           preferred_name: "Fontara" }
  ],
  provisions: {
    // ── Dates ──
    effective_date:               "2025-06-21T00:00:00Z",
    execution_date:               "2025-06-21T00:00:00Z",   // Signed June 21, 2025

    // ── Term ──
    term_length:                  "P1Y",                    // Art. 10.1.1: initial term of 1 year
    expiration_date:              "2026-06-21T00:00:00Z",

    // ── Lifecycle ──
    renewal_type:                 "AUTO_RENEW",             // Art. 10.1.2
    renewal_notice_period:        "P30D",                   // Art. 10.1.2
  },
  custom_provisions: {
    // ── SLA Commitments (table-blocked in Navigator) ──
    sla:
      "GigaFiber Dedicated: 99.99% availability (w/ failover), 99.90% (w/o failover), MTTR 4 hrs, latency ≤110ms roundtrip, packet delivery 99.90%; " +
      "GigaWAN Enterprise: 100.00% availability (w/ and w/o failover), MTTR 48 hrs config / 8 hrs repair / 24 hrs hardware; " +
      "GigaSecure (MNS): 99.99% availability, MTTR 24 hrs; " +
      "GigaVoice: 99.99% availability (w/ failover), 99.90% (w/o failover), MTTR 4 hrs. " +
      "All services include Chronic Outage Protection (3+ outages ≥15 min each in a calendar month). " +
      "GigaFiber Core installation interval SLA: 30 calendar days.",

    // ── SLA Performance Conditions / Penalty Schedule (table-blocked) ──
    sla_performance_conditions:
      "Availability breach (50–SLA%): 1% of MRC per % point below SLA target per circuit per month. " +
      "Availability < 50%: 100% of MRC for the affected circuit for that month. " +
      "MTTR breach (> SLA target): 10% of MRC for each circuit with an outage that month. " +
      "Latency > 110ms ≤ 150ms: 5% MRC; > 150ms ≤ 200ms: 10% MRC; > 200ms: 25% MRC (GigaFiber only; 15-day cure period applies). " +
      "Packet Delivery < 99.90%: 10% of MRC for affected circuit (GigaFiber only). " +
      "Chronic Outage (3+ outages ≥15 min in a month): 25% MRC credit for that month, OR ETF-free termination if chronic outage persists ≥2 consecutive months. " +
      "Credits capped at 100% of MRC per circuit per calendar month. Credits are non-transferable, non-redeemable for cash. " +
      "Claim must be submitted by 15th of month following resolution. Credits are sole and exclusive remedy for SLA failures.",

    // ── Penalty (shorthand field — maps to same content as sla_performance_conditions) ──
    penalty:
      "Service credits per SLA schedule: availability breach (1% MRC/% point below target); " +
      "MTTR breach (10% MRC/circuit); latency breach (5–25% MRC by severity); " +
      "packet delivery breach (10% MRC); chronic outage (25% MRC or ETF-free exit). " +
      "Max credit: 100% of MRC per circuit per month. Credits are sole and exclusive remedy.",
  },
  related_agreement_documents: {
    parent_agreement_document_id: "agr-msa-fontara-001",
  },
  source_name: "Docusign eSign",
  source_id:   "env-sla-fontara-2025",
  metadata: {
    created_at:  "2025-06-21T00:00:00Z",
    modified_at: "2025-06-21T00:00:00Z",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// MOCK NAVIGATOR API RESPONSE
// Simulates what the dashboard receives after the 2-call family assembly.
// ─────────────────────────────────────────────────────────────────────────────
const MOCK_NAVIGATOR_DATA = {
  // The assembled agreement family
  agreements: [MSA, SOF, FEE_SCHEDULE, SLA],

  // agreementId → document name lookup (built from AGREEMENT_ID_MAP above)
  documentNames: AGREEMENT_ID_MAP,

  // Metadata about this mock dataset
  _meta: {
    customer:      "Fontara, Inc.",
    provider:      "Gigaroute Networks, LLC",
    familyParent:  "agr-msa-fontara-001",
    dataSource:    "mock — sourced from executed documents in /documents/",
    apiVersion:    "0.7.1-beta",
    lastUpdated:   "2026-03-05",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// FIELD RESOLUTION HELPER
// Builds the display-ready 21-field map from the raw agreement objects.
// Returns: { fieldName: { value, sourceDoc, fieldType } }
// fieldType: "standard" | "custom" | "manual" | "partial"
// ─────────────────────────────────────────────────────────────────────────────
function resolveFields(agreements, documentNames) {
  const byId = {};
  for (const agr of agreements) byId[agr.id] = agr;

  const msa = byId["agr-msa-fontara-001"];
  const sof = byId["agr-sof-fontara-002"];
  const fee = byId["agr-fee-fontara-003"];
  const sla = byId["agr-sla-fontara-004"];

  // ISO 8601 duration → human-readable
  function humanDuration(iso) {
    if (!iso) return null;
    const map = { P1Y: "1 year", P2Y: "2 years", P3Y: "3 years", P30D: "30 days", P3M: "3 months", P90D: "90 days" };
    return map[iso] || iso;
  }

  // Payment terms enum → human-readable
  function humanPaymentTerms(val) {
    if (!val) return null;
    const map = { THIRTY_DAYS: "Net 30", SIXTY_DAYS: "Net 60", FORTY_FIVE_DAYS: "Net 45" };
    return map[val] || val;
  }

  // Renewal type enum → human-readable
  function humanRenewalType(val) {
    if (!val) return null;
    const map = { AUTO_RENEW: "Auto-renew", MANUAL: "Manual renewal", EVERGREEN: "Evergreen" };
    return map[val] || val;
  }

  // ISO date → display date
  function displayDate(iso) {
    if (!iso) return null;
    return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  }

  return {
    // 1. Auto Renewal
    auto_renewal: {
      value:      humanRenewalType(msa.provisions.renewal_type),
      raw:        msa.provisions.renewal_type,
      sourceDoc:  documentNames[msa.id],
      sourceId:   msa.id,
      fieldType:  "standard",
    },
    // 2. Contract Signing Date (authoritative: SOF — the operative service commitment date)
    contract_signing_date: {
      value:      displayDate(sof.provisions.execution_date),
      raw:        sof.provisions.execution_date,
      sourceDoc:  documentNames[sof.id],
      sourceId:   sof.id,
      fieldType:  "standard",
      note:       `MSA signed ${displayDate(msa.provisions.execution_date)}; SOF is the operative service commitment`,
    },
    // 3. Early Termination Fee
    early_termination_fee: {
      value:      fee.custom_provisions.early_termination_fee,
      raw:        fee.custom_provisions.early_termination_fee,
      sourceDoc:  documentNames[fee.id],
      sourceId:   fee.id,
      fieldType:  "custom",
    },
    // 4. Minimum Commitment
    minimum_commitment: {
      value:      null,
      raw:        null,
      sourceDoc:  null,
      sourceId:   null,
      fieldType:  "manual",
      note:       "Not specified in executed documents",
    },
    // 5. Payment Term
    payment_term: {
      value:      humanPaymentTerms(sof.provisions.payment_terms_due_date),
      raw:        sof.provisions.payment_terms_due_date,
      sourceDoc:  documentNames[sof.id],
      sourceId:   sof.id,
      fieldType:  "standard",
    },
    // 6. Payment Type
    payment_type: {
      value:      sof.custom_provisions.payment_type,
      raw:        sof.custom_provisions.payment_type,
      sourceDoc:  documentNames[sof.id],
      sourceId:   sof.id,
      fieldType:  "custom",
    },
    // 7. Penalty
    penalty: {
      value:      sla.custom_provisions.penalty,
      raw:        sla.custom_provisions.penalty,
      sourceDoc:  documentNames[sla.id],
      sourceId:   sla.id,
      fieldType:  "custom",
    },
    // 8. Price Increase (%)
    price_increase: {
      value:      msa.custom_provisions.price_increase,
      raw:        msa.custom_provisions.price_increase,
      sourceDoc:  documentNames[msa.id],
      sourceId:   msa.id,
      fieldType:  "custom",
      note:       "No numeric cap specified; policy is 30-day written notice before any renewal-period increase",
    },
    // 9. Price Increase Date
    price_increase_date: {
      value:      null,
      raw:        null,
      sourceDoc:  null,
      sourceId:   null,
      fieldType:  "manual",
      note:       "No specific date in documents; tied to renewal period",
    },
    // 10. Pricing & Discounts
    pricing_and_discounts: {
      value:      sof.custom_provisions.pricing_and_discounts,
      raw:        sof.custom_provisions.pricing_and_discounts,
      sourceDoc:  documentNames[sof.id],
      sourceId:   sof.id,
      fieldType:  "custom",
    },
    // 11. Pricing Type
    pricing_type: {
      value:      sof.custom_provisions.pricing_type,
      raw:        sof.custom_provisions.pricing_type,
      sourceDoc:  documentNames[sof.id],
      sourceId:   sof.id,
      fieldType:  "custom",
    },
    // 12. Products & Services
    products_and_services: {
      value:      sof.custom_provisions.products_and_services,
      raw:        sof.custom_provisions.products_and_services,
      sourceDoc:  documentNames[sof.id],
      sourceId:   sof.id,
      fieldType:  "custom",
    },
    // 13. Quantity
    quantity: {
      value:      sof.custom_provisions.quantity,
      raw:        sof.custom_provisions.quantity,
      sourceDoc:  documentNames[sof.id],
      sourceId:   sof.id,
      fieldType:  "custom",
    },
    // 14. Renewal Notice Period
    renewal_notice_period: {
      value:      humanDuration(msa.provisions.renewal_notice_period),
      raw:        msa.provisions.renewal_notice_period,
      sourceDoc:  documentNames[msa.id],
      sourceId:   msa.id,
      fieldType:  "standard",
    },
    // 15. Service Activation Date
    service_activation_date: {
      value:      null,
      raw:        null,
      sourceDoc:  null,
      sourceId:   null,
      fieldType:  "manual",
      note:       "Equals Billing Start Date — set when provisioning is confirmed; not available at signing",
    },
    // 16. Shipping Date
    shipping_date: {
      value:      sof.custom_provisions.shipping_date,
      raw:        sof.custom_provisions.shipping_date,
      sourceDoc:  documentNames[sof.id],
      sourceId:   sof.id,
      fieldType:  "custom",
    },
    // 17. SLA
    sla: {
      value:      sla.custom_provisions.sla,
      raw:        sla.custom_provisions.sla,
      sourceDoc:  documentNames[sla.id],
      sourceId:   sla.id,
      fieldType:  "custom",
    },
    // 18. SLA Performance Conditions
    sla_performance_conditions: {
      value:      sla.custom_provisions.sla_performance_conditions,
      raw:        sla.custom_provisions.sla_performance_conditions,
      sourceDoc:  documentNames[sla.id],
      sourceId:   sla.id,
      fieldType:  "custom",
    },
    // 19. Term (authoritative: SOF Committed Term)
    term: {
      value:      humanDuration(sof.provisions.term_length),
      raw:        sof.provisions.term_length,
      sourceDoc:  documentNames[sof.id],
      sourceId:   sof.id,
      fieldType:  "standard",
      note:       "SOF Committed Term = 2 years. MSA Initial Term = 1 year (governs the master agreement, not the service commitment).",
    },
    // 20. Termination Conditions (partial — convenience period is OOTB; full clause from custom)
    termination_conditions: {
      value:      msa.custom_provisions.termination_conditions,
      raw:        msa.custom_provisions.termination_conditions,
      sourceDoc:  documentNames[msa.id],
      sourceId:   msa.id,
      fieldType:  "partial",
      standardValue: humanDuration(msa.provisions.termination_period_for_convenience),
      note:       "Navigator extracts convenience notice period (30 days) natively; cause conditions and payment default triggers require custom extraction",
    },
    // 21. Usage Entitlement
    usage_entitlement: {
      value:      sof.custom_provisions.usage_entitlement,
      raw:        sof.custom_provisions.usage_entitlement,
      sourceDoc:  documentNames[sof.id],
      sourceId:   sof.id,
      fieldType:  "custom",
    },
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// EXPORTS
// ─────────────────────────────────────────────────────────────────────────────
// For use in the dashboard:
//   const fields = resolveFields(MOCK_NAVIGATOR_DATA.agreements, MOCK_NAVIGATOR_DATA.documentNames);
//   // fields.term.value         → "2 years"
//   // fields.term.sourceDoc     → "Service Order Form"
//   // fields.term.fieldType     → "standard"

if (typeof module !== "undefined") {
  module.exports = { MOCK_NAVIGATOR_DATA, resolveFields, AGREEMENT_ID_MAP };
}
