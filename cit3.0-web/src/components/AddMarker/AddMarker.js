import {  useMapEvent, Marker, Popup } from "react-leaflet";
import { useState } from 'react';


export default function AddLocationMarker(props) {
    const [ positions, setPositions] = useState([])
    
    const map = useMapEvent('click', (e) => {
        setPositions([...positions, e.latlng])
        console.log(positions);
    })
    return (
       positions.map(position => 
         <Marker position={position} >
            <Popup>You are here</Popup>
            </Marker>)
    )
  }


