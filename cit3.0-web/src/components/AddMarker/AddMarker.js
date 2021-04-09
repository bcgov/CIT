import { useMapEvent, Marker, Popup } from "react-leaflet";
import { useState } from "react";
import { v4 } from "uuid";
import { useDispatch } from "react-redux";
import {
  getProximityData,
  getAddressFromPoint,
} from "../../helpers/resourceCalls";
import { setSiteId, resetOpportunity } from "../../store/actions/opportunity";

export default function AddLocationMarker(props) {
  const [positions, setPositions] = useState([]);
  const dispatch = useDispatch();

  useMapEvent("click", async (e) => {
    /* reset opportunity data and ensure noAddressFlag is false */
    dispatch(resetOpportunity());
    props.setNoAddressFlag(false);
    /// ///////////////////
    setPositions([e.latlng]);
    props.setCoords([e.latlng.lat, e.latlng.lng]); // this will trigger proximity data call in MapContainer
    try {
      const addressDataFromPoint = await getAddressFromPoint([
        e.latlng.lat,
        e.latlng.lng,
      ]);
      if (addressDataFromPoint.data.properties.siteID) {
        dispatch(setSiteId(addressDataFromPoint.data.properties.siteID));
        props.setAddress(addressDataFromPoint.data.properties.fullAddress);
      }
    } catch (error) {
      props.setNoAddressFlag(true);
    }
  });

  return positions.map((position) => (
    <Marker key={v4()} position={position}>
      <Popup>
        Lat: {position.lat.toFixed(4)} Long: {position.lng.toFixed(4)}
      </Popup>
    </Marker>
  ));
}
