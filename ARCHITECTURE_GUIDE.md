# Architecture Guide - Multi-Page Application

## Quick Reference

### Pages

| Route | Purpose | Component | Status |
|-------|---------|-----------|--------|
| `/` | Home page with form | `app/page.tsx` | ✅ Active |
| `/audit/[id]` | Audit results dashboard | `app/audit/[id]/page.tsx` | ✅ New |

### Components

| Component | Purpose | Location | Used In |
|-----------|---------|----------|---------|
| AuditForm | Input form | `components/AuditForm.tsx` | Home page |
| AuditResults | Results display | `components/AuditResults.tsx` | Audit page |
| Navigation | Header nav | `components/Navigation.tsx` | All pages |
| Footer | Footer | `components/Footer.tsx` | All pages |

### Libraries

| Module | Purpose | Location |
|--------|---------|----------|
| generateAudit | Audit generation | `lib/audit/generate-audit.ts` |
| evaluateAllRules | Rule evaluation | `lib/audit/rules.ts` |
| calculateSavings | Savings calculation | `lib/audit/calculate-savings.ts` |
| getAuditReport | Retrieve report | `lib/storage.ts` |
| saveAuditReport | Save report | `lib/storage.ts` |

## User Journey

```
1. User visits /
   ↓
2. Sees landing page + form
   ↓
3. Fills out form
   ↓
4. Clicks "Generate Audit Report"
   ↓
5. Form validates data
   ↓
6. Audit engine processes
   ↓
7. Report saved to localStorage
   ↓
8. Redirects to /audit/[id]
   ↓
9. Results page loads report
   ↓
10. Displays professional dashboard
    ↓
11. User can:
    - Download JSON
    - Download CSV
    - Run Another Audit (→ back to /)
```

## Data Flow

### Input → Processing → Storage → Display

```
AuditForm (input)
    ↓
validateAuditData()
    ↓
generateAudit()
    ├─ evaluateAllRules()
    ├─ calculateSavings()
    ├─ generateRecommendations()
    └─ generateInsights()
    ↓
saveAuditReport() → localStorage
    ↓
router.push(/audit/[id])
    ↓
AuditPage loads
    ↓
getAuditReport(id) → localStorage
    ↓
AuditResults displays
```

## Key Functions

### Form Submission
```typescript
// In AuditForm.tsx
const handleSubmit = (e: React.FormEvent) => {
  const validation = validateAuditData(formData);
  if (!validation.valid) {
    setError(validation.errors.join(", "));
    return;
  }
  
  const report = generateAudit(formData);
  saveAuditReport(report);
  router.push(`/audit/${report.id}`);
};
```

### Results Page Loading
```typescript
// In app/audit/[id]/page.tsx
useEffect(() => {
  const storedReport = getAuditReport(auditId);
  if (storedReport) {
    setReport(storedReport);
  } else {
    setError("Audit report not found");
  }
}, [auditId]);
```

### Download Report
```typescript
// In AuditResults.tsx
const handleDownloadJSON = () => {
  const json = JSON.stringify(report, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `audit-${report.id}.json`;
  a.click();
  URL.revokeObjectURL(url);
};
```

## Storage

### localStorage Keys

```
ai-spend-auditor-form              # Current form data
ai-spend-auditor-audit-{id}        # Audit report by ID
```

### Report Structure

```typescript
interface AuditReport {
  id: string;                    // Unique ID
  timestamp: string;             // ISO 8601
  formData: AuditFormData;       // Original input
  findings: AuditFinding[];      // Triggered rules
  summary: {
    totalMonthlySpend: number;
    totalSeats: number;
    toolsAnalyzed: number;
    findingsCount: number;
    criticalCount: number;
    warningCount: number;
    infoCount: number;
  };
  savings: SavingsCalculation;   // Savings analysis
  recommendations: string[];     // Recommendations
  insights: string[];            // Insights
}
```

## Routing

### Next.js App Router

```
app/
├── page.tsx                    # / (home)
├── layout.tsx                  # Root layout
└── audit/
    └── [id]/
        └── page.tsx            # /audit/[id] (dynamic)
```

### Navigation

```typescript
// Go to audit results
router.push(`/audit/${report.id}`);

// Go back to home
router.push("/");
```

## Error Handling

### Form Validation
```typescript
const validation = validateAuditData(formData);
if (!validation.valid) {
  // validation.errors contains error messages
  setError(validation.errors.join(", "));
}
```

### Report Loading
```typescript
try {
  const report = getAuditReport(auditId);
  if (!report) {
    setError("Audit report not found");
  }
} catch (err) {
  setError("Failed to load audit report");
}
```

## Performance

### Page Load Times
- Home page: ~1-2s (initial load)
- Audit generation: <200ms
- Results page: <50ms (localStorage)
- Total flow: <250ms

### Optimization Tips
- Results page uses client-side rendering (fast)
- localStorage is synchronous (no network delay)
- Report size: ~5-10KB per audit
- No external API calls

## Browser Support

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Mobile browsers
- ⚠️ Requires localStorage support

## Development

### Add New Page
```typescript
// Create app/new-page/page.tsx
export default function NewPage() {
  return <div>New page content</div>;
}
```

### Add New Component
```typescript
// Create components/NewComponent.tsx
export default function NewComponent() {
  return <div>Component content</div>;
}
```

### Add New Route
```typescript
// Create app/path/page.tsx
// Automatically available at /path
```

### Add Dynamic Route
```typescript
// Create app/path/[param]/page.tsx
// Available at /path/value
// Access param with useParams()
```

## Testing

### Test Home Page
1. Visit `/`
2. See landing page
3. Scroll to form
4. Fill out form
5. Click "Generate Audit Report"

### Test Audit Page
1. Generate audit (redirects to `/audit/[id]`)
2. See results dashboard
3. Click download buttons
4. Click "Run Another Audit"

### Test Error Handling
1. Visit `/audit/invalid-id`
2. See error message
3. Click "Return to Home"

## Deployment

### Build
```bash
npm run build
```

### Start
```bash
npm start
```

### Environment
- No environment variables needed
- localStorage is built-in
- No backend required

## Future Enhancements

### Short Term
- [ ] Audit history page
- [ ] Compare audits
- [ ] Share audit URL

### Medium Term
- [ ] Supabase integration
- [ ] User accounts
- [ ] Email reports

### Long Term
- [ ] AI recommendations
- [ ] Scheduled audits
- [ ] Slack integration

## Troubleshooting

### Audit not found
- Check browser localStorage
- Verify audit ID in URL
- Clear browser cache and retry

### Form not submitting
- Check browser console for errors
- Verify all required fields filled
- Check localStorage quota

### Download not working
- Check browser download settings
- Verify popup blocker not active
- Try different browser

## Resources

- [Next.js App Router](https://nextjs.org/docs/app)
- [React Hooks](https://react.dev/reference/react)
- [localStorage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [TypeScript](https://www.typescriptlang.org/)

## Support

For issues or questions:
1. Check MULTI_PAGE_REFACTOR.md for detailed documentation
2. Review code comments in relevant files
3. Check browser console for error messages
4. Verify localStorage is enabled
