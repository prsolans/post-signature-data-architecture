# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Purpose

This is a **data architecture visualization and planning repo** for post-signature agreement data extraction. The core problem: once a deal closes, critical terms are scattered across 4 related documents (MSA, SOF, Fee Schedule, SLA). This project maps which downstream job functions (Billing, Fulfillment, Renewals, etc.) need which fields, and visualizes those relationships.

The current artifact is a proof-of-concept. The next phase is wiring it to the Docusign Navigator API.

## Running the App

No build process. Open `index.html` directly in a browser:

```bash
open index.html
```

No npm, no dependencies, no server required.

## Architecture

**Single-file app:** `index.html` (1,181 lines) — all styles, data, and logic are inline.

**Data model (lines ~475–720):**
- `FUNCTIONS` array — the 9 post-signature job nodes (id, label, domain, color, fields[])
- `FIELD_DESCRIPTIONS` map — per-field, per-job context descriptions (~100 entries)
- `FIELD_INDEX` — built at runtime; maps each field name → array of job IDs that use it (drives "Also required by" display)

**Rendering flow:**
1. SVG hub-and-spoke diagram draws on load with staggered animations
2. Clicking a job node opens a right-side detail panel (shifts diagram left 190px)
3. Clicking a field within that panel opens a "cross-reference" view showing other teams needing the same field

**Visual system:**
- Color domains: Teal = Finance, Purple = Customer Ops, Orange = Revenue Protection
- CSS custom properties (~20 vars) control colors, dimensions, and animation timing
- Spoke width encodes how many fields are shared between hub and node

## Reference Documents

`documents/` contains the real executed agreement family (Gigaroute Networks / Fontara, Inc.) used to validate the field model. These are PDFs for reference only — not loaded by the app.

`POST_SIGN_EXTRACTION_BRIEF.md` contains the business requirements and defines the target end-state (Navigator API integration).

`LINEAR_TODO.md` contains the task backlog for the next phase.
