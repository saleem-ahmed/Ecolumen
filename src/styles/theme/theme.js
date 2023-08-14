import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    h1: {
      color: "#26BC39",
    },
    h2: {
      color: "#26BC39",
    },
    h3: {
      color: "#26BC39",
    },
  },
  palette: {
    success:{
        main:"#26BC39",
        contrastText: "#ffffff"
    }
  },
});

export default theme;
