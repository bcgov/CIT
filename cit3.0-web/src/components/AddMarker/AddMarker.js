import { useMapEvent, Marker, Popup } from "react-leaflet";
import { useState } from "react";
import { v4 } from "uuid";
import { useDispatch } from "react-redux";
import {
  getProximityData,
  getAddressFromPoint,
} from "../../helpers/resourceCalls";
import {
  setGeometry,
  setParcelOwner,
  setParcelSize,
  setPID,
  setSiteId,
} from "../../store/actions/opportunity";

export default function AddLocationMarker(props) {
  const [positions, setPositions] = useState([]);
  const dispatch = useDispatch();

  useMapEvent("click", async (e) => {
    /* set data to null in case data is not returned for a coord */
    dispatch(setParcelOwner(""));
    dispatch(setGeometry(null));
    dispatch(setParcelSize(""));
    dispatch(setPID(""));
    props.setAddress("");
    /* */
    setPositions([e.latlng]);

    try {
      const addressDataFromPoint = await getAddressFromPoint([
        e.latlng.lat,
        e.latlng.lng,
      ]);
      dispatch(setSiteId(addressDataFromPoint.data.properties.siteID));
      props.setAddress(addressDataFromPoint.data.properties.fullAddress); 
      props.setCoords([e.latlng.lat, e.latlng.lng]);
      const proximity = await getProximityData(props.resourceIds, [
        e.latlng.lat,
        e.latlng.lng,
      ]);
      props.setNearbyResources(proximity);
    } catch (error) {
      console.log("ERRROR WITH FETCHING Parcel and land data etc");
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
