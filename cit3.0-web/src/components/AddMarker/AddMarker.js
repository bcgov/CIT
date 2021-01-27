import { useMapEvent, Marker, Popup } from "react-leaflet";
import { useState } from "react";

export default function AddLocationMarker() {
  const [positions, setPositions] = useState([]);

  useMapEvent("click", (e) => {
    setPositions([...positions, e.latlng]);
    console.log(positions);
  });
  return positions.map((position) => (
    <Marker position={position}>
      <Popup>
        Lat: {position.lat.toFixed(4)} Long: {position.lng.toFixed(4)}
      </Popup>
    </Marker>
  ));
}
