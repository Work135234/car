import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart({ truckCount, trainCount }) {
  const data = {
    labels: ["Truck", "Train"],
    datasets: [
      {
        label: "Deliveries",
        data: [truckCount, trainCount],
        backgroundColor: [
          "#2563eb", // blue for truck
          "#a21caf"  // purple for train
        ],
        borderColor: [
          "#1e40af",
          "#701a75"
        ],
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const
      }
    }
  };

  return <Pie data={data} options={options} />;
}
