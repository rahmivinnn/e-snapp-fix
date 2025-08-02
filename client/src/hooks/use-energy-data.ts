import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import type { EnergyData, BillingData } from "@shared/schema";

const userId = "demo-user-1"; // In a real app, this would come from auth context

export function useEnergyData() {
  const { data: latestData } = useQuery<EnergyData>({
    queryKey: ["/api/energy/latest", userId],
    refetchInterval: 5000, // Refetch every 5 seconds
  });

  const { data: energyHistory = [] } = useQuery<EnergyData[]>({
    queryKey: ["/api/energy/history", userId],
  });

  const { data: billingData } = useQuery<BillingData>({
    queryKey: ["/api/billing", userId],
  });

  return {
    latestData,
    energyHistory,
    billingData,
  };
}

export function useRealtimeData() {
  const [realtimeData, setRealtimeData] = useState<number[]>([]);
  const [currentPower, setCurrentPower] = useState(245);

  useEffect(() => {
    // Initialize with some data
    const initialData = Array(20).fill(0).map(() => Math.random() * 100 + 200);
    setRealtimeData(initialData);

    // Try to connect to WebSocket
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.host}`;
    
    try {
      const ws = new WebSocket(wsUrl);
      
      ws.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          if (message.type === 'energy-update') {
            const newPower = message.data.activePower;
            setCurrentPower(Math.round(newPower));
            
            setRealtimeData(prev => {
              const newData = [...prev];
              newData.shift();
              newData.push(newPower);
              return newData;
            });
          }
        } catch (error) {
          console.warn('Failed to parse WebSocket message:', error);
        }
      };

      ws.onerror = () => {
        console.warn('WebSocket connection failed, falling back to simulation');
        startSimulation();
      };

      return () => {
        ws.close();
      };
    } catch (error) {
      console.warn('WebSocket not available, using simulation');
      startSimulation();
    }

    function startSimulation() {
      const interval = setInterval(() => {
        const newPower = Math.random() * 100 + 200;
        setCurrentPower(Math.round(newPower));
        
        setRealtimeData(prev => {
          const newData = [...prev];
          newData.shift();
          newData.push(newPower);
          return newData;
        });
      }, 3000);

      return () => clearInterval(interval);
    }
  }, []);

  return {
    realtimeData,
    currentPower,
  };
}
