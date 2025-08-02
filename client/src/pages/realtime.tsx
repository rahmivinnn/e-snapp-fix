import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useRealtimeData } from "@/hooks/use-energy-data";
import { Zap, Activity, Sun, Car, Battery, Plug, Bell, Plus } from "lucide-react";
import logoImage from "@assets/e snapp logo 1 (1)_1754149374420.png";
import houseVideo from "@assets/Administrator_ animation - rumah - Windows, Mac, Linux - Unity 6DX11_ 2025-07-27 13-37-39 (online-video-cutter.com)_1754152375569.mp4";

export default function RealtimePage() {
  const { realtimeData, currentPower } = useRealtimeData();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="max-w-md mx-auto px-4 space-y-4 pb-20">
      {/* Header with Logo and Actions */}
      <div className={`flex items-center justify-between mb-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <img 
          src={logoImage} 
          alt="e-snapp" 
          className="h-10 w-auto"
        />
        <div className="flex items-center space-x-3">
          <Bell className="h-6 w-6 text-gray-600 hover:text-primary transition-colors cursor-pointer" />
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors cursor-pointer">
            <Plus className="h-5 w-5 text-gray-600" />
          </div>
        </div>
      </div>

      {/* Live Power Usage Title */}
      <h1 className={`text-xl font-bold text-gray-800 mb-4 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        Live Power Usage
      </h1>

      {/* House Video Card */}
      <Card className={`relative overflow-hidden bg-gradient-to-br from-blue-50 to-cyan-50 transition-all duration-700 delay-300 hover:scale-105 hover:shadow-xl ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ height: "320px" }}>
        <CardContent className="p-0 h-full">
          <div className="relative h-full rounded-lg overflow-hidden">
            {/* Video Background - Clean, no overlays */}
            <video 
              src={houseVideo}
              autoPlay 
              loop 
              muted 
              className="w-full h-full object-cover"
            />
          </div>
        </CardContent>
      </Card>

      {/* Live Usage Card */}
      <Card className={`bg-gradient-to-br from-green-50 to-emerald-50 border-green-100 transition-all duration-700 delay-400 hover:scale-105 hover:shadow-xl ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary animate-pulse" />
              Live Usage
            </h3>
          </div>
          
          <div className="text-center mb-4">
            <div className="text-3xl font-bold text-gray-800 animate-pulse" key={currentPower}>
              {currentPower || "245"} W
            </div>
            <p className="text-xs text-gray-600">Updated just now</p>
          </div>
          
          {/* Animated Wave Chart */}
          <div className="h-20 bg-white/50 rounded-lg flex items-end justify-center overflow-hidden relative">
            <svg viewBox="0 0 400 80" className="w-full h-full">
              <path
                d="M0,40 Q50,20 100,40 T200,40 T300,40 T400,40"
                stroke="#10b981"
                strokeWidth="3"
                fill="none"
                className="animate-pulse"
              />
              <circle
                cx="350"
                cy="30"
                r="4"
                fill="#10b981"
                className="animate-bounce"
              />
            </svg>
            <div className="absolute top-2 right-2 w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
          </div>
        </CardContent>
      </Card>

      {/* Realtime Data Section */}
      <div className={`transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <h2 className="text-lg font-bold text-gray-800 mb-4">Realtime Data</h2>
        
        {/* Real-time Data Grid */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-white hover:scale-105 hover:shadow-xl transition-all duration-300">
            <CardContent className="p-4 text-center">
              <p className="text-sm text-gray-600 mb-1">Active Power</p>
              <p className="text-2xl font-bold text-gray-800 animate-pulse" key={currentPower}>
                {currentPower || "245"} W
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white hover:scale-105 hover:shadow-xl transition-all duration-300">
            <CardContent className="p-4 text-center">
              <p className="text-sm text-gray-600 mb-1">Reactive Power</p>
              <p className="text-2xl font-bold text-gray-800">246 VAR</p>
            </CardContent>
          </Card>

          <Card className="bg-white hover:scale-105 hover:shadow-xl transition-all duration-300">
            <CardContent className="p-4 text-center">
              <p className="text-sm text-gray-600 mb-1">Voltage</p>
              <p className="text-2xl font-bold text-gray-800">220 V</p>
            </CardContent>
          </Card>

          <Card className="bg-white hover:scale-105 hover:shadow-xl transition-all duration-300">
            <CardContent className="p-4 text-center">
              <p className="text-sm text-gray-600 mb-1">Power Factor</p>
              <p className="text-2xl font-bold text-gray-800">0.5</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}