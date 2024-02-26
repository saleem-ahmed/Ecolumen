/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */

import {
  useState,
  useEffect,
  useContext,
  createContext,
  // forwardRef,
} from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../components/loader";
import Alerts from "../components/Customalerts";
const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);


export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleSnackbarOpen = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

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
      handleSnackbarOpen("Login successful!");
      navigate("/dashboard/main");
      return response;
    } catch (error) {
      setLoading(false);
      handleSnackbarOpen("Login failed: " + error.message);
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
      handleSnackbarOpen(response.message)
      return response;
    } catch (error) {
      setLoading(false);
      handleSnackbarOpen(error);
      throw error;
    }
  };

  const LogoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    handleSnackbarOpen("User has been Logout")
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
      <Alerts
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        handleClose={handleSnackbarClose}
      />
      {children}
    </AuthContext.Provider>
  );
};
