import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Bell, Info, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import type { Notification } from "@shared/schema";

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const userId = "demo-user-1"; // In a real app, this would come from auth context

export default function NotificationModal({ isOpen, onClose }: NotificationModalProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: notifications = [], isLoading } = useQuery<Notification[]>({
    queryKey: ["/api/notifications", userId],
    enabled: isOpen,
  });

  const markAsReadMutation = useMutation({
    mutationFn: (notificationId: string) =>
      apiRequest("PATCH", `/api/notifications/${notificationId}/read`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/notifications", userId] });
      toast({
        title: "Notification marked as read",
        duration: 2000,
      });
    },
  });

  const getIcon = (type: string) => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-orange-500" />;
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "error":
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  const formatTimeAgo = (date: string | Date) => {
    const now = new Date();
    const notificationDate = new Date(date);
    const diffInHours = Math.floor((now.getTime() - notificationDate.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    return `${Math.floor(diffInHours / 24)} days ago`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm mx-4">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifications
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="text-center py-4">Loading notifications...</div>
          ) : notifications.length === 0 ? (
            <div className="text-center py-4 text-gray-500">
              No notifications yet
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`flex items-start space-x-3 p-3 rounded-lg border transition-colors ${
                  notification.read 
                    ? "bg-gray-50 border-gray-200" 
                    : "bg-blue-50 border-blue-200"
                }`}
              >
                {getIcon(notification.type)}
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">
                    {notification.title}
                  </p>
                  <p className="text-xs text-gray-600 mb-1">
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-400">
                    {formatTimeAgo(notification.createdAt ? notification.createdAt.toString() : new Date().toISOString())}
                  </p>
                  {!notification.read && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-2 h-6 px-2 text-xs"
                      onClick={() => markAsReadMutation.mutate(notification.id)}
                      disabled={markAsReadMutation.isPending}
                    >
                      Mark as read
                    </Button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
