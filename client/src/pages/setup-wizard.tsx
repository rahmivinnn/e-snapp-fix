import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, ArrowRight, Camera, Upload, Loader2, Wifi, Check, X } from "lucide-react";
import { useLocation } from "wouter";
import logoImage from "@assets/e snapp logo 1 (1)_1754149374420.png";
import houseImage from "@assets/Rectangle 102_1754150724561.png";

type SetupStep = "device" | "qr-scan" | "wifi-list" | "wifi-password" | "wifi-connect" | "device-naming" | "home" | "appliances" | "tariff-type" | "tariff-details" | "bill-upload";

export default function SetupWizard() {
  const [, setLocation] = useLocation();
  const [currentStep, setCurrentStep] = useState<SetupStep>("device");
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Home setup
    locationName: "",
    locationAddress: "",
    squareMeters: "",
    numberOfResidents: "",
    
    // Appliances
    appliances: [] as string[],
    
    // Tariff
    tariffType: "",
    spread: "0.15",
    fixedType: "Trioraria",
    f1: "0.15",
    f2: "0.15", 
    f3: "0.15",
    
    // Bill upload
    customerType: "",
    powerCommitment: "",
  });

  useEffect(() => {
    setIsVisible(false);
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, [currentStep]);

  const handleNext = async () => {
    setIsLoading(true);
    
    // Simulate processing time for better UX
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const steps: SetupStep[] = ["device", "qr-scan", "wifi-list", "wifi-password", "wifi-connect", "device-naming", "home", "appliances", "tariff-type", "tariff-details", "bill-upload"];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    } else {
      localStorage.setItem('setupCompleted', 'true');
      setLocation("/home");
    }
    
    setIsLoading(false);
  };

  const handleBack = () => {
    const steps: SetupStep[] = ["device", "qr-scan", "wifi-list", "wifi-password", "wifi-connect", "device-naming", "home", "appliances", "tariff-type", "tariff-details", "bill-upload"];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    } else {
      // If on first step, do nothing or could close setup
      console.log("Already on first step");
    }
  };

  const handleSkip = () => {
    // Skip QR scan and go to next step (wifi-list) like after successful scan
    if (currentStep === "qr-scan" || currentStep === "device") {
      setCurrentStep("wifi-list");
    } else {
      // For other steps, complete setup and go to home
      localStorage.setItem('setupCompleted', 'true');
      setLocation("/home");
    }
  };

  const handleApplianceToggle = (appliance: string) => {
    setFormData(prev => ({
      ...prev,
      appliances: prev.appliances.includes(appliance)
        ? prev.appliances.filter(a => a !== appliance)
        : [...prev.appliances, appliance]
    }));
  };

  const renderDevice = () => (
    <div className="flex flex-col min-h-screen max-h-screen overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b">
        <ArrowLeft className="h-6 w-6 text-gray-600 cursor-pointer" onClick={handleBack} />
        <h1 className="text-lg font-semibold text-gray-800">Device Setup Wizard</h1>
        <div></div>
      </div>
      
      <div className="flex-1 flex flex-col justify-center items-center px-4 py-2 space-y-4">
        <img src={logoImage} alt="e-snapp" className="h-16 w-auto" />
        
        <div className="w-full max-w-[200px]">
          <img src={houseImage} alt="Smart Home" className="w-full h-auto rounded-lg" />
        </div>
        
        <div className="text-center space-y-2">
          <h2 className="text-lg font-semibold">Welcome to e-snapp</h2>
          <p className="text-gray-600 text-sm">Connect to a device or buy device if you don't</p>
          <p className="text-gray-600 text-sm">have the device.</p>
        </div>
        
        <div className="w-full space-y-3">
          <Button 
            onClick={() => setCurrentStep("qr-scan")}
            disabled={isLoading}
            className="w-full bg-primary hover:bg-primary/90 text-white h-12 rounded-lg hover:scale-105 active:scale-95 transition-all disabled:scale-100"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Setting up...
              </>
            ) : (
              <>
                <Wifi className="h-4 w-4 mr-2" />
                Add Device
              </>
            )}
          </Button>
          
          <div className="flex items-center space-x-4">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-gray-500 text-sm">Or</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>
          
          <div className="text-center space-y-3">
            <p className="text-gray-600 text-sm">If you don't have the device yet</p>
            <Button 
              onClick={() => setLocation("/buy-device")}
              variant="outline" 
              className="w-full h-12 rounded-lg border-gray-300"
            >
              Buy it now
            </Button>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <button 
          onClick={handleSkip}
          className="w-full text-gray-500 text-center py-3 hover:text-gray-700 transition-colors"
        >
          Skip for now
        </button>
      </div>
     </div>
   );

  const renderQRScan = () => (
    <div className="flex flex-col min-h-screen max-h-screen overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b">
        <ArrowLeft className="h-6 w-6 text-gray-600 cursor-pointer" onClick={handleBack} />
        <h1 className="text-lg font-semibold text-gray-800">Device Setup Wizard</h1>
        <div></div>
      </div>
      
      <div className="flex-1 flex flex-col justify-center items-center px-4 py-2 space-y-4">
        <div className="text-center space-y-2">
          <h2 className="text-lg sm:text-xl font-semibold">Pair your Smart Energy Meter</h2>
          <p className="text-gray-600 text-sm">Use your phone camera to scan the QR code on</p>
          <p className="text-gray-600 text-sm">the back of your device.</p>
        </div>
        
        <div className="w-48 h-48 sm:w-64 sm:h-64 bg-gray-100 rounded-xl flex items-center justify-center relative shadow-lg">
          <div className="w-40 h-40 sm:w-56 sm:h-56 border-2 border-gray-300 bg-white rounded-lg flex items-center justify-center">
            <svg className="w-24 h-24 sm:w-32 sm:h-32" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="29" height="29" fill="white"/>
              <rect x="0" y="0" width="7" height="7" fill="black"/>
              <rect x="1" y="1" width="5" height="5" fill="white"/>
              <rect x="2" y="2" width="3" height="3" fill="black"/>
              <rect x="22" y="0" width="7" height="7" fill="black"/>
              <rect x="23" y="1" width="5" height="5" fill="white"/>
              <rect x="24" y="2" width="3" height="3" fill="black"/>
              <rect x="0" y="22" width="7" height="7" fill="black"/>
              <rect x="1" y="23" width="5" height="5" fill="white"/>
              <rect x="2" y="24" width="3" height="3" fill="black"/>
              <rect x="8" y="0" width="1" height="1" fill="black"/>
              <rect x="10" y="0" width="1" height="1" fill="black"/>
              <rect x="12" y="0" width="1" height="1" fill="black"/>
              <rect x="14" y="0" width="1" height="1" fill="black"/>
              <rect x="16" y="0" width="1" height="1" fill="black"/>
              <rect x="18" y="0" width="1" height="1" fill="black"/>
              <rect x="20" y="0" width="1" height="1" fill="black"/>
              <rect x="8" y="1" width="1" height="1" fill="black"/>
              <rect x="10" y="1" width="1" height="1" fill="black"/>
              <rect x="12" y="1" width="1" height="1" fill="black"/>
              <rect x="14" y="1" width="1" height="1" fill="black"/>
              <rect x="16" y="1" width="1" height="1" fill="black"/>
              <rect x="18" y="1" width="1" height="1" fill="black"/>
              <rect x="20" y="1" width="1" height="1" fill="black"/>
              <rect x="8" y="2" width="1" height="1" fill="black"/>
              <rect x="9" y="2" width="1" height="1" fill="black"/>
              <rect x="11" y="2" width="1" height="1" fill="black"/>
              <rect x="13" y="2" width="1" height="1" fill="black"/>
              <rect x="15" y="2" width="1" height="1" fill="black"/>
              <rect x="17" y="2" width="1" height="1" fill="black"/>
              <rect x="19" y="2" width="1" height="1" fill="black"/>
              <rect x="21" y="2" width="1" height="1" fill="black"/>
              <rect x="8" y="3" width="1" height="1" fill="black"/>
              <rect x="10" y="3" width="1" height="1" fill="black"/>
              <rect x="12" y="3" width="1" height="1" fill="black"/>
              <rect x="14" y="3" width="1" height="1" fill="black"/>
              <rect x="16" y="3" width="1" height="1" fill="black"/>
              <rect x="18" y="3" width="1" height="1" fill="black"/>
              <rect x="20" y="3" width="1" height="1" fill="black"/>
              <rect x="8" y="4" width="1" height="1" fill="black"/>
              <rect x="9" y="4" width="1" height="1" fill="black"/>
              <rect x="11" y="4" width="1" height="1" fill="black"/>
              <rect x="13" y="4" width="1" height="1" fill="black"/>
              <rect x="15" y="4" width="1" height="1" fill="black"/>
              <rect x="17" y="4" width="1" height="1" fill="black"/>
              <rect x="19" y="4" width="1" height="1" fill="black"/>
              <rect x="21" y="4" width="1" height="1" fill="black"/>
              <rect x="8" y="5" width="1" height="1" fill="black"/>
              <rect x="10" y="5" width="1" height="1" fill="black"/>
              <rect x="12" y="5" width="1" height="1" fill="black"/>
              <rect x="14" y="5" width="1" height="1" fill="black"/>
              <rect x="16" y="5" width="1" height="1" fill="black"/>
              <rect x="18" y="5" width="1" height="1" fill="black"/>
              <rect x="20" y="5" width="1" height="1" fill="black"/>
              <rect x="8" y="6" width="1" height="1" fill="black"/>
              <rect x="10" y="6" width="1" height="1" fill="black"/>
              <rect x="12" y="6" width="1" height="1" fill="black"/>
              <rect x="14" y="6" width="1" height="1" fill="black"/>
              <rect x="16" y="6" width="1" height="1" fill="black"/>
              <rect x="18" y="6" width="1" height="1" fill="black"/>
              <rect x="20" y="6" width="1" height="1" fill="black"/>
              <rect x="0" y="8" width="1" height="1" fill="black"/>
              <rect x="2" y="8" width="1" height="1" fill="black"/>
              <rect x="4" y="8" width="1" height="1" fill="black"/>
              <rect x="6" y="8" width="1" height="1" fill="black"/>
              <rect x="8" y="8" width="1" height="1" fill="black"/>
              <rect x="10" y="8" width="1" height="1" fill="black"/>
              <rect x="12" y="8" width="1" height="1" fill="black"/>
              <rect x="14" y="8" width="1" height="1" fill="black"/>
              <rect x="16" y="8" width="1" height="1" fill="black"/>
              <rect x="18" y="8" width="1" height="1" fill="black"/>
              <rect x="20" y="8" width="1" height="1" fill="black"/>
              <rect x="22" y="8" width="1" height="1" fill="black"/>
              <rect x="24" y="8" width="1" height="1" fill="black"/>
              <rect x="26" y="8" width="1" height="1" fill="black"/>
              <rect x="28" y="8" width="1" height="1" fill="black"/>
              <rect x="1" y="9" width="1" height="1" fill="black"/>
              <rect x="3" y="9" width="1" height="1" fill="black"/>
              <rect x="5" y="9" width="1" height="1" fill="black"/>
              <rect x="9" y="9" width="1" height="1" fill="black"/>
              <rect x="11" y="9" width="1" height="1" fill="black"/>
              <rect x="13" y="9" width="1" height="1" fill="black"/>
              <rect x="15" y="9" width="1" height="1" fill="black"/>
              <rect x="17" y="9" width="1" height="1" fill="black"/>
              <rect x="19" y="9" width="1" height="1" fill="black"/>
              <rect x="21" y="9" width="1" height="1" fill="black"/>
              <rect x="23" y="9" width="1" height="1" fill="black"/>
              <rect x="25" y="9" width="1" height="1" fill="black"/>
              <rect x="27" y="9" width="1" height="1" fill="black"/>
              <rect x="0" y="10" width="1" height="1" fill="black"/>
              <rect x="2" y="10" width="1" height="1" fill="black"/>
              <rect x="4" y="10" width="1" height="1" fill="black"/>
              <rect x="6" y="10" width="1" height="1" fill="black"/>
              <rect x="8" y="10" width="1" height="1" fill="black"/>
              <rect x="10" y="10" width="1" height="1" fill="black"/>
              <rect x="12" y="10" width="1" height="1" fill="black"/>
              <rect x="14" y="10" width="1" height="1" fill="black"/>
              <rect x="16" y="10" width="1" height="1" fill="black"/>
              <rect x="18" y="10" width="1" height="1" fill="black"/>
              <rect x="20" y="10" width="1" height="1" fill="black"/>
              <rect x="22" y="10" width="1" height="1" fill="black"/>
              <rect x="24" y="10" width="1" height="1" fill="black"/>
              <rect x="26" y="10" width="1" height="1" fill="black"/>
              <rect x="28" y="10" width="1" height="1" fill="black"/>
              <rect x="1" y="11" width="1" height="1" fill="black"/>
              <rect x="3" y="11" width="1" height="1" fill="black"/>
              <rect x="5" y="11" width="1" height="1" fill="black"/>
              <rect x="9" y="11" width="1" height="1" fill="black"/>
              <rect x="11" y="11" width="1" height="1" fill="black"/>
              <rect x="13" y="11" width="1" height="1" fill="black"/>
              <rect x="15" y="11" width="1" height="1" fill="black"/>
              <rect x="17" y="11" width="1" height="1" fill="black"/>
              <rect x="19" y="11" width="1" height="1" fill="black"/>
              <rect x="21" y="11" width="1" height="1" fill="black"/>
              <rect x="23" y="11" width="1" height="1" fill="black"/>
              <rect x="25" y="11" width="1" height="1" fill="black"/>
              <rect x="27" y="11" width="1" height="1" fill="black"/>
              <rect x="0" y="12" width="1" height="1" fill="black"/>
              <rect x="2" y="12" width="1" height="1" fill="black"/>
              <rect x="4" y="12" width="1" height="1" fill="black"/>
              <rect x="6" y="12" width="1" height="1" fill="black"/>
              <rect x="8" y="12" width="1" height="1" fill="black"/>
              <rect x="10" y="12" width="1" height="1" fill="black"/>
              <rect x="12" y="12" width="1" height="1" fill="black"/>
              <rect x="14" y="12" width="1" height="1" fill="black"/>
              <rect x="16" y="12" width="1" height="1" fill="black"/>
              <rect x="18" y="12" width="1" height="1" fill="black"/>
              <rect x="20" y="12" width="1" height="1" fill="black"/>
              <rect x="22" y="12" width="1" height="1" fill="black"/>
              <rect x="24" y="12" width="1" height="1" fill="black"/>
              <rect x="26" y="12" width="1" height="1" fill="black"/>
              <rect x="28" y="12" width="1" height="1" fill="black"/>
              <rect x="1" y="13" width="1" height="1" fill="black"/>
              <rect x="3" y="13" width="1" height="1" fill="black"/>
              <rect x="5" y="13" width="1" height="1" fill="black"/>
              <rect x="9" y="13" width="1" height="1" fill="black"/>
              <rect x="11" y="13" width="1" height="1" fill="black"/>
              <rect x="13" y="13" width="1" height="1" fill="black"/>
              <rect x="15" y="13" width="1" height="1" fill="black"/>
              <rect x="17" y="13" width="1" height="1" fill="black"/>
              <rect x="19" y="13" width="1" height="1" fill="black"/>
              <rect x="21" y="13" width="1" height="1" fill="black"/>
              <rect x="23" y="13" width="1" height="1" fill="black"/>
              <rect x="25" y="13" width="1" height="1" fill="black"/>
              <rect x="27" y="13" width="1" height="1" fill="black"/>
              <rect x="12" y="14" width="1" height="1" fill="black"/>
              <rect x="14" y="14" width="1" height="1" fill="black"/>
              <rect x="16" y="14" width="1" height="1" fill="black"/>
              <rect x="0" y="15" width="1" height="1" fill="black"/>
              <rect x="2" y="15" width="1" height="1" fill="black"/>
              <rect x="4" y="15" width="1" height="1" fill="black"/>
              <rect x="6" y="15" width="1" height="1" fill="black"/>
              <rect x="8" y="15" width="1" height="1" fill="black"/>
              <rect x="10" y="15" width="1" height="1" fill="black"/>
              <rect x="12" y="15" width="1" height="1" fill="black"/>
              <rect x="14" y="15" width="1" height="1" fill="black"/>
              <rect x="16" y="15" width="1" height="1" fill="black"/>
              <rect x="18" y="15" width="1" height="1" fill="black"/>
              <rect x="20" y="15" width="1" height="1" fill="black"/>
              <rect x="22" y="15" width="1" height="1" fill="black"/>
              <rect x="24" y="15" width="1" height="1" fill="black"/>
              <rect x="26" y="15" width="1" height="1" fill="black"/>
              <rect x="28" y="15" width="1" height="1" fill="black"/>
              <rect x="1" y="16" width="1" height="1" fill="black"/>
              <rect x="3" y="16" width="1" height="1" fill="black"/>
              <rect x="5" y="16" width="1" height="1" fill="black"/>
              <rect x="9" y="16" width="1" height="1" fill="black"/>
              <rect x="11" y="16" width="1" height="1" fill="black"/>
              <rect x="13" y="16" width="1" height="1" fill="black"/>
              <rect x="15" y="16" width="1" height="1" fill="black"/>
              <rect x="17" y="16" width="1" height="1" fill="black"/>
              <rect x="19" y="16" width="1" height="1" fill="black"/>
              <rect x="21" y="16" width="1" height="1" fill="black"/>
              <rect x="23" y="16" width="1" height="1" fill="black"/>
              <rect x="25" y="16" width="1" height="1" fill="black"/>
              <rect x="27" y="16" width="1" height="1" fill="black"/>
              <rect x="0" y="17" width="1" height="1" fill="black"/>
              <rect x="2" y="17" width="1" height="1" fill="black"/>
              <rect x="4" y="17" width="1" height="1" fill="black"/>
              <rect x="6" y="17" width="1" height="1" fill="black"/>
              <rect x="8" y="17" width="1" height="1" fill="black"/>
              <rect x="10" y="17" width="1" height="1" fill="black"/>
              <rect x="12" y="17" width="1" height="1" fill="black"/>
              <rect x="14" y="17" width="1" height="1" fill="black"/>
              <rect x="16" y="17" width="1" height="1" fill="black"/>
              <rect x="18" y="17" width="1" height="1" fill="black"/>
              <rect x="20" y="17" width="1" height="1" fill="black"/>
              <rect x="22" y="17" width="1" height="1" fill="black"/>
              <rect x="24" y="17" width="1" height="1" fill="black"/>
              <rect x="26" y="17" width="1" height="1" fill="black"/>
              <rect x="28" y="17" width="1" height="1" fill="black"/>
              <rect x="1" y="18" width="1" height="1" fill="black"/>
              <rect x="3" y="18" width="1" height="1" fill="black"/>
              <rect x="5" y="18" width="1" height="1" fill="black"/>
              <rect x="9" y="18" width="1" height="1" fill="black"/>
              <rect x="11" y="18" width="1" height="1" fill="black"/>
              <rect x="13" y="18" width="1" height="1" fill="black"/>
              <rect x="15" y="18" width="1" height="1" fill="black"/>
              <rect x="17" y="18" width="1" height="1" fill="black"/>
              <rect x="19" y="18" width="1" height="1" fill="black"/>
              <rect x="21" y="18" width="1" height="1" fill="black"/>
              <rect x="23" y="18" width="1" height="1" fill="black"/>
              <rect x="25" y="18" width="1" height="1" fill="black"/>
              <rect x="27" y="18" width="1" height="1" fill="black"/>
              <rect x="0" y="19" width="1" height="1" fill="black"/>
              <rect x="2" y="19" width="1" height="1" fill="black"/>
              <rect x="4" y="19" width="1" height="1" fill="black"/>
              <rect x="6" y="19" width="1" height="1" fill="black"/>
              <rect x="8" y="19" width="1" height="1" fill="black"/>
              <rect x="10" y="19" width="1" height="1" fill="black"/>
              <rect x="12" y="19" width="1" height="1" fill="black"/>
              <rect x="14" y="19" width="1" height="1" fill="black"/>
              <rect x="16" y="19" width="1" height="1" fill="black"/>
              <rect x="18" y="19" width="1" height="1" fill="black"/>
              <rect x="20" y="19" width="1" height="1" fill="black"/>
              <rect x="22" y="19" width="1" height="1" fill="black"/>
              <rect x="24" y="19" width="1" height="1" fill="black"/>
              <rect x="26" y="19" width="1" height="1" fill="black"/>
              <rect x="28" y="19" width="1" height="1" fill="black"/>
              <rect x="1" y="20" width="1" height="1" fill="black"/>
              <rect x="3" y="20" width="1" height="1" fill="black"/>
              <rect x="5" y="20" width="1" height="1" fill="black"/>
              <rect x="9" y="20" width="1" height="1" fill="black"/>
              <rect x="11" y="20" width="1" height="1" fill="black"/>
              <rect x="13" y="20" width="1" height="1" fill="black"/>
              <rect x="15" y="20" width="1" height="1" fill="black"/>
              <rect x="17" y="20" width="1" height="1" fill="black"/>
              <rect x="19" y="20" width="1" height="1" fill="black"/>
              <rect x="21" y="20" width="1" height="1" fill="black"/>
              <rect x="23" y="20" width="1" height="1" fill="black"/>
              <rect x="25" y="20" width="1" height="1" fill="black"/>
              <rect x="27" y="20" width="1" height="1" fill="black"/>
              <rect x="8" y="21" width="1" height="1" fill="black"/>
              <rect x="10" y="21" width="1" height="1" fill="black"/>
              <rect x="12" y="21" width="1" height="1" fill="black"/>
              <rect x="14" y="21" width="1" height="1" fill="black"/>
              <rect x="16" y="21" width="1" height="1" fill="black"/>
              <rect x="18" y="21" width="1" height="1" fill="black"/>
              <rect x="20" y="21" width="1" height="1" fill="black"/>
              <rect x="8" y="22" width="1" height="1" fill="black"/>
              <rect x="10" y="22" width="1" height="1" fill="black"/>
              <rect x="12" y="22" width="1" height="1" fill="black"/>
              <rect x="14" y="22" width="1" height="1" fill="black"/>
              <rect x="16" y="22" width="1" height="1" fill="black"/>
              <rect x="18" y="22" width="1" height="1" fill="black"/>
              <rect x="20" y="22" width="1" height="1" fill="black"/>
              <rect x="8" y="23" width="1" height="1" fill="black"/>
              <rect x="9" y="23" width="1" height="1" fill="black"/>
              <rect x="11" y="23" width="1" height="1" fill="black"/>
              <rect x="13" y="23" width="1" height="1" fill="black"/>
              <rect x="15" y="23" width="1" height="1" fill="black"/>
              <rect x="17" y="23" width="1" height="1" fill="black"/>
              <rect x="19" y="23" width="1" height="1" fill="black"/>
              <rect x="21" y="23" width="1" height="1" fill="black"/>
              <rect x="8" y="24" width="1" height="1" fill="black"/>
              <rect x="10" y="24" width="1" height="1" fill="black"/>
              <rect x="12" y="24" width="1" height="1" fill="black"/>
              <rect x="14" y="24" width="1" height="1" fill="black"/>
              <rect x="16" y="24" width="1" height="1" fill="black"/>
              <rect x="18" y="24" width="1" height="1" fill="black"/>
              <rect x="20" y="24" width="1" height="1" fill="black"/>
              <rect x="8" y="25" width="1" height="1" fill="black"/>
              <rect x="9" y="25" width="1" height="1" fill="black"/>
              <rect x="11" y="25" width="1" height="1" fill="black"/>
              <rect x="13" y="25" width="1" height="1" fill="black"/>
              <rect x="15" y="25" width="1" height="1" fill="black"/>
              <rect x="17" y="25" width="1" height="1" fill="black"/>
              <rect x="19" y="25" width="1" height="1" fill="black"/>
              <rect x="21" y="25" width="1" height="1" fill="black"/>
              <rect x="8" y="26" width="1" height="1" fill="black"/>
              <rect x="10" y="26" width="1" height="1" fill="black"/>
              <rect x="12" y="26" width="1" height="1" fill="black"/>
              <rect x="14" y="26" width="1" height="1" fill="black"/>
              <rect x="16" y="26" width="1" height="1" fill="black"/>
              <rect x="18" y="26" width="1" height="1" fill="black"/>
              <rect x="20" y="26" width="1" height="1" fill="black"/>
              <rect x="8" y="27" width="1" height="1" fill="black"/>
              <rect x="10" y="27" width="1" height="1" fill="black"/>
              <rect x="12" y="27" width="1" height="1" fill="black"/>
              <rect x="14" y="27" width="1" height="1" fill="black"/>
              <rect x="16" y="27" width="1" height="1" fill="black"/>
              <rect x="18" y="27" width="1" height="1" fill="black"/>
              <rect x="20" y="27" width="1" height="1" fill="black"/>
              <rect x="0" y="28" width="1" height="1" fill="black"/>
              <rect x="2" y="28" width="1" height="1" fill="black"/>
              <rect x="4" y="28" width="1" height="1" fill="black"/>
              <rect x="6" y="28" width="1" height="1" fill="black"/>
              <rect x="8" y="28" width="1" height="1" fill="black"/>
              <rect x="10" y="28" width="1" height="1" fill="black"/>
              <rect x="12" y="28" width="1" height="1" fill="black"/>
              <rect x="14" y="28" width="1" height="1" fill="black"/>
              <rect x="16" y="28" width="1" height="1" fill="black"/>
              <rect x="18" y="28" width="1" height="1" fill="black"/>
              <rect x="20" y="28" width="1" height="1" fill="black"/>
              <rect x="22" y="28" width="1" height="1" fill="black"/>
              <rect x="24" y="28" width="1" height="1" fill="black"/>
              <rect x="26" y="28" width="1" height="1" fill="black"/>
              <rect x="28" y="28" width="1" height="1" fill="black"/>
            </svg>
          </div>
        </div>
        
        <div className="w-full space-y-3">
          <Button 
            onClick={handleNext}
            disabled={isLoading}
            className="w-full bg-primary hover:bg-primary/90 text-white h-12 rounded-lg hover:scale-105 active:scale-95 transition-all disabled:scale-100"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Scanning...
              </>
            ) : (
              <>
                <Camera className="h-4 w-4 mr-2" />
                Scan QR Code
              </>
            )}
          </Button>
          
          <Button 
            onClick={handleNext}
            variant="outline" 
            className="w-full h-12 rounded-lg border-gray-300 hover:bg-gray-50 transition-all"
          >
            Enter Code Manually
          </Button>
        </div>
      </div>
      
      <div className="p-4">
        <button 
          onClick={handleSkip}
          className="w-full text-gray-500 text-center py-3 hover:text-gray-700 transition-colors"
        >
          Skip for now
        </button>
      </div>
    </div>
  );

  const renderWiFiList = () => (
    <div className="flex flex-col min-h-screen max-h-screen overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b">
        <ArrowLeft className="h-6 w-6 text-gray-600 cursor-pointer" onClick={handleBack} />
        <h1 className="text-lg font-semibold text-gray-800">Wi-Fi Setup</h1>
        <div></div>
      </div>
      
      <div className="flex-1 px-4 pt-4">
        <div className="text-center space-y-2 mb-4">
          <h2 className="text-lg sm:text-xl font-semibold">Connect to Wi-Fi</h2>
          <p className="text-gray-600">Choose a Wi-Fi network to connect your device</p>
          <p className="text-gray-600">to the internet.</p>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-gray-700">Networks Nearby</span>
            <div className="w-5 h-5 border-2 border-gray-400 rounded-full animate-spin border-t-transparent"></div>
          </div>
          
          {Array.from({length: 6}).map((_, i) => (
            <div 
              key={i}
              onClick={handleNext}
              className="flex items-center justify-between p-3 sm:p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50"
            >
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.07 2.93 1 9zm8 8l3 3 3-3c-1.65-1.65-4.34-1.65-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/>
                  </svg>
                </div>
                <span>WIFI Router {i + 1}</span>
              </div>
              <div className="w-5 h-5 text-gray-400">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V10A2,2 0 0,1 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z"/>
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderWiFiPassword = () => (
    <div className="flex flex-col min-h-screen max-h-screen overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b">
        <ArrowLeft className="h-6 w-6 text-gray-600 cursor-pointer" onClick={handleBack} />
        <h1 className="text-lg font-semibold text-gray-800">Wi-Fi Setup</h1>
        <div></div>
      </div>
      
      <div className="flex-1 px-4 pt-4">
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-3">WIFI Router 1</h2>
          
          <div className="space-y-3">
            <div>
              <label className="block text-gray-700 mb-2">Password</label>
              <input 
                type="password"
                placeholder="Password"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="showPassword" className="w-4 h-4" />
              <label htmlFor="showPassword" className="text-gray-700">Show Password</label>
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          <Button 
            onClick={handleNext}
            className="w-full bg-primary hover:bg-primary/90 text-white h-12 rounded-lg"
          >
            Connect
          </Button>
          
          <button 
            onClick={handleBack}
            className="w-full text-gray-500 text-center py-4"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  const renderWiFiConnect = () => (
    <div className="flex flex-col min-h-screen max-h-screen overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b">
        <ArrowLeft className="h-6 w-6 text-gray-600 cursor-pointer" onClick={handleBack} />
        <h1 className="text-lg font-semibold text-gray-800">Wi-Fi Setup</h1>
        <div></div>
      </div>
      
      <div className="flex-1 flex flex-col justify-center items-center px-4 space-y-6">
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-3">WIFI Router 1</h2>
        </div>
        
        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-primary rounded-full flex items-center justify-center">
          <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
          </svg>
        </div>
        
        <div className="text-center">
          <h3 className="text-lg font-semibold text-primary">Connected successfully</h3>
        </div>
        
        <Button 
          onClick={handleNext}
          className="w-full bg-primary hover:bg-primary/90 text-white h-12 rounded-lg"
        >
          Continue
        </Button>
      </div>
    </div>
  );

  const renderDeviceNaming = () => (
    <div className="flex flex-col min-h-screen max-h-screen overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b">
        <ArrowLeft className="h-6 w-6 text-gray-600 cursor-pointer" onClick={handleBack} />
        <h1 className="text-lg font-semibold text-gray-800">Device Naming</h1>
        <div></div>
      </div>
      
      <div className="flex-1 flex flex-col justify-center items-center px-4 space-y-6">
        <div className="w-28 h-20 sm:w-32 sm:h-24 bg-gray-200 rounded-lg flex items-center justify-center">
          <div className="relative">
            <div className="w-16 h-12 bg-white rounded border border-gray-300 flex items-center justify-center">
              <div className="w-8 h-1 bg-gray-400 rounded"></div>
            </div>
            <div className="absolute -top-4 left-2 space-x-1 flex">
              <div className="w-1 h-6 bg-gray-600 rounded"></div>
              <div className="w-1 h-8 bg-gray-600 rounded"></div>
              <div className="w-1 h-6 bg-gray-600 rounded"></div>
            </div>
          </div>
        </div>
        
        <div className="text-center space-y-2">
          <h2 className="text-lg font-semibold">Give your device a name</h2>
        </div>
        
        <div className="w-full space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Device Name</label>
            <input 
              type="text"
              placeholder="Smart Energy Meter"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          
          <Button 
            onClick={handleNext}
            className="w-full bg-primary hover:bg-primary/90 text-white h-12 rounded-lg"
          >
            Finish Setup
          </Button>
        </div>
      </div>
    </div>
  );

  const renderHomeSetup = () => (
    <div className="flex flex-col min-h-screen max-h-screen overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b">
        <ArrowLeft className="h-6 w-6 text-gray-600 cursor-pointer" onClick={handleBack} />
        <h1 className="text-lg font-semibold text-gray-800">Device Setup Wizard</h1>
        <div></div>
      </div>
      
      <div className="flex-1 flex flex-col justify-center items-center px-4 py-6 space-y-6">
        <div className="w-full max-w-xs sm:max-w-sm">
          <img src={houseImage} alt="Smart Home" className="w-full h-auto rounded-lg shadow-lg" />
        </div>
        
        <div className="text-center space-y-2">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Smart Home Setup</h2>
          <p className="text-gray-600 text-sm leading-relaxed">Connect to your smart device or purchase one if you don't have it yet.</p>
        </div>
        
        <div className="w-full max-w-sm space-y-6">
          <Button 
            onClick={handleNext}
            disabled={isLoading}
            className="w-full bg-primary hover:bg-primary/90 text-white h-12 rounded-lg hover:scale-105 active:scale-95 transition-all disabled:scale-100 font-medium"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Setting up...
              </>
            ) : (
              <>
                <Wifi className="h-4 w-4 mr-2" />
                Add Device
              </>
            )}
          </Button>
          
          <div className="flex items-center space-x-4">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-gray-500 text-sm font-medium">Or</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>
          
          <div className="text-center space-y-4">
            <p className="text-gray-600 text-sm">If you don't have the device yet</p>
            <Button 
              onClick={handleNext}
              variant="outline" 
              className="w-full h-12 rounded-lg border-gray-300 hover:bg-gray-50 transition-all font-medium"
            >
              Buy it now
            </Button>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <button 
          onClick={handleSkip}
          className="w-full text-gray-500 text-center py-3"
        >
          Skip for now
        </button>
      </div>
    </div>
  );



  const renderAppliances = () => (
    <div className="flex flex-col min-h-screen max-h-screen overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b">
        <ArrowLeft className="h-6 w-6 text-gray-600" onClick={handleBack} />
        <div></div>
        <div></div>
      </div>
      
      <div className="flex-1 px-6 pt-4">
        <div className="mb-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg h-48 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-2">⚡</div>
            <p className="text-gray-600 font-medium">Smart Appliances</p>
          </div>
        </div>
        
        <h2 className="text-xl font-bold text-gray-800 mb-2">Electrical system in Home</h2>
        <p className="text-gray-600 mb-2">Which of the following Electrical systems are</p>
        <p className="text-gray-600 mb-4">present in your home?</p>
        <p className="text-sm text-gray-500 mb-6">Select all that apply</p>
        
        <div className="space-y-4">
          {[
            "Frigorifero",
            "Lavatrice", 
            "Lavastoviglie",
            "Forno elettrico",
            "Piano cottura a induzione",
            "Boiler elettrico",
            "Pompa di calore / climatizzatore",
            "Asciugatrice",
            "Veicolo elettrico"
          ].map((appliance) => (
            <div key={appliance} className="flex items-center space-x-3">
              <Checkbox 
                id={appliance}
                checked={formData.appliances.includes(appliance)}
                onCheckedChange={() => handleApplianceToggle(appliance)}
              />
              <Label htmlFor={appliance} className="text-gray-700">{appliance}</Label>
            </div>
          ))}
        </div>
      </div>
      
      <div className="p-6">
        <Button onClick={handleNext} className="w-full bg-primary hover:bg-primary/90 text-white h-12 rounded-lg">
          Next <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );

  const renderTariffType = () => (
    <div className="flex flex-col min-h-screen max-h-screen overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b">
        <ArrowLeft className="h-6 w-6 text-gray-600" onClick={handleBack} />
        <div></div>
        <div></div>
      </div>
      
      <div className="flex-1 px-6 pt-4">
        <div className="mb-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg h-48 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-2">💡</div>
            <p className="text-gray-600 font-medium">Energy Tariff</p>
          </div>
        </div>
        
        <h2 className="text-xl font-bold text-gray-800 mb-6">Add your energy tariff details</h2>
        
        <div className="space-y-4">
          <div>
            <Label className="text-gray-600">Tariff Type</Label>
            <Select value={formData.tariffType} onValueChange={(value) => setFormData(prev => ({ ...prev, tariffType: value }))}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Variable" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="variable">Variable</SelectItem>
                <SelectItem value="fixed">Fixed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label className="text-gray-600">Spread (€/kWh)</Label>
            <Input 
              value={formData.spread}
              onChange={(e) => setFormData(prev => ({ ...prev, spread: e.target.value }))}
              className="mt-1"
            />
          </div>
        </div>
      </div>
      
      <div className="p-6 space-y-4">
        <Button onClick={handleNext} className="w-full bg-primary hover:bg-primary/90 text-white h-12 rounded-lg">
          Save and Continue
        </Button>
        <button 
          onClick={handleSkip}
          className="w-full text-gray-500 text-center py-2"
        >
          Skip for now
        </button>
      </div>
    </div>
  );

  const renderTariffDetails = () => (
    <div className="flex flex-col min-h-screen max-h-screen overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b">
        <ArrowLeft className="h-6 w-6 text-gray-600" onClick={handleBack} />
        <div></div>
        <div></div>
      </div>
      
      <div className="flex-1 px-6 pt-4">
        <div className="mb-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg h-48 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-2">📊</div>
            <p className="text-gray-600 font-medium">Tariff Details</p>
          </div>
        </div>
        
        <h2 className="text-xl font-bold text-gray-800 mb-6">Add your energy tariff details</h2>
        
        <div className="space-y-4">
          <div>
            <Label className="text-gray-600">Tariff Type</Label>
            <Select value="fixed">
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Fixed" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fixed">Fixed</SelectItem>
                <SelectItem value="variable">Variable</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label className="text-gray-600 text-lg font-medium">Fixed</Label>
            <div className="flex space-x-4 mt-2">
              {["Monoraria", "Bioraria", "Trioraria"].map((type) => (
                <label key={type} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="fixedType"
                    value={type}
                    checked={formData.fixedType === type}
                    onChange={(e) => setFormData(prev => ({ ...prev, fixedType: e.target.value }))}
                    className="w-4 h-4 text-primary"
                  />
                  <span className="text-gray-700">{type}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div>
            <Label className="text-gray-600">F1 (€/kWh)</Label>
            <Input 
              value={formData.f1}
              onChange={(e) => setFormData(prev => ({ ...prev, f1: e.target.value }))}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label className="text-gray-600">F2 (€/kWh)</Label>
            <Input 
              value={formData.f2}
              onChange={(e) => setFormData(prev => ({ ...prev, f2: e.target.value }))}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label className="text-gray-600">F3 (€/kWh)</Label>
            <Input 
              value={formData.f3}
              onChange={(e) => setFormData(prev => ({ ...prev, f3: e.target.value }))}
              className="mt-1"
            />
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <Button onClick={handleNext} className="w-full bg-primary hover:bg-primary/90 text-white h-12 rounded-lg">
          Save and Continue
        </Button>
        <button 
          onClick={handleSkip}
          className="w-full text-gray-500 text-center py-2 mt-2"
        >
          Skip for now
        </button>
      </div>
    </div>
  );

  const renderBillUpload = () => (
    <div className="flex flex-col min-h-screen max-h-screen overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b">
        <ArrowLeft className="h-6 w-6 text-gray-600" onClick={handleBack} />
        <div></div>
        <div></div>
      </div>
      
      <div className="flex-1 px-6 pt-4">
        <div className="mb-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg h-48 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-2">📋</div>
            <p className="text-gray-600 font-medium">Utility Bill</p>
          </div>
        </div>
        
        <h2 className="text-xl font-bold text-gray-800 mb-6">Add your energy tariff details</h2>
        
        <div className="space-y-6">
          <div>
            <Label className="text-gray-600">Upload Utility Bill *</Label>
            <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 font-medium">Upload a PDF or a photo of your bill</p>
              <p className="text-xs text-gray-500 mt-2">Ricorda: non cediamo i tuoi dati a terzi</p>
              <p className="text-xs text-gray-500">senza il tuo consenso</p>
            </div>
          </div>
          
          <div>
            <Label className="text-gray-600 text-lg font-medium">Enter Manually</Label>
            
            <div className="mt-4 space-y-4">
              <div>
                <Label className="text-gray-600">Customer Type</Label>
                <Select value={formData.customerType} onValueChange={(value) => setFormData(prev => ({ ...prev, customerType: value }))}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Customer Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="residential">Residential</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label className="text-gray-600">Power Commitment in kW</Label>
                <Select value={formData.powerCommitment} onValueChange={(value) => setFormData(prev => ({ ...prev, powerCommitment: value }))}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Power Commitment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3 kW</SelectItem>
                    <SelectItem value="4.5">4.5 kW</SelectItem>
                    <SelectItem value="6">6 kW</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-6 space-y-4">
        <Button 
          onClick={() => {
            localStorage.setItem('setupCompleted', 'true');
            setLocation("/home");
          }}
          className="w-full bg-primary hover:bg-primary/90 text-white h-12 rounded-lg"
        >
          Save and Continue
        </Button>
        <button 
          onClick={handleSkip}
          className="w-full text-gray-500 text-center py-2"
        >
          Skip for now
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-primary/5 w-full max-w-sm mx-auto">
      <div className={`transition-all duration-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
        {currentStep === "device" && renderDevice()}
        {currentStep === "qr-scan" && renderQRScan()}
        {currentStep === "wifi-list" && renderWiFiList()}
        {currentStep === "wifi-password" && renderWiFiPassword()}
        {currentStep === "wifi-connect" && renderWiFiConnect()}
        {currentStep === "device-naming" && renderDeviceNaming()}
        {currentStep === "home" && renderHomeSetup()}
        {currentStep === "appliances" && renderAppliances()}
        {currentStep === "tariff-type" && renderTariffType()}
        {currentStep === "tariff-details" && renderTariffDetails()}
        {currentStep === "bill-upload" && renderBillUpload()}
      </div>
    </div>
  );
}