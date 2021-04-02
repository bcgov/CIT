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
  resetOpportunity,
} from "../../store/actions/opportunity";

export default function AddLocationMarker(props) {
  const [positions, setPositions] = useState([]);
  const dispatch = useDispatch();

  useMapEvent("click", async (e) => {
    /* set current data to null in case data is not returned for a coord */
    await props.setAddress("");
    await dispatch(setParcelOwner(""));
    await dispatch(setGeometry(null));
    await dispatch(setParcelSize(null));
    await dispatch(setPID(""));
    await dispatch(setSiteId(null));

    // props.setNoAddressFlag(false);
    /// ///////////////////
    await setPositions([e.latlng]);
    await props.setCoords([e.latlng.lat, e.latlng.lng]);
    try {
      const addressDataFromPoint = await getAddressFromPoint([
        e.latlng.lat,
        e.latlng.lng,
      ]);
      if (addressDataFromPoint.data.properties.siteID) {
        console.log("we have site id");
        dispatch(setSiteId(addressDataFromPoint.data.properties.siteID));
        props.setAddress(addressDataFromPoint.data.properties.fullAddress);
      }
    } catch (error) {
      console.log("setting No address flag");
      props.setNoAddressFlag(true);
    } finally {
      console.log("finally");

      const proximity = await getProximityData(props.resourceIds, [
        e.latlng.lat,
        e.latlng.lng,
      ]);
      props.setNearbyResources(proximity);
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
