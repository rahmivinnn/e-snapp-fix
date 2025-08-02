import { Card, CardContent } from "@/components/ui/card";
import LiveChart from "@/components/charts/live-chart";
import { useRealtimeData } from "@/hooks/use-energy-data";
import { Zap, Activity, Sun, Car, Battery, Plug } from "lucide-react";

export default function RealtimePage() {
  const { realtimeData, currentPower } = useRealtimeData();

  const powerBubbles = [
    { power: "145W", position: "top-4 left-4" },
    { power: "44W", position: "top-8 right-8" },
    { power: "123W", position: "bottom-20 left-8" },
    { power: "87W", position: "bottom-16 right-12" },
    { power: "1.71 kW", position: "top-1/2 left-2" },
  ];

  return (
    <div className="px-4 space-y-6">
      {/* Logo Section */}
      <div className="flex justify-center mb-6">
        <img 
          src="@assets/e snapp logo 1 (1)_1754147457582.png" 
          alt="e-snapp" 
          className="h-16 w-auto"
        />
      </div>

      {/* Header */}
      <h1 className="text-2xl font-bold text-gray-800">Live Power Usage</h1>

      {/* House Diagram Card */}
      <Card className="card-hover house-diagram relative overflow-hidden" style={{ height: "300px" }}>
        <CardContent className="p-0 h-full">
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Modern house illustration with energy indicators */}
            <div className="relative">
              {/* Solar panels on roof */}
              <div className="absolute -top-8 left-4 flex items-center">
                <Sun className="h-5 w-5 text-yellow-500 mr-2" />
                <div className="bg-white px-2 py-1 rounded-lg text-xs border shadow-sm">
                  <span className="font-bold">Produzione solare: 10 W</span>
                </div>
              </div>
              
              {/* House consumption */}
              <div className="absolute -top-4 right-0 flex items-center">
                <div className="bg-red-100 border border-red-300 px-2 py-1 rounded-lg text-xs">
                  <span className="font-bold text-red-700">Consumo casa: 1,75 kW</span>
                </div>
              </div>
              
              {/* EV Charging */}
              <div className="absolute bottom-8 -left-8 flex items-center">
                <Car className="h-5 w-5 text-blue-600 mr-2" />
                <div className="bg-white px-2 py-1 rounded-lg text-xs border shadow-sm">
                  <span className="font-bold text-yellow-600">Ricarica EV: 8,0 kW</span>
                </div>
              </div>
              
              {/* Battery */}
              <div className="absolute bottom-2 right-4 flex items-center">
                <div className="bg-green-100 border border-green-300 px-2 py-1 rounded-lg text-xs">
                  <span className="font-bold text-green-700">Batteria: 1,71 kW (80%)</span>
                </div>
                <Battery className="h-5 w-5 text-green-600 ml-2" />
              </div>
              
              {/* Grid connection */}
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex items-center">
                <div className="bg-gray-100 border px-2 py-1 rounded-lg text-xs">
                  <span className="font-bold">Prelievo da rete: 20 W</span>
                </div>
              </div>
              
              {/* Central house icon */}
              <div className="w-24 h-24 bg-primary rounded-lg flex items-center justify-center shadow-lg">
                <Plug className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>
          
          {/* Power usage bubbles */}
          {powerBubbles.map((bubble, index) => (
            <div key={index} className={`absolute power-bubble ${bubble.position}`}>
              <div className="bg-primary text-white px-3 py-2 rounded-full text-sm font-bold shadow-lg">
                {bubble.power}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Live Usage Card */}
      <Card className="card-hover bg-gradient-to-br from-blue-50 to-cyan-50">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              Live Usage
            </h3>
            <div className="animate-pulse-slow">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-800 mb-2">{currentPower} W</p>
          <p className="text-sm text-gray-600 mb-4">Updated just now</p>
          <div className="h-16">
            <LiveChart data={realtimeData} />
          </div>
        </CardContent>
      </Card>

      {/* Realtime Data Cards */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-800 flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          Realtime Data
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <Card className="card-hover">
            <CardContent className="p-4">
              <p className="text-sm text-gray-600 mb-1">Active Power</p>
              <p className="text-2xl font-bold text-gray-800">{currentPower} W</p>
            </CardContent>
          </Card>
          
          <Card className="card-hover">
            <CardContent className="p-4">
              <p className="text-sm text-gray-600 mb-1">Reactive Power</p>
              <p className="text-2xl font-bold text-gray-800">246 VAR</p>
            </CardContent>
          </Card>
          
          <Card className="card-hover">
            <CardContent className="p-4">
              <p className="text-sm text-gray-600 mb-1">Voltage</p>
              <p className="text-2xl font-bold text-gray-800">220 V</p>
            </CardContent>
          </Card>
          
          <Card className="card-hover">
            <CardContent className="p-4">
              <p className="text-sm text-gray-600 mb-1">Power Factor</p>
              <p className="text-2xl font-bold text-gray-800">0.5</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
