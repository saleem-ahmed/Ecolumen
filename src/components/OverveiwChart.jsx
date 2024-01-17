/* eslint-disable react/prop-types */
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
import { Box } from "@mui/material";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const OverveiwChart = ({ labels, values }) => {
  // Define the dataset and options inside the component
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Booked",
        data: values[0].a,
        backgroundColor: "#AA66CC",
        barThickness: 10,
      },
      {
        label: "Canceled",
        data: values[0].b,
        backgroundColor: "#33B5E5",
        barThickness: 10,
      },
      {
        label: "Canceled",
        data: values[0].c,
        backgroundColor: "#FFBB33",
        barThickness: 10,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Bar data={data} options={options} />
    </Box>
  );
};

export default OverveiwChart;
