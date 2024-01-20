import { useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import required modules
import { Autoplay, Pagination } from "swiper/modules";
import {
  Grid,
  Typography,
  Stack,
  Button,
  Box,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../../assets/logo.svg";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import { loginSchema } from "../../../components/Validations/validation.js";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
// image
import SliderImg1 from "../../../assets/usersigin-img1.png";
import SliderImg2 from "../../../assets/usersigin-img2.png";
import SliderImg3 from "../../../assets/usersigin-img3.png";
import SliderImg4 from "../../../assets/usersigin-img4.png";
const SignIn = () => {
  const navigate = useNavigate();
  const [activeField, setActiveField] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: loginSchema,
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async () => {
      alert("hello");
      navigate("/UVerification");
    },
  });
  const handleFieldFocus = (fieldName) => {
    setActiveField(fieldName);
  };

  const handleFieldBlur = () => {
    setActiveField(null);
  };

  return (
    <Grid container height={"100vh"}>
      <Grid
        item
        xs={12}
        md={6}
        p={"10px"}
        display={"flex"}
        alignItems="center"
        justifyContent="center"
      >
        <Stack
          direction="column"
          alignItems="center"
          justifyContent="center"
          gap={"20px"}
          sx={{ maxWidth: "385px", width: "100%" }}
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
            Welcome to Eco Lumen
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
              {...{
                formik,
                checkValidation: true,
              }}
              onChange={(e) => {
                formik.setFieldValue("email", e.target.value);
              }}
              onBlur={handleFieldBlur}
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
              {...{
                formik,
                checkValidation: true,
              }}
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

            <Link
              to="/UForget"
              style={{
                width: "100%",
                textDecoration: "none",
                textAlign: "end",
              }}
            >
              <Typography variant="span" sx={{}}>
                Forgot Password
              </Typography>
            </Link>
            <Button
              color="success"
              type="submit"
              variant="contained"
              onClick={() => {
                formik.handleSubmit();
              }}
              sx={{ marginTop: "20px", width: "100%" }}
            >
              Log in
            </Button>
            <Typography variant="subtitle1" component="p">
              Are you an{" "}
              <Link
                to="/orglogin"
                style={{
                  textDecoration: "none",
                  color: "#284259",
                  fontWeight: 500,
                }}
              >
                Organization?
              </Link>
            </Typography>
          </Stack>
        </Stack>
      </Grid>
      <Grid item xs={12} sm={6} height={"100%"}>
        <Swiper
          pagination={true}
          autoplay={true}
          loop={true}
          modules={[Pagination , Autoplay]}
          className="mySwiper"
          style={{ height: "100%" }}
        >
          <SwiperSlide>
            <Box sx={{ background: "#000000", height: "100%" }}>
              <img
                src={SliderImg1}
                alt=""
                style={{ width: "100%", objectFit: "contain" }}
              />
            </Box>
          </SwiperSlide>
          <SwiperSlide>
            <Box sx={{ background: "red", height: "100%" }}>
              <img
                src={SliderImg2}
                alt=""
                style={{ width: "100%", objectFit: "contain" }}
              />
            </Box>
          </SwiperSlide>
          <SwiperSlide>
            <Box sx={{ background: "yellow", height: "100%" }}>
              <img
                src={SliderImg3}
                alt=""
                style={{ width: "100%", objectFit: "contain" }}
              />
            </Box>
          </SwiperSlide>
          <SwiperSlide>
            <Box sx={{ background: "yellow", height: "100%" }}>
              <img
                src={SliderImg4}
                alt=""
                style={{ width: "100%", objectFit: "contain" }}
              />
            </Box>
          </SwiperSlide>
        </Swiper>
      </Grid>
    </Grid>
  );
};

export default SignIn;
