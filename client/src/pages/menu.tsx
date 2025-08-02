import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { User, Bell, Headphones, Settings, Info, LogOut, Trash2, ChevronRight } from "lucide-react";
import type { User as UserType } from "@shared/schema";

const userId = "demo-user-1"; // In a real app, this would come from auth context

export default function MenuPage() {
  const { data: user } = useQuery<UserType>({
    queryKey: ["/api/user", userId],
  });

  const handleShowNotificationSettings = () => {
    if ((window as any).showNotificationSettings) {
      (window as any).showNotificationSettings();
    }
  };

  const handleShowContactSupport = () => {
    if ((window as any).showContactSupport) {
      (window as any).showContactSupport();
    }
  };

  const handleDeleteAccount = () => {
    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      alert("Account deletion functionality would be implemented here");
    }
  };

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      alert("Logout functionality would be implemented here");
    }
  };

  const handleSettings = () => {
    alert("Settings functionality would be implemented here");
  };

  const handleAbout = () => {
    alert("About functionality would be implemented here");
  };

  return (
    <div className="px-4 space-y-6">
      {/* Header */}
      <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>

      {/* Profile Card */}
      <Card className="card-hover bg-gradient-to-br from-blue-50 to-cyan-50 cursor-pointer">
        <CardContent className="p-4" onClick={() => (window as any).showProfile?.()}>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <User className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800">
                {user?.name || "Inayat Ali"}
              </h3>
              <p className="text-sm text-gray-600">
                {user?.email || "inayatalikatif@gmail.com"}
              </p>
            </div>
            <div className="text-gray-400">
              <ChevronRight className="h-5 w-5" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Menu Options */}
      <div className="space-y-4">
        <Card className="card-hover">
          <CardContent className="p-0">
            <Button
              variant="ghost"
              className="w-full justify-start p-4 h-auto"
              onClick={handleShowNotificationSettings}
            >
              <Bell className="h-5 w-5 text-primary mr-3" />
              <span className="font-medium text-gray-800">Notification Settings</span>
              <div className="ml-auto">
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </div>
            </Button>
          </CardContent>
        </Card>
        
        <Card className="card-hover">
          <CardContent className="p-0">
            <Button
              variant="ghost"
              className="w-full justify-start p-4 h-auto"
              onClick={handleShowContactSupport}
            >
              <Headphones className="h-5 w-5 text-primary mr-3" />
              <span className="font-medium text-gray-800">Contact Support</span>
              <div className="ml-auto">
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </div>
            </Button>
          </CardContent>
        </Card>
        
        <Card className="card-hover">
          <CardContent className="p-0">
            <Button
              variant="ghost"
              className="w-full justify-start p-4 h-auto"
              onClick={handleSettings}
            >
              <Settings className="h-5 w-5 text-primary mr-3" />
              <span className="font-medium text-gray-800">Settings</span>
              <div className="ml-auto">
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </div>
            </Button>
          </CardContent>
        </Card>
        
        <Card className="card-hover">
          <CardContent className="p-0">
            <Button
              variant="ghost"
              className="w-full justify-start p-4 h-auto"
              onClick={handleAbout}
            >
              <Info className="h-5 w-5 text-primary mr-3" />
              <span className="font-medium text-gray-800">About</span>
              <div className="ml-auto">
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </div>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Danger Zone */}
      <div className="space-y-3">
        <Button
          variant="outline"
          className="w-full font-semibold py-3 border-gray-300 text-gray-700 hover:bg-gray-100"
          onClick={handleDeleteAccount}
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Delete Account
        </Button>
        
        <Button
          className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
}
