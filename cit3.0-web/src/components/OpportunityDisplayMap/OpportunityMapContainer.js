import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import axios from "axios";
import { CgCloseR } from "react-icons/cg";
import { Row, Col } from "react-bootstrap";
import OpportunitiesMap from "./OpportunitiesMap";
import "./OppMap.css";

export default function OpportunityMapContainer({ setTotalCount }) {
  const [opportunities, setOpportunities] = useState(null);
  const [showMap, setShowMap] = useState(true);

  useEffect(() => {
    axios
      .get(`/api/opportunity/list`)
      .then((data) => {
        console.log(data.data.results);
        setOpportunities(data.data.results);
        setTotalCount(data.data.count);
      })
      .catch((err) => {
        console.log(err);
        setOpportunities(null);
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
    small: {
      height: "40px",
    },
    large: {
      height: "600px",
    },
  };

  const heightClass = showMap ? "large" : "small";

  const toggleMap = () => {
    setShowMap(!showMap);
  };
  return (
    <Row
      className={styles[heightClass]}
      style={{
        position: "relative",
      }}
    >
      <CgCloseR style={styles.close} onClick={toggleMap} />
      {showMap && <OpportunitiesMap opportunities={opportunities} />}
    </Row>
  );
}

OpportunityMapContainer.propTypes = {
  setTotalCount: PropTypes.func.isRequired,
};
