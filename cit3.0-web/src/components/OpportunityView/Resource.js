import PropTypes from "prop-types";
import { Row, Col } from "react-bootstrap";
import { v4 } from "uuid";
import "./Resource.css";

export default function Resource({ title, itemsToDisplay }) {
  // TODO:  handle sub objects
  const displayItems = (items) =>
    Object.keys(items).map((key) => {
      if (typeof items[key] === "object") {
        return (
          <div key={v4()}>
            <Row>{key}: </Row>
            <Col>{displayItems(items[key])}</Col>
          </div>
        );
      }
      return (
        <Row key={v4()}>
          {key}: <b className="resource-value">{items[key]}</b>
        </Row>
      );
    });
  return (
    <div className="my-6">
      <Row className="mb-3">
        <h3>{title}</h3>
      </Row>
      {displayItems(itemsToDisplay)}
    </div>
  );
}

Resource.propTypes = {
  title: PropTypes.string.isRequired,
  itemsToDisplay: PropTypes.shape().isRequired,
};
