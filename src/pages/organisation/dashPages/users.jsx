/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
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
import { AuthContext } from "../../../Auth";
import Loader from "../../../components/loader";
import Alerts from "../../../components/Customalerts";

const ITEM_HEIGHT = 48;
const Users = () => {
  const [pageInfo, setPageInfo] = useState({
    currentPage: 1,
    totalPages: 1,
    pageSize: 10,
  });
  const navigate = useNavigate();
  const { org } = useContext(AuthContext);
  const [loader, setLoader] = useState(true);
  const [staff, setStaff] = useState([]);
  const [anchorElObj, setAnchorElObj] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [staffUpdated, setStaffUpdated] = useState(false);

  const handleSnackbarOpen = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const [removeConfirmation, setRemoveConfirmation] = useState({
    open: false,
    org: null,
  });

  const FetchUsers = async () => {
    setLoader(true);
    await OrgServices.getStaff(org?._id, pageInfo.currentPage)
      .then((res) => {
        if (res.status === "success") {
          setStaff(res.staffMembers);
          setPageInfo((prev) => ({
            ...prev,
            totalPages: res.pageInfo.totalPages,
          }));
          setLoader(false);
          handleSnackbarOpen(res.message, "success");
        } else {
          setLoader(false);
          handleSnackbarOpen(res.message, "error");
          console.log(res.message);
        }
      })
      .catch((error) => {
        setLoader(false);
        handleSnackbarOpen(error);
        console.log(error);
      });
  };

  const handleToggle = async (staffMember) => {
    setLoader(true);
    await OrgServices.toggleStaff(org?._id, staffMember)
      .then((res) => {
        if (res.status === "success") {
          setStaff((prevStaff) =>
            prevStaff.map((member) =>
              member._id === res.staffDetails.id
                ? { ...member, isActive: res.staffDetails.isActive }
                : member
            )
          );
          setLoader(false);
          handleSnackbarOpen(res.message, "success");
        } else {
          setLoader(false);
          handleSnackbarOpen(res.message, "error");
          console.log(res, "error");
        }
      })
      .catch((error) => {
        setLoader(false);
        handleSnackbarOpen(error.data.message, "error");
        console.log(error.data, "error");
      });
  };

  const filteredStaff = staff.filter(
    (staffMember) =>
      staffMember.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staffMember.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
    navigate("/dashboard/editUsers", { state: staffMember });
  };

  const handleRemoveClick = (index, staffMember) => {
    handleMenuClose(index);
    setRemoveConfirmation({ open: true, org: staffMember });
  };

  const handleRemoveConfirm = async () => {
    setRemoveConfirmation({ open: false, org: null });
    await OrgServices.deleteStaff(org, removeConfirmation.org)
      .then((res) => {
        if (res.status === "success") {
          setStaffUpdated((prev) => !prev);
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
    setRemoveConfirmation({ open: false, org: null });
  };

  const handlePageChange = (event, value) => {
    setPageInfo({ ...pageInfo, currentPage: value });
  };

  useEffect(() => {
    if (org) {
      FetchUsers();
    }
  }, [org, pageInfo.currentPage, staffUpdated]);

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
            Staff
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
                Add Staff
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
                {displayStaff.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ height: "10vh" }}>
                      <Typography variant="body1">No staff available</Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  displayStaff.map((staffMember, index) => (
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
                        {staffMember.role === 1 ? (
                          <span style={{ color: "green" }}>admin</span>
                        ) : staffMember.role === 2 ? (
                          <span style={{ color: "blue" }}>Manager</span>
                        ) : staffMember.role === 3 ? (
                          <span style={{ color: "orange" }}>Staff</span>
                        ) : (
                          staffMember.role
                        )}
                      </TableCell>
                      <TableCell>{staffMember.phoneNumber}</TableCell>
                      <TableCell>
                        <Switch
                          checked={staffMember.isActive}
                          onChange={() => handleToggle(staffMember)}
                        />
                      </TableCell>
                      <TableCell align="left">
                        <IconButton
                          aria-label="more"
                          aria-controls={`long-menu-${index}`}
                          aria-haspopup="true"
                          onClick={(event) => handleMenuClick(event, index)}
                        >
                          <MoreVertIcon />
                        </IconButton>
                        <Menu
                          id={`long-menu-${index}`}
                          anchorEl={anchorElObj[index]}
                          keepMounted
                          open={Boolean(anchorElObj[index])}
                          onClose={() => handleMenuClose(index)}
                          PaperProps={{
                            style: {
                              maxHeight: ITEM_HEIGHT * 4.5,
                              width: "20ch",
                            },
                          }}
                        >
                          <MenuItem onClick={() => handleEditClick(index, staffMember)}>
                            Edit
                          </MenuItem>
                          <MenuItem onClick={() => handleRemoveClick(index, staffMember)}>
                            Delete
                          </MenuItem>
                        </Menu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Box mt={2} display="flex" justifyContent="center">
          <Pagination
            count={pageInfo.totalPages}
            page={pageInfo.currentPage}
            onChange={handlePageChange}
          />
        </Box>
      </Grid>

      <Dialog
        open={removeConfirmation.open}
        onClose={handleRemoveCancel}
      >
        <DialogTitle>Remove Staff</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to remove this staff member?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRemoveCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleRemoveConfirm} color="primary" autoFocus>
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Users;
