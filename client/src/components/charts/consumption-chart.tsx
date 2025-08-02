import { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

interface ConsumptionChartProps {
  data: number[];
  labels: string[];
  highlightIndex?: number;
}

export default function ConsumptionChart({ data, labels, highlightIndex = 3 }: ConsumptionChartProps) {
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
          backgroundColor: data.map((_, index) => 
            index === highlightIndex ? "hsl(var(--primary))" : "hsl(var(--primary-light))"
          ),
          borderRadius: 8,
          borderWidth: 0,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: { 
            display: false,
            beginAtZero: true,
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
              label: (context) => `${context.parsed.y} kWh`
            }
          }
        },
        elements: {
          bar: {
            borderSkipped: false,
          }
        }
      }
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data, labels, highlightIndex]);

  return <canvas ref={chartRef} className="w-full h-full" />;
}
