# 🚀 MongoDB Backend - Start Here

You've switched from Supabase to MongoDB. Here's everything you need to know.

## ⚡ 5-Minute Setup

### 1️⃣ Create MongoDB Account (2 min)
```
Go to: https://mongodb.com/cloud/atlas
Sign up → Create cluster → Wait 2-3 minutes
```

### 2️⃣ Get Connection String (1 min)
```
Click "Connect" → "Drivers" → Copy connection string
Replace <password> with your password
```

### 3️⃣ Update `.env` (1 min)
```env
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/ai-spend-auditor?retryWrites=true&w=majority
MONGODB_DB=ai-spend-auditor
```

### 4️⃣ Install & Run (1 min)
```bash
npm install mongodb
npm run dev
```

### 5️⃣ Test (1 min)
```
Generate an audit → Check MongoDB Atlas → Done!
```

## 📚 Documentation

| File | Read Time | Purpose |
|------|-----------|---------|
| `MONGODB_QUICK_START.md` | 5 min | Quick setup |
| `MONGODB_SETUP.md` | 15 min | Detailed setup |
| `MONGODB_README.md` | 10 min | Overview |
| `MONGODB_MIGRATION_SUMMARY.md` | 10 min | What changed |

## 🎯 What You Need to Know

### MongoDB vs Supabase
- **MongoDB**: Simpler, more flexible, JSON documents
- **Supabase**: SQL-based, more structured

### Why MongoDB?
✅ Easier to understand
✅ Better for JSON data
✅ Simpler setup
✅ Free tier is generous

### What Changed?
- Replaced Supabase with MongoDB
- Updated `lib/mongodb.ts`
- Updated components to use MongoDB
- Added `npm install mongodb`

## 🔧 How It Works

```
1. User fills form
2. Audit generated locally
3. Saved to localStorage (immediate)
4. Saved to MongoDB (async)
5. User redirected to /audit/[id]
6. Audit fetched from MongoDB (or localStorage if offline)
7. Results displayed
```

## 📊 Database Structure

### `audits` Collection
```javascript
{
  id: "audit-123",
  audit_data: { /* full audit report */ },
  created_at: Date,
  monthly_spend: 1250,
  monthly_savings: 350,
  tools_count: 5,
  team_size: "21-50",
  findings_count: 3
}
```

### `leads` Collection
```javascript
{
  email: "user@company.com",
  company: "Acme Corp",
  audit_id: "audit-123",
  created_at: Date
}
```

## 🚀 Deployment

### Local
```bash
npm run dev
```

### Production
```bash
npm run build
npm run start
```

### Vercel
1. Add `MONGODB_URI` and `MONGODB_DB` to Vercel dashboard
2. Push to GitHub
3. Vercel deploys automatically

## ✅ Checklist

- [ ] Create MongoDB Atlas account
- [ ] Get connection string
- [ ] Update `.env`
- [ ] Run `npm install mongodb`
- [ ] Run `npm run dev`
- [ ] Generate test audit
- [ ] Verify in MongoDB Atlas
- [ ] Test shareable link
- [ ] Deploy to production

## 🆘 Common Issues

### "Connection timeout"
→ Check MongoDB Atlas IP whitelist (add 0.0.0.0/0)

### "Authentication failed"
→ Verify password in connection string

### "Not saving to database"
→ Check `.env` has `MONGODB_URI` set

### "Audit not found"
→ Check MongoDB Atlas Collections

## 📞 Need Help?

- **Quick Setup**: `MONGODB_QUICK_START.md`
- **Detailed Setup**: `MONGODB_SETUP.md`
- **Code**: `lib/mongodb.ts`
- **MongoDB Docs**: https://docs.mongodb.com

## 🎉 You're Ready!

Everything is set up. Follow the 5-minute setup above and you're done!

---

**Next Step**: Follow the 5-minute setup above ⬆️
