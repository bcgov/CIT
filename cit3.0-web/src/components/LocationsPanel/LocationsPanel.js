import React from "react";
import PropTypes from "prop-types";
import styles from "./LocationsPanel.module.css";

const LocationsPanel = ({ address, coords, municipalities }) => (
  <div className={styles.LocationsPanel} data-testid="LocationsPanel">
    <div>
      <div className="d-flex flex-row justify-content-between mb-3">
        <div>
          <div className="font-weight-bold">Location</div>
        </div>
        <span className="flex-shrink-0">
          {coords.length ? `${coords[0]}, ${coords[1]}` : "No Coordinates"}
        </span>
      </div>
      <h4 className="h5">{address || "No Address"}</h4>
    </div>
    {municipalities ? (
      <>
        <div className="font-weight-bold">Nearest Municipalities</div>
        <p>
          Click on municipality name to view more information such as ... on out
          Community explorer
        </p>
        <ul>
          {municipalities.map((muni) => (
            <li>
              <a target="_blank" rel="noreferrer" href={muni.link}>
                <b>
                  {muni.name} - {muni.distance}km
                </b>
              </a>
            </li>
          ))}
        </ul>
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
      distance: PropTypes.string,
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
};

export default LocationsPanel;
