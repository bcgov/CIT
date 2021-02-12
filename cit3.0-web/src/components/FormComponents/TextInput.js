import PropTypes from "prop-types";
import "./input.css";

export default function TextInput({
  heading,
  notes,
  placeholder,
  rows,
  disabled,
}) {
  return (
    <div className="d-flex flex-column w-100">
      <p className="mb-0">{heading}</p>
      <p className="mb-0" style={{ opacity: "0.5" }}>
        {notes}
      </p>
      <textarea
        type="textarea"
        className="bcgov-text-input mb-4"
        rows={rows}
        placeholder={placeholder}
        disabled={disabled}
      />
    </div>
  );
}

TextInput.defaultProps = {
  heading: null,
  notes: null,
  placeholder: null,
  rows: 3,
  disabled: false,
};

TextInput.propTypes = {
  heading: PropTypes.string,
  notes: PropTypes.string,
  placeholder: PropTypes.string,
  rows: PropTypes.number,
  disabled: PropTypes.bool,
};
