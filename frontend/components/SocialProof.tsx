export default function SocialProof() {
  const testimonials = [
    {
      company: "VERIDANT",
      quote:
        "Average audit identified: 18% unused AI spend, 2 overlapping subscriptions, $340/month savings in first 48 hours.",
      author: "SARAH JENKINS",
      role: "CTO at Veridant Systems",
    },
    {
      company: "FINFLOW",
      quote:
        "Recovered $12,400 in annual recurring costs by consolidating GitHub Copilot and Cursor licenses into a unified plan.",
      author: "MARCUS CHEN",
      role: "Head of Ops at FinFlow",
    },
  ];

  return (
    <section className="py-24 px-gutter">
      <div className="max-w-container-max mx-auto">
        <div className="grid lg:grid-cols-3 gap-xl">
          <div className="lg:col-span-1 space-y-md">
            <p className="text-label-caps font-black text-primary tracking-[0.1em]">
              ROI METRICS
            </p>
            <h2 className="font-h1 text-[32px] font-black leading-tight">
              Data-Driven Savings Portfolio
            </h2>
            <div className="pt-lg">
              <p className="text-[64px] font-black text-primary leading-none tracking-tighter">
                24%
              </p>
              <p className="font-body-base text-body-base text-on-surface-variant font-semibold">
                Avg. reduction in monthly AI op-ex.
              </p>
            </div>
          </div>

          <div className="lg:col-span-2 grid md:grid-cols-2 gap-lg">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="p-lg border-2 border-outline-variant/30 rounded-lg bg-surface space-y-md"
              >
                <div className="flex items-center justify-between">
                  <span className="bg-primary/10 text-primary px-sm py-xs rounded text-[10px] font-black">
                    CASE STUDY: {testimonial.company}
                  </span>
                  <div className="flex gap-1 text-primary">
                    {[...Array(3)].map((_, i) => (
                      <span
                        key={i}
                        className="material-symbols-outlined text-[14px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                    ))}
                  </div>
                </div>
                <p className="font-body-sm text-on-surface font-bold">
                  "{testimonial.quote}"
                </p>
                <div>
                  <p className="text-xs font-black text-on-surface">
                    {testimonial.author}
                  </p>
                  <p className="text-[10px] text-outline font-bold uppercase tracking-wider">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
