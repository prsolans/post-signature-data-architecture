# Navigator API Data Model
## Research Notes — PRS-39

*Researched: 2026-03-05 | Source: DocuSign OpenAPI spec v0.7.1-beta + developer docs*

---

## Status Summary

The Navigator API gives us programmatic read access to everything we need for the dashboard artifact. Key constraints that shape the build:

- **No native agreement family concept** — MSA, SOF, Fee Schedule, and SLA are separate agreement records; two API calls required to assemble the family
- **No confidence scores exposed** — extraction quality is indicated by review status, not a numeric score
- **Custom extractions return as an untyped key/value map** — our 7 custom fields land in `custom_provisions`, not `provisions`
- **No field-level source document pointer** — the source document is derived from which `agreementId` a field came from, not from a property on the field itself

---

## 1. Authentication

**Method:** OAuth 2.0 — two flows supported

| Flow | Use case |
|---|---|
| JWT Grant | Server-to-server (recommended for the dashboard — no user interaction after initial consent) |
| Authorization Code Grant | User-delegated access; browser-based |

**Endpoints:**
| Environment | Auth URL | Token URL |
|---|---|---|
| Demo/Sandbox | `https://account-d.docusign.com/oauth/auth` | `https://account-d.docusign.com/oauth/token` |
| Production | `https://account.docusign.com/oauth/auth` | `https://account.docusign.com/oauth/token` |

**Required scopes:**
```
adm_store_unified_repo_read    (read agreement data — required)
impersonation                  (JWT grant — required to act on behalf of a user)
signature                      (standard DocuSign)
openid                         (standard OIDC)
```

**JWT Grant setup:**
- Register an Integration Key in the DocuSign developer portal (Settings → Apps and Keys)
- Upload a public RSA key; sign JWTs with the private key
- JWT payload: `iss` (Integration Key), `sub` (User ID), `aud` (`account-d.docusign.com`), `iat`, `exp` (max 3600s)

**Access note:** Navigator API is currently in Limited Availability. Enabling it requires the IAM add-on or coordination with the DocuSign account team. Not available in standard free developer accounts.

---

## 2. Base URLs and Key Endpoints

| Environment | Base URL |
|---|---|
| Production | `https://api.docusign.com` |
| Demo (sandbox) | `https://api-d.docusign.com` |

**Endpoints in scope:**

| Method | Path | Purpose |
|---|---|---|
| `GET` | `/v1/accounts/{accountId}/agreements` | List/search agreements; supports OData `$filter` |
| `GET` | `/v1/accounts/{accountId}/agreements/{agreementId}` | Fetch one agreement with full provisions |
| `DELETE` | `/v1/accounts/{accountId}/agreements/{agreementId}` | Remove agreement (not needed) |
| `POST` | `/v1/accounts/{accountId}/upload/jobs` | Bulk ingestion (not needed for demo) |

The ExtractionReview endpoint (field-level extraction metadata with matched text) is defined in the spec schema but **not yet exposed as a public endpoint** in v0.7.1-beta. This is a gap — verbatim extracted text and character offsets are not currently accessible via API.

---

## 3. Response Schema

### Agreement object structure

```json
{
  "id": "48e593bd-73e8-455f-...",         // Navigator UUID — use this as agreementId
  "title": "Master Service Agreement",
  "file_name": "MSA_Gigaroute.pdf",
  "document_id": "string",               // ID in DocuSign's document management system
  "type": "Master Service Agreement",    // AI-classified type
  "category": "BusinessServices",
  "status": "COMPLETE",                  // PENDING | COMPLETE | INACTIVE
  "review_status": "string",
  "parties": [{ "name_in_agreement": "Fontara, Inc." }],
  "provisions": { ... },                 // standard extracted fields (typed)
  "custom_provisions": { ... },          // custom extraction fields (key/value map)
  "related_agreement_documents": {
    "parent_agreement_document_id": "77b85334-..."   // set on child docs; null on MSA
  },
  "source_name": "Docusign eSign",
  "source_id": "8ade6915-...",           // envelope ID in eSign
  "metadata": {
    "created_at": "2024-02-01T00:00:00Z",
    "modified_at": "2024-10-17T14:30:00Z"
  }
}
```

### `provisions` object — standard fields (typed schema)

These are the AI-extracted fields with a fixed schema. Relevant fields for our use case:

