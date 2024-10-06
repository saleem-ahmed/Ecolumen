import React, { useEffect, useRef, useState } from 'react';
import '../../Cesium/Cesium/Widgets/widgets.css';
// public\Cesium\Cesium\Widgets\widgets.css
import { Cartesian3, Color, HeadingPitchRange, createOsmBuildingsAsync, GeoJsonDataSource, Ion, Math as CesiumMath, Viewer } from 'cesium';

// The URL on your server where CesiumJS's static files are hosted.
window.CESIUM_BASE_URL = '/Cesium/Cesium/';

Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmNTMwNmVhNC1hZThkLTQ4YTgtOWJkNi0xMGMxMTZmZTFiYjIiLCJpZCI6MjM4NzM2LCJpYXQiOjE3MjUzMzc0MzF9.AP46QzG-26l86gIcmcKYKDAc0MdbI1yM3eWJMew8prs';

const CesiumMap = () => {
  const cesiumContainerRef = useRef(null);
  const viewerRef = useRef(null); // Ref to store the Cesium Viewer instance

  // Refs to store GeoJSON layers for 2010 and 2021
  const geoJsonLayer2021Ref = useRef(null);
  const geoJsonLayer2010Ref = useRef(null);

  // State to manage which layers are visible
  const [visibleLayers, setVisibleLayers] = useState({
    LULC_2021: true, // 2021 layer initially visible
    LULC_2010: false // 2010 layer initially hidden
  });

  // Function to load GeoJSON data as layers
  const loadGeoJsonLayer = async (url, fillColor, strokeColor) => {
    try {
      const dataSource = await GeoJsonDataSource.load(url, {
        stroke: Color.fromCssColorString(strokeColor),  // Custom stroke color
        fill: fillColor,                               // Custom fill color
        strokeWidth: 2,
        clampToGround: true
      });

      // Apply a height offset to "float" the data slightly above ground
      const entities = dataSource.entities.values;
      entities.forEach(entity => {
        if (entity.polygon) {
          entity.polygon.height = 10;  // Offset the height by 10 meters above the terrain
        }
      });

      return dataSource; // Return the dataSource object to control visibility later
    } catch (error) {
      console.error('Error loading GeoJSON:', error.message || error);
      return null;
    }
  };

  useEffect(() => {
    if (cesiumContainerRef.current && !viewerRef.current) {
      // Initialize the Cesium Viewer only if it doesn't already exist
      viewerRef.current = new Viewer(cesiumContainerRef.current, {
        terrainProvider: undefined,
      });

      // Fly the camera to a specified location (e.g., some location)
      viewerRef.current.camera.flyTo({
        destination: Cartesian3.fromDegrees(73.13189, 36.1560, 1500),
        orientation: {
          heading: CesiumMath.toRadians(0.0),
          pitch: CesiumMath.toRadians(-50.0),
        }
      });

      // Add OSM buildings
      createOsmBuildingsAsync().then(buildingTileset => {
        viewerRef.current.scene.primitives.add(buildingTileset);
      }).catch(error => {
        console.error('Error loading OSM buildings:', error);
      });

      // Load the 2021 GeoJSON layer
      loadGeoJsonLayer(
        '../../public/json/LULC_2021.json',
        Color.fromCssColorString('#1C1E42').withAlpha(0.5), // Color for 2021
        '#00FF00' // Stroke color for 2021
      ).then(dataSource => {
        geoJsonLayer2021Ref.current = dataSource; // Store 2021 layer reference
        viewerRef.current.dataSources.add(dataSource);
      });

      // Load the 2010 GeoJSON layer (initially hidden)
      loadGeoJsonLayer(
        '../../json/LULC_2010.json',
        Color.fromCssColorString('#FF5733').withAlpha(0.5), // Color for 2010 (reddish)
        '#FF0000' // Stroke color for 2010
      ).then(dataSource => {
        geoJsonLayer2010Ref.current = dataSource; // Store 2010 layer reference
        viewerRef.current.dataSources.add(dataSource);
        dataSource.show = false; // Initially hide the 2010 layer
      });
    }
  }, []);

  // Function to handle layer visibility changes
  const handleLayerToggle = (layer) => {
    setVisibleLayers((prevState) => {
      const updatedState = { ...prevState, [layer]: !prevState[layer] };

      // Update the visibility of the layers on the map
      if (geoJsonLayer2021Ref.current && layer === 'LULC_2021') {
        geoJsonLayer2021Ref.current.show = updatedState.LULC_2021;
      }
      if (geoJsonLayer2010Ref.current && layer === 'LULC_2010') {
        geoJsonLayer2010Ref.current.show = updatedState.LULC_2010;
      }

      return updatedState;
    });
  };

  return (
    <div>
      {/* Dropdown for selecting layers */}
      <div style={{ marginBottom: '10px' }}>
        <label style={{ marginLeft: '20px'  }}>
          <input
            type="checkbox"
            checked={visibleLayers.LULC_2021}
            onChange={() => handleLayerToggle('LULC_2021')}
          />
          Show 2021 Layer
        </label>
        <label style={{ marginLeft: '10px' }}>
          <input
            type="checkbox"
            checked={visibleLayers.LULC_2010}
            onChange={() => handleLayerToggle('LULC_2010')}
          />
          Show 2010 Layer
        </label>
      </div>

      {/* Cesium map container */}
      <div
        id="cesiumContainer"
        ref={cesiumContainerRef}
        style={{ width: '100%', height: '70vh', borderRadius: '10px' }}
      />
    </div>
  );
};

export default CesiumMap;