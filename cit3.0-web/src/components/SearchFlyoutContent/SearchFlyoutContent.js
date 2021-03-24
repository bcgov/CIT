import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Switch from "react-switch";
import { Row, Col, Tooltip, OverlayTrigger } from "react-bootstrap";
import { MdHelp } from "react-icons/md";
import NumberRangeFilter from "../NumberRangeFilter/NumberRangeFilter";
import SelectFilter from "../SelectFilter/SelectFilter";
import CommunityOrPopulationProximityFilter from "../CommunityOrPopulationProximityFilter/CommunityOrPopulationProximityFilter";
import "./SearchFlyoutContent.scss";

export default function SearchFlyoutContent({ setQuery }) {
  const parcelSizeInitial = {
    max: 250000,
    min: 0,
  };
  const grossFloorAreaInitial = {
    max: 50000,
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
  const rAndDInitial = {
    max: 500,
    min: 0,
  };

  const [parcelSizeIsSelected, setParcelSizeIsSelected] = useState(false);
  const [parcelSizeInputRange, setParcelSizeInputRange] = useState(
    parcelSizeInitial
  );
  const [parcelSizeDisplayRange, setParcelSizeDisplayRange] = useState({
    min: 0,
    max: 0,
  });
  const [grossFloorAreaIsSelected, setGrossFloorAreaIsSelected] = useState(
    false
  );
  const [grossFloorAreaInputRange, setGrossFloorAreaInputRange] = useState(
    grossFloorAreaInitial
  );
  const [grossFloorAreaDisplayRange, setGrossFloorAreaDisplayRange] = useState({
    min: 0,
    max: 0,
  });
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
  ] = useState({ min: 0, max: 0 });
  const [airServiceIsSelected, setAirServiceIsSelected] = useState(false);
  const [airServiceInputRange, setAirServiceInputRange] = useState(
    airServiceInitial
  );
  const [airServiceDisplayRange, setAirServiceDisplayRange] = useState({
    min: 0,
    max: 0,
  });
  const [deepWaterPortIsSelected, setDeepWaterPortIsSelected] = useState(false);
  const [deepWaterPortInputRange, setDeepWaterPortInputRange] = useState(
    deepWaterPortInitial
  );
  const [deepWaterPortDisplayRange, setDeepWaterPortDisplayRange] = useState({
    min: 0,
    max: 0,
  });

  const [railConnectionsIsSelected, setRailConnectionsIsSelected] = useState(
    false
  );
  const [railConnectionsInputRange, setRailConnectionsInputRange] = useState(
    railConnectionsInitial
  );
  const [
    railConnectionsDisplayRange,
    setRailConnectionsDisplayRange,
  ] = useState({ min: 0, max: 0 });
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
  ] = useState({ min: 0, max: 0 });
  const [rAndDIsSelected, setRAndDIsSelected] = useState(false);
  const [rAndDInputRange, setRAndDInputRange] = useState(rAndDInitial);
  const [rAndDDisplayRange, setRAndDDisplayRange] = useState({
    min: 0,
    max: 0,
  });
  const [zoningFilters, setZoningFilters] = useState([
    {
      label: "Commercial",
      isSelected: false,
    },
    {
      label: "Residential",
      isSelected: false,
    },
    {
      label: "Agriculture",
      isSelected: false,
    },
    {
      label: "Industrial-light",
      isSelected: false,
    },
    {
      label: "Industrial-heavy",
      isSelected: false,
    },
  ]);

  const [connectivityFilters, setConnectivityFilters] = useState([
    {
      label: "50/10 mbps",
      isSelected: false,
    },
    {
      label: "25/5 mbps",
      isSelected: false,
    },
    {
      label: "10/2 mbps",
      isSelected: false,
    },
    {
      label: "5/1 mbps",
      isSelected: false,
    },
  ]);

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
  const switchFilters = [
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
      selected: grossFloorAreaIsSelected,
      value: grossFloorAreaDisplayRange,
      queryKey: {
        min: "gross_floor_area_min",
        max: "gross_floor_area_max",
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

  useEffect(() => {
    const query = new URLSearchParams();
    switchFilters.forEach((filter) => {
      query.append(filter.queryKey, filter.checked === true ? "Y" : "N");
    });

    query.append("exclude_unknowns", excludeUnknowns ? "Y" : "N");

    const activeNumberRangeFilters = numberRangeFilters.filter(
      (filter) => filter.selected === true
    );

    activeNumberRangeFilters.forEach((filter) => {
      query.append(filter.queryKey.max, filter.value.max);
      query.append(filter.queryKey.min, filter.value.min);
    });

    setQuery(query.toString());
  }, [
    roadAccessSwitchValue,
    waterSwitchValue,
    sewerSwitchValue,
    electricalInfrastructureSwitchValue,
    naturalGasSwitchValue,
    excludeUnknowns,
    parcelSizeDisplayRange,
    grossFloorAreaDisplayRange,
    powerTransmissionLinesDisplayRange,
    airServiceDisplayRange,
    railConnectionsDisplayRange,
    deepWaterPortDisplayRange,
  ]);

  const siteServicingSection = switchFilters.map((switchFilter) => (
    <Row className="flex-nowrap" key={switchFilter.label}>
      <Col xs={7}>
        <p>{switchFilter.label}</p>
      </Col>
      <Col xs="auto" className="no-padding">
        <p>Off</p>
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
        <p>On</p>
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
        inputRange={{ min: 0, max: 250000 }}
        units="acres"
        description="Size of Property (in acres)"
        label="Parcel Size"
        isSelected={parcelSizeIsSelected}
        setIsSelected={setParcelSizeIsSelected}
        inputRangeValue={parcelSizeInputRange}
        setInputRangeValue={setParcelSizeInputRange}
        initialInputRangeValues={parcelSizeInitial}
        displayRange={parcelSizeDisplayRange}
        setDisplayRange={setParcelSizeDisplayRange}
      />
      <NumberRangeFilter
        inputRange={{ min: 0, max: 50000 }}
        units="ft²"
        description="Size of Property (in ft²)"
        label="Gross Floor Area"
        isSelected={grossFloorAreaIsSelected}
        setIsSelected={setGrossFloorAreaIsSelected}
        inputRangeValue={grossFloorAreaInputRange}
        setInputRangeValue={setGrossFloorAreaInputRange}
        initialInputRangeValues={grossFloorAreaInitial}
        displayRange={grossFloorAreaDisplayRange}
        setDisplayRange={setGrossFloorAreaDisplayRange}
      />
      <SelectFilter
        label="Zoning"
        filters={zoningFilters}
        setFilters={setZoningFilters}
      />
      <NumberRangeFilter
        inputRange={{ min: 0, max: 100 }}
        units="km"
        description="Driving distance to power transmission lines in km"
        label="Power Transmission Lines"
        isDistance
        isSelected={powerTransmissionLinesIsSelected}
        setIsSelected={setPowerTransmissionLinesIsSelected}
        inputRangeValue={powerTransmissionLinesInputRange}
        setInputRangeValue={setPowerTransmissionLinesInputRange}
        initialInputRangeValues={powerTransmissionLinesInitial}
        displayRange={powerTransmissionLinesDisplayRange}
        setDisplayRange={setPowerTransmissionLinesDisplayRange}
      />
      <SelectFilter
        label="Connectivity"
        filters={connectivityFilters}
        setFilters={setConnectivityFilters}
      />
      <Row className="flex-nowrap">
        <Col xs="6">
          <h3>Site Servicing</h3>
        </Col>
        <Col xs="auto" className="exclude-unknown-section">
          <input
            type="checkbox"
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
        description="Driving distance to airport in km"
        label="Air Service"
        isDistance
        isSelected={airServiceIsSelected}
        setIsSelected={setAirServiceIsSelected}
        inputRangeValue={airServiceInputRange}
        setInputRangeValue={setAirServiceInputRange}
        initialInputRangeValues={airServiceInitial}
        displayRange={airServiceDisplayRange}
        setDisplayRange={setAirServiceDisplayRange}
      />
      <NumberRangeFilter
        inputRange={{ min: 0, max: 500 }}
        units="km"
        description="Driving distance to rail connections in km"
        label="Rail Connections"
        isDistance
        isSelected={railConnectionsIsSelected}
        setIsSelected={setRailConnectionsIsSelected}
        inputRangeValue={railConnectionsInputRange}
        setInputRangeValue={setRailConnectionsInputRange}
        initialInputRangeValues={railConnectionsInitial}
        displayRange={railConnectionsDisplayRange}
        setDisplayRange={setRailConnectionsDisplayRange}
      />
      <NumberRangeFilter
        inputRange={{ min: 0, max: 500 }}
        units="km"
        description="Driving distance to deep water port in km"
        label="Deep Water Port"
        isDistance
        isSelected={deepWaterPortIsSelected}
        setIsSelected={setDeepWaterPortIsSelected}
        inputRangeValue={deepWaterPortInputRange}
        setInputRangeValue={setDeepWaterPortInputRange}
        initialInputRangeValues={deepWaterPortInitial}
        displayRange={deepWaterPortDisplayRange}
        setDisplayRange={setDeepWaterPortDisplayRange}
      />
      <h3>Demographics</h3>
      <CommunityOrPopulationProximityFilter
        inputRange={{ min: 0, max: 500 }}
        units="km"
        label="Proximity to community/population"
        isSelected={proximityToCommunityOrPopulationIsSelected}
        setIsSelected={setProximityToCommunityOrPopulationIsSelected}
        inputRangeValue={proximityToCommunityOrPopulationInputRange}
        setInputRangeValue={setProximityToCommunityOrPopulationInputRange}
        initialInputRangeValues={proximityToCommunityOrPopulationInitial}
        displayRange={proximityToCommunityOrPopulationDisplayRange}
        setDisplayRange={setproximityToCommunityOrPopulationDisplayRange}
      />
      <h3>Advanced Education &amp; Research</h3>
      <Row className="flex-nowrap">
        <Col xs={7}>
          <p>Post-secondary Institute within 100km?:</p>
        </Col>
        <Col xs="auto" className="no-padding">
          <p>Off</p>
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
          <p>On</p>
        </Col>
      </Row>
      <NumberRangeFilter
        inputRange={{ min: 0, max: 500 }}
        units="km"
        description="Driving distance to R&amp;D in km"
        label="R &amp; D Center nearby"
        isDistance
        isSelected={rAndDIsSelected}
        setIsSelected={setRAndDIsSelected}
        inputRangeValue={rAndDInputRange}
        setInputRangeValue={setRAndDInputRange}
        initialInputRangeValues={rAndDInitial}
        displayRange={rAndDDisplayRange}
        setDisplayRange={setRAndDDisplayRange}
      />
    </div>
  );
}

SearchFlyoutContent.propTypes = {
  setQuery: PropTypes.func.isRequired,
};
