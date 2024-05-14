import { Grid, Stack, Typography, Box, Container } from "@mui/material";
import Logo from "../assets/logo.svg";
import LoginBg from "../assets/dashboard/loginbg.png";
import { Link } from "react-router-dom";
const Confirmation = () => {

  return (
    <>
     
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
                textAlign: "center",
                fontSize: {
                  xs: 18,
                  sm: 20,
                  md: 25,
                  lg: 27,
                  xl: 28,
                },
              }}
            >
              Your Email Has been Verified!!!
            </Typography>
            <Box display={"flex"} justifyContent={"space-between"}>
              <Link to="/orglogin" style={{ textDecoration: "none" }}>
                <Typography variant="subtitle1">
                  Back to Sign in
                </Typography>
              </Link>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};
export default Confirmation;
