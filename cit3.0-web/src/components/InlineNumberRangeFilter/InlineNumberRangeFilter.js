import { useState } from "react";
import PropTypes from "prop-types";
import "./InlineNumberRangeFilter.scss";
import "react-input-range/src/scss/index.scss";
import { OverlayTrigger } from "react-bootstrap";
import InputRangeWithTextboxes from "../InputRangeWithTextboxes/InputRangeWithTextboxes";

export default function InlineNumberRangeFilter(props) {
  const {
    inputRange,
    units,
    description,
    minInput,
    setMinInput,
    maxInput,
    setMaxInput,
    inputRangeValue,
    setInputRangeValue,
    cssClaseName,
    isSelected,
    setIsSelected,
    tooltip,
  } = props;

  const [validMax, setValidMax] = useState(true);
  const [validMin, setValidMin] = useState(true);

  return (
    <>
      <div className={cssClaseName}>
        <p>{description}</p>
        {cssClaseName ? (
          <div className="checkbox-sub-filter">
            <OverlayTrigger
              placement="right"
              delay={{ show: 100, hide: 100 }}
              overlay={tooltip}
            >
              <input
                aria-labelledby="agree-label"
                className="mr-2"
                name="enable-parcel-check"
                value="enable-parcel-check"
                type="checkbox"
                onChange={(e) => setIsSelected(e.target.checked)}
                checked={isSelected}
              />
            </OverlayTrigger>
          </div>
        ) : null}
      </div>
      {inputRangeValue ? (
        <InputRangeWithTextboxes
          inputRange={inputRange}
          units={units}
          minInput={minInput}
          setMinInput={(value) => setMinInput(value)}
          maxInput={maxInput}
          setMaxInput={(value) => setMaxInput(value)}
          inputRangeValue={inputRangeValue}
          setInputRangeValue={(value) => setInputRangeValue(value)}
          validMax={validMax}
          validMin={validMin}
          setValidMax={setValidMax}
          setValidMin={setValidMin}
          setIsSelected={(value) => setIsSelected(value)}
        />
      ) : null}
    </>
  );
}

InlineNumberRangeFilter.defaultProps = {
  cssClaseName: null,
};

InlineNumberRangeFilter.propTypes = {
  inputRange: PropTypes.shape({
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
  }).isRequired,
  units: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  setIsSelected: PropTypes.func.isRequired,
  minInput: PropTypes.number.isRequired,
  setMinInput: PropTypes.func.isRequired,
  maxInput: PropTypes.number.isRequired,
  setMaxInput: PropTypes.func.isRequired,
  inputRangeValue: PropTypes.shape({
    max: PropTypes.number.isRequired,
    min: PropTypes.number.isRequired,
  }).isRequired,
  setInputRangeValue: PropTypes.func.isRequired,
  cssClaseName: PropTypes.string,
  tooltip: PropTypes.func.isRequired,
};
