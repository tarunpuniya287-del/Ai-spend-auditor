(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/lib/supabase.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getAuditReportFromDatabase",
    ()=>getAuditReportFromDatabase,
    "isSupabaseConfigured",
    ()=>isSupabaseConfigured,
    "saveAuditReportToDatabase",
    ()=>saveAuditReportToDatabase,
    "saveLead",
    ()=>saveLead,
    "supabase",
    ()=>supabase
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
/**
 * Supabase Client Configuration
 * 
 * This file initializes the Supabase client for browser-side operations.
 * Used for storing audit reports and user data.
 * 
 * Environment variables required:
 * - NEXT_PUBLIC_SUPABASE_URL
 * - NEXT_PUBLIC_SUPABASE_ANON_KEY
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/supabase-js/dist/index.mjs [app-client] (ecmascript) <locals>");
;
const supabaseUrl = ("TURBOPACK compile-time value", "https://supabase.com/dashboard/project/yezuzcbqtkbgghztjhmo");
const supabaseAnonKey = ("TURBOPACK compile-time value", "sb_publishable_CmqBZkj5XnQwRUjdmtPeJQ_QTc8Z03i");
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl || "https://placeholder.supabase.co", supabaseAnonKey || "placeholder-key");
function isSupabaseConfigured() {
    return !!(supabaseUrl && supabaseAnonKey);
}
async function saveAuditReportToDatabase(report) {
    if (!isSupabaseConfigured()) //TURBOPACK unreachable
    ;
    try {
        const { data, error } = await supabase.from("audits").insert([
            {
                id: report.id,
                audit_data: report,
                created_at: report.timestamp,
                monthly_spend: report.summary.totalMonthlySpend,
                monthly_savings: report.savings.monthlyPotentialSavings,
                tools_count: report.summary.toolsAnalyzed,
                team_size: report.formData.teamSize,
                findings_count: report.summary.findingsCount
            }
        ]).select();
        if (error) {
            console.error("Error saving audit report to database:", error);
            return null;
        }
        return data?.[0] || null;
    } catch (err) {
        console.error("Failed to save audit report to database:", err);
        return null;
    }
}
async function getAuditReportFromDatabase(reportId) {
    if (!isSupabaseConfigured()) //TURBOPACK unreachable
    ;
    try {
        const { data, error } = await supabase.from("audits").select("audit_data").eq("id", reportId).single();
        if (error) {
            console.error("Error fetching audit report from database:", error);
            return null;
        }
        return data?.audit_data || null;
    } catch (err) {
        console.error("Failed to fetch audit report from database:", err);
        return null;
    }
}
async function saveLead(email, company, auditId) {
    if (!isSupabaseConfigured()) //TURBOPACK unreachable
    ;
    try {
        const { data, error } = await supabase.from("leads").insert([
            {
                email,
                company,
                audit_id: auditId,
                created_at: new Date().toISOString()
            }
        ]).select();
        if (error) {
            console.error("Error saving lead:", error);
            return null;
        }
        return data?.[0] || null;
    } catch (err) {
        console.error("Failed to save lead:", err);
        return null;
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=lib_supabase_ts_0s~sej6._.js.map