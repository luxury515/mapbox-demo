import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BaseMap from "components/map/basemap/BaseMap";
import SymbolMap from "components/map/symbolmap/SymbolMap";
import ToolTipMap from "components/map/tooltip/ToolTipMap";
import GeoCoderMap from "components/map/geocodermap/GeoCoderMap";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="1" element={<BaseMap />} />
        <Route path="2" element={<ToolTipMap />} />
        <Route path="3" element={<SymbolMap />} />
        <Route path="4" element={<GeoCoderMap />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
