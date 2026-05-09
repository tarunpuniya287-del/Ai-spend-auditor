import { AuditFormData, DEFAULT_AUDIT_DATA } from "./types";
import { AuditReport } from "./audit/generate-audit";

const FORM_STORAGE_KEY = "ai-spend-auditor-form";
const AUDIT_STORAGE_PREFIX = "ai-spend-auditor-audit-";

/**
 * Form Data Storage
 */
export function getStoredAuditData(): AuditFormData {
  if (typeof window === "undefined") {
    return DEFAULT_AUDIT_DATA;
  }

  try {
    const stored = localStorage.getItem(FORM_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Failed to parse stored audit data:", error);
  }

  return DEFAULT_AUDIT_DATA;
}

export function saveAuditData(data: AuditFormData): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Failed to save audit data:", error);
  }
}

export function clearAuditData(): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    localStorage.removeItem(FORM_STORAGE_KEY);
  } catch (error) {
    console.error("Failed to clear audit data:", error);
  }
}

/**
 * Audit Report Storage
 */
export function saveAuditReport(report: AuditReport): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    const key = `${AUDIT_STORAGE_PREFIX}${report.id}`;
    localStorage.setItem(key, JSON.stringify(report));
  } catch (error) {
    console.error("Failed to save audit report:", error);
  }
}

export function getAuditReport(auditId: string): AuditReport | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const key = `${AUDIT_STORAGE_PREFIX}${auditId}`;
    const stored = localStorage.getItem(key);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Failed to retrieve audit report:", error);
  }

  return null;
}

export function deleteAuditReport(auditId: string): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    const key = `${AUDIT_STORAGE_PREFIX}${auditId}`;
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Failed to delete audit report:", error);
  }
}

export function getAllAuditReports(): AuditReport[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const reports: AuditReport[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(AUDIT_STORAGE_PREFIX)) {
        const stored = localStorage.getItem(key);
        if (stored) {
          reports.push(JSON.parse(stored));
        }
      }
    }
    return reports.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  } catch (error) {
    console.error("Failed to retrieve audit reports:", error);
    return [];
  }
}
