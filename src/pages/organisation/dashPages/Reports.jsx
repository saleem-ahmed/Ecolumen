import React, { useState } from "react";
import { Bar, Line, Pie, Radar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  RadarController,
  DoughnutController,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {
  Grid,
  Box,
  Typography,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  RadarController,
  DoughnutController,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend
);

const landUseData = {
  2015: {
    labels: [
      "Forest Area",
      "Water Body",
      "Agriculture",
      "Urban",
      "Barren",
      "Grassland",
      "Wetlands",
      "Industrial",
      "Recreational",
      "Residential",
    ],
    datasets: [
      {
        label: "Land Use Categories",
        data: [10, 15, 4, 6, 3, 5, 8, 9, 7, 13],
      },
    ],
  },
  2016: {
    labels: [
      "Forest Area",
      "Water Body",
      "Agriculture",
      "Urban",
      "Barren",
      "Grassland",
      "Wetlands",
      "Industrial",
      "Recreational",
      "Residential",
    ],
    datasets: [
      {
        label: "Land Use Categories",
        data: [11, 16, 5, 7, 4, 6, 9, 10, 8, 14],
      },
    ],
  },
  2017: {
    labels: [
      "Forest Area",
      "Water Body",
      "Agriculture",
      "Urban",
      "Barren",
      "Grassland",
      "Wetlands",
      "Industrial",
      "Recreational",
      "Residential",
    ],
    datasets: [
      {
        label: "Land Use Categories",
        data: [12, 17, 6, 8, 5, 7, 10, 11, 9, 15],
      },
    ],
  },
  2018: {
    labels: [
      "Forest Area",
      "Water Body",
      "Agriculture",
      "Urban",
      "Barren",
      "Grassland",
      "Wetlands",
      "Industrial",
      "Recreational",
      "Residential",
    ],
    datasets: [
      {
        label: "Land Use Categories",
        data: [13, 18, 7, 9, 6, 8, 11, 12, 10, 16],
      },
    ],
  },
  2019: {
    labels: [
      "Forest Area",
      "Water Body",
      "Agriculture",
      "Urban",
      "Barren",
      "Grassland",
      "Wetlands",
      "Industrial",
      "Recreational",
      "Residential",
    ],
    datasets: [
      {
        label: "Land Use Categories",
        data: [14, 19, 8, 10, 7, 9, 12, 13, 11, 17],
      },
    ],
  },
  2020: {
    labels: [
      "Forest Area",
      "Water Body",
      "Agriculture",
      "Urban",
      "Barren",
      "Grassland",
      "Wetlands",
      "Industrial",
      "Recreational",
      "Residential",
    ],
    datasets: [
      {
        label: "Land Use Categories",
        data: [15, 20, 9, 11, 8, 10, 13, 14, 12, 18],
      },
    ],
  },
  2021: {
    labels: [
      "Forest Area",
      "Water Body",
      "Agriculture",
      "Urban",
      "Barren",
      "Grassland",
      "Wetlands",
      "Industrial",
      "Recreational",
      "Residential",
    ],
    datasets: [
      {
        label: "Land Use Categories",
        data: [16, 21, 10, 12, 9, 11, 14, 15, 13, 19],
      },
    ],
  },
  2022: {
    labels: [
      "Forest Area",
      "Water Body",
      "Agriculture",
      "Urban",
      "Barren",
      "Grassland",
      "Wetlands",
      "Industrial",
      "Recreational",
      "Residential",
    ],
    datasets: [
      {
        label: "Land Use Categories",
        data: [17, 22, 11, 13, 10, 12, 15, 16, 14, 20],
      },
    ],
  },
  2023: {
    labels: [
      "Forest Area",
      "Water Body",
      "Agriculture",
      "Urban",
      "Barren",
      "Grassland",
      "Wetlands",
      "Industrial",
      "Recreational",
      "Residential",
    ],
    datasets: [
      {
        label: "Land Use Categories",
        data: [18, 23, 12, 14, 11, 13, 16, 17, 15, 21],
      },
    ],
  },
  2024: {
    labels: [
      "Forest Area",
      "Water Body",
      "Agriculture",
      "Urban",
      "Barren",
      "Grassland",
      "Wetlands",
      "Industrial",
      "Recreational",
      "Residential",
    ],
    datasets: [
      {
        label: "Land Use Categories",
        data: [19, 24, 13, 15, 12, 14, 17, 18, 16, 22],
      },
    ],
  },
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
    },
  },
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Land Use Distribution",
    },
    tooltip: {
      callbacks: {
        label: function (context) {
          return `${context.dataset.label}: ${context.raw}`;
        },
      },
    },
  },
  animation: {
    duration: 2000,
  },
};

