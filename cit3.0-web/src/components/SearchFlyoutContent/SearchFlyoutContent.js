import { useState } from "react";
import Switch from "react-switch";
import { Row, Col } from "react-bootstrap";
import NumberRangeFilter from "../NumberRangeFilter/NumberRangeFilter";
import SelectFilter from "../SelectFilter/SelectFilter";
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
    <Row className="flex-nowrap">
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
      />
      <SelectFilter
        label="Connectivity"
        filters={connectivityFilters}
        setFilters={setConnectivityFilters}
      />
      <h3>Site Servicing</h3>
      {siteServicingSection}
      <h3>Transportation</h3>
      <NumberRangeFilter
        inputRange={{ min: 0, max: 500 }}
        units="km"
        description="Driving distance to airport in km"
        label="Air Service"
      />
      <NumberRangeFilter
        inputRange={{ min: 0, max: 500 }}
        units="km"
        description="Driving distance to rail connections in km"
        label="Rail Connections"
      />
      <NumberRangeFilter
        inputRange={{ min: 0, max: 500 }}
        units="km"
        description="Driving distance to deep water port in km"
        label="Deep Water Port"
      />
      <h3>Demographics</h3>
      <h3>Advanced Education &amp; Research</h3>
    </div>
  );
}
