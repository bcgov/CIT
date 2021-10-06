import PropTypes from "prop-types";
import { Row, Container } from "react-bootstrap";
import InputRange from "react-input-range";
import TextInput from "../FormComponents/TextInput";
import Validator from "../FormComponents/Validator";
import "react-input-range/src/scss/index.scss";
import "./InputRangeWithTextboxes.scss";

export default function InputRangeWithTextboxes(props) {
  const {
    inputRange,
    units,
    minInput,
    setMinInput,
    maxInput,
    setMaxInput,
    inputRangeValue,
    setInputRangeValue,
    validMax,
    validMin,
    setValidMax,
    setValidMin,
  } = props;

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
    let newMaxSubstring = newMax.substring(0, 8);
    if (newMaxSubstring === "") {
      newMaxSubstring = "0";
    }
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
    let newMinSubstring = newMin.substring(0, 8);
    if (newMinSubstring === "") {
      newMinSubstring = "0";
    }
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
    setMinInput(String(updatedValue.min));
    setMaxInput(String(updatedValue.max));
    setValidMin(true);
    setValidMax(true);
  };

  setMinInput(String(inputRangeValue.min));
  setMaxInput(String(inputRangeValue.max));

  return (
    <Container fluid>
      <div className="input-range">
        <InputRange
          maxValue={inputRangeMax}
          minValue={inputRangeMin}
          value={inputRangeValue}
          formatLabel={() => {}}
          onChange={(value) => updateTextFields(value)}
        />
      </div>
      <Row className="d-flex flex-nowrap justify-content-between">
        <div className="input-range-text-input">
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
          {!validMin ? <Validator message="Invalid min number" /> : <div />}
          {!validMax ? <Validator message="Invalid max number" /> : <div />}
        </Row>
      )}
    </Container>
  );
}

InputRangeWithTextboxes.propTypes = {
  inputRange: PropTypes.shape({
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
  }).isRequired,
  units: PropTypes.string.isRequired,
  minInput: PropTypes.string.isRequired,
  setMinInput: PropTypes.func.isRequired,
  maxInput: PropTypes.string.isRequired,
  setMaxInput: PropTypes.func.isRequired,
  inputRangeValue: PropTypes.shape({
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
  }).isRequired,
  setInputRangeValue: PropTypes.func.isRequired,
  validMax: PropTypes.bool.isRequired,
  validMin: PropTypes.bool.isRequired,
  setValidMax: PropTypes.func.isRequired,
  setValidMin: PropTypes.func.isRequired,
};
