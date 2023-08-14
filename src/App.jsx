import { Button,Box, Typography } from "@mui/material";

function App() {
  return (
    <>
      <Box sx={{ textAlign: "center" , py: "20px"}}>
        <Typography variant="h3">
          Web GIS Project{" "}
        </Typography>
        <Button color="success" variant="contained" sx={{ marginTop: "20px" }}>
          Get Started
        </Button>
      </Box>
    </>
  );
}

export default App;
