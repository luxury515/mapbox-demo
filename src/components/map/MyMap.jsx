import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import "./MyMap.css";
import geoJson from "../../data/chicago-parks.json";
import Tooltip from "../Tooltip";
import ReactDOM from "react-dom/client";
mapboxgl.accessToken =
  "pk.eyJ1IjoiYmxha2VjaGFlIiwiYSI6ImNsNmQwdHpuYjB4ZmgzY3FsbW51OHJlNXUifQ.GN-IGEGZlAwbwWswdQC13g";

const MyMap = () => {
  const mapContainer = useRef(null);
  const tooltipRef = useRef(new mapboxgl.Popup({ offset: 15 }));
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
    geoJson.features.map((feature) =>
      new mapboxgl.Marker()
        .setLngLat(feature.geometry.coordinates)
        .addTo(map.current)
    );
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
    map.current.on("mouseenter", (e) => {
      if (e.features.length) {
        map.current.getCanvas().style.cursor = "pointer";
      }
    });
    map.current.on("mouseleave", () => {
      map.current.getCanvas().style.cursor = "";
    });
    map.current.on("mousemove", (e) => {
      const features = map.current.queryRenderedFeatures(e.point);
      if (features.length) {
        const feature = features[0];

        // Create tooltip node

        const toolTipDiv = document.getElementById("div");
        const div = ReactDOM.createRoot(toolTipDiv);
        div.render(<Tooltip feature={feature} />);

        // Set tooltip on map
        tooltipRef.current
          .setLngLat(e.lngLat)
          .setDOMContent(toolTipDiv)
          .addTo(map.current);
      }
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div>
      <div className="sidebar">
        경도: {lng} | 위도: {lat} | 사이즈: {zoom}
      </div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
};

export default MyMap;
