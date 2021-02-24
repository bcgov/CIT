import PropTypes from "prop-types";
import { Row, Col } from "react-bootstrap";

import { setColour } from "../../helpers/helpers";

export default function Resource({ resource, resourceData }) {
  const sortDataByDistance = (data) =>
    data.sort((a, b) => a.distance - b.distance);

  function showDistance(data) {
    return (
      <p>{sortDataByDistance(data)[0].distance.toFixed(2) || "unknown"} km</p>
    );
  }
  return (
    <Row key={resource}>
      <Col>
        <h4 style={{ color: setColour(resource, "colourHex") }}>{resource}</h4>
      </Col>
      <Col className="d-flex justify-content-center">{resourceData.length}</Col>
      <Col className="d-flex justify-content-end">
        {showDistance(resourceData)}
      </Col>
    </Row>
  );
}

Resource.propTypes = {
  resource: PropTypes.string.isRequired,
  resourceData: PropTypes.arrayOf(PropTypes.shape).isRequired,
};
