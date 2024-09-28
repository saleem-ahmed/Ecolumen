import React from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Box,
} from "@mui/material";
import img1 from "../../../assets/aftab.jpeg";
import img2 from "../../../assets/izimam.jpeg";
import img3 from "../../../assets/kalim.png";
import img4 from "../../../assets/shah.jpg";
import img5 from "../../../assets/ahmed.jpg";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/navigation";

const About = () => {
  const testimonials = [
    {
      img: img1,
      name: "Dr Aftab Ahmed Khan",
      feedback: "Supervisor of this Project",
    },
    {
      img: img2,
      name: "Inzimam Baig",
      feedback: "CO-Supervisor of this Project",
    },
    {
      img: img3,
      name: "Kalim Hussain",
      feedback: "Designer",
    },
    {
      img: img4,
      name: "Shah Nawaz",
      feedback: "Backend Developer",
    },
    {
      img: img5,
      name: "Ahmed Saleem",
      feedback: "Frontend Developer",
    },
    {
      img: img1,
      name: "Dr Aftab Ahmed Khan",
      feedback: "Supervisor of this Project",
    },
    {
      img: img2,
      name: "Inzimam Baig",
      feedback: "CO-Supervisor of this Project",
    },
    {
      img: img3,
      name: "Kalim Hussain",
      feedback: "Designer",
    },
    {
      img: img4,
      name: "Shah Nawaz",
      feedback: "Backend Developer",
    },
    {
      img: img5,
      name: "Ahmed Saleem",
      feedback: "Frontend Developer",
    },
  ];

  return (
    <>
      <Grid container>
        <Box>
          <Box
            sx={{ background: "#ffffff", borderRadius: "16px", py: 2, mb: 2 }}
          >
            <Typography
              variant="h2"
              sx={{ bgcolor: "#ecf2fd", textAlign: "center" }}
            >
              Regional Web GIS Portal for Hazard Assessment and Natural Resource
              Management in Gilgit-Baltistan
            </Typography>
          </Box>
          <Box sx={{ background: "#ffffff", borderRadius: "16px", py: 2 }}>
            <Typography
              variant="h2"
              sx={{ bgcolor: "#ecf2fd", mb: 2, textAlign: "center" }}
            >
              Introduction
            </Typography>
            <Typography varient="body1" sx={{ textAlign: "center" }}>
              A Regional web-based GIS platform meant to efficiently perform
              hazard assessment and natural resource management shall be the
              proposed project. It would be able to serve different stakeholders
              like agencies of government, non-governmental organizations,
              researchers, and the publics with real-time geospatial data
              visualization and analysis tools. It combines data from various
              sources: real-time feeds, historical records, and satellite
              imagery, where a user can evaluate risks from floods, earthquakes,
              landslides, and so on.
            </Typography>
          </Box>
          <Box
            sx={{ background: "#ffffff", borderRadius: "16px", py: 2, my: 2 }}
          >
            <Typography
              variant="h2"
              sx={{ bgcolor: "#ecf2fd", mb: 2, textAlign: "center" }}
            >
              Problem Statement
            </Typography>
            <Typography varient="body1" sx={{ textAlign: "center" }}>
              Probably, managing natural hazards and resources, especially in
              many regions, entails the disposal of fragmented data sources and
              communicating in an inefficient manner among stakeholders. More
              than anything else, climate change has made inept 4 preparedness
              and response efforts increase in frequency and severity. The
              proposed Regional Web GIS Portal addresses the above challenges
              with a centralized platform, reflecting geospatial data real-time
              visualization, hazard assessment, and resource management. This
              system facilitates disaster response, promotes sustainable
              resource management, and fosters collaboration among regional
              stakeholders-including government agencies, NGOs, researchers, and
              other lay people
            </Typography>
          </Box>
          <Box
            sx={{ background: "#ffffff", borderRadius: "16px", py: 2, my: 2 }}
          >
            <Typography
              variant="h2"
              sx={{ bgcolor: "#ecf2fd", mb: 2, textAlign: "center" }}
            >
              Project Overview
            </Typography>
            <Typography varient="body1" sx={{ textAlign: "center" }}>
              The proposed regional web GIS portal for hazard assessment and
              natural resource management will help simplify and streamline
              processes engaged both in disaster risk assessment and
              environmental resource management. It provides an all-inclusive,
              user-friendly interface where access and extraction of these data
              are possible in real-time for visualization geospatially through
              analyses by all stakeholders. The portal integrates multiple data
              sources regarding real-time hazard data, satellite imagery, and
              historical records to help users assess the risks associated with
              floods, earthquakes, and landslides. It further supports
              management of resources sustainably since it provides them with
              information on the different land uses, vegetation cover, water
              resources, and biodiversity. This system has prioritized sharing
              data among stakeholders through collaboration to enhance decision
              making and response by the end-users. 2 This project aims at
              strengthening decision making by centralizing key data and
              enabling proactive hazard mitigation and resource conservation
              that fosters better preparedness and sustainability globally.
            </Typography>
          </Box>
          <Box sx={{ background: "#ffffff", borderRadius: "16px", p: 2 }}>
            <Typography
              variant="h2"
              sx={{ bgcolor: "#ecf2fd", mb: 2, textAlign: "center" }}
            >
              Project Motivation
            </Typography>
            <Typography varient="body1" sx={{ textAlign: "center" }}>
              Natural disasters, increasing with the surge of climate change,
              cannot be ignored without designing a centralized framework to
              estimate risks, mitigate hazards, and utilize natural resources in
              a sustainable manner. This research is provoked by the development
              of accessible and real-time geospatial platforms through which
              global stakeholders-governments, NGOs, and researchers-can
              collaborate effectively to avert disasters. This project is aimed
              at creating a common tool for proactive disaster management and
              sustainable resource planning in order to minimize the risks and
              improve the decision-making processes
            </Typography>
          </Box>
        </Box>
        <Container>
          <Box
            sx={{ background: "#ffffff", borderRadius: "16px", py: 2, my: 2 }}
          >
            <Typography
              variant="h2"
              sx={{ bgcolor: "#ecf2fd", textAlign: "center" }}
            >
              Our Team
            </Typography>
          </Box>
          <Swiper
            pagination={true}
            autoplay={{
              delay: 5500,
              disableOnInteraction: false,
            }}
            effect={"fade"}
            spaceBetween={20}
            slidesPerView={3}
            loop={true}
            modules={[Pagination, Autoplay, Navigation]}
            className="mySwiper"
            style={{ height: "100%" }}
          >
            {testimonials.map((card) => (
              <SwiperSlide>
                <Card sx={{ borderRadius: "16px" }}>
                  <CardContent sx={{ height: "100%", my: 2 }}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "20px",
                      }}
                      mb={2}
                    >
                      <img
                        src={card.img}
                        alt={card.name}
                        style={{
                          borderRadius: "50%",
                          height: "180px",
                          width: "180px",
                        }}
                      />
                      <Box ml={2}>
                        <Typography variant="h5">{card.name}</Typography>
                      </Box>
                    </Box>
                    <Typography variant="body1" sx={{ textAlign: "center" }}>
                      {card.feedback}
                    </Typography>
                  </CardContent>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        </Container>
        <Box
          component="footer"
          mt={5}
          py={3}
          bgcolor="primary.main"
          color="white"
        >
          <Typography variant="body1" align="center">
            Ecolumen All Right Reserved.© 2024
          </Typography>

          <Typography variant="body2" align="center" mt={2}>
            &copy; {new Date().getFullYear()} Eco Lumen – Guiding the way to
            sustainable success in Gilgit-Baltistan.
          </Typography>
        </Box>
      </Grid>
    </>
  );
};
export default About;
