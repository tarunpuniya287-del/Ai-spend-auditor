export default function SupportedTools() {
  const tools = [
    {
      name: "OpenAI",
      logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuDjnoFxOjoXtjmrAMyak0hz_eSXV4lCSF3LOHazB1DLgNECBnxtPqfopSEt_UW9_UZDAfwsV5vyePdqQjf71HLoYjv2Ro_vXJ2v__eE_7p5guuIXI8QAMUeEktVx0BiM3ZYCf35luO9lz0acBU_kFGhgbcx5U9MkpuTeUdxxnE8Vj-e8v3c24ucydjgs-A8u12ViAN47Sil4fgV8NfHH8Pandmgd0hYKZkp8q-b5959zxZO7IBc-uZq4xmvkLEnZ2ZY5t56D-gYZdQ",
    },
    {
      name: "Anthropic",
      logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuA70SN_fYAC8-x2sbsAZV9CeUxbjrLxYzgoP_8-IobpOx3BOUTPhv9_SCYpUq8TPr_bLsqwARUxqO9pQBrtA2pB5YxBhj-EapdfaCaP22SQKCshKDTtK-m4Jr8XsmT3RTCb1yxIVedPFwPZGw3AgR6hm2XWowT-KpNfTTvz6fDiPpeAgQYZ2md5blgAPtq6izqdtU9K7bi39yoWbkXyFNKAcI8hraZD07lXvk8YhDn0zapJ-KqWhK4U6ijSTPKf5xmBvNKbSOarKsU",
    },
    {
      name: "Cursor",
      logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuAItamhnIo0e45XHp9gprexFgB9xN1cVSPEqQ5gF-sjbY74tIyPj8DOQmLPb6nFR1nlfLhtROAbAAdTwf8QXIzqH5HzcIm-Iko_9dx64sZGr1xq4nfP4RUDEQ8eOb8PgI44jhwN-_8wg3EgkrjLoByb8QWFchLg4Q1Z7CMjM6JyZAfmdQ59ZzzE9Y0ME0qQAyMTZHfkUrrFasRs-xk-ic6KPOBXitHLMoya2qJ5L8RRyk1s_wk4Ozdusdu_zxnG9DsKqxEhShPx0c0",
    },
    {
      name: "GitHub",
      logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuCEdIwejCtxsQg2zLTNH4UwddusNP4_QXhthlMxEaHdeoOQ-E1l8sXVYdVjHLSKiNqO4rvtgJcOstYVL4WUuBkGfYQZCw9gElGSPGVlM0pev6TK6K8p9jxVDfjnmJY7AIQw8JIyV_P2K2-vdz6nwIHgPPM5KYUqx593RzqCP3pwj7loGLbJVogrbi7cO7wZ_ZW7dgg7z56gjFQXVYgZQuGZEwsMwpt60vfEwTE0N0MHMHMGmOvqLTICjAYuoW9sob-odeGFZlbC7D0",
    },
    {
      name: "Gemini",
      logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuBD8v9Qfli5_l7yMFOG1-0MYTUXsUU8fAlvn9x9UcebmUjY0-KadFaeRn3qKkkS6LkLrlAyE6T1KT5jTAr7O7JCE7L2BZgM8mq7ACyqk1BdWDG1Nb0J7I5eBVTTQrFtmYiecfsR36GrJ_u56yxqsD-YwJtBeAAnEj_F5vH-2H74GXHn09EjCA10ug8MWU8d5AW0tExIITPOc4VHpLYdQ6GDqm1duASKRY9Z9g-y3ARng0FafTgE6F5dTwqT41YUgpMJEQXYQUu955M",
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
