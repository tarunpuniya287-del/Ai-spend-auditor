import { AuditFormData, DEFAULT_AUDIT_DATA } from "./types";

const STORAGE_KEY = "ai-spend-auditor-form";

export function getStoredAuditData(): AuditFormData {
  if (typeof window === "undefined") {
    return DEFAULT_AUDIT_DATA;
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
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
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Failed to save audit data:", error);
  }
}

export function clearAuditData(): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Failed to clear audit data:", error);
  }
}
