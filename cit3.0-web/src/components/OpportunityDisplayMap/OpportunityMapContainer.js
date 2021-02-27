import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import axios from "axios";
import $ from "jquery";
import { CgCloseR } from "react-icons/cg";
import { GrMapLocation } from "react-icons/gr";
import { Row } from "react-bootstrap";
import OpportunitiesMap from "./OpportunitiesMap";

export default function OpportunityMapContainer({ setTotalCount }) {
  const [opportunities, setOpportunities] = useState(null);
  const [showMap, setShowMap] = useState(true);

  useEffect(() => {
    axios
      .get(`/api/opportunity/list`)
      .then((data) => {
        setOpportunities(data.data.results);
        setTotalCount(data.data.count);
      })
      .catch((err) => {
        setOpportunities(null);
      });
  }, []);

  const styles = {
    close: {
      height: "30px",
      width: "30px",
      position: "absolute",
      right: "30",
      top: "30",
      zIndex: 1000,
      cursor: "pointer",
    },
    "map-visible": {
      height: "50px",
    },
    "map-hidden": {
      border: "1px solid red",
      height: "50px",
      display: "flex",
      "flex-direction": "row",
      width: "100%",
      "justify-content": "flex-end",
      "padding-right": "25px",
    },
  };

  const toggleMap = () => {
    if (showMap) {
      $(".leaflet-container").slideUp("500");
      setShowMap(!showMap);
    } else {
      $(".leaflet-container").slideDown("500");
      setShowMap(!showMap);
    }
  };

  return (
    <Row
      style={{
        position: "relative",
      }}
    >
      <div
        className={!showMap ? "map-hidden" : "map-visible"}
        style={!showMap ? styles["map-hidden"] : styles["map-visible"]}
      >
        {showMap && <CgCloseR style={styles.close} onClick={toggleMap} />}
        {!showMap && (
          <button type="button" onClick={toggleMap}>
            <GrMapLocation />
            Show Map
          </button>
        )}
      </div>

      <OpportunitiesMap className="map" opportunities={opportunities} />
    </Row>
  );
}

OpportunityMapContainer.propTypes = {
  setTotalCount: PropTypes.func.isRequired,
};
