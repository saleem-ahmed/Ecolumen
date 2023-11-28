import React from "react";
import {
  Grid,
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  FormControlLabel,
  Checkbox,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import UserImg from "../../../assets/dashboard/user-img.svg";
import { Search } from "@mui/icons-material";
import { Link } from "react-router-dom";

const options = ["Edit", "add", "Remove"];
const ITEM_HEIGHT = 48;
const Users = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const UserData = [
    {
      img: UserImg,
      name: "Scarlett Johansson",
      role: "Director",
      email: "scarlettjohansson@gmail.com",
      status: "Active",
      color: "#CDD200",
    },
    {
      img: UserImg,
      name: "Scarlett Johansson 1",
      role: "Director",
      email: "scarlettjohansson@gmail.com",
      status: "Not Active",
      color: "#F44",
    },
    {
      img: UserImg,
      name: "Scarlett Johansson",
      role: "Director",
      email: "scarlettjohansson@gmail.com",
      status: "Active",
      color: "#CDD200",
    },
    {
      img: UserImg,
      name: "Scarlett Johansson 1",
      role: "Director",
      email: "scarlettjohansson@gmail.com",
      status: "Not Active",
      color: "#F44",
    },
    {
      img: UserImg,
      name: "Scarlett Johansson",
      role: "Director",
      email: "scarlettjohansson@gmail.com",
      status: "Active",
      color: "#CDD200",
    },
    {
      img: UserImg,
      name: "Scarlett Johansson 1",
      role: "Director",
      email: "scarlettjohansson@gmail.com",
      status: "Not Active",
      color: "#F44",
    },
    {
      img: UserImg,
      name: "Scarlett Johansson",
      role: "Director",
      email: "scarlettjohansson@gmail.com",
      status: "Active",
      color: "#CDD200",
    },
    {
      img: UserImg,
      name: "Scarlett Johansson 1",
      role: "Director",
      email: "scarlettjohansson@gmail.com",
      status: "Not Active",
      color: "#F44",
    },
    {
      img: UserImg,
      name: "Scarlett Johansson",
      role: "Director",
      email: "scarlettjohansson@gmail.com",
      status: "Active",
      color: "#CDD200",
    },
    {
      img: UserImg,
      name: "Scarlett Johansson 1",
      role: "Director",
      email: "scarlettjohansson@gmail.com",
      status: "Not Active",
      color: "#F44",
    },
    {
      img: UserImg,
      name: "Scarlett Johansson",
      role: "Director",
      email: "scarlettjohansson@gmail.com",
      status: "Active",
      color: "#CDD200",
    },
    {
      img: UserImg,
      name: "Scarlett Johansson 1",
      role: "Director",
      email: "scarlettjohansson@gmail.com",
      status: "Not Active",
      color: "#F44",
    },
  ];
  // const handleOpen = () => setMopen(true);

  return (
    <>
      <Grid>
        <Box
          display={"flex"}
          flexDirection={"column"}
          my={"20px"}
          width={"100%"}
        >
          <Typography variant="h2" sx={{ color: "#000", fontSize: "26px" }}>
            Users
          </Typography>
        </Box>
        <Box
          bgcolor={"#ffffff"}
          heigh
          py={"10px"}
          sx={{ borderRadius: "12px" }}
        >
          <Box
            component={"div"}
            display={"flex"}
            justifyContent={"space-between"}
            sx={{ my: "20px", px: "20px" }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <TextField
                variant="outlined"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{
                  shrink: true, // This ensures the label stays inside
                }}
                placeholder="Search by Email/Name"
              />
            </div>

            <Button color="success" variant="contained">
              <Link to="/dashboard/addUsers" style={{ textDecoration:"none", color: "#ffffff"  }}>Add User</Link>
            </Button>
          </Box>
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <FormControlLabel control={<Checkbox />} />
                  </TableCell>
                  <TableCell align="left">Name</TableCell>
                  <TableCell align="left">Role</TableCell>
                  <TableCell align="left">Email</TableCell>
                  <TableCell align="left">Status</TableCell>
                  <TableCell align="left">Edit</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {UserData.map((e) => (
                  <TableRow key={e.id}>
                    <TableCell width={"50px"} component="th" scope="row">
                      <FormControlLabel control={<Checkbox />} />
                    </TableCell>
                    <TableCell align="left" width={"350px"}>
                      <Box display="flex" alignItems="center" gap={"10px"}>
                        <img src={e.img} alt="" />
                        <Typography variant="span">{e.name}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="left">{e.role}</TableCell>
                    <TableCell
                      align="left"
                      sx={{ color: "rgba(0, 71, 255, 0.43)" }}
                    >
                      {e.email}
                    </TableCell>
                    <TableCell align="left">
                      <Button
                        style={{
                          backgroundColor: e.color,
                          color: "white",
                          width: "70%",
                          fontSize: "11px",
                        }}
                        variant="contained"
                      >
                        {e.status}
                      </Button>
                    </TableCell>
                    <TableCell align="left">
                      <div>
                        <IconButton
                          aria-label="more"
                          id="long-button"
                          aria-controls={open ? "long-menu" : undefined}
                          aria-expanded={open ? "true" : undefined}
                          aria-haspopup="true"
                          onClick={handleClick}
                        >
                          <MoreVertIcon />
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
                          {options.map((option) => (
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
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Grid>
    </>
  );
};

export default Users;
