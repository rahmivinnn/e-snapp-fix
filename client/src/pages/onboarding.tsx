import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import onboarding1Image from "@assets/On boarding (1)_1754180560406.png";
import onboarding2Image from "@assets/On boarding 2_1754180560406.png";
import onboarding3Image from "@assets/On boarding 3_1754180560405.png";

export default function OnboardingPage() {
  const [, setLocation] = useLocation();
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, [currentStep]);

  const onboardingSteps = [
    {
      image: onboarding1Image,
      title: "Track Live Consumption",
      description: "Lorem Ipsum Dolor Sit Amet Consectetur. Quis Tortor Risus Lacus.",
      bgColor: "bg-gradient-to-br from-blue-400 to-blue-600"
    },
    {
      image: onboarding2Image, 
      title: "Track Live Consumption",
      description: "Lorem Ipsum Dolor Sit Amet Consectetur. Quis Tortor Risus Lacus.",
      bgColor: "bg-gradient-to-br from-green-400 to-green-600"
    },
    {
      image: onboarding3Image,
      title: "Track Live Consumption", 
      description: "Lorem Ipsum Dolor Sit Amet Consectetur. Quis Tortor Risus Lacus.",
      bgColor: "bg-gray-100"
    }
  ];

  const handleNext = () => {
    setIsVisible(false);
    setTimeout(() => {
      if (currentStep < onboardingSteps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        localStorage.setItem('onboardingCompleted', 'true');
        setLocation("/login");
      }
    }, 300);
  };

  const handleSkip = () => {
    localStorage.setItem('onboardingCompleted', 'true');
    setLocation("/login");
  };

  const currentStepData = onboardingSteps[currentStep];

  return (
    <div className="min-h-screen bg-white max-w-md mx-auto flex flex-col relative overflow-hidden">
      {/* Status bar mockup */}
      <div className="absolute top-0 left-0 right-0 h-11 bg-white border-b border-gray-100 flex items-center justify-between px-4 text-xs font-medium z-20">
        <span>8:45</span>
        <div className="flex items-center space-x-1">
          <div className="flex space-x-0.5">
            <div className="w-1 h-1 bg-black rounded-full"></div>
            <div className="w-1 h-1 bg-black rounded-full"></div>
            <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
            <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
          </div>
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M2 17h20v2H2zm1.15-4.05L4 11.47l.85 1.48L3 12.95z"/>
          </svg>
          <span className="bg-green-500 text-white px-1 rounded text-[10px]">100</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 pt-11">
        {/* Image Section */}
        <div className="h-96 flex items-center justify-center transition-all duration-500 bg-white">
          <div className={`transform transition-all duration-700 ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
            <img 
              src={currentStepData.image}
              alt={currentStepData.title}
              className="w-80 h-80 object-cover rounded-2xl shadow-xl"
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 bg-white px-6 py-8 flex flex-col justify-between">
          <div className={`transform transition-all duration-500 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
              {currentStepData.title}
            </h2>
            <p className="text-gray-600 text-center leading-relaxed px-4">
              {currentStepData.description}
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4 mt-8">
            <Button 
              onClick={handleNext}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white py-4 text-lg font-medium transition-all duration-200 hover:scale-[1.02]"
            >
              Next
            </Button>
            
            <button
              onClick={handleSkip}
              className="w-full text-teal-600 py-3 text-lg font-medium hover:text-teal-700 transition-colors"
            >
              Skip
            </button>
          </div>

          {/* Progress Dots */}
          <div className="flex justify-center space-x-2 mt-6">
            {onboardingSteps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentStep ? 'bg-teal-600 w-6' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom indicator */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
        <div className="w-32 h-1 bg-black rounded-full"></div>
      </div>
    </div>
  );
}