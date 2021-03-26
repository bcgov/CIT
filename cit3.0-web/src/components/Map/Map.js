import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  MapConsumer,
  LayersControl,
  WMSTileLayer,
  Polygon,
} from "react-leaflet";

import L from "leaflet";

import "./map.css";
import { useSelector } from "react-redux";
import proj4 from "proj4";
import ChangeView from "../ChangeView/ChangeView";
import AddLocationMarker from "../AddMarker/AddMarker";
import ResourceMarker from "../AddMarker/ResourceMarker";

/* eslint-disable no-unused-vars */
export default function Map({
  nearbyResources,
  coords,
  setCoords,
  resourceIds,
  setNearbyResources,
  setAddress,
  isInteractive,
  isSearchMode,
  setError,
  setNoAddressFlag,
}) {
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });
  const parcelPoly = useSelector(
    (state) => state.opportunity.siteInfo.geometry.coordinates
  );
  const address = useSelector((state) => state.opportunity.address);

  let additionalComponents;
  let searchComponents;
  let zoomLevel;

  const changeView = (centerCoords) => centerCoords;

  // convert long/lat in 3005 to lat/long in 4326 to draw polygon
  const convert = (lngLatAry) => {
    const defString =
      "+proj=aea +lat_1=50 +lat_2=58.5 +lat_0=45 +lon_0=-126 +x_0=1000000 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs";
    proj4.defs("EPSG:3005", defString);
    const full = lngLatAry.map((poly) =>
      poly.map((polyCoords) => {
        const converted = proj4(
          proj4("EPSG:3005"),
          proj4("EPSG:4326"),
          polyCoords
        );
        return [converted[1], converted[0]];
      })
    );
    return (
      <Polygon pathOptions={{ color: "rgb(255, 0, 128)" }} positions={full} />
    );
  };

  if (isSearchMode) {
    searchComponents = (
      <AddLocationMarker
        setCoords={setCoords}
        setAddress={setAddress}
        resourceIds={resourceIds}
        setNearbyResources={setNearbyResources}
        changeView={changeView}
        setError={setError}
        setNoAddressFlag={setNoAddressFlag}
      />
    );
  }

  if (isInteractive) {
    // Used in the add opportunity workflow
    additionalComponents = (
      <>
        <ChangeView center={changeView(coords)} zoom={16} />
        <LayersControl position="bottomleft">
          <LayersControl.BaseLayer checked name="OpenStreetMap">
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>

          <LayersControl.BaseLayer name="Satellite">
            <TileLayer
              attribution='&copy; <a href="http://www.esri.com/">Esri</a> contributors'
              url="http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            />
          </LayersControl.BaseLayer>

          <LayersControl.Overlay name="Parcels">
            <WMSTileLayer
              version="1.3.0"
              transparent="true"
              crs={L.CRS.EPSG3857}
              format="image/png"
              layers="pub:WHSE_CADASTRE.PMBC_PARCEL_FABRIC_POLY_SVW"
              url="https://openmaps.gov.bc.ca/geo/pub/WHSE_CADASTRE.PMBC_PARCEL_FABRIC_POLY_SVW/ows"
            />
          </LayersControl.Overlay>
        </LayersControl>
        {parcelPoly && convert(parcelPoly)}
        {coords[0] !== 54.1722 ? (
          <Marker position={coords}>
            <Popup>{address || null}</Popup>
          </Marker>
        ) : null}
        {JSON.stringify(nearbyResources) !== "{}"
          ? Object.entries(nearbyResources).map(([resource, resourceData]) => (
              <ResourceMarker
                key={resource}
                resourceName={resource}
                resources={resourceData}
              />
            ))
          : null}
      </>
    );
    zoomLevel = 5; // do not change!
  } else {
    // Used in the list view of opportunities
    additionalComponents = (
      <>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={coords} />
      </>
    );
    zoomLevel = 13;
  }

  const handleResize = () => {
    setDimensions({
      height: window.innerHeight,
      width: window.innerWidth,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  return (
    <MapContainer
      center={coords}
      zoom={zoomLevel}
      scrollWheelZoom={isInteractive}
      zoomControl={isInteractive}
      attributionControl={isInteractive}
      fadeAnimation={isInteractive}
      zoomAnimation={isInteractive}
      doubleClickZoom={isInteractive}
      dragging={isInteractive}
      zoomSnap={isInteractive}
      zoomDelta={isInteractive}
      trackResize={isInteractive}
      touchZoom={isInteractive}
      style={{ width: "100%", height: "100%" }}
    >
      <MapConsumer>
        {(localMap) => {
          // Extend tile sizing to fix white borders on map
          /* eslint-disable */
          localMap.invalidateSize();
          const originalInitTile = L.GridLayer.prototype._initTile;
          L.GridLayer.include({
            _initTile(tile) {
              originalInitTile.call(this, tile);

              const tileSize = this.getTileSize();

              tile.style.width = `${tileSize.x + 1}px`;
              tile.style.height = `${tileSize.y + 1}px`;
            },
          });
          return null;
        }}
      </MapConsumer>
      {searchComponents}
      {additionalComponents}
    </MapContainer>
  );
}

Map.defaultProps = {
  isInteractive: true,
  isSearchMode: true,
  nearbyResources: null,
  resourceIds: {},
  setNearbyResources: () => {},
  setCoords: () => {},
  setAddress: () => {},
  setError: () => {},
  setNoAddressFlag: () => {},
};

Map.propTypes = {
  coords: PropTypes.arrayOf(PropTypes.number).isRequired,
  isInteractive: PropTypes.bool,
  isSearchMode: PropTypes.bool,
  nearbyResources: PropTypes.shape({
    resource: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.shape),
  }),
  resourceIds: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string,
  }),
  setNearbyResources: PropTypes.func,
  setCoords: PropTypes.func,
  setAddress: PropTypes.func,
  setError: PropTypes.func,
  setNoAddressFlag: PropTypes.func,
};
