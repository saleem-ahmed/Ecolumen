import { useEffect, useState, useRef } from "react";
import {
  Box,
  Grid,
  Typography,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Button,
  ButtonGroup,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Cesium from "../../../components/Map/cesium";

const EditOptions = ["Refresh"];
// Sample GeoJSON data for forests and water bodies

const CesiumMap = () => {
  const mapRef = useRef(null);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const ITEM_HEIGHT = 48;

  return (
    <>
      <Grid>
        <Box
          display={"flex"}
          flexDirection={"column"}
          // gap={"20px"}
          width={"100%"}
        >
          {/* <Typography variant="h2">Staff Dashboard</Typography> */}
        </Box>

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
