import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Eye, EyeOff, Loader2, Check } from "lucide-react";

export default function SignUpPage() {
  const [, setLocation] = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
    acceptPrivacy: false,
    acceptMarketing: false
  });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSignUp = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', formData.email);
    localStorage.setItem('userName', formData.fullName);
    setLocation("/onboarding");
  };

  const handleGoogleSignUp = () => {
    // Demo Google signup
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('loginMethod', 'google');
    setLocation("/onboarding");
  };

  const handleAppleSignUp = () => {
    // Demo Apple signup
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('loginMethod', 'apple');
    setLocation("/onboarding");
  };

  return (
    <div className="min-h-screen bg-primary max-w-md mx-auto">
      {/* Header */}
      <div className="bg-primary text-white p-4">
        <div className="flex items-center space-x-3">
          <ArrowLeft 
            className="h-6 w-6 cursor-pointer" 
            onClick={() => setLocation("/login")} 
          />
          <h1 className="text-xl font-semibold">Sign Up</h1>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-t-3xl mt-8 px-6 pt-8 pb-6 min-h-[calc(100vh-120px)] overflow-y-auto">
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-gray-900">Create an account</h2>
            <p className="text-gray-600">To keep Connected please signup with</p>
            <p className="text-gray-600">your personal info</p>
          </div>

          <div className="space-y-4">
            <Input
              type="text"
              placeholder="Full name"
              value={formData.fullName}
              onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
              className="h-14 rounded-xl border-gray-200"
            />

            <Input
              type="email"
              placeholder="Email address"
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

            <div className="relative">
              <Input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                className="h-14 rounded-xl border-gray-200 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-start space-x-2">
              <Checkbox 
                checked={formData.acceptTerms}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, acceptTerms: !!checked }))}
                className="mt-1"
              />
              <span className="text-sm text-gray-600">I accept the Terms & Conditions</span>
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox 
                checked={formData.acceptPrivacy}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, acceptPrivacy: !!checked }))}
                className="mt-1"
              />
              <span className="text-sm text-gray-600">I have read and understood the Privacy Policy</span>
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox 
                checked={formData.acceptMarketing}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, acceptMarketing: !!checked }))}
                className="mt-1"
              />
              <span className="text-sm text-gray-600">I agree to receive marketing communications and special offers via email (optional)</span>
            </div>
          </div>

          <Button
            onClick={handleSignUp}
            disabled={isLoading || !formData.acceptTerms || !formData.acceptPrivacy}
            className="w-full h-14 bg-primary hover:bg-primary/90 text-white rounded-xl text-lg font-semibold hover:scale-105 active:scale-95 transition-all disabled:scale-100 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
                Creating Account...
              </>
            ) : (
              <>
                <Check className="h-5 w-5 mr-2" />
                Sign Up
              </>
            )}
          </Button>

          <div className="flex items-center space-x-4">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-gray-500 text-sm">Or continue with</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          <div className="space-y-3">
            <Button
              onClick={handleGoogleSignUp}
              variant="outline"
              className="w-full h-14 rounded-xl border-gray-200 text-gray-700 font-medium"
            >
              <span className="mr-3">G</span>
              Sign in with Google
            </Button>
            
            <Button
              onClick={handleAppleSignUp}
              variant="outline"
              className="w-full h-14 rounded-xl border-gray-200 text-gray-700 font-medium"
            >
              <span className="mr-3">🍎</span>
              Sign in with Apple
            </Button>
          </div>

          <div className="text-center pt-4">
            <span className="text-gray-600">Already have an account? </span>
            <button 
              onClick={() => setLocation("/login")}
              className="text-primary font-semibold underline"
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}