/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import {
  Grid,
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
  TableContainer,
  Dialog,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Menu,
  Switch,
  MenuItem,
  Pagination,
} from "@mui/material";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Search } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import OrgServices from "../../../apis/Organisation";
import { useAuth } from "../../../Auth";
import Loader from "../../../components/loader";
import Alerts from "../../../components/Customalerts";

const ITEM_HEIGHT = 48;
const Users = () => {
const [navigate, setNavigate] = useState(1);

  useEffect(() => {
    FetchUsers();
  }, []);
  
  useEffect(() => {
    FetchUsers();
  }, [navigate]);

  const Navigate = useNavigate();
  const { user } = useAuth();
  const [loader, setloader] = useState(true);
  const [staff, setstaff] = useState([]);
  const [anchorElObj, setAnchorElObj] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const handleSnackbarOpen = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };
  const [pageInfo, setPageInfo] = useState({
    currentPage: 1,
    totalPages: 1,
    pageSize: 10,
  });


  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const [removeConfirmation, setRemoveConfirmation] = useState({
    open: false,
    user: null,
  });

  const FetchUsers = async () => {
    await OrgServices.getStaff(user ? user : null, navigate)
      .then((res) => {
        if (res.status === "success") {
          setstaff(res.staffMembers);
          // setPageInfo(prevPageInfo => ({ ...prevPageInfo, totalPages: res.pageInfo.totalPages, currentPage: res.pageInfo.currentPage }));
            setPageInfo({ ...pageInfo, totalPages: res.pageInfo.totalPages });
            if(navigate!==res.pageInfo.currentPage) setNavigate(res.pageInfo.currentPage);
          
          // console.log("1) PAGE INFO STATE=", pageInfo);
          handleSnackbarOpen(res.message, "success");
          setloader(false);
        } else {
          setloader(false);
          handleSnackbarOpen(res.message, "error");
          console.log(res.message);
        }
      })
      .catch((error) => {
        setloader(false);
        handleSnackbarOpen(error);
        console.log(error);
      });
  };

 


  // toggle in table
  const handleToggle = (staff) => {
    staff.isActive = !staff.isActive;
  };

  // Filter staff based on the search query
  const filteredStaff = staff.filter(
    (staffMember) =>
      staffMember.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staffMember.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Determine whether to show the original staff or the filtered staff
  const displayStaff = searchQuery ? filteredStaff : staff;

  const handleMenuClick = (event, index) => {
    setAnchorElObj((prevObj) => ({
      ...prevObj,
      [index]: event.currentTarget,
    }));
  };

  const handleMenuClose = (index) => {
    setAnchorElObj((prevObj) => ({
      ...prevObj,
      [index]: null,
    }));
  };

  const handleEditClick = (index, staffMember) => {
    handleMenuClose(index);
    Navigate("/dashboard/editUsers", { state: staffMember });
  };

  const handleRemoveClick = (index, staffMember) => {
    handleMenuClose(index);
    setRemoveConfirmation({ open: true, user: staffMember });
  };

  const handleRemoveConfirm = async () => {
    setRemoveConfirmation({ open: false, user: null });
    await OrgServices.deleteStaff(user, removeConfirmation.user)
      .then((res) => {
        if (res.status === "success") {
          handleSnackbarOpen(res.message, "success");
        } else {
          handleSnackbarOpen(res.message, "error");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleRemoveCancel = () => {
    setRemoveConfirmation({ open: false, user: null });
  };

  // pagination
  const handlePageChange = (event, value) => {
    setNavigate(value);
    console.log("NAVIGATE VALUE=", navigate);
    // setPageInfo({...pageInfo, currentPage: value });
    setNavigate(value);
    console.log("VALUE FROM PAGINATION=",value);
    // console.log("2) VALUE OF STATE CURRENT PAGE",pageInfo.currentPage);    
    FetchUsers();
  };
  return (
    <>
      <Loader loaderValue={loader} />
      <Alerts
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        handleClose={handleSnackbarClose}
      />

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
        <Box bgcolor={"#ffffff"} py={"10px"} sx={{ borderRadius: "12px" }}>
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
                  shrink: true,
                }}
                placeholder="Search by Email/Name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ marginBottom: 16 }}
              />
            </div>
            <Button color="success" variant="contained">
              <Link
                to="/dashboard/addUsers"
                style={{ textDecoration: "none", color: "#ffffff" }}
              >
                Add User
              </Link>
            </Button>
          </Box>
          <TableContainer>
            <Table style={{ tableLayout: "auto" }}>
              <TableHead>
                <TableRow>
                  <TableCell align="left">Name</TableCell>
                  <TableCell align="left">Email</TableCell>
                  <TableCell align="left">Role</TableCell>
                  <TableCell align="left">Phone Number</TableCell>
                  <TableCell align="left">Status</TableCell>
                  <TableCell align="left">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {displayStaff.map((staffMember, index) => (
                  <TableRow key={staffMember._id}>
                    <TableCell
                      sx={{
                        display: "flex",
                        gap: "10px",
                        alignItems: "center",
                      }}
                    >
                      <img
                        style={{
                          width: "30px",
                          height: "30px",
                          borderRadius: "50%",
                        }}
                        src={staffMember.staffImage}
                        alt=""
                      />

                      {staffMember.name}
                    </TableCell>
                    <TableCell>{staffMember.email}</TableCell>
                    <TableCell>
                      {staffMember.role == 1 ? (
                        <span style={{ color: "green" }}>admin</span>
                      ) : staffMember.role == 2 ? (
                        <span style={{ color: "blue" }}>Manager</span>
                      ) : staffMember.role == 3 ? (
                        <span style={{ color: "orange" }}>Staff </span>
                      ) : (
                        staffMember.role
                      )}
                    </TableCell>
                    <TableCell>{staffMember.phoneNumber}</TableCell>
                    <TableCell>
                      <Switch
                        checked={staffMember.isActive}
                        onChange={() => handleToggle(staffMember)}
                        color="primary"
                        inputProps={{ "aria-label": "toggle staff status" }}
                      />
                    </TableCell>

                    <TableCell align="left">
                      <div>
                        <IconButton
                          aria-label="more"
                          id={`long-button-${index}`}
                          aria-controls={
                            open ? `long-menu-${index}` : undefined
                          }
                          aria-expanded={open ? "true" : undefined}
                          aria-haspopup="true"
                          onClick={(event) => handleMenuClick(event, index)}
                        >
                          <MoreVertIcon />
                        </IconButton>
                        <Menu
                          id={`long-menu-${index}`}
                          MenuListProps={{
                            "aria-labelledby": `long-button-${index}`,
                          }}
                          anchorEl={anchorElObj[index]}
                          open={Boolean(anchorElObj[index])}
                          onClose={() => handleMenuClose(index)}
                          PaperProps={{
                            style: {
                              maxHeight: ITEM_HEIGHT * 4.5,
                              width: "20ch",
                            },
                          }}
                        >
                          <MenuItem
                            onClick={() => handleEditClick(index, staffMember)}
                          >
                            Edit
                          </MenuItem>
                          <MenuItem
                            onClick={() =>
                              handleRemoveClick(index, staffMember)
                            }
                          >
                            Remove
                          </MenuItem>
                        </Menu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Pagination
              count={pageInfo.totalPages}
              page={navigate}
              onChange={handlePageChange}
              color="primary"
            />
          </TableContainer>
        </Box>
      </Grid>
      <Dialog
        open={removeConfirmation.open}
        onClose={handleRemoveCancel}
        aria-labelledby="alert-dialog-title"
      >
        <DialogTitle id="alert-dialog-title">
          {"Do you want to delete this user?"}
        </DialogTitle>
        <DialogContent></DialogContent>
        <DialogActions>
          <Button onClick={handleRemoveCancel}>Cancel</Button>
          <Button onClick={handleRemoveConfirm} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Users;
