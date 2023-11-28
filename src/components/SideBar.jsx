import { useState } from "react";
import Logo from "../../src/assets/logo.svg";
import {
  List,
  ListItemText,
  ListItemButton,
  Collapse,
  IconButton,
  Box,
  Typography,
} from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { NavLink } from "react-router-dom";
import Logout from "@mui/icons-material/Logout";
// import { useAuth } from "../Auth/index.jsx";

const SideBar = () => {
  const [open, setOpen] = useState(true);
  // const auth =  useAuth();

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <>
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"space-between"}
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "#284259",
          height: "100%",
          color: "#FFFFFF",
        }}
      >
        <List
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          sx={{
            width: "100%",
          }}
        >
          <Box display={"flex"} justifyContent={"center"} my={"26px"}>
            <img src={Logo} alt="" />
          </Box>
          <NavLink
            className={({ isActive }) => (isActive ? "active-link" : "")}
            to="/dashboard/main"
            style={{ textDecoration: "none", color: "#FFFFFF" }}
          >
            <ListItemButton>
              <ListItemText>
                <Typography variant="sideBarLink">Dashboard</Typography>
              </ListItemText>
            </ListItemButton>
          </NavLink>

          <ListItemButton onClick={handleClick}>
            <ListItemText>
              <Typography variant="sideBarLink">User Management</Typography>
            </ListItemText>
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <NavLink
                className={({ isActive }) => (isActive ? "active-link" : "")}
                to="/dashboard/users"
                style={{ textDecoration: "none", color: "#FFFFFF" }}
              >
                <ListItemButton>
                  <IconButton>
                    <FiberManualRecordIcon
                      style={{ color: "#FFFFFF", fontSize: "10px" }}
                    />
                  </IconButton>
                  <ListItemText>
                    <Typography variant="sideBarLink">Users</Typography>
                  </ListItemText>
                </ListItemButton>
              </NavLink>
            </List>
          </Collapse>
          <NavLink
            className={({ isActive }) => (isActive ? "active-link" : "")}
            to="/dashboard/setting"
            style={{ textDecoration: "none", color: "#FFFFFF" }}
          >
            <ListItemButton>
              <ListItemText>
                <Typography variant="sideBarLink">Settings</Typography>
              </ListItemText>
            </ListItemButton>
          </NavLink>
        </List>

        <List>
          <NavLink
            to="/OrgLogin"
            style={{ textDecoration: "none", color: "#FFFFFF" }}
            // onClick={auth.logout()}
          >
            <ListItemButton>
              <Logout />
              <ListItemText>
                <Typography variant="sideBarLink" sx={{ fontSize: "16px" }}>
                  Logout
                </Typography>
              </ListItemText>
            </ListItemButton>
          </NavLink>
        </List>
      </Box>
    </>
  );
};

export default SideBar;
