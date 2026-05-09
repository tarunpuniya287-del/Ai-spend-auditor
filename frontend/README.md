# AI Spend Auditor - Frontend

Next.js frontend application for the AI Spend Auditor SaaS platform.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Frontend runs on `http://localhost:3000`

### Production Build

```bash
npm run build
npm start
```

## 📁 Project Structure

```
frontend/
├── app/                         # Next.js app directory
│   ├── audit/[id]/page.tsx     # Dynamic audit results page
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Home page
│   └── globals.css             # Global styles
├── components/                  # React components
│   ├── AuditForm.tsx           # Main audit form
│   ├── AuditResults.tsx        # Results display
│   ├── AuditResultsDashboard.tsx
│   ├── Hero.tsx                # Landing page hero
│   ├── Navigation.tsx          # Navigation bar
│   ├── FAQ.tsx                 # FAQ section
│   ├── Footer.tsx              # Footer
│   └── ...
├── hooks/                       # Custom React hooks
│   └── useAuditForm.ts         # Form state management
├── lib/                         # Utility functions
│   ├── audit/
│   │   ├── generate-audit.ts   # Audit generation logic
│   │   ├── calculate-savings.ts
│   │   └── rules.ts            # Audit rules
│   ├── pricing/
│   │   └── pricing-data.ts     # Tool pricing data
│   ├── constants.ts            # App constants
│   ├── recommendations.ts      # Recommendation logic
│   ├── types.ts                # TypeScript types
│   └── storage.ts              # localStorage utilities
├── public/                      # Static assets
├── .env                         # Environment variables
├── package.json                 # Dependencies
├── tsconfig.json               # TypeScript config
├── next.config.ts              # Next.js config
└── README.md                   # This file
```

## 🔌 API Integration

Frontend calls backend API at `http://localhost:3001`:

### Save Audit

```typescript
const response = await fetch('http://localhost:3001/api/audits', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    auditData: audit.auditData,
    findings: audit.findings,
    recommendations: audit.recommendations,
    summary: audit.summary
  })
});

const { data } = await response.json();
const auditId = data.id;
```

### Fetch Audit

```typescript
const response = await fetch(`http://localhost:3001/api/audits/${id}`);
const { data: audit } = await response.json();
```

### Save Lead

```typescript
const response = await fetch('http://localhost:3001/api/leads', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'user@example.com',
    company: 'Acme Corp',
    auditId: auditId
  })
});
```

## 🛠️ Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Run tests
npm test
```

## 📦 Dependencies

- **Next.js** - React framework
- **React** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling (if configured)

## 🌍 Environment Variables

```env
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:3001

# MongoDB (for direct access if needed)
MONGODB_URI=mongodb://localhost:27017
MONGODB_DB=ai-spend-auditor
```

## 📄 Key Components

### AuditForm.tsx
Main form for collecting audit data:
- Tool selection
- Plan selection
- Monthly spend input
- Team size selection
- Use case selection

### AuditResults.tsx
Displays audit results:
- Per-tool breakdown
- Total savings
- Recommendations
- Lead capture form

### AuditResultsDashboard.tsx
Dashboard view of audit results with charts and metrics.

## 🧪 Testing

```bash
npm test
```

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🔐 Security

- ✅ No secrets in frontend code
- ✅ API calls to backend for sensitive operations
- ✅ Input validation on forms
- ✅ CORS configured on backend

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID {PID} /F

# macOS/Linux
lsof -i :3000
kill -9 {PID}
```

### Backend Connection Error

- Ensure backend is running on `http://localhost:3001`
- Check `NEXT_PUBLIC_API_URL` in `.env`
- Verify CORS is configured on backend

### Build Errors

```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

---

**Status**: Frontend ready for development and integration with backend API.
