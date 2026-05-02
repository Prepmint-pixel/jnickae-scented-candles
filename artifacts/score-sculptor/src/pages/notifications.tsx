import { useGetNotifications, useMarkNotificationRead, useMarkAllNotificationsRead } from "@workspace/api-client-react";
import { Layout } from "@/components/layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Bell, ShieldAlert, FileText, CheckCircle2, Info, AlertTriangle, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

export default function Notifications() {
  const { data: notificationsData, isLoading, refetch } = useGetNotifications();
  const markRead = useMarkNotificationRead();
  const markAllRead = useMarkAllNotificationsRead();
  const { toast } = useToast();

  const handleMarkAsRead = async (id: number) => {
    try {
      await markRead.mutateAsync({ id });
      refetch();
    } catch (e) {
      console.error(e);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await markAllRead.mutateAsync();
      toast({
        title: "All caught up",
        description: "All notifications marked as read.",
      });
      refetch();
    } catch (e) {
      console.error(e);
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'dispute_reminder': return <ShieldAlert className="w-5 h-5 text-blue-500" />;
      case 'account_alert': return <AlertTriangle className="w-5 h-5 text-destructive" />;
      case 'score_change': return <TrendingUp className="w-5 h-5 text-green-500" />;
      case 'education_reminder': return <FileText className="w-5 h-5 text-purple-500" />;
      default: return <Info className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getNotificationBg = (type: string, isRead: boolean) => {
    if (isRead) return "bg-muted/50";
    switch (type) {
      case 'dispute_reminder': return 'bg-blue-500/10 border-l-4 border-l-blue-500';
      case 'account_alert': return 'bg-destructive/10 border-l-4 border-l-destructive';
      case 'score_change': return 'bg-green-500/10 border-l-4 border-l-green-500';
      case 'education_reminder': return 'bg-purple-500/10 border-l-4 border-l-purple-500';
      default: return 'bg-card border-l-4 border-l-muted';
    }
  };

  const unreadCount = notificationsData?.notifications.filter(n => !n.isRead).length || 0;

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              <Bell className="w-8 h-8 text-primary" />
              Notifications
              {unreadCount > 0 && (
                <Badge className="bg-primary hover:bg-primary/90 ml-2">{unreadCount} New</Badge>
              )}
            </h1>
            <p className="text-muted-foreground mt-1">Stay updated on your credit journey.</p>
          </div>
          {unreadCount > 0 && (
            <Button variant="outline" onClick={handleMarkAllRead} disabled={markAllRead.isPending}>
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Mark all as read
            </Button>
          )}
        </div>

        <div className="space-y-4">
          {isLoading ? (
            Array(5).fill(0).map((_, i) => (
              <Skeleton key={i} className="h-24 w-full rounded-xl" />
            ))
          ) : notificationsData?.notifications && notificationsData.notifications.length > 0 ? (
            notificationsData.notifications.map((notification, i) => (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                key={notification.id}
              >
                <Card className={`border-border/50 backdrop-blur-xl transition-all ${getNotificationBg(notification.type, notification.isRead)} ${notification.isRead ? 'opacity-70' : 'shadow-md'}`}>
                  <CardContent className="p-4 sm:p-6 flex gap-4">
                    <div className="mt-1 flex-shrink-0">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <h3 className={`font-semibold ${notification.isRead ? 'text-foreground/80' : 'text-foreground'}`}>
                          {notification.title}
                        </h3>
                        <span className="text-xs text-muted-foreground">
                          {new Date(notification.createdAt).toLocaleString(undefined, { 
                            month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' 
                          })}
                        </span>
                      </div>
                      <p className={`text-sm ${notification.isRead ? 'text-muted-foreground' : 'text-foreground/90'}`}>
                        {notification.message}
                      </p>
                    </div>
                    {!notification.isRead && (
                      <div className="flex-shrink-0">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 rounded-full" 
                          onClick={() => handleMarkAsRead(notification.id)}
                          disabled={markRead.isPending}
                        >
                          <CheckCircle2 className="w-4 h-4 text-muted-foreground" />
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (
            <div className="py-20 text-center border-2 border-dashed border-border/50 rounded-2xl bg-card/30">
              <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold mb-2">You're all caught up!</h3>
              <p className="text-muted-foreground max-w-sm mx-auto">
                There are no new notifications. We'll alert you when there are updates to your credit profile or disputes.
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
