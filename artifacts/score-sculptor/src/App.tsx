import { AuthProvider, useAuth } from "@/hooks/use-auth";
import { ThemeProvider } from "@/components/theme-provider";
import { Switch, Route, Router as WouterRouter, Redirect } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

// Pages
import Landing from "@/pages/landing";
import Login from "@/pages/login";
import Register from "@/pages/register";
import Onboarding from "@/pages/onboarding";
import Dashboard from "@/pages/dashboard";
import AiAssistant from "@/pages/ai";
import Settings from "@/pages/settings";
import Admin from "@/pages/admin";
import Reports from "@/pages/reports";
import ReportDetail from "@/pages/report-detail";
import Disputes from "@/pages/disputes";
import DisputeDetail from "@/pages/dispute-detail";
import NewDispute from "@/pages/new-dispute";
import EducationHub from "@/pages/education";
import EducationDetail from "@/pages/education-detail";
import Documents from "@/pages/documents";
import Notifications from "@/pages/notifications";

const queryClient = new QueryClient();

// Protected Route Wrapper
const ProtectedRoute = ({ component: Component, adminOnly = false, ...rest }: any) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  
  if (isLoading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!isAuthenticated) return <Redirect to="/login" />;
  if (adminOnly && user?.role !== "admin") return <Redirect to="/dashboard" />;
  
  return <Route {...rest} component={Component} />;
};

// Public Only Route Wrapper (redirects to dashboard if already logged in)
const PublicOnlyRoute = ({ component: Component, ...rest }: any) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (isAuthenticated) return <Redirect to="/dashboard" />;
  
  return <Route {...rest} component={Component} />;
};

function Router() {
  return (
    <Switch>
      <PublicOnlyRoute path="/" component={Landing} />
      <PublicOnlyRoute path="/login" component={Login} />
      <PublicOnlyRoute path="/register" component={Register} />
      
      <ProtectedRoute path="/onboarding" component={Onboarding} />
      <ProtectedRoute path="/dashboard" component={Dashboard} />
      <ProtectedRoute path="/ai" component={AiAssistant} />
      <ProtectedRoute path="/settings" component={Settings} />
      <ProtectedRoute path="/admin" component={Admin} adminOnly={true} />
      
      <ProtectedRoute path="/reports" component={Reports} />
      <ProtectedRoute path="/reports/:id" component={ReportDetail} />
      <ProtectedRoute path="/disputes" component={Disputes} />
      <ProtectedRoute path="/disputes/new" component={NewDispute} />
      <ProtectedRoute path="/disputes/:id" component={DisputeDetail} />
      <ProtectedRoute path="/education" component={EducationHub} />
      <ProtectedRoute path="/education/:id" component={EducationDetail} />
      <ProtectedRoute path="/documents" component={Documents} />
      <ProtectedRoute path="/notifications" component={Notifications} />
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="score-sculptor-theme">
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <AuthProvider>
            <TooltipProvider>
              <Router />
              <Toaster />
            </TooltipProvider>
          </AuthProvider>
        </WouterRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
