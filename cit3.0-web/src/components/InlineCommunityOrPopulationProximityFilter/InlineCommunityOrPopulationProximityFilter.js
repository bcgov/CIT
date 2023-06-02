import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import Select, { createFilter } from "react-select";
import InputRangeWithTextboxes from "../InputRangeWithTextboxes/InputRangeWithTextboxes";
import "./InlineCommunityOrPopulationProximityFilter.scss";

export default function InlineCommunityOrPopulationProximityFilter(props) {
  const {
    inputRange,
    units,
    label,
    isSelected,
    setIsSelected,
    minInput,
    setMinInput,
    maxInput,
    setMaxInput,
    inputRangeValue,
    setInputRangeValue,
    currentCommunity,
    setCurrentCommunity,
    currentPopulation,
    setCurrentPopulation,
  } = props;
  const initialLabel = () => {
    if (currentCommunity !== null) {
      return currentCommunity.label;
    }
    if (currentPopulation !== null) {
      return `population of at least ${currentPopulation}`;
    }
    return "";
  };
  const [validMax, setValidMax] = useState(true);
  const [validMin, setValidMin] = useState(true);
  const [
    displayCommunityOrPopulation,
    setDisplayCommunityOrPopulation,
  ] = useState(initialLabel());
  const communityOptions = useSelector(
    (state) => state.options.communities
  ).map((option) => ({ value: option.id, label: option.place_name }));
  useEffect(() => {
    if (currentCommunity !== null) {
      setDisplayCommunityOrPopulation(
        currentCommunity && currentCommunity.label
      );
    }
  }, [communityOptions]);

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

  return (
    <>
      <p>Distance</p>
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
      <Container>
        <Row id="community-label">From this community</Row>
        <Row>
          <Select
            aria-labelledby="community-label"
            options={communityOptions}
            value={currentCommunity}
            defaultValue={currentCommunity}
            onChange={(value) => handleCommunityChange(value)}
            className="w-100"
            filterOption={createFilter({ ignoreAccents: false })}
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
    </>
  );
}

InlineCommunityOrPopulationProximityFilter.defaultProps = {
  currentCommunity: null,
  currentPopulation: null,
};

InlineCommunityOrPopulationProximityFilter.propTypes = {
  inputRange: PropTypes.shape({
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
  }).isRequired,
  units: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  setIsSelected: PropTypes.func.isRequired,
  minInput: PropTypes.number.isRequired,
  setMinInput: PropTypes.func.isRequired,
  maxInput: PropTypes.number.isRequired,
  setMaxInput: PropTypes.func.isRequired,
  inputRangeValue: PropTypes.number.isRequired,
  setInputRangeValue: PropTypes.func.isRequired,
  currentCommunity: PropTypes.shape({
    value: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
  }),
  setCurrentCommunity: PropTypes.func.isRequired,
  currentPopulation: PropTypes.shape({
    value: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
  }),
  setCurrentPopulation: PropTypes.func.isRequired,
};
