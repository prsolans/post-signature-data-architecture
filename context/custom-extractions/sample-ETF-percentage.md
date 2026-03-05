Here’s a simple, demo‑ready rule for ETF Severity % that normalizes very different ETF formulas onto a single 0–100 scale.

1. Definition
ETF Severity % =

The percentage of remaining committed revenue the customer must pay if they terminate early at a given point in the term (ignoring SLA credits, late fees, etc.). 

Think of it as:

“If they walk away today, what fraction of the remaining contract value turns into a kill fee?”

2. Normalization rules by pattern
Assume you already have:

MRC (monthly recurring charge)
Remaining Term (months) (or Term and Elapsed Term)
ETF rule text from the Early Termination Fee field we defined earlier. 
Then:

Percentage of remaining charges

ETF clause: “Customer pays 50% of the remaining Monthly Recurring Charges.”
ETF Severity % = 50
100% of remaining MRC × remaining months

ETF clause: “ETF equals 100% of the Monthly Recurring Charges multiplied by remaining months.” 
ETF Severity % = 100
Flat N months of MRC

ETF clause: “ETF equals 3 months of MRC.”
At any point in time:
ETF Severity % = min(100, N / RemainingTermMonths × 100)
Example: 3‑month ETF with 12 months left → 3/12 = 25% → ETF Severity % = 25
Flat $ amount

ETF clause: “ETF equals $25,000.”
Use current remaining committed revenue = MRC × RemainingTermMonths
ETF Severity % = min(100, ETFAmount / (MRC × RemainingTermMonths) × 100)
No ETF

Clause: “No early termination fee applies” or silence on ETF.
ETF Severity % = 0
3. How you’d talk about it in a demo
“Navigator extracts Early Termination Fees and we normalize it into ETF Severity %, so Finance can sort the portfolio from 0% (no ETF) up to 100% (pay all remaining charges) and instantly see which contracts are most punitive if a customer churns.” 
