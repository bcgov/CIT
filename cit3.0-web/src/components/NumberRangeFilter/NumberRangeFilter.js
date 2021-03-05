import { useState } from "react";
import "./NumberRangeFilter.scss";
import { Button } from "shared-components";
import { Modal, Row, Container } from "react-bootstrap";
import InputRange from "react-input-range";
import TextInput from "../FormComponents/TextInput";
import Validator from "../FormComponents/Validator";
import "react-input-range/src/scss/index.scss";

export default function NumberRangeFilter(props) {
  const [show, setShow] = useState(false);
  const [inputRangeValue, setInputRangeValue] = useState({
    min: 0,
    max: 50000,
  });
  const [minInput, setMinInput] = useState(0);
  const [maxInput, setMaxInput] = useState(50000);
  const [validMax, setValidMax] = useState(true);
  const [validMin, setValidMin] = useState(true);
  const [displayRange, setDisplayRange] = useState({});
  const [isSelected, setIsSelected] = useState(false);

  const inputRangeMax = 50000;
  const inputRangeMin = 0;
  const units = "acres";

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
    setMaxInput(newMax);
    if (validate(name, Number(newMax))) {
      setValidMax(true);
      setInputRangeValue({ min: inputRangeValue.min, max: Number(newMax) });
    } else {
      setValidMax(false);
    }
  };

  const updateMin = (name, newMin) => {
    setMinInput(newMin);

    if (validate(name, Number(newMin))) {
      setValidMin(true);
      setInputRangeValue({ min: Number(newMin), max: inputRangeValue.max });
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
          label="Parcel Size"
          styling="bcgov-normal-white filter-button unselected btn"
          onClick={handleShow}
        />
      ) : (
        <Button
          label={`Parcel Size: ${displayRange.min}-${displayRange.max} ${units}`}
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
          <Modal.Title>Parcel Size</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Size of Property (in square feet)</p>
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
            <Row className="d-flex justify-content-between">
              <div className="modal-text-input">
                <TextInput
                  aria-labelledby="water-max-cap-label"
                  handleChange={updateMin}
                  name={minName}
                  rows={1}
                  value={String(minInput)}
                />
              </div>
              <div className="modal-text-input">
                <TextInput
                  aria-labelledby="water-max-cap-label"
                  handleChange={updateMax}
                  name={maxName}
                  rows={1}
                  value={String(maxInput)}
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
