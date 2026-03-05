1. Start from the business question, not the field name
Anchor each custom extraction to a specific decision or recurring question (e.g., “Which MSAs have SLA credits I can claim?”, “Which contracts have payment terms > Net 45?”). 
Prefer re-using standard extractions where possible, and reserve custom extractions for truly organization‑specific data (e.g., bespoke rebates, store numbers, clinical‑trial attributes). 
2. Design a clean, future‑proof schema
Decide custom agreement types first (e.g., Master Distribution Agreement, Payment Services Agreement, Care Station Agreement), then attach custom fields to them. 
Use the supported field types text / number / date and avoid overloading one field with multiple concepts. For booleans or currency/percent, use text or number with clear definition until dropdowns arrive. 
Keep names short, stable, and business‑friendly; rename extractions instead of recreating when possible. 
3. Write strong, AI‑friendly definitions
In the definition, clearly state:
What it is (plain‑language description of the term or clause).
Where it usually appears (e.g., in pricing/fees section, SLA section).
What to include / exclude and any edge cases or synonyms. 
Avoid references to specific page numbers, formatting, or one‑off wording that won’t generalize.
4. Curate representative example documents
Use multiple, varied examples per extraction; limit has been increased to up to 10 docs, so take advantage of that to cover your main templates and edge cases. 
Include:
Agreements where the attribute is present with typical wording.
Agreements where it is present but phrased differently.
A few where it is absent, so you can see if the model over‑predicts.
Avoid feeding near‑duplicate documents; they don’t add signal.
5. Use “Test for accuracy” as a mini‑benchmark loop
In Navigator: ensure you have Navigator enabled + “manage all agreements” permission, then upload docs → go to Settings → define agreement types/fields → enable AI detection → Test for accuracy. 
Treat your test‑for‑accuracy set as a benchmark:
Review hits and misses across that set.
Refine definition and examples until results stabilize.
Only then roll out to large‑scale historical reprocessing.
6. Be deliberate about reprocessing and allowances
Custom Extractions consume a “agreements processed” allowance separate from base Navigator agreements; each agreement processed for a custom extraction (historical or new) counts once per job. 
Best practice:
Start with high‑value segments (e.g., top vendors, high ACV deals) before reprocessing your entire corpus.
Use the reprocessing/usage visibility experience and plan for the 1500‑per‑user‑per‑year baseline limits; escalate to product via Support and #help-navigator if a customer legitimately needs more. 
7. Set governance: owners, lifecycle, and support
Assign an “extraction owner” per domain (Procurement, Legal, HR) who is responsible for:
Approving changes to definitions and fields.
Maintaining the benchmark set and periodically spot‑checking results, especially after template changes. 
Avoid ripping out fields: today you can delete the extraction but not the field, so plan names and schema carefully. 
For complex 3rd‑party contracts or highly bespoke use cases, lean on Professional Services to design and validate extractions with the customer. 
8. Set expectations and avoid common pitfalls
Today, AI custom extractions in Navigator target agreement types + fields, not full clause/obligation extraction (that’s on the roadmap / handled by other features like Obligation Management). 
Accuracy will vary by customer based on their definitions and examples; we don’t publish a single accuracy % and shouldn’t commit one in SC conversations. 
