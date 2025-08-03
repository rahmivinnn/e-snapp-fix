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

  const finalValues = {
    kitchen: 46.8,
    heating: 31.2,
    lighting: 20.5,
    other: 10.8,
    total: 109
  };

  useEffect(() => {
    console.log("🎯 Energy Usage Chart mounting...");
    const timer = setTimeout(() => {
      setAnimatedValues(finalValues);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Card className="bg-white shadow-md hover:shadow-lg transition-all duration-300">
      <CardContent className="p-4">
        <h3 className="text-base font-semibold text-gray-700 mb-4">Energy Usage by Category</h3>
        
        <div className="flex items-center justify-between">
          {/* Simple Donut Chart */}
          <div className="relative w-20 h-20">
            <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="35" fill="none" stroke="#f3f4f6" strokeWidth="10" />
              <circle 
                cx="50" cy="50" r="35" 
                fill="none" 
                stroke="#FF6B35" 
                strokeWidth="10"
                strokeDasharray="75 145"
                strokeDashoffset="0"
              />
              <circle 
                cx="50" cy="50" r="35" 
                fill="none" 
                stroke="#4A90E2" 
                strokeWidth="10"
                strokeDasharray="52 168"
                strokeDashoffset="-75"
              />
              <circle 
                cx="50" cy="50" r="35" 
                fill="none" 
                stroke="#7ED321" 
                strokeWidth="10"
                strokeDasharray="35 185"
                strokeDashoffset="-127"
              />
              <circle 
                cx="50" cy="50" r="35" 
                fill="none" 
                stroke="#D0D0D0" 
                strokeWidth="10"
                strokeDasharray="18 202"
                strokeDashoffset="-162"
              />
            </svg>
            
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-sm font-bold text-gray-800">{Math.round(animatedValues.total)}kWh</div>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="flex-1 ml-4 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-[#FF6B35]"></div>
                <span className="text-sm text-gray-700">Kitchen</span>
              </div>
              <span className="text-sm font-semibold text-gray-800">{animatedValues.kitchen.toFixed(1)} kWh</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-[#4A90E2]"></div>
                <span className="text-sm text-gray-700">Heating</span>
              </div>
              <span className="text-sm font-semibold text-gray-800">{animatedValues.heating.toFixed(1)} kWh</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-[#7ED321]"></div>
                <span className="text-sm text-gray-700">Lighting</span>
              </div>
              <span className="text-sm font-semibold text-gray-800">{animatedValues.lighting.toFixed(1)} kWh</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-[#D0D0D0]"></div>
                <span className="text-sm text-gray-700">Other</span>
              </div>
              <span className="text-sm font-semibold text-gray-800">{animatedValues.other.toFixed(1)} kWh</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Simple Home Performance Chart
export function SimpleHomePerformanceChart() {
  return (
    <Card className="bg-gradient-to-br from-gray-800 to-gray-900 text-white shadow-md">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Home className="h-5 w-5 text-teal-400" />
            <h3 className="text-base font-semibold">Home Performance</h3>
          </div>
          <div className="bg-teal-400 text-gray-900 px-2 py-1 rounded-full text-xs font-bold">
            +15%
          </div>
        </div>

        <div className="mb-4">
          <div className="text-2xl font-bold">64%</div>
          <div className="text-sm text-gray-300">Better than of homes of similar area.</div>
        </div>

        <div className="flex items-end justify-between gap-4 h-16">
          <div className="flex-1 flex flex-col items-center gap-2">
            <div className="text-xs font-bold text-white">€71.00</div>
            <div className="w-full bg-gray-500 rounded-lg h-10" />
            <div className="text-xs text-gray-300 text-center">Average</div>
          </div>

          <div className="flex-1 flex flex-col items-center gap-2">
            <div className="text-xs font-bold text-white">€57.00</div>
            <div className="w-full bg-orange-500 rounded-lg h-12 shadow-lg" />
            <div className="text-xs text-white font-semibold text-center">Yours</div>
          </div>

          <div className="flex-1 flex flex-col items-center gap-2">
            <div className="text-xs font-bold text-white">€47.00</div>
            <div className="w-full bg-gray-500 rounded-lg h-8" />
            <div className="text-xs text-gray-300 text-center">Most Efficient</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Simple Billing Cycle Chart
export function SimpleBillingCycleChart() {
  const [animatedUsage, setAnimatedUsage] = useState(0);
  const currentUsage = 109;
  const forecast = 383;
  const progressPercentage = (animatedUsage / forecast) * 100;

  useEffect(() => {
    console.log("📊 Billing Cycle Chart mounting...");
    const timer = setTimeout(() => {
      setAnimatedUsage(currentUsage);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Card className="bg-gradient-to-br from-cyan-50 to-blue-50 shadow-md">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <RotateCcw className="h-5 w-5 text-teal-600" />
          <h3 className="text-base font-semibold text-gray-800">Current Billing Cycle</h3>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between text-sm text-gray-600">
            <span>01 Jul - 31 Aug 2025</span>
            <span>45 Days Remaining</span>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="bg-teal-600 text-white px-3 py-2 rounded-lg text-center min-w-[80px]">
              <div className="text-lg font-bold">{Math.round(animatedUsage)} kWh</div>
              <div className="text-xs opacity-90">Current</div>
            </div>
            
            <div className="bg-gray-400 text-white px-3 py-2 rounded-lg text-center min-w-[80px]">
              <div className="text-lg font-bold">{forecast} kWh</div>
              <div className="text-xs opacity-90">Forecast</div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-teal-600 h-full rounded-full transition-all duration-1000" 
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-600">
              <span>0 kWh</span>
              <span className="font-bold text-teal-600">{progressPercentage.toFixed(1)}% used</span>
              <span>{forecast} kWh</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}