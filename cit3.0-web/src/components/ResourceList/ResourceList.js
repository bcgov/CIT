import PropTypes from "prop-types";
import { Container, Row, Col } from "react-bootstrap";
import Resource from "../Resource/Resource";

export default function ResourceList({ resources }) {
  return (
    <Container>
      <Row className="mb-3">
        <Col>
          <h2>Resource</h2>
        </Col>
        <Col className="d-flex justify-content-center">
          <h2>#</h2>
        </Col>
        <Col className="d-flex justify-content-end">
          <h2>Nearest</h2>
        </Col>
      </Row>
      {Object.entries(resources).map(([resource, resourceData]) => (
        <Resource
          key={resource}
          resource={resource}
          resourceData={resourceData}
        />
      ))}
    </Container>
  );
}

ResourceList.propTypes = {
  resources: PropTypes.shape({
    resource: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.shape),
  }).isRequired,
};
