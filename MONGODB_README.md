# MongoDB Backend Integration

Complete guide to the MongoDB backend for the AI Spend Auditor.

## 🎯 Overview

The AI Spend Auditor now uses **MongoDB** for persistent audit storage instead of Supabase.

- ✅ Persistent audit storage in MongoDB
- ✅ Shareable audit links across devices
- ✅ Offline support with localStorage fallback
- ✅ No authentication required (MVP)
- ✅ Simple, flexible document storage

## 🚀 Quick Start (5 minutes)

### 1. Create MongoDB Atlas Account
- Go to [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
- Sign up for free
- Create a cluster

### 2. Get Connection String
- Click "Connect" in MongoDB Atlas
- Choose "Drivers"
- Copy the connection string
- Replace `<password>` with your password

### 3. Update `.env`
```env
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/ai-spend-auditor?retryWrites=true&w=majority
MONGODB_DB=ai-spend-auditor
```

### 4. Install Dependencies
```bash
npm install mongodb
```

### 5. Test
```bash
npm run dev
# Generate an audit
# Check MongoDB Atlas → Collections → audits
```

## 📁 What Changed

### New Files
- `lib/mongodb.ts` - MongoDB client and utilities
- `MONGODB_SETUP.md` - Detailed setup guide
- `MONGODB_QUICK_START.md` - Quick start guide

### Modified Files
- `package.json` - Added mongodb dependency
- `components/AuditForm.tsx` - Uses MongoDB
- `app/audit/[id]/page.tsx` - Fetches from MongoDB

### Removed Files
- `lib/supabase.ts` - Replaced with MongoDB
- `DATABASE_SCHEMA.sql` - Not needed for MongoDB
- `SUPABASE_SETUP.md` - Replaced with MongoDB guide

## 🏗️ Architecture

```
User Input
    ↓
Generate Audit (local)
    ↓
Save to localStorage (immediate)
    ↓
Save to MongoDB (async, non-blocking)
    ↓
Redirect to /audit/[id]
    ↓
Fetch from MongoDB (with localStorage fallback)
    ↓
Display Results
```

## 📊 Database Schema

### `audits` Collection
```javascript
{
  _id: ObjectId,
  id: String,                    // Unique audit ID
  audit_data: Object,            // Complete audit report
  created_at: Date,
  monthly_spend: Number,
  monthly_savings: Number,
  tools_count: Number,
  team_size: String,
  findings_count: Number,
  updated_at: Date
}
```

### `leads` Collection
```javascript
{
  _id: ObjectId,
  email: String,
  company: String,
  audit_id: String,
  created_at: Date,
  updated_at: Date
}
```

## 🔧 MongoDB Client (`lib/mongodb.ts`)

### Functions

**`saveAuditReportToDatabase(report)`**
- Saves audit to MongoDB
- Non-blocking
- Returns document or null

**`getAuditReportFromDatabase(reportId)`**
- Fetches audit from MongoDB
- Returns AuditReport or null

**`saveLead(email, company, auditId)`**
- Saves lead information
- Returns document or null

**`isMongoDBConfigured()`**
- Checks if MongoDB is configured
- Returns boolean

**`initializeIndexes()`**
- Creates database indexes
- Called on startup

## 🧪 Testing

### Local Testing
```bash
npm run dev
# Generate audit
# Check MongoDB Atlas
```

### Verify Connection
```bash
# Check browser console for:
# "Connected to MongoDB"
# "Audit saved to MongoDB: [id]"
```

## 🔒 Security

### Current (MVP)
- No authentication
- Public access
- Environment variables for connection string

### Future
- User authentication
- User-specific audits
- Audit sharing tokens

## 📈 Performance

### Indexes
- `id` (unique) - Fast lookups
- `created_at` (descending) - Fast sorting
- `email` - Fast searches
- `audit_id` - Fast relationships

### Caching
- Client: localStorage (instant)
- Server: MongoDB (persistent)

## 🚢 Deployment

### Environment Variables
```env
MONGODB_URI=your_connection_string
MONGODB_DB=ai-spend-auditor
```

### Vercel
1. Add environment variables in Vercel dashboard
2. Deploy
3. MongoDB will connect automatically

### Other Platforms
- Set environment variables
- Run `npm run build`
- Run `npm run start`

## 📚 Documentation

- `MONGODB_QUICK_START.md` - 5-minute setup
- `MONGODB_SETUP.md` - Detailed setup
- `ENV_SETUP.md` - Environment configuration
- `lib/mongodb.ts` - Source code

## 🆘 Troubleshooting

| Issue | Solution |
|-------|----------|
| Connection timeout | Check MongoDB Atlas IP whitelist |
| Auth failed | Verify password in connection string |
| Not saving | Check `.env` has `MONGODB_URI` |
| Not loading | Check MongoDB is running |

## 🎯 Next Steps

1. Follow `MONGODB_QUICK_START.md`
2. Test locally
3. Deploy to production
4. Monitor MongoDB usage

---

**Ready?** Start with `MONGODB_QUICK_START.md` - 5 minutes to deployment!
