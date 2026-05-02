import { useGetDisputes } from "@workspace/api-client-react";
import { Layout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "wouter";
import { ShieldAlert, Plus, ArrowRight, Clock, CheckCircle2, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Disputes() {
  const { data, isLoading } = useGetDisputes();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified': case 'updated': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'removed': return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case 'under_investigation': return <Clock className="w-4 h-4 text-blue-500" />;
      default: return <Clock className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'removed': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'under_investigation': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'verified': return 'bg-destructive/10 text-destructive border-destructive/20';
      default: return 'bg-muted/50 text-muted-foreground border-border/50';
    }
  };

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              <ShieldAlert className="w-8 h-8 text-primary" />
              Disputes
            </h1>
            <p className="text-muted-foreground mt-1">Track and manage your credit repair pipeline.</p>
          </div>
          <Link href="/disputes/new">
            <Button className="bg-primary shadow-lg shadow-primary/20">
              <Plus className="w-4 h-4 mr-2" />
              New Dispute
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            Array(4).fill(0).map((_, i) => (
              <Skeleton key={i} className="h-48 w-full rounded-2xl" />
            ))
          ) : data?.disputes && data.disputes.length > 0 ? (
            data.disputes.map((dispute) => (
              <Card key={dispute.id} className="border-border/50 bg-card/60 backdrop-blur-xl shadow-lg hover:shadow-primary/5 transition-all flex flex-col">
                <CardHeader className="pb-3 flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline" className={`${getStatusColor(dispute.status)} flex items-center gap-1.5`}>
                      {getStatusIcon(dispute.status)}
                      <span className="capitalize">{dispute.status.replace('_', ' ')}</span>
                    </Badge>
                    <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                      {dispute.disputeType.replace('_', ' ')}
                    </span>
                  </div>
                  <CardTitle className="text-lg line-clamp-1">{dispute.creditorName || dispute.title}</CardTitle>
                  <CardDescription className="line-clamp-2 mt-1 text-xs">
                    {dispute.description || "No description provided."}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="border-t border-border/50 pt-4 flex items-center justify-between">
                    <div className="text-xs text-muted-foreground">
                      Updated: {new Date(dispute.updatedAt).toLocaleDateString()}
                    </div>
                    <Link href={`/disputes/${dispute.id}`}>
                      <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80 hover:bg-primary/10">
                        View Details <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full py-20 text-center border-2 border-dashed border-border/50 rounded-2xl bg-card/30">
              <ShieldAlert className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold mb-2">No active disputes</h3>
              <p className="text-muted-foreground max-w-md mx-auto mb-6">
                You haven't initiated any disputes yet. If you see inaccuracies on your report, start a dispute to begin the repair process.
              </p>
              <Link href="/disputes/new">
                <Button>Start First Dispute</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
