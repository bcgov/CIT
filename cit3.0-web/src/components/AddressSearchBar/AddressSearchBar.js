import { useState } from "react";
import v4 from "uuid";
import PropTypes from "prop-types";
import { FormControl, FormLabel } from "react-bootstrap";
import { getAddressData } from "../../helpers/resourceCalls";

export default function AddressSearchBar({ setAddress, getCoords }) {
  const [value, setValue] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [show, setShow] = useState(false);
  // can send bounding box for areas
  const runSearch = async (event) => {
    if (event.target.value) {
      setShow(true);
    }
    setValue(event.target.value);
    const addressData = await getAddressData(event.target.value);
    setAddresses(addressData.data.features);
  };

  const setCoordsForSelectedAddress = (e, address) => {
    setAddress(address);
    getCoords(address);
    setShow(false);
  };
  const selectAddress = (e) => {
    setValue(e.target.value);
    setCoordsForSelectedAddress(e, e.target.value);
  };

  const list = () => (
    <ul className="list-unstyled">
      {addresses.map((addressData) => (
        <li key={v4()}>
          <button
            style={{
              background: "transparent",
              padding: "0",
              border: "0px solid transparent",
            }}
            type="button"
            onClick={(e) => selectAddress(e)}
            value={addressData.properties.fullAddress}
          >
            {addressData.properties.fullAddress}
          </button>
        </li>
      ))}
    </ul>
  );

  return (
    <div style={{ position: "relative" }}>
      <FormLabel htmlFor="addressSearch" className="font-weight-bold">
        Enter Address
      </FormLabel>
      <FormControl
        id="addressSearch"
        value={value}
        onChange={(e) => runSearch(e)}
      />
      {show ? (
        <div
          className="rounded-bottom"
          style={{
            border: "1px solid black",
            position: "absolute",
            borderTop: "0px",
            height: "100px",
            width: "100%",
            zIndex: "10000",
            backgroundColor: "white",
            overflow: "auto",
          }}
        >
          {list()}
        </div>
      ) : null}
    </div>
  );
}

AddressSearchBar.propTypes = {
  setAddress: PropTypes.func.isRequired,
  getCoords: PropTypes.func.isRequired,
};
