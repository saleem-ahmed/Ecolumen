import { Grid, Stack, Typography, Button, Box, Container } from "@mui/material";
import Logo from "../../../assets/logo.svg";
import TextField from "@mui/material/TextField";
import Img1 from "../../../assets/userforget.png";
// import { Link } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";

import { useFormik } from "formik";

import { ForgetSchema } from "../../../components/Validations/validation.js";
const Forget = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: ForgetSchema,
    initialValues: {
      email: "",
    },
    onSubmit: async () => {
      alert("The Email has been Send to your Email Address");
      // history.push("/UVerify");
      navigate("/UVerify");

    },
  });
  return (
    <>
      <Box
        sx={{
          px: {
            md: "100px",
            xs: "50px",
          },
        }}
      >
        <Container maxWidth="lg">
          <Grid
            container
            sx={{
              height: "100vh",
            }}
          >
            <Grid item xs={12} md={6}>
              <Stack
                direction="column"
                alignItems="start"
                justifyContent="center"
                spacing={3}
                sx={{ width: "100%", height: "100%" }}
                onSubmit={formik.handleSubmit}
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

                <Stack
                  direction="column"
                  sx={{ maxWidth: "385px", width: "100%" }}
                >
                  <Typography variant="subtitle1" sx={{ margin: "30px 0px" }}>
                    Please enter the email address you would like to receive
                    verification code
                  </Typography>
                  <TextField
                    label="Email Address"
                    fullWidth
                    error={formik.errors.email}
                    helperText={
                      <Typography sx={{ fontSize: 10, color: "red" }}>
                        {formik.errors.email}
                      </Typography>
                    }
                    
                    onChange={(e) => {
                      formik.setFieldValue("email", e.target.value);
                    }}
                    style={{ height: "40px" }}
                  />
                  <Button
                    color="success"
                    variant="contained"
                    type="submit"
                    onClick={() => {
                      formik.handleSubmit();
                    }}
                    sx={{ marginTop: "20px", width: "100%" }}
                  >
                    Send
                  </Button>
                  <Link
                    to="/"
                    style={{ textDecoration: "none", marginTop: "20px" }}
                  >
                    <Typography variant="subtitle1">Back to sign in</Typography>
                  </Link>
                </Stack>
              </Stack>
            </Grid>
            <Grid
              item
              xs={12}
              md={5}
              sx={{ height: "100%" }}
              display={"flex"}
              alignItems={"center"}
              height={"auto"}
            >
              <img
                src={Img1}
                alt=""
                style={{ width: "100%", height: "auto" }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Forget;
