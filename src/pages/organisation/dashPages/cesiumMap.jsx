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
  ButtonGroup
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
        <Box bgcolor={"#ffffff"}  sx={{ borderRadius: "12px" }}>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            padding={'5px'}
          >
          <Box >
          {/* <h3 variant="h3">Map</h3> */}
          <ButtonGroup variant="contained" aria-label="Basic button group">
              <Button variant="contained" sx={{background: "white", color: 'black' }}  href="main">
                      2D
              </Button>
              <Button variant="contained"  href="#">
                      3D
              </Button>
            </ButtonGroup>
          </Box>
            <div>
              <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? "long-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                onClick={handleClick}
              >
                <MoreHorizIcon color="#FFFFFF" />
              </IconButton>
              <Menu
                id="long-menu"
                MenuListProps={{
                  "aria-labelledby": "long-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                  style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    width: "20ch",
                  },
                }}
              >
                {EditOptions.map((option) => (
                  <MenuItem
                    key={option}
                    selected={option === "Pyxis"}
                    onClick={handleClose}
                  >
                    {option}
                  </MenuItem>
                ))}
              </Menu>
            </div>
          </Box>
          <Divider />
          <Box sx={{ width: "98%" }} >
          <Cesium />
          </Box>
          {/* <Box sx={{ height: "70vh" }}>
            <div id="map" style={{ width: "100%", height: "100%" }}></div>
          </Box> */}
        </Box>
      </Grid>
    </>
  );
};

export default CesiumMap;