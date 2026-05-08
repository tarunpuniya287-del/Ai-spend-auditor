export default function SupportedTools() {
  const tools = [
    {
      name: "ChatGPT",
      logo: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
    },
    {
      name: "Claude",
      logo: "https://www.anthropic.com/favicon.ico",
    },
    {
      name: "Cursor",
      logo: "https://cursor.sh/favicon.ico",
    },
    {
      name: "GitHub Copilot",
      logo: "https://github.com/favicon.ico",
    },
    {
      name: "Gemini",
      logo: "https://www.google.com/favicon.ico",
    },
  ];

  return (
    <section id="tools" className="py-12 bg-surface-container-low border-y border-outline-variant/20">
      <div className="max-w-container-max mx-auto px-gutter">
        <p className="text-label-caps font-bold text-on-surface-variant mb-lg text-center tracking-[0.2em]">
          WORKS WITH THE TOOLS YOUR TEAM ALREADY USES
        </p>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-md">
          {tools.map((tool) => (
            <div
              key={tool.name}
              className="bg-surface-container-lowest p-md border border-outline-variant/30 rounded flex items-center justify-center gap-sm hover:border-primary transition-colors cursor-default"
            >
              <img
                alt={tool.name}
                className="h-6 w-auto grayscale"
                src={tool.logo}
              />
              <span className="font-bold text-sm">{tool.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
