export interface ToolEntry {
  id: string;
  tool: string;
  plan: string;
  spend: number;
  seats: number;
}

export interface AuditFormData {
  tools: ToolEntry[];
  teamSize: string;
  useCase: string;
}

export const DEFAULT_AUDIT_DATA: AuditFormData = {
  tools: [],
  teamSize: "",
  useCase: "",
};
