import { useContext, useState } from "react";
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
import { AuthContext } from "../Auth/index.jsx";

const SideBar = () => {
  const [open, setOpen] = useState(true);
  const { LogoutOrg } = useContext(AuthContext);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          maxWidth: 360,
          height: "100%",
          color: "#FFFFFF",
        }}
      >
        <List
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              my: "26px",
            }}
          >
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

          <NavLink
            className={({ isActive }) => (isActive ? "active-link" : "")}
            to="report"
            style={{ textDecoration: "none", color: "#FFFFFF" }}
          >
            <ListItemButton>
              <ListItemText>
                <Typography variant="sideBarLink">Reports</Typography>
              </ListItemText>
            </ListItemButton>
          </NavLink>

          <NavLink
            className={({ isActive }) => (isActive ? "active-link" : "")}
            to="Upload"
            style={{ textDecoration: "none", color: "#FFFFFF" }}
          >
            <ListItemButton>
              <ListItemText>
                <Typography variant="sideBarLink">Uploads</Typography>
              </ListItemText>
            </ListItemButton>
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? "active-link" : "")}
            to="about"
            style={{ textDecoration: "none", color: "#FFFFFF" }}
          >
            <ListItemButton>
              <ListItemText>
                <Typography variant="sideBarLink">About</Typography>
              </ListItemText>
            </ListItemButton>
          </NavLink>
        </List>

        <List>
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
                    <Typography variant="sideBarLink">Staff</Typography>
                  </ListItemText>
                </ListItemButton>
              </NavLink>
            </List>
            <List component="div" disablePadding>
              <NavLink
                className={({ isActive }) => (isActive ? "active-link" : "")}
                to="/dashboard/userRole"
                style={{ textDecoration: "none", color: "#FFFFFF" }}
              >
                <ListItemButton>
                  <IconButton>
                    <FiberManualRecordIcon
                      style={{ color: "#FFFFFF", fontSize: "10px" }}
                    />
                  </IconButton>
                  <ListItemText>
                    <Typography variant="sideBarLink">Role</Typography>
                  </ListItemText>
                </ListItemButton>
              </NavLink>
              <NavLink
                className={({ isActive }) => (isActive ? "active-link" : "")}
                to="/dashboard/userPermission"
                style={{ textDecoration: "none", color: "#FFFFFF" }}
              >
                <ListItemButton>
                  <IconButton>
                    <FiberManualRecordIcon
                      style={{ color: "#FFFFFF", fontSize: "10px" }}
                    />
                  </IconButton>
                  <ListItemText>
                    <Typography variant="sideBarLink">Permission</Typography>
                  </ListItemText>
                </ListItemButton>
              </NavLink>
            </List>
          </Collapse>
          <ListItemButton onClick={handleClick}>
            <ListItemText>
              <Typography variant="sideBarLink">Staff Management</Typography>
            </ListItemText>
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          <ListItemButton
            onClick={() => {
              LogoutOrg();
            }}
          >
            <Logout />
            <ListItemText>
              <Typography variant="sideBarLink" sx={{ fontSize: "16px" }}>
                Logout
              </Typography>
            </ListItemText>
          </ListItemButton>
        </List>
      </Box>
    </>
  );
};

export default SideBar;
