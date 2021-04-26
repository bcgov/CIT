import React from "react";
import PropTypes from "prop-types";
import NumberFormat from "react-number-format";
import { Container, Row, Col } from "react-bootstrap";
import { v4 } from "uuid";
import "./LocationsPanel.css";
import { Alert } from "shared-components";
import { MdInfo } from "react-icons/md";

const LocationsPanel = ({
  address,
  coords,
  municipalities,
  firstNationCommunities,
}) => (
  <div className="LocationsPanel" data-testid="LocationsPanel">
    <div>
      <div className="d-flex justify-content-between mb-3 location-coords">
        <div>
          <h3>Location</h3>
        </div>
        <span className="flex-shrink-0">
          {coords.length
            ? `${coords[0].toFixed(4)}, ${coords[1].toFixed(4)}`
            : "No Coordinates"}
        </span>
      </div>
      <h4 className="h4">{address || "No Address"}</h4>
    </div>
    <Alert
      icon={<MdInfo size={32} />}
      type="info"
      styling="bcgov-info-background mb-3"
      element="Proximity details are provided in straight-line distances."
    />
    {municipalities ? (
      <>
        <h3 className="mb-3">Nearest Communities</h3>
        <p>
          View more information about labour force, key sectors and
          infrastructure on the Community Information Tool.
        </p>
        <Container className="mb-4">
          {municipalities.map((muni) => (
            <Row key={v4()} className="d-flex justify-content-between">
              <Col className="pl-0">
                <a
                  style={{ lineHeight: "2rem" }}
                  target="_blank"
                  rel="noreferrer"
                  href={`${muni.link}`}
                  onClick={() => window.open(muni.link, "_blank")}
                >
                  {muni.name} - {muni.distance.toFixed(2)}km
                </a>
              </Col>
              <Col className="d-flex justify-content-end pr-0" md="auto">
                {muni.population ? "Pop. " : ""}
              </Col>
              <Col className="d-flex justify-content-end px-0" md={2}>
                <span>
                  <NumberFormat
                    displayType="text"
                    value={muni.population}
                    thousandSeparator
                  />
                </span>
              </Col>
            </Row>
          ))}
        </Container>
      </>
    ) : null}

    {firstNationCommunities ? (
      <>
        <h3 className="mb-3">Nearest First Nation Communities</h3>
        <Container className="pb-2">
          {firstNationCommunities.map((firstNationCommunity) => (
            <Row key={v4()} className="d-flex justify-content-between mb-2">
              <Col className="pl-0">
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={`${firstNationCommunity.link}`}
                  onClick={() =>
                    window.open(firstNationCommunity.link, "_blank")
                  }
                >
                  {firstNationCommunity.name
                    .toLowerCase()
                    .replace(/(^|\s)\S/g, (t) => t.toUpperCase())}{" "}
                  - {firstNationCommunity.distance.toFixed(2)}
                  km
                </a>
              </Col>
              <Col className="d-flex justify-content-end pr-0" md="auto">
                {firstNationCommunity.population ? "Pop. " : ""}
              </Col>
              <Col className="d-flex justify-content-end px-0" md={2}>
                <span>
                  <NumberFormat
                    displayType="text"
                    value={firstNationCommunity.population}
                    thousandSeparator
                  />
                </span>
              </Col>
            </Row>
          ))}
        </Container>
      </>
    ) : null}
  </div>
);

LocationsPanel.propTypes = {
  address: PropTypes.string,
  coords: PropTypes.arrayOf(PropTypes.number),
  municipalities: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      link: PropTypes.string,
      distance: PropTypes.number,
      population: PropTypes.number,
    })
  ),
  firstNationCommunities: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      link: PropTypes.string,
      distance: PropTypes.number,
      population: PropTypes.number,
    })
  ),
};

LocationsPanel.defaultProps = {
  address: "",
  coords: [],
  municipalities: [
    {
      name: "",
      link: "",
      distance: 0,
    },
  ],
  firstNationCommunities: [],
};

export default LocationsPanel;
