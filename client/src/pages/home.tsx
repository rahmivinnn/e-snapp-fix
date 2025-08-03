import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { EnergyUsageChart, HomePerformanceChart, BillingCycleChart } from "@/components/charts/interactive-energy-charts";
import { useEnergyData } from "@/hooks/use-energy-data";
import { Zap, Home, Lightbulb, Leaf, TrendingUp, RotateCcw, Activity, ChevronRight, Clock, Euro, Menu, BarChart3 } from "lucide-react";
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

      {/* Interactive Charts Section */}
      <div className={`space-y-3 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        {/* Billing Cycle Chart */}
        <BillingCycleChart />
        
        {/* Energy Usage Chart */}
        <EnergyUsageChart />
        
        {/* Home Performance Chart */}
        <HomePerformanceChart />
      </div>

      {/* CO2 Emissions Card */}
      <Card className="card-hover bg-primary text-white">
        <CardContent className="p-2">
          <h3 className="font-semibold mb-2 flex items-center gap-1 text-xs">
            <Leaf className="h-3 w-3" />
            CO₂ Emissions & Savings
          </h3>
          <div className="flex justify-between">
            <div className="text-center">
              <p className="text-lg font-bold">
                {billingData?.co2Emitted || "42.7"} kg
              </p>
              <p className="text-xs opacity-90">CO₂ Emitted</p>
            </div>
            <div className="w-px bg-white opacity-30"></div>
            <div className="text-center">
              <p className="text-lg font-bold">
                {billingData?.co2Avoided || "12.1"} kg
              </p>
              <p className="text-xs opacity-90">CO₂ Avoided</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Energy Usage by Category */}
      <Card className="card-hover">
        <CardContent className="p-2">
          <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-1 text-xs">
            <Zap className="h-3 w-3 text-primary" />
            Energy Usage by Category
          </h3>
          <div className="flex items-center justify-center mb-2">
            <div className="relative w-24 h-24">
  
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-sm font-bold text-gray-800">109kWh</p>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-1">
            {[
              { label: "Kitchen", value: "46.8 kWh", color: "bg-chart-1" },
              { label: "Heating", value: "31.2 kWh", color: "bg-chart-2" },
              { label: "Lighting", value: "20.5 kWh", color: "bg-chart-3" },
              { label: "Other", value: "10.8 kWh", color: "bg-chart-4" },
            ].map(({ label, value, color }) => (
              <div key={label} className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <div className={`w-2 h-2 rounded-full ${color}`}></div>
                  <span className="text-xs">{label}</span>
                </div>
                <span className="text-xs font-semibold">{value}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Smart Suggestions Card */}
      <Card className="card-hover bg-green-100 border-green-200">
        <CardContent className="p-2">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-semibold text-gray-800 flex items-center gap-1 text-xs">
              <Lightbulb className="h-3 w-3 text-green-600" />
              Smart Suggestions
            </h3>
          </div>
          <p className="text-xs text-gray-700 mb-2">
            Tip: "Try reducing dryer use during peak hours."
          </p>
          <Button variant="ghost" className="text-green-700 hover:text-green-800 p-0 h-auto text-xs">
            See All Tips
          </Button>
        </CardContent>
      </Card>

      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 max-w-md mx-auto">
        <div className="flex items-center justify-around py-2">
          <button className="flex flex-col items-center p-2 text-gray-600 hover:text-primary transition-colors">
            <Home className="h-5 w-5" />
            <span className="text-xs mt-1">Home</span>
          </button>
          
          <button className="flex flex-col items-center p-2 text-gray-400 hover:text-primary transition-colors">
            <TrendingUp className="h-5 w-5" />
            <span className="text-xs mt-1">Trend</span>
          </button>
          
          <button className="flex flex-col items-center p-2 text-gray-400 hover:text-primary transition-colors">
            <Clock className="h-5 w-5" />
            <span className="text-xs mt-1">Realtime</span>
          </button>
          
          <button className="flex flex-col items-center p-2 text-gray-400 hover:text-primary transition-colors">
            <Euro className="h-5 w-5" />
            <span className="text-xs mt-1">Economics</span>
          </button>
          
          <button className="flex flex-col items-center p-2 text-gray-400 hover:text-primary transition-colors">
            <Menu className="h-5 w-5" />
            <span className="text-xs mt-1">Menu</span>
          </button>
        </div>
      </div>
    </div>
  );
}
