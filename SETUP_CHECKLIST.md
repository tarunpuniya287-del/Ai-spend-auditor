# ✅ Setup Checklist

Use this checklist to verify everything is set up correctly.

## 🚀 Prerequisites

- [ ] Node.js 18+ installed
- [ ] npm installed
- [ ] MongoDB running (MongoDB Compass or `mongod`)
- [ ] Git installed

## 📁 Folder Structure

- [ ] `frontend/` folder exists
- [ ] `backend/` folder exists
- [ ] `frontend/package.json` exists
- [ ] `backend/package.json` exists
- [ ] `frontend/node_modules/` exists
- [ ] `backend/node_modules/` exists

## 🔧 Backend Setup

- [ ] `cd backend` works
- [ ] `npm run dev` starts without errors
- [ ] Backend runs on `http://localhost:3001`
- [ ] MongoDB connection successful
- [ ] Database indexes created
- [ ] `curl http://localhost:3001/health` returns 200

## 🎨 Frontend Setup

- [ ] `cd frontend` works
- [ ] `npm run dev` starts without errors
- [ ] Frontend runs on `http://localhost:3000`
- [ ] Page loads without errors
- [ ] No console errors in browser

## 🗄️ Database Setup

- [ ] MongoDB is running
- [ ] Connection string: `mongodb://localhost:27017`
- [ ] Database: `ai-spend-auditor`
- [ ] Collections: `audits`, `leads`
- [ ] Indexes created automatically

## 📚 Documentation

- [ ] `START_HERE.md` exists
- [ ] `QUICK_START.md` exists
- [ ] `PROJECT_OVERVIEW.md` exists
- [ ] `INDEX.md` exists
- [ ] `FINAL_SUMMARY.md` exists
- [ ] `frontend/README.md` exists
- [ ] `backend/README.md` exists

## 🔌 API Testing

- [ ] Health endpoint works: `curl http://localhost:3001/health`
- [ ] Can create audit: `POST /api/audits`
- [ ] Can get audit: `GET /api/audits/:id`
- [ ] Can create lead: `POST /api/leads`
- [ ] Can get lead: `GET /api/leads/:id`

## 🌐 Frontend Testing

- [ ] Home page loads
- [ ] Audit form displays
- [ ] Form validation works
- [ ] No console errors
- [ ] Responsive design works

## 🔐 Environment Variables

### Frontend (`frontend/.env`)
- [ ] `NEXT_PUBLIC_API_URL=http://localhost:3001`
- [ ] `MONGODB_URI=mongodb://localhost:27017`
- [ ] `MONGODB_DB=ai-spend-auditor`

### Backend (`backend/.env`)
- [ ] `MONGODB_URI=mongodb://localhost:27017`
- [ ] `MONGODB_DB=ai-spend-auditor`
- [ ] `PORT=3001`
- [ ] `NODE_ENV=development`
- [ ] `FRONTEND_URL=http://localhost:3000`

## 🧪 Integration Testing

- [ ] Backend and frontend can communicate
- [ ] No CORS errors
- [ ] API calls work from frontend
- [ ] Data persists in MongoDB

## 📊 Project Status

- [ ] Backend ready for development
- [ ] Frontend ready for development
- [ ] Database ready for use
- [ ] Documentation complete
- [ ] All dependencies installed

## 🎯 Ready to Start?

If all checkboxes are checked, you're ready to start development!

### Next Steps:
1. [ ] Read `START_HERE.md`
2. [ ] Read `PROJECT_OVERVIEW.md`
3. [ ] Start backend: `cd backend && npm run dev`
4. [ ] Start frontend: `cd frontend && npm run dev`
5. [ ] Open `http://localhost:3000`
6. [ ] Test the audit form

## 🐛 Troubleshooting

### Backend won't start
- [ ] Check if port 3001 is in use
- [ ] Verify MongoDB is running
- [ ] Check `MONGODB_URI` in `backend/.env`
- [ ] Check `backend/node_modules/` exists
- [ ] Try: `npm install` in backend folder

### Frontend won't start
- [ ] Check if port 3000 is in use
- [ ] Check `NEXT_PUBLIC_API_URL` in `frontend/.env`
- [ ] Check `frontend/node_modules/` exists
- [ ] Try: `npm install` in frontend folder
- [ ] Try: `rm -rf .next` and restart

### MongoDB connection error
- [ ] Open MongoDB Compass
- [ ] Or run `mongod` in terminal
- [ ] Verify connection string in `backend/.env`
- [ ] Check port 27017 is open

### CORS error
- [ ] Ensure backend is running on port 3001
- [ ] Check `FRONTEND_URL` in `backend/.env`
- [ ] Check `NEXT_PUBLIC_API_URL` in `frontend/.env`

## 📞 Need Help?

1. Check `START_HERE.md`
2. Check `QUICK_START.md`
3. Check `INDEX.md` for documentation map
4. Check relevant README files

## ✅ Final Verification

Run this command to verify everything:

```bash
# Test backend
curl http://localhost:3001/health

# Should return:
# {"status":"ok","timestamp":"2024-01-01T00:00:00.000Z"}
```

If you see the response above, everything is working! 🎉

---

**Status**: Ready for development
**Last Updated**: May 9, 2026
