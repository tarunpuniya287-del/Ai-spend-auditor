import { useState, useEffect } from "react";

export interface AuditTool {
  id: string;
  tool: string;
  plan: string;
  spend: number;
  seats: number;
}

export interface AuditFormData {
  tools: AuditTool[];
  teamSize: string;
  useCase: string;
}

const STORAGE_KEY = "ai_spend_audit_form";

const DEFAULT_FORM_DATA: AuditFormData = {
  tools: [
    {
      id: "1",
      tool: "ChatGPT",
      plan: "Pro",
      spend: 0,
      seats: 1,
    },
  ],
  teamSize: "1-5",
  useCase: "mixed",
};

export function useAuditForm() {
  const [formData, setFormData] = useState<AuditFormData>(DEFAULT_FORM_DATA);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setFormData(JSON.parse(saved));
      } catch (error) {
        console.error("Failed to parse saved form data:", error);
        setFormData(DEFAULT_FORM_DATA);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever formData changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    }
  }, [formData, isLoaded]);

  const addTool = () => {
    const newTool: AuditTool = {
      id: Date.now().toString(),
      tool: "Claude",
      plan: "Pro",
      spend: 0,
      seats: 1,
    };
    setFormData((prev) => ({
      ...prev,
      tools: [...prev.tools, newTool],
    }));
  };

  const removeTool = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      tools: prev.tools.filter((tool) => tool.id !== id),
    }));
  };

  const updateTool = (id: string, updates: Partial<AuditTool>) => {
    setFormData((prev) => ({
      ...prev,
      tools: prev.tools.map((tool) =>
        tool.id === id ? { ...tool, ...updates } : tool
      ),
    }));
  };

  const updateTeamSize = (teamSize: string) => {
    setFormData((prev) => ({
      ...prev,
      teamSize,
    }));
  };

  const updateUseCase = (useCase: string) => {
    setFormData((prev) => ({
      ...prev,
      useCase,
    }));
  };

  const resetForm = () => {
    setFormData(DEFAULT_FORM_DATA);
    localStorage.removeItem(STORAGE_KEY);
  };

  const calculateTotalSpend = () => {
    return formData.tools.reduce((sum, tool) => sum + tool.spend, 0);
  };

  const calculateTotalSeats = () => {
    return formData.tools.reduce((sum, tool) => sum + tool.seats, 0);
  };

  return {
    formData,
    isLoaded,
    addTool,
    removeTool,
    updateTool,
    updateTeamSize,
    updateUseCase,
    resetForm,
    calculateTotalSpend,
    calculateTotalSeats,
  };
}
