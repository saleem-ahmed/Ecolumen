/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import { useFormik } from "formik";
import { Grid, Box, Typography, Stack, TextField, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../../assets/logo.svg";
import { ForgetSchema } from "../../../components/Validations/validation.js";
import LoginBg from "../../../assets/dashboard/loginbg.png";
import OrgServices from "../../../apis/Organisation.js";
import Loader from "../../../components/loader";
import Alerts from "../../../components/Customalerts";
const OrgForget = () => {
  const navigate = useNavigate();
  const [activeField, setActiveField] = useState(null);
  const handleFieldFocus = (fieldName) => {
    setActiveField(fieldName);
  };
  const [loader, setLoader] = useState(false);
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

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: ForgetSchema,
    initialValues: {
      email: "",
    },
    onSubmit: async () => {
      const data = {
        email: formik.values.email,
      }
      setLoader(true)
      console.log(data)
      await OrgServices.forgetPass(data).then((res) => {
        console.log(res);
        setLoader(false)
        handleSnackbarOpen(res.message);
        navigate("/orgVerify" , { state: res } );
      }).catch((err) => {
        console.log(err);
        setLoader(false)
        handleSnackbarOpen(err.data.message, "error");
      });



    },
  });

  return (
    <Grid
      container
      sx={{ overflow: "hidden", position: "relative", height: "100vh" }}
    >
      <Loader loaderValue={loader} />
      <Alerts
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        handleClose={handleSnackbarClose}
      />
      <Box
        sx={{
          position: "absolute",
          top: "10px",
          left: "10px",
          bgcolor: "#ffffff",
          borderRadius: "50%",
          p: "5px",
          width: "30px",
          height: "30px"
        }}
      >
        <Link to="/orgLogin">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
          >
            <path
              d="M15.0001 0L15.0004 0.0043945C19.1444 0.0043945 22.8946 1.68212 25.6065 4.39401C28.3184 7.1059 29.9961 10.8556 29.9961 14.9996H30.0005V15.0001H29.9961C29.9961 19.1446 28.3181 22.8943 25.6065 25.6062C22.8943 28.3179 19.1449 29.9956 15.0006 29.9956V30H15.0001V29.9956C10.8559 29.9956 7.1059 28.3179 4.39401 25.606C1.68212 22.8941 0.0043945 19.1446 0.0043945 15.0004H0V14.9999H0.0043945C0.0043945 10.8556 1.68212 7.1059 4.39401 4.39376C7.1059 1.68212 10.8556 0.0043945 14.9999 0.0043945L15.0001 0ZM17.505 10.371C17.9708 9.89201 17.9598 9.12566 17.4811 8.65984C17.0018 8.19378 16.2355 8.20452 15.7696 8.68352L10.4381 14.1815L11.3056 15.0253L10.4345 14.1805C9.96794 14.6617 9.97966 15.43 10.4609 15.8966C10.475 15.9103 10.4892 15.9232 10.5036 15.9362L15.7699 21.3211C16.2357 21.8001 17.0021 21.8109 17.4813 21.3448C17.9601 20.879 17.971 20.1126 17.5052 19.6334L12.9948 15.0216L17.505 10.371Z"
              fill="#284259"
            />
          </svg>
        </Link>
      </Box>
      <Grid item md={12} xs={12}>
        <Box
          sx={{
            bgcolor: "#284259",
            height: "70vh"
          }}
        >
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
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "#fff"
        }}
      >
        <Stack
          direction="column"
          alignItems="center"
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
            Forgot Your Password
          </Typography>

          <Stack direction="column" spacing={2} width={"100%"}>
            <TextField
              label="Email Address"
              fullWidth
              // error={formik.errors.email && activeField === "email"}
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

            <Button
              color="success"
              type="submit"
              variant="contained"
              onClick={() => {
                formik.handleSubmit();
              }}
              sx={{ marginTop: "20px", width: "100%" }}
            >
              Send
            </Button>

          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default OrgForget;
