/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import {
  useState,
  useEffect,
  useContext,
  createContext,
  forwardRef,
} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../components/loader";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);


const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  // console.log(user, token , "dslkdnnlksnd")
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const login = async (email, password) => {
    try {
      setLoading(true);
      const data = {
        email: email,
        password: password,
      };
      const response = await axios.post(
        `https://eco-lumen.onrender.com/api/organization/login`,
        data,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      setLoading(false);
      // console.log(response, "Ahmed This is local response");
      const authToken = response.data.token;
      localStorage.setItem("token", authToken);
      setToken(authToken);

      setUser(response.data.result);
      localStorage.setItem("user", JSON.stringify(response.data.result));
      setSnackbarMessage("Login successful!");
      setOpenSnackbar(true);
      navigate("/dashboard/main");

      return response;
    } catch (error) {
      setLoading(false);
      setSnackbarMessage("Login failed: " + error.message);
      setOpenSnackbar(true);
      throw error;
    }
  };

  const registerOrg = async (data) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `https://eco-lumen.onrender.com/api/organization/register`,
        data,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      setLoading(false);
      return response;
    } catch (error) {
      setLoading(false);
      console.log(error);
      throw error;
    }
  };

  const LogoutUser = () => {
    localStorage.removeItem("token");
    // setUser("");
    navigate("/");
  };
  const isAuthenticated = !!token;

  const value = {
    token,
    user,
    isAuthenticated,
    login,
    registerOrg,
    LogoutUser,
  };

  return (
    <AuthContext.Provider value={value}>
      <Loader loaderValue={loading} />
      <Snackbar
        open={openSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
      {children}
    </AuthContext.Provider>
  );
};
