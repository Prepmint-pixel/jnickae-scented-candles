import { useGetCreditReports, useCreateCreditReport } from "@workspace/api-client-react";
import { Layout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "wouter";
import { FileText, Upload, AlertTriangle, CheckCircle2, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Reports() {
  const { data, isLoading } = useGetCreditReports();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'analyzed': return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case 'analyzing': return <Clock className="w-4 h-4 text-blue-500 animate-spin" />;
      case 'error': return <AlertTriangle className="w-4 h-4 text-destructive" />;
      default: return <Upload className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'analyzed': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'analyzing': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'error': return 'bg-destructive/10 text-destructive border-destructive/20';
      default: return 'bg-muted/50 text-muted-foreground border-border/50';
    }
  };

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              <FileText className="w-8 h-8 text-primary" />
              Credit Reports
            </h1>
            <p className="text-muted-foreground mt-1">Upload and analyze your credit reports from all three bureaus.</p>
          </div>
          <Button className="bg-primary shadow-lg shadow-primary/20">
            <Upload className="w-4 h-4 mr-2" />
            Upload Report
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
          ) : data?.reports && data.reports.length > 0 ? (
            data.reports.map((report) => (
              <Card key={report.id} className="border-border/50 bg-card/60 backdrop-blur-xl shadow-lg hover:shadow-primary/5 transition-all">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline" className={`${getStatusColor(report.status)} flex items-center gap-1.5`}>
                      {getStatusIcon(report.status)}
                      <span className="capitalize">{report.status}</span>
                    </Badge>
                    <span className="text-2xl font-bold text-primary">{report.creditScore || '---'}</span>
                  </div>
                  <CardTitle className="text-lg truncate">{report.bureau} Report</CardTitle>
                  <CardDescription>
                    {new Date(report.reportDate || report.createdAt).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm p-3 bg-muted/30 rounded-lg">
                      <span className="text-muted-foreground">Inconsistencies</span>
                      <span className={`font-semibold ${report.inconsistenciesCount && report.inconsistenciesCount > 0 ? 'text-destructive' : 'text-green-500'}`}>
                        {report.inconsistenciesCount || 0} Found
                      </span>
                    </div>
                    <Link href={`/reports/${report.id}`}>
                      <Button variant="outline" className="w-full bg-background/50">
                        View Analysis
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full py-20 text-center border-2 border-dashed border-border/50 rounded-2xl bg-card/30">
              <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold mb-2">No reports yet</h3>
              <p className="text-muted-foreground max-w-md mx-auto mb-6">
                Upload your first credit report (Equifax, Experian, or TransUnion) to get deep AI analysis of your tradelines.
              </p>
              <Button>Upload Now</Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
