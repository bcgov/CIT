import { useState } from "react";
import PropTypes from "prop-types";
import "./NumberRangeFilter.scss";
import { Button } from "shared-components";
import { Modal } from "react-bootstrap";
import "react-input-range/src/scss/index.scss";
import InputRangeWithTextboxes from "../InputRangeWithTextboxes/InputRangeWithTextboxes";

export default function NumberRangeFilter(props) {
  const { inputRange, units, description, label, isDistance } = props;
  const [show, setShow] = useState(false);
  const [inputRangeValue, setInputRangeValue] = useState({
    min: inputRange.min,
    max: inputRange.max,
  });
  const [minInput, setMinInput] = useState(inputRange.min);
  const [maxInput, setMaxInput] = useState(inputRange.max);
  const [validMax, setValidMax] = useState(true);
  const [validMin, setValidMin] = useState(true);
  const [displayRange, setDisplayRange] = useState({});
  const [isSelected, setIsSelected] = useState(false);
  const [isModified, setIsModified] = useState(false);

  const inputRangeMax = inputRange.max;
  const inputRangeMin = inputRange.min;

  const handleSave = () => {
    if (isModified) {
      setIsSelected(true);
      setShow(false);
      setDisplayRange({
        min: inputRangeValue.min,
        max: inputRangeValue.max,
      });
    } else {
      setIsSelected(false);
    }
    setShow(false);
  };
  const handleClear = () => {
    setInputRangeValue({ min: inputRangeMin, max: inputRangeMax });
    setMaxInput(inputRangeMax);
    setMinInput(inputRangeMin);
    setValidMin(true);
    setValidMax(true);
    setIsModified(false);
  };
  const handleShow = () => setShow(true);
  const handleClose = () => {
    setIsSelected(true);
    setShow(false);
  };

  const handleModified = (value, setStateFunction) => {
    console.log(isModified);
    console.log(value);
    setIsModified(true);
    setStateFunction(value);
  };

  return (
    <>
      {!isSelected ? (
        <Button
          label={label}
          styling="bcgov-normal-white filter-button unselected btn"
          onClick={handleShow}
        />
      ) : (
        <Button
          label={`${label}: ${isDistance ? "within" : ""} ${displayRange.min}-${
            displayRange.max
          } ${units}`}
          styling="bcgov-normal-blue filter-button selected btn"
          onClick={handleShow}
        />
      )}

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>{label}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{description}</p>
          <InputRangeWithTextboxes
            inputRange={inputRange}
            units={units}
            minInput={minInput}
            setMinInput={(value) => handleModified(value, setMinInput)}
            maxInput={maxInput}
            setMaxInput={(value) => handleModified(value, setMaxInput)}
            inputRangeValue={inputRangeValue}
            setInputRangeValue={(value) =>
              handleModified(value, setInputRangeValue)
            }
            validMax={validMax}
            validMin={validMin}
            setValidMax={setValidMax}
            setValidMin={setValidMin}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            label="Clear"
            styling="bcgov-normal-white mr-auto modal-reset-button btn"
            onClick={handleClear}
          />
          <Button
            label="Save"
            styling="bcgov-normal-blue modal-save-button btn"
            onClick={handleSave}
            disabled={!validMin || !validMax}
          />
        </Modal.Footer>
      </Modal>
    </>
  );
}

NumberRangeFilter.defaultProps = {
  isDistance: false,
};

NumberRangeFilter.propTypes = {
  inputRange: PropTypes.shape({
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
  }).isRequired,
  units: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  isDistance: PropTypes.bool,
};
