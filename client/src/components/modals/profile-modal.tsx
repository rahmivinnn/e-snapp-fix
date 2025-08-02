import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { User, Eye, EyeOff, ChevronDown, ChevronUp, Trash2, LogOut } from "lucide-react";
import { useForm } from "react-hook-form";
import type { User as UserType } from "@shared/schema";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

const userId = "demo-user-1"; // In a real app, this would come from auth context

interface ProfileFormData {
  name: string;
  email: string;
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function ProfileModal({ isOpen, onClose, onOpen }: ProfileModalProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [showPasswords, setShowPasswords] = useState(false);
  const [language, setLanguage] = useState("English");
  const [isNameEmailOpen, setIsNameEmailOpen] = useState(false);
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);

  const { data: user, isLoading } = useQuery<UserType>({
    queryKey: ["/api/user", userId],
    enabled: isOpen,
  });

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ProfileFormData>();

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        email: user.email,
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
  }, [user, reset]);

  const updateProfileMutation = useMutation({
    mutationFn: (data: Partial<ProfileFormData>) =>
      apiRequest("PATCH", `/api/user/${userId}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/user", userId] });
      toast({
        title: "Profile updated successfully",
        duration: 2000,
      });
    },
    onError: () => {
      toast({
        title: "Failed to update profile",
        variant: "destructive",
        duration: 3000,
      });
    },
  });

  const onSubmit = (data: ProfileFormData) => {
    if (data.newPassword && data.newPassword !== data.confirmPassword) {
      toast({
        title: "Passwords don't match",
        variant: "destructive",
        duration: 2000,
      });
      return;
    }

    const updateData: Partial<ProfileFormData> = {
      name: data.name,
      email: data.email,
    };

    if (data.newPassword) {
      updateData.oldPassword = data.oldPassword;
      updateData.newPassword = data.newPassword;
    }

    updateProfileMutation.mutate(updateData);
  };

  const handleDeleteAccount = () => {
    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      toast({
        title: "Account deletion would be implemented here",
        duration: 3000,
      });
    }
  };

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      toast({
        title: "Logout functionality would be implemented here",
        duration: 3000,
      });
    }
  };

  // Make onOpen available globally for menu access
  useEffect(() => {
    (window as any).showProfile = onOpen;
  }, [onOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm mx-4 max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            My Profile
          </DialogTitle>
        </DialogHeader>
        
        {isLoading ? (
          <div className="text-center py-4">Loading profile...</div>
        ) : (
          <div className="space-y-4">
            {/* Profile Card */}
            <Card className="bg-gradient-to-br from-blue-50 to-cyan-50">
              <CardContent className="p-4">
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
                    <ChevronDown className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Edit name & Email */}
              <Collapsible open={isNameEmailOpen} onOpenChange={setIsNameEmailOpen}>
                <CollapsibleTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    Edit name & Email
                    {isNameEmailOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-3 mt-3">
                  <Input
                    {...register("name", { required: "Name is required" })}
                    placeholder="Full Name"
                    className={errors.name ? "border-red-500" : ""}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs">{errors.name.message}</p>
                  )}
                  
                  <Input
                    {...register("email", { 
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address"
                      }
                    })}
                    type="email"
                    placeholder="Email"
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs">{errors.email.message}</p>
                  )}
                </CollapsibleContent>
              </Collapsible>

              {/* Change password */}
              <Collapsible open={isPasswordOpen} onOpenChange={setIsPasswordOpen}>
                <CollapsibleTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    Change password
                    {isPasswordOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-3 mt-3">
                  <div className="relative">
                    <Input
                      {...register("oldPassword")}
                      type={showPasswords ? "text" : "password"}
                      placeholder="Old password"
                    />
                  </div>
                  
                  <div className="relative">
                    <Input
                      {...register("newPassword")}
                      type={showPasswords ? "text" : "password"}
                      placeholder="New password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                      onClick={() => setShowPasswords(!showPasswords)}
                    >
                      {showPasswords ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                  
                  <div className="relative">
                    <Input
                      {...register("confirmPassword")}
                      type={showPasswords ? "text" : "password"}
                      placeholder="Confirm new password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                      onClick={() => setShowPasswords(!showPasswords)}
                    >
                      {showPasswords ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </CollapsibleContent>
              </Collapsible>

              <Button 
                type="submit"
                className="w-full bg-primary hover:bg-primary/90"
                disabled={updateProfileMutation.isPending}
              >
                {updateProfileMutation.isPending ? "Saving..." : "Save"}
              </Button>
            </form>

            {/* Language */}
            <Collapsible open={isLanguageOpen} onOpenChange={setIsLanguageOpen}>
              <CollapsibleTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  Language
                  {isLanguageOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-3">
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="Italian">Italiano</SelectItem>
                    <SelectItem value="Spanish">Español</SelectItem>
                    <SelectItem value="French">Français</SelectItem>
                  </SelectContent>
                </Select>
              </CollapsibleContent>
            </Collapsible>

            {/* Danger Zone */}
            <div className="space-y-3 pt-4 border-t">
              <Button
                variant="outline"
                className="w-full border-gray-300 text-gray-700 hover:bg-gray-100"
                onClick={handleDeleteAccount}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Account
              </Button>
              
              <Button
                className="w-full bg-red-500 hover:bg-red-600 text-white"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}