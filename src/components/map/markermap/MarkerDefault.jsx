import React, { useRef, useEffect } from "react";
import axios from "axios";
import mapboxgl from "mapbox-gl";
// import geoJson from "../../../data/chicago-parks.json";
import "../markermap/MarkerDefault.css";
mapboxgl
.accessToken = process.env.REACT_APP_TOKEN;
          const MarkerDefault = () => {
  const mapContainerRef = useRef(null);

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [127.018, 37.5198],
      zoom: 5,
    });
    const formData = new FormData();
    formData.append("c", "KR");
    axios({
      method: "post",
      url: "/maritime/ports-map/",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then(function (response) {
        //성공
        const arr = response.data.cports;

        arr.forEach(function (item, index) {
          const coordinates = [];

          coordinates[0] = parseFloat(item.lng);
          coordinates[1] = parseFloat(item.lat);

          new mapboxgl.Marker({ color: "#f03e3e", draggable: true })
            .setLngLat(coordinates)
            .setPopup(new mapboxgl.Popup().setHTML(`<h1>${item.name}</h1>`))
            .addTo(map);
        });
      })
      .catch(function (response) {
        //에러
        console.log(response);
      });

    // Add navigation control (the +/- zoom buttons)
    map
    .addControl(new mapboxgl.NavigationControl(), "top-right");

    // Clean up on unmount
    // return () => map.remove();
  }, []);

  return(
    <>
      <div className="map-container" ref={mapContainerRef} />
    </>
  );
  
};

export default MarkerDefault;
