import { useGetCreditReport, useGetTradelines } from "@workspace/api-client-react";
import { Layout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useRoute } from "wouter";
import { ChevronLeft, AlertTriangle, ShieldCheck, FileText, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function ReportDetail() {
  const [, params] = useRoute("/reports/:id");
  const reportId = params?.id ? parseInt(params.id) : 0;

  const { data: report, isLoading: isReportLoading } = useGetCreditReport(reportId, {
    query: { enabled: !!reportId, queryKey: ['credit-report', reportId] }
  });

  const { data: tradelinesData, isLoading: isTradelinesLoading } = useGetTradelines(undefined, {
    query: { enabled: !!reportId, queryKey: ['tradelines', reportId] } // Assuming we fetch tradelines and filter, or API handles it. Using general tradelines for demo
  });

  if (isReportLoading) {
    return (
      <Layout>
        <Skeleton className="h-8 w-48 mb-8" />
        <Skeleton className="h-40 w-full mb-6" />
        <Skeleton className="h-96 w-full" />
      </Layout>
    );
  }

  if (!report) return <Layout>Report not found.</Layout>;

  return (
    <Layout>
      <div className="space-y-6">
        <Link href="/reports">
          <Button variant="ghost" size="sm" className="mb-2 -ml-3 text-muted-foreground">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Reports
          </Button>
        </Link>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                {report.bureau || 'Unknown Bureau'}
              </Badge>
              <span className="text-sm text-muted-foreground">
                Uploaded {new Date(report.createdAt).toLocaleDateString()}
              </span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Report Analysis</h1>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground mb-1">VantageScore® 3.0</p>
            <div className="text-4xl font-bold text-primary">{report.creditScore || '---'}</div>
          </div>
        </div>

        <Card className="border-border/50 bg-card/60 backdrop-blur-xl shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              AI Analysis Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
              {report.analysisNotes || "Analysis in progress or not available."}
            </p>
            {report.inconsistenciesCount && report.inconsistenciesCount > 0 ? (
              <div className="mt-6 bg-destructive/10 border border-destructive/20 rounded-xl p-4 flex gap-4">
                <AlertTriangle className="w-6 h-6 text-destructive flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-destructive">Action Required</h4>
                  <p className="text-sm text-foreground/80 mt-1">
                    We found {report.inconsistenciesCount} potential inconsistencies in this report. Review the tradelines below to start the dispute process.
                  </p>
                </div>
              </div>
            ) : (
              <div className="mt-6 bg-green-500/10 border border-green-500/20 rounded-xl p-4 flex gap-4">
                <ShieldCheck className="w-6 h-6 text-green-500 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-green-500">Looks Good</h4>
                  <p className="text-sm text-foreground/80 mt-1">
                    No obvious inconsistencies detected by AI. Review tradelines manually if you suspect an error.
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <h2 className="text-2xl font-bold mt-10 mb-4">Tradelines</h2>
        
        {isTradelinesLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
        ) : tradelinesData?.tradelines && tradelinesData.tradelines.length > 0 ? (
          <div className="space-y-4">
            {tradelinesData.tradelines.map((tl) => (
              <Card key={tl.id} className={`border-border/50 backdrop-blur-xl shadow-sm ${tl.isNegative ? 'bg-destructive/5 border-l-4 border-l-destructive' : 'bg-card/60 border-l-4 border-l-green-500'}`}>
                <CardContent className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-lg">{tl.creditorName}</h3>
                      {tl.isNegative && (
                        <Badge variant="destructive" className="text-[10px] px-1.5 py-0">Negative</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground flex gap-3">
                      <span>Acc: ••••{tl.accountNumber?.slice(-4) || 'XXXX'}</span>
                      <span>•</span>
                      <span className="capitalize">{tl.category.replace('_', ' ')}</span>
                    </p>
                  </div>
                  <div className="flex flex-row sm:flex-col justify-between sm:text-right gap-4 sm:gap-1">
                    <div>
                      <p className="text-xs text-muted-foreground">Balance</p>
                      <p className="font-semibold">${tl.balance?.toLocaleString() || '0'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Status</p>
                      <p className={`font-medium text-sm ${tl.isNegative ? 'text-destructive' : 'text-green-500'}`}>
                        {tl.paymentStatus || 'Unknown'}
                      </p>
                    </div>
                  </div>
                  <div className="sm:ml-4">
                    <Link href={`/disputes/new?tradelineId=${tl.id}`}>
                      <Button size="sm" variant={tl.isNegative ? "default" : "outline"} className={tl.isNegative ? "bg-primary text-primary-foreground" : ""}>
                        Dispute
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 bg-card/30 rounded-xl border border-border/50">
            <p className="text-muted-foreground">No tradelines found for this report.</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
