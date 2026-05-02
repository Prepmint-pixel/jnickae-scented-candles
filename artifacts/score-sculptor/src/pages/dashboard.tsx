import { useGetDashboardSummary, useGetDashboardActivity, useGetScoreHistory } from "@workspace/api-client-react";
import { Layout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { 
  TrendingUp, 
  ShieldAlert, 
  FileText, 
  MessageSquare,
  AlertTriangle,
  ArrowRight,
  Activity
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip,
  ResponsiveContainer 
} from 'recharts';

export default function Dashboard() {
  const { data: summary, isLoading: isSummaryLoading } = useGetDashboardSummary();
  const { data: activity, isLoading: isActivityLoading } = useGetDashboardActivity();
  const { data: history, isLoading: isHistoryLoading } = useGetScoreHistory();

  // Score circular gauge calculation
  const score = summary?.creditScore || 0;
  const scorePercentage = Math.min(Math.max((score - 300) / (850 - 300) * 100, 0), 100);
  const strokeDasharray = `${scorePercentage}, 100`;

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Mission Control</h1>
            <p className="text-muted-foreground mt-1">Your financial intelligence dashboard</p>
          </div>
          <div className="flex gap-3">
            <Link href="/disputes/new">
              <Button className="bg-primary shadow-lg shadow-primary/20">
                <ShieldAlert className="w-4 h-4 mr-2" />
                Start Dispute
              </Button>
            </Link>
            <Link href="/ai">
              <Button variant="outline" className="border-primary/20 bg-primary/5 hover:bg-primary/10">
                <MessageSquare className="w-4 h-4 mr-2 text-primary" />
                Ask Sculpt AI
              </Button>
            </Link>
          </div>
        </div>

        {/* Top Widgets Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Score Widget */}
          <Card className="md:col-span-1 border-border/50 bg-card/60 backdrop-blur-xl shadow-xl overflow-hidden relative">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/50 to-blue-400" />
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">VantageScore® 3.0</CardTitle>
            </CardHeader>
            <CardContent>
              {isSummaryLoading ? (
                <div className="h-48 flex items-center justify-center">
                  <Skeleton className="w-32 h-32 rounded-full" />
                </div>
              ) : (
                <div className="flex flex-col items-center py-4">
                  <div className="relative w-36 h-36">
                    <svg viewBox="0 0 36 36" className="w-36 h-36 -rotate-90">
                      <path
                        className="text-muted/30"
                        strokeWidth="3"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="text-primary transition-all duration-1000 ease-out"
                        strokeDasharray={strokeDasharray}
                        strokeWidth="3"
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-4xl font-bold tracking-tighter">{score}</span>
                      <span className={`text-xs font-semibold ${
                        summary?.scoreRating === 'Excellent' ? 'text-green-500' :
                        summary?.scoreRating === 'Good' ? 'text-blue-500' :
                        summary?.scoreRating === 'Fair' ? 'text-yellow-500' : 'text-red-500'
                      }`}>
                        {summary?.scoreRating}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <span className={summary?.scoreChange && summary.scoreChange >= 0 ? "text-green-500 flex items-center" : "text-red-500 flex items-center"}>
                      <TrendingUp className={`w-4 h-4 mr-1 ${summary?.scoreChange && summary.scoreChange < 0 ? "rotate-180" : ""}`} />
                      {Math.abs(summary?.scoreChange || 0)} pts
                    </span>
                    <span className="text-muted-foreground ml-2">since last update</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Stats Grid */}
          <div className="md:col-span-2 grid grid-cols-2 gap-4">
            <Card className="border-border/50 bg-card/60 backdrop-blur-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="bg-destructive/10 p-3 rounded-xl">
                    <AlertTriangle className="w-6 h-6 text-destructive" />
                  </div>
                  {isSummaryLoading ? <Skeleton className="w-12 h-8" /> : (
                    <span className="text-3xl font-bold">{summary?.negativeAccounts}</span>
                  )}
                </div>
                <div className="mt-4">
                  <h3 className="font-medium">Negative Items</h3>
                  <p className="text-sm text-muted-foreground mt-1">Impacting your score</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-border/50 bg-card/60 backdrop-blur-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="bg-primary/10 p-3 rounded-xl">
                    <ShieldAlert className="w-6 h-6 text-primary" />
                  </div>
                  {isSummaryLoading ? <Skeleton className="w-12 h-8" /> : (
                    <span className="text-3xl font-bold">{summary?.activeDisputes}</span>
                  )}
                </div>
                <div className="mt-4">
                  <h3 className="font-medium">Active Disputes</h3>
                  <p className="text-sm text-muted-foreground mt-1">Currently in progress</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/60 backdrop-blur-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="bg-purple-500/10 p-3 rounded-xl">
                    <Activity className="w-6 h-6 text-purple-500" />
                  </div>
                  {isSummaryLoading ? <Skeleton className="w-12 h-8" /> : (
                    <span className="text-3xl font-bold">{summary?.utilizationRate}%</span>
                  )}
                </div>
                <div className="mt-4">
                  <h3 className="font-medium">Credit Utilization</h3>
                  <p className="text-sm text-muted-foreground mt-1">Across all accounts</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/60 backdrop-blur-xl bg-gradient-to-br from-card/60 to-primary/5">
              <CardContent className="p-6">
                <div className="h-full flex flex-col justify-center">
                  <h3 className="font-medium flex items-center text-primary">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    AI Insight
                  </h3>
                  <p className="text-sm mt-2 leading-relaxed">
                    "Reducing your utilization below 10% could boost your score by an estimated 15-20 points based on your profile."
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart */}
          <Card className="lg:col-span-2 border-border/50 bg-card/60 backdrop-blur-xl shadow-lg">
            <CardHeader>
              <CardTitle>Score Trajectory</CardTitle>
            </CardHeader>
            <CardContent>
              {isHistoryLoading ? (
                <Skeleton className="w-full h-[300px]" />
              ) : history && history.length > 0 ? (
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={history} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                      <XAxis 
                        dataKey="date" 
                        tickFormatter={(val) => new Date(val).toLocaleDateString(undefined, { month: 'short' })}
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        dy={10}
                      />
                      <YAxis 
                        domain={['dataMin - 20', 'dataMax + 20']} 
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        dx={-10}
                      />
                      <RechartsTooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          borderColor: 'hsl(var(--border))',
                          borderRadius: '8px',
                          boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'
                        }}
                        labelFormatter={(val) => new Date(val).toLocaleDateString()}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="score" 
                        stroke="hsl(var(--primary))" 
                        strokeWidth={3}
                        fillOpacity={1} 
                        fill="url(#colorScore)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="h-[300px] flex items-center justify-center flex-col text-muted-foreground">
                  <LineChart className="w-12 h-12 mb-4 opacity-20" />
                  <p>Not enough history yet</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Activity Feed */}
          <Card className="border-border/50 bg-card/60 backdrop-blur-xl shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>Recent Activity</CardTitle>
              <Button variant="ghost" size="sm" className="h-8 text-xs">View All</Button>
            </CardHeader>
            <CardContent>
              {isActivityLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="flex items-start gap-3">
                      <Skeleton className="w-8 h-8 rounded-full flex-shrink-0" />
                      <div className="space-y-2 flex-1">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-3 w-2/3" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : activity && activity.length > 0 ? (
                <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[15px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
                  {activity.map((item, i) => (
                    <motion.div 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      key={item.id} 
                      className="relative flex items-start gap-4"
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${
                        item.type === 'score_up' ? 'bg-green-500/20 text-green-500 ring-1 ring-green-500/30' :
                        item.type === 'dispute_update' ? 'bg-blue-500/20 text-blue-500 ring-1 ring-blue-500/30' :
                        item.type === 'alert' ? 'bg-destructive/20 text-destructive ring-1 ring-destructive/30' :
                        'bg-primary/20 text-primary ring-1 ring-primary/30'
                      }`}>
                        {item.type === 'score_up' ? <TrendingUp className="w-4 h-4" /> :
                         item.type === 'dispute_update' ? <ShieldAlert className="w-4 h-4" /> :
                         item.type === 'alert' ? <AlertTriangle className="w-4 h-4" /> :
                         <FileText className="w-4 h-4" />}
                      </div>
                      <div className="pt-1 flex-1">
                        <p className="text-sm font-medium leading-tight">{item.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
                        <p className="text-xs text-muted-foreground/60 mt-1">
                          {new Date(item.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center text-muted-foreground">
                  <p>No recent activity</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
