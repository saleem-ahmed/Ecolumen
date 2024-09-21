import React, { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-side-by-side";

import {
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  ButtonGroup,
  Button,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import lulc_2021 from "../../json/LULC_2021.json";
import lulc_2010 from "../../json/LULC_2010.json"; // Corrected import

const ITEM_HEIGHT = 48;
const EditOptions = ["Option 1", "Option 2", "Option 3"];

const Map = () => {
  const mapRef = useRef(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (!mapRef.current) {
      // Initialize the map only once
      const map = L.map("map").setView([35.920834, 74.308334], 12);
      mapRef.current = map;

      // Add OpenStreetMap layer
      L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // Add legend
      const legend = L.control({ position: "bottomleft" });

      legend.onAdd = function (map) {
        const div = L.DomUtil.create("div", "info legend");
        div.style.backgroundColor = "white";
        div.style.padding = "10px 10px";
        div.style.borderRadius = "10px";
        div.style.width = "100px";
        div.innerHTML = `
          <h4>Legend</h4>
          <i style="background: green; width: 18px; height: 18px; display: inline-block;"></i> Forest Area<br>
          <i style="background: blue; width: 18px; height: 18px; display: inline-block;"></i> Water Body<br>
          <i style="background: orange; width: 18px; height: 18px; display: inline-block;"></i> Agriculture<br>
          <i style="background: gray; width: 18px; height: 18px; display: inline-block;"></i> Urban<br>
          <i style="background: yellow; width: 18px; height: 18px; display: inline-block;"></i> Barren<br>
          <i style="background: lightgreen; width: 18px; height: 18px; display: inline-block;"></i> Grassland<br>
          <i style="background: purple; width: 18px; height: 18px; display: inline-block;"></i> Wetlands<br>
          <i style="background: red; width: 18px; height: 18px; display: inline-block;"></i> Industrial<br>
        `;
        return div;
      };

      legend.addTo(map);

      // Function to get the style based on the land use category
      const getStyle = (category) => {
        switch (category) {
          case "Forest":
            return { color: "green", weight: 2, fillColor: "green", fillOpacity: 0.5 };
          case "Water":
            return { color: "blue", weight: 2, fillColor: "blue", fillOpacity: 0.5 };
          case "Agriculture":
            return { color: "orange", weight: 2, fillColor: "orange", fillOpacity: 0.5 };
          case "Urban":
            return { color: "gray", weight: 2, fillColor: "gray", fillOpacity: 0.5 };
          case "Barren":
            return { color: "yellow", weight: 2, fillColor: "yellow", fillOpacity: 0.5 };
          case "Grassland":
            return { color: "lightgreen", weight: 2, fillColor: "lightgreen", fillOpacity: 0.5 };
          case "Wetlands":
            return { color: "purple", weight: 2, fillColor: "purple", fillOpacity: 0.5 };
          case "Industrial":
            return { color: "red", weight: 2, fillColor: "red", fillOpacity: 0.5 };
          default:
            return { color: "black", weight: 2 };
        }
      };

      // LULC 2010 Layer
      const lulc2010Layer = L.geoJSON(lulc_2010, {
        style: (feature) => {
          console.log("2010 feature:", feature);
          const category = feature.properties?.land_use_category;
          console.log("2010 feature category:", category);
          return getStyle(category);
        },
        pointToLayer: (feature, latlng) => L.circleMarker(latlng),
      }).addTo(map);

      // LULC 2021 Layer
      const lulc2021Layer = L.geoJSON(lulc_2021, {
        style: (feature) => {
          console.log("2021 feature:", feature);
          const category = feature.properties?.land_use_category;
          console.log("2021 feature category:", category);
          return getStyle(category);
        },
        pointToLayer: (feature, latlng) => L.circleMarker(latlng),
      }).addTo(map);

      // Control to toggle layers
      const overlays = {
        "LULC 2010": lulc2010Layer,
        "LULC 2021": lulc2021Layer,
      };

      L.control.layers(null, overlays).addTo(map);
    }
  }, []);

  return (
    <>
      {/* map section */}
      <Box sx={{ height: "100%" }}>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <ButtonGroup variant="contained" aria-label="Basic button group">
            <Button variant="contained" href="#">
              2D
            </Button>
            <Button
              variant="contained"
              sx={{ background: "white", color: "black" }}
              href="map-3d"
            >
              3D
            </Button>
          </ButtonGroup>
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
        <Box sx={{ height: "70vh" }}>
          <div id="map" style={{ width: "100%", height: "100%" }}></div>
        </Box>
      </Box>
    </>
  );
};

export default Map;
