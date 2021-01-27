import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
// import { Icon } from "leaflet";
import "./map.css";
import { useState } from "react";
import ChangeView from "../ChangeView/ChangeView";
import AddLocationMarker from "../AddMarker/AddMarker";

export default function Map(props) {
  return (
    <MapContainer
      center={props.coords}
      zoom={16}
      scrollWheelZoom
      style={{ width: "100%", height: "100%" }}
    >
      <ChangeView center={props.coords} zoom={16} />
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <AddLocationMarker />
      <Marker position={props.coords}>
        <Popup>
          Lat: {props.coords[0]} Long: {props.coords[1]}
        </Popup>
      </Marker>
    </MapContainer>
  );
}
