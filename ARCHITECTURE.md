# AI Spend Auditor - Architecture Diagram

## Component Hierarchy

```
App (page.tsx)
├── Navigation
├── Hero
├── SupportedTools
├── HowItWorks
├── AuditForm (Main Form Component)
│   ├── Left Column (Summary)
│   │   ├── Summary Card: Total Monthly Spend
│   │   ├── Summary Card: Total Seats
│   │   ├── Summary Card: Tools Added
│   │   └── Info Box
│   └── Right Column (Form)
│       ├── Tools Section
│       │   ├── ToolEntry (Dynamic, repeating)
│       │   │   ├── Tool Dropdown
│       │   │   ├── Plan Dropdown
│       │   │   ├── Spend Input
│       │   │   ├── Seats Input
│       │   │   └── Remove Button
│       │   ├── ToolEntry (Dynamic, repeating)
│       │   ├── ToolEntry (Dynamic, repeating)
│       │   └── Add Another Tool Button
│       ├── Team Information Section
│       │   ├── Team Size Dropdown
│       │   └── Use Case Dropdown
│       └── Action Buttons
│           ├── Generate Audit Report
│           └── Reset
├── SocialProof
├── FAQ
├── CTA
└── Footer
```

## Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        User Interaction                          │
│  (Click, Type, Select, Add, Remove, Submit, Reset)              │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                    ToolEntry Component                           │
│  (Handles individual tool input)                                │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                  onUpdate() Callback                             │
│  (Passes updated tool back to parent)                           │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                   AuditForm Component                            │
│  (updateTool, addTool, removeTool handlers)                     │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                  setFormData() (React State)                     │
│  (Updates component state)                                      │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│              useEffect() Dependency Trigger                      │
│  (Watches formData changes)                                     │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│              saveAuditData(formData)                             │
│  (Calls storage utility)                                        │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│          localStorage.setItem(STORAGE_KEY, JSON)                │
│  (Persists data to browser storage)                             │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│              React Re-renders Component                          │
│  (Updates UI with new state)                                    │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                   User Sees Updates                              │
│  (Summary stats, form fields, etc.)                             │
└─────────────────────────────────────────────────────────────────┘
```

## State Management Flow

```
┌──────────────────────────────────────────────────────────────────┐
│                    AuditForm State                               │
│                                                                  │
│  formData: AuditFormData = {                                    │
│    tools: [                                                     │
│      {                                                          │
│        id: "abc123",                                            │
│        tool: "ChatGPT",                                         │
│        plan: "Pro",                                             │
│        spend: 200,                                              │
│        seats: 5                                                 │
│      },                                                         │
│      {                                                          │
│        id: "xyz789",                                            │
│        tool: "Claude",                                          │
│        plan: "Pro",                                             │
│        spend: 20,                                               │
│        seats: 1                                                 │
│      }                                                          │
│    ],                                                           │
│    teamSize: "6-20",                                            │
│    useCase: "coding"                                            │
│  }                                                              │
│                                                                  │
│  isLoaded: boolean = true                                       │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

## localStorage Schema

```
Browser localStorage
│
└── ai-spend-auditor-form (Key)
    │
    └── {
          "tools": [
            {
              "id": "abc123def456",
              "tool": "ChatGPT",
              "plan": "Pro",
              "spend": 200,
              "seats": 5
            },
            {
              "id": "xyz789uvw012",
              "tool": "Claude",
              "plan": "Pro",
              "spend": 20,
              "seats": 1
            }
          ],
          "teamSize": "6-20",
          "useCase": "coding"
        }
```

## Component Communication

```
┌─────────────────────────────────────────────────────────────────┐
│                      AuditForm                                  │
│  (Parent Component - State Owner)                               │
│                                                                  │
│  State:                                                         │
│  - formData                                                     │
│  - isLoaded                                                     │
│                                                                  │
│  Handlers:                                                      │
│  - addTool()                                                    │
│  - updateTool()                                                 │
│  - removeTool()                                                 │
│  - handleTeamSizeChange()                                       │
│  - handleUseCaseChange()                                        │
│  - handleSubmit()                                               │
│  - handleReset()                                                │
└────────────────────────┬────────────────────────────────────────┘
                         │
        ┌────────────────┼────────────────┐
        │                │                │
        ▼                ▼                ▼
    ┌────────┐      ┌────────┐      ┌────────┐
    │ToolEntry│      │ToolEntry│      │ToolEntry│
    │(Tool 1) │      │(Tool 2) │      │(Tool 3) │
    │         │      │         │      │         │
    │Props:   │      │Props:   │      │Props:   │
    │- entry  │      │- entry  │      │- entry  │
    │- onUpdate│      │- onUpdate│      │- onUpdate│
    │- onRemove│      │- onRemove│      │- onRemove│
    │- isRemovable│   │- isRemovable│   │- isRemovable│
    └────────┘      └────────┘      └────────┘
        │                │                │
        └────────────────┼────────────────┘
                         │
                         ▼
            Callbacks trigger parent handlers
            (updateTool, removeTool, etc.)
```

## File Dependencies

