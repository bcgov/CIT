import { useState } from "react";
import PropTypes from "prop-types";
import Switch from "react-switch";
import { Button } from "shared-components";
import { Row, Col, Tooltip, OverlayTrigger, Form } from "react-bootstrap";
import { MdHelp } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import NumberRangeFilter from "../NumberRangeFilter/NumberRangeFilter";
import SelectFilter from "../SelectFilter/SelectFilter";
import CommunityOrPopulationProximityFilter from "../CommunityOrPopulationProximityFilter/CommunityOrPopulationProximityFilter";
import "./SearchFlyoutContent.scss";
import { getOptions, setOptions } from "../../store/actions/options";

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

export default function SearchFlyoutContent({ onQuery, resetFilters, search }) {
  const dispatch = useDispatch();
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
        : 2000,
    min:
      FORM_PARCEL_SIZE_MIN in search
        ? parseFloat(search[FORM_PARCEL_SIZE_MIN])
        : 0,
  };
  const powerTransmissionLinesInitial = {
    max:
      FORM_POWER_TRANSMISSION_LINES_MAX in search
        ? parseFloat(search[FORM_POWER_TRANSMISSION_LINES_MAX])
        : 100,
    min:
      FORM_POWER_TRANSMISSION_LINES_MIN in search
        ? parseFloat(search[FORM_POWER_TRANSMISSION_LINES_MIN])
        : 0,
  };
  const airServiceInitial = {
    max:
      FORM_AIR_SERVICE_MAX in search
        ? parseFloat(search[FORM_AIR_SERVICE_MAX])
        : 500,
    min:
      FORM_AIR_SERVICE_MIN in search
        ? parseFloat(search[FORM_AIR_SERVICE_MIN])
        : 0,
  };
  const railConnectionsInitial = {
    max:
      FORM_RAIL_CONNECTIONS_MAX in search
        ? parseFloat(search[FORM_RAIL_CONNECTIONS_MAX])
        : 500,
    min:
      FORM_RAIL_CONNECTIONS_MIN in search
        ? parseFloat(search[FORM_RAIL_CONNECTIONS_MIN])
        : 0,
  };
  const deepWaterPortInitial = {
    max:
      FORM_DEEP_WATER_PORT_MAX in search
        ? parseFloat(search[FORM_DEEP_WATER_PORT_MAX])
        : 500,
    min:
      FORM_DEEP_WATER_PORT_MIN in search
        ? parseFloat(search[FORM_DEEP_WATER_PORT_MIN])
        : 0,
  };
  const proximityToCommunityOrPopulationInitial = {
    max:
      FORM_COMMUNITY_POPULATION_DISTANCE_MAX in search
        ? parseFloat(search[FORM_COMMUNITY_POPULATION_DISTANCE_MAX])
        : 500,
    min:
      FORM_COMMUNITY_POPULATION_DISTANCE_MIN in search
        ? parseFloat(search[FORM_COMMUNITY_POPULATION_DISTANCE_MIN])
        : 0,
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
  const zoningQueryFiltersInitial = "";
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
  const [parcelSizeIsSelected, setParcelSizeIsSelected] = useState(
    FORM_PARCEL_SIZE_MIN in search || FORM_PARCEL_SIZE_MAX in search
  );
  const [parcelSizeInputRange, setParcelSizeInputRange] = useState(
    parcelSizeInitial
  );
  const [parcelSizeDisplayRange, setParcelSizeDisplayRange] = useState(
    parcelSizeInitial
  );
  const [
    powerTransmissionLinesIsSelected,
    setPowerTransmissionLinesIsSelected,
  ] = useState(
    FORM_POWER_TRANSMISSION_LINES_MIN in search ||
      FORM_POWER_TRANSMISSION_LINES_MAX in search
  );
  const [
    powerTransmissionLinesInputRange,
    setPowerTransmissionLinesInputRange,
  ] = useState(powerTransmissionLinesInitial);
  const [
    powerTransmissionLinesDisplayRange,
    setPowerTransmissionLinesDisplayRange,
  ] = useState(powerTransmissionLinesInitial);
  const [airServiceIsSelected, setAirServiceIsSelected] = useState(
    FORM_AIR_SERVICE_MIN in search || FORM_AIR_SERVICE_MAX in search
  );
  const [airServiceInputRange, setAirServiceInputRange] = useState(
    airServiceInitial
  );
  const [airServiceDisplayRange, setAirServiceDisplayRange] = useState(
    airServiceInitial
  );
  const [deepWaterPortIsSelected, setDeepWaterPortIsSelected] = useState(
    FORM_DEEP_WATER_PORT_MIN in search || FORM_DEEP_WATER_PORT_MAX in search
  );
  const [deepWaterPortInputRange, setDeepWaterPortInputRange] = useState(
    deepWaterPortInitial
  );
  const [deepWaterPortDisplayRange, setDeepWaterPortDisplayRange] = useState(
    deepWaterPortInitial
  );

  const [railConnectionsIsSelected, setRailConnectionsIsSelected] = useState(
    FORM_RAIL_CONNECTIONS_MIN in search || FORM_RAIL_CONNECTIONS_MAX in search
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
  ] = useState(
    FORM_COMMUNITY_POPULATION_DISTANCE_MAX in search ||
      FORM_COMMUNITY_POPULATION_DISTANCE_MIN in search
  );
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

  const [zoningIsSelected, setZoningIsSelected] = useState(
    FORM_ZONING in search
  );
  const [zoningQueryFilters, setZoningQueryFilters] = useState(
    zoningQueryFiltersInitial
  );
  const [zoningFilters, setZoningFilters] = useState(zoningFiltersInitial);

  const [connectivitySwitchValue, setConnectivitySwitchValue] = useState(
    FORM_CONNECTIVITY in search ? search[FORM_CONNECTIVITY] === "Y" : false
  );

  const [roadAccessSwitchValue, setRoadAccessSwitchValue] = useState(
    FORM_OPPORTUNITY_ROAD_CONNECTED in search
      ? search[FORM_OPPORTUNITY_ROAD_CONNECTED] === "Y"
      : false
  );
  const [waterSwitchValue, setWaterSwitchValue] = useState(
    FORM_OPPORTUNITY_WATER_CONNECTED in search
      ? search[FORM_OPPORTUNITY_WATER_CONNECTED] === "Y"
      : false
  );
  const [sewerSwitchValue, setSewerSwitchValue] = useState(
    FORM_OPPORTUNITY_SEWER_CONNECTED in search
      ? search[FORM_OPPORTUNITY_SEWER_CONNECTED] === "Y"
      : false
  );
  const [
    electricalInfrastructureSwitchValue,
    setElectricalInfrastructureSwitchValue,
  ] = useState(
    FORM_OPPORTUNITY_ELECTRICAL_CONNECTED in search
      ? search[FORM_OPPORTUNITY_NATURAL_GAS_CONNECTED] === "Y"
      : false
  );
  const [naturalGasSwitchValue, setNaturalGasSwitchValue] = useState(
    FORM_OPPORTUNITY_NATURAL_GAS_CONNECTED in search
      ? search[FORM_OPPORTUNITY_NATURAL_GAS_CONNECTED] === "Y"
      : false
  );

  const [postSecondarySwitchValue, setPostSecondarySwitchValue] = useState(
    FORM_POST_SECONDARY in search ? search[FORM_POST_SECONDARY] === "Y" : false
  );
  const [researchCentreSwitchValue, setResearchCentreSwitchValue] = useState(
    FORM_RESEARCH_CENTRE in search
      ? search[FORM_RESEARCH_CENTRE] === "Y"
      : false
  );
  const siteServicingFilters = [
    {
      label: "Road access:",
      checked: roadAccessSwitchValue,
      onChange: (value) => {
        onQuery({ [FORM_OPPORTUNITY_ROAD_CONNECTED]: value ? "Y" : "N" });
        setRoadAccessSwitchValue(value);
      },
      queryKey: FORM_OPPORTUNITY_ROAD_CONNECTED,
    },
    {
      label: "Water:",
      checked: waterSwitchValue,
      onChange: (value) => {
        onQuery({ [FORM_OPPORTUNITY_WATER_CONNECTED]: value ? "Y" : "N" });
        setWaterSwitchValue(value);
      },
      queryKey: FORM_OPPORTUNITY_WATER_CONNECTED,
    },
    {
      label: "Sewer:",
      checked: sewerSwitchValue,
      onChange: (value) => {
        onQuery({ [FORM_OPPORTUNITY_SEWER_CONNECTED]: value ? "Y" : "N" });
        setSewerSwitchValue(value);
      },
      queryKey: FORM_OPPORTUNITY_SEWER_CONNECTED,
    },
    {
      label: "Electrical Infrastructure:",
      checked: electricalInfrastructureSwitchValue,
      onChange: (value) => {
        onQuery({ [FORM_OPPORTUNITY_ELECTRICAL_CONNECTED]: value ? "Y" : "N" });
        setElectricalInfrastructureSwitchValue(value);
      },
      queryKey: FORM_OPPORTUNITY_ELECTRICAL_CONNECTED,
    },
    {
      label: "Natural Gas:",
      checked: naturalGasSwitchValue,
      onChange: (value) => {
        onQuery({
          [FORM_OPPORTUNITY_NATURAL_GAS_CONNECTED]: value ? "Y" : "N",
        });
        setNaturalGasSwitchValue(value);
      },
      queryKey: FORM_OPPORTUNITY_NATURAL_GAS_CONNECTED,
    },
    {
      label: "Connectivity (50/10Mbps+)",
      checked: connectivitySwitchValue,
      onChange: (value) => {
        onQuery({ [FORM_CONNECTIVITY]: value ? "Y" : "N" });
        setConnectivitySwitchValue(value);
      },
      queryKey: FORM_CONNECTIVITY,
    },
  ];

  const numberRangeFilters = [
    {
      selected: parcelSizeIsSelected,
      value: parcelSizeDisplayRange,
      queryKey: {
        min: FORM_PARCEL_SIZE_MIN,
        max: FORM_PARCEL_SIZE_MAX,
      },
    },
    {
      selected: powerTransmissionLinesIsSelected,
      value: powerTransmissionLinesDisplayRange,
      queryKey: {
        min: FORM_POWER_TRANSMISSION_LINES_MIN,
        max: FORM_POWER_TRANSMISSION_LINES_MAX,
      },
    },
    {
      selected: airServiceIsSelected,
      value: airServiceDisplayRange,
      queryKey: {
        min: FORM_AIR_SERVICE_MIN,
        max: FORM_AIR_SERVICE_MAX,
      },
    },
    {
      selected: railConnectionsIsSelected,
      value: railConnectionsDisplayRange,
      queryKey: {
        min: FORM_RAIL_CONNECTIONS_MIN,
        max: FORM_RAIL_CONNECTIONS_MAX,
      },
    },
    {
      selected: deepWaterPortIsSelected,
      value: deepWaterPortDisplayRange,
      queryKey: {
        min: FORM_DEEP_WATER_PORT_MIN,
        max: FORM_DEEP_WATER_PORT_MAX,
      },
    },
  ];
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
    onQuery({ [FORM_REGIONAL_DISTRICT]: nextRDCode });
  };

  const handleResetFilters = () => {
    // eslint-disable-next-line
    search = {};
    resetFilters();
    resetFilters();
    setParcelSizeIsSelected(false);
    setParcelSizeInputRange({ min: 0, max: 2000 });
    setParcelSizeDisplayRange({ min: 0, max: 2000 });
    setPowerTransmissionLinesIsSelected(false);
    setPowerTransmissionLinesInputRange({ min: 0, max: 100 });
    setPowerTransmissionLinesDisplayRange({ min: 0, max: 100 });
    setAirServiceIsSelected(false);
    setAirServiceInputRange({ min: 0, max: 500 });
    setAirServiceDisplayRange({ min: 0, max: 500 });
    setDeepWaterPortIsSelected(false);
    setDeepWaterPortInputRange({ min: 0, max: 500 });
    setDeepWaterPortDisplayRange({ min: 0, max: 500 });
    setRailConnectionsIsSelected(false);
    setRailConnectionsInputRange({ min: 0, max: 500 });
    setRailConnectionsDisplayRange({ min: 0, max: 500 });
    setProximityToCommunityOrPopulationIsSelected(false);
    setProximityToCommunityOrPopulationInputRange({ min: 0, max: 500 });
    setproximityToCommunityOrPopulationDisplayRange({ min: 0, max: 500 });
    setProximityCurrentCommunity(null);
    setProximityCurrentPopulation(null);
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
  };

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
        displayRange={parcelSizeDisplayRange}
        setDisplayRange={setParcelSizeDisplayRange}
        onSave={(value) => {
          onQuery({
            [FORM_PARCEL_SIZE_MIN]: value.min,
            [FORM_PARCEL_SIZE_MAX]: value.max,
          });
        }}
      />
      <SelectFilter
        label="Zoning"
        filters={zoningFilters.filter(
          (element) => element.label !== "Residential"
        )}
        setFilters={setZoningFilters}
        isSelected={zoningIsSelected}
        setIsSelected={setZoningIsSelected}
        setQueryFilters={(filter) => {
          onQuery({ [FORM_ZONING]: filter });
          setZoningQueryFilters(filter);
        }}
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
        displayRange={powerTransmissionLinesDisplayRange}
        setDisplayRange={setPowerTransmissionLinesDisplayRange}
        onSave={(value) => {
          onQuery({
            [FORM_POWER_TRANSMISSION_LINES_MIN]: value.min,
            [FORM_POWER_TRANSMISSION_LINES_MAX]: value.max,
          });
        }}
      />
      <Row className="flex-nowrap">
        <Col xs="6">
          <h3>Site Servicing</h3>
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
        displayRange={airServiceDisplayRange}
        setDisplayRange={setAirServiceDisplayRange}
        onSave={(value) => {
          onQuery({
            [FORM_AIR_SERVICE_MIN]: value.min,
            [FORM_AIR_SERVICE_MAX]: value.max,
          });
        }}
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
        displayRange={railConnectionsDisplayRange}
        setDisplayRange={setRailConnectionsDisplayRange}
        onSave={(value) => {
          onQuery({
            [FORM_RAIL_CONNECTIONS_MIN]: value.min,
            [FORM_RAIL_CONNECTIONS_MAX]: value.max,
          });
        }}
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
        displayRange={deepWaterPortDisplayRange}
        setDisplayRange={setDeepWaterPortDisplayRange}
        onSave={(value) => {
          onQuery({
            [FORM_DEEP_WATER_PORT_MIN]: value.min,
            [FORM_DEEP_WATER_PORT_MAX]: value.max,
          });
        }}
      />
      <h3>Nearby Communities</h3>
      {communityOptions ? (
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
          currentCommunity={proximityCurrentCommunity}
          setCurrentCommunity={setProximityCurrentCommunity}
          currentPopulation={proximityCurrentPopulation}
          setCurrentPopulation={setProximityCurrentPopulation}
          onSave={(value) => {
            const updateQuery = {
              [FORM_COMMUNITY_POPULATION_DISTANCE_MIN]: value.min,
              [FORM_COMMUNITY_POPULATION_DISTANCE_MAX]: value.max,
            };
            if (value.id) {
              updateQuery[FORM_PROXIMITY_COMMUNITY_ID] = value.id;
            }
            if (value.pop) {
              updateQuery[FORM_PROXIMITY_POPULATION] = value.pop;
            }
            onQuery(updateQuery);
          }}
        />
      ) : null}

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
            onChange={(value) => {
              onQuery({ [FORM_POST_SECONDARY]: value ? "Y" : "N" });
              setPostSecondarySwitchValue(value);
            }}
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
            onChange={(value) => {
              onQuery({ [FORM_RESEARCH_CENTRE]: value ? "Y" : "N" });
              setResearchCentreSwitchValue(value);
            }}
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
      <h3>Regional District</h3>
      <div style={{ marginRight: "15px" }}>
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
      </div>
      <div>
        <Row>
          <Col xs="auto">
            <span>
              {" "}
              <Link
                to="/investmentopportunities/disclaimer-contributor"
                target="_blank"
                rel="noopener noreferrer"
              >
                Terms of Use
              </Link>
            </span>{" "}
          </Col>
          <Col xs="auto" className="reset-button">
            <Button
              styling="BC-Gov-SecondaryButton"
              label="Reset all filters"
              onClick={() => handleResetFilters()}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
}

SearchFlyoutContent.propTypes = {
  onQuery: PropTypes.func.isRequired,
  resetFilters: PropTypes.func.isRequired,
  search: PropTypes.shape().isRequired,
};
