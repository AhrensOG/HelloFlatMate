import { Chart } from "chart.js/auto";
import { useState } from "react";
import { Pie } from "react-chartjs-2";

export default function PieGraphic() {
  const [data, setData] = useState({
    labels: ["Ocupado", "Disponible"],
    datasets: [
      {
        data: [80, 20],
        backgroundColor: ["rgba(14, 24, 99, 1)", "rgba(33, 171, 204, 1)"],
        hoverBackgroundColor: [
          "rgba(14, 24, 99, 0.8)",
          "rgba(33, 171, 204, 0.8)",
        ],
      },
    ],
  });

  const options = {
    plugins: {
      datalabels: {
        display: false, // Desactiva las etiquetas de datos
      },
      legend: {
        display: false,
        position: "bottom",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
    },
    interaction: {
      mode: null,
    },
    events: [],
  };

  return (
    <div>
      <Pie data={data} options={options} />
    </div>
  );
}