```
app/page.tsx
├── imports AuditForm
├── imports Hero
├── imports SupportedTools
├── imports HowItWorks
├── imports SocialProof
├── imports FAQ
├── imports CTA
└── imports Footer

components/AuditForm.tsx
├── imports ToolEntry
├── imports types from lib/types
├── imports storage from lib/storage
└── imports constants from lib/constants

components/ToolEntry.tsx
├── imports types from lib/types
└── imports constants from lib/constants

lib/storage.ts
└── imports types from lib/types

lib/types.ts
└── (no imports)

lib/constants.ts
└── (no imports)
```

## Lifecycle Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                    Component Lifecycle                          │
└─────────────────────────────────────────────────────────────────┘

1. Component Mounts
   │
   ├─ useState(DEFAULT_AUDIT_DATA)
   │  └─ formData = { tools: [], teamSize: "", useCase: "" }
   │
   └─ useEffect (empty deps)
      └─ getStoredAuditData()
         └─ setFormData(stored)
            └─ setIsLoaded(true)

2. User Interacts
   │
   ├─ Clicks "Add Tool"
   │  └─ addTool()
   │     └─ setFormData({...formData, tools: [...formData.tools, newTool]})
   │
   ├─ Enters spend value
   │  └─ updateTool()
   │     └─ setFormData({...formData, tools: [updated]})
   │
   └─ Clicks "Remove Tool"
      └─ removeTool()
         └─ setFormData({...formData, tools: [filtered]})

3. State Changes
   │
   └─ useEffect (formData, isLoaded deps)
      └─ if (isLoaded) saveAuditData(formData)
         └─ localStorage.setItem(STORAGE_KEY, JSON.stringify(formData))

4. React Re-renders
   │
   ├─ AuditForm component re-renders
   ├─ ToolEntry components re-render
   ├─ Summary statistics recalculate
   └─ UI updates with new values

5. Page Refresh
   │
   ├─ Component mounts again
   ├─ useEffect runs
   ├─ getStoredAuditData() retrieves from localStorage
   ├─ setFormData(stored)
   └─ UI renders with previous data
```

## Summary Statistics Calculation

```
┌─────────────────────────────────────────────────────────────────┐
│              Real-time Calculations                             │
└─────────────────────────────────────────────────────────────────┘

Total Monthly Spend:
  = formData.tools.reduce((sum, tool) => sum + tool.spend, 0)
  = 200 + 20 + 210 + 20 + 20
  = $470

Total Seats:
  = formData.tools.reduce((sum, tool) => sum + tool.seats, 0)
  = 5 + 1 + 10 + 3 + 2
  = 21 seats

Tools Added:
  = formData.tools.length
  = 5 tools

These are recalculated on every render.
```

## Error Handling Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    Error Handling                               │
└─────────────────────────────────────────────────────────────────┘

localStorage.getItem() fails
│
└─ try/catch in getStoredAuditData()
   └─ console.error()
      └─ return DEFAULT_AUDIT_DATA

localStorage.setItem() fails
│
└─ try/catch in saveAuditData()
   └─ console.error()
      └─ continue (data not persisted)

Server-side rendering
│
└─ typeof window === "undefined" check
   └─ return early (no localStorage access)
```

## Performance Considerations

```
┌─────────────────────────────────────────────────────────────────┐
│                    Performance                                  │
└─────────────────────────────────────────────────────────────────┘

Component Re-renders:
- AuditForm re-renders on state change
- ToolEntry components re-render when their props change
- Summary cards re-render (calculations are fast)

localStorage Operations:
- Save on every change (acceptable for this use case)
- Could be debounced if needed
- JSON.stringify/parse are fast for this data size

Optimization Opportunities:
- useMemo for summary calculations (if form grows large)
- useCallback for handlers (if many ToolEntry components)
- React.memo for ToolEntry (if many tools)
```

## Responsive Design

```
┌─────────────────────────────────────────────────────────────────┐
│                    Responsive Layout                            │
└─────────────────────────────────────────────────────────────────┘

Mobile (< 768px):
  ┌─────────────────────────────────┐
  │      Summary Cards (Stack)      │
  ├─────────────────────────────────┤
  │      Form Fields (Full Width)   │
  │      - Tool Dropdown            │
  │      - Plan Dropdown            │
  │      - Spend Input              │
  │      - Seats Input              │
  │      - Remove Button            │
  ├─────────────────────────────────┤
  │      Team Information           │
  ├─────────────────────────────────┤
  │      Action Buttons (Stack)     │
  └─────────────────────────────────┘

Desktop (≥ 768px):
  ┌──────────────────┬──────────────────────────┐
  │  Summary Cards   │   Form Fields            │
  │  (1/3 width)     │   (2/3 width)            │
  │                  │                          │
  │  - Total Spend   │   - Tool Dropdown        │
  │  - Total Seats   │   - Plan Dropdown        │
  │  - Tools Added   │   - Spend Input          │
  │  - Info Box      │   - Seats Input          │
  │                  │   - Remove Button        │
  │                  │                          │
  │                  │   - Team Information     │
  │                  │   - Action Buttons       │
  └──────────────────┴──────────────────────────┘
```

---

This architecture is designed to be:
- **Scalable:** Easy to add more tools or fields
- **Maintainable:** Clear separation of concerns
- **Performant:** Minimal re-renders, efficient state management
- **Testable:** Pure functions, clear data flow
- **Extensible:** Ready for backend integration
