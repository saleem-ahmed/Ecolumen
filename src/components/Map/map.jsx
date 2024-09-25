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

import Map3D from "../../pages/organisation/dashPages/cesiumMap"; // Adjust this import path as needed
import lulc_2021 from "../../json/LULC_2021.json";
import lulc_2010 from "../../json/LULC_2010.json";

const ITEM_HEIGHT = 48;
const EditOptions = ["Option 1", "Option 2", "Option 3"];

const Map = () => {
  const mapRef = useRef(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [is3D, setIs3D] = useState(false);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleToggle3D = (value) => {
    setIs3D(value);
  };

  useEffect(() => {
    if (!is3D) {
      // Initialize 2D map if it's not already created
      if (!mapRef.current) {
        const map = L.map("map").setView([35.920834, 74.308334], 12);
        mapRef.current = map;

        L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        const legend = L.control({ position: "bottomleft" });

        legend.onAdd = function () {
          const div = L.DomUtil.create("div", "info legend");
          div.style.backgroundColor = "white";
          div.style.padding = "10px";
          div.style.borderRadius = "5px";
          div.innerHTML = `
            <h4>Legend</h4>
            <div><span style="background: green; width: 18px; height: 18px; display: inline-block;"></span> Forest Area</div>
            <div><span style="background: blue; width: 18px; height: 18px; display: inline-block;"></span> Water Body</div>
            <div><span style="background: orange; width: 18px; height: 18px; display: inline-block;"></span> Agriculture</div>
            <div><span style="background: gray; width: 18px; height: 18px; display: inline-block;"></span> Urban</div>
            <div><span style="background: yellow; width: 18px; height: 18px; display: inline-block;"></span> Barren</div>
            <div><span style="background: lightgreen; width: 18px; height: 18px; display: inline-block;"></span> Grassland</div>
            <div><span style="background: purple; width: 18px; height: 18px; display: inline-block;"></span> Wetlands</div>
            <div><span style="background: red; width: 18px; height: 18px; display: inline-block;"></span> Industrial</div>
          `;
          return div;
        };

        legend.addTo(map);

        const getStyle = (category) => {
          const styles = {
            Forest: { color: "green", fillColor: "green" },
            Water: { color: "blue", fillColor: "blue" },
            Agriculture: { color: "orange", fillColor: "orange" },
            Urban: { color: "gray", fillColor: "gray" },
            Barren: { color: "yellow", fillColor: "yellow" },
            Grassland: { color: "lightgreen", fillColor: "lightgreen" },
            Wetlands: { color: "purple", fillColor: "purple" },
            Industrial: { color: "red", fillColor: "red" },
          };
          return {
            ...styles[category] || { color: "black" },
            weight: 2,
            fillOpacity: 0.5,
          };
        };

        const lulc2010Layer = L.geoJSON(lulc_2010, {
          style: (feature) => getStyle(feature.properties?.land_use_category),
          pointToLayer: (feature, latlng) => L.circleMarker(latlng),
        }).addTo(map);

        const lulc2021Layer = L.geoJSON(lulc_2021, {
          style: (feature) => getStyle(feature.properties?.land_use_category),
          pointToLayer: (feature, latlng) => L.circleMarker(latlng),
        }).addTo(map);

        const overlays = {
          "LULC 2010": lulc2010Layer,
          "LULC 2021": lulc2021Layer,
        };

        L.control.layers(null, overlays).addTo(map);
      }
    } else {
      // Cleanup function when switching to 3D
      if (mapRef.current) {
        mapRef.current.remove(); // Remove the 2D map
        mapRef.current = null; // Reset the reference
      }
    }
  }, [is3D]);

  return (
    <Box sx={{ height: "100%", display: 'flex', flexDirection: 'column' }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{ padding: '10px', backgroundColor: '#f5f5f5', zIndex: 1000 }}
      >
        <ButtonGroup variant="contained" aria-label="view toggle">
          <Button
            variant={!is3D ? "contained" : "outlined"}
            onClick={() => handleToggle3D(false)}
          >
            2D
          </Button>
          <Button
            variant={is3D ? "contained" : "outlined"}
            onClick={() => handleToggle3D(true)}
          >
            3D
          </Button>
        </ButtonGroup>
        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls={open ? "long-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreHorizIcon />
        </IconButton>
        <Menu
          id="long-menu"
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
            <MenuItem key={option} onClick={handleClose}>
              {option}
            </MenuItem>
          ))}
        </Menu>
      </Box>
      <Divider />
      <Box sx={{ flexGrow: 1, position: 'relative' }}>
        {!is3D ? (
          <div id="map" style={{ width: "100%", height: "100%" }}></div>
        ) : (
          <Map3D is3D={is3D} onToggle3D={handleToggle3D} />
        )}
      </Box>
    </Box>
  );
};

export default Map;
