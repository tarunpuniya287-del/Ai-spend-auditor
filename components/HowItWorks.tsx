export default function HowItWorks() {
  const steps = [
    {
      number: "1",
      title: "Enter your AI subscriptions",
      description:
        "Securely connect your tool accounts or upload billing data to map your entire footprint.",
    },
    {
      number: "2",
      title: "Identify waste and overlapping tools",
      description:
        "Our engine scans for ghost seats and features that overlap between different paid platforms.",
    },
    {
      number: "3",
      title: "Reduce monthly AI costs",
      description:
        "Execute actionable recommendations to cut spend immediately. Average reduction is 24% per audit.",
    },
  ];

  return (
    <section id="how-it-works" className="py-24 px-gutter">
      <div className="max-w-container-max mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-h1 text-h1 font-black mb-md">
            Maximize Capital Efficiency
          </h2>
          <p className="font-body-base text-body-base text-on-surface-variant font-medium">
            Our platform identifies waste across your entire AI operational stack with precision auditing.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-lg">
          {steps.map((step) => (
            <div
              key={step.number}
              className="p-xl bg-surface border border-outline-variant/50 rounded shadow-sm hover:border-primary transition-all group"
            >
              <div className="w-12 h-12 bg-primary text-on-primary rounded flex items-center justify-center mb-lg font-bold text-xl">
                {step.number}
              </div>
              <h3 className="font-h3 text-h3 font-bold mb-sm">{step.title}</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
