import { useEffect } from "react";
import PropTypes from "prop-types";
import { Row, Col } from "react-bootstrap";
import { v4 } from "uuid";
import NumberFormat from "react-number-format";
import "./Resource.css";
import { useDispatch, useSelector } from "react-redux";
import { setOptions, getOptions } from "../../store/actions/options";

/**
 * @param {Object} resources from redux state: opportunity
 */
function displayResources(resources) {
  // toDisplay to control nesting of elements
  const toDisplay = {};
  const dispatch = useDispatch();

  const PropStatusOptions = useSelector(
    (state) => state.options.propertyStatuses
  ).map((option) => ({ value: option.code, label: option.name }));
  const zoningOptions = useSelector(
    (state) => state.options.landUseZoning
  ).map((option) => ({ value: option.code, label: option.name }));

  const getTheOptions = async () => {
    // Fetch options, if not already stored on client
    if (!PropStatusOptions.length || !zoningOptions.length) {
      const options = await getOptions();
      dispatch(setOptions(options.data));
    }
  };

  useEffect(() => {
    getTheOptions();
  }, []);

  // Process resource entries
  Object.entries(resources).forEach((resource) => {
    // Datapoint element
    let element = null;
    let multiValues = [];
    let found;

    if (
      resource[1] === false ||
      resource[1].hidden ||
      resource[0] === "networkAvg"
    ) {
      return;
    }
    if (resource[0] === "networkAtRoad") {
      /* eslint-disable no-param-reassign */
      resource[1].subtitle = "- Connectivity (50/10Mbps or more)";
      resource[1].value = ["50/10", "Yes"].includes(resource[1].value)
        ? "Yes"
        : "No";
    }

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
    switch (resource[1].type) {
      case "link":
        element = (
          <span className="ml-2 link">
            <a
              target="_blank"
              rel="noreferrer"
              href={resource[1].value}
              onClick={() => window.open(resource[1].value, "_blank")}
            >
              {resource[1].value}
            </a>
          </span>
        );
        break;
      case "paragraph":
        element = (
          <div className="d-flex flex-column">
            <div className="mr-2">{resource[1].name}</div>
            <div className="ml-2">
              {Array.isArray(resource[1].value) ? (
                <>
                  {resource[1].value.map((value, index) => (
                    <>
                      {index !== 0 ? ", " : ""}
                      <b>{value}</b>
                    </>
                  ))}
                </>
              ) : (
                <b>{resource[1].value}</b>
              )}
            </div>
          </div>
        );
        break;
      case "select":
        switch (resource[0]) {
          case "saleOrLease":
            found = PropStatusOptions.find(
              (option) => resource[1].value === option.value
            );
            break;
          case "futureZone":
            found = zoningOptions.find(
              (option) => resource[1].value === option.value
            );
            break;
          case "currentZone":
            found = zoningOptions.find(
              (option) => resource[1].value === option.value
            );
            break;
          default:
            break;
        }
        element = (
          <div className="d-flex flex-column">
            <div className="ml-2">
              <b>{found && found.label}</b>
            </div>
          </div>
        );
        break;
      case "multi":
        multiValues = resource[1].value;
        element = (
          <div className="d-flex flex-column">
            <div className="ml-2">
              <b>{multiValues.label}</b>
            </div>
          </div>
        );
        break;
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
                  suffix={` ${resource[1].suffix}`}
                  decimalScale={2}
                  thousandSeparator={isNaN(resource[1].value) ? false : ","}
                />
              ) : null}
              {!resource[1].name && !resource[1].value && "NA"}
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
    //
    if (resource[1].salePrice || resource[1].rentalPrice) {
      toDisplay[` Asking Price/Rental Rate`] = (
        <div className="d-flex flex-column">
          <div className="ml-2">
            <b>
              <NumberFormat
                displayType="text"
                prefix="$"
                value={resource[1].salePrice}
                decimalScale={2}
                thousandSeparator=","
              />
              {resource[1].salePrice && resource[1].rentalPrice ? " or " : ""}
              <NumberFormat
                displayType="text"
                value={resource[1].rentalPrice}
                prefix="$"
                suffix="/month"
                decimalScale={2}
                thousandSeparator=","
              />
            </b>
          </div>
        </div>
      );
    }
  });
  return toDisplay;
}

/* eslint-disable no-lone-blocks, no-unused-expressions */
export default function Resource({ title, itemsToDisplay }) {
  const resourcesAsView = displayResources(itemsToDisplay);
  const displayItems = (items) =>
    Object.keys(items).map((key) => {
      if (items[key] && items[key].$$typeof !== Symbol.for("react.element")) {
        return (
          <div key={v4()}>
            <Row>{key}: </Row>
            <Col>{displayItems(items[key])}</Col>
          </div>
        );
      }
      return (
        <Row className="mb-2" key={v4()}>
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
