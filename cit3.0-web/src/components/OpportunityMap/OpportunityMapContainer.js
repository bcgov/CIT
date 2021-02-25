import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import axios from "axios";
import { CgCloseR } from "react-icons/cg";
import { Row, Col } from "react-bootstrap";
import OpportunitiesMap from "./OpportunitiesMap";

export default function OpportunityMapContainer({ setMapVisible }) {
  const [opportunities, setOpportunities] = useState(null);
  const [showMap, setShowMap] = useState(true);

  useEffect(() => {
    axios
      .get(`/api/pipeline/opportunities`)
      .then((data) => {
        console.log(data.data.results);
        setOpportunities(data.data.results);
      })
      .catch((err) => {
        console.log(err);
        setOpportunities([]);
      });
  }, []);

  const styles = {
    close: {
      height: "30px",
      width: "30px",
      position: "absolute",
      right: "0",
      top: "0",
      zIndex: 1000,
      cursor: "pointer",
    },
  };

  const toggleMap = () => {
    setShowMap(!showMap);
    setMapVisible(!showMap);
  };
  return (
    <>
      <CgCloseR style={styles.close} onClick={toggleMap} />
      {showMap && <OpportunitiesMap opportunities={opportunities} />}
    </>
  );
}

OpportunityMapContainer.propTypes = {
  setMapVisible: PropTypes.func.isRequired,
};
