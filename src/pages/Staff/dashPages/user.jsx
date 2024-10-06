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
// Invalid Context API
import { AuthContext } from "../../../Auth";
import Loader from "../../../components/loader";
import Alerts from "../../../components/Customalerts";

const ITEM_HEIGHT = 48;
const Users = () => {
  const { staff } = useContext(AuthContext);
  const [pageInfo, setPageInfo] = useState({
    currentPage: 1,
    totalPages: 1,
    pageSize: 10,
  });
  const [loader, setLoader] = useState(true);
  const [staffs, setStaffs] = useState([]);
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
  const filteredStaff = staffs.filter(
    (staffMember) =>
      staffMember.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staffMember.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayStaff = searchQuery ? filteredStaff : staffs;

  const handlePageChange = (event, value) => {
    setPageInfo({ ...pageInfo, currentPage: value });
  };

  const FetchUsers = async () => {
    setLoader(true);
    await OrgServices.getStaff(staff?.organization, pageInfo.currentPage)
      .then((res) => {
        if (res.status === "success") {
          setStaffs(res.staffMembers);
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
  useEffect(() => {
    if (staff) {
      FetchUsers();
    }
  }, [staff, pageInfo.currentPage, staffUpdated]);
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
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: {
                xs: "column",
                md: "row",
              },
              my: "20px",
              px: { xs: "10px", md: "20px" },
            }}
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
              <Link to="/staffDashboard/addusers" style={{ textDecoration: "none", color: "#ffffff" }}>
                Add Staff
              </Link>
            </Button>
          </Box>
          <TableContainer>
            <Table style={{ tableLayout: "auto" }}>
              <TableHead>
                <TableRow>
                  <TableCell
                    align="left"
                    sx={{
                      fontSize: {
                        xs: "10px",
                        md: "16px",
                      },
                    }}
                  >
                    Name
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      fontSize: {
                        xs: "10px",
                        md: "16px",
                      },
                    }}
                  >
                    Email
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      fontSize: {
                        xs: "10px",
                        md: "16px",
                      },
                    }}
                  >
                    Role
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      fontSize: {
                        xs: "10px",
                        md: "16px",
                      },
                    }}
                  >
                    Phone Number
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      fontSize: {
                        xs: "10px",
                        md: "16px",
                      },
                    }}
                  >
                    Status
                  </TableCell>
                 
                </TableRow>
              </TableHead>
              <TableBody>
                {displayStaff.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      align="center"
                      sx={{ height: "10vh" }}
                    >
                      <Typography variant="body1">
                        No staff available
                      </Typography>
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
                          fontSize: {
                            XS: "10px",
                            md: "16px",
                          },
                        }}
                      >
                        {staffMember.name}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: {
                            XS: "10px",
                            md: "16px",
                          },
                        }}
                      >
                        {staffMember.email}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: {
                            XS: "10px",
                            md: "16px",
                          },
                        }}
                      >
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
                      <TableCell
                        sx={{
                          fontSize: {
                            XS: "10px",
                            md: "16px",
                          },
                        }}
                      >
                        {staffMember.phoneNumber}
                      </TableCell>
                      <TableCell>
                        <Switch
                          checked={staffMember.isActive}
                          onChange={() => handleToggle(staffMember)}
                        />
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
    </>
  );
};

export default Users;
