import React from "react";
import { Link, useLocation } from "wouter";
import { 
  LayoutDashboard, 
  FileText, 
  ShieldAlert, 
  MessageSquare, 
  BookOpen, 
  Files, 
  Settings,
  ShieldCheck,
  LogOut,
  Menu,
  Bell
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: FileText, label: "Reports", href: "/reports" },
  { icon: ShieldAlert, label: "Disputes", href: "/disputes" },
  { icon: MessageSquare, label: "Sculpt AI", href: "/ai" },
  { icon: BookOpen, label: "Education Hub", href: "/education" },
  { icon: Files, label: "Documents", href: "/documents" },
  { icon: Bell, label: "Notifications", href: "/notifications" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const { user, logoutUser } = useAuth();
  
  const NavLinks = () => (
    <>
      {navItems.map((item) => {
        const isActive = location.startsWith(item.href);
        return (
          <Link key={item.href} href={item.href}>
            <a className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              isActive 
                ? "bg-primary/10 text-primary font-medium border border-primary/20 shadow-sm" 
                : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
            }`}>
              <item.icon className={`w-5 h-5 ${isActive ? "text-primary" : ""}`} />
              {item.label}
            </a>
          </Link>
        );
      })}
      {user?.role === "admin" && (
        <Link href="/admin">
          <a className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all mt-4 ${
            location.startsWith("/admin") 
              ? "bg-destructive/10 text-destructive font-medium border border-destructive/20 shadow-sm" 
              : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
          }`}>
            <ShieldCheck className="w-5 h-5" />
            Admin Panel
          </a>
        </Link>
      )}
    </>
  );

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-72 border-r border-border/40 bg-card/30 backdrop-blur-xl fixed inset-y-0 z-40">
        <div className="h-16 flex items-center px-6 border-b border-border/40">
          <img src="/logo.png" alt="Score Sculptor Logo" className="w-9 h-9 object-contain mr-2" />
          <span className="font-bold text-xl tracking-tight">Score Sculptor™</span>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-1">
          <NavLinks />
        </div>
        <div className="p-4 border-t border-border/40">
          <div className="flex items-center gap-3 px-4 py-3 mb-2 bg-muted/30 rounded-xl">
            <Avatar className="h-9 w-9 border border-primary/20">
              <AvatarFallback className="bg-primary/10 text-primary">
                {user?.firstName?.[0]}{user?.lastName?.[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user?.firstName} {user?.lastName}</p>
              <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
            </div>
          </div>
          <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground" onClick={logoutUser}>
            <LogOut className="w-4 h-4 mr-2" />
            Log out
          </Button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 border-b border-border/40 bg-background/80 backdrop-blur-xl z-40 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Score Sculptor Logo" className="w-9 h-9 object-contain" />
          <span className="font-bold text-lg tracking-tight">Score Sculptor</span>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 p-0 flex flex-col">
            <div className="h-16 flex items-center px-6 border-b border-border/40">
              <span className="font-bold text-xl tracking-tight">Score Sculptor™</span>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-1">
              <NavLinks />
            </div>
            <div className="p-4 border-t border-border/40">
              <Button variant="ghost" className="w-full justify-start text-muted-foreground" onClick={logoutUser}>
                <LogOut className="w-4 h-4 mr-2" />
                Log out
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Main Content */}
      <main className="flex-1 lg:pl-72 pt-16 lg:pt-0">
        <div className="p-6 lg:p-8 max-w-7xl mx-auto min-h-[calc(100vh-4rem)] lg:min-h-screen">
          {children}
        </div>
      </main>
    </div>
  );
}
