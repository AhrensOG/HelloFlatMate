import React from "react";
import { Line } from "react-chartjs-2";
import { Chart } from "chart.js/auto";

export default function LineGraphic() {
  const data = {
    labels: ["Ene", "Feb", "Mar", "Jun"],
    datasets: [
      {
        data: [20, 40, 10, 80],
        borderColor: "rgba(14, 24, 99, 1)",
        tension: 0.4,
      },
      {
        data: [10, 70, 40, 50],
        borderColor: "rgba(237, 24, 255, 1)",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
      datalabels: {
        display: false, // Desactiva las etiquetas de datos
      },
    },
    scales: {
      y: {
        min: 0,
        max: 100,
        grid: {
          display: false,
        },
        ticks: {
          beginAtZero: true,
          display: false, // Oculta los valores numéricos en el eje y
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return <Line data={data} options={options} />;
}
