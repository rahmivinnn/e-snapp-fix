import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { 
  Bell, 
  CreditCard, 
  Leaf, 
  Settings as SettingsIcon, 
  MessageSquare, 
  LogOut,
  User,
  Moon,
  Sun
} from "lucide-react";
import logoImage from "@assets/e snapp logo 1 (1)_1754149374420.png";

export default function SettingsPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [supportForm, setSupportForm] = useState({ subject: "", message: "" });
  const { toast } = useToast();
  const queryClient = useQueryClient();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Fetch user settings
  const { data: settings, isLoading: settingsLoading } = useQuery<any>({
    queryKey: ['/api/settings/demo-user-1'],
  });

  // Fetch user data
  const { data: user } = useQuery<any>({
    queryKey: ['/api/user/demo-user-1'],
  });

  // Update settings mutation
  const updateSettingsMutation = useMutation({
    mutationFn: async (newSettings: any) => {
      const response = await fetch('/api/settings/demo-user-1', {
        method: 'PATCH',
        body: JSON.stringify(newSettings),
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) throw new Error('Failed to update settings');
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Settings Updated",
        description: "Your preferences have been saved successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/settings/demo-user-1'] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update settings. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Submit support request mutation
  const submitSupportMutation = useMutation({
    mutationFn: async (supportData: any) => {
      const response = await fetch('/api/support/contact', {
        method: 'POST',
        body: JSON.stringify({ ...supportData, userId: 'demo-user-1' }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) throw new Error('Failed to submit support request');
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Support Request Sent",
        description: "We'll get back to you soon.",
      });
      setSupportForm({ subject: "", message: "" });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send support request. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSettingChange = (setting: string, value: boolean) => {
    updateSettingsMutation.mutate({ [setting]: value });
  };

  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (supportForm.subject && supportForm.message) {
      submitSupportMutation.mutate(supportForm);
    }
  };

  const handleLogout = () => {
    // Clear localStorage and redirect to login
    localStorage.clear();
    window.location.href = '/login';
  };

  return (
    <div className="max-w-md mx-auto px-4 space-y-4 pb-20">
      {/* Logo Section */}
      <div className={`flex justify-center mb-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
        <img 
          src={logoImage} 
          alt="e-snapp" 
          className="h-12 w-auto"
        />
      </div>

      {/* Header */}
      <div className={`text-center mb-6 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Settings</h1>
        <p className="text-gray-600">Manage your preferences and account</p>
      </div>

      {/* Profile Card */}
      <Card className={`transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} hover:shadow-lg`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <User className="h-5 w-5 text-primary" />
            Profile Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {user ? (
            <>
              <div>
                <Label className="text-sm font-medium text-gray-600">Name</Label>
                <p className="text-gray-800 font-medium">{user.name}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Email</Label>
                <p className="text-gray-800 font-medium">{user.email}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Username</Label>
                <p className="text-gray-800 font-medium">@{user.username}</p>
              </div>
            </>
          ) : (
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card className={`transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} hover:shadow-lg`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Bell className="h-5 w-5 text-primary" />
            Notification Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {settingsLoading ? (
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
                  <div className="h-6 w-10 bg-gray-200 rounded-full animate-pulse"></div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-medium">Energy Alerts</Label>
                  <p className="text-sm text-gray-600">Get notified about unusual energy consumption</p>
                </div>
                <Switch
                  checked={settings?.energyAlerts || false}
                  onCheckedChange={(checked) => handleSettingChange('energyAlerts', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-medium">Billing Reminders</Label>
                  <p className="text-sm text-gray-600">Receive monthly billing notifications</p>
                </div>
                <Switch
                  checked={settings?.billingReminders || false}
                  onCheckedChange={(checked) => handleSettingChange('billingReminders', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-medium">Savings Tips</Label>
                  <p className="text-sm text-gray-600">Get personalized energy saving recommendations</p>
                </div>
                <Switch
                  checked={settings?.savingsTips || false}
                  onCheckedChange={(checked) => handleSettingChange('savingsTips', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-medium">System Updates</Label>
                  <p className="text-sm text-gray-600">App updates and maintenance notifications</p>
                </div>
                <Switch
                  checked={settings?.systemUpdates || false}
                  onCheckedChange={(checked) => handleSettingChange('systemUpdates', checked)}
                />
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Support Contact */}
      <Card className={`transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} hover:shadow-lg`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <MessageSquare className="h-5 w-5 text-primary" />
            Contact Support
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSupportSubmit} className="space-y-4">
            <div>
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                placeholder="What can we help you with?"
                value={supportForm.subject}
                onChange={(e) => setSupportForm(prev => ({ ...prev, subject: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Describe your issue or question in detail..."
                rows={3}
                value={supportForm.message}
                onChange={(e) => setSupportForm(prev => ({ ...prev, message: e.target.value }))}
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full hover:scale-105 transition-all duration-200"
              disabled={submitSupportMutation.isPending}
            >
              {submitSupportMutation.isPending ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Sending...
                </>
              ) : (
                'Send Support Request'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Logout Button */}
      <Card className={`transition-all duration-700 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} hover:shadow-lg border-red-200`}>
        <CardContent className="p-4">
          <Button 
            onClick={handleLogout}
            variant="destructive" 
            className="w-full hover:scale-105 transition-all duration-200 flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}