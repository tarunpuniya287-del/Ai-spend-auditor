export default function CTA() {
  return (
    <section className="py-24 px-gutter">
      <div className="max-w-container-max mx-auto bg-on-surface rounded-2xl p-2xl text-center space-y-xl relative overflow-hidden shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.02)_50%,transparent_75%)] bg-[length:200%_200%] animate-pulse"></div>

        <h2 className="text-on-primary font-display text-[40px] font-black relative z-10">
          See How Much Your AI Stack Is Really Costing You
        </h2>

        <p className="text-on-primary/60 font-body-base text-body-base max-w-xl mx-auto relative z-10 font-medium">
          Join 500+ efficiency-first startups that have optimized their AI operational costs this quarter.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-md relative z-10">
          <button className="bg-primary text-on-primary font-bold text-h3 px-2xl py-lg rounded hover:brightness-110 transition-all shadow-xl">
            Start Your Free Audit
          </button>
          <button className="border border-on-primary/30 text-on-primary font-bold text-h3 px-2xl py-lg rounded hover:bg-on-primary/5 transition-all">
            Talk to Optimization Expert
          </button>
        </div>
      </div>
    </section>
  );
}
