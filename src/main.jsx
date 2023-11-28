import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ThemeProvider } from "@mui/material";
import theme from "./styles/theme/theme.js";
import "./styles/index.scss";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./Auth/index.jsx";
// import Store from "./redux/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </AuthProvider>
  </BrowserRouter>
);
