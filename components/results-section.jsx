"use client";

import { AlertCircle, CheckCircle2, AlertTriangle, FileText } from 'lucide-react';

export default function ResultsSection({ results }) {
  const getRiskColor = (score) => {
    if (score >= 75) return "from-destructive to-red-600";
    if (score >= 50) return "from-yellow-500 to-orange-500";
    return "from-accent to-green-500";
  };

  if (!results) return null;

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div className="bg-card rounded-xl p-6 shadow-sm border border-border/20">
            <h3 className="text-lg font-medium mb-4">Analysis Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-background p-4 rounded-lg border border-border/20">
                <p className="text-sm text-muted-foreground">Overall Risk</p>
                <div className={`mt-2 text-3xl font-bold bg-gradient-to-r ${getRiskColor(results.overallRiskScore)} bg-clip-text text-transparent`}>
                  {results.overallRiskScore}%
                </div>
                <p className="text-sm mt-1 text-muted-foreground">
                  {getRiskColor(results.overallRiskScore).includes('red') ? 'High Risk' : 
                   getRiskColor(results.overallRiskScore).includes('yellow') ? 'Medium Risk' : 'Low Risk'}
                </p>
              </div>
              
              <div className="bg-background p-4 rounded-lg border border-border/20">
                <p className="text-sm text-muted-foreground">Critical Issues</p>
                <div className="text-3xl font-bold text-red-500 mt-2">
                  {results.summary.criticalCount}
                </div>
                <p className="text-sm mt-1 text-muted-foreground">Needs immediate attention</p>
              </div>
              
              <div className="bg-background p-4 rounded-lg border border-border/20">
                <p className="text-sm text-muted-foreground">Warnings</p>
                <div className="text-3xl font-bold text-yellow-500 mt-2">
                  {results.summary.warningCount}
                </div>
                <p className="text-sm mt-1 text-muted-foreground">Review recommended</p>
              </div>
              
              <div className="bg-background p-4 rounded-lg border border-border/20">
                <p className="text-sm text-muted-foreground">Safe Clauses</p>
                <div className="text-3xl font-bold text-green-500 mt-2">
                  {results.summary.safeCount}
                </div>
                <p className="text-sm mt-1 text-muted-foreground">No issues found</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}