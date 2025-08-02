import { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

interface LiveChartProps {
  data: number[];
  maxDataPoints?: number;
}

export default function LiveChart({ data, maxDataPoints = 20 }: LiveChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    const labels = Array(maxDataPoints).fill('').map((_, i) => i);

    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [{
          data: data.slice(-maxDataPoints),
          borderColor: "hsl(var(--primary))",
          backgroundColor: "hsla(var(--primary), 0.1)",
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 4,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 0
        },
        scales: {
          y: { 
            display: false,
            beginAtZero: true,
          },
          x: { 
            display: false 
          }
        },
        plugins: { 
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (context) => `${context.parsed.y.toFixed(1)} W`
            }
          }
        },
        elements: {
          line: {
            borderJoinStyle: 'round'
          }
        }
      }
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data, maxDataPoints]);

  // Update chart data when data changes
  useEffect(() => {
    if (chartInstance.current && data.length > 0) {
      chartInstance.current.data.datasets[0].data = data.slice(-maxDataPoints);
      chartInstance.current.update('none');
    }
  }, [data, maxDataPoints]);

  return <canvas ref={chartRef} className="w-full h-full" />;
}
