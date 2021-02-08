import PropTypes from "prop-types";
import "./PortalHeader.css";

export default function PortalHeader({ title, text }) {
  return (
    <div className="gradient text-white py-4 d-flex flex-column justify-content-center align-items-center">
      <h1>{title}</h1>
      <h6>{text}</h6>
    </div>
  );
}

PortalHeader.defaultProps = {
  title: "Opportunity Portal",
  text: "Description",
};

PortalHeader.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
};
