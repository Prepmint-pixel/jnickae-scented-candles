import { useGetEducationModule } from "@workspace/api-client-react";
import { Layout } from "@/components/layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useRoute } from "wouter";
import { ChevronLeft, Info, PlayCircle, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";

export default function EducationDetail() {
  const [, params] = useRoute("/education/:id");
  const moduleId = params?.id ? parseInt(params.id) : 0;

  const { data: mod, isLoading } = useGetEducationModule(moduleId, {
    query: { enabled: !!moduleId, queryKey: ['education-module', moduleId] }
  });

  if (isLoading) {
    return (
      <Layout>
        <Skeleton className="h-8 w-48 mb-8" />
        <Skeleton className="h-64 w-full mb-6" />
      </Layout>
    );
  }

  if (!mod) return <Layout>Module not found.</Layout>;

  return (
    <Layout>
      <div className="space-y-6 max-w-3xl mx-auto pb-20">
        <Link href="/education">
          <Button variant="ghost" size="sm" className="mb-2 -ml-3 text-muted-foreground">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Hub
          </Button>
        </Link>

        <div>
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 capitalize">
              {mod.category.replace('_', ' ')}
            </Badge>
            <span className="text-sm text-muted-foreground capitalize">• {mod.difficulty} • {mod.durationMinutes} min</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight">{mod.title}</h1>
          <p className="text-lg text-muted-foreground mt-4 leading-relaxed">{mod.description}</p>
        </div>

        <Alert className="bg-muted/30 border-border/50 text-muted-foreground">
          <Info className="h-4 w-4" />
          <AlertDescription className="text-xs">
            Educational Use Only. Score Sculptor does not provide legal advice.
          </AlertDescription>
        </Alert>

        {mod.contentType === 'video' && (
          <div className="aspect-video w-full bg-black rounded-2xl border border-border/50 overflow-hidden relative flex items-center justify-center group cursor-pointer">
            <div className="absolute inset-0 bg-muted/20" />
            <div className="w-20 h-20 rounded-full bg-primary/90 flex items-center justify-center text-white z-10 group-hover:scale-110 transition-transform shadow-xl shadow-primary/30">
              <PlayCircle className="w-10 h-10 ml-1" />
            </div>
            <p className="absolute bottom-4 right-4 text-xs text-white/50 bg-black/50 px-2 py-1 rounded">Video Placeholder</p>
          </div>
        )}

        <Card className="border-border/50 bg-card/60 backdrop-blur-xl shadow-lg mt-8">
          <CardContent className="p-8 prose prose-slate dark:prose-invert max-w-none prose-p:leading-relaxed prose-headings:text-foreground prose-a:text-primary">
            {mod.content ? (
              <div dangerouslySetInnerHTML={{ __html: mod.content }} />
            ) : (
              <div className="space-y-4">
                <h3>Understanding the Basics</h3>
                <p>The Fair Credit Reporting Act (FCRA) promotes the accuracy, fairness, and privacy of information in the files of consumer reporting agencies.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                <h4>Key Takeaways</h4>
                <ul>
                  <li>You have the right to know what is in your file.</li>
                  <li>You have the right to ask for a credit score.</li>
                  <li>You have the right to dispute incomplete or inaccurate information.</li>
                </ul>
              </div>
            )}
          </CardContent>
        </Card>

        <Separator className="my-8 bg-border/50" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-muted/20 p-6 rounded-2xl border border-border/50">
          <div>
            <h3 className="font-semibold text-lg">Finished this module?</h3>
            <p className="text-sm text-muted-foreground mt-1">Mark as complete to track your progress.</p>
          </div>
          <Button className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-500/20">
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Mark Complete
          </Button>
        </div>
      </div>
    </Layout>
  );
}
