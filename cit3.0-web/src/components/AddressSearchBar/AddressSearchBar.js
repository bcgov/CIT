import { useState, useEffect } from "react";
import v4 from "uuid";
import PropTypes from "prop-types";
import { FormControl, FormLabel } from "react-bootstrap";
import { getAddressData } from "../../helpers/resourceCalls";

export default function AddressSearchBar({
  setAddress,
  currentAddress,
  getCoords,
  setError,
}) {
  const [value, setValue] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setValue(currentAddress);
  }, [currentAddress]);

  const runSearch = async (event) => {
    if (event.target.value) {
      setShow(true);
    }
    setValue(event.target.value);
    try {
      const addressData = await getAddressData(event.target.value);
      setAddresses(addressData.data.features);
      return true;
    } catch (error) {
      setShow(false);
      return setError(true);
    }
  };

  const setCoordsForSelectedAddress = (address) => {
    setAddress(address);
    getCoords(address);
    setShow(false);
  };
  const selectAddress = (e) => {
    setValue(e.target.value);
    setCoordsForSelectedAddress(e.target.value);
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
        autoComplete="off"
        className=" bcgov-text-input"
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

AddressSearchBar.defaultProps = {
  currentAddress: "",
};

AddressSearchBar.propTypes = {
  setAddress: PropTypes.func.isRequired,
  getCoords: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
  currentAddress: PropTypes.string,
};
