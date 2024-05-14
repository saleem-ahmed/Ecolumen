/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import { useFormik } from "formik";
import {
  Grid,
  Box,
  Typography,
  InputAdornment,
  IconButton,
  Stack,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { Link } from "react-router-dom";
import Logo from "../../../assets/logo.svg";
import { loginSchema } from "../../../components/Validations/validation.js";
import { useAuth } from "../../../Auth/index";
import LoginBg from "../../../assets/dashboard/loginbg.png";
import Loader from "../../../components/loader.jsx";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
const login = () => {
  // const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const [activeField, setActiveField] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleFieldFocus = (fieldName) => {
    setActiveField(fieldName);
  };

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: loginSchema,
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async () => {
      await login(formik.values.email, formik.values.password);
    },
  });

  return (
    <Grid container height={"100vh"} sx={{ overflow: "hidden" }}>
      <Grid item md={12} xs={12}>
        <Box bgcolor={"#284259"} height={"70vh"}>
          <img
            src={LoginBg}
            alt=""
            style={{ width: "100%", height: "100%", objectFit: "fill" }}
          />
        </Box>
      </Grid>
      <Grid
        item
        md={12}
        xs={12}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        bgcolor={"#FFF"}
      >
        <Stack
          direction="column"
          alignItems="center"
          justifyContent="center"
          gap={"20px"}
          px={{ md: "30px", xs: "10px" }}
          py={{ md: "30px", xs: "10px" }}
          sx={{
            maxWidth: "385px",
            width: "90%",
            mx: "auto",
            transform: "translateY(-70%)",
            borderRadius: "20px",
            background: "#FFF",
            boxShadow:
              "5px 4px 32px 0px rgba(0, 0, 0, 0.25), -9px -2px 19px 0px rgba(0, 0, 0, 0.25)",
          }}
        >
          <img width={102} height={108} src={Logo} alt="" />

          <Typography
            variant="h2"
            sx={{
              fontSize: {
                xs: 18,
                sm: 20,
                md: 25,
                lg: 27,
                xl: 28,
              },
            }}
          >
            Welcome to Back!
          </Typography>
          <Stack direction="column" spacing={2} width={"100%"}>
            <TextField
              label="Email Address"
              fullWidth
              error={formik.errors.email && activeField === "email"}
              helperText={
                activeField === "email" ? (
                  <Typography sx={{ fontSize: 10, color: "red" }}>
                    {formik.errors.email}
                  </Typography>
                ) : null
              }
              
              onChange={(e) => {
                formik.setFieldValue("email", e.target.value);
              }}
              onFocus={() => handleFieldFocus("email")}
            />

            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              error={formik.errors.password && activeField === "password"}
              helperText={
                activeField === "password" ? (
                  <Typography sx={{ fontSize: 10, color: "red" }}>
                    {formik.errors.password}
                  </Typography>
                ) : null
              }
              // {...{
              //   formik,
              //   checkvalidation: true,
              // }}
              onChange={(e) => {
                formik.setFieldValue("password", e.target.value);
              }}
              fullWidth
              onFocus={() => handleFieldFocus("password")}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Box display={"flex"} justifyContent={"center"} my={2}>
              <FormControlLabel
                required
                control={<Checkbox color="success" size="small" />}
                label={<span style={{ fontSize: "smaller" }}>Remember me</span>}
                sx={{ width: "100%" }}
              />
              <Link
                to="/orgForget"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "end",
                  width: "100%",
                  textAlign: "end",
                  textDecoration: "none",
                }}
              >
                <Typography variant="span">Forgot Password</Typography>
              </Link>
            </Box>
            <Button
              color="success"
              type="submit"
              variant="contained"
              onClick={() => {
                formik.handleSubmit();
              }}
              sx={{ marginTop: "20px", width: "100%" }}
            >
              Login
            </Button>
            <Typography variant="subtitle1">
              If you don{"'"}t have an account{" "}
              <Link
                to="/orgRegister"
                style={{
                  textDecoration: "none",
                  color: "#284259",
                  fontWeight: "500",
                }}
              >
                Register
              </Link>
            </Typography>
          </Stack>
        </Stack>
      </Grid>
      <Loader loaderValue={loading} />
    </Grid>
  );
};

export default login;
