import { useState } from "react";
import PropTypes from "prop-types";
import { Button } from "shared-components";
import { Modal, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import InputRangeWithTextboxes from "../InputRangeWithTextboxes/InputRangeWithTextboxes";
import { setOptions, getOptions } from "../../store/actions/options";
import "./CommunityOrPopulationProximityFilter.scss";

export default function CommunityOrPopulationProximityFilter(props) {
  const dispatch = useDispatch();
  const { inputRange, units, label } = props;
  const [show, setShow] = useState(false);
  const [inputRangeValue, setInputRangeValue] = useState({
    min: inputRange.min,
    max: inputRange.max,
  });
  const [minInput, setMinInput] = useState(inputRange.min);
  const [maxInput, setMaxInput] = useState(inputRange.max);
  const [validMax, setValidMax] = useState(true);
  const [validMin, setValidMin] = useState(true);
  const [currentCommunity, setCurrentCommunity] = useState(null);
  const [currentPopulation, setCurrentPopulation] = useState(null);
  const [displayRange, setDisplayRange] = useState({});
  const [
    displayCommunityOrPopulation,
    setDisplayCommunityOrPopulation,
  ] = useState(null);
  const [isSelected, setIsSelected] = useState(false);

  const inputRangeMax = inputRange.max;
  const inputRangeMin = inputRange.min;

  const communityOptions = useSelector(
    (state) => state.options.communities
  ).map((option) => ({ value: option.id, label: option.place_name }));

  // Fetch options, if not already stored on client
  if (!communityOptions.length) {
    getOptions().then((response) => {
      dispatch(setOptions(response.data));
    });
  }

  console.log(validMin);
  console.log(validMax);

  const populationOptions = [
    {
      label: "500",
      value: 500,
    },
    {
      label: "1000",
      value: 1000,
    },
    {
      label: "2500",
      value: 2500,
    },
    {
      label: "5000",
      value: 5000,
    },
    {
      label: "10000",
      value: 10000,
    },
    {
      label: "20000",
      value: 20000,
    },
    {
      label: "50000",
      value: 50000,
    },
  ];

  const handleCommunityChange = (value) => {
    setCurrentCommunity(value);
    setCurrentPopulation(null);
  };

  const handlePopulationChange = (value) => {
    setCurrentPopulation(value);
    setCurrentCommunity(null);
  };

  const handleSave = () => {
    setIsSelected(true);
    setShow(false);
    setDisplayRange({
      min: inputRangeValue.min,
      max: inputRangeValue.max,
    });
    if (currentCommunity !== null) {
      setDisplayCommunityOrPopulation(currentCommunity.label);
    } else {
      setDisplayCommunityOrPopulation(
        `population of at least ${currentPopulation.label}`
      );
    }
  };

  const handleClear = () => {
    setInputRangeValue({ min: inputRangeMin, max: inputRangeMax });
    setMaxInput(inputRangeMax);
    setMinInput(inputRangeMin);
    setValidMin(true);
    setValidMax(true);
    setCurrentCommunity(null);
    setCurrentPopulation(null);
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
          label={`${label}: within ${displayRange.min}-${displayRange.max} ${units} of ${displayCommunityOrPopulation}`}
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
          <p>Distance</p>
          <InputRangeWithTextboxes
            inputRange={inputRange}
            units={units}
            minInput={minInput}
            setMinInput={setMinInput}
            maxInput={maxInput}
            setMaxInput={setMaxInput}
            inputRangeValue={inputRangeValue}
            setInputRangeValue={setInputRangeValue}
            validMax={validMax}
            validMin={validMin}
            setValidMax={setValidMax}
            setValidMin={setValidMin}
          />
          <Container>
            <Row id="community-label">From this community</Row>
            <Row>
              <Select
                aria-labelledby="community-label"
                options={communityOptions}
                value={currentCommunity}
                onChange={(value) => handleCommunityChange(value)}
                className="w-100"
              />
            </Row>
            <Row id="population-label">OR population of at least</Row>
            <Row>
              <Select
                aria-labelledby="population-label"
                options={populationOptions}
                value={currentPopulation}
                onChange={(value) => handlePopulationChange(value)}
                className="w-100"
              />
            </Row>
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
            disabled={
              validMin === false ||
              validMax === false ||
              (currentCommunity === null && currentPopulation === null)
            }
          />
        </Modal.Footer>
      </Modal>
    </>
  );
}

CommunityOrPopulationProximityFilter.propTypes = {
  inputRange: PropTypes.shape({
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
  }).isRequired,
  units: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};
