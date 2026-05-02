import { useGetEducationModules } from "@workspace/api-client-react";
import { Layout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "wouter";
import { BookOpen, PlayCircle, FileText, CheckCircle2, Clock, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function EducationHub() {
  const { data: modules, isLoading } = useGetEducationModules();

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'intermediate': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'advanced': return 'bg-red-500/10 text-red-500 border-red-500/20';
      default: return 'bg-muted/50 text-muted-foreground';
    }
  };

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <BookOpen className="w-8 h-8 text-primary" />
            Education Hub
          </h1>
          <p className="text-muted-foreground mt-1">Master the rules of credit, FCRA rights, and Metro 2 compliance.</p>
        </div>

        <Alert className="bg-muted/30 border-border/50 text-muted-foreground">
          <Info className="h-4 w-4" />
          <AlertDescription className="text-xs">
            Educational Use Only. Score Sculptor does not provide legal advice. The information here is for self-education to help you understand credit reporting laws.
          </AlertDescription>
        </Alert>

        <Card className="border-border/50 bg-primary/5 shadow-none border-primary/20">
          <CardContent className="p-6 flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1 space-y-2 w-full">
              <div className="flex justify-between text-sm font-medium">
                <span className="text-primary">Overall Progress</span>
                <span>12%</span>
              </div>
              <Progress value={12} className="h-2 bg-primary/10" />
            </div>
            <div className="flex-shrink-0 flex gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-primary">1</p>
                <p className="text-xs text-muted-foreground">Completed</p>
              </div>
              <div className="w-px bg-border/50" />
              <div>
                <p className="text-2xl font-bold">{modules?.length || 0}</p>
                <p className="text-xs text-muted-foreground">Total</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            Array(6).fill(0).map((_, i) => (
              <Card key={i} className="border-border/50 bg-card/60 backdrop-blur-xl">
                <CardHeader>
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-20 w-full" />
                </CardContent>
              </Card>
            ))
          ) : modules && modules.length > 0 ? (
            modules.map((mod) => (
              <Card key={mod.id} className="border-border/50 bg-card/60 backdrop-blur-xl shadow-lg hover:shadow-primary/5 transition-all flex flex-col h-full group">
                <CardHeader className="pb-3 flex-1">
                  <div className="flex justify-between items-start mb-3">
                    <Badge variant="outline" className={`${getDifficultyColor(mod.difficulty)} capitalize text-[10px]`}>
                      {mod.difficulty}
                    </Badge>
                    <div className="flex items-center text-xs text-muted-foreground font-medium">
                      <Clock className="w-3 h-3 mr-1" />
                      {mod.durationMinutes} min
                    </div>
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                    {mod.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2 mt-2 text-sm">
                    {mod.description}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="pt-4 border-t border-border/40 mt-auto flex justify-between items-center bg-muted/10 rounded-b-xl">
                  <div className="flex items-center text-xs text-muted-foreground font-medium uppercase tracking-wider">
                    {mod.contentType === 'video' ? <PlayCircle className="w-4 h-4 mr-1" /> : <FileText className="w-4 h-4 mr-1" />}
                    {mod.contentType}
                  </div>
                  <Link href={`/education/${mod.id}`}>
                    <Button size="sm" variant="secondary" className="bg-background/80 hover:bg-primary hover:text-primary-foreground transition-colors">
                      Start
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="col-span-full py-20 text-center text-muted-foreground">
              No education modules available.
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
