export default function Footer() {
  return (
    <footer className="bg-surface border-t border-outline-variant/30">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:flex lg:justify-between py-12 px-gutter max-w-container-max mx-auto">
        <div className="col-span-2 lg:w-1/3 mb-xl lg:mb-0">
          <div className="text-h3 font-black text-on-surface mb-md tracking-tighter uppercase">
            AI Spend Auditor
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant max-w-xs font-medium">
            Precision spend management and optimization for AI-first organizations.
          </p>
        </div>

        <div className="space-y-sm">
          <p className="text-label-caps font-black text-on-surface mb-md">
            Product
          </p>
          <a
            className="block font-body-sm text-body-sm text-on-surface-variant font-semibold hover:text-primary"
            href="#"
          >
            Pricing
          </a>
          <a
            className="block font-body-sm text-body-sm text-on-surface-variant font-semibold hover:text-primary"
            href="#"
          >
            Security
          </a>
        </div>

        <div className="space-y-sm">
          <p className="text-label-caps font-black text-on-surface mb-md">
            Legal
          </p>
          <a
            className="block font-body-sm text-body-sm text-on-surface-variant font-semibold hover:text-primary"
            href="#"
          >
            Privacy Policy
          </a>
          <a
            className="block font-body-sm text-body-sm text-on-surface-variant font-semibold hover:text-primary"
            href="#"
          >
            Terms of Service
          </a>
        </div>

        <div className="space-y-sm">
          <p className="text-label-caps font-black text-on-surface mb-md">
            Support
          </p>
          <a
            className="block font-body-sm text-body-sm text-on-surface-variant font-semibold hover:text-primary"
            href="#"
          >
            Contact
          </a>
          <a
            className="block font-body-sm text-body-sm text-on-surface-variant font-semibold hover:text-primary"
            href="#"
          >
            Docs
          </a>
        </div>
      </div>

      <div className="border-t border-outline-variant/10 py-lg px-gutter max-w-container-max mx-auto flex flex-col md:flex-row justify-between items-center gap-md">
        <p className="font-body-sm text-body-sm text-on-surface-variant font-bold">
          © 2024 AI Spend Auditor. Institutional Grade Efficiency.
        </p>
        <div className="flex gap-lg">
          <span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-primary">
            language
          </span>
          <span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-primary">
            share
          </span>
        </div>
      </div>
    </footer>
  );
}
