// import SymbolMap from "components/map/symbolmap/SymbolMap";
import BaseMap from "components/map/basemap/BaseMap";
import GeoCoderMap from "components/map/geocodermap/GeoCoderMap";
import SymbolMap from "components/map/symbolmap/SymbolMap";
import ToolTipMap from "components/map/tooltip/ToolTipMap";
import { Link, Outlet } from "react-router-dom";
import "./App.css";
// import BaseMap from "./components/map/basemap/BaseMap";
// import ToolTipMap from "./components/map/tooltip/ToolTipMap";

function App() {
  return (
    <>
      <div>
        home 경로 입니다.
        <nav>
          <Link to="/1">
            <BaseMap />
          </Link>
          <Link to="/2">
            <SymbolMap />
          </Link>
          <Link to="/3">
            <ToolTipMap />
          </Link>
          <Link to="/4">
            <GeoCoderMap />
          </Link>
        </nav>
        <Outlet />
      </div>
    </>
  );
}

export default App;
