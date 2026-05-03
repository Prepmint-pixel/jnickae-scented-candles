import { useGetCreditReports } from "@workspace/api-client-react";
import { Layout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "wouter";
import {
  FileText, Upload, AlertTriangle, CheckCircle2, Clock,
  ShieldAlert, TrendingDown, X, ChevronDown, ChevronUp,
  Sparkles, ArrowRight, CircleAlert, Info, Star
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { useState, useRef, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface DisputeStrategy {
  method: string;
  fcraSection: string | null;
  letterType: string | null;
  steps: string[];
  successLikelihood: "high" | "medium" | "low";
  rationale: string;
}

interface NegativeItem {
  id: string;
  creditorName: string;
  accountType: string;
  issueType: string;
  balance: string | null;
  dateOpened: string | null;
  severity: "critical" | "high" | "medium" | "low";
  impact: string;
  disputeStrategy: DisputeStrategy;
}

interface AnalysisResult {
  bureau: string;
  creditScore: number | null;
  reportDate: string | null;
  summary: string;
  negativeItems: NegativeItem[];
  positiveFactors: string[];
  recommendations: string[];
  estimatedScoreImpact: string;
}

export default function Reports() {
  const { data, isLoading, refetch } = useGetCreditReports();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [uploadOpen, setUploadOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadState, setUploadState] = useState<"idle" | "uploading" | "analyzing" | "done" | "error">("idle");
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [streamBuffer, setStreamBuffer] = useState("");
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "analyzed": return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case "analyzing": return <Clock className="w-4 h-4 text-blue-500 animate-spin" />;
      case "error": return <AlertTriangle className="w-4 h-4 text-destructive" />;
      default: return <Upload className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "analyzed": return "bg-green-500/10 text-green-500 border-green-500/20";
      case "analyzing": return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "error": return "bg-destructive/10 text-destructive border-destructive/20";
      default: return "bg-muted/50 text-muted-foreground border-border/50";
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "bg-red-500/15 text-red-500 border-red-500/30";
      case "high": return "bg-orange-500/15 text-orange-500 border-orange-500/30";
      case "medium": return "bg-yellow-500/15 text-yellow-500 border-yellow-500/30";
      default: return "bg-muted/50 text-muted-foreground border-border/50";
    }
  };

  const getLikelihoodColor = (l: string) => {
    switch (l) {
      case "high": return "text-green-500";
      case "medium": return "text-yellow-500";
      default: return "text-destructive";
    }
  };

  const toggleItem = (id: string) => {
    setExpandedItems(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleFile = useCallback((file: File) => {
    if (!file.name.endsWith(".pdf") && file.type !== "application/pdf") {
      toast({ title: "Invalid file type", description: "Please upload a PDF credit report.", variant: "destructive" });
      return;
    }
    if (file.size > 20 * 1024 * 1024) {
      toast({ title: "File too large", description: "Max file size is 20 MB.", variant: "destructive" });
      return;
    }
    setSelectedFile(file);
    setUploadState("idle");
    setAnalysisResult(null);
    setStreamBuffer("");
  }, [toast]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleAnalyze = async () => {
    if (!selectedFile) return;
    const token = localStorage.getItem("ss_token");
    if (!token) { toast({ title: "Not authenticated", variant: "destructive" }); return; }

    setUploadState("uploading");
    setStreamBuffer("");
    setAnalysisResult(null);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("/api/credit-reports/analyze", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.error || "Upload failed");
      }

      setUploadState("analyzing");

      const reader = response.body!.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let fullJson = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          try {
            const evt = JSON.parse(line.slice(6));
            if (evt.status === "analyzing") {
              setUploadState("analyzing");
            } else if (evt.chunk) {
              fullJson += evt.chunk;
              setStreamBuffer(fullJson);
            } else if (evt.done && evt.report) {
              const ad = evt.report.analysisData as AnalysisResult | null;
              if (ad && !ad.parseError) {
                setAnalysisResult(ad);
              }
              setUploadState("done");
              refetch();
            } else if (evt.error) {
              throw new Error(evt.error);
            }
          } catch (_e) {
            // skip parse errors on partial chunks
          }
        }
      }

      if (uploadState !== "done") setUploadState("done");
    } catch (err: unknown) {
      setUploadState("error");
      toast({
        title: "Analysis failed",
        description: err instanceof Error ? err.message : "Please try again.",
        variant: "destructive",
      });
    }
  };

  const resetUpload = () => {
    setSelectedFile(null);
    setUploadState("idle");
    setAnalysisResult(null);
    setStreamBuffer("");
    setExpandedItems(new Set());
  };

  const reports = Array.isArray(data) ? data : [];

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              <FileText className="w-8 h-8 text-primary" />
              Credit Reports
            </h1>
            <p className="text-muted-foreground mt-1">
              Upload your credit reports from all three bureaus for AI-powered analysis.
            </p>
          </div>
          <Button
            className="bg-primary shadow-lg shadow-primary/20"
            onClick={() => { resetUpload(); setUploadOpen(true); }}
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Upload &amp; Analyze
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            Array(3).fill(0).map((_, i) => (
              <Card key={i} className="border-border/50 bg-card/60 backdrop-blur-xl">
                <CardHeader>
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-20 w-full mb-4" />
                  <Skeleton className="h-10 w-full" />
                </CardContent>
              </Card>
            ))
          ) : reports.length > 0 ? (
            reports.map((report) => (
              <motion.div
                key={report.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="border-border/50 bg-card/60 backdrop-blur-xl shadow-lg hover:shadow-primary/5 transition-all h-full flex flex-col">
                  <CardHeader className="pb-3 flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="outline" className={`${getStatusColor(report.status)} flex items-center gap-1.5`}>
                        {getStatusIcon(report.status)}
                        <span className="capitalize">{report.status}</span>
                      </Badge>
                      <span className="text-2xl font-bold text-primary">{report.creditScore || "---"}</span>
                    </div>
                    <CardTitle className="text-lg truncate">
                      {report.bureau ? `${report.bureau} Report` : report.fileName}
                    </CardTitle>
                    <CardDescription>
                      {new Date(report.reportDate || report.createdAt).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm p-3 bg-muted/30 rounded-lg">
                        <span className="text-muted-foreground">Negative Items</span>
                        <span className={`font-semibold ${report.inconsistenciesCount && report.inconsistenciesCount > 0 ? "text-destructive" : "text-green-500"}`}>
                          {report.inconsistenciesCount || 0} Found
                        </span>
                      </div>
                      {report.status === "analyzed" ? (
                        <Link href={`/reports/${report.id}`}>
                          <Button variant="outline" className="w-full bg-background/50">
                            View Full Analysis
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </Link>
                      ) : (
                        <Button variant="outline" className="w-full bg-background/50" disabled>
                          {report.status === "analyzing" ? "Analyzing..." : "No Analysis Yet"}
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center border-2 border-dashed border-border/50 rounded-2xl bg-card/30">
              <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold mb-2">No reports yet</h3>
              <p className="text-muted-foreground max-w-md mx-auto mb-6">
                Upload your Equifax, Experian, or TransUnion credit report to get deep AI analysis of your tradelines and personalized dispute strategies.
              </p>
              <Button onClick={() => { resetUpload(); setUploadOpen(true); }}>
                <Sparkles className="w-4 h-4 mr-2" />
                Upload &amp; Analyze Now
              </Button>
            </div>
          )}
        </div>
      </div>

      <Dialog open={uploadOpen} onOpenChange={(o) => { if (!o) resetUpload(); setUploadOpen(o); }}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-card border-border/50 backdrop-blur-xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <Sparkles className="w-5 h-5 text-primary" />
              AI Credit Report Analyzer
            </DialogTitle>
            <DialogDescription>
              Upload your credit report PDF and Sculpt AI will identify every negative item with tailored dispute strategies.
            </DialogDescription>
          </DialogHeader>

          {(uploadState === "idle" || uploadState === "error") && (
            <div className="space-y-4">
              <div
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={cn(
                  "border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all",
                  isDragging
                    ? "border-primary bg-primary/10"
                    : selectedFile
                    ? "border-green-500/50 bg-green-500/5"
                    : "border-border/50 bg-muted/20 hover:bg-muted/40 hover:border-primary/50"
                )}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,application/pdf"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                />
                {selectedFile ? (
                  <div className="flex items-center justify-center gap-3">
                    <FileText className="w-10 h-10 text-green-500" />
                    <div className="text-left">
                      <p className="font-semibold text-green-400">{selectedFile.name}</p>
                      <p className="text-sm text-muted-foreground">{(selectedFile.size / 1024).toFixed(0)} KB — Ready to analyze</p>
                    </div>
                  </div>
                ) : (
                  <>
                    <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-3 opacity-50" />
                    <p className="text-base font-medium mb-1">Drop your credit report PDF here</p>
                    <p className="text-sm text-muted-foreground">or click to browse — Equifax, Experian, TransUnion accepted</p>
                    <p className="text-xs text-muted-foreground/60 mt-2">Max 20 MB · PDF only</p>
                  </>
                )}
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => { resetUpload(); setUploadOpen(false); }}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 bg-primary shadow-lg shadow-primary/20"
                  disabled={!selectedFile}
                  onClick={handleAnalyze}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Analyze with AI
                </Button>
              </div>
            </div>
          )}

          {uploadState === "uploading" && (
            <div className="py-10 text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Upload className="w-8 h-8 text-primary animate-pulse" />
              </div>
              <p className="font-semibold">Uploading report…</p>
              <Progress value={undefined} className="h-2 mx-auto max-w-xs" />
            </div>
          )}

          {uploadState === "analyzing" && (
            <div className="space-y-4">
              <div className="py-6 text-center space-y-3">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Sparkles className="w-8 h-8 text-primary animate-pulse" />
                </div>
                <p className="font-semibold">Sculpt AI is analyzing your report…</p>
                <p className="text-sm text-muted-foreground">Identifying negative items and building dispute strategies</p>
              </div>
              {streamBuffer && (
                <div className="bg-muted/30 border border-border/40 rounded-xl p-4 max-h-40 overflow-y-auto">
                  <p className="text-xs font-mono text-muted-foreground whitespace-pre-wrap leading-relaxed">
                    {streamBuffer}
                    <span className="inline-block w-1.5 h-4 bg-primary animate-pulse ml-0.5 align-middle" />
                  </p>
                </div>
              )}
            </div>
          )}

          {uploadState === "done" && analysisResult && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-muted/30 rounded-xl p-3 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Bureau</p>
                  <p className="font-bold text-sm">{analysisResult.bureau || "—"}</p>
                </div>
                <div className="bg-muted/30 rounded-xl p-3 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Credit Score</p>
                  <p className="font-bold text-sm text-primary">{analysisResult.creditScore || "—"}</p>
                </div>
                <div className="bg-muted/30 rounded-xl p-3 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Negative Items</p>
                  <p className="font-bold text-sm text-destructive">{analysisResult.negativeItems.length}</p>
                </div>
                <div className="bg-muted/30 rounded-xl p-3 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Score Impact</p>
                  <p className="font-bold text-sm text-green-500 truncate" title={analysisResult.estimatedScoreImpact}>
                    {analysisResult.estimatedScoreImpact?.split(" ").slice(0, 2).join(" ")}
                  </p>
                </div>
              </div>

              <div className="bg-muted/20 border border-border/40 rounded-xl p-4">
                <p className="text-sm text-muted-foreground leading-relaxed">{analysisResult.summary}</p>
              </div>

              {analysisResult.negativeItems.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-semibold flex items-center gap-2">
                    <TrendingDown className="w-4 h-4 text-destructive" />
                    Negative Items &amp; Dispute Strategies
                  </h3>
                  {analysisResult.negativeItems.map((item, idx) => (
                    <motion.div
                      key={item.id || idx}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="border border-border/50 rounded-xl overflow-hidden"
                    >
                      <button
                        className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/20 transition-colors"
                        onClick={() => toggleItem(item.id || String(idx))}
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <CircleAlert className={cn("w-5 h-5 flex-shrink-0", {
                            "text-red-500": item.severity === "critical",
                            "text-orange-500": item.severity === "high",
                            "text-yellow-500": item.severity === "medium",
                            "text-muted-foreground": item.severity === "low",
                          })} />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-semibold text-sm truncate">{item.creditorName}</span>
                              <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${getSeverityColor(item.severity)}`}>
                                {item.severity}
                              </Badge>
                              <Badge variant="outline" className="text-[10px] px-1.5 py-0 bg-muted/50 text-muted-foreground border-border/40">
                                {item.issueType}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground mt-0.5 truncate">{item.impact}</p>
                          </div>
                        </div>
                        {expandedItems.has(item.id || String(idx))
                          ? <ChevronUp className="w-4 h-4 text-muted-foreground flex-shrink-0 ml-2" />
                          : <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0 ml-2" />
                        }
                      </button>

                      <AnimatePresence>
                        {expandedItems.has(item.id || String(idx)) && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="px-4 pb-4 space-y-4 border-t border-border/40 pt-4 bg-muted/10">
                              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                                {item.balance && (
                                  <div>
                                    <span className="text-muted-foreground">Balance</span>
                                    <p className="font-semibold">{item.balance}</p>
                                  </div>
                                )}
                                {item.dateOpened && (
                                  <div>
                                    <span className="text-muted-foreground">Opened</span>
                                    <p className="font-semibold">{item.dateOpened}</p>
                                  </div>
                                )}
                                <div>
                                  <span className="text-muted-foreground">Account Type</span>
                                  <p className="font-semibold">{item.accountType}</p>
                                </div>
                              </div>

                              <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 space-y-3">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <ShieldAlert className="w-4 h-4 text-primary" />
                                    <span className="text-sm font-semibold">Dispute Strategy</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    {item.disputeStrategy.fcraSection && (
                                      <Badge variant="outline" className="text-[10px] px-1.5 border-primary/30 text-primary">
                                        {item.disputeStrategy.fcraSection}
                                      </Badge>
                                    )}
                                    <span className={cn("text-xs font-semibold", getLikelihoodColor(item.disputeStrategy.successLikelihood))}>
                                      {item.disputeStrategy.successLikelihood} success
                                    </span>
                                  </div>
                                </div>

                                <div className="grid grid-cols-2 gap-2 text-xs">
                                  <div>
                                    <span className="text-muted-foreground">Method</span>
                                    <p className="font-medium">{item.disputeStrategy.method}</p>
                                  </div>
                                  {item.disputeStrategy.letterType && (
                                    <div>
                                      <span className="text-muted-foreground">Letter Type</span>
                                      <p className="font-medium">{item.disputeStrategy.letterType}</p>
                                    </div>
                                  )}
                                </div>

                                <p className="text-xs text-muted-foreground italic">{item.disputeStrategy.rationale}</p>

                                {item.disputeStrategy.steps.length > 0 && (
                                  <ol className="space-y-1">
                                    {item.disputeStrategy.steps.map((step, si) => (
                                      <li key={si} className="flex gap-2 text-xs">
                                        <span className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center flex-shrink-0 font-bold text-[10px]">{si + 1}</span>
                                        <span className="text-foreground/80 leading-relaxed">{step}</span>
                                      </li>
                                    ))}
                                  </ol>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              )}

              {analysisResult.positiveFactors.length > 0 && (
                <div className="space-y-2">
                  <h3 className="font-semibold flex items-center gap-2 text-green-500">
                    <Star className="w-4 h-4" />
                    Positive Factors
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {analysisResult.positiveFactors.map((f, i) => (
                      <Badge key={i} variant="outline" className="bg-green-500/10 text-green-400 border-green-500/30 text-xs">
                        {f}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {analysisResult.recommendations.length > 0 && (
                <div className="space-y-2">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Info className="w-4 h-4 text-primary" />
                    Recommendations
                  </h3>
                  <ul className="space-y-2">
                    {analysisResult.recommendations.map((r, i) => (
                      <li key={i} className="flex gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <p className="text-[11px] text-muted-foreground/60 text-center">
                *Educational Use Only. Score Sculptor does not provide legal advice.*
              </p>

              <div className="flex gap-3 pt-2">
                <Button variant="outline" className="flex-1" onClick={() => { resetUpload(); setUploadOpen(false); }}>
                  <X className="w-4 h-4 mr-2" />
                  Close
                </Button>
                <Button className="flex-1 bg-primary" onClick={() => { resetUpload(); }}>
                  <Upload className="w-4 h-4 mr-2" />
                  Analyze Another
                </Button>
              </div>
            </div>
          )}

          {uploadState === "done" && !analysisResult && (
            <div className="py-8 text-center space-y-4">
              <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto" />
              <p className="font-semibold">Report uploaded successfully!</p>
              <p className="text-sm text-muted-foreground">The analysis has been saved. View it from the reports list.</p>
              <Button onClick={() => { resetUpload(); setUploadOpen(false); }}>
                View Reports
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
