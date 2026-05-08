# Backend Setup Guide - AI Spend Auditor

## Overview

This document outlines the backend infrastructure setup for the AI Spend Auditor application. The backend uses Supabase for data persistence and is designed to be minimal and maintainable.

## Architecture

```
Frontend (Next.js)
    ↓
Audit Engine (lib/audit/)
    ↓
Supabase (PostgreSQL)
    ↓
Database Tables
```

## Supabase Setup

### 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in
3. Create a new project
4. Choose a region close to your users
5. Set a strong database password

### 2. Get Your Credentials

After creating the project:

1. Go to **Settings → API**
2. Copy:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

3. Create `.env.local` file in the project root:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 3. Create Database Tables

Run these SQL queries in the Supabase SQL Editor:

#### Audits Table

```sql
CREATE TABLE audits (
  id TEXT PRIMARY KEY,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  summary JSONB NOT NULL,
  findings_count INTEGER,
  monthly_savings DECIMAL(10, 2),
  annual_savings DECIMAL(10, 2),
  data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_audits_timestamp ON audits(timestamp DESC);
CREATE INDEX idx_audits_created_at ON audits(created_at DESC);
```

#### Leads Table

```sql
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  company TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_leads_email ON leads(email);
CREATE INDEX idx_leads_created_at ON leads(created_at DESC);
```

#### Audit Findings Table (Optional - for detailed tracking)

```sql
CREATE TABLE audit_findings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  audit_id TEXT NOT NULL REFERENCES audits(id) ON DELETE CASCADE,
  rule_id TEXT NOT NULL,
  rule_name TEXT NOT NULL,
  severity TEXT NOT NULL,
  description TEXT,
  recommendation TEXT,
  potential_savings DECIMAL(10, 2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_findings_audit_id ON audit_findings(audit_id);
CREATE INDEX idx_findings_severity ON audit_findings(severity);
```

### 4. Set Row Level Security (RLS)

For now, we'll allow public read/write (development mode). In production, implement proper authentication:

```sql
-- Enable RLS
ALTER TABLE audits ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_findings ENABLE ROW LEVEL SECURITY;

-- Allow public access (development only)
CREATE POLICY "Allow public read" ON audits FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON audits FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read" ON leads FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON leads FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read" ON audit_findings FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON audit_findings FOR INSERT WITH CHECK (true);
```

## API Integration

### Saving an Audit Report

```typescript
import { saveAuditReport } from "@/lib/supabase";

const report = generateAudit(formData);
await saveAuditReport(report);
```

### Retrieving an Audit Report

```typescript
import { getAuditReport } from "@/lib/supabase";

const report = await getAuditReport("audit-123");
```

### Saving a Lead

```typescript
import { saveLead } from "@/lib/supabase";

await saveLead("user@example.com", "John Doe", "Acme Corp");
```

## Environment Variables

### Development

Create `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### Production

Set environment variables in your deployment platform (Vercel, etc.):

1. Go to your deployment settings
2. Add the same environment variables
3. Redeploy

## Current Implementation Status

### ✅ Completed

- Pricing data layer (`lib/pricing/pricing-data.ts`)
- Audit rules engine (`lib/audit/rules.ts`)
- Savings calculation (`lib/audit/calculate-savings.ts`)
- Audit generation (`lib/audit/generate-audit.ts`)
- Supabase client setup (`lib/supabase.ts`)
- Audit results display component (`components/AuditResults.tsx`)
- Form submission with audit generation

### ⏳ Next Steps

1. **Authentication** - Add user accounts and authentication
2. **Public Audit URLs** - Generate shareable audit report links
3. **Email Notifications** - Send audit reports via email
4. **Analytics Dashboard** - Track audit trends and user behavior
5. **API Endpoints** - Create REST API for audit operations

## Testing

### Local Testing

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Fill out the audit form and click "Generate Audit Report"

4. Check Supabase dashboard to verify data is saved

### Verifying Data

1. Go to Supabase dashboard
2. Navigate to **SQL Editor**
3. Run:
   ```sql
   SELECT * FROM audits ORDER BY created_at DESC LIMIT 10;
   ```

## Troubleshooting

### "Supabase environment variables not configured"

- Check `.env.local` file exists
- Verify `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set
- Restart development server

### "Error saving audit report"

- Check Supabase project is active
- Verify RLS policies allow public insert
- Check network tab in browser DevTools for API errors

### "Connection refused"

- Verify Supabase URL is correct
- Check internet connection
- Verify Supabase project is not paused

## Security Considerations

### Current (Development)

- Public read/write access
- No authentication required
- Suitable for MVP and testing

### Production Recommendations

1. **Enable Authentication**
   - Implement user sign-up/login
   - Use Supabase Auth
   - Restrict data access to authenticated users

2. **Implement RLS Policies**
   - Users can only see their own audits
   - Leads can only be created by authorized users

3. **Rate Limiting**
   - Limit audit generation requests per user
   - Prevent abuse

4. **Data Validation**
   - Validate all inputs on backend
   - Sanitize data before storage

5. **Encryption**
   - Enable SSL/TLS
   - Encrypt sensitive data at rest

## Monitoring

### Supabase Dashboard

- **Database** - View table sizes and query performance
- **Auth** - Monitor user signups and activity
- **Logs** - Check API request logs
- **Realtime** - Monitor active connections

### Metrics to Track

- Audit reports generated per day
- Average savings detected
- Most common findings
- User engagement

## Cost Optimization

Supabase pricing (as of May 2026):

- **Free Tier**: 500MB storage, 2GB bandwidth
- **Pro Tier**: $25/month + usage

For MVP:
- Free tier should be sufficient
- Monitor usage and upgrade as needed

## Next Phase: Authentication

When ready to add authentication:

1. Enable Supabase Auth in project settings
2. Configure OAuth providers (Google, GitHub, etc.)
3. Update RLS policies to restrict data access
4. Add login/signup pages
5. Implement user sessions

## References

- [Supabase Documentation](https://supabase.com/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
