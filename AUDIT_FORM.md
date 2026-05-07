# AI Spend Auditor - Interactive Audit Form

## Overview

The interactive audit form is the core user-facing feature of the AI Spend Auditor product. It allows users to input their AI tool usage, spending, and team information to generate personalized audit recommendations.

## Architecture

### State Management

The form uses React's `useState` hook with a clean, maintainable data structure:

```typescript
interface AuditFormData {
  tools: ToolEntry[];
  teamSize: string;
  useCase: string;
}

interface ToolEntry {
  id: string;
  tool: string;
  plan: string;
  spend: number;
  seats: number;
}
```

### Data Persistence

Form data is automatically persisted to localStorage using custom hooks:

- **`getStoredAuditData()`** - Retrieves saved form data on page load
- **`saveAuditData(data)`** - Saves form data to localStorage
- **`clearAuditData()`** - Clears all saved data

**Key Features:**
- Data is saved automatically on every change
- Data persists across page refreshes
- Safe server-side rendering (checks for `window` object)
- Error handling for localStorage failures

## Components

### `AuditForm` (Main Component)

**Location:** `components/AuditForm.tsx`

**Responsibilities:**
- Manages overall form state
- Handles tool addition/removal
- Manages global fields (team size, use case)
- Displays summary statistics
- Handles form submission and reset

**Key Features:**
- Loads data from localStorage on mount
- Auto-saves to localStorage on every change
- Displays real-time totals (monthly spend, seats, tool count)
- Responsive grid layout (1 col mobile, 3 col desktop)
- Empty state when no tools added

**State Updates:**
```typescript
// Add tool
const addTool = () => {
  const newTool: ToolEntryType = {
    id: generateId(),
    tool: "",
    plan: "",
    spend: 0,
    seats: 1,
  };
  setFormData({
    ...formData,
    tools: [...formData.tools, newTool],
  });
};

// Update tool
const updateTool = (updatedTool: ToolEntryType) => {
  setFormData({
    ...formData,
    tools: formData.tools.map((tool) =>
      tool.id === updatedTool.id ? updatedTool : tool
    ),
  });
};

// Remove tool
const removeTool = (toolId: string) => {
  setFormData({
    ...formData,
    tools: formData.tools.filter((tool) => tool.id !== toolId),
  });
};
```

### `ToolEntry` (Sub-Component)

**Location:** `components/ToolEntry.tsx`

**Responsibilities:**
- Renders individual tool entry row
- Handles tool selection
- Handles plan selection (dynamic based on tool)
- Handles spend and seats input
- Provides remove button

**Features:**
- Dynamic plan dropdown based on selected tool
- Disabled plan dropdown until tool is selected
- Numeric input validation for spend and seats
- Remove button only shows when multiple tools exist
- Responsive grid layout

**Props:**
```typescript
interface ToolEntryProps {
  entry: ToolEntryType;
  onUpdate: (entry: ToolEntryType) => void;
  onRemove: () => void;
  isRemovable: boolean;
}
```

## Data Flow

```
User Input
    ↓
ToolEntry Component
    ↓
onUpdate() callback
    ↓
AuditForm updateTool()
    ↓
setFormData() (React state)
    ↓
useEffect() triggers
    ↓
saveAuditData() (localStorage)
    ↓
UI re-renders with new data
```

## Constants

**Location:** `lib/constants.ts`

Defines all available options:

- **AI_TOOLS** - List of supported AI tools
- **PLANS** - Plans for each tool (tool-specific)
- **TEAM_SIZES** - Team size options
- **USE_CASES** - Primary use case options

Example:
```typescript
export const PLANS = {
  ChatGPT: [
    { value: "Free", label: "Free" },
    { value: "Plus", label: "Plus ($20/mo)" },
    { value: "Pro", label: "Pro ($200/mo)" },
    { value: "Enterprise", label: "Enterprise" },
  ],
  // ... more tools
};
```

## localStorage Schema

Data is stored under the key `ai-spend-auditor-form`:

```json
{
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

## UI Layout

### Desktop (lg breakpoint)
- 3-column grid
- Left column: Summary cards (1/3 width)
- Right column: Form fields (2/3 width)

### Mobile
- Single column
- Full-width form
- Summary cards stack vertically

### Summary Cards
- Total Monthly Spend
- Total Seats
- Tools Added Count

### Form Sections
1. **Your AI Tools** - Dynamic tool entries
2. **Team Information** - Team size and use case dropdowns
3. **Action Buttons** - Submit and Reset

## Styling

Uses the design system from `globals.css`:

- **Colors:** Primary blue (#004ac6), surface colors, semantic colors
- **Typography:** Inter font with custom sizes (h1, h3, body-base, body-sm, label-caps)
- **Spacing:** 8px base grid (xs, sm, md, lg, xl, 2xl, 3xl, gutter)
- **Borders:** Subtle outline-variant colors
- **Shadows:** Minimal, used for depth

## Form Validation

Currently minimal validation:
- Tool and plan must be selected
- Spend must be a valid number (≥ 0)
- Seats must be a valid number (≥ 1)

**Future Enhancement:** Add comprehensive validation with error messages.

## Form Submission

Currently logs to console:
```typescript
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  console.log("Form submitted:", formData);
  // TODO: Send to backend for audit generation
};
```

**Next Steps:**
- Add form validation
- Send data to backend API
- Display loading state
- Show audit results

## Reset Functionality

Clears all form data and resets to default state:
```typescript
const handleReset = () => {
  setFormData(DEFAULT_AUDIT_DATA);
};
```

This also clears localStorage.

## ID Generation

Uses a simple random ID generator (no external dependencies):
```typescript
function generateId(): string {
  return Math.random().toString(36).substring(2, 11);
}
```

**Note:** For production, consider using a more robust UUID library.

## Performance Considerations

- **Memoization:** Consider using `useMemo` for calculated totals if form grows
- **Debouncing:** localStorage saves on every change (acceptable for this use case)
- **Re-renders:** Each tool entry is a separate component to minimize re-renders

## Accessibility

- Proper `<label>` elements for all inputs
- Semantic HTML (`<form>`, `<select>`, `<input>`)
- Focus states on interactive elements
- Clear error messages (future enhancement)
- Keyboard navigation support

## Browser Support

- localStorage support required
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Testing Checklist

- [ ] Add tool and verify it appears in list
- [ ] Remove tool and verify it's deleted
- [ ] Change tool and verify plan dropdown updates
- [ ] Enter spend and seats, verify totals update
- [ ] Refresh page and verify data persists
- [ ] Clear localStorage and verify form resets
- [ ] Test on mobile and desktop
- [ ] Test keyboard navigation
- [ ] Test with multiple tools

## Future Enhancements

1. **Form Validation**
   - Required field validation
   - Error messages
   - Visual error states

2. **Audit Engine**
   - Rule-based recommendations
   - Cost optimization suggestions
   - Savings calculations

3. **Report Generation**
   - PDF export
   - Shareable links
   - Email reports

4. **Advanced Features**
   - Historical data tracking
   - Comparison with industry benchmarks
   - Team member breakdown
   - Usage analytics

5. **Backend Integration**
   - API endpoint for audit submission
   - Database storage
   - User authentication
   - Report generation service
