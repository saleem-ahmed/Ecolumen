import {
  Box,
  Grid,
} from "@mui/material";
import Cesium from "../../../components/Map/cesium";


const CesiumMap = () => {

  return (
    <>
      <Grid>
        {/* map section */}
        <Box bgcolor={"#ffffff"} sx={{ borderRadius: "12px" }}>
          <Box sx={{ width: "98%" }}>
            <Cesium />
          </Box>
        </Box>
      </Grid>
    </>
  );
};

export default CesiumMap;
