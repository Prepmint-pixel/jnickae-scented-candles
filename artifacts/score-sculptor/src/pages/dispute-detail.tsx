import { useGetDispute } from "@workspace/api-client-react";
import { Layout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useRoute } from "wouter";
import { ChevronLeft, Info, Calendar, Building, Hash, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";

export default function DisputeDetail() {
  const [, params] = useRoute("/disputes/:id");
  const disputeId = params?.id ? parseInt(params.id) : 0;

  const { data: dispute, isLoading } = useGetDispute(disputeId, {
    query: { enabled: !!disputeId, queryKey: ['dispute', disputeId] }
  });

  if (isLoading) {
    return (
      <Layout>
        <Skeleton className="h-8 w-48 mb-8" />
        <Skeleton className="h-64 w-full mb-6" />
        <Skeleton className="h-96 w-full" />
      </Layout>
    );
  }

  if (!dispute) return <Layout>Dispute not found.</Layout>;

  return (
    <Layout>
      <div className="space-y-6 max-w-4xl mx-auto">
        <Link href="/disputes">
          <Button variant="ghost" size="sm" className="mb-2 -ml-3 text-muted-foreground">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Disputes
          </Button>
        </Link>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Badge className="bg-primary/10 text-primary border-primary/20 capitalize">
                {dispute.status.replace('_', ' ')}
              </Badge>
              <span className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                {dispute.disputeType.replace('_', ' ')}
              </span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight">{dispute.title}</h1>
          </div>
          {dispute.dueDate && (
            <div className="flex items-center gap-2 text-sm bg-muted/50 px-3 py-1.5 rounded-lg border border-border/50">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span>Due: <span className="font-semibold text-foreground">{new Date(dispute.dueDate).toLocaleDateString()}</span></span>
            </div>
          )}
        </div>

        <Alert className="bg-muted/30 border-border/50 text-muted-foreground mb-6">
          <Info className="h-4 w-4" />
          <AlertDescription className="text-xs">
            Educational Use Only. Score Sculptor does not provide legal advice. Keep physical copies of all correspondence sent via certified mail.
          </AlertDescription>
        </Alert>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-1 space-y-6">
            <Card className="border-border/50 bg-card/60 backdrop-blur-xl shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {dispute.creditorName && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1"><Building className="w-3 h-3" /> Creditor</p>
                    <p className="font-medium text-sm">{dispute.creditorName}</p>
                  </div>
                )}
                {dispute.accountNumber && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1"><Hash className="w-3 h-3" /> Account Number</p>
                    <p className="font-medium text-sm font-mono">{dispute.accountNumber}</p>
                  </div>
                )}
                {dispute.bureau && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Target Bureau</p>
                    <p className="font-medium text-sm">{dispute.bureau}</p>
                  </div>
                )}
                <Separator className="bg-border/50" />
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Reason</p>
                  <p className="font-medium text-sm italic text-muted-foreground">"{dispute.reason || dispute.description}"</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2">
            <Card className="border-border/50 bg-card/60 backdrop-blur-xl shadow-lg h-full">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  Generated Letter
                </CardTitle>
                <Button variant="outline" size="sm">Download PDF</Button>
              </CardHeader>
              <CardContent>
                <div className="bg-background/50 border border-border/50 rounded-lg p-6 font-serif text-sm leading-relaxed text-foreground/80 whitespace-pre-wrap min-h-[400px]">
                  {dispute.templateContent || "No template content generated for this dispute."}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
