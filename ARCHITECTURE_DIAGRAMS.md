# Architecture Diagrams

## Application Structure

```
┌─────────────────────────────────────────────────────────────┐
│                    AI Spend Auditor                         │
│                   Multi-Page Application                    │
└─────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│                      Home Page (/)                           │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ Navigation                                             │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ Hero Section                                           │ │
│  │ - Headline                                             │ │
│  │ - CTA                                                  │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ Supported Tools                                        │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ How It Works                                           │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ Audit Form (INPUT ONLY)                                │ │
│  │ ┌──────────────────────────────────────────────────┐  │ │
│  │ │ Left Column: Summary                             │  │ │
│  │ │ - Total Monthly Spend                            │  │ │
│  │ │ - Total Seats                                    │  │ │
│  │ │ - Tools Added                                    │  │ │
│  │ │ - Early Insights                                 │  │ │
│  │ └──────────────────────────────────────────────────┘  │ │
│  │ ┌──────────────────────────────────────────────────┐  │ │
│  │ │ Right Column: Form                               │  │ │
│  │ │ - Add Tools                                      │  │ │
│  │ │ - Team Size                                      │  │ │
│  │ │ - Use Case                                       │  │ │
│  │ │ - [Generate Audit Report] Button                │  │ │
│  │ └──────────────────────────────────────────────────┘  │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ Social Proof                                           │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ FAQ                                                    │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ CTA                                                    │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ Footer                                                 │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
└──────────────────────────────────────────────────────────────┘
                              │
                              │ [Generate Audit Report]
                              │
                              ▼
┌──────────────────────────────────────────────────────────────┐
│              Audit Results Page (/audit/[id])                │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ Navigation                                             │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ Report Header                                          │ │
│  │ - Title: "AI Spend Audit Report"                       │ │
│  │ - Timestamp                                            │ │
│  │ - Report ID                                            │ │
│  │ - Status: Complete                                     │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ Summary Cards (4 columns)                              │ │
│  │ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐  │ │
│  │ │ Current  │ │ Monthly  │ │ Savings  │ │Optimized │  │ │
│  │ │ Spend    │ │ Savings  │ │ %        │ │ Spend    │  │ │
│  │ │ $145.00  │ │ $70.00   │ │ 48.3%    │ │ $75.00   │  │ │
│  │ └──────────┘ └──────────┘ └──────────┘ └──────────┘  │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ Audit Findings                                         │ │
│  │ ┌──────────────────────────────────────────────────┐  │ │
│  │ │ ⚠️  Overlapping Subscriptions (Warning)          │  │ │
│  │ │ Multiple tools with similar functionality        │  │ │
│  │ │ 💡 Consider consolidating duplicate tools       │  │ │
│  │ │ Potential Savings: $20.00/mo                     │  │ │
│  │ └──────────────────────────────────────────────────┘  │ │
│  │ ┌──────────────────────────────────────────────────┐  │ │
│  │ │ ⚠️  Redundant Seat Allocation (Warning)          │  │ │
│  │ │ Seat count exceeds team size                     │  │ │
│  │ │ 💡 Review seat allocation - unused licenses      │  │ │
│  │ │ Potential Savings: $50.00/mo                     │  │ │
│  │ └──────────────────────────────────────────────────┘  │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ Top Recommendations                                    │ │
│  │ 1. Consider consolidating duplicate tools...           │ │
│  │ 2. Review seat allocation - you may have...            │ │
│  │ 3. Your team size may not require this many...         │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ Key Insights                                           │ │
│  │ 💡 Your team is spending $145.00/month...              │ │
│  │ 💡 Your team has a balanced set of 3 AI tools...       │ │
│  │ 💡 You have 15 seats allocated for a 1-5 team...       │ │
│  │ 💡 Potential savings of $70.00/month (48.3%)...        │ │
│  │ 💡 Your development team has GitHub Copilot...         │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ Statistics (3 columns)                                 │ │
│  │ ┌──────────┐ ┌──────────┐ ┌──────────┐                │ │
│  │ │ Tools    │ │ Seats    │ │ Critical │                │ │
│  │ │ Analyzed │ │ Total    │ │ Issues   │                │ │
│  │ │ 3        │ │ 15       │ │ 0        │                │ │
│  │ └──────────┘ └──────────┘ └──────────┘                │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ Action Buttons                                         │ │
│  │ [Run Another Audit] [Download JSON] [Download CSV]    │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ Footer                                                 │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
└──────────────────────────────────────────────────────────────┘
                              │
                              │ [Run Another Audit]
                              │
                              ▼
                         Back to Home (/)
```

## Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                      User Input                             │
│                   (AuditForm.tsx)                           │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   Form Validation                           │
│              (validateAuditData)                            │
│                                                             │
│  ✓ At least one tool                                        │
│  ✓ Tool name, plan, spend, seats                            │
│  ✓ Team size selected                                       │
│  ✓ Use case selected                                        │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                  Audit Generation                           │
│               (generateAudit)                               │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 1. Evaluate Rules                                   │   │
│  │    (evaluateAllRules)                               │   │
│  │    - Overlapping subscriptions                      │   │
│  │    - Enterprise oversizing                          │   │
│  │    - Redundant seats                                │   │
│  │    - High single tool spend                         │   │
│  │    - Mixed usage limited tools                      │   │
│  │    - Development without Copilot                    │   │
│  │    - Free tier underutilization                     │   │
│  └─────────────────────────────────────────────────────┘   │
│                              │                              │
│                              ▼                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 2. Calculate Savings                                │   │
│  │    (calculateSavings)                               │   │
│  │    - Current spend                                  │   │
│  │    - Optimized spend                                │   │
│  │    - Monthly savings                                │   │
│  │    - Annual savings                                 │   │
│  │    - Savings percentage                             │   │
│  │    - Breakdown by category                          │   │
│  └─────────────────────────────────────────────────────┘   │
│                              │                              │
│                              ▼                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 3. Generate Recommendations                         │   │
│  │    (generateRecommendations)                        │   │
│  │    - Sort by severity                               │   │
│  │    - Sort by savings                                │   │
│  │    - Top 5 from findings                            │   │
│  │    - General recommendations                        │   │
│  └─────────────────────────────────────────────────────┘   │
│                              │                              │
│                              ▼                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 4. Generate Insights                                │   │
│  │    (generateInsights)                               │   │
│  │    - Overall spend analysis                         │   │
│  │    - Tool diversity assessment                      │   │
│  │    - Seat efficiency analysis                       │   │
│  │    - Savings potential summary                      │   │
│  │    - Use case alignment                             │   │
│  │    - Critical issues count                          │   │
│  └─────────────────────────────────────────────────────┘   │
│                              │                              │
│                              ▼                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 5. Create Report                                    │   │
│  │    - Generate unique ID                             │   │
│  │    - Add timestamp                                  │   │
│  │    - Compile all data                               │   │
│  │    - Return AuditReport                             │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                  Save to localStorage                       │
│              (saveAuditReport)                              │
│                                                             │
│  Key: ai-spend-auditor-audit-{report.id}                    │
│  Value: JSON stringified report                             │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                  Redirect to Results                        │
│              router.push(/audit/[id])                       │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│              Load Results Page                              │
│           (app/audit/[id]/page.tsx)                         │
│                                                             │
│  1. Get audit ID from URL params                            │
│  2. Load report from localStorage                           │
│  3. Handle loading state                                    │
│  4. Handle error state                                      │
│  5. Display AuditResults component                          │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│              Display Results                                │
│           (AuditResults.tsx)                                │
│                                                             │
│  - Report header                                            │
│  - Summary cards                                            │
│  - Findings list                                            │
│  - Recommendations                                          │
│  - Insights                                                 │
│  - Statistics                                               │
│  - Download options                                         │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                  User Actions                               │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Download JSON                                        │  │
│  │ → Save full report as JSON file                      │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Download CSV                                         │  │
│  │ → Save report as CSV for spreadsheet                 │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Run Another Audit                                    │  │
│  │ → Redirect to home page (/)                          │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## Component Hierarchy

