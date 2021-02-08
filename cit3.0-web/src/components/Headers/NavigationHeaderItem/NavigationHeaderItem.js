import PropTypes from "prop-types";

export default function NavigationHeaderItem({ label, step }) {
  return (
    <div className="d-flex px-3 flex-column justify-content-center align-items-center">
      <div>{step}</div>
      <div>{label}</div>
    </div>
  );
}

NavigationHeaderItem.propTypes = {
  label: PropTypes.string.isRequired,
  step: PropTypes.number.isRequired,
};
