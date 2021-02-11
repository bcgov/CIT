import PropTypes from "prop-types";
import { Row, Col } from "react-bootstrap";
import { v4 } from "uuid";
import NavigationHeaderItem from "../NavigationHeaderItem/NavigationHeaderItem";

export default function NavigationHeader({ navItems }) {
  const renderNavItems = (items) =>
    items.map((item, i, arr) => {
      while (i < arr.length - 1) {
        return (
          <div key={v4()} className="d-flex">
            <NavigationHeaderItem label={item} step={i + 1} />
            <div style={{ color: "#A0A0A0" }} className="pt-1 px-3 mx-2">
              ...
            </div>
          </div>
        );
      }
      return <NavigationHeaderItem key={v4()} label={item} step={i + 1} />;
    });
  return (
    <Col
      style={{ backgroundColor: "#E0E0E0" }}
      className="nav-header d-flex py-4 justify-content-center align-items-center"
    >
      <Row style={{ backgroundColor: "#E0E0E0" }}>
        {renderNavItems(navItems)}
      </Row>
    </Col>
  );
}

NavigationHeader.defaultProps = {
  navItems: [
    "Location",
    "Property Details",
    "Additional Info",
    "Review & Submit",
  ],
};

NavigationHeader.propTypes = {
  navItems: PropTypes.arrayOf(PropTypes.string),
};