```
App
├── page.tsx (Home)
│   ├── Navigation
│   ├── Hero
│   ├── SupportedTools
│   ├── HowItWorks
│   ├── AuditForm
│   │   ├── ToolEntry (multiple)
│   │   └── RecommendationHint (multiple)
│   ├── SocialProof
│   ├── FAQ
│   ├── CTA
│   └── Footer
│
└── audit/[id]/page.tsx (Results)
    ├── Navigation
    ├── AuditResults
    │   ├── Report Header
    │   ├── Summary Cards
    │   ├── Findings List
    │   ├── Recommendations
    │   ├── Insights
    │   ├── Statistics
    │   └── Action Buttons
    └── Footer
```

## Storage Structure

```
Browser localStorage
│
├── ai-spend-auditor-form
│   └── {
│       "tools": [...],
│       "teamSize": "1-5",
│       "useCase": "coding"
│     }
│
├── ai-spend-auditor-audit-{id1}
│   └── {
│       "id": "audit-1715000000000-abc123",
│       "timestamp": "2026-05-08T10:30:00Z",
│       "formData": {...},
│       "findings": [...],
│       "summary": {...},
│       "savings": {...},
│       "recommendations": [...],
│       "insights": [...]
│     }
│
├── ai-spend-auditor-audit-{id2}
│   └── {...}
│
└── ai-spend-auditor-audit-{idN}
    └── {...}
```

## Routing Map

```
/                          Home Page
├── GET                     Load home page
├── POST (form)             Generate audit
│   └── Redirect to /audit/[id]
│
/audit/[id]               Audit Results Page
├── GET                     Load results page
├── Load from localStorage   Retrieve report
├── Display                  Show results
└── Actions
    ├── Download JSON
    ├── Download CSV
    └── Run Another Audit → /
```

## Error Handling Flow

```
User Action
    │
    ├─ Form Validation Error
    │  └─ Show error message on form
    │     └─ User can fix and retry
    │
    ├─ Audit Generation Error
    │  └─ Show error message on form
    │     └─ User can retry
    │
    ├─ Redirect Error
    │  └─ Show error page
    │     └─ User can return to home
    │
    └─ Results Page Error
       ├─ Missing audit ID
       │  └─ Show error page
       │
       ├─ Report not found
       │  └─ Show error page
       │
       └─ localStorage error
          └─ Show error page
             └─ User can return to home
```

## Performance Timeline

```
User Action Timeline
│
├─ 0ms: User clicks "Generate Audit Report"
│
├─ 0-10ms: Form validation
│
├─ 10-110ms: Audit generation
│  ├─ 10-50ms: Rule evaluation
│  ├─ 50-70ms: Savings calculation
│  ├─ 70-100ms: Recommendations & insights
│  └─ 100-110ms: Report creation
│
├─ 110-120ms: Save to localStorage
│
├─ 120-130ms: Redirect to /audit/[id]
│
├─ 130-180ms: Page load
│
├─ 180-230ms: Load report from localStorage
│
└─ 230-250ms: Display results
   └─ Total: ~250ms
```

## Browser Compatibility Matrix

```
Browser          Version    Status
─────────────────────────────────────
Chrome           90+        ✅ Full
Edge             90+        ✅ Full
Firefox          88+        ✅ Full
Safari           14+        ✅ Full
Mobile Chrome    90+        ✅ Full
Mobile Safari    14+        ✅ Full
─────────────────────────────────────
Requirements:
- localStorage support
- ES6+ JavaScript
- CSS Grid/Flexbox
```

## Future Architecture

```
Current (MVP)
/
/audit/[id]

Phase 1 (History)
/
/audit/[id]
/audit/history

Phase 2 (Persistence)
/
/audit/[id]
/audit/history
/audit/[id]/share

Phase 3 (Advanced)
/
/audit/[id]
/audit/history
/audit/[id]/share
/audit/compare
/settings
```
