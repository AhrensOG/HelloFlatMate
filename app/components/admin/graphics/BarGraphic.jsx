import { Chart, registerables } from "chart.js";
import { Bar } from "react-chartjs-2";
import { useEffect, useRef } from "react";

Chart.register(...registerables);

export default function BarGraphic() {
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = chartRef.current;
    if (chart) {
      const ctx = chart.ctx;
      const gradient = ctx.createLinearGradient(0, 0, 0, chart.height);
      gradient.addColorStop(0, "#ED18FF");
      gradient.addColorStop(1, "rgba(255, 24, 24, 0.28)");

      chart.data.datasets[0].backgroundColor = gradient;
      chart.update();
    }
  }, []);

  const data = {
    labels: [
      "Ene",
      "Feb",
      "Mar",
      "Abr",
      "May",
      "Jun",
      "Jul",
      "Ago",
      "Sep",
      "Oct",
      "Nov",
      "Dic",
    ],
    datasets: [
      {
        label: "Estado",
        data: [200, 150, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120], // Valores para cada barra
        borderRadius: 10, // Radio del borde redondeado
        barThickness: 8, // Ancho específico para cada barra (en píxeles)
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        min: 0,
        max: 200,
        ticks: {
          beginAtZero: true,
          display: false, // Oculta los valores numéricos en el eje y
        },
        grid: {
          display: false, // Oculta las líneas de la cuadrícula en el eje y
        },
      },
      x: {
        grid: {
          display: false, // Oculta las líneas de la cuadrícula en el eje x
        },
        // Ajustes para el espaciado entre las barras
        // Ajustar el porcentaje de la categoría y la barra
        // Esto se puede ajustar según el espaciado deseado
        categoryPercentage: 0.8, // Controla el ancho de las categorías
        barPercentage: 0.6, // Controla el ancho de las barras dentro de cada categoría
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        display: false, // Desactiva las etiquetas de datos
      },
      tooltip: {
        enabled: true, // Activa los tooltips para mostrar los valores al posicionarse sobre las barras
      },
    },
  };

  return <Bar data={data} options={options} ref={chartRef} />;
}
