import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import geoJson from "../../../data/chicago-parks.json";
import "../symbolmap/SymbolMap.css";
import axios from "axios";
mapboxgl.accessToken = process.env.REACT_APP_TOKEN;
const SymbolMap = () => {
  const mapContainerRef = useRef(null);

  const jsonMapData = {
    features: [],
  };
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
        const objfeatures = {
          type: "Feature",
          properties: {
            title: "",
            description: "",
          },
          geometry: {
            coordinates: [],
            type: "Point",
          },
        };
        objfeatures.properties.title = item.name;
        objfeatures.geometry.coordinates[0] = parseFloat(item.lng);
        objfeatures.geometry.coordinates[1] = parseFloat(item.lat);

        jsonMapData.features.push(objfeatures);
      });
      console.log("jsonMapData", jsonMapData.features);
    })
    .catch(function (response) {
      //에러
      console.log(response);
    });
  // + , - 버튼 추가
  // 맵 초기화
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      // center: [-87.65, 41.84],
      center: [127.018, 37.5198], // lng , lat
      zoom: 4,
    });
    map.addControl(new mapboxgl.NavigationControl(), "top-right");
    map.on("load", function () {
      // 아이콘 등록
      map.loadImage(
        "https://img.icons8.com/color/48/000000/marker--v1.png",
        // __filename + "/icons8.gif",
        function (error, image) {
          if (error) throw error;
          map.addImage("custom-marker", image);
          // json 데이터 로딩
          map.addSource("points", {
            type: "geojson",
            data: {
              type: "FeatureCollection",
              features: geoJson.features,
              // features: jsonMapData.features,
            },
          });
          // Add a symbol layer
          map.addLayer({
            id: "points",
            type: "symbol",
            source: "points",
            layout: {
              "icon-image": "custom-marker",
              // get the title name from the source's "title" property
              "text-field": ["get", "title"],
              "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
              "text-offset": [0, 1.25],
              "text-anchor": "top",
            },
          });
        }
      );
    });

    return () => map.remove();
  }, []);

  return <div className="map-container" ref={mapContainerRef} />;
};

export default SymbolMap;
