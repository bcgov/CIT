import PropTypes from "prop-types";
import NavigationHeaderItem from "./NavigationHeaderItem/NavigationHeaderItem";

export default function NavigationHeader({ navItems }) {
  const renderNavItems = (items) =>
    items.map((item, i, arr) => {
      while (i < arr.length - 1) {
        return (
          <>
            <NavigationHeaderItem label={item} step={i + 1} />
            <div className="d-flex align-items-center">...</div>
          </>
        );
      }
      return <NavigationHeaderItem label={item} step={i + 1} />;
    });
  return (
    <div
      style={{ backgroundColor: "#E0E0E0" }}
      className="d-flex py-4 justify-content-center align-items-center"
    >
      {renderNavItems(navItems)}
    </div>
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
