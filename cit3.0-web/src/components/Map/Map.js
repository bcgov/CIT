import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
// import { Icon } from "leaflet";
import './map.css';
import{ useState } from 'react';
import ChangeView from '../ChangeView/ChangeView';
import AddLocationMarker from '../AddMarker/AddMarker'







export default function Map(props) {

    return (
        <MapContainer 
          center={props.coords} 
          zoom={16} 
          scrollWheelZoom={true}
          style={{ width: '100%', height:'100%'}}
        >
          <ChangeView 
            center={props.coords} 
            zoom={16} 
          />
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <AddLocationMarker />
          <Marker 
            position={props.coords} 
          >
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
    )
}