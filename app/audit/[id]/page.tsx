"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AuditResults from "@/components/AuditResults";
import { AuditReport } from "@/lib/audit/generate-audit";
import { getAuditReport } from "@/lib/storage";

export default function AuditPage() {
  const params = useParams();
  const router = useRouter();
  const auditId = params.id as string;

  const [report, setReport] = useState<AuditReport | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!auditId) {
      setError("No audit ID provided");
      setIsLoading(false);
      return;
    }

    try {
      const storedReport = getAuditReport(auditId);
      if (storedReport) {
        setReport(storedReport);
      } else {
        setError("Audit report not found. It may have been cleared from your browser.");
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to load audit report";
      setError(errorMessage);
      console.error("Error loading audit report:", err);
    } finally {
      setIsLoading(false);
    }
  }, [auditId]);

  const handleReset = () => {
    router.push("/");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-on-surface flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-on-surface-variant">Loading audit report...</p>
        </div>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="min-h-screen bg-background text-on-surface">
        <Navigation />
        <main className="pt-16 pb-32">
          <section className="py-32 px-gutter">
            <div className="max-w-container-max mx-auto">
              <div className="bg-red-50 border border-red-200 rounded-lg p-3xl text-center space-y-lg">
                <span className="material-symbols-outlined text-6xl text-red-600 block">
                  error
                </span>
                <div>
                  <h2 className="font-h2 font-bold text-red-900 mb-md">
                    Unable to Load Audit Report
                  </h2>
                  <p className="text-body-sm text-red-800 mb-2xl">
                    {error || "The audit report could not be found."}
                  </p>
                </div>
                <button
                  onClick={handleReset}
                  className="inline-block bg-primary text-on-primary font-bold py-lg px-2xl rounded hover:brightness-110 transition-all"
                >
                  Return to Home
                </button>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-on-surface">
      <Navigation />
      <main className="pt-16 pb-32">
        <section className="py-32 px-gutter bg-surface-container-low border-b border-outline-variant/20">
          <div className="max-w-container-max mx-auto">
            <AuditResults report={report} onReset={handleReset} />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