| Provisions field | Our field name | Type | Notes |
|---|---|---|---|
| `execution_date` | Contract Signing Date | ISO 8601 datetime | Maps to our ✅ OOTB field |
| `term_length` | Term | ISO 8601 duration (e.g. `P3Y`) | Maps to our ✅ OOTB field |
| `payment_terms_due_date` | Payment Term | Enum: `THIRTY_DAYS`, `SIXTY_DAYS`, etc. | Maps to our ✅ OOTB field |
| `renewal_notice_period` | Renewal Notice Period | ISO 8601 duration (e.g. `P30D`) | Maps to our ✅ OOTB field |
| `renewal_type` | Auto Renewal | Enum: `AUTO_RENEW`, `MANUAL`, `EVERGREEN` | Maps to our ✅ OOTB field |
| `termination_period_for_convenience` | Termination Conditions (partial) | ISO 8601 duration | Maps to our ⚠️ partial field |
| `price_cap_percent_increase` | Price Increase (%) | float | May cover our ❌ custom field |
| `annual_agreement_value` | Pricing & Discounts (partial) | float | ACV only; not line-level |
| `effective_date` | — | ISO 8601 datetime | Effective date ≠ Service Activation Date |

**All 5 of our OOTB standard fields are present in the `provisions` object.**

### `custom_provisions` object — custom extraction fields

```json
"custom_provisions": {
  "early_termination_fee": "MRC × remaining months",
  "payment_type": "ACH / EFT",
  "penalty": "Service Credits up to 5% of monthly fees",
  "pricing_type": "MRC + NRC",
  "shipping_date": "2025-06-30",
  "usage_entitlement": "Unlimited",
  "products_and_services": "GigaFiber, GigaWAN..."
}
```

- Keys are defined by the Navigator custom extraction configuration
- Values are untyped strings (no schema enforcement)
- **All 7 of our text-based custom extraction candidates will land here once configured**
- **The 5 table-blocked fields (Products & Services, Pricing & Discounts, Quantity, SLA, SLA Performance Conditions) would also land here if configured as custom extractions — but Navigator's known limitation is that it stops at the first table row**

---

## 4. Agreement Family Query Pattern

**There is no single-call "get the whole family" endpoint.** Two calls are needed:

```
Step 1 — Get the MSA (and its Navigator ID):
GET /v1/accounts/{accountId}/agreements
  ?$filter=type eq 'Master Service Agreement' and parties/name_in_agreement eq 'Fontara, Inc.'

Step 2 — Get all child documents for this agreement family:
GET /v1/accounts/{accountId}/agreements
  ?related_agreement_documents.parent_agreement_document_id={msaId}
```

Step 2 returns the SOF, Fee Schedule, and SLA in one paginated response — assuming the `parent_agreement_document_id` was set when these documents were uploaded to Navigator.

**If parent-child linking was not configured at upload time**, the fallback is to query by party name + date range and identify the four documents manually.

**Implication for the artifact:** The data assembly layer needs to:
1. Fetch all 4 agreement records (2 API calls)
2. Build a merged field map keyed by our 21 field names
3. Annotate each field value with the `agreementId` it came from — this is the "Source Document" attribution

---

## 5. Field-to-Source-Document Attribution

Individual extracted fields do **not** carry a `source_document_id` property. Attribution is derived structurally:

- Each agreement record represents one source document
- The `agreementId` of the record that returned a field = the source document for that field
- At query time, maintain a lookup: `{ agreementId → document name (MSA | SOF | Fee Schedule | SLA) }`

**For fields present in multiple documents** (e.g., `term_length` is in all four), we have options:
1. Use the value from the "authoritative" document (e.g., SOF for pricing, MSA for legal terms)
2. Surface all occurrences with their sources and let the UI handle reconciliation

**Recommendation for the artifact:** Define an authoritative source per field (see field map below).

---

## 6. Our 21-Field Map to API Paths

