import { Doughnut } from "react-chartjs-2";
import { Box } from "@mui/material";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

const UserStatus = () => {
  const data = {
    label: "My First Dataset",
    datasets: [
      {
        label: "Booked",
        data: [40, 50, 10, 55], // These are your data points corresponding to each label
        backgroundColor: [
         "#FF4444", // red
         "#FFBB33", // yellow
         "#00C851", // green
         "#33B5E5"  // blue
        ],
        hoverOffset: 2,
        width: 200,
        height: 200,
      },
    ],
  };

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Doughnut data={data} />
    </Box>
  );
};

export default UserStatus;
