import { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  Divider,
  TablePagination,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CardImg1 from "../../../assets/dashboard/card-img1.svg";
import CardImg2 from "../../../assets/dashboard/card-img2.svg";
import CardImg3 from "../../../assets/dashboard/card-img3.svg";
import CardImg4 from "../../../assets/dashboard/card-img4.svg";
import BgCard1 from "../../../assets/dashboard/bg-card1.svg";
import BgCard2 from "../../../assets/dashboard/bg-card2.svg";
import BgCard3 from "../../../assets/dashboard/bg-card3.svg";
import BgCard4 from "../../../assets/dashboard/bg-card4.svg";
// import { Bar , Pie} from "react-chartjs-2";
import MapImg from "../../../assets/dashboard/map.png";
import OverviewImg from "../../../assets/dashboard/workowerview.png";
import StatusImg from "../../../assets/dashboard/status.png";
import StatusImg1 from "../../../assets/dashboard/statustableimg.svg";
// import OverveiwChart from "../../../components/OverveiwChart.jsx";
// import UserStatus from "../../../components/userStatus.jsx";
import { UserData } from "../../../Data.js";
const AddUser = [
  {
    name: "Ahmed Saleem",
    role: "Single license",
    email: "aaa00@gmail.com",
  },
  {
    name: "Kalim Hussain",
    role: "Single license",
    email: "aaa00@gmail.com",
  },
  {
    name: "Shah Nawaz",
    role: "Single license",
    email: "aaa00@gmail.com",
  },
  {
    name: "Hussain Ullah",
    role: "Single license",
    email: "aaa00@gmail.com",
  },
  {
    name: "Arshad",
    role: "Single license",
    email: "aaa00@gmail.com",
  },
  {
    name: "Sami Ullah",
    role: "Single license",
    email: "aaa00@gmail.com",
  },
];

const StatusUser = [
  {
    img: StatusImg1,
    name: "Valentine Maton",
    desg: "Engineer",
    status: "Denied",
    color: "red",
  },
  {
    img: StatusImg1,
    name: "Valentine Maton",
    desg: "Engineer",
    status: "pending",
    color: "#CDD200",
  },
  {
    img: StatusImg1,
    name: "Valentine Maton",
    desg: "Engineer",
    status: "Denied",
    color: "red",
  },
  {
    img: StatusImg1,
    name: "Valentine Maton",
    desg: "Engineer",
    status: "Denied",
    color: "red",
  },
  {
    img: StatusImg1,
    name: "Valentine Maton",
    desg: "Engineer",
    status: "Denied",
    color: "red",
  },
  {
    img: StatusImg1,
    name: "Valentine Maton",
    desg: "Engineer",
    status: "pending",
    color: "#CDD200",
  },
];
const UserCard = [
  {
    title: "Number Of Users",
    value: "50",
    img: CardImg1,
    bgimg: BgCard1,
  },
  {
    title: "Active Users",
    value: "16",
    img: CardImg2,
    bgimg: BgCard2,
  },
  {
    title: "Disabled Users",
    value: "04",
    img: CardImg3,
    bgimg: BgCard3,
  },
  {
    title: "Hours Left",
    value: "19",
    img: CardImg4,
    bgimg: BgCard4,
  },
];
const EditOptions = ["Edit", "Remove"];

const Mainpage = () => {
  const [page, setPage] = useState(2);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  // const [userData] = useState({
  //   labels: UserData.map((data) => data.year),
  //   datasets: [
  //     {
  //       label: "Users Gained",
  //       data: UserData.map((data) => data.userGain),
  //       backgroundColor: [
  //         "rgba(75,192,192,1)",
  //         "#ecf0f1",
  //         "#50AF95",
  //         "#f3ba2f",
  //         "#2a71d0",
  //       ],
  //       // borderColor: "black",
  //       borderWidth: 2,
  //     },
  //     {
  //       label: "Users lost",
  //       data: UserData.map((data) => data.userLost),
  //       backgroundColor: [
  //         "rgba(75,192,192,1)",
  //         "#ecf0f1",
  //         "#50AF95",
  //         "#f3ba2f",
  //         "#2a71d0",
  //       ],
  //       // borderColor: "black",
  //       borderWidth: 2,
  //     },
  //     {
  //       label: "Users lost",
  //       data: UserData.map((data) => data.userGain),
  //       backgroundColor: [
  //         "rgba(75,192,192,1)",
  //         "#ecf0f1",
  //         "#50AF95",
  //         "#f3ba2f",
  //         "#2a71d0",
  //       ],
  //       // borderColor: "black",
  //       borderWidth: 2,
  //     },
  //   ],
  // });
  // const options = {
  //   responsive: true,
  //   plugins: {
  //     legend: {
  //       position: "top",
  //     },
  //     title: {
  //       display: true,
  //       text: "Chart.js Bar Chart",
  //     },
  //   },
  // };
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

  return (
    <>
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
          sx={{ boxSizing: "border-box" }}
        >
          <Box
            bgcolor={"#ffffff"}
            width={{ md: "60%", xs: "100%" }}
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
                    {AddUser.map((e) => (
                      <TableRow key={e.name}>
                        <TableCell component="th" scope="row">
                          {e.name}
                        </TableCell>
                        <TableCell align="left">{e.role}</TableCell>
                        <TableCell align="left">{e.email}</TableCell>
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
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <Box px={"10px"}>
                  <TablePagination
                    component="div"
                    count={100}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
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
              <Typography variant="h3">Access To Users</Typography>
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
                  // sx={{  }}
                  size="small"
                  aria-label="a dense table"
                  sx={{
                    "&:last-child td, &:last-child th": { border: "0px" },
                    minWidth: 450,
                  }}
                >
                  <TableBody>
                    {StatusUser.map((e) => (
                      <TableRow key={e.name}>
                        <TableCell width={"44px"} component="th" scope="row">
                          <img src={e.img} alt="" />
                        </TableCell>
                        <TableCell align="left">
                          <Typography variant="heading">{e.name}</Typography>
                          <br />
                          <Typography variant="paragraph">{e.desg}</Typography>
                        </TableCell>
                        <TableCell align="left">
                          <div
                            style={{
                              backgroundColor: `${e.color}`,
                              color: "#FFFFFF",
                              textAlign: "center",
                              width: "57.06px",
                              height: "24px",
                              padding: "7px 9.06px 6px 9px",
                              borderRadius: "4px",
                              cursor: "pointer",
                            }}
                          >
                            {e.status}
                          </div>
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
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
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
          gap={"23px"}
        >
          <Box bgcolor={"#ffffff"} p={"10px"} sx={{ borderRadius: "12px" }}>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography variant="h3">Work Overview</Typography>
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
             <img src={OverviewImg} alt="" />
              {/* <Bar chartData={userData} options={options} /> */}
            </Box>
          </Box>
          <Box bgcolor={"#ffffff"} p={"10px"} sx={{ borderRadius: "12px" }}>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography variant="h3">User Status</Typography>
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
            <img src={StatusImg} alt="" />
              {/* <Pie chartData={userData} options={options} /> */}
            </Box>
          </Box>
        </Box>
      </Grid>
    </>
  );
};

export default Mainpage;
