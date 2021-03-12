import { useState } from "react";
import Switch from "react-switch";
import { Row, Col, Tooltip, OverlayTrigger } from "react-bootstrap";
import { MdHelp } from "react-icons/md";
import NumberRangeFilter from "../NumberRangeFilter/NumberRangeFilter";
import SelectFilter from "../SelectFilter/SelectFilter";
import CommunityOrPopulationProximityFilter from "../CommunityOrPopulationProximityFilter/CommunityOrPopulationProximityFilter";
import "./SearchFlyoutContent.scss";

export default function SearchFlyoutContent() {
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
  const switchFilters = [
    {
      label: "Road access:",
      checked: roadAccessSwitchValue,
      onChange: setRoadAccessSwitchValue,
    },
    {
      label: "Water:",
      checked: waterSwitchValue,
      onChange: setWaterSwitchValue,
    },
    {
      label: "Sewer:",
      checked: sewerSwitchValue,
      onChange: setSewerSwitchValue,
    },
    {
      label: "Electrical Infrastructure:",
      checked: electricalInfrastructureSwitchValue,
      onChange: setElectricalInfrastructureSwitchValue,
    },
    {
      label: "Natural Gas:",
      checked: naturalGasSwitchValue,
      onChange: setNaturalGasSwitchValue,
    },
  ];

  const siteServicingSection = switchFilters.map((switchFilter) => (
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
      Choose whether to exclude or include values that are not set to Yes or No.
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
      />
      <NumberRangeFilter
        inputRange={{ min: 0, max: 50000 }}
        units="ft²"
        description="Size of Property (in ft²)"
        label="Gross Floor Area"
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
      />
      <NumberRangeFilter
        inputRange={{ min: 0, max: 500 }}
        units="km"
        description="Driving distance to rail connections in km"
        label="Rail Connections"
        isDistance
      />
      <NumberRangeFilter
        inputRange={{ min: 0, max: 500 }}
        units="km"
        description="Driving distance to deep water port in km"
        label="Deep Water Port"
        isDistance
      />
      <h3>Demographics</h3>
      <CommunityOrPopulationProximityFilter
        inputRange={{ min: 0, max: 500 }}
        units="km"
        label="Proximity to community/population"
      />
      <h3>Advanced Education &amp; Research</h3>
    </div>
  );
}
