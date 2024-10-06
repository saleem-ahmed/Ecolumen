import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Logo from "./assets/logo.svg";
import { Link } from "react-router-dom";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
  Avatar,
  Button,
} from "@mui/material";
const pages = ["Products", "Pricing", "Blog"];
import Img1 from "../src/assets/gis.png";
import Img2 from "../src/assets/resource.jpeg";
import Img3 from "../src/assets/Resource.png";
import Img4 from "../src/assets/Custom.png";
import Img5 from "../src/assets/Consulting.jpeg";
import Bg from "../src/assets/bg.jpg";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";

const Landing = () => {
  //header
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const services = [
    {
      title: "Geographic Information Systems (GIS)",
      description:
        "Integrate and analyze spatial data specific to Gilgit-Baltistan’s diverse terrain.",
      image: Img1,
    },
    {
      title: "Environmental Impact Assessment",
      description:
        "Assess the potential environmental impact of projects in Gilgit-Baltistan’s fragile ecosystems.",
      image: Img2,
    },
    {
      title: "Resource Management",
      description:
        "Monitor and manage Gilgit-Baltistan’s vital natural resources, including water, minerals, and forests.",
      image: Img3,
    },
    {
      title: "Custom Analytics and Reporting",
      description:
        "Generate customized reports and dashboards focused on the specific needs of Gilgit-Baltistan.",
      image: Img4,
    },
    {
      title: "Consulting and Support",
      description:
        "Receive expert advice on tackling geographical and resource-related challenges in Gilgit-Baltistan.",
      image: Img5,
    },
  ];

  return (
    <Box>
      <AppBar position="sticky">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: "block", md: "none" } }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography sx={{ textAlign: "center" }}>{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Box>
              <img src={Logo} alt="" style={{ width: "100px" }} />
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              ))}
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <Button
                sx={{
                  background: "#e78915",
                  "&:hover": {
                    background: "#e78915",
                  },
                }}
              >
                <Link
                  to="/staffLogin"
                  style={{ color: "#ffffff", textDecoration: "none" }}
                >
                  Login
                </Link>
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Box position={"relative"} sx={{ height: "459px" }}>
        <img
          src={Bg}
          alt=""
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
          }}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            zIndex: 1,
            height: "100%",
          }}
        >
          <Container>
            <Typography
              variant="h4"
              align="center"
              sx={{ textAlign: "center", color: "#fff" }}
            >
              Eco Lumen
            </Typography>
            <Typography
              variant="body1"
              align="center"
              sx={{ textAlign: "center", color: "#fff" }}
            >
              At Eco Lumen, we specialize in delivering cutting-edge solutions
              tailored for organizations navigating the complex landscapes of
              geography and natural resources. Our web-based application offers
              a suite of powerful tools and insights designed to empower
              decision-makers and optimize resource management with precision
              and clarity.
            </Typography>
          </Container>
        </Box>
      </Box>
      {/* <Box my={5}></Box> */}
      <Box my={5}>
        <Container>
          <Typography variant="h4" align="center" gutterBottom sx={{ mb: 5 }}>
            Our Services for Gilgit-Baltistan
          </Typography>
          <Grid container spacing={4} mt={5}>
            {services.map((service, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <Card>
                  <CardMedia
                    component="img"
                    height="150"
                    image={service.image}
                    alt={service.title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {service.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {service.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      <Box my={5}>
        <Container>
          <Typography
            varient="h3"
            sx={{ textAlign: "center", fontSize: "30px", fontWeight: 400 }}
          >
            We bring companies and customers together
          </Typography>
          <Typography sx={{ textAlign: "center", fontSize: "16px" }}>
            Ecolumen is A Regional web-based GIS platform meant to efficiently
            perform hazard assessment and natural resource management shall be
            the proposed project. It would be able to serve different
            stakeholders like agencies of government, non-governmental
            organizations, researchers, and the publics with real-time
            geospatial data visualization and analysis tools. It combines data
            from various sources: real-time feeds, historical records, and
            satellite imagery, where a user can evaluate risks from floods,
            earthquakes, landslides, and so on.
          </Typography>
          <Box display={"flex"} justifyContent={"center"} gap={"20px"} mt={3}>
            <Button variant="contained">Request a Demo</Button>
            <Button variant="outlined">Free Trial</Button>
          </Box>
        </Container>
      </Box>
      <Box
        component="footer"
        sx={{
          width: "100%",
          color: "#ffffff",
          mt: 5,
          py: 10,
          bgcolor: "#284259",
        }}
      >
        <Typography
          variant="body1"
          align="center"
          sx={{ fontSize: { xs: "14px" } }}
        >
          Ecolumen All Right Reserved.© 2024
        </Typography>

        <Typography
          variant="body2"
          align="center"
          mt={2}
          sx={{ fontSize: { xs: "12px" } }}
        >
          &copy; {new Date().getFullYear()} Eco Lumen – Guiding the way to
          sustainable success in Gilgit-Baltistan.
        </Typography>

        
      </Box>
    </Box>
  );
};

export default Landing;
