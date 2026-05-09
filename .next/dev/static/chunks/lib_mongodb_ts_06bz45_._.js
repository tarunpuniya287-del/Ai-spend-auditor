(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/lib/mongodb.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "closeDatabase",
    ()=>closeDatabase,
    "getAuditReportFromDatabase",
    ()=>getAuditReportFromDatabase,
    "initializeIndexes",
    ()=>initializeIndexes,
    "isMongoDBConfigured",
    ()=>isMongoDBConfigured,
    "saveAuditReportToDatabase",
    ()=>saveAuditReportToDatabase,
    "saveLead",
    ()=>saveLead
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
/**
 * MongoDB Client Configuration
 * 
 * This file initializes the MongoDB client for backend integration.
 * Used for storing audit reports and lead information.
 * 
 * Environment variables required:
 * - MONGODB_URI - MongoDB connection string
 * - MONGODB_DB - Database name
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongodb$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/mongodb/lib/index.js [app-client] (ecmascript)");
;
let cachedClient = null;
let cachedDb = null;
const mongoUri = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.MONGODB_URI;
const mongoDb = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.MONGODB_DB || "ai-spend-auditor";
if (!mongoUri) {
    console.warn("MONGODB_URI environment variable not configured. Backend features will be limited.");
}
/**
 * Connect to MongoDB
 */ async function connectToDatabase() {
    if (cachedClient && cachedDb) {
        return {
            client: cachedClient,
            db: cachedDb
        };
    }
    if (!mongoUri) {
        throw new Error("MONGODB_URI environment variable is not set");
    }
    try {
        const client = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongodb$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MongoClient"](mongoUri);
        await client.connect();
        const db = client.db(mongoDb);
        cachedClient = client;
        cachedDb = db;
        console.log("Connected to MongoDB");
        return {
            client,
            db
        };
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
        throw error;
    }
}
/**
 * Get audits collection
 */ async function getAuditsCollection() {
    const { db } = await connectToDatabase();
    return db.collection("audits");
}
/**
 * Get leads collection
 */ async function getLeadsCollection() {
    const { db } = await connectToDatabase();
    return db.collection("leads");
}
async function saveAuditReportToDatabase(report) {
    if (!isMongoDBConfigured()) {
        console.warn("MongoDB not configured, skipping database save");
        return null;
    }
    try {
        const auditsCollection = await getAuditsCollection();
        const auditDocument = {
            id: report.id,
            audit_data: report,
            created_at: new Date(report.timestamp),
            monthly_spend: report.summary.totalMonthlySpend,
            monthly_savings: report.savings.monthlyPotentialSavings,
            tools_count: report.summary.toolsAnalyzed,
            team_size: report.formData.teamSize,
            findings_count: report.summary.findingsCount,
            updated_at: new Date()
        };
        const result = await auditsCollection.insertOne(auditDocument);
        console.log("Audit saved to MongoDB:", result.insertedId);
        return auditDocument;
    } catch (err) {
        console.error("Failed to save audit report to database:", err);
        return null;
    }
}
async function getAuditReportFromDatabase(reportId) {
    if (!isMongoDBConfigured()) {
        console.warn("MongoDB not configured, cannot fetch from database");
        return null;
    }
    try {
        const auditsCollection = await getAuditsCollection();
        const document = await auditsCollection.findOne({
            id: reportId
        });
        if (document && document.audit_data) {
            return document.audit_data;
        }
        return null;
    } catch (err) {
        console.error("Failed to fetch audit report from database:", err);
        return null;
    }
}
async function saveLead(email, company, auditId) {
    if (!isMongoDBConfigured()) {
        console.warn("MongoDB not configured, skipping lead save");
        return null;
    }
    try {
        const leadsCollection = await getLeadsCollection();
        const leadDocument = {
            email,
            company,
            audit_id: auditId,
            created_at: new Date(),
            updated_at: new Date()
        };
        const result = await leadsCollection.insertOne(leadDocument);
        console.log("Lead saved to MongoDB:", result.insertedId);
        return leadDocument;
    } catch (err) {
        console.error("Failed to save lead:", err);
        return null;
    }
}
function isMongoDBConfigured() {
    return !!mongoUri;
}
async function initializeIndexes() {
    try {
        const auditsCollection = await getAuditsCollection();
        const leadsCollection = await getLeadsCollection();
        // Create indexes for audits
        await auditsCollection.createIndex({
            id: 1
        }, {
            unique: true
        });
        await auditsCollection.createIndex({
            created_at: -1
        });
        await auditsCollection.createIndex({
            team_size: 1
        });
        // Create indexes for leads
        await leadsCollection.createIndex({
            email: 1
        });
        await leadsCollection.createIndex({
            audit_id: 1
        });
        await leadsCollection.createIndex({
            created_at: -1
        });
        console.log("Database indexes created successfully");
    } catch (err) {
        console.error("Failed to create indexes:", err);
    }
}
async function closeDatabase() {
    if (cachedClient) {
        await cachedClient.close();
        cachedClient = null;
        cachedDb = null;
        console.log("MongoDB connection closed");
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=lib_mongodb_ts_06bz45_._.js.map