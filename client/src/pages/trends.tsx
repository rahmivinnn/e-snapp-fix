import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ConsumptionChart from "@/components/charts/consumption-chart";
import { TrendingUp, Leaf, BarChart3 } from "lucide-react";
import { mockConsumptionData, getDailyLabels, getWeeklyLabels, getMonthlyLabels, getYearlyLabels } from "@/lib/mock-data";

type Period = "day" | "week" | "month" | "year" | "billing";

export default function TrendsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState<Period>("day");

  const getChartData = () => {
    switch (selectedPeriod) {
      case "day":
        return { data: mockConsumptionData.daily, labels: getDailyLabels() };
      case "week":
        return { data: mockConsumptionData.weekly, labels: getWeeklyLabels() };
      case "month":
        return { data: mockConsumptionData.monthly, labels: getMonthlyLabels() };
      case "year":
        return { data: mockConsumptionData.yearly, labels: getYearlyLabels() };
      default:
        return { data: mockConsumptionData.daily, labels: getDailyLabels() };
    }
  };

  const getCurrentConsumption = () => {
    const data = getChartData().data;
    const highlightIndex = selectedPeriod === "day" ? 3 : Math.floor(data.length / 2);
    return data[highlightIndex];
  };

  const getCurrentDateLabel = () => {
    switch (selectedPeriod) {
      case "day":
        return "Thu, 23 Jul";
      case "week":
        return "Week 4, Jul 2024";
      case "month":
        return "July 2024";
      case "year":
        return "2024";
      default:
        return "Current Period";
    }
  };

  const chartData = getChartData();

  return (
    <div className="px-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Energy Consumption</h1>
        <div className="flex items-center space-x-2">
          <span className="bg-primary text-white px-2 py-1 rounded-full text-xs font-medium">1 kWh</span>
          <span className="text-sm text-gray-600">EUR</span>
        </div>
      </div>

      {/* Time Period Selector */}
      <Card className="bg-gradient-to-r from-blue-50 to-cyan-50">
        <CardContent className="p-2">
          <div className="flex space-x-1 overflow-x-auto">
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
                className={`period-btn whitespace-nowrap ${
                  selectedPeriod === id ? "active" : ""
                }`}
                onClick={() => setSelectedPeriod(id as Period)}
              >
                {label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Consumption Chart Card */}
      <Card className="card-hover">
        <CardContent className="p-4">
          <div className="text-center mb-4">
            <p className="text-sm text-gray-600">{getCurrentDateLabel()}</p>
            <p className="text-3xl font-bold text-gray-800">
              {getCurrentConsumption()} kWh
            </p>
          </div>
          <div className="h-48 mb-4">
            <ConsumptionChart 
              data={chartData.data}
              labels={chartData.labels}
              highlightIndex={selectedPeriod === "day" ? 3 : Math.floor(chartData.data.length / 2)}
            />
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
            <div className="h-24 mt-2">
              <ConsumptionChart 
                data={[12, 8, 15, 10, 18, 14, 11]}
                labels={getDailyLabels()}
                highlightIndex={4}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
