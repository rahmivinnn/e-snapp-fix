import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RotateCcw } from "lucide-react";

// Redesigned Energy Usage Chart - crisp and identical to mockup
export function RedesignedEnergyUsageChart() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card 
      className={`bg-white shadow-lg transition-all duration-300 transform cursor-pointer ${
        isHovered ? 'shadow-xl scale-[1.02]' : 'hover:shadow-xl hover:scale-[1.01]'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-4">
        <h3 className="text-base font-semibold text-gray-700 mb-4">Energy Usage by Category</h3>
        
        {/* Donut Chart Section */}
        <div className="flex items-center justify-between">
          {/* Donut Chart */}
          <div className="relative w-24 h-24">
            <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle cx="50" cy="50" r="40" fill="none" stroke="#f3f4f6" strokeWidth="8" />
              
              {/* Kitchen - Orange */}
              <circle 
                cx="50" cy="50" r="40" 
                fill="none" 
                stroke="#FF6B35" 
                strokeWidth="8"
                strokeDasharray="108 252"
                strokeDashoffset="0"
                className="transition-all duration-300"
              />
              
              {/* Heating - Blue */}
              <circle 
                cx="50" cy="50" r="40" 
                fill="none" 
                stroke="#4A90E2" 
                strokeWidth="8"
                strokeDasharray="74 286"
                strokeDashoffset="-108"
                className="transition-all duration-300"
              />
              
              {/* Lighting - Green */}
              <circle 
                cx="50" cy="50" r="40" 
                fill="none" 
                stroke="#7ED321" 
                strokeWidth="8"
                strokeDasharray="52 308"
                strokeDashoffset="-182"
                className="transition-all duration-300"
              />
              
              {/* Other - Gray */}
              <circle 
                cx="50" cy="50" r="40" 
                fill="none" 
                stroke="#D0D0D0" 
                strokeWidth="8"
                strokeDasharray="27 333"
                strokeDashoffset="-234"
                className="transition-all duration-300"
              />
            </svg>
            
            {/* Center Text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-lg font-bold text-gray-800">109kWh</div>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="flex-1 ml-6 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-[#FF6B35]"></div>
                <span className="text-sm text-gray-700">Kitchen</span>
              </div>
              <span className="text-sm font-semibold text-gray-800">46.8 kWh</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-[#4A90E2]"></div>
                <span className="text-sm text-gray-700">Heating</span>
              </div>
              <span className="text-sm font-semibold text-gray-800">31.2 kWh</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-[#7ED321]"></div>
                <span className="text-sm text-gray-700">Lighting</span>
              </div>
              <span className="text-sm font-semibold text-gray-800">20.5 kWh</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-[#D0D0D0]"></div>
                <span className="text-sm text-gray-700">Other</span>
              </div>
              <span className="text-sm font-semibold text-gray-800">10.8 kWh</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Redesigned Home Performance Chart
export function RedesignedHomePerformanceChart() {
  const [hoveredBar, setHoveredBar] = useState<string | null>(null);

  return (
    <Card className="bg-gradient-to-br from-gray-800 to-gray-900 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-teal-400 rounded flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-sm"></div>
            </div>
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

        <div className="flex items-end justify-between gap-4 h-20">
          {/* Average Bar */}
          <div 
            className="flex-1 flex flex-col items-center gap-2"
            onMouseEnter={() => setHoveredBar('average')}
            onMouseLeave={() => setHoveredBar(null)}
          >
            <div className="text-xs font-bold text-white">€71.00</div>
            <div 
              className={`w-full bg-gray-500 rounded-lg transition-all duration-300 cursor-pointer ${
                hoveredBar === 'average' ? 'transform scale-110' : ''
              }`}
              style={{ height: '70%' }}
            />
            <div className="text-xs text-gray-300 text-center">Average</div>
          </div>

          {/* Yours Bar - Highlighted */}
          <div 
            className="flex-1 flex flex-col items-center gap-2"
            onMouseEnter={() => setHoveredBar('yours')}
            onMouseLeave={() => setHoveredBar(null)}
          >
            <div className="text-xs font-bold text-white">€57.00</div>
            <div 
              className={`w-full bg-orange-500 rounded-lg shadow-lg transition-all duration-300 cursor-pointer ${
                hoveredBar === 'yours' ? 'transform scale-110' : ''
              }`}
              style={{ height: '80%' }}
            />
            <div className="text-xs text-white font-semibold text-center">Yours</div>
          </div>

          {/* Most Efficient Bar */}
          <div 
            className="flex-1 flex flex-col items-center gap-2"
            onMouseEnter={() => setHoveredBar('efficient')}
            onMouseLeave={() => setHoveredBar(null)}
          >
            <div className="text-xs font-bold text-white">€47.00</div>
            <div 
              className={`w-full bg-gray-500 rounded-lg transition-all duration-300 cursor-pointer ${
                hoveredBar === 'efficient' ? 'transform scale-110' : ''
              }`}
              style={{ height: '60%' }}
            />
            <div className="text-xs text-gray-300 text-center">Most Efficient</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Redesigned Billing Cycle Chart
export function RedesignedBillingCycleChart() {
  const [isHovered, setIsHovered] = useState(false);
  const currentUsage = 109;
  const forecast = 383;
  const progressPercentage = (currentUsage / forecast) * 100;

  return (
    <Card 
      className={`bg-gradient-to-br from-cyan-50 to-blue-50 shadow-lg transition-all duration-300 transform cursor-pointer ${
        isHovered ? 'shadow-xl scale-[1.02]' : 'hover:shadow-xl hover:scale-[1.01]'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
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
            <div className="bg-teal-600 text-white px-3 py-2 rounded-lg text-center min-w-[80px] transform hover:scale-105 transition-transform">
              <div className="text-lg font-bold">{currentUsage} kWh</div>
              <div className="text-xs opacity-90">Current</div>
            </div>
            
            <div className="bg-gray-400 text-white px-3 py-2 rounded-lg text-center min-w-[80px] transform hover:scale-105 transition-transform">
              <div className="text-lg font-bold">{forecast} kWh</div>
              <div className="text-xs opacity-90">Forecast</div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-teal-600 h-full rounded-full transition-all duration-500" 
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