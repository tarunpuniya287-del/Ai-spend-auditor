export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-20 px-gutter">
      <div className="max-w-container-max mx-auto grid lg:grid-cols-2 gap-2xl items-center">
        <div className="space-y-lg">
          <div className="inline-flex items-center gap-sm bg-primary/10 px-md py-xs rounded text-primary">
            <span className="material-symbols-outlined text-[18px]">verified_user</span>
            <span className="text-label-caps font-bold">FINANCIAL COMPLIANCE READY</span>
          </div>

          <h1 className="font-display text-[42px] leading-tight text-on-surface font-extrabold">
            Audit Your AI Stack Before Renewing Another Subscription
          </h1>

          <p className="font-body-base text-body-base text-on-surface-variant max-w-lg leading-relaxed">
            Analyze your ChatGPT, Claude, Cursor, Copilot, and Gemini costs to uncover unnecessary AI spend and optimization opportunities.
          </p>

          <div className="space-y-sm">
            <button className="bg-primary text-on-primary font-h3 text-h3 px-xl py-md rounded shadow-xl hover:brightness-110 active:scale-95 transition-all w-full sm:w-auto">
              Run Free Audit
            </button>
            <p className="text-xs text-outline font-medium">
              Supports ChatGPT, Claude, Cursor, Gemini, Copilot & API-based workflows.
            </p>
          </div>
        </div>

        <div className="relative">
          {/* Savings Visualization */}
          <div className="bg-surface-container-lowest border-2 border-primary/20 rounded-xl shadow-2xl p-xl space-y-xl overflow-hidden relative">
            <div className="flex justify-between items-center border-b border-outline-variant pb-md">
              <span className="text-label-caps font-bold text-on-surface tracking-widest">
                SAVINGS PROJECTION
              </span>
              <span className="bg-error/10 text-error px-sm py-1 rounded text-[10px] font-bold">
                URGENT ACTION
              </span>
            </div>

            <div className="grid grid-cols-2 gap-xl">
              <div className="space-y-sm">
                <p className="text-label-caps text-outline">CURRENT SPEND</p>
                <p className="text-h2 font-bold text-on-surface-variant line-through">
                  $1,240/mo
                </p>
              </div>
              <div className="space-y-sm">
                <p className="text-label-caps text-primary">OPTIMIZED STACK</p>
                <p className="text-h2 font-bold text-primary">$790/mo</p>
              </div>
            </div>

            <div className="bg-primary py-lg px-xl rounded-lg text-center shadow-inner relative overflow-hidden">
              <div className="absolute inset-0 bg-white/5 pointer-events-none"></div>
              <p className="text-on-primary text-label-caps font-bold mb-xs opacity-80">
                TOTAL POTENTIAL SAVINGS
              </p>
              <p className="text-on-primary text-[48px] font-black leading-none tracking-tight">
                $450/mo
              </p>
              <p className="text-on-primary/70 text-xs mt-sm font-medium">
                Based on seat redundancy and plan overlaps
              </p>
            </div>

            <div className="flex gap-md items-center bg-surface-container p-md rounded border border-outline-variant/30">
              <span className="material-symbols-outlined text-primary">report_problem</span>
              <p className="text-body-sm font-semibold italic text-on-surface">
                "12 redundant GitHub Copilot seats detected across Dev Ops."
              </p>
            </div>
          </div>

          {/* Visual accents */}
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10"></div>
        </div>
      </div>
    </section>
  );
}
