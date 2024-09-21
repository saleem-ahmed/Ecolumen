import { useEffect, useState, useContext } from "react";
import {
  Box,
  Grid,
  Typography,
  Divider,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import { AuthContext } from "../../../Auth";
import Map from "../../../components/Map/map";

const EditOptions = ["Refresh"];

const Mainpage2 = () => {
  const { staff } = useContext(AuthContext);
  console.log(staff, "staff from backend");

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
          gap={"20px"}
          width={"100%"}
        >
          <Typography variant="h2">{staff.name} Dashboard</Typography>
        </Box>

        {/* map section */}
        <Box bgcolor={"#ffffff"} height={"70vh"} p={"10px"} sx={{ borderRadius: "12px" , overflow: "hidden" }}>
            <Map />
        </Box>
      </Grid>
    </>
  );
};

export default Mainpage2;
