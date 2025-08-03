import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Zap } from "lucide-react";
import Header from "@/components/layout/header";
import BottomNavigation from "@/components/layout/bottom-navigation";
import houseImage from "@assets/Group 878_1754192928483.png";

interface PowerUsage {
  area: string;
  value: number;
  unit: string;
  position: { top: string; left: string };
}

export default function RealtimePage() {
  const [currentUsage, setCurrentUsage] = useState(245);
  const [animatedUsage, setAnimatedUsage] = useState(0);
  const [powerData, setPowerData] = useState<PowerUsage[]>([
    { area: "1.71 kW", value: 1.71, unit: "kW", position: { top: "45%", left: "12%" } },
    { area: "145W", value: 145, unit: "W", position: { top: "25%", left: "25%" } },
    { area: "44W", value: 44, unit: "W", position: { top: "15%", left: "45%" } },
    { area: "123W", value: 123, unit: "W", position: { top: "25%", left: "65%" } },
    { area: "87W", value: 87, unit: "W", position: { top: "45%", left: "80%" } },
  ]);

  useEffect(() => {
    // Animate main usage number
    const duration = 2000;
    const steps = 80;
    const stepDuration = duration / steps;
    
    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setAnimatedUsage(currentUsage * progress);
      
      if (currentStep >= steps) {
        clearInterval(interval);
        setAnimatedUsage(currentUsage);
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, [currentUsage]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentUsage(prev => {
        const variation = (Math.random() - 0.5) * 20;
        return Math.max(200, Math.min(300, prev + variation));
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen">
      <Header />
      
      <div className="px-4 py-4 space-y-4">
        {/* Title */}
        <h1 className="text-lg font-semibold text-gray-800">Live Power Usage</h1>

        {/* House Visualization */}
        <Card className="bg-gradient-to-br from-cyan-50 to-blue-100 border-0 overflow-hidden">
          <CardContent className="p-4">
            <div className="relative">
              <img 
                src={houseImage} 
                alt="House Power Usage" 
                className="w-full h-auto rounded-lg"
              />
              
              {/* Power usage bubbles */}
              {powerData.map((item, index) => (
                <div
                  key={index}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2"
                  style={{ top: item.position.top, left: item.position.left }}
                >
                  <div className="bg-teal-600 text-white px-2 py-1 rounded-full text-xs font-semibold shadow-lg relative">
                    {item.area}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-4 border-transparent border-t-teal-600"></div>
                  </div>
                  {/* Dotted line to house */}
                  <div className="absolute top-6 left-1/2 w-0.5 h-8 border-l-2 border-dashed border-teal-600 transform -translate-x-1/2"></div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Live Usage Card */}
        <Card className="bg-white shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-blue-500" />
                <h3 className="font-semibold text-gray-800">Live Usage</h3>
              </div>
              <div className="text-xs text-gray-500">Updated just now</div>
            </div>
            
            <div className="flex items-end gap-4">
              <div>
                <div className="text-2xl font-bold text-gray-800">
                  {Math.round(animatedUsage)} W
                </div>
                <div className="text-sm text-gray-600">Current Power</div>
              </div>
              
              {/* Mini bar chart */}
              <div className="flex-1 flex items-end justify-end gap-1 h-16">
                {[40, 30, 60, 45, 80, 35, 90].map((height, index) => (
                  <div
                    key={index}
                    className={`w-3 bg-gradient-to-t from-blue-400 to-blue-500 rounded-t transition-all duration-300 ${
                      index === 6 ? 'bg-gradient-to-t from-teal-500 to-teal-600' : ''
                    }`}
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Compared to Previous */}
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-800">Compared to Previous</h3>
          
          <div className="grid grid-cols-2 gap-3">
            <Card className="bg-white shadow-sm">
              <CardContent className="p-3 text-center">
                <div className="text-xs text-gray-500 mb-1">Active Power</div>
                <div className="text-lg font-bold text-gray-800">245 W</div>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-sm">
              <CardContent className="p-3 text-center">
                <div className="text-xs text-gray-500 mb-1">Reactive Power</div>
                <div className="text-lg font-bold text-gray-800">246 VAR</div>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-sm">
              <CardContent className="p-3 text-center">
                <div className="text-xs text-gray-500 mb-1">Voltage</div>
                <div className="text-lg font-bold text-gray-800">220 V</div>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-sm">
              <CardContent className="p-3 text-center">
                <div className="text-xs text-gray-500 mb-1">Power Factor</div>
                <div className="text-lg font-bold text-gray-800">0.5</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}