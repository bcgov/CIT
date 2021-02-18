import PropTypes from "prop-types";
import { Row, Col } from "react-bootstrap";
import { v4 } from "uuid";
import NumberFormat from "react-number-format";
import "./Resource.css";

/**
 * @param {Object} resources from redux state: opportunity
 */
function displayResources(resources) {
  // toDisplay to control nesting of elements
  const toDisplay = {};

  // Process resource entries
  Object.entries(resources).forEach((resource) => {
    // Datapoint element
    let element = null;
    let suffix = "";

    // Insert Category section/datapoint
    if (!toDisplay[resource[1].title]) {
      toDisplay[resource[1].title] = {};
    }

    // Individual data points
    if (
      resource[1].subtitle &&
      typeof toDisplay[resource[1].title][resource[1].subtitle] === "undefined"
    ) {
      toDisplay[resource[1].title][resource[1].subtitle] = {};
    }

    // Different markup for datapoint types
    /* eslint-disable no-fallthrough */
    switch (resource[1].type) {
      case "link":
        element = (
          <span className="ml-2">
            <a href={resource[1].value}>{resource[1].value}</a>
          </span>
        );
        break;
      case "paragraph":
        element = (
          <div className="d-flex flex-column">
            <div classsName="mr-2">{resource[1].name}</div>
            <div>
              <b>{resource[1].value}</b>
            </div>
          </div>
        );
        break;
      case "distance":
        suffix = "km";
      case "capacity":
        suffix = "m³/hour";
      case "size":
        suffix = "ha";
      case "height":
        suffix = "m";
      case "pressure":
        suffix = "MMBTU/hour";
      case "power":
        suffix = "MW";
      default:
        element = (
          <span className="ml-2">
            <b>
              {resource[1].name}{" "}
              {resource[1].name && resource[1].value ? "-" : ""}{" "}
              {resource[1].value ? (
                <NumberFormat
                  displayType="text"
                  value={resource[1].value}
                  suffix={suffix}
                  thousandSeparator
                />
              ) : null}
            </b>
          </span>
        );
    }

    // Nest, if there are Category section datapoints
    if (resource[1].subtitle) {
      toDisplay[resource[1].title][resource[1].subtitle] = element;
      return;
    }
    // Otherwise it is a datapoint
    toDisplay[resource[1].title] = element;
  });
  return toDisplay;
}

/* eslint-disable no-lone-blocks, no-unused-expressions */
export default function Resource({ title, itemsToDisplay }) {
  const resourcesAsView = displayResources(itemsToDisplay);
  const displayItems = (items) =>
    Object.keys(items).map((key) => {
      if (items[key].$$typeof !== Symbol.for("react.element")) {
        return (
          <div key={v4()}>
            <Row>{key}: </Row>
            <Col>{displayItems(items[key])}</Col>
          </div>
        );
      }
      return (
        <Row key={v4()}>
          {key}: {items[key]}
        </Row>
      );
    });
  return (
    <div className="mb-6">
      <Row className="mb-4">
        <h3>{title}</h3>
      </Row>
      {displayItems(resourcesAsView)}
    </div>
  );
}

Resource.propTypes = {
  title: PropTypes.string.isRequired,
  itemsToDisplay: PropTypes.shape().isRequired,
};
