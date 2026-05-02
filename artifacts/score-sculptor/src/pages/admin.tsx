import { useAdminGetStats, useAdminGetUsers } from "@workspace/api-client-react";
import { Layout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, 
  ShieldAlert, 
  MessageSquare, 
  Files,
  TrendingUp,
  Activity
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import { useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function Admin() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (user && user.role !== "admin") {
      setLocation("/dashboard");
    }
  }, [user, setLocation]);

  const { data: stats, isLoading: isStatsLoading } = useAdminGetStats({
    query: { enabled: user?.role === "admin" }
  });
  
  const { data: usersData, isLoading: isUsersLoading } = useAdminGetUsers(
    { limit: 10 },
    { query: { enabled: user?.role === "admin" } }
  );

  if (user?.role !== "admin") return null;

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-destructive">System Admin</h1>
          <p className="text-muted-foreground mt-1">Platform overview and user management</p>
        </div>

        {/* Top Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-border/50 bg-card/60 backdrop-blur-xl shadow-lg border-l-4 border-l-blue-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center justify-between">
                Total Users
                <Users className="w-4 h-4 text-blue-500" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isStatsLoading ? <Skeleton className="h-8 w-20" /> : (
                <div className="text-3xl font-bold">{stats?.totalUsers}</div>
              )}
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/60 backdrop-blur-xl shadow-lg border-l-4 border-l-primary">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center justify-between">
                Total Disputes
                <ShieldAlert className="w-4 h-4 text-primary" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isStatsLoading ? <Skeleton className="h-8 w-20" /> : (
                <div className="text-3xl font-bold">{stats?.totalDisputes}</div>
              )}
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/60 backdrop-blur-xl shadow-lg border-l-4 border-l-purple-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center justify-between">
                AI Messages
                <MessageSquare className="w-4 h-4 text-purple-500" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isStatsLoading ? <Skeleton className="h-8 w-20" /> : (
                <div className="text-3xl font-bold">{stats?.totalAiMessages}</div>
              )}
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/60 backdrop-blur-xl shadow-lg border-l-4 border-l-green-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center justify-between">
                Avg Credit Score
                <TrendingUp className="w-4 h-4 text-green-500" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isStatsLoading ? <Skeleton className="h-8 w-20" /> : (
                <div className="text-3xl font-bold">{stats?.avgCreditScore}</div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* User Table */}
        <Card className="border-border/50 bg-card/60 backdrop-blur-xl shadow-lg">
          <CardHeader>
            <CardTitle>Recent Users</CardTitle>
          </CardHeader>
          <CardContent>
            {isUsersLoading ? (
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map(i => <Skeleton key={i} className="h-12 w-full" />)}
              </div>
            ) : (
              <div className="rounded-md border border-border/50 overflow-hidden">
                <Table>
                  <TableHeader className="bg-muted/50">
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Joined</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {usersData?.users.map((u) => (
                      <TableRow key={u.id} className="border-border/50 hover:bg-muted/30">
                        <TableCell className="font-medium">{u.firstName} {u.lastName}</TableCell>
                        <TableCell className="text-muted-foreground">{u.email}</TableCell>
                        <TableCell>
                          <Badge variant={u.role === 'admin' ? 'destructive' : 'secondary'} className="capitalize">
                            {u.role}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {new Date(u.createdAt).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))}
                    {(!usersData?.users || usersData.users.length === 0) && (
                      <TableRow>
                        <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                          No users found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
