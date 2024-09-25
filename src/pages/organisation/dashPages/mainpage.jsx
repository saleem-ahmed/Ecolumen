import { useEffect, useState, useContext } from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  Divider,
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
  Hidden,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CardImg1 from "../../../assets/dashboard/card-img1.svg";
import CardImg2 from "../../../assets/dashboard/card-img2.svg";
import CardImg3 from "../../../assets/dashboard/card-img3.svg";
import BgCard1 from "../../../assets/dashboard/bg-card1.svg";
import BgCard2 from "../../../assets/dashboard/bg-card2.svg";
import BgCard3 from "../../../assets/dashboard/bg-card3.svg";
import { AuthContext } from "../../../Auth/index.jsx";
import OrgServices from "../../../apis/Organisation";
import Map from "../../../components/Map/map.jsx";

const EditOptions = ["Refresh"];
// Sample GeoJSON data for forests and water bodies

const Mainpage = () => {
  const { org } = useContext(AuthContext);
  const [AllUsers, setAllUsers] = useState(null);

  const [staffCount, setStaffCount] = useState({
    totalStaffCount: 0,
    activeStaffCount: 0,
    inactiveStaffCount: 0,
  });

  useEffect(() => {
    //StaffCount
    const fetchStaffCount = async () => {
      await OrgServices.staffCount(org)
        .then((res) => {
          console.log(res, "staff count in APi");
          if (res.status === "success") {
            setStaffCount(res);
            console.log(res, "staff count in APi");
          } else {
            console.log("error");
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
    };

    fetchStaffCount();
    //getStaff
    const fetchData = async () => {
      try {
        const res = await OrgServices.getStaff(org?._id, 1);
        setAllUsers(res.staffMembers);
        console.log(AllUsers, "all user");
        console.log(res.staffMembers, "all user response");
      } catch (error) {
        console.log("Error fetching staff members:", error);
      }
    };

    fetchData();
  }, [org]);

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
      title: "Number Of Staff",
      value: staffCount.totalStaffCount,
      img: CardImg1,
      bgimg: BgCard1,
    },
    {
      title: "Active Staff",
      value: staffCount.activeStaffCount,
      img: CardImg2,
      bgimg: BgCard2,
    },
    {
      title: "Disabled Staff",
      value: staffCount.inactiveStaffCount,
      img: CardImg3,
      bgimg: BgCard3,
    },
  ];

  return (
    <>
      <Grid>
        <Box
          display={"flex"}
          flexDirection={"column"}
          gap={"20px"}
          width={"100%"}
        >
          <Typography variant="h2">{org?.orgname} Dashboard</Typography>
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
        <Box
          bgcolor={"#ffffff"}
          height={"70vh"}
          p={"10px"}
          sx={{ borderRadius: "12px" , overflow: "hidden" }}
        >

          <Map />
        </Box>

        <Box
          display={"flex"}
          alignItems={"stretch"}
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
            width={{ md: "100%", xs: "100%" }}
            height={"100%"}
            p={"0px"}
            sx={{ borderRadius: "12px", minHeight: "100%" }}
          >
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
              p={"10px"}
            >
              <Typography variant="h3">Recently Added Staff</Typography>
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
                      <TableCell align="left">Number</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {AllUsers === null ? (
                      <TableRow>
                        <TableCell
                          colSpan={4}
                          align="center"
                          sx={{ height: "10vh" }}
                        >
                          <Typography variant="p">
                            No staff available
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ) : (
                      AllUsers.map((staff) => (
                        <TableRow key={staff.name} sx={{ py: "10px" }}>
                          <TableCell
                            component="th"
                            scope="row"
                            sx={{ fontSize: "15px" }}
                          >
                            {staff.name}
                          </TableCell>
                          <TableCell sx={{ color: "#e58206" }}>
                            {staff.role === "1" ? (
                              <span style={{ fontSize: "15px" }}>admin</span>
                            ) : staff.role === "2" ? (
                              <span style={{ fontSize: "15px" }}>Manager</span>
                            ) : staff.role === "3" ? (
                              <span style={{ fontSize: "15px" }}>Staff</span>
                            ) : (
                              staff.role
                            )}
                          </TableCell>
                          <TableCell>{staff.email}</TableCell>
                          <TableCell>{staff.phoneNumber}</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Box>
        </Box>
      </Grid>
    </>
  );
};

export default Mainpage;
