import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [, setLocation] = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });

  const handleLogin = () => {
    // Simple demo login - in real app would validate credentials
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', formData.email);
    setLocation("/onboarding");
  };

  const handleGoogleLogin = () => {
    // Demo Google login
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('loginMethod', 'google');
    setLocation("/onboarding");
  };

  const handleAppleLogin = () => {
    // Demo Apple login
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('loginMethod', 'apple');
    setLocation("/onboarding");
  };

  return (
    <div className="min-h-screen bg-primary max-w-md mx-auto">
      {/* Header */}
      <div className="bg-primary text-white p-4">
        <div className="flex items-center space-x-3">
          <ArrowLeft className="h-6 w-6" />
          <h1 className="text-xl font-semibold">Sign In</h1>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-t-3xl mt-8 px-6 pt-8 pb-6 min-h-[calc(100vh-120px)]">
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-gray-900">Welcome Back!</h2>
            <p className="text-gray-600">To keep Connected please login with</p>
            <p className="text-gray-600">your person info</p>
          </div>

          <div className="space-y-4">
            <Input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="h-14 rounded-xl border-gray-200"
            />
            
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                className="h-14 rounded-xl border-gray-200 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox 
                checked={formData.rememberMe}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, rememberMe: !!checked }))}
              />
              <span className="text-sm text-gray-600">Remember me</span>
            </div>
            <button className="text-sm text-red-500 font-medium">
              Forgot Password?
            </button>
          </div>

          <Button
            onClick={handleLogin}
            className="w-full h-14 bg-primary hover:bg-primary/90 text-white rounded-xl text-lg font-semibold"
          >
            Sign In
          </Button>

          <div className="flex items-center space-x-4">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-gray-500 text-sm">Or continue with</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          <div className="space-y-3">
            <Button
              onClick={handleGoogleLogin}
              variant="outline"
              className="w-full h-14 rounded-xl border-gray-200 text-gray-700 font-medium"
            >
              <span className="mr-3">G</span>
              Sign in with Google
            </Button>
            
            <Button
              onClick={handleAppleLogin}
              variant="outline"
              className="w-full h-14 rounded-xl border-gray-200 text-gray-700 font-medium"
            >
              <span className="mr-3">🍎</span>
              Sign in with Apple
            </Button>
          </div>

          <div className="text-center pt-8">
            <span className="text-gray-600">Don't have an account? </span>
            <button 
              onClick={() => setLocation("/signup")}
              className="text-primary font-semibold underline"
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}