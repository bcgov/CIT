import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import $ from "jquery";
import { CgCloseR } from "react-icons/cg";
import { GrMapLocation } from "react-icons/gr";
import { Row, Col } from "react-bootstrap";
import OpportunitiesMap from "../OpportunityMap";
import "./OpportunityMapContainer.scss";

export default function OpportunityMapContainer({ totalCount, setTotalCount }) {
  const [opportunities, setOpportunities] = useState(null);
  const [showMap, setShowMap] = useState(true);

  useEffect(() => {
    axios
      .get(`/api/opportunity/list`)
      .then((data) => {
        setOpportunities(data.data.results);
        setTotalCount(data.data.count);
      })
      .catch(() => {
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
      </div>

      <OpportunitiesMap className="map" opportunities={opportunities} />

      <Row className="w-100">
        <Col className="pt-3">
          {totalCount ? (
            <h4>{totalCount} Properties match your search</h4>
          ) : (
            <h4>
              {totalCount} Properties match your search. Please add or modify
              your filters.
            </h4>
          )}
        </Col>
        {!showMap && (
          <Col className="d-flex justify-content-end">
            <button className="btnLink" type="button" onClick={toggleMap}>
              <GrMapLocation onClick={toggleMap} className="mapIcon" />
              Show Map
            </button>
          </Col>
        )}
      </Row>
    </Row>
  );
}

OpportunityMapContainer.propTypes = {
  totalCount: PropTypes.number.isRequired,
  setTotalCount: PropTypes.func.isRequired,
};
