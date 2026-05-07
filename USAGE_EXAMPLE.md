# AI Spend Auditor - Usage Example

## User Journey

### Step 1: User Lands on Page

User visits the landing page and scrolls to the "Audit Form" section.

### Step 2: Add First Tool

1. Clicks "Add Another Tool" button
2. Form shows empty tool entry
3. Selects "ChatGPT" from tool dropdown
4. Plan dropdown becomes enabled and shows ChatGPT plans
5. Selects "Pro" plan ($200/mo)
6. Enters monthly spend: `200`
7. Enters seats: `5`

**Form State After Step 2:**
```json
{
  "tools": [
    {
      "id": "abc123def456",
      "tool": "ChatGPT",
      "plan": "Pro",
      "spend": 200,
      "seats": 5
    }
  ],
  "teamSize": "",
  "useCase": ""
}
```

**Summary Updates:**
- Total Monthly Spend: $200.00
- Total Seats: 5
- Tools Added: 1

### Step 3: Add Second Tool

1. Clicks "Add Another Tool" again
2. Selects "Claude" from tool dropdown
3. Selects "Pro" plan ($20/mo)
4. Enters monthly spend: `20`
5. Enters seats: `1`

**Form State After Step 3:**
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
  "teamSize": "",
  "useCase": ""
}
```

**Summary Updates:**
- Total Monthly Spend: $220.00
- Total Seats: 6
- Tools Added: 2

### Step 4: Add Third Tool

1. Clicks "Add Another Tool" again
2. Selects "GitHub Copilot" from tool dropdown
3. Selects "Business" plan ($21/user/mo)
4. Enters monthly spend: `210` (10 users × $21)
5. Enters seats: `10`

**Form State After Step 4:**
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
    },
    {
      "id": "def456ghi789",
      "tool": "GitHub Copilot",
      "plan": "Business",
      "spend": 210,
      "seats": 10
    }
  ],
  "teamSize": "",
  "useCase": ""
}
```

**Summary Updates:**
- Total Monthly Spend: $430.00
- Total Seats: 16
- Tools Added: 3

### Step 5: Fill Team Information

1. Selects "6-20 people" from Team Size dropdown
2. Selects "Development & Coding" from Primary Use Case dropdown

