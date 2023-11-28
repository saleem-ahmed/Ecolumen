import { Grid, Typography, Stack, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../../assets/logo.svg";
import TextField from "@mui/material/TextField";
import Img1 from "../../../assets/super-img1.png";
import { useFormik } from "formik";
import { loginSchema } from "../../../components/Validations/validation.js";
const Signin = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: loginSchema,
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async () => {
      navigate("/dashboard");
    },
  });
  return (
    <>
      <Grid container spacing={0} height={"100%"}>
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
                error={formik.errors.email}
                helperText={
                  <Typography sx={{ fontSize: 10, color: "red" }}>
                    {formik.errors.email}
                  </Typography>
                }
                {...{
                  formik,
                  checkValidation: true,
                }}
                onChange={(e) => {
                  formik.setFieldValue("email", e.target.value);
                }}
              />
              <TextField
                label="Password"
                type="password"
                error={formik.errors.password}
                helperText={
                  <Typography sx={{ fontSize: 10, color: "red" }}>
                    {formik.errors.password}
                  </Typography>
                }
                {...{
                  formik,
                  checkValidation: true,
                }}
                onChange={(e) => {
                  formik.setFieldValue("password", e.target.value);
                }}
                fullWidth
              />
              <Link to="/Sforget">
                <Typography variant="span" sx={{ textAlign: "end" }}>
                  Forget Password
                </Typography>
              </Link>
              <Button
                color="success"
                variant="contained"
                onClick={() => {
                  formik.handleSubmit();
                }}
                sx={{ marginTop: "20px", width: "100%" }}
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"flex-start"}
        >
          <img
            src={Img1}
            alt=""
            height={"auto"}
            width={"90%"}
            style={{ margin: "0 auto" }}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Signin;
