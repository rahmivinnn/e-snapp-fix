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
              className="w-full h-14 rounded-xl border-gray-200 text-gray-700 font-medium hover:scale-105 active:scale-95 transition-all hover:border-primary hover:text-primary"
            >
              <svg className="mr-3 h-5 w-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Sign up with Google
            </Button>
            
            <Button
              onClick={handleAppleSignUp}
              variant="outline"
              className="w-full h-14 rounded-xl border-gray-200 text-gray-700 font-medium hover:scale-105 active:scale-95 transition-all hover:border-primary hover:text-primary"
            >
              <svg className="mr-3 h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/>
              </svg>
              Sign up with Apple
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