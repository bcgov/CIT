import { useState } from "react";
import v4 from "uuid";
import { Input } from "shared-components";
import PropTypes from "prop-types";
import { Dropdown, FormControl } from "react-bootstrap";

import { getAddressData } from "../../helpers/resourceCalls";

export default function AddressSearchBar({ setAddress }) {
  const [value, setValue] = useState("");
  const [currentAddressData, setCurrentAddressData] = useState([]);

  const input = {
    label: "",
    id: "address",
    placeholder: "Address",
    isReadOnly: false,
    isRequired: true,
    styling: "bcgov-editable-white",
    autocomplete: "off",
  };
  // can send bounding box for areas
  const runSearch = async (event) => {
    setValue(event.target.value);
    const addressData = await getAddressData(event.target.value);
    console.log(addressData.data.features);
    setCurrentAddressData(addressData.data.features);
  };

  const list = () => (
    <ul className="list-unstyled">
      {currentAddressData.map((addressData) => (
        <li key={v4()}>{addressData.properties.fullAddress}</li>
      ))}
    </ul>
  );

  return (
    <div style={{ position: "relative" }}>
      {console.log(currentAddressData)}
      <FormControl onChange={(e) => runSearch(e)} />
      {value ? (
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
};
