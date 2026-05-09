# AI Spend Auditor - Backend API

Express.js backend API for the AI Spend Auditor application. Handles audit storage, lead capture, and data persistence with MongoDB.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB running locally (or MongoDB Atlas connection string)
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Server runs on `http://localhost:3001`

### Production

```bash
npm start
```

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── mongodb.js          # MongoDB connection & initialization
│   ├── models/
│   │   ├── Audit.js            # Audit data model
│   │   └── Lead.js             # Lead data model
│   ├── routes/
│   │   ├── audits.js           # Audit API endpoints
│   │   └── leads.js            # Lead API endpoints
│   └── index.js                # Express server entry point
├── package.json
├── .env
└── README.md
```

## 🔌 API Endpoints

### Audits

#### GET `/api/audits/:id`
Fetch a specific audit by ID.

#### POST `/api/audits`
Create a new audit.

#### GET `/api/audits`
Get all audits (paginated).

#### PUT `/api/audits/:id`
Update an audit.

#### DELETE `/api/audits/:id`
Delete an audit.

### Leads

#### GET `/api/leads/:id`
Fetch a specific lead by ID.

#### POST `/api/leads`
Create a new lead.

#### GET `/api/leads`
Get all leads (paginated).

#### GET `/api/leads/audit/:auditId`
Get all leads for a specific audit.

#### PUT `/api/leads/:id`
Update a lead.

#### DELETE `/api/leads/:id`
Delete a lead.

## 🗄️ Database Schema

### Audits Collection

```javascript
{
  id: string (unique)
  auditData: {
    tools: { [toolName]: { plan, monthlySpend, seats } }
    teamSize: string
    useCase: string
    monthlySpend: number
    monthlySavings: number
    toolsCount: number
  }
  findings: Finding[]
  recommendations: Recommendation[]
  summary?: string
  createdAt: Date
  updatedAt: Date
}
```

### Leads Collection

```javascript
{
  id: string (unique)
  email: string (indexed)
  company?: string
  auditId: string (indexed)
  createdAt: Date (indexed)
  updatedAt: Date
}
```

## 🔧 Environment Variables

```env
# MongoDB
MONGODB_URI=mongodb://localhost:27017
MONGODB_DB=ai-spend-auditor

# Server
PORT=3001
NODE_ENV=development

# CORS
FRONTEND_URL=http://localhost:3000
```

## 🧪 Testing

```bash
# Health check
curl http://localhost:3001/health

# Create audit
curl -X POST http://localhost:3001/api/audits \
  -H "Content-Type: application/json" \
  -d '{
    "auditData": {...},
    "findings": [],
    "recommendations": []
  }'

# Get audit
curl http://localhost:3001/api/audits/{id}
```

## 🚨 Error Handling

All endpoints return a consistent error response format:

```json
{
  "success": false,
  "error": "Error message"
}
```

HTTP Status Codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `409` - Conflict (e.g., duplicate email)
- `500` - Internal Server Error

## 🔐 Security Notes

- Email validation on lead creation
- Duplicate email prevention
- CORS configured for frontend URL
- Input validation on all endpoints
- Error messages don't expose sensitive data

## 📚 Integration with Frontend

The frontend should call these endpoints:

```javascript
// Save audit
const response = await fetch('http://localhost:3001/api/audits', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(auditData)
});

// Fetch audit
const response = await fetch('http://localhost:3001/api/audits/[id]');

// Save lead
const response = await fetch('http://localhost:3001/api/leads', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, company, auditId })
});
```

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running: `mongod` or check MongoDB Compass
- Verify `MONGODB_URI` in `.env`
- Check MongoDB is listening on port 27017

### CORS Error
- Verify `FRONTEND_URL` in `.env` matches your frontend URL
- Default is `http://localhost:3000`

### Port Already in Use
- Change `PORT` in `.env` (default: 3001)
- Or kill the process using the port

---

**Status**: Backend ready for development and integration with frontend API.
