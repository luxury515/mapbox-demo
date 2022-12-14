import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import "./BaseMap.css";
mapboxgl.accessToken = process.env.REACT_APP_TOKEN;
//   "pk.eyJ1IjoiYmxha2VjaGFlIiwiYSI6ImNsNmQwdHpuYjB4ZmgzY3FsbW51OHJlNXUifQ.GN-IGEGZlAwbwWswdQC13g";

const BaseMap = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(127.018);
  const [lat, setLat] = useState(37.5198);
  const [zoom, setZoom] = useState(10);
  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });
    // - , + 버튼 추가
    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");
  });
  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
    // return () => map.current.remove();
  });
  return (
    <div>
      <div className="sidebar">
        경도: {lng} | 위도: {lat} | 사이즈: {zoom}
      </div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
};

export default BaseMap;
