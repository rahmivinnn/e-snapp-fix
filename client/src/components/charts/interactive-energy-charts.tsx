import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Utensils, Thermometer, Lightbulb, Zap, Home, Award, TrendingUp, BarChart3 } from "lucide-react";
import energyUsageImage from "@assets/Frame 427319577_1754191302980.png";
import homePerformanceImage from "@assets/Frame 427319559_1754191302980.png";
import billingCycleImage from "@assets/Frame 427319545_1754191302981.png";

// Energy Usage by Category Chart
export function EnergyUsageChart() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img 
        src={energyUsageImage}
        alt="Energy Usage by Category"
        className={`w-full h-auto transition-all duration-300 ${isHovered ? 'brightness-110 scale-105' : 'brightness-100'}`}
      />
      {/* Interactive overlay */}
      <div className={`absolute inset-0 bg-blue-500/10 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
      
      {/* Floating info on hover */}
      {isHovered && (
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-lg animate-fade-in">
          <div className="text-xs font-medium text-gray-800">Total: 109kWh</div>
          <div className="text-xs text-gray-600">Tap for details</div>
        </div>
      )}
    </div>
  );
}

// Home Performance Chart
export function HomePerformanceChart() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img 
        src={homePerformanceImage}
        alt="Home Performance"
        className={`w-full h-auto transition-all duration-300 ${isHovered ? 'brightness-110 scale-105' : 'brightness-100'}`}
      />
      {/* Interactive overlay */}
      <div className={`absolute inset-0 bg-orange-500/10 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
      
      {/* Floating info on hover */}
      {isHovered && (
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-lg animate-fade-in">
          <div className="text-xs font-medium text-gray-800">64% Better</div>
          <div className="text-xs text-gray-600">€57.00 yours</div>
        </div>
      )}
    </div>
  );
}

// Billing Cycle Chart
export function BillingCycleChart() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img 
        src={billingCycleImage}
        alt="Current Billing Cycle"
        className={`w-full h-auto transition-all duration-300 ${isHovered ? 'brightness-110 scale-105' : 'brightness-100'}`}
      />
      {/* Interactive overlay */}
      <div className={`absolute inset-0 bg-cyan-500/10 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
      
      {/* Floating info on hover */}
      {isHovered && (
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-lg animate-fade-in">
          <div className="text-xs font-medium text-gray-800">109/383 kWh</div>
          <div className="text-xs text-gray-600">45 days left</div>
        </div>
      )}
    </div>
  );
}