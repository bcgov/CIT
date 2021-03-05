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
}) {
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });
  const parcelPoly = useSelector(
    (state) => state.opportunity.siteInfo.geometry.polygon
  );

  let additionalComponents;
  let zoomLevel;

  const changeView = (centerCoords) => centerCoords;

  // geometry returned to us is an array of arrays with Long, Lat
  // leaflet needs [lat, long]
  const convert = (lngLatAry) => {
    const converted = lngLatAry.map((polyCoords) => [
      polyCoords[1],
      polyCoords[0],
    ]);
    return converted;
  };

  if (isInteractive) {
    // Used in the add opportunity workflow
    additionalComponents = (
      <>
        <ChangeView center={changeView(coords)} zoom={16} />
        <AddLocationMarker
          setCoords={setCoords}
          setAddress={setAddress}
          resourceIds={resourceIds}
          setNearbyResources={setNearbyResources}
          changeView={changeView}
        />
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
          <LayersControl.Overlay name="Crown Tenures">
            <WMSTileLayer
              version="1.3.0"
              transparent="true"
              format="image/png"
              layers="pub:WHSE_TANTALIS.TA_CROWN_TENURES_SVW"
              url="https://openmaps.gov.bc.ca/geo/pub/WHSE_TANTALIS.TA_CROWN_TENURES_SVW/ows"
            />
          </LayersControl.Overlay>
        </LayersControl>
        {parcelPoly && (
          <Polygon
            pathOptions={{ color: "rgb(255, 0, 128)" }}
            positions={convert(parcelPoly)}
          />
        )}
        {coords[0] !== 49.2827 ? (
          <Marker position={coords}>
            <Popup>
              Lat: {coords[0]} Long: {coords[1]}
            </Popup>
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
    zoomLevel = 2;
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
      {additionalComponents}
    </MapContainer>
  );
}

Map.defaultProps = {
  isInteractive: true,
  nearbyResources: null,
  resourceIds: {},
  setNearbyResources: () => {},
  setCoords: () => {},
  setAddress: () => {},
};

Map.propTypes = {
  coords: PropTypes.arrayOf(PropTypes.number).isRequired,
  isInteractive: PropTypes.bool,
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
};
