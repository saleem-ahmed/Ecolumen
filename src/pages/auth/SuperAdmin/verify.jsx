import { Grid, Stack, Typography, Button, Box, Container } from "@mui/material";
import Logo from "../../../assets/logo.svg";
import TextField from "@mui/material/TextField";
import Img1 from "../../../assets/verify-img.png";
import { useFormik } from "formik";
import { VerifySchema } from "../../../components/Validations/validation.js";
const Verify = () => {
  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: VerifySchema,
    initialValues: {
      code: "",
    },
    onSubmit: async () => {
      // alert("The Email has been Send to your Email Address");
      // history.push("/SVerify");
    },
  });
  return (
    <>
      <Box sx={{ px: "100px" }}>
        <Container maxWidth="lg">
          <Grid container sx={{ height: "100vh" }}>
            <Grid item xs={12} md={6}>
              <Stack
                direction="column"
                alignItems="start"
                justifyContent="center"
                spacing={3}
                sx={{ width: "100%", height: "100%" }}
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
                  spacing={2}
                  sx={{ maxWidth: "385px", width: "100%" }}
                  onSubmit={formik.handleSubmit}
                >
                  <Typography variant="subtitle1">
                    Please enter the code sent to you via email
                  </Typography>
                  <TextField
                    label="Code"
                    fullWidth
                    // type="number"
                    error={formik.errors.code}
                    helperText={
                      <Typography sx={{ fontSize: 10, color: "red" }}>
                        {formik.errors.code}
                      </Typography>
                    }
                    {...{
                      formik,
                      checkValidation: true,
                    }}
                    onChange={(e) => {
                      formik.setFieldValue("code", e.target.value);
                    }}
                    style={{ height: "40px" }}
                  />

                  <Button
                    color="success"
                    variant="contained"
                    type="submit"
                    sx={{ marginTop: "30px", width: "100%" }}
                    onClick={() => {
                      formik.handleSubmit();
                    }}
                  >
                    Confirm
                  </Button>
                  <Typography variant="subtitle1">
                    You will receive the code in
                    <Typography variant="a" sx={{ color: "#121111" }}>
                      {" "}
                      1:58{" "}
                    </Typography>
                    Seconds
                  </Typography>
                  <Typography variant="subtitle1">
                    Didn’t received the code.{" "}
                    <Typography variant="" sx={{ color: "#284259" }}>
                      {" "}
                      Resend
                    </Typography>
                  </Typography>
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
export default Verify;
