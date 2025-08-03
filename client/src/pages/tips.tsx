import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Lightbulb, Zap, Leaf, Clock, Euro, ThermometerSun } from "lucide-react";
import { Link } from "wouter";

const tips = [
  {
    id: 1,
    category: "Energy Saving",
    icon: Zap,
    title: "Reduce dryer use during peak hours",
    description: "Using your dryer between 6-9 PM costs 40% more. Try drying clothes in the morning or late evening.",
    savings: "€15/month",
    difficulty: "Easy"
  },
  {
    id: 2,
    category: "Heating",
    icon: ThermometerSun,
    title: "Lower thermostat by 2°C",
    description: "Each degree reduction can save up to 8% on heating costs. Use smart scheduling for maximum efficiency.",
    savings: "€25/month",
    difficulty: "Easy"
  },
  {
    id: 3,
    category: "Lighting",
    icon: Lightbulb,
    title: "Switch to LED bulbs",
    description: "LED bulbs use 75% less energy and last 25 times longer than incandescent bulbs.",
    savings: "€8/month",
    difficulty: "Easy"
  },
  {
    id: 4,
    category: "Kitchen",
    icon: Euro,
    title: "Use microwave for small meals",
    description: "Microwaves use 50% less energy than conventional ovens for small portions and reheating.",
    savings: "€12/month",
    difficulty: "Easy"
  },
  {
    id: 5,
    category: "Smart Usage",
    icon: Clock,
    title: "Schedule high-energy appliances",
    description: "Run dishwashers and washing machines during off-peak hours (10 PM - 6 AM) for lower rates.",
    savings: "€18/month",
    difficulty: "Medium"
  },
  {
    id: 6,
    category: "Green Energy",
    icon: Leaf,
    title: "Unplug devices when not in use",
    description: "Electronics in standby mode consume 5-10% of your total energy. Use smart power strips.",
    savings: "€10/month",
    difficulty: "Easy"
  }
];

export default function TipsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const categories = Array.from(new Set(tips.map(tip => tip.category)));
  const filteredTips = selectedCategory 
    ? tips.filter(tip => tip.category === selectedCategory)
    : tips;

  return (
    <div className="max-w-md mx-auto px-2 space-y-3 pb-16 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between py-3">
        <Link href="/">
          <Button variant="ghost" size="sm" className="p-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-lg font-bold text-gray-800">Energy Tips</h1>
        <div className="w-9"></div>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <Button
          variant={selectedCategory === null ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedCategory(null)}
          className="whitespace-nowrap"
        >
          All Tips
        </Button>
        {categories.map(category => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category)}
            className="whitespace-nowrap"
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Tips Grid */}
      <div className="space-y-3">
        {filteredTips.map((tip, index) => {
          const Icon = tip.icon;
          return (
            <Card 
              key={tip.id} 
              className="hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] cursor-pointer"
              style={{
                animationDelay: `${index * 100}ms`,
                animation: 'fadeInUp 0.5s ease-out forwards'
              }}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-primary font-medium bg-primary/10 px-2 py-1 rounded">
                        {tip.category}
                      </span>
                      <span className="text-lg font-bold text-green-600">{tip.savings}</span>
                    </div>
                    
                    <h3 className="font-semibold text-gray-800 mb-2">{tip.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{tip.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <span className={`text-xs px-2 py-1 rounded ${
                        tip.difficulty === 'Easy' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {tip.difficulty}
                      </span>
                      
                      <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                        Try This Tip
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Summary Card */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardContent className="p-4 text-center">
          <Leaf className="h-8 w-8 text-green-600 mx-auto mb-2" />
          <h3 className="font-bold text-gray-800 mb-1">Potential Monthly Savings</h3>
          <p className="text-2xl font-bold text-green-600 mb-1">€88</p>
          <p className="text-sm text-gray-600">By implementing all tips above</p>
        </CardContent>
      </Card>
    </div>
  );
}