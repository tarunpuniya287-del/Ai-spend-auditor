"use client";

import { useState } from "react";

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-surface/95 backdrop-blur-md border-b border-outline-variant/30">
      <div className="flex items-center justify-between h-16 px-gutter max-w-container-max mx-auto">
        <div className="text-h3 font-h3 font-extrabold text-on-surface tracking-tight uppercase">
          AI Spend Auditor
        </div>
        
        <nav className="hidden md:flex items-center gap-xl">
          <a
            className="font-body-sm text-body-sm font-semibold text-on-surface hover:text-primary transition-colors"
            href="#how-it-works"
          >
            How It Works
          </a>
          <a
            className="font-body-sm text-body-sm font-semibold text-on-surface hover:text-primary transition-colors"
            href="#tools"
          >
            Supported Tools
          </a>
          <a
            className="font-body-sm text-body-sm font-semibold text-on-surface hover:text-primary transition-colors"
            href="#faq"
          >
            FAQ
          </a>
        </nav>

        <div className="flex items-center gap-md">
          <button className="bg-primary text-on-primary font-body-sm text-body-sm font-bold px-lg py-sm rounded active:scale-95 transition-all">
            Run Audit
          </button>
        </div>
      </div>
    </header>
  );
}
