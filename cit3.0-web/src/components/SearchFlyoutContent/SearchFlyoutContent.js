import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Switch from "react-switch";
import { Button } from "shared-components";
import { Row, Col, Tooltip, OverlayTrigger } from "react-bootstrap";
import { MdHelp } from "react-icons/md";
import NumberRangeFilter from "../NumberRangeFilter/NumberRangeFilter";
import SelectFilter from "../SelectFilter/SelectFilter";
import CommunityOrPopulationProximityFilter from "../CommunityOrPopulationProximityFilter/CommunityOrPopulationProximityFilter";
import "./SearchFlyoutContent.scss";

export default function SearchFlyoutContent({ setQuery }) {
  const parcelSizeInitial = {
    max: 2000,
    min: 0,
  };
  const powerTransmissionLinesInitial = {
    max: 100,
    min: 0,
  };
  const airServiceInitial = {
    max: 500,
    min: 0,
  };
  const railConnectionsInitial = {
    max: 500,
    min: 0,
  };
  const deepWaterPortInitial = {
    max: 500,
    min: 0,
  };
  const proximityToCommunityOrPopulationInitial = {
    max: 500,
    min: 0,
  };
  const proximityCurrentCommunityInitial = null;
  const proximityCurrentPopulationInitial = null;
  const zoningQueryFiltersInitial = "";
  const zoningFiltersInitial = [
    {
      label: "Commercial",
      code: "COMM",
      isSelected: false,
    },
    {
      label: "Residential",
      code: "RESD",
      isSelected: false,
    },
    {
      label: "Agriculture",
      code: "AGRI",
      isSelected: false,
    },
    {
      label: "Industrial-light",
      code: "INDL",
      isSelected: false,
    },
    {
      label: "Industrial-heavy",
      code: "INDH",
      isSelected: false,
    },
  ];

  const [parcelSizeIsSelected, setParcelSizeIsSelected] = useState(false);
  const [parcelSizeInputRange, setParcelSizeInputRange] = useState(
    parcelSizeInitial
  );
  const [parcelSizeDisplayRange, setParcelSizeDisplayRange] = useState(
    parcelSizeInitial
  );
  const [
    powerTransmissionLinesIsSelected,
    setPowerTransmissionLinesIsSelected,
  ] = useState(false);
  const [
    powerTransmissionLinesInputRange,
    setPowerTransmissionLinesInputRange,
  ] = useState(powerTransmissionLinesInitial);
  const [
    powerTransmissionLinesDisplayRange,
    setPowerTransmissionLinesDisplayRange,
  ] = useState(powerTransmissionLinesInitial);
  const [airServiceIsSelected, setAirServiceIsSelected] = useState(false);
  const [airServiceInputRange, setAirServiceInputRange] = useState(
    airServiceInitial
  );
  const [airServiceDisplayRange, setAirServiceDisplayRange] = useState(
    airServiceInitial
  );
  const [deepWaterPortIsSelected, setDeepWaterPortIsSelected] = useState(false);
  const [deepWaterPortInputRange, setDeepWaterPortInputRange] = useState(
    deepWaterPortInitial
  );
  const [deepWaterPortDisplayRange, setDeepWaterPortDisplayRange] = useState(
    deepWaterPortInitial
  );

  const [railConnectionsIsSelected, setRailConnectionsIsSelected] = useState(
    false
  );
  const [railConnectionsInputRange, setRailConnectionsInputRange] = useState(
    railConnectionsInitial
  );
  const [
    railConnectionsDisplayRange,
    setRailConnectionsDisplayRange,
  ] = useState(railConnectionsInitial);
  const [
    proximityToCommunityOrPopulationIsSelected,
    setProximityToCommunityOrPopulationIsSelected,
  ] = useState(false);
  const [
    proximityToCommunityOrPopulationInputRange,
    setProximityToCommunityOrPopulationInputRange,
  ] = useState(proximityToCommunityOrPopulationInitial);
  const [
    proximityToCommunityOrPopulationDisplayRange,
    setproximityToCommunityOrPopulationDisplayRange,
  ] = useState(proximityToCommunityOrPopulationInitial);
  const [proximityCurrentCommunity, setProximityCurrentCommunity] = useState(
    proximityCurrentCommunityInitial
  );
  const [proximityCurrentPopulation, setProximityCurrentPopulation] = useState(
    proximityCurrentPopulationInitial
  );

  const [zoningIsSelected, setZoningIsSelected] = useState(false);
  const [zoningQueryFilters, setZoningQueryFilters] = useState(
    zoningQueryFiltersInitial
  );
  const [zoningFilters, setZoningFilters] = useState(zoningFiltersInitial);

  const [connectivitySwitchValue, setConnectivitySwitchValue] = useState(false);

  const [roadAccessSwitchValue, setRoadAccessSwitchValue] = useState(false);
  const [waterSwitchValue, setWaterSwitchValue] = useState(false);
  const [sewerSwitchValue, setSewerSwitchValue] = useState(false);
  const [
    electricalInfrastructureSwitchValue,
    setElectricalInfrastructureSwitchValue,
  ] = useState(false);
  const [naturalGasSwitchValue, setNaturalGasSwitchValue] = useState(false);

  const [excludeUnknowns, setExcludeUnknowns] = useState(false);

  const [postSecondarySwitchValue, setPostSecondarySwitchValue] = useState(
    false
  );
  const [researchCentreSwitchValue, setResearchCentreSwitchValue] = useState(
    false
  );
  const siteServicingFilters = [
    {
      label: "Road access:",
      checked: roadAccessSwitchValue,
      onChange: setRoadAccessSwitchValue,
      queryKey: "opportunity_road_connected",
    },
    {
      label: "Water:",
      checked: waterSwitchValue,
      onChange: setWaterSwitchValue,
      queryKey: "opportunity_water_connected",
    },
    {
      label: "Sewer:",
      checked: sewerSwitchValue,
      onChange: setSewerSwitchValue,
      queryKey: "opportunity_sewer_connected",
    },
    {
      label: "Electrical Infrastructure:",
      checked: electricalInfrastructureSwitchValue,
      onChange: setElectricalInfrastructureSwitchValue,
      queryKey: "opportunity_electrical_connected",
    },
    {
      label: "Natural Gas:",
      checked: naturalGasSwitchValue,
      onChange: setNaturalGasSwitchValue,
      queryKey: "opportunity_natural_gas_connected",
    },
    {
      label: "Connectivity (50/10Mbps+)",
      checked: connectivitySwitchValue,
      onChange: setConnectivitySwitchValue,
      queryKey: "connectivity",
    },
  ];

  const numberRangeFilters = [
    {
      selected: parcelSizeIsSelected,
      value: parcelSizeDisplayRange,
      queryKey: {
        min: "parcel_size_min",
        max: "parcel_size_max",
      },
    },
    {
      selected: powerTransmissionLinesIsSelected,
      value: powerTransmissionLinesDisplayRange,
      queryKey: {
        min: "power_transmission_lines_min",
        max: "power_transmission_lines_max",
      },
    },
    {
      selected: airServiceIsSelected,
      value: airServiceDisplayRange,
      queryKey: {
        min: "air_service_min",
        max: "air_service_max",
      },
    },
    {
      selected: railConnectionsIsSelected,
      value: railConnectionsDisplayRange,
      queryKey: {
        min: "rail_connections_min",
        max: "rail_connections_max",
      },
    },
    {
      selected: deepWaterPortIsSelected,
      value: deepWaterPortDisplayRange,
      queryKey: {
        min: "deep_water_port_min",
        max: "deep_water_port_max",
      },
    },
  ];

  const [resetRangeInput, setResetRangeInput] = useState(false);

  const handleResetFilters = () => {
    setExcludeUnknowns(false);
    setParcelSizeIsSelected(false);
    setParcelSizeInputRange(parcelSizeInitial);
    setParcelSizeDisplayRange(parcelSizeInitial);
    setPowerTransmissionLinesIsSelected(false);
    setPowerTransmissionLinesInputRange(powerTransmissionLinesInitial);
    setPowerTransmissionLinesDisplayRange(powerTransmissionLinesInitial);
    setAirServiceIsSelected(false);
    setAirServiceInputRange(airServiceInitial);
    setAirServiceDisplayRange(airServiceInitial);
    setDeepWaterPortIsSelected(false);
    setDeepWaterPortInputRange(deepWaterPortInitial);
    setDeepWaterPortDisplayRange(deepWaterPortInitial);
    setRailConnectionsIsSelected(false);
    setRailConnectionsInputRange(railConnectionsInitial);
    setRailConnectionsDisplayRange(railConnectionsInitial);
    setProximityToCommunityOrPopulationIsSelected(false);
    setProximityToCommunityOrPopulationInputRange(
      proximityToCommunityOrPopulationInitial
    );
    setproximityToCommunityOrPopulationDisplayRange(
      proximityToCommunityOrPopulationInitial
    );
    setProximityCurrentCommunity(proximityCurrentCommunityInitial);
    setProximityCurrentPopulation(proximityCurrentPopulationInitial);
    setZoningIsSelected(false);
    setZoningQueryFilters(zoningQueryFiltersInitial);
    setZoningFilters(zoningFiltersInitial);
    setConnectivitySwitchValue(false);
    setRoadAccessSwitchValue(false);
    setWaterSwitchValue(false);
    setSewerSwitchValue(false);
    setElectricalInfrastructureSwitchValue(false);
    setNaturalGasSwitchValue(false);
    setPostSecondarySwitchValue(false);
    setResearchCentreSwitchValue(false);
    setResetRangeInput(!resetRangeInput);
  };

  useEffect(() => {
    const query = new URLSearchParams();
    query.append("approval_status_id", "PUBL");
    siteServicingFilters.forEach((filter) => {
      query.append(filter.queryKey, filter.checked === true ? "Y" : "N");
    });

    query.append("exclude_unknowns", excludeUnknowns ? "Y" : "N");

    query.append(
      "post_secondary_within_100km",
      postSecondarySwitchValue ? "Y" : "N"
    );

    query.append(
      "research_centre_within_100km",
      researchCentreSwitchValue ? "Y" : "N"
    );

    const activeNumberRangeFilters = numberRangeFilters.filter(
      (filter) => filter.selected === true
    );

    activeNumberRangeFilters.forEach((filter) => {
      query.append(filter.queryKey.max, filter.value.max);
      query.append(filter.queryKey.min, filter.value.min);
    });

    if (zoningIsSelected) {
      query.append("zoning", zoningQueryFilters);
    }

    if (proximityToCommunityOrPopulationIsSelected) {
      query.append(
        "community_population_distance_max",
        proximityToCommunityOrPopulationDisplayRange.max
      );
      query.append(
        "community_population_distance_min",
        proximityToCommunityOrPopulationDisplayRange.min
      );

      if (proximityCurrentCommunity !== null) {
        query.append("proximity_community_id", proximityCurrentCommunity.value);
      }

      if (proximityCurrentPopulation !== null) {
        query.append("proximity_population", proximityCurrentPopulation.value);
      }
    }

    setQuery(query.toString());
  }, [
    roadAccessSwitchValue,
    waterSwitchValue,
    sewerSwitchValue,
    electricalInfrastructureSwitchValue,
    naturalGasSwitchValue,
    excludeUnknowns,
    parcelSizeDisplayRange,
    powerTransmissionLinesDisplayRange,
    airServiceDisplayRange,
    railConnectionsDisplayRange,
    deepWaterPortDisplayRange,
    postSecondarySwitchValue,
    researchCentreSwitchValue,
    connectivitySwitchValue,
    zoningQueryFilters,
    proximityToCommunityOrPopulationDisplayRange,
  ]);

  const siteServicingSection = siteServicingFilters.map((switchFilter) => (
    <Row className="flex-nowrap" key={switchFilter.label}>
      <Col xs={7}>
        <p>{switchFilter.label}</p>
      </Col>
      <Col xs="auto" className="no-padding">
        <p>No</p>
      </Col>
      <Col xs="auto">
        <Switch
          checked={switchFilter.checked}
          onChange={switchFilter.onChange}
          onColor="#aad3df"
          onHandleColor="#2693e6"
          handleDiameter={30}
          uncheckedIcon={false}
          checkedIcon={false}
          boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
          activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
          height={20}
          width={48}
        />
      </Col>
      <Col xs="auto" className="no-padding">
        <p>Yes</p>
      </Col>
    </Row>
  ));

  const renderTooltip = (props) => (
    // TODO: get text for this, currently placeholder
    <Tooltip id="button-tooltip" {...props}>
      Choose whether to exclude or include opportunities with site servicing
      values that are not set to Yes or No.
    </Tooltip>
  );

  return (
    <div className="search-flyout-content">
      <h2>Filter your search</h2>
      <h3>General site details</h3>
      <NumberRangeFilter
        inputRange={{ min: 0, max: 2000 }}
        units="acres"
        description="Size of Property (in acres)"
        label="Parcel Size"
        isSelected={parcelSizeIsSelected}
        setIsSelected={setParcelSizeIsSelected}
        inputRangeValue={parcelSizeInputRange}
        setInputRangeValue={setParcelSizeInputRange}
        initialInputRangeValues={parcelSizeInitial}
        resetRangeInput={resetRangeInput}
        displayRange={parcelSizeDisplayRange}
        setDisplayRange={setParcelSizeDisplayRange}
      />
      <SelectFilter
        label="Zoning"
        filters={zoningFilters}
        setFilters={setZoningFilters}
        isSelected={zoningIsSelected}
        setIsSelected={setZoningIsSelected}
        setQueryFilters={setZoningQueryFilters}
      />
      <NumberRangeFilter
        inputRange={{ min: 0, max: 100 }}
        units="km"
        description="Straight line distance to power transmission lines in km"
        label="Power Transmission Lines"
        isDistance
        isSelected={powerTransmissionLinesIsSelected}
        setIsSelected={setPowerTransmissionLinesIsSelected}
        inputRangeValue={powerTransmissionLinesInputRange}
        setInputRangeValue={setPowerTransmissionLinesInputRange}
        initialInputRangeValues={powerTransmissionLinesInitial}
        resetRangeInput={resetRangeInput}
        displayRange={powerTransmissionLinesDisplayRange}
        setDisplayRange={setPowerTransmissionLinesDisplayRange}
      />
      <Row className="flex-nowrap">
        <Col xs="6">
          <h3>Site Servicing</h3>
        </Col>
        <Col xs="auto" className="exclude-unknown-section">
          <input
            type="checkbox"
            checked={excludeUnknowns}
            value={excludeUnknowns}
            onChange={() => setExcludeUnknowns(!excludeUnknowns)}
          />
        </Col>
        <Col xs="auto" className="exclude-unknown-section">
          <span>
            Exclude Unknown{" "}
            <span>
              <OverlayTrigger
                placement="right"
                delay={{ show: 100, hide: 100 }}
                overlay={renderTooltip}
              >
                <MdHelp color="#2693e6" size="1.3em" />
              </OverlayTrigger>
            </span>
          </span>
        </Col>
      </Row>
      {siteServicingSection}
      <h3>Transportation</h3>
      <NumberRangeFilter
        inputRange={{ min: 0, max: 500 }}
        units="km"
        description="Straight line distance to airport in km"
        label="Air Service"
        isDistance
        isSelected={airServiceIsSelected}
        setIsSelected={setAirServiceIsSelected}
        inputRangeValue={airServiceInputRange}
        setInputRangeValue={setAirServiceInputRange}
        initialInputRangeValues={airServiceInitial}
        resetRangeInput={resetRangeInput}
        displayRange={airServiceDisplayRange}
        setDisplayRange={setAirServiceDisplayRange}
      />
      <NumberRangeFilter
        inputRange={{ min: 0, max: 500 }}
        units="km"
        description="Straight line distance to rail connections in km"
        label="Rail Connections"
        isDistance
        isSelected={railConnectionsIsSelected}
        setIsSelected={setRailConnectionsIsSelected}
        inputRangeValue={railConnectionsInputRange}
        setInputRangeValue={setRailConnectionsInputRange}
        initialInputRangeValues={railConnectionsInitial}
        resetRangeInput={resetRangeInput}
        displayRange={railConnectionsDisplayRange}
        setDisplayRange={setRailConnectionsDisplayRange}
      />
      <NumberRangeFilter
        inputRange={{ min: 0, max: 500 }}
        units="km"
        description="Straight line distance to deep water port in km"
        label="Deep Water Port"
        isDistance
        isSelected={deepWaterPortIsSelected}
        setIsSelected={setDeepWaterPortIsSelected}
        inputRangeValue={deepWaterPortInputRange}
        setInputRangeValue={setDeepWaterPortInputRange}
        initialInputRangeValues={deepWaterPortInitial}
        resetRangeInput={resetRangeInput}
        displayRange={deepWaterPortDisplayRange}
        setDisplayRange={setDeepWaterPortDisplayRange}
      />
      <h3>Nearby Communities</h3>
      <CommunityOrPopulationProximityFilter
        inputRange={{ min: 0, max: 500 }}
        units="km"
        label="Proximity to community/population"
        isSelected={proximityToCommunityOrPopulationIsSelected}
        setIsSelected={setProximityToCommunityOrPopulationIsSelected}
        inputRangeValue={proximityToCommunityOrPopulationInputRange}
        setInputRangeValue={setProximityToCommunityOrPopulationInputRange}
        initialInputRangeValues={proximityToCommunityOrPopulationInitial}
        resetRangeInput={resetRangeInput}
        displayRange={proximityToCommunityOrPopulationDisplayRange}
        setDisplayRange={setproximityToCommunityOrPopulationDisplayRange}
        currentCommunity={proximityCurrentCommunity}
        setCurrentCommunity={setProximityCurrentCommunity}
        currentPopulation={proximityCurrentPopulation}
        setCurrentPopulation={setProximityCurrentPopulation}
      />
      <h3>Advanced Education &amp; Research</h3>
      <Row className="flex-nowrap">
        <Col xs={7}>
          <p>Post-secondary Institute within 100km?:</p>
        </Col>
        <Col xs="auto" className="no-padding">
          <p>No</p>
        </Col>
        <Col xs="auto">
          <Switch
            checked={postSecondarySwitchValue}
            onChange={setPostSecondarySwitchValue}
            onColor="#aad3df"
            onHandleColor="#2693e6"
            handleDiameter={30}
            uncheckedIcon={false}
            checkedIcon={false}
            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
            height={20}
            width={48}
          />
        </Col>
        <Col xs="auto" className="no-padding">
          <p>Yes</p>
        </Col>
      </Row>
      <Row className="flex-nowrap">
        <Col xs={7}>
          <p>Research Centre within 100km?:</p>
        </Col>
        <Col xs="auto" className="no-padding">
          <p>No</p>
        </Col>
        <Col xs="auto">
          <Switch
            checked={researchCentreSwitchValue}
            onChange={setResearchCentreSwitchValue}
            onColor="#aad3df"
            onHandleColor="#2693e6"
            handleDiameter={30}
            uncheckedIcon={false}
            checkedIcon={false}
            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
            height={20}
            width={48}
          />
        </Col>
        <Col xs="auto" className="no-padding">
          <p>Yes</p>
        </Col>
      </Row>
      <hr className="hr-bold" />
      <div className="d-flex justify-content-end">
        <Button
          styling="BC-Gov-SecondaryButton"
          label="Reset all filters"
          onClick={() => handleResetFilters()}
        />
      </div>
    </div>
  );
}

SearchFlyoutContent.propTypes = {
  setQuery: PropTypes.func.isRequired,
};
