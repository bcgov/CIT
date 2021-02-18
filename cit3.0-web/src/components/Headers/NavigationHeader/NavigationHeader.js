import PropTypes from "prop-types";
import { Row, Col, Container } from "react-bootstrap";
import { v4 } from "uuid";
import { IoEllipsisHorizontalSharp } from "react-icons/io5";
import NavigationHeaderItem from "../NavigationHeaderItem/NavigationHeaderItem";

export default function NavigationHeader({ navItems, currentStep }) {
  const renderNavItems = (items) =>
    items.map((item, i, arr) => (
      <Row xs="auto" className="mx-1 px-1">
        <NavigationHeaderItem
          key={v4()}
          label={item}
          step={i + 1}
          currentStep={currentStep}
        />
        {i !== arr.length - 1 && (
          <Col
            xs="auto"
            style={{
              color: "#A0A0A0",
            }}
            className="pt-3 ellipsis"
          >
            <IoEllipsisHorizontalSharp style={{ fontSize: "32px" }} />
          </Col>
        )}
      </Row>
    ));
  return (
    <div className="py-4" style={{ backgroundColor: "#E0E0E0" }}>
      <Container fluid>
        <Row className=" main-row justify-content-center align-items-center">
          {renderNavItems(navItems)}
        </Row>
      </Container>
    </div>
  );
}

NavigationHeader.defaultProps = {
  navItems: [
    "Location",
    "View Data",
    "Property Details",
    "Additional Info",
    "Review & Submit",
  ],
};

NavigationHeader.propTypes = {
  navItems: PropTypes.arrayOf(PropTypes.string),
  currentStep: PropTypes.number.isRequired,
};
