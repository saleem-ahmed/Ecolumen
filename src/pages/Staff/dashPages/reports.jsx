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
  Button,
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
  2010: {
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

const Report = () => {
  const [selectedYears, setSelectedYears] = useState(["2021"]);
  const [chartType, setChartType] = useState("Bar");

  const handleYearChange = (event) => {
    const { value } = event.target;
    setSelectedYears(typeof value === "string" ? value.split(",") : value);
  };

  const handleChartTypeChange = (event) => {
    setChartType(event.target.value);
  };

  const data = {
    labels: landUseData[selectedYears[0]].labels,
    datasets: selectedYears.map((year) => ({
      ...landUseData[year].datasets[0],
      label: `Land Use Categories ${year}`,
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
    })),
  };

  const chartTitle = `Land Use Distribution (${selectedYears.join(", ")})`;

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

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <style>
        {`
          @media print {
            body * {
              visibility: hidden;
            }
            .printable-content, .printable-content * {
              visibility: visible;
            }
            .printable-content {
              position: absolute;
              left: 0;
              top: 0;
            }
          }
        `}
      </style>
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
              multiple
              value={selectedYears}
              onChange={handleYearChange}
              renderValue={(selected) => selected.join(", ")}
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
            <Button
              variant="contained"
              onClick={handlePrint}
              sx={{ mt: "20px", minWidth: "100px", mx: "10px" }}
            >
              Print Report
            </Button>
          </Box>
          <Box className="printable-content" sx={{ height: "50vh" }}>
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

        <Box sx={{ width: "100%", mt: "20px" }} className="printable-content">
          {generateTableData()}
        </Box>
      </Grid>
    </>
  );
};

export default Report;
