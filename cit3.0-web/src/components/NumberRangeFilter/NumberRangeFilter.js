import { useState } from "react";
import PropTypes from "prop-types";
import "./NumberRangeFilter.scss";
import { Button } from "shared-components";
import { Modal, Row, Container } from "react-bootstrap";
import InputRange from "react-input-range";
import TextInput from "../FormComponents/TextInput";
import Validator from "../FormComponents/Validator";
import "react-input-range/src/scss/index.scss";

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

  const inputRangeMax = inputRange.max;
  const inputRangeMin = inputRange.min;

  const minName = "number-range-min";
  const maxName = "number-range-max";

  const validate = (name, value) => {
    if (Number.isNaN(value)) {
      return false;
    }

    if (value < inputRangeMin || value > inputRangeMax) {
      return false;
    }

    if (name === maxName && value < inputRangeValue.min) {
      return false;
    }

    if (name === minName && value > inputRangeValue.max) {
      return false;
    }

    return true;
  };

  const updateMax = (name, newMax) => {
    const newMaxSubstring = newMax.substring(0, 8);
    setMaxInput(newMaxSubstring);
    if (validate(name, Number(newMaxSubstring))) {
      setValidMax(true);
      setInputRangeValue({
        min: inputRangeValue.min,
        max: Number(newMaxSubstring),
      });
    } else {
      setValidMax(false);
    }
  };

  const updateMin = (name, newMin) => {
    const newMinSubstring = newMin.substring(0, 8);
    setMinInput(newMinSubstring);
    if (validate(name, Number(newMinSubstring))) {
      setValidMin(true);
      setInputRangeValue({
        min: Number(newMinSubstring),
        max: inputRangeValue.max,
      });
    } else {
      setValidMin(false);
    }
  };

  const updateTextFields = (value) => {
    const updatedValue = { ...value };

    // Fix component allowing you select values beyond min/max range by clicking the edges of the input range
    if (updatedValue.min < inputRangeMin) {
      updatedValue.min = inputRangeMin;
    }
    if (updatedValue.max > inputRangeMax) {
      updatedValue.max = inputRangeMax;
    }

    setInputRangeValue(updatedValue);
    setMinInput(updatedValue.min);
    setMaxInput(updatedValue.max);
    setValidMin(true);
    setValidMax(true);
  };

  const handleSave = () => {
    setIsSelected(true);
    setShow(false);
    setDisplayRange({
      min: inputRangeValue.min,
      max: inputRangeValue.max,
    });
  };
  const handleClear = () => {
    setInputRangeValue({ min: inputRangeMin, max: inputRangeMax });
    setMaxInput(inputRangeMax);
    setMinInput(inputRangeMin);
    setValidMin(true);
    setValidMax(true);
  };
  const handleShow = () => setShow(true);
  const handleClose = () => {
    setIsSelected(true);
    setShow(false);
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
          <Container fluid>
            <div className="modal-input-range">
              <InputRange
                maxValue={inputRangeMax}
                minValue={inputRangeMin}
                value={inputRangeValue}
                formatLabel={() => {}}
                onChange={(value) => updateTextFields(value)}
              />
            </div>
            <Row className="d-flex flex-nowrap justify-content-between">
              <div className="modal-text-input">
                <TextInput
                  handleChange={updateMin}
                  name={minName}
                  rows={1}
                  value={String(minInput)}
                  upperLeftLabel="min"
                  lowerRightLabel={units}
                />
              </div>
              <div className="modal-text-input">
                <TextInput
                  handleChange={updateMax}
                  name={maxName}
                  rows={1}
                  value={String(maxInput)}
                  upperLeftLabel="max"
                  lowerRightLabel={units}
                />
              </div>
            </Row>
            {(!validMax || !validMin) && (
              <Row className="d-flex justify-content-between">
                {!validMin ? (
                  <Validator message="Invalid min number" />
                ) : (
                  <div />
                )}
                {!validMax ? (
                  <Validator message="Invalid max number" />
                ) : (
                  <div />
                )}
              </Row>
            )}
          </Container>
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
