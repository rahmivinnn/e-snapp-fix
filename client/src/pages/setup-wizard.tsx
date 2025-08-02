import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, ArrowRight, Camera, Upload } from "lucide-react";
import { useLocation } from "wouter";
import logoImage from "@assets/e snapp logo 1 (1)_1754149374420.png";
import houseImage from "@assets/Rectangle 102_1754150724561.png";

type SetupStep = "device" | "qr-scan" | "wifi-list" | "wifi-password" | "wifi-connect" | "device-naming" | "home" | "appliances" | "tariff-type" | "tariff-details" | "tariff-variable" | "bill-upload";

export default function SetupWizard() {
  const [, setLocation] = useLocation();
  const [currentStep, setCurrentStep] = useState<SetupStep>("device");
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

  const handleNext = () => {
    const steps: SetupStep[] = ["device", "qr-scan", "wifi-list", "wifi-password", "wifi-connect", "device-naming", "home", "appliances", "tariff-type", "tariff-details", "tariff-variable", "bill-upload"];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    } else {
      // Complete setup and go to home
      localStorage.setItem('setupCompleted', 'true');
      setLocation("/home");
    }
  };

  const handleBack = () => {
    const steps: SetupStep[] = ["device", "qr-scan", "wifi-list", "wifi-password", "wifi-connect", "device-naming", "home", "appliances", "tariff-type", "tariff-details", "tariff-variable", "bill-upload"];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    } else {
      // If on first step, do nothing or could close setup
      console.log("Already on first step");
    }
  };

  const handleSkip = () => {
    localStorage.setItem('setupCompleted', 'true');
    setLocation("/home");
  };

  const handleApplianceToggle = (appliance: string) => {
    setFormData(prev => ({
      ...prev,
      appliances: prev.appliances.includes(appliance)
        ? prev.appliances.filter(a => a !== appliance)
        : [...prev.appliances, appliance]
    }));
  };

  const renderQRScan = () => (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b">
        <ArrowLeft className="h-6 w-6 text-gray-600 cursor-pointer" onClick={handleBack} />
        <h1 className="text-lg font-semibold text-gray-800">Device Setup Wizard</h1>
        <div></div>
      </div>
      
      <div className="flex-1 flex flex-col justify-center items-center px-6 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-xl font-semibold">Pair your Smart Energy Meter</h2>
          <p className="text-gray-600">Use your phone camera to scan the QR code on</p>
          <p className="text-gray-600">the back of your device.</p>
        </div>
        
        <div className="w-64 h-64 bg-gray-200 rounded-lg flex items-center justify-center relative">
          <div className="w-48 h-48 border-2 border-white bg-white rounded-lg flex items-center justify-center">
            <div className="w-40 h-40 bg-black grid grid-cols-8 gap-px">
              {Array.from({length: 64}).map((_, i) => (
                <div key={i} className={`${Math.random() > 0.5 ? 'bg-black' : 'bg-white'}`}></div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="w-full space-y-4">
          <Button 
            onClick={handleNext}
            className="w-full bg-primary hover:bg-primary/90 text-white h-12 rounded-lg"
          >
            Scan QR Code
          </Button>
          
          <button 
            onClick={handleNext}
            className="w-full text-gray-500 text-center py-4"
          >
            Enter Code Manually
          </button>
        </div>
      </div>
      
      <div className="p-6">
        <button 
          onClick={handleSkip}
          className="w-full text-gray-500 text-center py-4"
        >
          Skip for now
        </button>
      </div>
    </div>
  );

  const renderWiFiList = () => (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b">
        <ArrowLeft className="h-6 w-6 text-gray-600 cursor-pointer" onClick={handleBack} />
        <h1 className="text-lg font-semibold text-gray-800">Wi-Fi Setup</h1>
        <div></div>
      </div>
      
      <div className="flex-1 px-6 pt-6">
        <div className="text-center space-y-2 mb-6">
          <h2 className="text-xl font-semibold">Connect to Wi-Fi</h2>
          <p className="text-gray-600">Choose a Wi-Fi network to connect your device</p>
          <p className="text-gray-600">to the internet.</p>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-700">Networks Nearby</span>
            <div className="w-5 h-5 border-2 border-gray-400 rounded-full animate-spin border-t-transparent"></div>
          </div>
          
          {Array.from({length: 6}).map((_, i) => (
            <div 
              key={i}
              onClick={handleNext}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50"
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
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b">
        <ArrowLeft className="h-6 w-6 text-gray-600 cursor-pointer" onClick={handleBack} />
        <h1 className="text-lg font-semibold text-gray-800">Wi-Fi Setup</h1>
        <div></div>
      </div>
      
      <div className="flex-1 px-6 pt-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">WIFI Router 1</h2>
          
          <div className="space-y-4">
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
        
        <div className="space-y-4">
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
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b">
        <ArrowLeft className="h-6 w-6 text-gray-600 cursor-pointer" onClick={handleBack} />
        <h1 className="text-lg font-semibold text-gray-800">Wi-Fi Setup</h1>
        <div></div>
      </div>
      
      <div className="flex-1 flex flex-col justify-center items-center px-6 space-y-8">
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">WIFI Router 1</h2>
        </div>
        
        <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center">
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
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b">
        <ArrowLeft className="h-6 w-6 text-gray-600 cursor-pointer" onClick={handleBack} />
        <h1 className="text-lg font-semibold text-gray-800">Device Naming</h1>
        <div></div>
      </div>
      
      <div className="flex-1 flex flex-col justify-center items-center px-6 space-y-8">
        <div className="w-32 h-24 bg-gray-200 rounded-lg flex items-center justify-center">
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

  const renderDeviceSetup = () => (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b">
        <ArrowLeft className="h-6 w-6 text-gray-600 cursor-pointer" onClick={handleBack} />
        <h1 className="text-lg font-semibold text-gray-800">Device Setup Wizard</h1>
        <div></div>
      </div>
      
      <div className="flex-1 flex flex-col justify-center items-center px-6 space-y-8">
        <img src={logoImage} alt="e-snapp" className="h-20 w-auto" />
        
        <div className="text-center space-y-2">
          <p className="text-gray-600">Connect to a device or buy device if you don't</p>
          <p className="text-gray-600">have the device.</p>
        </div>
        
        <div className="w-full space-y-4">
          <Button 
            onClick={handleNext}
            className="w-full bg-primary hover:bg-primary/90 text-white h-12 rounded-lg"
          >
            Add Device
          </Button>
          
          <div className="flex items-center space-x-4">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-gray-500 text-sm">Or</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>
          
          <div className="text-center space-y-4">
            <p className="text-gray-600">If you don't have the device yet</p>
            <Button 
              onClick={handleNext}
              variant="outline" 
              className="w-full h-12 rounded-lg border-gray-300"
            >
              Buy it now
            </Button>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <button 
          onClick={handleSkip}
          className="w-full text-gray-500 text-center py-4"
        >
          Skip for now
        </button>
      </div>
    </div>
  );

  const renderHomeSetup = () => (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b">
        <ArrowLeft className="h-6 w-6 text-gray-600 cursor-pointer" onClick={handleBack} />
        <div></div>
        <div></div>
      </div>
      
      <div className="flex-1 px-6 pt-4">
        <div className="mb-6 rounded-lg h-48 overflow-hidden">
          <img src={houseImage} alt="Modern House" className="w-full h-full object-cover rounded-lg" />
        </div>
        
        <h2 className="text-xl font-bold text-gray-800 mb-6">Let's set up your Home</h2>
        
        <div className="space-y-4">
          <div>
            <Label className="text-gray-600">Location Name *</Label>
            <Input 
              placeholder="La mia abitazione"
              value={formData.locationName}
              onChange={(e) => setFormData(prev => ({ ...prev, locationName: e.target.value }))}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label className="text-gray-600">Location Address</Label>
            <Input 
              placeholder="Location Address"
              value={formData.locationAddress}
              onChange={(e) => setFormData(prev => ({ ...prev, locationAddress: e.target.value }))}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label className="text-gray-600">Square Meters</Label>
            <div className="relative">
              <Input 
                placeholder="Square Meters"
                value={formData.squareMeters}
                onChange={(e) => setFormData(prev => ({ ...prev, squareMeters: e.target.value }))}
                className="mt-1 pr-12"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">m²</span>
            </div>
          </div>
          
          <div>
            <Label className="text-gray-600">Number of Residents</Label>
            <Input 
              placeholder="Number of Residents"
              value={formData.numberOfResidents}
              onChange={(e) => setFormData(prev => ({ ...prev, numberOfResidents: e.target.value }))}
              className="mt-1"
            />
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <Button onClick={handleNext} className="w-full bg-primary hover:bg-primary/90 text-white h-12 rounded-lg">
          Next <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );

  const renderAppliances = () => (
    <div className="flex flex-col h-full">
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
    <div className="flex flex-col h-full">
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
    <div className="flex flex-col h-full">
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
    <div className="flex flex-col h-full">
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
        <Button onClick={handleNext} className="w-full bg-primary hover:bg-primary/90 text-white h-12 rounded-lg">
          Next <ArrowRight className="ml-2 h-4 w-4" />
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
    <div className="min-h-screen bg-white">
      {currentStep === "device" && renderDeviceSetup()}
      {currentStep === "qr-scan" && renderQRScan()}
      {currentStep === "wifi-list" && renderWiFiList()}
      {currentStep === "wifi-password" && renderWiFiPassword()}
      {currentStep === "wifi-connect" && renderWiFiConnect()}
      {currentStep === "device-naming" && renderDeviceNaming()}
      {currentStep === "home" && renderHomeSetup()}
      {currentStep === "appliances" && renderAppliances()}
      {currentStep === "tariff-type" && renderTariffType()}
      {currentStep === "tariff-details" && renderTariffDetails()}
      {currentStep === "tariff-variable" && renderTariffVariable()}
      {currentStep === "bill-upload" && renderBillUpload()}
    </div>
  );
}