/**
 * Supabase Client Configuration
 * 
 * This file initializes the Supabase client for backend integration.
 * Currently used for storing audit reports and user data.
 * 
 * Environment variables required:
 * - NEXT_PUBLIC_SUPABASE_URL
 * - NEXT_PUBLIC_SUPABASE_ANON_KEY
 */

import { createClient } from "@supabase/supabase-js";

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
 * Save audit report to database
 */
export async function saveAuditReport(report: any) {
  try {
    const { data, error } = await supabase
      .from("audits")
      .insert([
        {
          id: report.id,
          timestamp: report.timestamp,
          summary: report.summary,
          findings_count: report.summary.findingsCount,
          monthly_savings: report.savings.monthlyPotentialSavings,
          annual_savings: report.savings.annualPotentialSavings,
          data: report,
        },
      ])
      .select();

    if (error) {
      console.error("Error saving audit report:", error);
      return null;
    }

    return data;
  } catch (err) {
    console.error("Failed to save audit report:", err);
    return null;
  }
}

/**
 * Get audit report by ID
 */
export async function getAuditReport(reportId: string) {
  try {
    const { data, error } = await supabase
      .from("audits")
      .select("*")
      .eq("id", reportId)
      .single();

    if (error) {
      console.error("Error fetching audit report:", error);
      return null;
    }

    return data;
  } catch (err) {
    console.error("Failed to fetch audit report:", err);
    return null;
  }
}

/**
 * Save lead/contact information
 */
export async function saveLead(email: string, name?: string, company?: string) {
  try {
    const { data, error } = await supabase
      .from("leads")
      .insert([
        {
          email,
          name,
          company,
          created_at: new Date().toISOString(),
        },
      ])
      .select();

    if (error) {
      console.error("Error saving lead:", error);
      return null;
    }

    return data;
  } catch (err) {
    console.error("Failed to save lead:", err);
    return null;
  }
}

/**
 * Check if Supabase is configured
 */
export function isSupabaseConfigured(): boolean {
  return !!(supabaseUrl && supabaseAnonKey);
}
