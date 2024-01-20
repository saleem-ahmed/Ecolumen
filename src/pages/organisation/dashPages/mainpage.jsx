import { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  Divider,
  TablePagination,
  IconButton,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CardImg1 from "../../../assets/dashboard/card-img1.svg";
import CardImg2 from "../../../assets/dashboard/card-img2.svg";
import CardImg3 from "../../../assets/dashboard/card-img3.svg";
import CardImg4 from "../../../assets/dashboard/card-img4.svg";
import BgCard1 from "../../../assets/dashboard/bg-card1.svg";
import BgCard2 from "../../../assets/dashboard/bg-card2.svg";
import BgCard3 from "../../../assets/dashboard/bg-card3.svg";
import BgCard4 from "../../../assets/dashboard/bg-card4.svg";
import MapImg from "../../../assets/dashboard/map.png";
import OverveiwChart from "../../../components/OverveiwChart";
import UserStatus from "../../../components/userStatus.jsx";
import { useAuth } from "../../../Auth/index.jsx";
import OrgServices from "../../../apis/Organisation";

const labels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const values = [
  {
    a: [45, 55, 100, 95, 85, 103, 119, 95, 55, 10, 40, 49],
    b: [65, 75, 120, 25, 58, 109, 19, 59, 70, 100, 60, 79],
    c: [19, 59, 70, 100, 60, 79, 45, 55, 100, 95, 85, 103],
  },
];


const EditOptions = ["Edit", "Remove"];

const Mainpage = () => {
  const { user } = useAuth();
  const [AllUsers, setAllUsers] = useState(null);
  const [page, setPage] = useState(2);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [staffCount, setStaffCount] =useState({ totalStaffCount: 0, activeStaffCount: 0 });

  useEffect(() => {
    const fetchStaffCount = async () => {
      try {
        const result = await OrgServices.staffCount(user);
        setStaffCount(result);
      } catch (error) {
        console.error("Error fetching staff count:", error);
        // Optionally, set some state to show an error message to the user
      }
    };
  
    fetchStaffCount();
  }, [user]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await OrgServices.getStaff(user);

        console.log("RES =", res);

        setAllUsers(res.staffMembers);
      } catch (error) {
        // Handle errors if necessary
        console.error("Error fetching staff members:", error);
      }
    };

    fetchData(); // Call the async function
  });

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const ITEM_HEIGHT = 48;

  const UserCard = [
    {
      title: "Number Of Users",
      value: staffCount.totalStaffCount,
      img: CardImg1,
      bgimg: BgCard1,
    },
    {
      title: "Active Users",
      value: staffCount.activeStaffCount,
      img: CardImg2,
      bgimg: BgCard2,
    },
    {
      title: "Disabled Users",
      value: "04", // Assuming this is static for now
      img: CardImg3,
      bgimg: BgCard3,
    },
    {
      title: "Hours Left",
      value: "19", // Assuming this is static for now
      img: CardImg4,
      bgimg: BgCard4,
    },
  ];

  return (
    <>
      {console.log("USERS STATE=", AllUsers)}
      <Grid>
        <Box
          display={"flex"}
          flexDirection={"column"}
          gap={"20px"}
          width={"100%"}
        >
          <Typography variant="h2">Dashboard</Typography>
          <Typography
            variant="p"
            sx={{
              "&.MuiTypography-root": {
                fontFamily: "Poppins, sans-serif",
                color: "#717171",
                fontSize: "16px",
                fontStyle: "normal",
                fontWeight: 500,
                lineHeight: "normal",
              },
            }}
          >
            Welcome to ECO-LUMEN
          </Typography>
        </Box>
        <Box
          display={"flex"}
          flexDirection={{
            md: "row",
            xs: "column",
          }}
          gap={"15px"}
          my={"20px"}
        >
          {UserCard.map((e, index) => (
            <Card
              key={index}
              width={{
                lg: "25%",
                md: "50%",
                xs: "100%",
              }}
              sx={{
                width: "100%",
                // minWidth: "250px",
                position: "relative",
                backgroundImage: `url(${e.bgimg})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
                backgroundPosition: "bottom",
                borderRadius: "12px",
                height: "110px",
              }}
              className="dash-card"
            >
              <CardContent>
                <Typography
                  variant="p"
                  sx={{ fontFamily: "Poppins, sans-serif" }}
                >
                  {e.title}
                </Typography>
                <Typography
                  variant="h1"
                  sx={{ color: "#000A12", fontFamily: "Poppins, sans-serif" }}
                >
                  {e.value}
                </Typography>
              </CardContent>
              <img
                className="icon"
                src={e.img}
                alt=""
                style={{ position: "absolute", top: "10px", right: "10px" }}
              />
            </Card>
          ))}
        </Box>
        {/* map section */}
        <Box bgcolor={"#ffffff"} p={"10px"} sx={{ borderRadius: "12px" }}>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography variant="h3">Real-Time</Typography>
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
          <Box>
            <img src={MapImg} alt="" style={{ width: "100%" }} />
          </Box>
        </Box>

        {/*  */}
        <Box
          display={"flex"}
          flexDirection={{
            md: "row",
            xs: "column",
          }}
          py={"20px"}
          gap={"23px"}
          height={"100%"}
          sx={{ boxSizing: "border-box" }}
        >
          <Box
            bgcolor={"#ffffff"}
            width={{ md: "60%", xs: "100%" }}
            height={"100%"}
            p={"0px"}
            sx={{ borderRadius: "12px" }}
          >
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
              p={"10px"}
            >
              <Typography variant="h3">Recently Added Users</Typography>
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
            <Box>
              <TableContainer component={Paper}>
                <Table
                  sx={{ minWidth: 600 }}
                  size="small"
                  aria-label="a dense table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell align="left">Role</TableCell>
                      <TableCell align="left">Email ID</TableCell>
                      <TableCell align="left">Edit</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {AllUsers?.map((staff) => (
                      <TableRow key={staff.name} sx={{ py: "10px" }}>
                        <TableCell
                          component="th"
                          scope="row"
                          sx={{ fontSize: "15px" }}
                        >
                          {staff.name}
                        </TableCell>
                        <TableCell>
                          {staff.role == 1 ? (
                            <span style={{ color: "green", fontSize: "15px" }}>
                              admin
                            </span>
                          ) : staff.role == 2 ? (
                            <span style={{ color: "blue" }}>Manager</span>
                          ) : staff.role == 3 ? (
                            <span style={{ color: "orange" }}>Staff </span>
                          ) : (
                            staff.role
                          )}
                        </TableCell>
                        <TableCell align="left">{staff.email}</TableCell>
                        {/* <TableCell align="left">
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
                        </TableCell> */}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <Box px={"10px"}>
                  <TablePagination
                    component="div"
                    // count={AllUsers.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    rowsPerPageOptions={[10, 20, 50, 100]}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </Box>
              </TableContainer>
            </Box>
          </Box>
          <Box
            bgcolor={"#ffffff"}
            py={"10px"}
            width={{ md: "38%", xs: "100%" }}
            sx={{ borderRadius: "12px" }}
          >
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
              px={"20px"}
            >
              <Typography variant="h3">Users Status</Typography>
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
            <Box display={"flex"} justifyContent={"center"}>
              <UserStatus />
            </Box>
          </Box>
        </Box>

        {/*  */}
        <Box
          display={"flex"}
          flexDirection={{
            md: "row",
            xs: "column",
          }}
          py={"20px"}
          gap={"23px"}
          sx={{ boxSizing: "border-box" }}
        >
          <Box
            bgcolor={"#ffffff"}
            width={"100%"}
            p={"0px"}
            sx={{ borderRadius: "12px" }}
          >
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
              p={"10px"}
            >
              <Typography variant="h3">Work Overveiw</Typography>
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
            <Box>
              <OverveiwChart labels={labels} values={values} />
            </Box>
          </Box>
        </Box>
      </Grid>
    </>
  );
};

export default Mainpage;
