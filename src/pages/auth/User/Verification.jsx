import { Grid, Typography, Stack, Button } from "@mui/material";

import Logo from "../../../assets/logo.svg";
import TextField from "@mui/material/TextField";


const Verification = () => {
  return (
    <>
      <Grid container spacing={0} height={"100%"}>
        <Grid
          item
          xs={12}
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
            sx={{ maxWidth: "500px", width: "100%" }}
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
              Verify your email address
            </Typography>

            <Typography variant="subtitle1" sx={{ textAlign: "center" }}>
              The verification code has been sent to your
              hussainkalim@gmail.com. Enter the code to verify your email
            </Typography>
            <Stack direction="column" spacing={2} width={"100%"}>
              <TextField label="Email Address" required fullWidth/>
              <Button
                color="success"
                variant="contained"
                sx={{ marginTop: "20px", width: "100%" }}
              >
                Verify
              </Button>
              <Typography variant="subtitle1" textAlign={"center"}>
                You will receive the code in
                <Typography variant="a" sx={{ px: "5px" , fontWeight: "400px" , color: "#121111" }}>1:58</Typography>
                Seconds
              </Typography>
              <Typography variant="subtitle1" textAlign={"center"}>
                Didn’t received the code. <Typography variant="a" sx={{ px: "5px" , fontWeight: "400px" , color: "#284259" }}>Resend</Typography>
              </Typography>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default Verification;