const OrgReport = () => {
  const [year, setYear] = useState("2020");
  const [chartType, setChartType] = useState("Bar");

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const handleChartTypeChange = (event) => {
    setChartType(event.target.value);
  };

  const data = {
    labels: landUseData[year].labels,
    datasets: [
      {
        ...landUseData[year].datasets[0],
        backgroundColor: [
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(54, 162, 235, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartTitle = `Land Use Distribution (${year})`;

  const generateTableData = () => {
    const years = Object.keys(landUseData);
    const labels = landUseData[years[0]].labels;

    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Year</TableCell>
              {labels.map((label) => (
                <TableCell key={label}>{label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {years.map((year) => (
              <TableRow key={year}>
                <TableCell>{year}</TableCell>
                {landUseData[year].datasets[0].data.map((value, index) => (
                  <TableCell key={index}>{value}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <>
      <Grid container>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            my: "20px",
            width: "100%",
          }}
        >
          <Typography variant="h2" sx={{ color: "#000", fontSize: "26px" }}>
            Report
          </Typography>
        </Box>

        <Box
          bgcolor={"#ffffff"}
          py={"30px"}
          px={"30px"}
          sx={{ borderRadius: "12px", position: "relative", width: "100%" }}
        >
          <Box sx={{ display: "flex", justifyContent: "end" }}>
            <Select
              value={year}
              onChange={handleYearChange}
              sx={{ mt: "20px", minWidth: "100px", mx: "10px" }}
            >
              {Object.keys(landUseData).map((yearOption) => (
                <MenuItem key={yearOption} value={yearOption}>
                  {yearOption}
                </MenuItem>
              ))}
            </Select>
            <Select
              value={chartType}
              onChange={handleChartTypeChange}
              sx={{ mt: "20px", minWidth: "100px", mx: "10px" }}
            >
              <MenuItem value="Bar">Bar</MenuItem>
              <MenuItem value="Line">Line</MenuItem>
              <MenuItem value="Pie">Pie</MenuItem>
              <MenuItem value="Radar">Radar</MenuItem>
              <MenuItem value="Doughnut">Doughnut</MenuItem>
            </Select>
          </Box>
          <Box sx={{ height: "50vh" }}>
            {chartType === "Bar" && (
              <Bar
                data={data}
                options={{
                  ...chartOptions,
                  plugins: {
                    ...chartOptions.plugins,
                    title: { display: true, text: chartTitle },
                  },
                }}
              />
            )}
            {chartType === "Line" && (
              <Line
                data={data}
                options={{
                  ...chartOptions,
                  plugins: {
                    ...chartOptions.plugins,
                    title: { display: true, text: chartTitle },
                  },
                }}
              />
            )}
            {chartType === "Pie" && (
              <Pie
                data={data}
                options={{
                  ...chartOptions,
                  plugins: {
                    ...chartOptions.plugins,
                    title: { display: true, text: chartTitle },
                  },
                }}
              />
            )}
            {chartType === "Radar" && (
              <Radar
                data={data}
                options={{
                  ...chartOptions,
                  plugins: {
                    ...chartOptions.plugins,
                    title: { display: true, text: chartTitle },
                  },
                }}
              />
            )}
            {chartType === "Doughnut" && (
              <Doughnut
                data={data}
                options={{
                  ...chartOptions,
                  plugins: {
                    ...chartOptions.plugins,
                    title: { display: true, text: chartTitle },
                  },
                }}
              />
            )}
          </Box>
        </Box>

        <Box sx={{ width: "100%", mt: "20px" }}>{generateTableData()}</Box>
      </Grid>
    </>
  );
};

export default OrgReport;
