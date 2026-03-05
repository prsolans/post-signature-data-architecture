# Navigator Extraction Audit
## Post-Sign Agreement Terms vs. Standard Extractions

---

## Status Update

We've completed an initial assessment of Navigator's ability to extract the 21 post-sign agreement fields required across our downstream job functions (Billing, Renewals, Fulfillment, Revenue Assurance, etc.).

**Summary:**

| | Count | Fields |
|---|---|---|
| Available out of the box | 5 | Auto Renewal, Contract Signing Date, Payment Term, Renewal Notice Period, Term |
| Available OOTB — partial only | 1 | Termination Conditions (notice period extracted; cause conditions and exit rights not captured) |
| Blocked — Navigator cannot reliably extract tabular data | 5 | Products & Services, Pricing & Discounts, Quantity, SLA, SLA Performance Conditions |
| Still to test as custom extractions | 7 | Early Termination Fee, Payment Type, Penalty, Price Increase, Pricing Type, Shipping Date, Usage Entitlement |
| Not present in executed documents | 3 | Minimum Commitment, Price Increase Date, Service Activation Date |
| **Total** | **21** | |

The 5 table-blocked fields represent some of our highest-value data points — service lines, pricing, and SLA commitments are all structured as multi-row grids in the SOF and SLA. Navigator consistently stops at the first row. These fields will need an alternative approach and are a key input into the API interface design (PRS-27).

The 7 remaining custom extraction candidates are all text-based clauses. We'll configure and test these next to determine final coverage before scoping the custom interface.

*Last updated: 2026-03-03*

---

**Scope:** 4-document agreement family — MSA, SOF, Fee Schedule & Services Exhibit, SLA (Gigaroute Networks / Fontara, Inc.)
**Method:** Navigator AI-Assisted standard extractions reviewed per document

---

## Legend
- ✅ **Standard** — Navigator extracts this field natively
- ⚠️ **Partial** — Navigator extracts a related field; not a direct match or missing detail
- ❌ **Custom** — Navigator does not extract this; custom extraction required

---

## Required Agreement Terms

| # | Field | Status | Navigator Field Name | Source Document(s) |
|---|-------|--------|----------------------|--------------------|
| 1 | Auto Renewal | ✅ Standard | Renewal Type | MSA, SOF, SLA |
| 2 | Contract Signing Date | ✅ Standard | Execution Date | MSA, SOF, Fee Schedule, SLA |
| 3 | Early Termination Fees | ❌ Custom | — | MSA, SOF |
| 4 | Minimum Commitment | ❌ Custom | — | SOF, Fee Schedule |
| 5 | Payment Term | ✅ Standard | Payment Terms | MSA, SOF |
| 6 | Payment Type | ❌ Custom | Payment Terms captures duration (30 days) but not payment method | MSA, SOF |
| 7 | Penalty | ❌ Custom | — | SLA |
| 8 | Price Increase (%) | ❌ Custom | — | Fee Schedule |
| 9 | Price Increase Date | ❌ Custom | — | Fee Schedule |
| 10 | Pricing & Discounts | ❌ Custom | Annual Contract Value extracted (SOF) but not line-level rates or discounts | SOF, Fee Schedule |
| 11 | Pricing Type | ❌ Custom | — | SOF, Fee Schedule |
| 12 | Products & Services | ❌ Custom | — | SOF, Fee Schedule |
| 13 | Quantity | ❌ Custom | — | SOF, Fee Schedule |
| 14 | Renewal Notice Period | ✅ Standard | Renewal Notice Period | MSA, SOF, SLA |
| 15 | Service Activation Date | ❌ Custom | Navigator extracts Effective Date, which differs from service go-live | SOF |
| 16 | Shipping Date | ❌ Custom | — | SOF |
| 17 | SLA | ❌ Custom | Navigator identifies the SLA document type but does not extract uptime targets or performance thresholds | SLA |
| 18 | SLA Performance Conditions | ❌ Custom | — | SLA |
| 19 | Term | ✅ Standard | Initial Term Length | MSA, SOF, Fee Schedule, SLA |
| 20 | Termination Conditions | ⚠️ Partial | Termination for Convenience – Notice Period only; cause notice and specific exit conditions not extracted | MSA |
| 21 | Usage Entitlement | ❌ Custom | — | SOF, Fee Schedule |

---

## Summary

| | Count |
|---|---|
| ✅ Standard | 5 |
| ⚠️ Partial | 1 |
| ❌ Custom required | 15 |
| **Total** | **21** |

---

## Standard Extractions Available (Full Detail)

These fields are confirmed present in Navigator's AI-Assisted standard extractions across the agreement family:

| Navigator Field | Maps To | MSA | SOF | Fee Schedule | SLA |
|----------------|---------|-----|-----|--------------|-----|
| Execution Date | Contract Signing Date | ✅ 5/10/2025 | ✅ 5/22/2025 | ✅ 6/11/2025 | ✅ 6/21/2025 |
| Initial Term Length | Term | ✅ 1 year | ✅ 1 year | ✅ 1 year | ✅ 1 year |
| Payment Terms | Payment Term | ✅ 30 days | ✅ 30 days | — | — |
| Renewal Notice Period | Renewal Notice Period | ✅ 30 days | ✅ 30 days | — | ✅ 30 days |
| Renewal Type | Auto Renewal | ✅ Auto Renew | ✅ Auto Renew | — | ✅ Auto Renew |
| Termination for Convenience – Notice Period | Termination Conditions | ✅ 30 days | — | — | — (empty) |

---

## Notes

- **Service Activation Date vs. Effective Date:** Navigator extracts "Effective Date" from all documents. This is the contract effective date, not the service go-live date. These often differ — custom extraction or a separate provisioning data source is required.
- **SLA document:** Navigator correctly classifies it as a Service Level Agreement and surfaces 34 fields with 13 new suggestions. None of the currently visible standard extractions cover uptime thresholds, performance targets, or penalty structures — all custom.
- **SOF:** Identified as "Order Form" type. Annual Contract Value ($69,900) is the only financial field extracted natively. Line-level pricing, quantities, and product details all require custom extractions.
- **Fee Schedule:** Identified as "Exhibit" type. No pricing, escalation, or entitlement data extracted natively — the document with the most commercial detail has the least coverage.
