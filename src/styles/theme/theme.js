import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: ["Poppins, sans-serif", "Inter, sans-serif"].join(","),
    h1: {
      fontFamily: "Poppins, sans-serif",
      color: "#26BC39",
      fontSize: "48px",
      fontStyle: "normal",
      fontWeight: 300,
      lineHeight: "normal",
    },
    h2: {
      fontFamily: "Poppins, sans-serif",
      color: "#525252",
      fontSize: "28px",
      fontStyle: "normal",
      fontWeight: "600",
      lineHeight: "normal",
    },
    h3: {
      fontFamily: "Poppins, sans-serif",
      color: "#505050",
      fontSize: "14px",
      fontStyle: "normal",
      fontWeight: "500",
      lineHeight: "normal",
    },
    span: {
      fontFamily: "Poppins, sans-serif",
      color: "#A1A1A1",
      fontSize: "12px",
      fontStyle: "normal",
      fontWeight: "300",
      lineHeight: "normal",
    },
    subtitle1: {
      fontFamily: "Poppins, sans-serif",
      color: "#A1A1A1",
      fontSize: "14px",
      fontStyle: "normal",
      fontWeight: "400",
      lineHeight: "normal",
    },
    heading: {
      fontFamily: "Poppins, sans-serif",
      color: "#505050",
      fontSize: "14px",
      fontStyle: "normal",
      fontWeight: 500,
      lineHeight: "16.8px",
    },
    a: {
      fontFamily: "Poppins, sans-serif",
      cursur: "pointer",
    },
    caption: {
      fontFamily: "Poppins, sans-serif",
      color: "#FFF",
      fontSize: "16px",
      fontStyle: "normal",
      fontWeight: "500",
      lineHeight: "normal",
    },
    paragraph: {
      fontFamily: "Poppins, sans-serif",
      color: "#A7ABC3",
      fontSize: "11px",
      fontStyle: "normal",
      fontWeight: 400,
      lineHeight: "16.5px",
    },
    sideBarLink: {
      color: "#FFF",
      fontFamily: "Poppins, sans-serif",
      fontSize: "16px",
      fontStyle: "normal",
      fontWeight: 500,
      lineHeight: "normal",
    },
  },
  palette: {
    success: {
      main: "#284259",
      contrastText: "#fff",
    },
  },

  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          ".MuiInputBase-root": {
            height: "40px",
          },

          ".MuiFormLabel-root": {
            top: "-5px",
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#ffffff",
          color: "#444444",
        },
      },
      // Your custom styles for MuiAppBar-root
      // For example, changing the background color to blue:
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          ".MuiSelect-select": {
            height: "unset",
            minHeight: "unset",
            padding: "10px 10px",
          },
          ".MuiFormLabel-root": {
            top: "-15px",
          },
        },
      },
    },

    MuiStepper: {
      styleOverrides: {
        root: {
          ".MuiStepIcon-root": {
            color: "#FFF",
            height: "16px",
            width: "16px",
          },
          ".MuiStepLabel-root": {
            padding: "5px 0px",
          },
          ".MuiStepConnector-root": {
            marginLeft: "7px",
          },
          ".MuiStepConnector-line": {
            borderColor: "#fff",
            borderWidth: "2px",
          },
          ".MuiStepIcon-root.Mui-active": {
            color: "#E58206",
          },
          ".MuiStepIcon-root.Mui-completed": {
            color: "#FFF",
            backgroundColor: "#FFF",
            borderRadius: "50%",
          },
        },
      },
    },
  },
});

export default theme;
