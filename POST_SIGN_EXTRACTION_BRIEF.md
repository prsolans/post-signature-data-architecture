# Structured Agreement Data by Job Function
**Author:** Paul Solans | **Date:** March 2, 2026 | **Status:** For Review / Input Requested

---

## The Problem

Once a deal closes, critical agreement data gets buried across a family of related documents — the MSA, Service Order Form, Fee Schedule, and SLA. Downstream teams (Rev Rec, Billing, Fulfillment, Renewals, etc.) each need specific terms from these docs to do their jobs, but today there's no unified, structured view of that data. Teams hunt manually, copy values into spreadsheets, and risk working from stale or incorrect data.

---

## What We're Testing

We have a real-world agreement family (Gigaroute Networks / Fontara, Inc.) loaded into Docusign Navigator consisting of four executed documents:

| Document | Signed | Key Data It Holds |
|---|---|---|
| Master Services Agreement | May 10, 2025 | Termination conditions, price adjustment rules, payment defaults, auto-renewal |
| Service Order Form | May 22, 2025 | Products & services, pricing (MRC/NRC), quantities, payment type/terms, service locations |
| Fee Schedule & Services Exhibit | Jun 11, 2025 | ETF schedules by service type and term, professional/installation fees |
| Service Level Agreement | Jun 21, 2025 | SLA metrics by service (availability, MTTR, latency), remedy/penalty schedules |

The data points we need to surface map directly to downstream **post-signature jobs** defined in our Sales use case model. These jobs include:

**Rev Rec · Fulfillment · Commissions · Billing · Obligations · Renewal · Pricing (Rev Assurance) · Early Termination (Rev Assurance) · Minimum Commitment (Rev Assurance)**

Each job requires a specific set of agreement terms — for example:
- **Billing** needs: Products & Services, Pricing Type, MRC/NRC, Quantity, Price Increase %, Payment Type, Payment Terms, Term, ETF, Contract Date — spread across the SOF, Fee Schedule, and MSA.
- **Fulfillment** needs: Products & Services, Usage Entitlement, Shipping Date, Activation Date, SLA, SLA Conditions, Penalties — spread across the SOF and SLA.
- **Renewal** needs: Term, Auto-Renewal, Renewal Notice Period, ETF, Pricing — spread across the MSA, SOF, and Fee Schedule.

---

## The Desired End State

A unified view that lets a user see, for any agreement family:

```
Job: Billing
─────────────────────────────────────────────────────────────
Term                    │ Value                  │ Source Doc
─────────────────────────────────────────────────────────────
Products & Services     │ GigaFiber, GigaWAN...  │ Service Order Form
Pricing Type            │ MRC + NRC              │ Service Order Form
MRC                     │ $5,825/mo              │ Service Order Form
Contract Signing Date   │ May 22, 2025           │ Service Order Form
Term                    │ 3 years                │ Service Order Form
Early Termination Fee   │ MRC × Remaining Months │ Fee Schedule
Payment Type            │ ACH / EFT              │ Service Order Form
Payment Terms           │ Net 30                 │ Service Order Form
Price Increase Notice   │ 30 days written notice │ MSA
─────────────────────────────────────────────────────────────
```

This view should be navigable by Job, allowing any downstream team to instantly see the terms relevant to them, their extracted values, and exactly which document those values came from.

---

## Question for Product

We're already reasonably confident on two things: Navigator can extract the data, and the API gives us access to it. What we're less clear on is the **presentation layer** — specifically, what's on the roadmap for:

1. **Querying across documents** — can we, or will we soon be able to, ask a question that draws from multiple documents in the same agreement family and get a unified, structured response back?

2. **Artifact generation** — is there a path, in-app or via export, where we can surface this data in the shape we want? Meaning: organized by Job, with the term, its value, and the source document all visible together?

That's really the crux of it. We're not looking to reinvent extraction — we just want to know if the upcoming Agent releases are going to handle the "pull it together and present it" problem, or whether we need to build that layer ourselves.

I'm attaching the four executed documents from a real deal as reference material, along with the post-sign jobs model that defines exactly which data points matter and for whom. Happy to walk through it if helpful.

So — what does the timeline look like? And is there a beta or early access path worth pursuing?

---

## Where We Land

We're planning to use Navigator extractions (standard + custom) as the data layer and the Navigator API to access it. The remaining open question is the presentation layer — if Agent releases are going to get us cross-document querying and structured artifact output, we'll build to that. If that's further out than we need, we'll scope a lightweight custom view in the meantime and treat it as a stepping stone.

---

## Next Step

Circulate this brief → get input from Product → determine build vs. wait path → scope work accordingly.

---
*Reference docs available in the `/documents` folder of this repo.*
