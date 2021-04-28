import { useMapEvent } from "react-leaflet";
import { useDispatch } from "react-redux";
import { getAddressFromPoint } from "../../helpers/resourceCalls";
import { setSiteId, resetOpportunity } from "../../store/actions/opportunity";

export default function AddLocationMarker(props) {
  const dispatch = useDispatch();

  useMapEvent("click", async (e) => {
    /* reset opportunity data and ensure noAddressFlag is false */
    dispatch(resetOpportunity());
    props.setNoAddressFlag(false);
    /// ///////////////////
    // this will trigger proximity data call in MapContainer
    // and set a marker in Map.js
    props.setCoords([e.latlng.lat, e.latlng.lng]);
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

  return null;
}
