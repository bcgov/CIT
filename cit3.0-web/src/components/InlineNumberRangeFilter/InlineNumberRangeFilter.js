import { OverlayTrigger, Tooltip, useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./InlineNumberRangeFilter.scss";
import { Button } from "shared-components";
import { Modal } from "react-bootstrap";
import "react-input-range/src/scss/index.scss";
import InputRangeWithTextboxes from "../InputRangeWithTextboxes/InputRangeWithTextboxes";

export default function InlineNumberRangeFilter(props) {
  const {
    inputRange,
    units,
    description,
    label,
    isDistance,
    isSelected,
    setIsSelected,
    inputRangeValue,
    setInputRangeValue,
    displayRange,
    setDisplayRange,
    onSave,
  } = props;
  const [show, setShow] = useState(false);
  const [minInput, setMinInput] = useState(String(inputRange.min));
  const [maxInput, setMaxInput] = useState(String(inputRange.max));
  const [validMax, setValidMax] = useState(true);
  const [validMin, setValidMin] = useState(true);

  const inputRangeMax = inputRange.max;
  const inputRangeMin = inputRange.min;

  const handleSave = () => {
    setIsSelected(true);
    setShow(false);
    setDisplayRange({
      min: inputRangeValue.min,
      max: inputRangeValue.max,
    });
    onSave({
      min: inputRangeValue.min,
      max: inputRangeValue.max,
    });
  };
  const handleClear = () => {
    setInputRangeValue({ min: inputRangeMin, max: inputRangeMax });
    setMaxInput(String(inputRangeMax));
    setMinInput(String(inputRangeMin));
    setValidMin(true);
    setValidMax(true);
    setIsSelected(false);
    setShow(false);
    setDisplayRange({
      min: inputRangeMin,
      max: inputRangeMax,
    });
    onSave({
      min: "",
      max: "",
    });
  };
  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    // Reset values to previous state
    setInputRangeValue({ ...displayRange });
    setMaxInput(String(displayRange.max));
    setMinInput(String(displayRange.min));
    setValidMin(true);
    setValidMax(true);
  };

  const renderSaveTooltip = (saveProps) => (
    <Tooltip id="button-tooltip" {...saveProps}>
      Apply this filter
    </Tooltip>
  );

  const renderClearTooltip = (clearProps) => (
    <Tooltip id="button-tooltip" {...clearProps}>
      Clear this filter
    </Tooltip>
  );

  return (
    <>
      <Button
        label="&#x2714;"
        styling="bcgov-normal-blue btn bcgov-filter-apply"
        onClick={handleSave}
      />
      <Button
        label="&#x2716;"
        styling="bcgov-normal-white mr-auto btn bcgov-filter-clear"
        onClick={handleClear}
        Tooltip="Enable this filter"
      />
      <p>{description}</p>
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
        />
      ) : null}
    </>
  );
}

InlineNumberRangeFilter.defaultProps = {
  isDistance: false,
};

InlineNumberRangeFilter.propTypes = {
  inputRange: PropTypes.shape({
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
  }).isRequired,
  units: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  isDistance: PropTypes.bool,
  isSelected: PropTypes.bool.isRequired,
  setIsSelected: PropTypes.func.isRequired,
  inputRangeValue: PropTypes.shape({
    max: PropTypes.number.isRequired,
    min: PropTypes.number.isRequired,
  }).isRequired,
  setInputRangeValue: PropTypes.func.isRequired,
  displayRange: PropTypes.shape({
    max: PropTypes.number.isRequired,
    min: PropTypes.number.isRequired,
  }).isRequired,
  setDisplayRange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};
