# MongoDB Quick Start - 5 Minutes

Get MongoDB running for the AI Spend Auditor in 5 minutes.

## TL;DR

1. **Create MongoDB Atlas account** (2 min)
2. **Get connection string** (1 min)
3. **Update `.env`** (1 min)
4. **Install dependencies** (1 min)
5. **Test** (1 min)

## Step 1: Create MongoDB Atlas Account (2 min)

```bash
# Go to https://mongodb.com/cloud/atlas
# Sign up for free
# Create a new project
# Create a free cluster
# Wait for cluster to be created
```

## Step 2: Get Connection String (1 min)

1. In MongoDB Atlas, click "Connect"
2. Choose "Drivers"
3. Select "Node.js"
4. Copy the connection string
5. Replace `<password>` with your password
6. Replace `myFirstDatabase` with `ai-spend-auditor`

Example:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/ai-spend-auditor?retryWrites=true&w=majority
```

## Step 3: Update `.env` (1 min)

```env
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/ai-spend-auditor?retryWrites=true&w=majority
MONGODB_DB=ai-spend-auditor
```

## Step 4: Install Dependencies (1 min)

```bash
npm install mongodb
```

## Step 5: Test (1 min)

```bash
npm run dev
# Generate an audit
# Check MongoDB Atlas → Collections → audits
# Verify your audit appears
```

## Done! ✅

Your MongoDB backend is now running.

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Connection timeout | Check MongoDB Atlas IP whitelist (add 0.0.0.0/0) |
| Auth failed | Verify password in connection string |
| Not saving | Check `.env` has `MONGODB_URI` set |

## What Changed

- Replaced Supabase with MongoDB
- Updated `lib/mongodb.ts` with MongoDB client
- Updated components to use MongoDB
- Added automatic index creation

## Next Steps

- Read `MONGODB_SETUP.md` for detailed setup
- Deploy to production
- Monitor MongoDB usage in Atlas dashboard

---

**Ready?** Follow the 5 steps above and you're done!
