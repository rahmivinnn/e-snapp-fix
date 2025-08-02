import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import houseImage from "@assets/Rectangle 95 (1)_1754157653123.png";
import onboarding2Image from "@assets/On boarding 2_1754153067274.png";
import onboarding3Image from "@assets/On boarding 3_1754153067273.png";

export default function OnboardingPage() {
  const [, setLocation] = useLocation();
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    setImageLoaded(false);
  }, [currentStep]);

  const onboardingSteps = [
    {
      image: houseImage,
      title: "Smart Energy Monitoring",
      description: "Monitor your home's energy consumption in real-time with our advanced smart home technology.",
    },
    {
      image: onboarding2Image,
      title: "Track Live Consumption",
      description: "Lorem Ipsum Dolor Sit Amet Consectetur. Quis Tortor Risus Lacus.",
    },
    {
      image: onboarding3Image,
      title: "Track Live Consumption",
      description: "Lorem Ipsum Dolor Sit Amet Consectetur. Quis Tortor Risus Lacus.",
    }
  ];

  const handleNext = () => {
    setIsVisible(false);
    setTimeout(() => {
      if (currentStep < onboardingSteps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        localStorage.setItem('onboardingCompleted', 'true');
        setLocation("/setup-wizard");
      }
    }, 300);
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentStep(currentStep - 1);
      }, 300);
    }
  };

  const handleSkip = () => {
    localStorage.setItem('onboardingCompleted', 'true');
    setLocation("/setup-wizard");
  };

  const currentStepData = onboardingSteps[currentStep];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-primary/5 max-w-md mx-auto flex flex-col relative overflow-hidden">
      {/* Top Navigation */}
      <div className="flex items-center justify-between p-4 z-10">
        <button
          onClick={handlePrevious}
          className={`p-2 rounded-full transition-all ${
            currentStep > 0 
              ? 'text-gray-600 hover:bg-gray-100 hover:scale-110' 
              : 'text-gray-300 cursor-not-allowed'
          }`}
          disabled={currentStep === 0}
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        
        <div className="flex space-x-2">
          {onboardingSteps.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-500 ${
                index === currentStep 
                  ? "w-8 bg-primary shadow-lg" 
                  : index < currentStep
                  ? "w-2 bg-primary/60"
                  : "w-2 bg-gray-300"
              }`}
            />
          ))}
        </div>

        <button
          onClick={handleSkip}
          className="text-gray-500 font-medium hover:text-primary transition-colors"
        >
          Skip
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Image Section */}
        <div className="flex-1 flex items-center justify-center p-4">
          <div className={`transition-all duration-500 ${isVisible ? 'scale-100 opacity-100 translate-x-0' : 'scale-95 opacity-0 translate-x-4'}`}>
            <img 
              src={currentStepData.image} 
              alt={currentStepData.title}
              className={`w-full max-w-sm h-80 object-cover rounded-2xl shadow-2xl transition-all duration-300 ${imageLoaded ? 'blur-0' : 'blur-sm'}`}
              onLoad={() => setImageLoaded(true)}
            />
          </div>
        </div>

        {/* Text Content */}
        <div className="px-6 pb-8">
          <div className={`text-center space-y-4 mb-8 transition-all duration-500 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <h2 className="text-2xl font-bold text-gray-900">
              {currentStepData.title}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {currentStepData.description}
            </p>
          </div>

          {/* Action Buttons */}
          <div className={`space-y-4 transition-all duration-500 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <Button
              onClick={handleNext}
              className="w-full h-14 bg-primary hover:bg-primary/90 text-white rounded-xl text-lg font-semibold hover:scale-105 active:scale-95 transition-all group"
            >
              <span className="mr-2">{currentStep < onboardingSteps.length - 1 ? "Next" : "Get Started"}</span>
              <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>

      {/* Home Indicator */}
      <div className="pb-2">
        <div className="w-32 h-1 bg-gray-800 rounded-full mx-auto"></div>
      </div>

      {/* Background Animation */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 left-0 w-24 h-24 bg-primary/5 rounded-full blur-xl animate-pulse delay-1000"></div>
    </div>
  );
}