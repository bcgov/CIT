import PropTypes from "prop-types";
import { Row, Col } from "react-bootstrap";
import { v4 } from "uuid";

export default function Resource({ title, itemsToDisplay }) {
  // TODO:  handle sub objects
  const displayItems = (items) =>
    Object.keys(items).map((key) => {
      console.log(key, items[key]);
      if (typeof items[key] === "object") {
        console.log("yes");
        return (
          <>
            <Row key={v4()}>{key}:</Row>
            <Col>{displayItems(items[key])}</Col>
          </>
        );
      }
      return (
        <Row key={v4()}>
          {key}: {items[key]}
        </Row>
      );
    });
  return (
    <div className="my-4">
      <Row className="font-weight-bold mb-2">{title}</Row>
      {displayItems(itemsToDisplay)}
    </div>
  );
}

Resource.propTypes = {
  title: PropTypes.string.isRequired,
  itemsToDisplay: PropTypes.shape().isRequired,
};
