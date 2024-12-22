import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ProgressGraph = () => {
  const data = {
    labels: ["Module 1", "Module 2", "Module 3", "Module 4", "Module 5"],
    datasets: [
      {
        label: "Progress (%)",
        data: [70, 50, 90, 30, 100], // Example progress data
        backgroundColor: [
          "rgba(54, 162, 235, 0.8)",
          "rgba(75, 192, 192, 0.8)",
          "rgba(153, 102, 255, 0.8)",
          "rgba(255, 159, 64, 0.8)",
          "rgba(255, 99, 132, 0.8)",
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(255, 99, 132, 1)",
        ],
        borderWidth: 2,
        hoverBackgroundColor: "rgba(255, 206, 86, 0.8)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          color: "#ffffff",
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.label}: ${context.raw}%`;
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#ffffff", // X-axis label color
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          color: "#ffffff", // Y-axis label color
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)", // Grid line color
        },
        beginAtZero: true,
        max: 100,
      },
    },
  };

  return (
    <div className="mt-8 p-4 bg-gradient-to-r from-blue-500 to-blue-900 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center text-white mb-6">
        Your Progress
      </h2>
      <div
        className="h-96"
        role="img"
        aria-label="Bar chart showing progress across 5 modules"
      >
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default ProgressGraph;
