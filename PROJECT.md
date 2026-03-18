# Structured Agreement Data by Job Function — PROJECT.md

## Meta
linear_project: Post-Signature Data Architecture
staleness_days: 7

## Goal
Prove that DocuSign Navigator can surface post-signature agreement data
organized by downstream job function (Rev Rec, Billing, Fulfillment,
Renewal, etc.) using a real executed deal (Gigaroute/Fontara, Inc.).

## Current milestone
**PoC → Product input → Scope decision** — no hard date yet
- In scope: finalize PoC UI, circulate brief to DocuSign Product,
  answer build-vs-wait question on presentation layer
- Done when: product question answered and next milestone scoped

## Success metrics
- DocuSign Product has responded to the brief
- Build-vs-wait decision is documented and agreed with Craig Doud
- If build: next milestone is scoped with specific issues in Linear
- If wait: a timeline from DocuSign is in hand

## Stakeholders
- Craig Doud (VP, Value Consulting) — internal sponsor; needs a
  credible path to production use
- DocuSign Product — answer to the brief determines whether we build
  the presentation layer or wait for Agent/artifact roadmap releases

## Feature shape (per phase)
A complete phase requires:
- [ ] A Linear issue exists for this phase
- [ ] Inputs and outputs are defined in the issue description
- [ ] Blocker relationship to the next phase is set in Linear
- [ ] Acceptance criteria are specific and verifiable

Current phases (in order):
1. Audit standard extractions
2. Configure custom extractions
3. Build custom interface via Navigator API

## Current focus
PoC UI — demonstrating the target end state to support the product
conversation with DocuSign

## Open questions
- DocuSign Product response: how does the brief land? Does it surface
  gaps we haven't anticipated, or redirect the approach?
- Timeline: when will DocuSign Product respond, and does their answer
  change the scope of PRS-41?

## Decisions made
- **Build vs. wait — building.** We need to demonstrate the product
  gaps ourselves; waiting for DocuSign Agent roadmap releases doesn't
  serve that goal. PRS-41 (Navigator API integration) is the build path.

## Not doing (this milestone)
- Navigator API integration (blocked on product input)
- Multi-deal / multi-tenant support
- Auth / production deployment
