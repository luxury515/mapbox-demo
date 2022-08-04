import React, { useRef, useEffect } from "react";
import ReactDOM from "react-dom/client";
import Tooltip from "../tooltip/Tooltip";
import "./ToolTipMap.css";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = process.env.REACT_APP_TOKEN;
const ToolTipMap = () => {
  const mapContainerRef = useRef(null);
  const tooltipRef = useRef(new mapboxgl.Popup({ offset: 15 }));
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-79.38, 43.65],
      zoom: 12.5,
    });
    map.addControl(new mapboxgl.NavigationControl(), "top-right");
    // change cursor to pointer when user hovers over a clickable feature
    map.on("mouseenter", (e) => {
      if (e.features.length) {
        map.getCanvas().style.cursor = "pointer";
      }
    });

    // reset cursor to default when user is no longer hovering over a clickable feature
    map.on("mouseleave", () => {
      map.getCanvas().style.cursor = "";
    });

    // add tooltip when users mouse move over a point
    map.on("mousemove", (e) => {
      const features = map.queryRenderedFeatures(e.point);
      if (features.length) {
        const feature = features[0];

        // Create tooltip node
        const tooltipNode = document.createElement("div");
        const root = ReactDOM.createRoot(tooltipNode);
        root.render(<Tooltip feature={feature} />);

        // Set tooltip on map
        tooltipRef.current
          .setLngLat(e.lngLat)
          .setDOMContent(tooltipNode)
          .addTo(map);
      }
    });

    // Clean up on unmount
    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div>
      <div className="map-container" ref={mapContainerRef} />
    </div>
  );
};

export default ToolTipMap;
