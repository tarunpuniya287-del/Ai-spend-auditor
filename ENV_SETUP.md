# Environment Setup Guide

This guide explains how to configure environment variables for the AI Spend Auditor.

## Environment Variables

The application uses the following environment variables:

### Supabase Configuration

```env
# Required for backend persistence
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

**Note**: These are prefixed with `NEXT_PUBLIC_` because they're used in the browser. They are safe to expose publicly.

## Setup Instructions

### 1. Create `.env` File

In the project root (`ai-spend-auditor/`), create a `.env` file:

```bash
touch .env
```

### 2. Get Supabase Credentials

1. Go to [supabase.com](https://supabase.com) and sign in
2. Open your project dashboard
3. Go to **Settings** → **API**
4. Copy:
   - **Project URL** (under "Project URL")
   - **Anon Public Key** (under "Project API keys")

### 3. Add Credentials to `.env`

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

Replace:
- `your-project-id` with your actual Supabase project ID
- `your-anon-key-here` with your actual anonymous key

### 4. Verify Configuration

```bash
# Restart your development server
npm run dev

# Check browser console for warnings
# You should NOT see: "Supabase environment variables not configured"
```

## Environment Variable Locations

### Development
- File: `.env` (in project root)
- Loaded automatically by Next.js

### Production (Vercel)
1. Go to your Vercel project settings
2. Go to **Settings** → **Environment Variables**
3. Add both variables
4. Redeploy

### Production (Other Platforms)
Refer to your hosting platform's documentation for setting environment variables.

## Verification

### Check if Supabase is Configured

Open browser DevTools (F12) and check the console:

**✅ Configured**:
```
No warning messages about Supabase
```

**❌ Not Configured**:
```
Supabase environment variables not configured. Backend features will be limited.
```

### Test Database Connection

1. Generate an audit report
2. Open Supabase dashboard
3. Go to **Table Editor** → **audits**
4. You should see your audit record

## Troubleshooting

### "Supabase environment variables not configured"

**Problem**: You see this warning in the console.

**Solutions**:
1. Verify `.env` file exists in project root
2. Check variable names are exactly correct (case-sensitive)
3. Verify values don't have extra spaces
4. Restart development server: `npm run dev`
5. Clear browser cache and reload

### Variables Not Loading

**Problem**: Changes to `.env` don't take effect.

**Solution**:
1. Stop development server (Ctrl+C)
2. Delete `.next` folder: `rm -r .next`
3. Restart: `npm run dev`

### "Invalid Supabase URL"

**Problem**: Error about invalid Supabase URL.

**Solutions**:
1. Verify URL format: `https://your-project-id.supabase.co`
2. Check for typos in project ID
3. Verify URL is complete (includes `.supabase.co`)

### "Invalid Anonymous Key"

**Problem**: Error about invalid anonymous key.

**Solutions**:
1. Verify key is copied completely (no truncation)
2. Check for extra spaces at beginning/end
3. Verify you copied the "Anon Public Key" (not the service role key)

## Security Best Practices

### ✅ Safe to Expose
- `NEXT_PUBLIC_SUPABASE_URL` - Project URL is public
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Anonymous key has limited permissions

### ❌ Never Expose
- Service role key (keep only on server)
- Database password
- API secrets

### RLS Protection
Supabase uses Row Level Security (RLS) to protect data:
- Anonymous key can only access what RLS policies allow
- Policies are configured in `DATABASE_SCHEMA.sql`
- Current setup allows public read/write (suitable for MVP)

## Environment Variable Reference

| Variable | Type | Required | Example |
|----------|------|----------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | String | Yes | `https://abc123.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | String | Yes | `eyJhbGc...` |

## Deployment Checklist

- [ ] `.env` file created locally
- [ ] Supabase credentials added
- [ ] Development server restarted
- [ ] No warnings in console
- [ ] Audit generation tested
- [ ] Database persistence verified
- [ ] Environment variables added to production platform
- [ ] Production deployment tested

## Next Steps

1. **Set up Supabase**: Follow `SUPABASE_SETUP.md`
2. **Configure environment**: Follow this guide
3. **Test locally**: Generate an audit and verify it saves
4. **Deploy**: Push to production with environment variables set

## Support

- **Supabase Setup**: See `SUPABASE_SETUP.md`
- **Quick Start**: See `BACKEND_QUICK_START.md`
- **Supabase Docs**: https://supabase.com/docs
- **Next.js Env**: https://nextjs.org/docs/basic-features/environment-variables

---

**Ready?** Create your `.env` file and add your Supabase credentials. The app will work immediately.
