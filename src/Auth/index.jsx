import React, { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../components/loader";
import Alerts from "../components/Customalerts";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [org, setOrg] = useState(null);
  const [staff, setStaff] = useState(null);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }

    const storedUser = JSON.parse(localStorage.getItem("user"));

    const storeStaff = JSON.parse(localStorage.getItem("staff"));

    if (storedUser) {
      setOrg(storedUser);
    } 
    if (storeStaff) {
      setStaff(storeStaff);
    } 

  }, []);

  const handleSnackbarOpen = (message, severity = "success") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleAuth = (token, userData) => {
    setToken(token);
    setOrg(userData);
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
  };
  const handleStaffAuth = (token, staffData) => {
    setToken(token);
    setStaff(staffData);
    localStorage.setItem("token", token);
    localStorage.setItem("staff", JSON.stringify(staffData));
  };

  // const URL = "http://vfktzsxm.up.railway.app/api";
  const URL = "https://eco-lumen.onrender.com/api";
  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await axios.post(`${URL}/organization/login`, {
        email,
        password,
      });
      setLoading(false);
      handleAuth(response.data.token, response.data.result);
      handleSnackbarOpen(response.data.message);
      navigate("/dashboard/main");
      console.log(response.data);
      return response.data, "api response in login api call";
    } catch (error) {
      setLoading(false);
      const errorMessage =
        (error.response && error.response.data.message) || error.message;
      handleSnackbarOpen(`Login failed: ${errorMessage}`, "error");
    } finally {
      setLoading(false);
    }
  };

  const staffLogin = async (email, password) => {
    setLoading(true);
    try {
      const response = await axios.post(`${URL}/organization/loginStaff`, {
        email,
        password,
      });
      console.log(response, " staff response");
      setLoading(false);
      handleStaffAuth(response.data.token, response.data.staff);
      handleSnackbarOpen(response.data.message);
      navigate("/staffDashboard/main");
      console.log(response.data);
      return response.data, "api response in login api call";
    } catch (error) {
      setLoading(false);
      const errorMessage =
        (error.response && error.response.data.message) || error.message;
      handleSnackbarOpen(`Login failed: ${errorMessage}`, "error");
    } finally {
      setLoading(false);
    }
  };

  const registerOrg = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(`${URL}/organization/register`, data);
      handleSnackbarOpen(response.data.msg);
      navigate("/orglogin");
      setLoading(false);
      return response.data;
    } catch (error) {
      const errorMessage =
        (error.response && error.response.data.message) || error.message;
      handleSnackbarOpen(`Registration failed: ${errorMessage}`, "error");
      setLoading(false);
      throw error;
    }
  };

  const LogoutOrg = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    handleSnackbarOpen("User has been logged out");
    navigate("/");
  };

  const isAuthenticated = !!token;

  const value = {
    token,
    org,
    staff,
    isAuthenticated,
    login,
    registerOrg,
    LogoutOrg,
    staffLogin,
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
