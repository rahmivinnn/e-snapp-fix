import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import BillingChart from "@/components/charts/billing-chart";
import { useEnergyData } from "@/hooks/use-energy-data";
import { mockBillingHistory, mockBillingLabels } from "@/lib/mock-data";
import { FileText, Zap, Star, History, Leaf } from "lucide-react";
import type { BillingData } from "@shared/schema";

export default function EconomicsPage() {
  const { billingData } = useEnergyData();

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
      <h1 className="text-2xl font-bold text-gray-800">Billing Summary</h1>

      {/* Current Bill Card */}
      <Card className="card-hover bg-gradient-to-br from-blue-50 to-cyan-50">
        <CardContent className="p-4">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <FileText className="h-5 w-5 text-primary mr-2" />
                <span className="text-sm font-medium text-gray-700">Current Bill</span>
              </div>
              <p className="text-2xl font-bold text-gray-800">
                €{billingData?.currentBill || "57.00"}
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Zap className="h-5 w-5 text-primary mr-2" />
                <span className="text-sm font-medium text-gray-700">Energy Used</span>
              </div>
              <p className="text-2xl font-bold text-gray-800">
                {billingData?.energyUsed || "129.5"} kWh
              </p>
            </div>
          </div>
          <div className="border-t border-primary/20 pt-3 space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Contract:</span>
              <span className="font-medium">{billingData?.contract || "Bioraria (F1/F23)"}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Period:</span>
              <span className="font-medium">{billingData?.period || "01 Jul - 31 Aug 2025"}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Est. Final Bill:</span>
              <span className="font-bold">€{billingData?.estimatedFinalBill || "83.40"}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Better Tariffs Available */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-800 flex items-center gap-2">
          <Star className="h-5 w-5 text-accent" />
          Scopri le Offerte Migliori
        </h3>
        
        {/* Savings Card */}
        <Card className="card-hover bg-primary text-white">
          <CardContent className="p-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-sm opacity-90 mb-1">Costo Annuale</p>
                <p className="text-2xl font-bold">€920.47</p>
                <p className="text-xs opacity-80">Basato sulla tue bollette</p>
              </div>
              <div className="text-center">
                <p className="text-sm opacity-90 mb-1">Risparmio Stimato</p>
                <p className="text-2xl font-bold">€120.00 <span className="text-sm">/ anno</span></p>
                <p className="text-xs opacity-80">Stima migliore offerta</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Better Offers Button */}
        <Button 
          className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3"
          onClick={() => (window as any).showTariffPlans?.()}
        >
          Scegli le offerte migliori
        </Button>
      </div>

      {/* Available Plans */}
      <div className="space-y-4">
        <Card className="card-hover">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Leaf className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Green Energy Plan</h4>
                  <p className="text-xs text-gray-500">12 months</p>
                </div>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Type</span>
                <span className="font-medium">Monoraria (Fixed)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">If You Used This</span>
                <span className="font-medium">€48.20</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Savings</span>
                <span className="font-bold text-green-600">€8.80</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-hover">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Zap className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Enel Flex Control</h4>
                  <p className="text-xs text-gray-500">12 months</p>
                </div>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Type</span>
                <span className="font-medium">Monoraria (Fixed)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">If You Used This</span>
                <span className="font-medium">€48.20</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Savings</span>
                <span className="font-bold text-green-600">€8.80</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Show More Button */}
      <Button 
        variant="outline" 
        className="w-full border-primary text-primary hover:bg-primary hover:text-white"
        onClick={() => (window as any).showTariffPlans?.()}
      >
        Show more
      </Button>

      {/* Billing History */}
      <Card className="card-hover">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
              <History className="h-5 w-5 text-primary" />
              Billing History
            </h3>
            <Badge className="bg-green-100 text-green-800">
              ↑ +3%
            </Badge>
          </div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-2xl font-bold text-gray-800">62€</p>
              <p className="text-sm text-gray-600">estimated final bill 80€</p>
            </div>
          </div>
          <div className="h-32">
            <BillingChart 
              data={mockBillingHistory}
              labels={mockBillingLabels}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
