import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import axios from "axios";
import $ from "jquery";
import { CgCloseR } from "react-icons/cg";
import { GrMapLocation } from "react-icons/gr";
import { Row } from "react-bootstrap";
import OpportunitiesMap from "../OpportunitiesMap";
import "./OpportunitiesMapContainer.scss";

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

  const toggleMap = () => {
    $(".leaflet-container").fadeToggle("300");
    setShowMap(!showMap);
  };

  const styles = {
    close: {
      height: "30px",
      width: "30px",
      position: "absolute",
      right: 30,
      top: 30,
      zIndex: 1000,
      cursor: "pointer",
    },
  };

  return (
    <Row className="row-relative">
      <div className={!showMap ? "map-hidden" : "map-visible"}>
        {showMap && <CgCloseR style={styles.close} onClick={toggleMap} />}
        {!showMap && (
          <button className="btnLink" type="button" onClick={toggleMap}>
            <GrMapLocation onClick={toggleMap} className="mapIcon" />
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
