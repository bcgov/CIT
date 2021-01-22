import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { Icon } from "leaflet";
import './map.css';
import{ useState} from 'react';
import ChangeView from '../ChangeView/ChangeView';


export default function Map(props) {

  const [coords, setCoords ] = useState(props.coords)

    return (
        <MapContainer 
          center={props.coords} 
          zoom={13} 
          scrollWheelZoom={false}
          style={{ width: '100%', height:'100%'}}
        >
          <ChangeView center={props.coords} zoom={13} />
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={props.coords}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
    )
}