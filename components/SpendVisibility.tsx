"use client";

import { useState } from "react";

export default function SpendVisibility() {
  const [tools, setTools] = useState([
    { id: 1, tool: "ChatGPT Enterprise", plan: "Enterprise", spend: "1500", seats: "25" },
  ]);

  const addTool = () => {
    setTools([
      ...tools,
      {
        id: tools.length + 1,
        tool: "Claude for Business",
        plan: "Business",
        spend: "",
        seats: "",
      },
    ]);
  };

  return (
    <section className="py-24 px-gutter bg-surface-container-low border-y border-outline-variant/20">
      <div className="max-w-container-max mx-auto grid lg:grid-cols-2 gap-2xl items-center">
        <div className="space-y-lg">
          <h2 className="font-h1 text-[36px] font-black leading-tight">
            Stop Bleeding Capital on Unused AI Seats
          </h2>
          <p className="font-body-base text-body-base text-on-surface-variant font-medium leading-relaxed">
            Most startups unknowingly pay for unused AI seats, overlapping subscriptions, and oversized enterprise plans. We provide the forensic-level visibility needed to reclaim that budget.
          </p>

          <ul className="space-y-md">
            <li className="flex items-center gap-md font-bold text-on-surface">
              <span className="material-symbols-outlined text-primary">analytics</span>
              <span className="font-body-sm">Seat-by-seat usage forensics</span>
            </li>
            <li className="flex items-center gap-md font-bold text-on-surface">
              <span className="material-symbols-outlined text-primary">compare_arrows</span>
              <span className="font-body-sm">Cross-tool redundancy detection</span>
            </li>
            <li className="flex items-center gap-md font-bold text-on-surface">
              <span className="material-symbols-outlined text-primary">security</span>
              <span className="font-body-sm">SOC2 Type II data security standards</span>
            </li>
          </ul>
        </div>

        {/* Interactive Audit Form */}
        <div className="bg-surface-container-lowest p-xl rounded border-2 border-outline-variant shadow-2xl">
          <div className="mb-lg border-b border-outline-variant pb-md">
            <h3 className="font-h3 font-bold">Quick Auditor Tool</h3>
            <p className="text-xs text-outline font-medium">
              Add your current active tools to estimate savings.
            </p>
          </div>

          <form className="space-y-md">
            {tools.map((tool) => (
              <div key={tool.id} className="grid grid-cols-12 gap-md items-end">
                <div className="col-span-4 space-y-xs">
                  <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-wider">
                    Tool
                  </label>
                  <select className="w-full bg-surface border border-outline-variant rounded px-sm py-2 text-sm focus:ring-1 focus:ring-primary outline-none">
                    <option>ChatGPT Enterprise</option>
                    <option>Claude for Business</option>
                    <option>GitHub Copilot</option>
                    <option>Cursor</option>
                  </select>
                </div>
                <div className="col-span-3 space-y-xs">
                  <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-wider">
                    Plan
                  </label>
                  <select className="w-full bg-surface border border-outline-variant rounded px-sm py-2 text-sm focus:ring-1 focus:ring-primary outline-none">
                    <option>Enterprise</option>
                    <option>Business</option>
                    <option>Pro</option>
                  </select>
                </div>
                <div className="col-span-3 space-y-xs">
                  <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-wider">
                    Spend ($)
                  </label>
                  <input
                    type="number"
                    placeholder="1500"
                    className="w-full bg-surface border border-outline-variant rounded px-sm py-2 text-sm focus:ring-1 focus:ring-primary outline-none"
                  />
                </div>
                <div className="col-span-2 space-y-xs">
                  <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-wider">
                    Seats
                  </label>
                  <input
                    type="number"
                    placeholder="25"
                    className="w-full bg-surface border border-outline-variant rounded px-sm py-2 text-sm focus:ring-1 focus:ring-primary outline-none"
                  />
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addTool}
              className="w-full flex items-center justify-center gap-sm font-label-caps text-primary border border-primary/20 bg-primary/5 py-sm rounded hover:bg-primary/10 transition-colors"
            >
              <span className="material-symbols-outlined text-sm">add</span>
              Add Another Tool
            </button>

            <div className="pt-lg">
              <button
                type="button"
                className="w-full bg-primary text-on-primary font-bold text-h3 py-md rounded shadow-lg active:scale-95 transition-all"
              >
                Generate Audit Report
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
