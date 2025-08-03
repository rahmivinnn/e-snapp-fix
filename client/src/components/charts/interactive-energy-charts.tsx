import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Utensils, Thermometer, Lightbulb, Zap, Home, Award, TrendingUp, BarChart3 } from "lucide-react";

// Energy Usage by Category Chart
export function EnergyUsageChart() {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const categories = [
    { name: "Kitchen", value: 46.8, color: "#FF6B35", icon: Utensils, percentage: 43 },
    { name: "Heating", value: 31.2, color: "#4A90E2", icon: Thermometer, percentage: 29 },
    { name: "Lighting", value: 20.5, color: "#7ED321", icon: Lightbulb, percentage: 19 },
    { name: "Other", value: 10.8, color: "#D0D0D0", icon: Zap, percentage: 9 }
  ];

  const total = categories.reduce((sum, cat) => sum + cat.value, 0);

  return (
    <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
      <CardContent className="p-4">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-primary" />
          Energy Usage by Category
        </h3>
        
        {/* Donut Chart Visual */}
        <div className="flex items-center justify-center mb-4">
          <div className="relative w-32 h-32">
            {/* Center Circle with Total */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">{total}kWh</div>
                <div className="text-xs text-gray-500">Total</div>
              </div>
            </div>
            
            {/* Donut Segments */}
            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="none" stroke="#f3f4f6" strokeWidth="8" />
              {categories.map((category, index) => {
                const startAngle = categories.slice(0, index).reduce((sum, cat) => sum + (cat.percentage * 3.6), 0);
                const endAngle = startAngle + (category.percentage * 3.6);
                const largeArcFlag = category.percentage > 50 ? 1 : 0;
                
                const startX = 50 + 40 * Math.cos((startAngle - 90) * Math.PI / 180);
                const startY = 50 + 40 * Math.sin((startAngle - 90) * Math.PI / 180);
                const endX = 50 + 40 * Math.cos((endAngle - 90) * Math.PI / 180);
                const endY = 50 + 40 * Math.sin((endAngle - 90) * Math.PI / 180);
                
                const pathData = `M 50 50 L ${startX} ${startY} A 40 40 0 ${largeArcFlag} 1 ${endX} ${endY} Z`;
                
                return (
                  <path
                    key={category.name}
                    d={pathData}
                    fill={category.color}
                    className={`transition-all duration-300 ${hoveredCategory === category.name ? 'opacity-80 transform scale-105' : 'opacity-100'}`}
                    onMouseEnter={() => setHoveredCategory(category.name)}
                    onMouseLeave={() => setHoveredCategory(null)}
                  />
                );
              })}
            </svg>
          </div>
        </div>

        {/* Legend */}
        <div className="space-y-2">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <div
                key={category.name}
                className={`flex items-center justify-between p-2 rounded-lg transition-all duration-200 cursor-pointer ${
                  hoveredCategory === category.name ? 'bg-gray-50 transform scale-[1.02]' : ''
                }`}
                onMouseEnter={() => setHoveredCategory(category.name)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                  <Icon className="h-4 w-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">{category.name}</span>
                </div>
                <span className="text-sm font-bold text-gray-800">{category.value} kWh</span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

// Home Performance Chart
export function HomePerformanceChart() {
  const [hoveredBar, setHoveredBar] = useState<string | null>(null);

  const data = [
    { label: "Average", value: 71, color: "#D0D0D0", isMiddle: false },
    { label: "Yours", value: 57, color: "#FF6B35", isMiddle: true },
    { label: "Most Efficient", value: 47, color: "#D0D0D0", isMiddle: false }
  ];

  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <Card className="bg-gradient-to-br from-gray-800 to-gray-900 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Home className="h-5 w-5 text-teal-400" />
            <h3 className="text-lg font-bold">Home Performance</h3>
          </div>
          <div className="bg-teal-400 text-gray-900 px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
            <TrendingUp className="h-3 w-3" />
            +15%
          </div>
        </div>

        <div className="mb-4">
          <div className="text-2xl font-bold">64%</div>
          <div className="text-sm text-gray-300">Better than of homes of similar area.</div>
        </div>

        <div className="flex items-end justify-between gap-4 h-24">
          {data.map((item) => (
            <div 
              key={item.label}
              className="flex-1 flex flex-col items-center gap-2"
              onMouseEnter={() => setHoveredBar(item.label)}
              onMouseLeave={() => setHoveredBar(null)}
            >
              <div className="text-xs font-bold text-white">€{item.value}.00</div>
              <div 
                className={`w-full rounded-lg transition-all duration-300 cursor-pointer ${
                  item.isMiddle ? 'shadow-lg' : ''
                } ${hoveredBar === item.label ? 'transform scale-110' : ''}`}
                style={{ 
                  backgroundColor: item.color,
                  height: `${(item.value / maxValue) * 100}%`,
                  minHeight: '20px'
                }}
              />
              <div className="text-xs text-gray-300 text-center">{item.label}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// Billing Cycle Chart
export function BillingCycleChart() {
  const currentUsage = 109;
  const forecast = 383;
  const progressPercentage = (currentUsage / forecast) * 100;

  return (
    <Card className="bg-gradient-to-br from-cyan-50 to-blue-50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <Award className="h-5 w-5 text-teal-600" />
          <h3 className="text-lg font-bold text-gray-800">Current Billing Cycle</h3>
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
            <Progress 
              value={progressPercentage} 
              className="h-3 bg-gray-200"
            />
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