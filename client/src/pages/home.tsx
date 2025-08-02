import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import UsageChart from "@/components/charts/usage-chart";
import { useEnergyData } from "@/hooks/use-energy-data";
import { mockUsageData } from "@/lib/mock-data";
import { Zap, Home, Lightbulb, Leaf, TrendingUp, RotateCcw, Activity, ChevronRight } from "lucide-react";
import type { BillingData } from "@shared/schema";
import logoImage from "@assets/e snapp logo 1 (1)_1754149374420.png";

export default function HomePage() {
  const { billingData } = useEnergyData();
  const [isVisible, setIsVisible] = useState(false);
  const [pulseKey, setPulseKey] = useState(0);
  
  const progressPercentage = billingData && billingData.energyUsed ? 
    (parseFloat(billingData.energyUsed) / 383) * 100 : 28;

  useEffect(() => {
    setIsVisible(true);
    // Pulse effect for energy data updates
    const interval = setInterval(() => {
      setPulseKey(prev => prev + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-md mx-auto px-2 space-y-2 pb-16 min-h-screen">
      {/* Logo Section */}
      <div className={`flex justify-center mb-1 pt-1 transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        <img 
          src={logoImage} 
          alt="e-snapp" 
          className="h-8 w-auto filter drop-shadow-md hover:scale-110 transition-transform"
        />
      </div>

      {/* Greeting Section */}
      <div className={`mb-2 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <h1 className="text-base font-bold text-gray-800">Hello, Inayat</h1>
        <p className="text-gray-600 text-sm">Today is Tuesday, 22 July</p>
        <div className="mt-1.5 flex items-center space-x-2">
          <Badge className={`bg-primary text-white text-xs animate-pulse`} key={pulseKey}>
            <Activity className="h-3 w-3 mr-1" />
            1 kWh
          </Badge>
          <span className="text-xs text-gray-600">EUR</span>
        </div>
      </div>

      {/* Current Billing Cycle Card */}
      <Card className={`card-hover bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-100 transition-all duration-700 delay-300 hover:scale-105 hover:shadow-xl ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <CardContent className="p-3">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2 text-sm">
              <RotateCcw className="h-4 w-4 text-primary animate-spin-slow" />
              Current Billing Cycle
            </h3>
            <ChevronRight className="h-4 w-4 text-gray-400 hover:text-primary transition-colors" />
          </div>
          <div className="text-xs text-gray-600 mb-3 space-y-1">
            <p>{billingData?.period || "01 Jul - 31 Aug 2025"}</p>
            <p>45 Days Remaining</p>
          </div>
          <div className="flex justify-between items-center mb-2">
            <div className="bg-primary text-white px-2 py-1 rounded-lg text-xs font-medium text-center">
              <div>{billingData?.energyUsed || "109"} kWh</div>
              <div className="text-xs opacity-90">Current</div>
            </div>
            <div className="bg-gray-400 text-white px-3 py-2 rounded-lg text-sm font-medium text-center">
              <div>383 kWh</div>
              <div className="text-xs opacity-90">Limit</div>
            </div>
          </div>
          <Progress value={progressPercentage} className="h-3" />
        </CardContent>
      </Card>

      {/* Home Performance Card */}
      <Card className={`card-hover transition-all duration-700 delay-400 hover:scale-105 hover:shadow-xl ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
              <Home className="h-5 w-5 text-primary" />
              Home Performance
            </h3>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="bg-green-100 text-green-800 animate-bounce">
                + 15%
              </Badge>
              <ChevronRight className="h-4 w-4 text-gray-400 hover:text-primary transition-colors" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            64% Better than homes of similar area.
          </p>
          <div className="flex justify-between items-end">
            <div className="text-center">
              <div className="w-16 h-24 bg-gray-400 rounded-t-lg mb-2 relative overflow-hidden">
                <div className="absolute bottom-0 w-full bg-gray-500 rounded-t-lg h-3/5"></div>
              </div>
              <p className="text-xs text-gray-600">Average</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-32 bg-accent rounded-t-lg mb-2 relative overflow-hidden flex items-center justify-center">
                <Home className="h-6 w-6 text-white" />
              </div>
              <p className="text-xs font-semibold text-accent">Yours</p>
              <p className="text-sm font-bold text-gray-800">
                €{billingData?.currentBill || "57.00"}
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-20 bg-gray-400 rounded-t-lg mb-2 relative overflow-hidden">
                <div className="absolute bottom-0 w-full bg-gray-500 rounded-t-lg h-2/5"></div>
              </div>
              <p className="text-xs text-gray-600">Most Efficient</p>
              <p className="text-sm text-gray-800">€47.00</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CO2 Emissions Card */}
      <Card className="card-hover bg-primary text-white">
        <CardContent className="p-4">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Leaf className="h-5 w-5" />
            CO₂ Emissions & Savings
          </h3>
          <div className="flex justify-between">
            <div className="text-center">
              <p className="text-2xl font-bold">
                {billingData?.co2Emitted || "42.7"} kg
              </p>
              <p className="text-sm opacity-90">CO₂ Emitted</p>
            </div>
            <div className="w-px bg-white opacity-30"></div>
            <div className="text-center">
              <p className="text-2xl font-bold">
                {billingData?.co2Avoided || "12.1"} kg
              </p>
              <p className="text-sm opacity-90">CO₂ Avoided</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Energy Usage by Category */}
      <Card className="card-hover">
        <CardContent className="p-4">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            Energy Usage by Category
          </h3>
          <div className="flex items-center justify-center mb-4">
            <div className="relative w-32 h-32">
              <UsageChart data={mockUsageData} />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-xl font-bold text-gray-800">109kWh</p>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            {[
              { label: "Kitchen", value: "46.8 kWh", color: "bg-chart-1" },
              { label: "Heating", value: "31.2 kWh", color: "bg-chart-2" },
              { label: "Lighting", value: "20.5 kWh", color: "bg-chart-3" },
              { label: "Other", value: "10.8 kWh", color: "bg-chart-4" },
            ].map(({ label, value, color }) => (
              <div key={label} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${color}`}></div>
                  <span className="text-sm">{label}</span>
                </div>
                <span className="text-sm font-semibold">{value}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Smart Suggestions Card */}
      <Card className="card-hover bg-green-100 border-green-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-green-600" />
              Smart Suggestions
            </h3>
          </div>
          <p className="text-sm text-gray-700 mb-3">
            Tip: "Try reducing dryer use during peak hours."
          </p>
          <Button variant="ghost" className="text-green-700 hover:text-green-800 p-0 h-auto">
            See All Tips
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
