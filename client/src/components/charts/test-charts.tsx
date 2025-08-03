import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";

// Test chart to ensure rendering works
export function TestChart() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    console.log("🔥 TEST CHART MOUNTED!");
    setMounted(true);
  }, []);

  return (
    <Card className="bg-red-100 border-2 border-red-500 mb-4">
      <CardContent className="p-4">
        <h3 className="text-lg font-bold text-red-800">TEST CHART</h3>
        <p className="text-red-700">
          {mounted ? "✅ Chart is MOUNTED and VISIBLE!" : "❌ Not mounted yet..."}
        </p>
        <div className="bg-red-200 p-2 mt-2 rounded">
          This is a test chart to ensure charts are rendering properly.
        </div>
      </CardContent>
    </Card>
  );
}

// Working Energy Usage Chart
export function WorkingEnergyChart() {
  const [values, setValues] = useState({ kitchen: 0, heating: 0, lighting: 0, other: 0, total: 0 });

  useEffect(() => {
    console.log("⚡ ENERGY CHART MOUNTED!");
    setTimeout(() => {
      setValues({
        kitchen: 46.8,
        heating: 31.2,
        lighting: 20.5,
        other: 10.8,
        total: 109
      });
    }, 1000);
  }, []);

  return (
    <Card className="bg-white shadow-lg border border-gray-200">
      <CardContent className="p-4">
        <h3 className="text-base font-semibold text-gray-800 mb-4">Energy Usage by Category</h3>
        
        <div className="flex items-center gap-4">
          {/* Simple circular chart */}
          <div className="relative w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
            <div className="text-center">
              <div className="text-lg font-bold text-gray-800">{Math.round(values.total)}</div>
              <div className="text-xs text-gray-600">kWh</div>
            </div>
          </div>

          {/* Legend */}
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between bg-orange-50 p-2 rounded">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-500 rounded"></div>
                <span className="text-sm text-gray-700">Kitchen</span>
              </div>
              <span className="text-sm font-semibold">{values.kitchen} kWh</span>
            </div>
            
            <div className="flex items-center justify-between bg-blue-50 p-2 rounded">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded"></div>
                <span className="text-sm text-gray-700">Heating</span>
              </div>
              <span className="text-sm font-semibold">{values.heating} kWh</span>
            </div>
            
            <div className="flex items-center justify-between bg-green-50 p-2 rounded">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span className="text-sm text-gray-700">Lighting</span>
              </div>
              <span className="text-sm font-semibold">{values.lighting} kWh</span>
            </div>
            
            <div className="flex items-center justify-between bg-gray-50 p-2 rounded">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-500 rounded"></div>
                <span className="text-sm text-gray-700">Other</span>
              </div>
              <span className="text-sm font-semibold">{values.other} kWh</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Working Home Performance Chart
export function WorkingHomeChart() {
  const [bars, setBars] = useState({ average: 0, yours: 0, efficient: 0 });

  useEffect(() => {
    console.log("🏠 HOME CHART MOUNTED!");
    setTimeout(() => {
      setBars({ average: 71, yours: 57, efficient: 47 });
    }, 1500);
  }, []);

  return (
    <Card className="bg-gradient-to-r from-gray-800 to-gray-900 text-white">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-semibold">Home Performance</h3>
          <div className="bg-teal-400 text-gray-900 px-2 py-1 rounded-full text-xs font-bold">+15%</div>
        </div>

        <div className="mb-4">
          <div className="text-2xl font-bold">64%</div>
          <div className="text-sm text-gray-300">Better than homes of similar area</div>
        </div>

        <div className="flex items-end justify-between gap-4 h-16">
          <div className="flex-1 text-center">
            <div className="text-xs mb-1">€{bars.average}</div>
            <div 
              className="bg-gray-600 rounded-t w-full transition-all duration-1000"
              style={{ height: `${(bars.average / 80) * 100}%`, minHeight: '20px' }}
            />
            <div className="text-xs mt-1 text-gray-400">Average</div>
          </div>

          <div className="flex-1 text-center">
            <div className="text-xs mb-1">€{bars.yours}</div>
            <div 
              className="bg-orange-500 rounded-t w-full transition-all duration-1000"
              style={{ height: `${(bars.yours / 80) * 100}%`, minHeight: '20px' }}
            />
            <div className="text-xs mt-1 font-semibold">Yours</div>
          </div>

          <div className="flex-1 text-center">
            <div className="text-xs mb-1">€{bars.efficient}</div>
            <div 
              className="bg-gray-600 rounded-t w-full transition-all duration-1000"
              style={{ height: `${(bars.efficient / 80) * 100}%`, minHeight: '20px' }}
            />
            <div className="text-xs mt-1 text-gray-400">Most Efficient</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Working Billing Chart
export function WorkingBillingChart() {
  const [usage, setUsage] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    console.log("📊 BILLING CHART MOUNTED!");
    setTimeout(() => {
      setUsage(109);
      setProgress(28.5);
    }, 800);
  }, []);

  return (
    <Card className="bg-white shadow-lg">
      <CardContent className="p-4">
        <h3 className="text-base font-semibold text-gray-800 mb-4">Current Billing Cycle</h3>
        
        <div className="space-y-3">
          <div className="flex justify-between text-sm text-gray-600">
            <span>01 Jul - 31 Aug 2025</span>
            <span>45 Days Remaining</span>
          </div>

          <div className="flex items-center justify-center gap-4">
            <div className="bg-teal-600 text-white px-3 py-2 rounded-lg text-center">
              <div className="text-lg font-bold">{usage}</div>
              <div className="text-xs">kWh Current</div>
            </div>
            
            <div className="bg-gray-500 text-white px-3 py-2 rounded-lg text-center">
              <div className="text-lg font-bold">383</div>
              <div className="text-xs">kWh Forecast</div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-teal-600 h-full rounded-full transition-all duration-1000"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-600">
              <span>0 kWh</span>
              <span className="font-bold text-teal-600">{progress.toFixed(1)}% used</span>
              <span>383 kWh</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}