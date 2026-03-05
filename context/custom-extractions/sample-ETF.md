1. Agreement type scope
Attach this field to the agreement types where ETF logic most often lives:

Master Services Agreement (MSA)
Service Order Form / Statement of Work
Fee Schedule / Pricing Exhibit
In Navigator, create/confirm these as agreement types, then link the custom field below to all three.

2. Custom field definition
Field name (customer‑friendly)

Early Termination Fee
Field type

Text (short/medium text)
Field description (what AI should capture)

The business rule or formula that describes what the customer must pay if they terminate the agreement (or a service under the agreement) before the committed term ends, excluding SLA service credits or other non‑termination penalties. This should capture the calculation rule (e.g., “MRC × remaining months” or “50% of remaining charges”), not just “ETF applies.” 

Where it usually appears

Fee Schedule or Pricing / Charges section
Termination / Early Termination / Cancellation section in the MSA or SOF 
3. Positive examples (what “good” looks like)
Store these (or similar) as example highlights during setup:

Example 1 – full MRC x remaining months

Clause text:
> “If Customer terminates any Service prior to the end of the Initial Term for any reason other than Provider’s uncured material breach, Customer shall pay an early termination fee equal to one hundred percent (100%) of the Monthly Recurring Charges for such Service multiplied by the number of months remaining in the then‑current Term.”
Desired extraction value for field:
> 100% of MRC × remaining months for the terminated service(s)
Example 2 – 50% ETF for longer term

Clause text:
> “For Services with an initial term of three (3) years, the early termination fee shall equal fifty percent (50%) of the remaining Monthly Recurring Charges for the GigaFiber Core and GigaWAN Express services only.”
Desired extraction value:
> 50% of remaining MRC (3‑year term; limited to specified services)
Example 3 – flat fee per remaining year

Clause text:
> “Customer may terminate this Agreement for convenience upon sixty (60) days’ prior written notice; provided that Customer pays an early termination charge equal to $25,000 for each full year remaining in the Term as of the effective date of termination.”
Desired extraction value:
> $25,000 × remaining full years of term
4. Exclusions and edge cases (to bake into the definition)
When you write the definition in Navigator, make these rules explicit:

Include
Charges that are expressly tied to early termination / cancellation of the agreement or services before the term end.
Formulas that reference remaining months / remaining MRC / remaining commitment.
Exclude
SLA service credits or uptime penalties (they are remedies, not ETFs). 
Late payment fees and interest.
One‑time installation/activation fees unless they are explicitly labeled as part of the early termination charge.
If ETF is expressly disclaimed (e.g., “no early termination fees apply”), set the field to:
No early termination fee
If no ETF language exists at all, leave the field blank (do not infer).
5. Test‑for‑accuracy “mini benchmark”
Before reprocessing at scale, build a small benchmark set:

8–10 agreements across:
3–4 with classic ETFs (MRC × remaining months).
2–3 with no ETF but strong SLA penalty language (to test false positives).
2–3 with ETF split across documents (e.g., rule in MSA, details in Fee Schedule). 
Run Test for accuracy in Navigator against this set, refine:
The definition (tighten include/exclude rules).
The examples (swap out if they’re too narrow)
…until recall/precision looks acceptable on that benchmark, then reprocess the broader corpus.
