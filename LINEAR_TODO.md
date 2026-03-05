# Linear Setup — Resume Next Session

MCP is now configured globally (`~/.claude/settings.json`). Start a new Claude Code session and authenticate with Linear via OAuth when prompted, then ask Claude to create the following:

---

## Project
- **Name:** Structured Agreement Data by Job Function
- **Description:** Surface post-signature agreement data from a family of executed documents (MSA, SOF, Fee Schedule, SLA), organized by downstream job function (Rev Rec, Billing, Fulfillment, Renewal, etc.) using Docusign Navigator extractions and API.

---

## Issues

**Issue 1** — Priority: High
- **Title:** Review Navigator standard extractions
- Audit which of the ~20 required agreement terms are covered by Navigator's out-of-the-box extractions
- Map standard extractions to the post-sign jobs model (Rev Rec, Billing, Fulfillment, Renewal, etc.)
- Identify gaps that will require custom extractions

**Issue 2** — Priority: High
- **Title:** Configure custom extractions in Navigator
- Define custom extraction fields for terms not covered natively (e.g. SLA conditions, price increase %, usage entitlement, ETF schedules)
- Configure and validate against the 4-document agreement family (MSA, SOF, Fee Schedule, SLA)
- Confirm extraction accuracy across all job functions

**Issue 3** — Priority: Medium
- **Title:** Build custom interface using Navigator API
- Use Navigator API to retrieve extracted fields across the agreement family
- Organize data by job function (Rev Rec, Billing, Fulfillment, Commissions, Renewal, Obligations, Revenue Assurance)
- Present unified view: Job → Term → Value → Source Document

---

All issues assigned to me.
