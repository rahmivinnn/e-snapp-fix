import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Mail, Shield } from "lucide-react";
import logoImage from "@assets/e snapp logo 1 (1)_1754180526051.png";

export default function ForgotPasswordPage() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState<'email' | 'otp' | 'success'>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setStep('otp');
    }, 1500);
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp || otp.length !== 6) return;
    
    setIsLoading(true);
    // Simulate OTP verification
    setTimeout(() => {
      setIsLoading(false);
      setStep('success');
      setTimeout(() => {
        setLocation('/login');
      }, 2000);
    }, 1500);
  };

  const handleOTPChange = (value: string) => {
    // Only allow numbers and max 6 digits
    const numericValue = value.replace(/\D/g, '').slice(0, 6);
    setOtp(numericValue);
  };

  return (
    <div className="h-screen bg-gradient-to-br from-green-50 to-emerald-100 w-full max-w-sm mx-auto flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pt-8">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => step === 'email' ? setLocation('/login') : setStep('email')}
          className="p-2 hover:bg-white/20"
        >
          <ArrowLeft className="h-5 w-5 text-gray-600" />
        </Button>
        <div className="flex-1" />
      </div>

      {/* Logo */}
      <div className="flex justify-center mb-8">
        <img 
          src={logoImage} 
          alt="e-snapp" 
          className="h-12 w-auto object-contain"
        />
      </div>

      {/* Content */}
      <div className="flex-1 px-6 pb-8">
        {step === 'email' && (
          <>
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-green-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Forgot Password?
              </h1>
              <p className="text-gray-600 text-sm leading-relaxed">
                Don't worry! Enter your email address and we'll send you a verification code to reset your password.
              </p>
            </div>

            <form onSubmit={handleSendOTP} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full h-12 border-gray-200 focus:border-green-500 focus:ring-green-500"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={!email || isLoading}
                className="w-full bg-green-600 hover:bg-green-700 text-white h-12 text-base font-medium transition-all duration-200 hover:scale-[1.02] rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Sending...
                  </div>
                ) : (
                  'Send Verification Code'
                )}
              </Button>
            </form>
          </>
        )}

        {step === 'otp' && (
          <>
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Enter Verification Code
              </h1>
              <p className="text-gray-600 text-sm leading-relaxed">
                We've sent a 6-digit verification code to
              </p>
              <p className="text-green-600 font-medium text-sm mt-1">
                {email}
              </p>
            </div>

            <form onSubmit={handleVerifyOTP} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Verification Code
                </label>
                <Input
                  type="text"
                  value={otp}
                  onChange={(e) => handleOTPChange(e.target.value)}
                  placeholder="Enter 6-digit code"
                  className="w-full h-12 border-gray-200 focus:border-green-500 focus:ring-green-500 text-center text-lg tracking-widest"
                  maxLength={6}
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={otp.length !== 6 || isLoading}
                className="w-full bg-green-600 hover:bg-green-700 text-white h-12 text-base font-medium transition-all duration-200 hover:scale-[1.02] rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Verifying...
                  </div>
                ) : (
                  'Verify Code'
                )}
              </Button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => handleSendOTP({ preventDefault: () => {} } as React.FormEvent)}
                  className="text-green-600 text-sm font-medium hover:text-green-700 transition-colors"
                >
                  Didn't receive code? Resend
                </button>
              </div>
            </form>
          </>
        )}

        {step === 'success' && (
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <div className="w-3 h-1.5 bg-white rounded-sm transform rotate-45 origin-left" />
                <div className="w-6 h-1.5 bg-white rounded-sm transform -rotate-45 -ml-1" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Password Reset Sent!
            </h1>
            <p className="text-gray-600 text-sm leading-relaxed">
              Check your email for password reset instructions. You'll be redirected to login shortly.
            </p>
            <div className="mt-6">
              <div className="w-8 h-8 border-2 border-green-600 border-t-transparent rounded-full animate-spin mx-auto" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}