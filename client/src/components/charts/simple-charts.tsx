import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RotateCcw, Home, Award } from "lucide-react";

// Simple Energy Usage Chart - exactly like mockup
export function SimpleEnergyUsageChart() {
  const [animatedValues, setAnimatedValues] = useState({
    kitchen: 0,
    heating: 0,
    lighting: 0,
    other: 0,
    total: 0
  });

  const [animatedProgress, setAnimatedProgress] = useState({
    kitchen: 0,
    heating: 0,
    lighting: 0,
    other: 0
  });

  const finalValues = {
    kitchen: 46.8,
    heating: 31.2,
    lighting: 20.5,
    other: 10.8,
    total: 109
  };

  useEffect(() => {
    console.log("🎯 Energy Usage Chart mounting with animated numbers...");
    
    // Animated count-up effect
    const duration = 2000;
    const steps = 100;
    const stepDuration = duration / steps;
    
    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setAnimatedValues({
        kitchen: finalValues.kitchen * progress,
        heating: finalValues.heating * progress,
        lighting: finalValues.lighting * progress,
        other: finalValues.other * progress,
        total: finalValues.total * progress
      });
      
      setAnimatedProgress({
        kitchen: 43 * progress,
        heating: 29 * progress,
        lighting: 19 * progress,
        other: 9 * progress
      });
      
      if (currentStep >= steps) {
        clearInterval(interval);
        setAnimatedValues(finalValues);
        setAnimatedProgress({
          kitchen: 43,
          heating: 29,
          lighting: 19,
          other: 9
        });
      }
    }, stepDuration);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-0">
      <CardContent className="p-4">
        <h3 className="text-base font-semibold text-slate-700 mb-4">Energy Usage by Category</h3>
        
        <div className="flex items-center justify-between gap-4">
          {/* Enhanced Donut Chart */}
          <div className="relative w-24 h-24 flex-shrink-0">
            <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle cx="50" cy="50" r="36" fill="none" stroke="#f1f5f9" strokeWidth="8" />
              
              {/* Kitchen - Orange */}
              <circle 
                cx="50" cy="50" r="36" 
                fill="none" 
                stroke="#f97316" 
                strokeWidth="6"
                strokeDasharray={`${animatedProgress.kitchen * 2.26} 226`}
                strokeDashoffset="0"
                className="transition-all duration-1000 ease-out"
              />
              
              {/* Heating - Blue */}
              <circle 
                cx="50" cy="50" r="36" 
                fill="none" 
                stroke="#3b82f6" 
                strokeWidth="6"
                strokeDasharray={`${animatedProgress.heating * 2.26} 226`}
                strokeDashoffset={`-${animatedProgress.kitchen * 2.26}`}
                className="transition-all duration-1000 ease-out"
              />
              
              {/* Lighting - Green */}
              <circle 
                cx="50" cy="50" r="36" 
                fill="none" 
                stroke="#22c55e" 
                strokeWidth="6"
                strokeDasharray={`${animatedProgress.lighting * 2.26} 226`}
                strokeDashoffset={`-${(animatedProgress.kitchen + animatedProgress.heating) * 2.26}`}
                className="transition-all duration-1000 ease-out"
              />
              
              {/* Other - Gray */}
              <circle 
                cx="50" cy="50" r="36" 
                fill="none" 
                stroke="#6b7280" 
                strokeWidth="6"
                strokeDasharray={`${animatedProgress.other * 2.26} 226`}
                strokeDashoffset={`-${(animatedProgress.kitchen + animatedProgress.heating + animatedProgress.lighting) * 2.26}`}
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-lg font-bold text-slate-800">{Math.round(animatedValues.total)}</div>
                <div className="text-xs text-slate-500 -mt-1">kWh</div>
              </div>
            </div>
          </div>

          {/* Enhanced Legend */}
          <div className="flex-1 space-y-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-sm bg-orange-500"></div>
                <span className="text-xs text-gray-700">Kitchen</span>
              </div>
              <span className="text-xs font-semibold text-gray-800">{animatedValues.kitchen.toFixed(1)} kWh</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-sm bg-blue-500"></div>
                <span className="text-xs text-gray-700">Heating</span>
              </div>
              <span className="text-xs font-semibold text-gray-800">{animatedValues.heating.toFixed(1)} kWh</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-sm bg-green-500"></div>
                <span className="text-xs text-gray-700">Lighting</span>
              </div>
              <span className="text-xs font-semibold text-gray-800">{animatedValues.lighting.toFixed(1)} kWh</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-sm bg-gray-400"></div>
                <span className="text-xs text-gray-700">Other</span>
              </div>
              <span className="text-xs font-semibold text-gray-800">{animatedValues.other.toFixed(1)} kWh</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Simple Home Performance Chart
export function SimpleHomePerformanceChart() {
  const [animatedBars, setAnimatedBars] = useState({
    average: 0,
    yours: 0,
    efficient: 0
  });

  useEffect(() => {
    console.log("🏠 Home Performance Chart mounting with animated bars...");
    
    // Animated count-up effect for bars
    const duration = 2500;
    const steps = 100;
    const stepDuration = duration / steps;
    
    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setAnimatedBars({
        average: 71 * progress,
        yours: 57 * progress,
        efficient: 47 * progress
      });
      
      if (currentStep >= steps) {
        clearInterval(interval);
        setAnimatedBars({
          average: 71,
          yours: 57,
          efficient: 47
        });
      }
    }, stepDuration);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 text-white shadow-lg border-0 rounded-xl overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-teal-400 rounded-md flex items-center justify-center">
              <Home className="h-3 w-3 text-gray-800" />
            </div>
            <h3 className="text-sm font-semibold text-white">Home Performance</h3>
          </div>
          <div className="bg-teal-400 text-gray-800 px-2 py-0.5 rounded-full text-xs font-bold">
            +15%
          </div>
        </div>

        <div className="mb-4">
          <div className="text-2xl font-bold text-white">64%</div>
          <div className="text-xs text-gray-300">Better than of homes of similar area.</div>
        </div>

        <div className="flex items-end justify-between gap-2 h-16">
          <div className="flex-1 text-center">
            <div className="text-xs font-bold text-white mb-1">€{Math.round(animatedBars.average)}.00</div>
            <div 
              className="w-full bg-gray-600 rounded-t transition-all duration-1000 ease-out"
              style={{ height: `${(animatedBars.average / 80) * 100}%`, minHeight: '16px' }}
            />
            <div className="text-xs text-gray-400 mt-1">Average</div>
          </div>

          <div className="flex-1 text-center">
            <div className="text-xs font-bold text-white mb-1">€{Math.round(animatedBars.yours)}.00</div>
            <div 
              className="w-full bg-orange-500 rounded-t transition-all duration-1000 ease-out shadow-md"
              style={{ height: `${(animatedBars.yours / 80) * 100}%`, minHeight: '20px' }}
            />
            <div className="text-xs text-white font-semibold mt-1">Yours</div>
          </div>

          <div className="flex-1 text-center">
            <div className="text-xs font-bold text-white mb-1">€{Math.round(animatedBars.efficient)}.00</div>
            <div 
              className="w-full bg-gray-600 rounded-t transition-all duration-1000 ease-out"
              style={{ height: `${(animatedBars.efficient / 80) * 100}%`, minHeight: '14px' }}
            />
            <div className="text-xs text-gray-400 mt-1">Most Efficient</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Simple Billing Cycle Chart
export function SimpleBillingCycleChart() {
  const [animatedUsage, setAnimatedUsage] = useState(0);
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const currentUsage = 109;
  const forecast = 383;
  const progressPercentage = (animatedUsage / forecast) * 100;

  useEffect(() => {
    console.log("📊 Billing Cycle Chart mounting with animated progress...");
    
    // Animated count-up effect for usage
    const duration = 2000;
    const steps = 80;
    const stepDuration = duration / steps;
    
    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setAnimatedUsage(currentUsage * progress);
      setAnimatedProgress(28.5 * progress);
      
      if (currentStep >= steps) {
        clearInterval(interval);
        setAnimatedUsage(currentUsage);
        setAnimatedProgress(28.5);
      }
    }, stepDuration);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="bg-white shadow-lg border border-gray-100 rounded-xl overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-5 h-5 bg-teal-500 rounded-md flex items-center justify-center">
            <RotateCcw className="h-3 w-3 text-white" />
          </div>
          <h3 className="text-sm font-semibold text-gray-700">Current Billing Cycle</h3>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between text-xs text-gray-500">
            <span>01 Jul - 31 Aug 2025</span>
            <span>45 Days Remaining</span>
          </div>

          <div className="flex items-end justify-end">
            <div className="bg-gray-500 text-white px-4 py-2 rounded-lg text-right">
              <div className="text-lg font-bold">{forecast} kWh</div>
              <div className="text-xs opacity-90">Forecast</div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-teal-500 h-full rounded-full transition-all duration-1500 ease-out" 
                style={{ width: `${animatedProgress}%` }}
              />
            </div>
            <div className="flex justify-between items-center text-xs text-gray-600">
              <span>0 kWh</span>
              <span className="font-semibold text-teal-500">{animatedProgress.toFixed(1)}% used</span>
              <span>{forecast} kWh</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}