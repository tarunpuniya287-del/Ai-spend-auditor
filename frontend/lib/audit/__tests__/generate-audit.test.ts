/**
 * Audit Generation Tests
 * 
 * Tests for the complete audit generation flow
 */

import { generateAudit, validateAuditData } from "../generate-audit";
import { AuditFormData } from "@/lib/types";

// Test Case 1: Small team with overlapping tools
const testCase1: AuditFormData = {
  tools: [
    { id: "1", tool: "ChatGPT", plan: "Plus", spend: 20, seats: 5 },
    { id: "2", tool: "Claude", plan: "Pro", spend: 20, seats: 5 },
    { id: "3", tool: "GitHub Copilot", plan: "Business", spend: 105, seats: 5 },
  ],
  teamSize: "1-5",
  useCase: "coding",
};

// Test Case 2: Enterprise plan for small team
const testCase2: AuditFormData = {
  tools: [
    { id: "1", tool: "ChatGPT", plan: "Enterprise", spend: 500, seats: 5 },
  ],
  teamSize: "1-5",
  useCase: "mixed",
};

// Test Case 3: Excessive seats
const testCase3: AuditFormData = {
  tools: [
    { id: "1", tool: "ChatGPT", plan: "Plus", spend: 20, seats: 20 },
    { id: "2", tool: "Claude", plan: "Pro", spend: 20, seats: 20 },
  ],
  teamSize: "1-5",
  useCase: "mixed",
};

// Test Case 4: Optimized setup
const testCase4: AuditFormData = {
  tools: [
    { id: "1", tool: "ChatGPT", plan: "Plus", spend: 20, seats: 3 },
    { id: "2", tool: "GitHub Copilot", plan: "Business", spend: 21, seats: 3 },
  ],
  teamSize: "1-5",
  useCase: "coding",
};

console.log("=== AUDIT GENERATION TEST SUITE ===\n");

// Test 1: Overlapping tools
console.log("TEST 1: Small team with overlapping tools");
console.log("Input:", JSON.stringify(testCase1, null, 2));
const report1 = generateAudit(testCase1);
console.log("Findings:", report1.findings.length);
console.log("Monthly Savings:", report1.savings.monthlyPotentialSavings);
console.log("Annual Savings:", report1.savings.annualPotentialSavings);
console.log("Savings %:", report1.savings.savingsPercentage.toFixed(1));
console.log("Recommendations:", report1.recommendations.length);
console.log("");

// Test 2: Enterprise oversizing
console.log("TEST 2: Enterprise plan for small team");
console.log("Input:", JSON.stringify(testCase2, null, 2));
const report2 = generateAudit(testCase2);
console.log("Findings:", report2.findings.length);
console.log("Monthly Savings:", report2.savings.monthlyPotentialSavings);
console.log("Annual Savings:", report2.savings.annualPotentialSavings);
console.log("Savings %:", report2.savings.savingsPercentage.toFixed(1));
console.log("Recommendations:", report2.recommendations.length);
console.log("");

// Test 3: Excessive seats
console.log("TEST 3: Excessive seats");
console.log("Input:", JSON.stringify(testCase3, null, 2));
const report3 = generateAudit(testCase3);
console.log("Findings:", report3.findings.length);
console.log("Monthly Savings:", report3.savings.monthlyPotentialSavings);
console.log("Annual Savings:", report3.savings.annualPotentialSavings);
console.log("Savings %:", report3.savings.savingsPercentage.toFixed(1));
console.log("Recommendations:", report3.recommendations.length);
console.log("");

// Test 4: Optimized setup
console.log("TEST 4: Optimized setup");
console.log("Input:", JSON.stringify(testCase4, null, 2));
const report4 = generateAudit(testCase4);
console.log("Findings:", report4.findings.length);
console.log("Monthly Savings:", report4.savings.monthlyPotentialSavings);
console.log("Annual Savings:", report4.savings.annualPotentialSavings);
console.log("Savings %:", report4.savings.savingsPercentage.toFixed(1));
console.log("Recommendations:", report4.recommendations.length);
console.log("");

// Test validation
console.log("TEST 5: Validation");
const invalidData: AuditFormData = {
  tools: [],
  teamSize: "",
  useCase: "",
};
const validation = validateAuditData(invalidData);
console.log("Invalid data validation:", validation.valid);
console.log("Errors:", validation.errors);
console.log("");

console.log("=== ALL TESTS COMPLETED ===");