**Form State After Step 5:**
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
    },
    {
      "id": "def456ghi789",
      "tool": "GitHub Copilot",
      "plan": "Business",
      "spend": 210,
      "seats": 10
    }
  ],
  "teamSize": "6-20",
  "useCase": "coding"
}
```

### Step 6: Edit a Tool

User realizes they entered wrong spend for ChatGPT. They:

1. Click on the ChatGPT spend field
2. Clear it and enter `250`
3. Field updates automatically

**Form State After Step 6:**
```json
{
  "tools": [
    {
      "id": "abc123def456",
      "tool": "ChatGPT",
      "plan": "Pro",
      "spend": 250,  // Updated
      "seats": 5
    },
    // ... other tools
  ],
  "teamSize": "6-20",
  "useCase": "coding"
}
```

**Summary Updates:**
- Total Monthly Spend: $480.00 (updated)

### Step 7: Remove a Tool

User decides they don't use Claude anymore. They:

1. Click "Remove Tool" button on Claude entry
2. Claude entry is removed from form

**Form State After Step 7:**
```json
{
  "tools": [
    {
      "id": "abc123def456",
      "tool": "ChatGPT",
      "plan": "Pro",
      "spend": 250,
      "seats": 5
    },
    {
      "id": "def456ghi789",
      "tool": "GitHub Copilot",
      "plan": "Business",
      "spend": 210,
      "seats": 10
    }
  ],
  "teamSize": "6-20",
  "useCase": "coding"
}
```

**Summary Updates:**
- Total Monthly Spend: $460.00
- Total Seats: 15
- Tools Added: 2

### Step 8: Page Refresh

User refreshes the page (Ctrl+R or Cmd+R).

**What Happens:**
1. Page loads
2. AuditForm component mounts
3. `useEffect` runs and loads data from localStorage
4. Form is populated with all previous data
5. Summary statistics are recalculated
6. User sees their form exactly as they left it

**Form State After Refresh:**
```json
{
  "tools": [
    {
      "id": "abc123def456",
      "tool": "ChatGPT",
      "plan": "Pro",
      "spend": 250,
      "seats": 5
    },
    {
      "id": "def456ghi789",
      "tool": "GitHub Copilot",
      "plan": "Business",
      "spend": 210,
      "seats": 10
    }
  ],
  "teamSize": "6-20",
  "useCase": "coding"
}
```

### Step 9: Submit Form

User clicks "Generate Audit Report" button.

**What Happens:**
1. Form submission handler is called
2. Form data is logged to console (for now)
3. Ready to send to backend API (future)

**Console Output:**
```javascript
Form submitted: {
  tools: [
    { id: "abc123def456", tool: "ChatGPT", plan: "Pro", spend: 250, seats: 5 },
    { id: "def456ghi789", tool: "GitHub Copilot", plan: "Business", spend: 210, seats: 10 }
  ],
  teamSize: "6-20",
  useCase: "coding"
}
```

### Step 10: Reset Form

User clicks the refresh icon button to start over.

**What Happens:**
1. Form is cleared
2. All tools are removed
3. Team size and use case are reset
4. localStorage is cleared
5. Summary shows 0 for all values
6. Empty state message appears

**Form State After Reset:**
```json
{
  "tools": [],
  "teamSize": "",
  "useCase": ""
}
```

## localStorage Inspection

To see the saved data in browser DevTools:

1. Open DevTools (F12 or Cmd+Option+I)
2. Go to "Application" tab
3. Click "Local Storage" in left sidebar
4. Find your domain
5. Look for key: `ai-spend-auditor-form`
6. Value shows the JSON data

**Example localStorage Entry:**
```
Key: ai-spend-auditor-form
Value: {"tools":[{"id":"abc123def456","tool":"ChatGPT","plan":"Pro","spend":250,"seats":5},{"id":"def456ghi789","tool":"GitHub Copilot","plan":"Business","spend":210,"seats":10}],"teamSize":"6-20","useCase":"coding"}
```

## Supported Tools & Plans

### ChatGPT
- Free
- Plus ($20/mo)
- Pro ($200/mo)
- Enterprise

### Claude
- Free
- Pro ($20/mo)
- Team ($30/user/mo)
- Enterprise

### Cursor
- Free
- Pro ($20/mo)
- Business ($120/mo)

### GitHub Copilot
- Free
- Individual ($10/mo)
- Business ($21/user/mo)
- Enterprise

### Gemini
- Free
- Pro ($20/mo)
- Team ($30/user/mo)

### Midjourney
- Free
- Basic ($10/mo)
- Standard ($30/mo)
- Pro ($60/mo)

### Perplexity
- Free
- Pro ($20/mo)

### Other
- Free
- Paid (Custom)

## Team Size Options
- 1-5 people
- 6-20 people
- 21-50 people
- 51-100 people
- 100+ people

## Use Case Options
- Development & Coding
- Content & Writing
- Research & Analysis
- Data & Analytics
- Mixed Usage

## Real-World Scenario

**Company:** TechStartup Inc.
**Team Size:** 12 people
**Current AI Stack:**

| Tool | Plan | Monthly Spend | Seats |
|------|------|---------------|-------|
| ChatGPT | Pro | $200 | 5 |
| Claude | Pro | $20 | 1 |
| GitHub Copilot | Business | $210 | 10 |
| Cursor | Pro | $20 | 3 |
| Gemini | Pro | $20 | 2 |

**Total Monthly Spend:** $470
**Total Seats:** 21 (Note: Some overlap - 12 team members using multiple tools)

**Form Submission Data:**
```json
{
  "tools": [
    { "id": "1", "tool": "ChatGPT", "plan": "Pro", "spend": 200, "seats": 5 },
    { "id": "2", "tool": "Claude", "plan": "Pro", "spend": 20, "seats": 1 },
    { "id": "3", "tool": "GitHub Copilot", "plan": "Business", "spend": 210, "seats": 10 },
    { "id": "4", "tool": "Cursor", "plan": "Pro", "spend": 20, "seats": 3 },
    { "id": "5", "tool": "Gemini", "plan": "Pro", "spend": 20, "seats": 2 }
  ],
  "teamSize": "6-20",
  "useCase": "coding"
}
```

**Expected Audit Recommendations (Future):**
- Consolidate ChatGPT and Claude into single tool
- Reduce GitHub Copilot seats (only 10 active users)
- Potential savings: ~$150-200/month (32-43% reduction)
