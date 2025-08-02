import { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

interface UsageChartProps {
  data: {
    kitchen: number;
    heating: number;
    lighting: number;
    other: number;
  };
}

export default function UsageChart({ data }: UsageChartProps) {
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
      type: "doughnut",
      data: {
        datasets: [{
          data: [data.kitchen, data.heating, data.lighting, data.other],
          backgroundColor: [
            "hsl(var(--chart-1))",
            "hsl(var(--chart-2))",
            "hsl(var(--chart-3))",
            "hsl(var(--chart-4))"
          ],
          borderWidth: 0,
        }]
      },
      options: {
        cutout: "70%",
        plugins: {
          legend: { display: false }
        },
        maintainAspectRatio: false,
        responsive: true,
      }
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]);

  return <canvas ref={chartRef} className="w-full h-full" />;
}
