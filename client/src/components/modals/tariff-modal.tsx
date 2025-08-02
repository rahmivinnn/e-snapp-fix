import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Leaf, Zap, Star, ChevronRight } from "lucide-react";

interface TariffModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

interface TariffPlan {
  id: string;
  name: string;
  type: "green" | "standard";
  icon: any;
  duration: string;
  contractType: string;
  currentCost: string;
  savings: string;
  features: string[];
  color: string;
}

const tariffPlans: TariffPlan[] = [
  {
    id: "green-1",
    name: "Green Energy Plan",
    type: "green",
    icon: Leaf,
    duration: "12 months",
    contractType: "Monoraria (Fixed)",
    currentCost: "€48.20",
    savings: "€8.80",
    features: ["100% Renewable Energy", "Fixed Rate", "No Hidden Fees"],
    color: "bg-green-100 text-green-600"
  },
  {
    id: "standard-1",
    name: "Enel Flex Control",
    type: "standard",
    icon: Zap,
    duration: "12 months",
    contractType: "Monoraria (Fixed)",
    currentCost: "€48.20",
    savings: "€8.80",
    features: ["Flexible Pricing", "Smart Control", "24/7 Support"],
    color: "bg-blue-100 text-blue-600"
  },
  {
    id: "green-2",
    name: "Solar Plus Plan",
    type: "green",
    icon: Leaf,
    duration: "24 months",
    contractType: "Bioraria (Variable)",
    currentCost: "€45.50",
    savings: "€11.50",
    features: ["Solar Integration", "Peak/Off-Peak Rates", "Green Certificates"],
    color: "bg-green-100 text-green-600"
  },
  {
    id: "standard-2",
    name: "Basic Energy",
    type: "standard",
    icon: Zap,
    duration: "6 months",
    contractType: "Monoraria (Fixed)",
    currentCost: "€52.00",
    savings: "€5.00",
    features: ["Standard Rates", "Basic Support", "Monthly Billing"],
    color: "bg-blue-100 text-blue-600"
  }
];

export default function TariffModal({ isOpen, onClose, onOpen }: TariffModalProps) {
  const { toast } = useToast();
  const [showAll, setShowAll] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const visiblePlans = showAll ? tariffPlans : tariffPlans.slice(0, 2);

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
    const plan = tariffPlans.find(p => p.id === planId);
    toast({
      title: `${plan?.name} selected`,
      description: "Plan selection would be processed here",
      duration: 3000,
    });
  };

  // Make onOpen available globally for economics page access
  useEffect(() => {
    (window as any).showTariffPlans = onOpen;
  }, [onOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm mx-4 max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-accent" />
            Better Tariffs Available
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Summary Card */}
          <Card className="bg-primary text-white">
            <CardContent className="p-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-sm opacity-90 mb-1">Annual Cost</p>
                  <p className="text-2xl font-bold">€920.47</p>
                  <p className="text-xs opacity-80">Based on your bills</p>
                </div>
                <div className="text-center">
                  <p className="text-sm opacity-90 mb-1">Estimated Savings</p>
                  <p className="text-2xl font-bold">€120.00</p>
                  <p className="text-xs opacity-80">per year</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Available Plans */}
          <div className="space-y-3">
            {visiblePlans.map((plan) => {
              const IconComponent = plan.icon;
              const isSelected = selectedPlan === plan.id;
              
              return (
                <Card 
                  key={plan.id} 
                  className={`card-hover cursor-pointer transition-all duration-200 ${
                    isSelected ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => handleSelectPlan(plan.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${plan.color}`}>
                          <IconComponent className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800">{plan.name}</h4>
                          <p className="text-xs text-gray-500">{plan.duration}</p>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Type</span>
                        <span className="font-medium">{plan.contractType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">If You Used This</span>
                        <span className="font-medium">{plan.currentCost}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Savings</span>
                        <span className="font-bold text-green-600">{plan.savings}</span>
                      </div>
                    </div>
                    
                    <div className="mt-3 flex flex-wrap gap-1">
                      {plan.features.map((feature, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                    
                    {isSelected && (
                      <div className="mt-3 p-2 bg-primary/10 rounded-lg">
                        <p className="text-xs text-primary font-medium">✓ Selected Plan</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Show More/Less Button */}
          <Button 
            variant="outline" 
            className="w-full border-primary text-primary hover:bg-primary hover:text-white"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "Show Less" : "Show More"}
          </Button>

          {/* Action Buttons */}
          <div className="space-y-2 pt-2">
            <Button 
              className="w-full bg-primary hover:bg-primary/90"
              disabled={!selectedPlan}
              onClick={() => {
                if (selectedPlan) {
                  toast({
                    title: "Processing plan selection...",
                    description: "You would be redirected to complete the switch",
                    duration: 3000,
                  });
                  onClose();
                }
              }}
            >
              {selectedPlan ? "Continue with Selected Plan" : "Select a Plan"}
            </Button>
            
            <Button 
              variant="ghost" 
              className="w-full"
              onClick={onClose}
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}