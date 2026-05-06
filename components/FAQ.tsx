"use client";

import { useState } from "react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Is my billing data secure?",
      answer:
        "Yes. We use banking-grade AES-256 encryption. We are SOC2 Type II compliant. Our audit access is read-only and strictly limited to billing metadata for cost analysis.",
    },
    {
      question: "Which tools do you support?",
      answer:
        "OpenAI, Anthropic, Cursor, GitHub Copilot, Google Gemini, Midjourney, and Perplexity. We support both direct workspace accounts and cloud-provider based AI spend (AWS/Azure).",
    },
    {
      question: "How long does a full audit take?",
      answer:
        "A standard audit is completed in under 10 minutes once connected. Detailed departmental reporting for enterprise-level organizations is usually finalized within 2 hours.",
    },
  ];

  return (
    <section id="faq" className="py-24 px-gutter bg-surface-container-high/30">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-h1 text-h1 font-black text-center mb-16">
          Audit Standards & Support
        </h2>

        <div className="space-y-md">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="group bg-surface border-2 border-outline-variant/50 rounded-lg overflow-hidden"
              open={openIndex === index}
            >
              <summary
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="flex items-center justify-between p-lg cursor-pointer list-none font-bold text-h3"
              >
                {faq.question}
                <span
                  className="material-symbols-outlined transition-transform"
                  style={{
                    transform:
                      openIndex === index ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                >
                  expand_more
                </span>
              </summary>
              {openIndex === index && (
                <div className="px-lg pb-lg font-body-sm text-body-sm text-on-surface-variant font-medium leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
