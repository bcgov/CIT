import React from "react";
import PropTypes from "prop-types";
import NumberFormat from "react-number-format";
import { Container, Row, Col } from "react-bootstrap";
import { v4 } from "uuid";
import styles from "./LocationsPanel.module.css";

const LocationsPanel = ({
  address,
  coords,
  municipalities,
  firstNationCommunity,
}) => (
  <div className={styles.LocationsPanel} data-testid="LocationsPanel">
    <div>
      <div className="d-flex flex-row justify-content-between mb-3">
        <div>
          <h3>Location</h3>
        </div>
        <span className="flex-shrink-0">
          {coords.length ? `${coords[0]}, ${coords[1]}` : "No Coordinates"}
        </span>
      </div>
      <h4 className="h4">{address || "No Address"}</h4>
    </div>
    {municipalities ? (
      <>
        <h3 className="mb-3">Nearest Municipalities</h3>
        <p>
          Click on municipality name to view more information such as ... on out
          Community explorer
        </p>
        <Container className="mb-4">
          {municipalities.map((muni) => (
            <Row key={v4()} className="d-flex justify-content-between">
              <Col className="pl-0">
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={`${muni.link}`}
                  onClick={() => window.open(muni.link, "_blank")}
                >
                  {muni.name} - {muni.distance}km
                </a>
              </Col>
              <Col className="d-flex justify-content-end pr-0" md="auto">
                {"Pop. "}
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

    {firstNationCommunity ? (
      <>
        <h3 className="mb-3">Nearest First Nation Community</h3>
        <Container>
          <Row className="d-flex justify-content-between mb-4">
            <Col className="pl-0">
              <a
                target="_blank"
                rel="noreferrer"
                href={`${firstNationCommunity.link}`}
                onClick={() => window.open(firstNationCommunity.link, "_blank")}
              >
                {firstNationCommunity.name} - {firstNationCommunity.distance}km
              </a>
            </Col>
            <Col className="d-flex justify-content-end pr-0" md="auto">
              {"Pop. "}
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
  firstNationCommunity: PropTypes.shape({
    name: PropTypes.string,
    link: PropTypes.string,
    distance: PropTypes.number,
    population: PropTypes.number,
  }),
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
  firstNationCommunity: null,
};

export default LocationsPanel;
