import { useState } from "react";
import PropTypes from "prop-types";
import Switch from "react-switch";
import {
  Button,
  Col,
  Form,
  OverlayTrigger,
  Row,
  Tooltip,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import InlineSelectFilter from "../InlineSelectFilter/InlineSelectFilter";
import InlineCommunityOrPopulationProximityFilter from "../InlineCommunityOrPopulationProximityFilter/InlineCommunityOrPopulationProximityFilter";
import "./SearchSidebarContent.scss";
import { getOptions, setOptions } from "../../store/actions/options";
import InlineNumberRangeFilter from "../InlineNumberRangeFilter/InlineNumberRangeFilter";

const FORM_OPPORTUNITY_ROAD_CONNECTED = "opportunity_road_connected";
const FORM_OPPORTUNITY_WATER_CONNECTED = "opportunity_water_connected";
const FORM_OPPORTUNITY_SEWER_CONNECTED = "opportunity_sewer_connected";
const FORM_OPPORTUNITY_ELECTRICAL_CONNECTED =
  "opportunity_electrical_connected";
const FORM_OPPORTUNITY_NATURAL_GAS_CONNECTED =
  "opportunity_natural_gas_connected";
const FORM_CONNECTIVITY = "connectivity";

const FORM_REGIONAL_DISTRICT = "regional_district";

const FORM_PARCEL_SIZE_MIN = "parcel_size_min";
const FORM_PARCEL_SIZE_MAX = "parcel_size_max";

const FORM_POWER_TRANSMISSION_LINES_MIN = "power_transmission_lines_min";
const FORM_POWER_TRANSMISSION_LINES_MAX = "power_transmission_lines_max";

const FORM_AIR_SERVICE_MIN = "air_service_min";
const FORM_AIR_SERVICE_MAX = "air_service_max";

const FORM_RAIL_CONNECTIONS_MIN = "rail_connections_min";
const FORM_RAIL_CONNECTIONS_MAX = "rail_connections_max";

const FORM_DEEP_WATER_PORT_MIN = "deep_water_port_min";
const FORM_DEEP_WATER_PORT_MAX = "deep_water_port_max";

const FORM_POST_SECONDARY = "post_secondary_within_100km";
const FORM_RESEARCH_CENTRE = "research_centre_within_100km";

const FORM_COMMUNITY_POPULATION_DISTANCE_MIN =
  "community_population_distance_min";
const FORM_COMMUNITY_POPULATION_DISTANCE_MAX =
  "community_population_distance_max";
const FORM_PROXIMITY_COMMUNITY_ID = "proximity_community_id";
const FORM_PROXIMITY_POPULATION = "proximity_population";

const FORM_ZONING = "zoning";

export default function SearchSidebarContent({
  onQuery,
  resetFilters,
  search,
}) {
  const dispatch = useDispatch();

  const inputParcelRange = { min: 0, max: 2000 };
  const inputTransmissionLineRange = { min: 0, max: 100 };
  const inputAirServiceRange = { min: 0, max: 500 };
  const inputRailConnectionsRange = { min: 0, max: 500 };
  const inputDeepWaterRange = { min: 0, max: 500 };
  const inputNearbyCommunityRange = { min: 0, max: 500 };

  const regionalDistricts = useSelector(
    (state) => state.options.regionalDistricts
  );
  const communityOptions = useSelector(
    (state) => state.options.communities
  ).map((option) => ({ value: option.id, label: option.place_name }));

  const parcelSizeInitial = {
    max:
      FORM_PARCEL_SIZE_MAX in search
        ? parseFloat(search[FORM_PARCEL_SIZE_MAX])
        : inputParcelRange.max,
    min:
      FORM_PARCEL_SIZE_MIN in search
        ? parseFloat(search[FORM_PARCEL_SIZE_MIN])
        : inputParcelRange.min,
  };
  const powerTransmissionLinesInitial = {
    max:
      FORM_POWER_TRANSMISSION_LINES_MAX in search
        ? parseFloat(search[FORM_POWER_TRANSMISSION_LINES_MAX])
        : inputTransmissionLineRange.max,
    min:
      FORM_POWER_TRANSMISSION_LINES_MIN in search
        ? parseFloat(search[FORM_POWER_TRANSMISSION_LINES_MIN])
        : inputTransmissionLineRange.min,
  };
  const airServiceInitial = {
    max:
      FORM_AIR_SERVICE_MAX in search
        ? parseFloat(search[FORM_AIR_SERVICE_MAX])
        : inputAirServiceRange.max,
    min:
      FORM_AIR_SERVICE_MIN in search
        ? parseFloat(search[FORM_AIR_SERVICE_MIN])
        : inputAirServiceRange.min,
  };
  const railConnectionsInitial = {
    max:
      FORM_RAIL_CONNECTIONS_MAX in search
        ? parseFloat(search[FORM_RAIL_CONNECTIONS_MAX])
        : inputRailConnectionsRange.max,
    min:
      FORM_RAIL_CONNECTIONS_MIN in search
        ? parseFloat(search[FORM_RAIL_CONNECTIONS_MIN])
        : inputRailConnectionsRange.min,
  };
  const deepWaterPortInitial = {
    max:
      FORM_DEEP_WATER_PORT_MAX in search
        ? parseFloat(search[FORM_DEEP_WATER_PORT_MAX])
        : inputDeepWaterRange.max,
    min:
      FORM_DEEP_WATER_PORT_MIN in search
        ? parseFloat(search[FORM_DEEP_WATER_PORT_MIN])
        : inputDeepWaterRange.min,
  };
  const proximityToCommunityOrPopulationInitial = {
    max:
      FORM_COMMUNITY_POPULATION_DISTANCE_MAX in search
        ? parseFloat(search[FORM_COMMUNITY_POPULATION_DISTANCE_MAX])
        : inputNearbyCommunityRange.max,
    min:
      FORM_COMMUNITY_POPULATION_DISTANCE_MIN in search
        ? parseFloat(search[FORM_COMMUNITY_POPULATION_DISTANCE_MIN])
        : inputNearbyCommunityRange.min,
  };
  const proximityCurrentCommunityInitial =
    FORM_PROXIMITY_COMMUNITY_ID in search
      ? communityOptions.find(
          (item) =>
            item.value === parseInt(search[FORM_PROXIMITY_COMMUNITY_ID], 10)
        )
      : null;
  const proximityCurrentPopulationInitial =
    FORM_PROXIMITY_POPULATION in search
      ? parseInt(search[FORM_PROXIMITY_POPULATION], 10)
      : null;
  const zoningFiltersInitial = [
    {
      label: "Commercial",
      code: "COMM",
      isSelected:
        FORM_ZONING in search ? search[FORM_ZONING].includes("COMM") : false,
    },
    {
      label: "Residential",
      code: "RESD",
      isSelected:
        FORM_ZONING in search ? search[FORM_ZONING].includes("RESD") : false,
    },
    {
      label: "Agriculture",
      code: "AGRI",
      isSelected:
        FORM_ZONING in search ? search[FORM_ZONING].includes("AGRI") : false,
    },
    {
      label: "Industrial-light",
      code: "INDL",
      isSelected:
        FORM_ZONING in search ? search[FORM_ZONING].includes("INDL") : false,
    },
    {
      label: "Industrial-heavy",
      code: "INDH",
      isSelected:
        FORM_ZONING in search ? search[FORM_ZONING].includes("INDH") : false,
    },
  ];

  const [regionalDistrict, setRegionalDistrict] = useState(
    FORM_REGIONAL_DISTRICT in search ? search[FORM_REGIONAL_DISTRICT] : null
  );
  const [parcelSizeIsSelected, setParcelSizeIsSelected] = useState(false);
  const [parcelSizeInputRange, setParcelSizeInputRange] = useState(
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

  const [zoningFilters, setZoningFilters] = useState(zoningFiltersInitial);

  const [connectivitySwitchValue, setConnectivitySwitchValue] = useState(null);

  const [roadAccessSwitchValue, setRoadAccessSwitchValue] = useState(null);
  const [waterSwitchValue, setWaterSwitchValue] = useState(null);
  const [sewerSwitchValue, setSewerSwitchValue] = useState(null);
  const [
    electricalInfrastructureSwitchValue,
    setElectricalInfrastructureSwitchValue,
  ] = useState(null);
  const [naturalGasSwitchValue, setNaturalGasSwitchValue] = useState(null);

  const [postSecondarySwitchValue, setPostSecondarySwitchValue] = useState(
    null
  );
  const [researchCentreSwitchValue, setResearchCentreSwitchValue] = useState(
    null
  );

  const [minParcelSize, setMinParcelSize] = useState(
    String(inputParcelRange.min)
  );
  const [maxParcelSize, setMaxParcelSize] = useState(
    String(inputParcelRange.max)
  );

  const [minTransmissionLine, setMinTransmissionLine] = useState(
    String(inputTransmissionLineRange.min)
  );
  const [maxTransmissionLine, setMaxTransmissionLine] = useState(
    String(inputTransmissionLineRange.max)
  );

  const [minAirServiceDistance, setMinAirServiceDistance] = useState(
    String(inputAirServiceRange.min)
  );

  const [maxAirServiceDistance, setMaxAirServiceDistance] = useState(
    String(inputAirServiceRange.max)
  );

  const [minRailConnection, setMinRailConnection] = useState(
    String(inputRailConnectionsRange.min)
  );

  const [maxRailConnection, setMaxRailConnection] = useState(
    String(inputRailConnectionsRange.max)
  );

  const [minDeepWater, setMinDeepWater] = useState(
    String(inputDeepWaterRange.min)
  );

  const [maxDeepWater, setMaxDeepWater] = useState(
    String(inputDeepWaterRange.max)
  );

  const [minNearbyCommunityDistance, setMinNearbyCommunityDistance] = useState(
    String(inputNearbyCommunityRange.min)
  );

  const [maxNearbyCommunityDistance, setMaxNearbyCommunityDistance] = useState(
    String(inputNearbyCommunityRange.max)
  );

  const siteServicingFilters = [
    {
      label: "Road access:",
      checked: roadAccessSwitchValue,
      onChange: (value) => {
        setRoadAccessSwitchValue(value);
      },
      queryKey: FORM_OPPORTUNITY_ROAD_CONNECTED,
    },
    {
      label: "Water:",
      checked: waterSwitchValue,
      onChange: (value) => {
        setWaterSwitchValue(value);
      },
      queryKey: FORM_OPPORTUNITY_WATER_CONNECTED,
    },
    {
      label: "Sewer:",
      checked: sewerSwitchValue,
      onChange: (value) => {
        setSewerSwitchValue(value);
      },
      queryKey: FORM_OPPORTUNITY_SEWER_CONNECTED,
    },
    {
      label: "Electrical Infrastructure:",
      checked: electricalInfrastructureSwitchValue,
      onChange: (value) => {
        setElectricalInfrastructureSwitchValue(value);
      },
      queryKey: FORM_OPPORTUNITY_ELECTRICAL_CONNECTED,
    },
    {
      label: "Natural Gas:",
      checked: naturalGasSwitchValue,
      onChange: (value) => {
        setNaturalGasSwitchValue(value);
      },
      queryKey: FORM_OPPORTUNITY_NATURAL_GAS_CONNECTED,
    },
    {
      label: "Connectivity (50/10Mbps+)",
      checked: connectivitySwitchValue,
      onChange: (value) => {
        setConnectivitySwitchValue(value);
      },
      queryKey: FORM_CONNECTIVITY,
    },
  ];

  const tooltip = <Tooltip id="tooltip">Activate filter</Tooltip>;

  // Fetch options, if not already stored on client
  if (!communityOptions.length) {
    getOptions().then((response) => {
      dispatch(setOptions(response.data));
      const selected = response.data.communities.find(
        (item) => item.id === parseInt(search[FORM_PROXIMITY_COMMUNITY_ID], 10)
      );
      if (selected) {
        setProximityCurrentCommunity({
          value: selected.id,
          label: selected.place_name,
        });
      }
    });
  }
  const handleRegionalDistrictChange = (nextRDCode) => {
    setRegionalDistrict(nextRDCode);
  };

  const handleResetFilters = () => {
    // eslint-disable-next-line
    search = {};
    resetFilters();
    resetFilters();
    setParcelSizeIsSelected(false);
    setParcelSizeInputRange(inputParcelRange);
    setPowerTransmissionLinesIsSelected(false);
    setPowerTransmissionLinesInputRange(inputTransmissionLineRange);
    setPowerTransmissionLinesDisplayRange(inputTransmissionLineRange);
    setAirServiceIsSelected(false);
    setAirServiceInputRange(inputAirServiceRange);
    setAirServiceDisplayRange(inputAirServiceRange);
    setDeepWaterPortIsSelected(false);
    setDeepWaterPortInputRange(inputDeepWaterRange);
    setDeepWaterPortDisplayRange(inputDeepWaterRange);
    setRailConnectionsIsSelected(false);
    setRailConnectionsInputRange(inputRailConnectionsRange);
    setRailConnectionsDisplayRange(inputRailConnectionsRange);
    setProximityToCommunityOrPopulationIsSelected(false);
    setProximityToCommunityOrPopulationInputRange(inputNearbyCommunityRange);
    setproximityToCommunityOrPopulationDisplayRange(inputNearbyCommunityRange);
    setProximityCurrentCommunity(null);
    setProximityCurrentPopulation(null);
    setZoningFilters(
      zoningFilters.map((filter) => ({
        ...filter,
        isSelected: false,
      }))
    );
    setConnectivitySwitchValue(null);
    setRoadAccessSwitchValue(null);
    setWaterSwitchValue(null);
    setSewerSwitchValue(null);
    setElectricalInfrastructureSwitchValue(null);
    setNaturalGasSwitchValue(null);
    setPostSecondarySwitchValue(null);
    setResearchCentreSwitchValue(null);
  };

  const createFilterString = (currentFilters) => {
    const allSelectedFilters = currentFilters.filter(
      (filter) => filter.isSelected === true
    );

    const allSelectedFilterLabels = allSelectedFilters.map(
      (filter) => filter.code
    );

    return allSelectedFilterLabels.toString();
  };

  const handleSave = () => {
    const filters = {
      [FORM_ZONING]: createFilterString(zoningFilters),
    };
    if (parcelSizeIsSelected) {
      filters[FORM_PARCEL_SIZE_MIN] = parcelSizeInputRange.min;
      filters[FORM_PARCEL_SIZE_MAX] = parcelSizeInputRange.max;
    }
    if (powerTransmissionLinesIsSelected) {
      filters[FORM_POWER_TRANSMISSION_LINES_MIN] =
        powerTransmissionLinesInputRange.min;
      filters[FORM_POWER_TRANSMISSION_LINES_MAX] =
        powerTransmissionLinesInputRange.max;
    }
    if (airServiceIsSelected) {
      filters[FORM_AIR_SERVICE_MIN] = airServiceInputRange.min;
      filters[FORM_AIR_SERVICE_MAX] = airServiceInputRange.max;
    } else if (filters[FORM_AIR_SERVICE_MIN] && filters[FORM_AIR_SERVICE_MAX]) {
      delete filters[FORM_AIR_SERVICE_MIN];
      delete filters[FORM_AIR_SERVICE_MAX];
    }

    if (railConnectionsIsSelected) {
      filters[FORM_RAIL_CONNECTIONS_MIN] = railConnectionsInputRange.min;
      filters[FORM_RAIL_CONNECTIONS_MAX] = railConnectionsInputRange.max;
    }

    if (deepWaterPortIsSelected) {
      filters[FORM_DEEP_WATER_PORT_MIN] = deepWaterPortDisplayRange.min;
      filters[FORM_DEEP_WATER_PORT_MAX] = deepWaterPortDisplayRange.max;
    } else if (
      filters[FORM_DEEP_WATER_PORT_MIN] &&
      filters[FORM_DEEP_WATER_PORT_MAX]
    ) {
      delete filters[FORM_DEEP_WATER_PORT_MIN];
      delete filters[FORM_DEEP_WATER_PORT_MAX];
    }

    if (roadAccessSwitchValue !== null) {
      filters[FORM_OPPORTUNITY_ROAD_CONNECTED] = roadAccessSwitchValue
        ? "Y"
        : "N";
    }
    if (waterSwitchValue !== null) {
      filters[FORM_OPPORTUNITY_WATER_CONNECTED] = waterSwitchValue ? "Y" : "N";
    }
    if (sewerSwitchValue !== null) {
      filters[FORM_OPPORTUNITY_WATER_CONNECTED] = waterSwitchValue ? "Y" : "N";
    }
    if (sewerSwitchValue !== null) {
      filters[FORM_OPPORTUNITY_SEWER_CONNECTED] = sewerSwitchValue ? "Y" : "N";
    }
    if (electricalInfrastructureSwitchValue !== null) {
      filters[
        FORM_OPPORTUNITY_ELECTRICAL_CONNECTED
      ] = electricalInfrastructureSwitchValue ? "Y" : "N";
    }
    if (naturalGasSwitchValue !== null) {
      filters[FORM_OPPORTUNITY_NATURAL_GAS_CONNECTED] = naturalGasSwitchValue
        ? "Y"
        : "N";
    }
    if (connectivitySwitchValue !== null) {
      filters[FORM_CONNECTIVITY] = connectivitySwitchValue ? "Y" : "N";
    }
    if (postSecondarySwitchValue !== null) {
      filters[FORM_POST_SECONDARY] = postSecondarySwitchValue ? "Y" : "N";
      filters[FORM_COMMUNITY_POPULATION_DISTANCE_MIN] =
        proximityToCommunityOrPopulationInputRange.min;
      filters[FORM_COMMUNITY_POPULATION_DISTANCE_MAX] =
        proximityToCommunityOrPopulationInputRange.max;
    }
    if (researchCentreSwitchValue !== null) {
      filters[FORM_RESEARCH_CENTRE] = researchCentreSwitchValue ? "Y" : "N";
    }

    if (proximityCurrentCommunity !== null) {
      filters[FORM_PROXIMITY_COMMUNITY_ID] = proximityCurrentCommunity.value;
    } else if (proximityCurrentPopulation !== null) {
      filters[FORM_PROXIMITY_POPULATION] = proximityCurrentPopulation.value;
    }
    if (regionalDistrict !== null) {
      filters[FORM_REGIONAL_DISTRICT] = regionalDistrict;
    }
    onQuery(filters);
  };

  const siteServicingSection = siteServicingFilters.map((switchFilter) => (
    <Row
      className="flex-nowrap bcgov-siteserv-filters"
      key={switchFilter.label}
    >
      <Col xs={9}>
        <p>{switchFilter.label}</p>
      </Col>
      <Col xs="auto">
        <Switch
          className="bcgov-ciot-filter-switch"
          checked={switchFilter.checked}
          onChange={switchFilter.onChange}
          onColor="#c8e7f1"
          offColor="#d2d2d2"
          onHandleColor="#666666"
          offHandleColor="#666666"
          handleDiameter={15}
          uncheckedIcon={false}
          checkedIcon={false}
          boxShadow="0px 0px 0px #d2d2d2"
          activeBoxShadow="0px 0px 0px 0px #d2d2d2"
          height={25}
          width={48}
        />
      </Col>
    </Row>
  ));

  return (
    <div className="search-sidebar-content">
      <h2>General Site Details</h2>
      <div className="label-filter">
        <h3>Parcel Size</h3>
        <div className="checkbox-filter">
          <OverlayTrigger
            placement="right"
            delay={{ show: 100, hide: 100 }}
            overlay={tooltip}
          >
            <input
              aria-labelledby="agree-label"
              className="mr-2"
              name="enable-parcel-check"
              value="enable-parcel-check"
              type="checkbox"
              onChange={(e) => setParcelSizeIsSelected(e.target.checked)}
              checked={parcelSizeIsSelected}
            />
          </OverlayTrigger>
        </div>
      </div>
      <InlineNumberRangeFilter
        inputRange={inputParcelRange}
        units="acres"
        description="Size of Property (in acres)"
        setIsSelected={setParcelSizeIsSelected}
        minInput={minParcelSize}
        setMinInput={setMinParcelSize}
        maxInput={maxParcelSize}
        setMaxInput={setMaxParcelSize}
        inputRangeValue={parcelSizeInputRange}
        setInputRangeValue={setParcelSizeInputRange}
      />
      <h3>Zoning</h3>
      <InlineSelectFilter
        filters={zoningFilters.filter(
          (element) => element.label !== "Residential"
        )}
        setFilters={setZoningFilters}
      />
      <div className="label-filter">
        <h3>Power Transmission Lines</h3>

        <div className="checkbox-filter">
          <OverlayTrigger
            placement="right"
            delay={{ show: 100, hide: 100 }}
            overlay={tooltip}
          >
            <input
              aria-labelledby="agree-label"
              className="mr-2"
              name="enable-power-transmission-check"
              value="enable-power-transimission-check"
              type="checkbox"
              onChange={(e) =>
                setPowerTransmissionLinesIsSelected(e.target.checked)
              }
              checked={powerTransmissionLinesIsSelected}
            />
          </OverlayTrigger>
        </div>
      </div>
      <InlineNumberRangeFilter
        inputRange={inputTransmissionLineRange}
        units="km"
        description="Straight line distance to power transmission lines (km)"
        isDistance
        setIsSelected={setPowerTransmissionLinesIsSelected}
        minInput={minTransmissionLine}
        setMinInput={setMinTransmissionLine}
        maxInput={maxTransmissionLine}
        setMaxInput={setMaxTransmissionLine}
        inputRangeValue={powerTransmissionLinesInputRange}
        setInputRangeValue={setPowerTransmissionLinesInputRange}
      />
      <h2>Site Servicing</h2>
      {siteServicingSection}
      <h2>Transportation</h2>
      <InlineNumberRangeFilter
        inputRange={inputAirServiceRange}
        units="km"
        description="Straight line distance to airport (km)"
        label="Air Service"
        isDistance
        isSelected={airServiceIsSelected}
        setIsSelected={setAirServiceIsSelected}
        minInput={minAirServiceDistance}
        setMinInput={setMinAirServiceDistance}
        maxInput={maxAirServiceDistance}
        setMaxInput={setMaxAirServiceDistance}
        inputRangeValue={airServiceInputRange}
        setInputRangeValue={setAirServiceInputRange}
        cssClaseName="sub-label-filter"
        tooltip={tooltip}
      />
      <InlineNumberRangeFilter
        inputRange={inputRailConnectionsRange}
        units="km"
        description="Straight line distance to rail connections (km)"
        label="Rail Connections"
        isDistance
        isSelected={railConnectionsIsSelected}
        setIsSelected={setRailConnectionsIsSelected}
        minInput={minRailConnection}
        setMinInput={setMinRailConnection}
        maxInput={maxRailConnection}
        setMaxInput={setMaxRailConnection}
        inputRangeValue={railConnectionsInputRange}
        setInputRangeValue={setRailConnectionsInputRange}
        cssClaseName="sub-label-filter"
        tooltip={tooltip}
      />
      <InlineNumberRangeFilter
        inputRange={inputDeepWaterRange}
        units="km"
        description="Straight line distance to deep water port (km)"
        label="Deep Water Port"
        isDistance
        isSelected={deepWaterPortIsSelected}
        setIsSelected={setDeepWaterPortIsSelected}
        minInput={minDeepWater}
        setMinInput={setMinDeepWater}
        maxInput={maxDeepWater}
        setMaxInput={setMaxDeepWater}
        inputRangeValue={deepWaterPortInputRange}
        setInputRangeValue={setDeepWaterPortInputRange}
        cssClaseName="sub-label-filter"
        tooltip={tooltip}
      />
      <div className="label-filter">
        <h2>Nearby Communities</h2>
        <div className="checkbox-filter">
          <OverlayTrigger
            placement="right"
            delay={{ show: 100, hide: 100 }}
            overlay={tooltip}
          >
            <input
              aria-labelledby="agree-label"
              className="mr-2"
              name="enable-parcel-check"
              value="enable-parcel-check"
              type="checkbox"
              onChange={(e) =>
                setProximityToCommunityOrPopulationIsSelected(e.target.checked)
              }
              checked={proximityToCommunityOrPopulationIsSelected}
            />
          </OverlayTrigger>
        </div>
      </div>
      {communityOptions ? (
        <InlineCommunityOrPopulationProximityFilter
          inputRange={inputNearbyCommunityRange}
          units="km"
          label="Proximity to community/population"
          isSelected={proximityToCommunityOrPopulationIsSelected}
          setIsSelected={setProximityToCommunityOrPopulationIsSelected}
          minInput={minNearbyCommunityDistance}
          setMinInput={setMinNearbyCommunityDistance}
          maxInput={maxNearbyCommunityDistance}
          setMaxInput={setMaxNearbyCommunityDistance}
          inputRangeValue={proximityToCommunityOrPopulationInputRange}
          setInputRangeValue={(value) =>
            setProximityToCommunityOrPopulationInputRange(value)
          }
          displayRange={proximityToCommunityOrPopulationDisplayRange}
          setDisplayRange={setproximityToCommunityOrPopulationDisplayRange}
          currentCommunity={proximityCurrentCommunity}
          setCurrentCommunity={setProximityCurrentCommunity}
          currentPopulation={proximityCurrentPopulation}
          setCurrentPopulation={setProximityCurrentPopulation}
        />
      ) : null}
      <h2>Advanced Education &amp; Research</h2>
      <Row className="flex-nowrap">
        <Col xs={9}>
          <p>Post-secondary Institute within 100km?:</p>
        </Col>
        <Col xs="auto">
          <Switch
            className="bcgov-ciot-filter-switch"
            checked={postSecondarySwitchValue}
            onChange={(value) => {
              setPostSecondarySwitchValue(value);
            }}
            onColor="#c8e7f1"
            offColor="#d2d2d2"
            onHandleColor="#666666"
            offHandleColor="#666666"
            handleDiameter={15}
            uncheckedIcon={false}
            checkedIcon={false}
            boxShadow="0px 0px 0px #d2d2d2"
            activeBoxShadow="0px 0px 0px 0px #d2d2d2"
            height={25}
            width={48}
          />
        </Col>
      </Row>
      <Row className="flex-nowrap">
        <Col xs={9}>
          <p>Research Centre within 100km?:</p>
        </Col>
        <Col xs="auto">
          <Switch
            className="bcgov-ciot-filter-switch"
            checked={researchCentreSwitchValue}
            onChange={(value) => {
              setResearchCentreSwitchValue(value);
            }}
            onColor="#c8e7f1"
            offColor="#d2d2d2"
            onHandleColor="#666666"
            offHandleColor="#666666"
            handleDiameter={15}
            uncheckedIcon={false}
            checkedIcon={false}
            boxShadow="0px 0px 0px #d2d2d2"
            activeBoxShadow="0px 0px 0px 0px #d2d2d2"
            height={25}
            width={48}
          />
        </Col>
      </Row>
      <h2>Regional District</h2>
      <Form.Group controlId="regional_district">
        <Form.Label className="visually-hidden">To</Form.Label>
        <Form.Control
          as="select"
          name="regional-district"
          value={regionalDistrict}
          onChange={(e) => handleRegionalDistrictChange(e.target.value)}
        >
          <option value="">All</option>
          {regionalDistricts &&
            regionalDistricts.map((district) => (
              <option key={district.id} value={district.id}>
                {district.name}
              </option>
            ))}
        </Form.Control>
      </Form.Group>
      <hr className="hr-bold" />
      <div className="d-flex bcgov-ciot-button">
        <Button
          styling="BC-Gov-SecondaryButton"
          label="Reset all filters"
          onClick={() => handleResetFilters()}
        >
          Reset all filters
        </Button>
      </div>
      <div className="d-flex bcgov-ciot-search-button">
        <Button
          onClick={() => {
            handleSave();
          }}
          width="150"
        >
          <span>Search&nbsp;&nbsp;</span>
          <img
            src="/images/searchIcon.svg"
            className="bcgov-ciot-button-icon"
            width="20"
            height="20"
            alt="Search"
            styling="margin-top: -2px; width: 100px;"
          />
        </Button>
      </div>
    </div>
  );
}

SearchSidebarContent.propTypes = {
  onQuery: PropTypes.func.isRequired,
  resetFilters: PropTypes.func.isRequired,
  search: PropTypes.shape().isRequired,
};
