# MongoDB Setup Guide

This guide walks you through setting up MongoDB for persistent audit storage in the AI Spend Auditor.

## Overview

The application now supports backend-backed persistent audit storage using MongoDB. Audits are:
- Generated and stored locally in the browser
- Automatically saved to MongoDB database (if configured)
- Fetched from MongoDB when accessing `/audit/[id]` (with localStorage fallback)

## Prerequisites

- A MongoDB account (free tier at [mongodb.com](https://mongodb.com) is sufficient)
- Node.js and npm installed
- Your MongoDB connection string

## Step 1: Create a MongoDB Cluster

### Option A: MongoDB Atlas (Cloud - Recommended)

1. Go to [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Sign up for a free account
3. Create a new project
4. Click "Create a Deployment"
5. Choose "Free" tier
6. Select your region (closest to your users)
7. Click "Create Deployment"
8. Wait for cluster to be created (2-3 minutes)

### Option B: Local MongoDB

1. Install MongoDB Community Edition from [mongodb.com/try/download/community](https://mongodb.com/try/download/community)
2. Start MongoDB service:
   ```bash
   # macOS with Homebrew
   brew services start mongodb-community
   
   # Windows
   # MongoDB should start automatically after installation
   
   # Linux
   sudo systemctl start mongod
   ```
3. Connection string: `mongodb://localhost:27017`

## Step 2: Get Your Connection String

### For MongoDB Atlas:

1. In your cluster dashboard, click "Connect"
2. Choose "Drivers"
3. Select "Node.js" and version "5.9 or later"
4. Copy the connection string
5. Replace `<password>` with your database password
6. Replace `myFirstDatabase` with `ai-spend-auditor`

Example:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/ai-spend-auditor?retryWrites=true&w=majority
```

### For Local MongoDB:

```
mongodb://localhost:27017/ai-spend-auditor
```

## Step 3: Configure Environment Variables

1. In your project root, update `.env`:

```env
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/ai-spend-auditor?retryWrites=true&w=majority
MONGODB_DB=ai-spend-auditor
```

2. Restart your development server:
```bash
npm run dev
```

## Step 4: Install Dependencies

```bash
npm install mongodb
```

## Step 5: Test the Integration

1. Open the application at `http://localhost:3000`
2. Fill out the audit form and generate a report
3. Check MongoDB:
   - **MongoDB Atlas**: Go to "Collections" in your cluster
   - **Local MongoDB**: Use MongoDB Compass or `mongosh`
4. You should see your audit in the `audits` collection

## Database Schema

### `audits` Collection

Stores complete audit reports with full audit data as JSON.

```javascript
{
  _id: ObjectId,
  id: String,                    // Unique audit identifier
  audit_data: Object,            // Complete audit report as JSON
  created_at: Date,              // When the audit was created
  monthly_spend: Number,         // Total monthly spend
  monthly_savings: Number,       // Potential monthly savings
  tools_count: Number,           // Number of tools analyzed
  team_size: String,             // Team size category
  findings_count: Number,        // Number of findings
  updated_at: Date               // Last update timestamp
}
```

### `leads` Collection

Stores contact information from interested users.

```javascript
{
  _id: ObjectId,
  email: String,                 // Contact email
  company: String,               // Company name (optional)
  audit_id: String,              // Reference to associated audit
  created_at: Date,              // When the lead was created
  updated_at: Date               // Last update timestamp
}
```

## Indexes

The application automatically creates these indexes for performance:

### Audits Collection
- `id` (unique) - Fast lookups by audit ID
- `created_at` (descending) - Fast sorting by creation date
- `team_size` - Fast filtering by team size

### Leads Collection
- `email` - Fast email lookups
- `audit_id` - Fast audit-to-lead relationships
- `created_at` (descending) - Fast lead sorting

## Troubleshooting

### "MONGODB_URI environment variable not configured"

**Problem**: You see this warning in the console.

**Solution**:
1. Verify `.env` file has `MONGODB_URI` set
2. Restart the development server
3. Check that the connection string is correct

### Connection Timeout

**Problem**: "connect ECONNREFUSED" or timeout errors.

**Solution**:
1. Verify MongoDB is running
2. Check connection string format
3. For MongoDB Atlas, ensure:
   - IP address is whitelisted (add 0.0.0.0/0 for development)
   - Database user has correct password
   - Network access is enabled

### "Authentication failed"

**Problem**: MongoDB authentication error.

**Solution**:
1. Verify username and password in connection string
2. Ensure special characters are URL-encoded
3. Check that the user has access to the database

### Audits not saving to database

**Problem**: Audits generate successfully but don't appear in MongoDB.

**Solution**:
1. Check browser console for errors
2. Verify MongoDB connection string in `.env`
3. Ensure MongoDB is running and accessible
4. Check MongoDB Atlas IP whitelist

### "Audit report not found" error

**Problem**: Audit link shows error even though you just created it.

**Solution**:
1. The audit is stored locally - try refreshing the page
2. If still not found, check browser localStorage (DevTools → Application → Local Storage)
3. Verify MongoDB database has the audit record

## Architecture

### Data Flow

```
User fills form
    ↓
Generate audit locally
    ↓
Save to localStorage (immediate)
    ↓
Save to MongoDB (async, non-blocking)
    ↓
Redirect to /audit/[id]
    ↓
Fetch from MongoDB (with localStorage fallback)
    ↓
Display audit results
```

### Client-Side Utilities

- **`lib/mongodb.ts`**: MongoDB client and database functions
  - `saveAuditReportToDatabase()`: Save audit to MongoDB
  - `getAuditReportFromDatabase()`: Fetch audit from MongoDB
  - `saveLead()`: Save lead information
  - `isMongoDBConfigured()`: Check if MongoDB is configured
  - `initializeIndexes()`: Create database indexes

### Storage Hierarchy

1. **Primary**: MongoDB database (persistent, shareable)
2. **Fallback**: Browser localStorage (local, temporary)

This ensures the app works even if MongoDB is unavailable.

## Next Steps

### Optional Enhancements

1. **Add authentication** to allow users to save multiple audits
2. **Create admin dashboard** to view all audits and leads
3. **Add email notifications** when leads are captured
4. **Implement audit history** to track changes over time
5. **Add export functionality** (PDF, CSV) with database integration

### Monitoring

Monitor your MongoDB usage:
1. Go to **Metrics** in MongoDB Atlas
2. Track database operations and storage
3. Upgrade plan if needed (free tier has generous limits)

## Support

For MongoDB-specific issues:
- [MongoDB Documentation](https://docs.mongodb.com)
- [MongoDB Atlas Help](https://docs.atlas.mongodb.com)
- [MongoDB Community Forum](https://www.mongodb.com/community/forums)

For application-specific issues:
- Check the browser console for error messages
- Review `lib/mongodb.ts` to ensure connection is working
- Verify environment variables are set correctly
