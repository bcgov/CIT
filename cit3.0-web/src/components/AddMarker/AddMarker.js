import { useMapEvent, Marker, Popup } from "react-leaflet";
import { useState } from "react";
import { v4 } from "uuid";
import { getProximityData } from "../../helpers/resourceCalls";

export default function AddLocationMarker(props) {
  const [positions, setPositions] = useState([]);

  useMapEvent("click", async (e) => {
    setPositions([...positions, e.latlng]);
    props.setAddress(""); // TODO: set address to be the new address of the clicked area
    props.setCoords([e.latlng.lat, e.latlng.lng]);
    const proximity = await getProximityData(props.resourceIds, [
      e.latlng.lat,
      e.latlng.lng,
    ]);
    props.setNearbyResources(proximity);
  });

  return positions.map((position) => (
    <Marker key={v4()} position={position}>
      <Popup>
        Lat: {position.lat.toFixed(4)} Long: {position.lng.toFixed(4)}
      </Popup>
    </Marker>
  ));
}
