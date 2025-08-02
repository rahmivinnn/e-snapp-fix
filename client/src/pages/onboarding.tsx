import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import onboarding1Image from "@assets/On boarding (1)_1754151567435.png";
import onboarding2Image from "@assets/On boarding 2_1754151567434.png";
import onboarding3Image from "@assets/On boarding 3_1754151567434.png";

export default function OnboardingPage() {
  const [, setLocation] = useLocation();
  const [currentStep, setCurrentStep] = useState(0);

  const onboardingSteps = [
    {
      image: onboarding1Image,
      title: "Track Live Consumption",
      description: "Monitor your energy usage in real-time and get insights into your consumption patterns.",
    },
    {
      image: onboarding2Image,
      title: "Smart Energy Management",
      description: "Get intelligent recommendations to optimize your energy usage and reduce costs.",
    },
    {
      image: onboarding3Image,
      title: "Sustainable Living",
      description: "Make eco-friendly choices and track your environmental impact with detailed analytics.",
    }
  ];

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Onboarding completed, go to setup wizard
      localStorage.setItem('onboardingCompleted', 'true');
      setLocation("/setup-wizard");
    }
  };

  const handleSkip = () => {
    localStorage.setItem('onboardingCompleted', 'true');
    setLocation("/setup-wizard");
  };

  const currentStepData = onboardingSteps[currentStep];

  return (
    <div className="min-h-screen bg-white max-w-md mx-auto flex flex-col">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Image Section */}
        <div className="flex-1 flex items-center justify-center p-4">
          <img 
            src={currentStepData.image} 
            alt={currentStepData.title}
            className="w-full max-w-sm h-80 object-cover rounded-2xl"
          />
        </div>

        {/* Text Content */}
        <div className="px-6 pb-8">
          <div className="text-center space-y-4 mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              {currentStepData.title}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {currentStepData.description}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <Button
              onClick={handleNext}
              className="w-full h-14 bg-primary hover:bg-primary/90 text-white rounded-xl text-lg font-semibold"
            >
              {currentStep < onboardingSteps.length - 1 ? "Next" : "Get Started"}
            </Button>

            <button
              onClick={handleSkip}
              className="w-full text-primary text-lg font-medium py-3"
            >
              Skip
            </button>
          </div>

          {/* Progress Indicators */}
          <div className="flex justify-center space-x-2 mt-8">
            {onboardingSteps.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentStep 
                    ? "w-8 bg-primary" 
                    : "w-2 bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Home Indicator */}
      <div className="pb-2">
        <div className="w-32 h-1 bg-gray-800 rounded-full mx-auto"></div>
      </div>
    </div>
  );
}