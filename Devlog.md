## Day 1 — 2026-05-06

**Hours worked:** 2

**What I did:**
Initialized the project using Next.js, TypeScript, Tailwind CSS, and shadcn/ui. Created the GitHub repository, configured the initial project structure, and built the first version of the landing page for the AI Spend Auditor product. Iterated on the landing page messaging to position the product more as a financial optimization tool instead of a generic AI SaaS product. Added sections for savings visualization, supported tools, workflow explanation, FAQ, and audit form preview.

**What I learned:**
The assignment is more product and business oriented than a traditional frontend project. Positioning, messaging clarity, and believable audit value are as important as the UI itself.

**Blockers / what I'm stuck on:**
Still deciding how detailed the audit recommendation engine should be without overengineering the logic. Need to balance realistic recommendations with implementation speed.

**Plan for tomorrow:**
Start building the dynamic audit form, structure pricing data for supported AI tools, and begin implementing the rule-based audit engine.






## Day 2 — 2026-05-07

**Hours worked:** 3

**What I did:**
Continued improving the AI Spend Auditor landing page and transformed the static audit form into a more realistic interactive workflow. Implemented dynamic tool management, including the ability to add and remove AI tools from the audit form. Added live audit summary calculations for total monthly spend, total seats, and number of tools configured. Improved spacing, readability, and overall UX of the audit section to make the product feel more like a real operational audit platform instead of a static demo page.

I also added contextual “early insights” messaging to simulate lightweight audit intelligence before final report generation. Improved trust and persistence messaging by clarifying that audit data is stored locally until submission.

Additionally, I started preparing the internal architecture for the pricing engine and audit rule system that will power the recommendation logic in upcoming development phases.

**What I learned:**
I realized that making the product feel believable is not only about visual polish but also about creating responsive interactions and meaningful financial feedback. Small UX improvements like live calculations and contextual insights significantly improve perceived product intelligence.

**Blockers / what I'm stuck on:**
I still need to carefully design the audit recommendation engine so that the logic remains realistic, explainable, and maintainable without becoming overly complex.

**Plan for tomorrow:**
Start implementing the pricing data layer, audit recommendation rules, and the core audit generation logic that will produce actionable optimization suggestions and savings calculations.
