# Quick Start Guide - AI Spend Auditor

## Prerequisites
- Node.js installed
- MongoDB running locally (MongoDB Compass or `mongod` service)
- Two terminal windows

## Step 1: Start MongoDB
Make sure MongoDB is running on your machine. You can check MongoDB Compass or run:
```bash
mongod
```

## Step 2: Start Backend Server

Open Terminal 1 and run:
```bash
cd ai-spend-auditor/backend
npm run dev
```

You should see:
```
🚀 Server running on http://localhost:3001
📡 Frontend URL: http://localhost:3000
💾 MongoDB: mongodb://localhost:27017
```

## Step 3: Start Frontend Server

Open Terminal 2 and run:
```bash
cd ai-spend-auditor/frontend
npm run dev
```

You should see:
```
▲ Next.js 16.2.4
- Local: http://localhost:3000
```

## Step 4: Open the Application

Open your browser and go to:
```
http://localhost:3000
```

## Step 5: Create an Audit

1. Fill out the audit form:
   - Add AI tools (ChatGPT, Claude, etc.)
   - Enter plan and monthly spend for each
   - Select team size and use case

2. Click "Generate Audit Report"

3. View the generated audit report

## Step 6: Verify Data is Saved

### Check MongoDB
1. Open MongoDB Compass
2. Connect to `mongodb://localhost:27017`
3. Navigate to `ai-spend-auditor` database
4. Check `audits` collection for your audit

### Check API
```bash
# Get all audits
curl http://localhost:3001/api/audits

# Get specific audit (replace :id with actual audit ID)
curl http://localhost:3001/api/audits/:id

# Health check
curl http://localhost:3001/health
```

## Troubleshooting

### Backend won't start
- Check MongoDB is running
- Check port 3001 is not in use
- Check `.env` file in `backend/` folder

### Frontend won't start
- Check port 3000 is not in use
- Check `.env` file in `frontend/` folder
- Delete `frontend/.next` folder and try again

### Can't connect to backend
- Check backend is running on port 3001
- Check `NEXT_PUBLIC_API_URL` in `frontend/.env`
- Check CORS is enabled (should be by default)

### MongoDB connection error
- Check MongoDB is running
- Check connection string in `backend/.env`
- Check database name is correct

## File Locations

- **Backend**: `ai-spend-auditor/backend/`
- **Frontend**: `ai-spend-auditor/frontend/`
- **Backend Config**: `ai-spend-auditor/backend/.env`
- **Frontend Config**: `ai-spend-auditor/frontend/.env`

## API Documentation

See `CURRENT_STATUS.md` for full API documentation.

## Next Steps

- [ ] Test creating multiple audits
- [ ] Test viewing audits from different browsers
- [ ] Test with backend offline (should use localStorage)
- [ ] Implement lead capture
- [ ] Add authentication
- [ ] Deploy to production
