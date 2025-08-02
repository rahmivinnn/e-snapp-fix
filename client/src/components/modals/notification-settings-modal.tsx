import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import ToggleSwitch from "@/components/ui/toggle-switch";
import { Settings } from "lucide-react";
import type { UserSettings } from "@shared/schema";

interface NotificationSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

const userId = "demo-user-1"; // In a real app, this would come from auth context

export default function NotificationSettingsModal({ 
  isOpen, 
  onClose,
  onOpen 
}: NotificationSettingsModalProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: settings, isLoading } = useQuery<UserSettings>({
    queryKey: ["/api/settings", userId],
    enabled: isOpen,
  });

  const [formData, setFormData] = useState({
    energyAlerts: false,
    billingReminders: false,
    savingsTips: false,
    systemUpdates: false,
  });

  useEffect(() => {
    if (settings) {
      setFormData({
        energyAlerts: settings.energyAlerts ?? false,
        billingReminders: settings.billingReminders ?? false,
        savingsTips: settings.savingsTips ?? false,
        systemUpdates: settings.systemUpdates ?? false,
      });
    }
  }, [settings]);

  const updateSettingsMutation = useMutation({
    mutationFn: (data: typeof formData) =>
      apiRequest("PATCH", `/api/settings/${userId}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/settings", userId] });
      toast({
        title: "Settings updated successfully",
        duration: 2000,
      });
      onClose();
    },
    onError: () => {
      toast({
        title: "Failed to update settings",
        variant: "destructive",
        duration: 3000,
      });
    },
  });

  const handleToggle = (key: keyof typeof formData) => {
    setFormData(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    updateSettingsMutation.mutate(formData);
  };

  // Make onOpen available globally for menu access
  useEffect(() => {
    (window as any).showNotificationSettings = onOpen;
  }, [onOpen]);

  const settingsOptions = [
    {
      key: "energyAlerts" as const,
      title: "Energy Alerts",
      description: "Get notified about high usage",
    },
    {
      key: "billingReminders" as const,
      title: "Billing Reminders",
      description: "Monthly billing notifications",
    },
    {
      key: "savingsTips" as const,
      title: "Savings Tips",
      description: "Weekly energy saving tips",
    },
    {
      key: "systemUpdates" as const,
      title: "System Updates",
      description: "App updates and maintenance",
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm mx-4">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Notification Settings
          </DialogTitle>
        </DialogHeader>
        
        {isLoading ? (
          <div className="text-center py-4">Loading settings...</div>
        ) : (
          <div className="space-y-4">
            {settingsOptions.map(({ key, title, description }) => (
              <div key={key} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-800">{title}</p>
                  <p className="text-sm text-gray-600">{description}</p>
                </div>
                <ToggleSwitch
                  checked={formData[key]}
                  onChange={() => handleToggle(key)}
                />
              </div>
            ))}
            
            <Button 
              className="w-full mt-6"
              onClick={handleSave}
              disabled={updateSettingsMutation.isPending}
            >
              {updateSettingsMutation.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
