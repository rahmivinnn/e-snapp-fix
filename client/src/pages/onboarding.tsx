import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import onboarding1Image from "@assets/Rectangle 95 (1)_1754180967613.png";
import onboarding2Image from "@assets/Rectangle 95 (2)_1754181155974.png";
import onboarding3Image from "@assets/Rectangle 95 (5)_1754181164682.png";

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
      title: "Smart Energy Monitoring",
      description: "Monitor your home's energy consumption in real-time with advanced smart technology.",
      bgColor: "bg-gradient-to-br from-blue-400 to-blue-600"
    },
    {
      image: onboarding2Image, 
      title: "Smart Home Control",
      description: "Control and manage your smart home devices with intuitive energy monitoring tools.",
      bgColor: "bg-gradient-to-br from-green-400 to-green-600"
    },
    {
      image: onboarding3Image,
      title: "Sustainable Living", 
      description: "Make eco-friendly choices with real-time energy insights and renewable energy tracking.",
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
    <div className="min-h-screen bg-white max-w-md mx-auto flex flex-col relative overflow-hidden">
      {/* Main Content */}
      <div className="flex-1">
        {/* Image Section - Full width untuk mobile */}
        <div className="h-80 flex items-center justify-center transition-all duration-500 bg-white px-4">
          <div className={`transform transition-all duration-700 ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
            <img 
              src={currentStepData.image}
              alt={currentStepData.title}
              className="w-full h-72 object-cover rounded-xl shadow-lg max-w-sm"
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 bg-white px-6 py-6 flex flex-col justify-between min-h-0">
          <div className={`transform transition-all duration-500 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            <h2 className="text-xl font-bold text-gray-900 mb-3 text-center">
              {currentStepData.title}
            </h2>
            <p className="text-gray-600 text-center leading-relaxed text-sm px-2">
              {currentStepData.description}
            </p>
          </div>

          {/* Progress Dots */}
          <div className="flex justify-center space-x-2 my-6">
            {onboardingSteps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentStep ? 'bg-teal-600 w-6' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          {/* Navigation */}
          <div className="space-y-3 pb-4">
            <Button 
              onClick={handleNext}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 text-base font-medium transition-all duration-200 hover:scale-[1.02] rounded-xl"
            >
              {currentStep === onboardingSteps.length - 1 ? 'Get Started' : 'Next'}
            </Button>
            
            <button
              onClick={handleSkip}
              className="w-full text-teal-600 py-2 text-base font-medium hover:text-teal-700 transition-colors"
            >
              Skip
            </button>
          </div>
        </div>
      </div>


    </div>
  );
}