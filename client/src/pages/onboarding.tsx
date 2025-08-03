import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import onboarding1Image from "@assets/Rectangle 95 (1)_1754180967613.png";
import onboarding2Image from "@assets/Rectangle 95 (2)_1754185644374.png";
import onboarding3Image from "@assets/Rectangle 95 (3)_1754185374000.png";

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
      bgColor: "bg-gradient-to-br from-gray-400 to-gray-600"
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
    <div className="h-screen bg-white w-full max-w-sm mx-auto flex flex-col overflow-hidden">
      {/* Image Section - optimal untuk mobile */}
      <div className="flex-1 flex items-center justify-center px-4 py-8 bg-white">
        <div className={`transform transition-all duration-700 ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
          <img 
            src={currentStepData.image}
            alt={currentStepData.title}
            className="w-full h-auto max-w-80 max-h-64 object-contain rounded-2xl"
          />
        </div>
      </div>

      {/* Content Section - compact untuk mobile */}
      <div className="bg-white px-6 pb-6 pt-2 flex flex-col justify-end">
        <div className={`transform transition-all duration-500 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'} mb-6`}>
          <h2 className="text-xl font-bold text-gray-900 mb-3 text-center">
            {currentStepData.title}
          </h2>
          <p className="text-gray-600 text-center leading-relaxed text-sm">
            {currentStepData.description}
          </p>
        </div>

        {/* Navigation Buttons */}
        <div className="space-y-3 mb-4">
          <Button 
            onClick={handleNext}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-base font-medium transition-all duration-200 hover:scale-[1.02] rounded-xl shadow-lg"
          >
            Next
          </Button>
          
          <button
            onClick={handleSkip}
            className="w-full text-green-600 py-2 text-base font-medium hover:text-green-700 transition-colors"
          >
            Skip
          </button>
        </div>

        {/* Progress Dots */}
        <div className="flex justify-center space-x-2 pb-2">
          {onboardingSteps.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentStep ? 'bg-green-600 w-6' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}