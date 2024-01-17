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
  DialogContentText,
  DialogActions,
  IconButton,
  Menu,
  MenuItem,
  TablePagination  // Updated Import
} from "@mui/material";  // Ensure all components are imported from '@mui/material'
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Search } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import OrgServices from "../../../apis/Organisation";
import { useAuth } from "../../../Auth";
import Loader from "../../../components/loader";


const ITEM_HEIGHT = 48;
const Users = () => {
  const Navigate = useNavigate();
  const { user } = useAuth();
  const [loader, setloader] = useState(true);
  const [staff, setstaff] = useState([]);
  const [anchorElObj, setAnchorElObj] = useState({});
  const [searchQuery, setSearchQuery] = useState(""); //for search on table
  const [page, setPage] = useState(0); //for paginattion
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [removeConfirmation, setRemoveConfirmation] = useState({
    open: false,
    user: null,
  });
  useEffect(() => {
    OrgServices.getStaff(user ? user : null).then((res) => {
      setstaff(res.staffMembers);
      setloader(false);
    });
  }, [user, staff]);

  // Filter staff based on the search query
  const filteredStaff = staff.filter(
    (staffMember) =>
      staffMember.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staffMember.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Determine whether to show the original staff or the filtered staff
  const displayStaff = searchQuery ? filteredStaff : staff;
  // Calculate the range of displayed staff for the current page
  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
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
    await OrgServices.deleteStaff(user, removeConfirmation.user).then((res) => {
      alert(res.message);
    });
  };

  const handleRemoveCancel = () => {
    setRemoveConfirmation({ open: false, user: null });
  };

  return (
    <>
      <Loader loaderValue={loader} />
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
          height
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
                  <TableCell align="left">Edit</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {displayStaff
                  .slice(startIndex, endIndex)
                  .map((staffMember, index) => (
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
                        {staffMember.isActive ? (
                          <Button
                            style={{
                              backgroundColor: "#CDD200",
                              color: "white",
                              width: "70%",
                              fontSize: "11px",
                            }}
                            variant="contained"
                          >
                            Active
                          </Button>
                        ) : (
                          <Button
                            style={{
                              backgroundColor: "#F44",
                              color: "white",
                              width: "70%",
                              fontSize: "11px",
                            }}
                            variant="contained"
                          >
                            Inactive
                          </Button>
                        )}
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
                              onClick={() =>
                                handleEditClick(index, staffMember)
                              }
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
            <TablePagination
              component="div"
              count={displayStaff.length}
              rowsPerPage={rowsPerPage}
              page={page}
              rowsPerPageOptions={[5, 10, 25, 50, 100]}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        </Box>
      </Grid>
      <Dialog
        open={removeConfirmation.open}
        onClose={handleRemoveCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Are You Sure?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to delete this user?
          </DialogContentText>
        </DialogContent>
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
