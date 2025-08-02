import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Leaf, BarChart3 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import logoImage from "@assets/e snapp logo 1 (1)_1754149374420.png";

type Period = "day" | "week" | "month" | "year" | "billing";

export default function TrendsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState<Period>("day");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Fetch real energy data from API
  const { data: energyData, isLoading } = useQuery<any[]>({
    queryKey: ['/api/energy/history/demo-user-1'],
  });

  const getChartData = () => {
    // Always use visible demo data for better UX
    return { 
      data: [14.2, 22.1, 18.7, 25.3, 20.8, 12.4, 16.9], 
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] 
    };
  };

  const getCurrentConsumption = () => {
    const data = getChartData().data;
    const highlightIndex = 3; // Thursday
    return data[highlightIndex] || 14.7;
  };

  const getCurrentDateLabel = () => {
    return "Thu, 23 Jul";
  };

  const chartData = getChartData();

  return (
    <div className="max-w-md mx-auto px-3 space-y-3 pb-20 min-h-screen">
      {/* Logo Section */}
      <div className="flex justify-center mb-2 pt-2">
        <img 
          src={logoImage} 
          alt="e-snapp" 
          className="h-10 w-auto"
        />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-xl font-bold text-gray-800">Energy Consumption</h1>
        <div className="flex items-center space-x-1">
          <span className="bg-primary text-white px-2 py-1 rounded-full text-xs font-medium">1 kWh</span>
          <span className="text-xs text-gray-600">EUR</span>
        </div>
      </div>

      {/* Time Period Selector */}
      <Card className="bg-white shadow-sm">
        <CardContent className="p-2">
          <div className="flex space-x-1 overflow-x-auto bg-gray-100 rounded-full p-1">
            {[
              { id: "day", label: "Day" },
              { id: "week", label: "Week" },
              { id: "month", label: "Month" },
              { id: "year", label: "Year" },
              { id: "billing", label: "Billing Cycle" },
            ].map(({ id, label }) => (
              <Button
                key={id}
                variant="ghost"
                size="sm"
                className={`whitespace-nowrap rounded-full transition-all duration-200 ${
                  selectedPeriod === id 
                    ? "bg-white text-gray-800 shadow-sm font-medium" 
                    : "text-gray-600 hover:text-gray-800"
                }`}
                onClick={() => setSelectedPeriod(id as Period)}
              >
                {label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main Chart Card - Mobile Optimized */}
      <Card className={`bg-white shadow-lg transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <CardContent className="p-4">
          {/* Chart Header */}
          <div className="text-center mb-4">
            <p className="text-sm text-gray-500 mb-1">{getCurrentDateLabel()}</p>
            <p className="text-2xl font-bold text-gray-800">
              {getCurrentConsumption().toFixed(1)} kWh
            </p>
          </div>
          
          {/* Chart with Y-axis labels */}
          <div className="flex">
            {/* Y-axis labels */}
            <div className="flex flex-col justify-between h-48 text-xs text-gray-400 pr-2 py-1">
              <span>25</span>
              <span>20</span>
              <span>15</span>
              <span>10</span>
              <span>5</span>
            </div>
            
            {/* Chart area */}
            <div className="flex-1 h-48 relative border-l border-gray-200">
              {isLoading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : (
                <div className="flex items-end justify-center space-x-2 h-full px-3">
                  {chartData.data.map((value, index) => {
                    const isHighlighted = index === 3; // Thursday
                    const heightPx = Math.max((value / 25) * 160, 16); // Scale to smaller pixels for mobile
                    
                    return (
                      <div 
                        key={index} 
                        className="flex flex-col items-center space-y-2 group cursor-pointer"
                        style={{ 
                          animationDelay: `${index * 100}ms`,
                          animation: `slideUp 0.8s ease-out forwards`
                        }}
                      >
                        <div 
                          className={`w-6 rounded-t-lg transition-all duration-500 transform group-hover:scale-110 group-hover:shadow-xl ${
                            isHighlighted 
                              ? 'bg-gradient-to-t from-teal-700 to-teal-500 shadow-lg animate-pulse' 
                              : 'bg-gradient-to-t from-sky-500 to-sky-300 group-hover:from-sky-600 group-hover:to-sky-400'
                          }`}
                          style={{ 
                            height: `${heightPx}px`,
                            minHeight: '16px',
                            animationDelay: `${index * 150}ms`,
                            animation: `growUp 1s ease-out ${index * 150}ms forwards`,
                            transform: `scaleY(0)`,
                            transformOrigin: 'bottom'
                          }}
                        />
                        <span className={`text-xs font-medium transition-colors duration-300 ${
                          isHighlighted ? 'text-teal-600 font-semibold' : 'text-gray-600 group-hover:text-gray-800'
                        }`}>
                          {chartData.labels[index]}
                        </span>
                        
                        {/* Hover tooltip */}
                        <div className="absolute -top-6 bg-gray-800 text-white text-xs px-1 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                          {value.toFixed(1)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CO2 Emissions & Savings */}
      <Card className="card-hover bg-primary text-white">
        <CardContent className="p-4">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Leaf className="h-5 w-5" />
            CO₂ Emissions & Savings
          </h3>
          <div className="flex justify-between">
            <div className="text-center">
              <p className="text-2xl font-bold">42.7 kg</p>
              <p className="text-sm opacity-90">CO₂ Emitted</p>
            </div>
            <div className="w-px bg-white opacity-30"></div>
            <div className="text-center">
              <p className="text-2xl font-bold">12.1 kg</p>
              <p className="text-sm opacity-90">CO₂ Avoided</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Compared to Previous */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-800 flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-primary" />
          Compared to Previous
        </h3>
        <div className="grid grid-cols-3 gap-3">
          <Card className="card-hover bg-gradient-to-br from-blue-50 to-cyan-50">
            <CardContent className="p-3 text-center">
              <p className="text-sm text-gray-600 mb-1">Energy Used</p>
              <p className="text-lg font-bold text-gray-800">42.7 kWh</p>
              <p className="text-xs text-green-600 font-medium">↑ +6%</p>
            </CardContent>
          </Card>
          <Card className="card-hover bg-gradient-to-br from-blue-50 to-cyan-50">
            <CardContent className="p-3 text-center">
              <p className="text-sm text-gray-600 mb-1">Cost</p>
              <p className="text-lg font-bold text-gray-800">€42.7</p>
              <p className="text-xs text-red-600 font-medium">↓ -3.4%</p>
            </CardContent>
          </Card>
          <Card className="card-hover bg-gradient-to-br from-blue-50 to-cyan-50">
            <CardContent className="p-3 text-center">
              <p className="text-sm text-gray-600 mb-1">CO₂</p>
              <p className="text-lg font-bold text-gray-800">42.7 kg</p>
              <p className="text-xs text-green-600 font-medium">↑ +4%</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Monthly Comparison */}
      <Card className="card-hover">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">This Month vs Previous</h3>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">This Month</span>
                <span className="text-sm font-bold">42.7 kWh ↑ +6%</span>
              </div>
              <div className="w-full bg-accent rounded-full h-2"></div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-600">Previous Month</span>
                <span className="text-sm">38.7 kWh</span>
              </div>
              <div className="w-4/5 bg-gray-400 rounded-full h-2"></div>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-2">Energy used</p>
            <p className="text-lg font-bold text-gray-800">18.7 kWh</p>
            <div className="h-24 mt-2 flex items-end justify-center space-x-1">
              {[12, 8, 15, 10, 18, 14, 11].map((value, index) => {
                const isHighlighted = index === 4;
                const height = (value / Math.max(...[12, 8, 15, 10, 18, 14, 11])) * 70;
                
                return (
                  <div key={index} className="flex flex-col items-center">
                    <div 
                      className={`w-4 rounded-t transition-all duration-300 ${
                        isHighlighted 
                          ? 'bg-gradient-to-t from-teal-700 to-teal-600' 
                          : 'bg-gradient-to-t from-sky-400 to-sky-300'
                      }`}
                      style={{ height: `${height}%` }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
