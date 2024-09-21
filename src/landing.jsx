import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Logo from "./assets/logo.svg";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
  Link,
  Avatar,
  Button,
} from "@mui/material";
const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

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
      image: "https://via.placeholder.com/150",
    },
    {
      title: "Environmental Impact Assessment",
      description:
        "Assess the potential environmental impact of projects in Gilgit-Baltistan’s fragile ecosystems.",
      image: "https://via.placeholder.com/150",
    },
    {
      title: "Resource Management",
      description:
        "Monitor and manage Gilgit-Baltistan’s vital natural resources, including water, minerals, and forests.",
      image: "https://via.placeholder.com/150",
    },
    {
      title: "Custom Analytics and Reporting",
      description:
        "Generate customized reports and dashboards focused on the specific needs of Gilgit-Baltistan.",
      image: "https://via.placeholder.com/150",
    },
    {
      title: "Consulting and Support",
      description:
        "Receive expert advice on tackling geographical and resource-related challenges in Gilgit-Baltistan.",
      image: "https://via.placeholder.com/150",
    },
  ];
  const images = [
    "https://via.placeholder.com/300",
    "https://via.placeholder.com/300",
    "https://via.placeholder.com/300",
    "https://via.placeholder.com/300",
    "https://via.placeholder.com/300",
    "https://via.placeholder.com/300",
  ];
  const testimonials = [
    {
      name: "John Doe",
      position: "CEO, Company",
      feedback:
        "Eco Lumen has transformed the way we manage our resources. Their tools are intuitive and powerful.",
      avatar: "https://via.placeholder.com/150",
    },
    {
      name: "Jane Smith",
      position: "Project Manager",
      feedback:
        "The insights we get from Eco Lumen are invaluable. Highly recommended!",
      avatar: "https://via.placeholder.com/150",
    },
    {
      name: "Samuel Green",
      position: "Environmental Scientist",
      feedback:
        "Eco Lumen's solutions are top-notch. They really understand the challenges we face.",
      avatar: "https://via.placeholder.com/150",
    },
  ];
  return (
    <Box>
      <AppBar position="static">
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
              <Typography sx={{ textAlign: "center" }}>Login</Typography>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Box my={5}>
        <Container>
          <Typography variant="h4" align="center">
            About Eco Lumen
          </Typography>
          <Typography variant="body1" align="center">
            At Eco Lumen, we specialize in delivering cutting-edge solutions
            tailored for organizations navigating the complex landscapes of
            geography and natural resources. Our web-based application offers a
            suite of powerful tools and insights designed to empower
            decision-makers and optimize resource management with precision and
            clarity.
          </Typography>
        </Container>
      </Box>
      <Box my={5}>
        <Container>
          <Typography variant="h4" align="center" gutterBottom>
            Our Services for Gilgit-Baltistan
          </Typography>
          <Grid container spacing={4}>
            {services.map((service, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
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
          <Typography variant="h4" align="center" gutterBottom>
            Gallery
          </Typography>
          <Grid container spacing={4}>
            {images.map((image, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <Card>
                  <CardMedia
                    component="img"
                    height="200"
                    image={image}
                    alt={`Gallery image ${index + 1}`}
                  />
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      <Box my={5}>
        <Container>
          <Typography variant="h4" align="center" gutterBottom>
            Testimonials
          </Typography>
          <Grid container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <Card>
                  <CardContent>
                    <Box display="flex" alignItems="center" mb={2}>
                      <Avatar src={testimonial.avatar} alt={testimonial.name} />
                      <Box ml={2}>
                        <Typography variant="h6">{testimonial.name}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {testimonial.position}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography variant="body1">
                      {testimonial.feedback}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      <Box
        component="footer"
        mt={5}
        py={3}
        bgcolor="primary.main"
        color="white"
      >
        <Container>
          <Typography variant="body1" align="center">
            Ready to Get Started?
          </Typography>
          <Typography variant="body2" align="center">
            <Link href="#" color="inherit">
              Contact Us
            </Link>{" "}
            |
            <Link href="#" color="inherit">
              Request a Demo
            </Link>
          </Typography>
          <Typography variant="body2" align="center" mt={2}>
            &copy; {new Date().getFullYear()} Eco Lumen – Guiding the way to
            sustainable success in Gilgit-Baltistan.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Landing;
