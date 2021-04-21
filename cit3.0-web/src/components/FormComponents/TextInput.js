import PropTypes from "prop-types";
import "./input.css";

export default function TextInput({
  heading,
  notes,
  placeholder,
  rows,
  disabled,
  handleChange,
  name,
  value,
  upperLeftLabel,
  lowerRightLabel,
  maxLength,
}) {
  return (
    <div className="d-flex flex-column w-100">
      <p id={`${name}-label`} className="mb-0">
        {heading}
      </p>
      <p className="mb-0" style={{ opacity: "0.5" }}>
        {notes}
      </p>
      <div className="text-wrapper">
        <textarea
          aria-labelledby={`${name}-label`}
          type="textarea"
          className="bcgov-text-input"
          rows={rows}
          placeholder={placeholder}
          disabled={disabled}
          value={value}
          maxLength={maxLength}
          onChange={(e) => handleChange(name, e.target.value)}
        />
        {upperLeftLabel !== "" && (
          <span className="upper-left-label">{upperLeftLabel}</span>
        )}
        {lowerRightLabel !== "" && (
          <span className="lower-right-label">{lowerRightLabel}</span>
        )}
      </div>
    </div>
  );
}

TextInput.defaultProps = {
  heading: null,
  notes: null,
  placeholder: null,
  rows: 3,
  disabled: false,
  value: "",
  upperLeftLabel: "",
  lowerRightLabel: "",
  maxLength: 9999,
};

TextInput.propTypes = {
  heading: PropTypes.string,
  notes: PropTypes.string,
  placeholder: PropTypes.string,
  rows: PropTypes.number,
  disabled: PropTypes.bool,
  handleChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  upperLeftLabel: PropTypes.string,
  lowerRightLabel: PropTypes.string,
  maxLength: PropTypes.number,
};
