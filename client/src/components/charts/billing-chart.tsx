import { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

interface BillingChartProps {
  data: number[];
  labels: string[];
}

export default function BillingChart({ data, labels }: BillingChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels,
        datasets: [{
          data,
          backgroundColor: "hsl(var(--primary))",
          borderRadius: 4,
          borderWidth: 0,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: { 
            display: true,
            max: 100,
            beginAtZero: true,
            ticks: {
              callback: (value) => `${value}€`
            }
          },
          x: { 
            display: true, 
            grid: { display: false },
            border: { display: false },
          }
        },
        plugins: { 
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (context) => `€${context.parsed.y}`
            }
          }
        }
      }
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data, labels]);

  return <canvas ref={chartRef} className="w-full h-full" />;
}
