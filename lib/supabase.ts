/**
 * Supabase Client Configuration
 * 
 * This file initializes the Supabase client for browser-side operations.
 * Used for storing audit reports and user data.
 * 
 * Environment variables required:
 * - NEXT_PUBLIC_SUPABASE_URL
 * - NEXT_PUBLIC_SUPABASE_ANON_KEY
 */

import { createClient } from "@supabase/supabase-js";
import { AuditReport } from "./audit/generate-audit";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "Supabase environment variables not configured. Backend features will be limited."
  );
}

export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseAnonKey || "placeholder-key"
);

/**
 * Check if Supabase is configured
 */
export function isSupabaseConfigured(): boolean {
  return !!(supabaseUrl && supabaseAnonKey);
}

/**
 * Save audit report to database
 */
export async function saveAuditReportToDatabase(report: AuditReport) {
  if (!isSupabaseConfigured()) {
    console.warn("Supabase not configured, skipping database save");
    return null;
  }

  try {
    const { data, error } = await supabase
      .from("audits")
      .insert([
        {
          id: report.id,
          audit_data: report,
          created_at: report.timestamp,
          monthly_spend: report.summary.totalMonthlySpend,
          monthly_savings: report.savings.monthlyPotentialSavings,
          tools_count: report.summary.toolsAnalyzed,
          team_size: report.formData.teamSize,
          findings_count: report.summary.findingsCount,
        },
      ])
      .select();

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

/**
 * Get audit report by ID from database
 */
export async function getAuditReportFromDatabase(reportId: string): Promise<AuditReport | null> {
  if (!isSupabaseConfigured()) {
    console.warn("Supabase not configured, cannot fetch from database");
    return null;
  }

  try {
    const { data, error } = await supabase
      .from("audits")
      .select("audit_data")
      .eq("id", reportId)
      .single();

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

/**
 * Save lead/contact information
 */
export async function saveLead(email: string, company?: string, auditId?: string) {
  if (!isSupabaseConfigured()) {
    console.warn("Supabase not configured, skipping lead save");
    return null;
  }

  try {
    const { data, error } = await supabase
      .from("leads")
      .insert([
        {
          email,
          company,
          audit_id: auditId,
          created_at: new Date().toISOString(),
        },
      ])
      .select();

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