| # | Our Field | API Location | Path | Authoritative Source |
|---|---|---|---|---|
| 1 | Auto Renewal | `provisions` | `.renewal_type` | MSA |
| 2 | Contract Signing Date | `provisions` | `.execution_date` | SOF |
| 3 | Early Termination Fee | `custom_provisions` | `.early_termination_fee` | Fee Schedule |
| 4 | Minimum Commitment | `custom_provisions` | `.minimum_commitment` | SOF |
| 5 | Payment Term | `provisions` | `.payment_terms_due_date` | SOF |
| 6 | Payment Type | `custom_provisions` | `.payment_type` | SOF |
| 7 | Penalty | `custom_provisions` | `.penalty` | SLA |
| 8 | Price Increase (%) | `provisions` or `custom_provisions` | `.price_cap_percent_increase` or `.price_increase` | MSA |
| 9 | Price Increase Date | `custom_provisions` | `.price_increase_date` | Fee Schedule |
| 10 | Pricing & Discounts | `custom_provisions` | `.pricing_and_discounts` | SOF |
| 11 | Pricing Type | `custom_provisions` | `.pricing_type` | SOF |
| 12 | Products & Services | `custom_provisions` | `.products_and_services` | SOF |
| 13 | Quantity | `custom_provisions` | `.quantity` | SOF |
| 14 | Renewal Notice Period | `provisions` | `.renewal_notice_period` | MSA |
| 15 | Service Activation Date | `custom_provisions` | `.service_activation_date` | SOF |
| 16 | Shipping Date | `custom_provisions` | `.shipping_date` | SOF |
| 17 | SLA | `custom_provisions` | `.sla` | SLA |
| 18 | SLA Performance Conditions | `custom_provisions` | `.sla_performance_conditions` | SLA |
| 19 | Term | `provisions` | `.term_length` | SOF |
| 20 | Termination Conditions | `provisions` | `.termination_period_for_convenience` (partial) | MSA |
| 21 | Usage Entitlement | `custom_provisions` | `.usage_entitlement` | SOF |

**Notes:**
- Fields 3, 4, 6–9, 11–13, 15–18, 21 require custom extraction to be configured in Navigator first (PRS-26)
- Fields 10, 12, 13, 17, 18 are table-blocked — custom extraction values will be partial (first row only) until an alternative extraction approach is resolved
- Fields not present in executed documents (Minimum Commitment #4, Price Increase Date #9, Service Activation Date #15) may need to be manually entered or left null

---

## 7. Pagination

Cursor-based. No total count returned.

```
GET /agreements?limit=25                         // first page
GET /agreements?limit=25&ctoken={token}          // subsequent pages
```

Response includes `_links.next` with the `ctoken` pre-populated. When `_links.next` is absent, you've reached the last page. For our 4-document demo, pagination is irrelevant — all results fit in one page.

---

## 8. Schema Surprises That Affect Artifact Design

1. **`price_cap_percent_increase` may cover Price Increase (%)** — this is a standard `provisions` field, meaning our field #8 might already be extractable OOTB without a custom extraction. **To verify in Phase 2 testing.**

2. **`payment_terms_due_date` is an enum, not a free-text field** — values like `THIRTY_DAYS`, `SIXTY_DAYS` are enum constants. The display layer needs to translate these to human-readable form (e.g., "Net 30").

3. **`term_length` uses ISO 8601 duration** — `P3Y` means 3 years, `P1Y` means 1 year. The display layer needs to translate these (e.g., "3 years").

4. **`renewal_notice_period` also ISO 8601** — `P30D` = 30 days. Same translation needed.

5. **No confidence scores** — we cannot show extraction confidence in the UI from the current API. The `ExtractionReview` schema (with `matched_text`, `extracted_value`, and character offsets) is defined but its endpoint is not yet public. Plan to show a "Standard" / "Custom" / "Manual" badge instead of a confidence indicator.

6. **ExtractionReview endpoint is not yet public** — verbatim source text and document location (character offsets) are not accessible via API today. The "Source Doc" column in our UI will be derived from `agreementId` correlation, not from a field-level pointer.

7. **`related_agreement_documents.parent_agreement_document_id` must be set at upload time** — if the Gigaroute/Fontara documents were uploaded without this linkage, we'll need to identify the family by party name + date range. Worth verifying in our Navigator instance.

---

## 9. Recommended Data Assembly Architecture

For the Phase 3 artifact build:

```
[Navigator API]
     |
     |-- GET /agreements (filter by party + type) → MSA record
     |-- GET /agreements (filter by parent_id) → SOF, Fee Schedule, SLA records
     |
[Data Assembly Layer]
     |
     |-- Build agreementId → document name lookup
     |-- Merge provisions + custom_provisions per agreement
     |-- Map fields to our 21-field schema
     |-- Annotate each field: { value, source_doc, field_type (standard|custom|manual) }
     |
[Dashboard UI]
     |-- Navigate by job function
     |-- Display: Term | Value | Source Document | Field Type badge
```

The data assembly layer can be a lightweight JS module (or inline in the single-file app) that runs once on load and builds the display-ready data structure.

---

*API version: 0.7.1-beta | Reference: [Navigator API docs](https://developers.docusign.com/docs/navigator-api/) | [OpenAPI spec](https://github.com/docusign/OpenAPI-Specifications)*
