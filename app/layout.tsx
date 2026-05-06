import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Spend Auditor - High-Stakes Financial Optimization",
  description:
    "Analyze your ChatGPT, Claude, Cursor, Copilot, and Gemini costs to uncover unnecessary AI spend and optimization opportunities.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} light`}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              tailwind.config = {
                darkMode: "class",
                theme: {
                  extend: {
                    colors: {
                      primary: "#004ac6",
                      "surface-container": "#ededf9",
                      "inverse-surface": "#2e3039",
                      "on-surface-variant": "#434655",
                      "surface-dim": "#d9d9e5",
                      "surface-tint": "#0053db",
                      "on-tertiary-fixed-variant": "#7d2d00",
                      "surface-container-lowest": "#ffffff",
                      "on-primary-fixed-variant": "#003ea8",
                      "on-background": "#191b23",
                      "primary-container": "#2563eb",
                      "on-secondary-container": "#5c6274",
                      "surface-container-high": "#e7e7f3",
                      "on-tertiary-container": "#ffede6",
                      "on-primary-container": "#eeefff",
                      "on-error-container": "#93000a",
                      "tertiary-fixed-dim": "#ffb596",
                      "tertiary-container": "#bc4800",
                      "inverse-on-surface": "#f0f0fb",
                      outline: "#737686",
                      background: "#faf8ff",
                      "secondary-fixed": "#dce2f7",
                      "inverse-primary": "#b4c5ff",
                      "secondary-container": "#d9dff5",
                      "surface-container-low": "#f3f3fe",
                      "outline-variant": "#c3c6d7",
                      surface: "#faf8ff",
                      "primary-fixed-dim": "#b4c5ff",
                      "error-container": "#ffdad6",
                      error: "#ba1a1a",
                      "surface-bright": "#faf8ff",
                      "on-primary-fixed": "#00174b",
                      "on-secondary-fixed-variant": "#404758",
                      "on-secondary-fixed": "#141b2b",
                      "surface-container-highest": "#e1e2ed",
                      "on-error": "#ffffff",
                      "on-tertiary": "#ffffff",
                      "secondary-fixed-dim": "#c0c6db",
                      "surface-variant": "#e1e2ed",
                      "on-surface": "#191b23",
                      "on-tertiary-fixed": "#360f00",
                      "on-secondary": "#ffffff",
                      "tertiary-fixed": "#ffdbcd",
                      "primary-fixed": "#dbe1ff",
                      tertiary: "#943700",
                      secondary: "#575e70",
                      "on-primary": "#ffffff",
                    },
                    borderRadius: {
                      DEFAULT: "0.25rem",
                      lg: "0.5rem",
                      xl: "0.75rem",
                      full: "9999px",
                    },
                    spacing: {
                      xs: "4px",
                      "3xl": "64px",
                      md: "16px",
                      lg: "24px",
                      xl: "32px",
                      gutter: "24px",
                      sm: "8px",
                      unit: "4px",
                      "container-max": "1280px",
                      "2xl": "48px",
                    },
                    fontFamily: {
                      h1: ["Inter"],
                      h3: ["Inter"],
                      "body-base": ["Inter"],
                      display: ["Inter"],
                      "body-sm": ["Inter"],
                      code: ["Inter"],
                      h2: ["Inter"],
                      "label-caps": ["Inter"],
                    },
                    fontSize: {
                      h1: ["30px", { lineHeight: "1.3", letterSpacing: "-0.02em", fontWeight: "600" }],
                      h3: ["18px", { lineHeight: "1.4", letterSpacing: "0em", fontWeight: "600" }],
                      "body-base": ["16px", { lineHeight: "1.5", letterSpacing: "0.01em", fontWeight: "400" }],
                      display: ["36px", { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "700" }],
                      "body-sm": ["14px", { lineHeight: "1.5", letterSpacing: "0.01em", fontWeight: "400" }],
                      code: ["14px", { lineHeight: "1.4", letterSpacing: "0em", fontWeight: "450" }],
                      h2: ["24px", { lineHeight: "1.3", letterSpacing: "-0.01em", fontWeight: "600" }],
                      "label-caps": ["12px", { lineHeight: "1.2", letterSpacing: "0.05em", fontWeight: "600" }],
                    },
                  },
                },
              };
            `,
          }}
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
              .material-symbols-outlined {
                font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
              }
              body {
                font-family: 'Inter', sans-serif;
                background-color: #faf8ff;
                -webkit-font-smoothing: antialiased;
              }
            `,
          }}
        />
      </head>
      <body className="bg-background text-on-surface min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
