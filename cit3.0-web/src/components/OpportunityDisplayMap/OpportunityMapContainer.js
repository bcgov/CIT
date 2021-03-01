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
      height: "50px",
      display: "flex",
      flexDirection: "row",
      width: "100%",
      justifyContent: "flex-end",
      alignItems: "flex-end",
      paddingRight: "25px",
    },
    btnLink: {
      background: "none",
      border: "none",
      textDecoration: "underline",
      display: "flex",
      alignItems: "center",
      padding: "0px",
    },
    mapIcon: {
      height: "30px",
      width: "30px",
      marginRight: "5px",
    },
  };

  const toggleMap = () => {
    $(".leaflet-container").fadeToggle("500");
    setShowMap(!showMap);
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
          <button style={styles.btnLink} type="button" onClick={toggleMap}>
            <GrMapLocation onClick={toggleMap} style={styles.mapIcon} />
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
