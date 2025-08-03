import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { SimpleEnergyUsageChart, SimpleHomePerformanceChart, SimpleBillingCycleChart } from "@/components/charts/simple-charts";
import { useEnergyData } from "@/hooks/use-energy-data";
import { Zap, Home, Lightbulb, Leaf, TrendingUp, RotateCcw, Activity, ChevronRight, Clock, Euro, Menu, BarChart3 } from "lucide-react";
import type { BillingData } from "@shared/schema";
import logoImage from "@assets/e snapp logo 1 (1)_1754149374420.png";
import trendIcon from "@assets/Frame 427319515_1754191563621.png";
import { Link } from "wouter";
import Header from "@/components/layout/header";
import BottomNavigation from "@/components/layout/bottom-navigation";

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
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen">
      <Header />
      
      <div className="px-2 space-y-2 pb-16">

      {/* Greeting Section */}
      <div className={`mb-2 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <h1 className="text-base font-bold text-gray-800">Hello, User</h1>
        <p className="text-gray-600 text-sm">Today is {new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
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
        <SimpleBillingCycleChart />
        
        {/* Energy Usage Chart */}
        <SimpleEnergyUsageChart />
        
        {/* Home Performance Chart */}
        <SimpleHomePerformanceChart />
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
          <Link href="/tips">
            <Button variant="ghost" className="text-green-700 hover:text-green-800 p-0 h-auto text-xs">
              See All Tips
            </Button>
          </Link>
        </CardContent>
      </Card>

      </div>

      {/* Bottom Navigation Bar */}
      <BottomNavigation />
    </div>
  );
}
