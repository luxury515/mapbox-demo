import React from "react";
import Map, { GeolocateControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
const MyMap = () => {
  return (
    <div>
      <Map
        mapboxAccessToken="pk.eyJ1IjoiYmxha2VjaGFlIiwiYSI6ImNsNmQwdHpuYjB4ZmgzY3FsbW51OHJlNXUifQ.GN-IGEGZlAwbwWswdQC13g
        "
        initialViewState={{
          longitude: -100,
          latitude: 40,
          zoom: 3.5,
        }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      >
        <GeolocateControl
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
        />
      </Map>
    </div>
  );
};

export default MyMap;
