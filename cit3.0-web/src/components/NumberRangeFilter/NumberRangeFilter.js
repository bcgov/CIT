import { useState } from "react";
import "./NumberRangeFilter.css";
import { Button } from "shared-components";
import { Modal, Row, Container } from "react-bootstrap";
import InputRange from "react-input-range";
import TextInput from "../FormComponents/TextInput";
import Validator from "../FormComponents/Validator";
import "react-input-range/src/scss/index.scss";

export default function NumberRangeFilter() {
  const [show, setShow] = useState(false);
  const [inputRangeValue, setInputRangeValue] = useState({
    min: 0,
    max: 50000,
  });
  const [minInput, setMinInput] = useState(0);
  const [maxInput, setMaxInput] = useState(50000);
  const [validMax, setValidMax] = useState(true);
  const [validMin, setValidMin] = useState(true);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const maxValue = 50000;
  const minValue = 0;

  const minName = "number-range-min";
  const maxName = "number-range-max";

  const validate = (name, value) => {
    if (Number.isNaN(value)) {
      return false;
    }

    if (value < minValue || value > maxValue) {
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
    if (updatedValue.min < minValue) {
      updatedValue.min = minValue;
    }
    if (updatedValue.max > maxValue) {
      updatedValue.max = maxValue;
    }

    setInputRangeValue(updatedValue);
    setMinInput(updatedValue.min);
    setMaxInput(updatedValue.max);
    setValidMin(true);
    setValidMax(true);
  };

  return (
    <>
      <Button
        label="Parcel Size"
        styling="bcgov-normal-white filter-button unselected btn"
        onClick={handleShow}
      />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Parcel Size</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Size of Property (in square feet)</p>
          <div className="input-range-section">
            <InputRange
              maxValue={maxValue}
              minValue={minValue}
              value={inputRangeValue}
              formatLabel={() => {}}
              onChange={(value) => updateTextFields(value)}
            />
          </div>
          <Container fluid>
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
          <p>Save</p>
        </Modal.Footer>
      </Modal>
    </>
  );
}
