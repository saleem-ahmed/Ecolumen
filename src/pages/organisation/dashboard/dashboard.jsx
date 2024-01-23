import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import {
  Box,
  InputAdornment,
  Drawer,
  Toolbar,
  TextField,
  Tooltip,
  Avatar,
  MenuItem,
} from "@mui/material";

import Menu from "@mui/material/Menu";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import ListItemIcon from "@mui/material/ListItemIcon";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import SideBar from "../../../components/SideBar";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../../Auth/index";

const drawerWidth = 260;

const Dashboard = () => {
  const { LogoutUser, user } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box height={"100%"} bgcolor={"#E3EAEF"} sx={{ display: "flex" }}>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }, mt: "20px" }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              bgcolor: "#E3EAEF",
            },
          }}
        >
          <SideBar />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#284259",
            },
          }}
          open
        >
          <SideBar />
        </Drawer>
      </Box>

      <Box
        width={"100%"}
        display={"flex"}
        flexDirection={"column"}
        bgcolor={"#E3EAEF"}
      >
        <AppBar
          position="sticky"
          top={"0px"}
          sx={{
            width: "100%",
          }}
        >
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: {
                md: "flex-end",
                sm: "flex-start",
              },
            }}
          >
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{
                mr: 2,
                bgcolor: "#444",
                color: "#444",
                display: { sm: "none" },
              }}
            >
              <Menu color="#444" sx={{ fontSize: "16px" }} />
            </IconButton>
            <Box
              width={"100%"}
              display={"flex"}
              justifyContent={"space-between"}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <TextField
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                  InputLabelProps={{
                    shrink: true, // This ensures the label stays inside
                  }}
                  placeholder="Search"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "#ECF2FD",
                      borderRadius: "15px",
                    },
                  }}
                />
              </div>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <Tooltip title="Account settings">
                  <IconButton
                    onClick={handleClick}
                    size="small"
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                  >
                    <Avatar sx={{ width: 32, height: 32 }}>
                      {user && user.name ? user.name[0] : "U"}
                    </Avatar>
                  </IconButton>
                </Tooltip>
              </Box>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem onClick={handleClose}>
                  <Avatar sx={{ width: 32, height: 32 }}>
                    {user && user.name ? user.name[0] : "U"}
                  </Avatar>{" "}
                  {user && user.name ? user.name : "unkown"}
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <Settings fontSize="small" />
                  </ListItemIcon>
                  Settings
                </MenuItem>

                <MenuItem
                  onClick={() => {
                    handleClose();
                    LogoutUser();
                  }}
                >
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </AppBar>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            height: "100%",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          <Box height={"100%"} marginTop={"30px"}>
            <Outlet />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
