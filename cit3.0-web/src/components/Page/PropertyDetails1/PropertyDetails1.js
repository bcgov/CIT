import { useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import PageTitleHeader from "../../Headers/PageTitleHeader/PageTitleHeader";
import ButtonRow from "../../ButtonRow/ButtonRow";
import Radios from "../../FormComponents/Radios";
import PortalHeader from "../../Headers/PortalHeader/PortalHeader";
import NavigationHeader from "../../Headers/NavigationHeader/NavigationHeader";
import TextInput from "../../FormComponents/TextInput";
import MaxCapRow from "../../FormComponents/MaxCapRow";

const PropStatusOptions = [
  {
    value: "sale",
    label: "For Sale",
  },
  {
    value: "lease",
    label: "Lease",
  },
];
const zoningOptions = [
  {
    value: "commercial",
    label: "Commercial",
  },
  {
    value: "residential",
    label: "Residential",
  },
  {
    value: "industrial-light",
    label: "Industrial (Light)",
  },
  {
    value: "industrial-heavy",
    label: "Industrial (Heavy)",
  },
  {
    value: "agriculture",
    label: "Agriculture",
  },
];
const developmentOptions = [
  {
    value: "manufacturing",
    label: "Manufacturing",
  },
  {
    value: "transportation",
    label: "Transportation and Warehousing",
  },
  {
    value: "residential",
    label: "Residential",
  },
  {
    value: "agriculture",
    label: "Agriculture",
  },
];

export default function PropertyDetails1() {
  const [selectData, setSelectData] = useState({
    saleOrLease: null,
    currentZone: null,
    futureZone: null,
    preferred: null,
  });

  const [radioData, setRadioData] = useState({
    roadAccess: null,
    waterSupply: { value: null, capacity: null },
    naturalGas: { value: null, capacity: null },
    sewer: { value: null, capacity: null },
    electrical: { value: null, capacity: null },
  });

  const history = useHistory();

  const goToNextPage = () => {
    history.push({
      pathname: `propDetails2`,
      state: { selectData, radioData },
    });
  };

  const radioLabels = ["Yes", "No", "Unknown"];

  const handleSelectChange = (selectName, data) => {
    if (selectName === "preferred") {
      setSelectData((prev) => ({
        ...prev,
        [selectName]: data,
      }));
    } else {
      setSelectData((prev) => ({
        ...prev,
        [selectName]: data.value,
      }));
    }
  };

  const handleRadioChange = (name, label) => {
    console.log(label);
    const capacity = null;
    if (label !== "Yes") {
      setRadioData((prev) => ({
        ...prev,
        [name]: { capacity, value: label },
      }));
    } else {
      setRadioData((prev) => ({
        ...prev,
        [name]: { ...prev[name], value: label },
      }));
    }
  };

  const handleCapacityChange = (name, value) => {
    console.log(name, value);
    setRadioData((prev) => ({
      ...prev,
      [name]: { ...prev[name], capacity: value },
    }));
  };

  const handleContinue = () => {
    console.log("selectData: ", selectData);
    console.log("RadioData: ", radioData);
    goToNextPage();
  };

  return (
    <>
      {console.log(radioData)}
      <PortalHeader />
      <NavigationHeader />
      <Container role="form">
        <Row>
          <Row>
            <PageTitleHeader
              title={"Enter Property Details"}
              text={
                "Tell us more about this investment opportunity.  All fields are optional."
              }
            />
          </Row>
        </Row>

        <Row className="mb-3">
          <h4>Investment Opportunity General Details</h4>
        </Row>
        <Row className="mb-3">
          <Col className="mr-5">
            <Row id="sale-label">Sale or Lease</Row>
            <Row>
              <Select
                aria-labelledby="sale-label"
                onChange={(value) => handleSelectChange("saleOrLease", value)}
                className="w-100"
                options={PropStatusOptions}
              />
            </Row>
          </Col>
          <Col>
            <Row id="current-zone-label">Current Zoning</Row>
            <Row>
              <Select
                aria-labelledby="current-zone-label"
                onChange={(value) => handleSelectChange("currentZone", value)}
                className="w-100"
                options={zoningOptions}
              />
            </Row>
          </Col>
        </Row>
        <Row className="mb-5">
          <Col className="mr-5">
            <Row id="future-zone-label">Future Zoning</Row>
            <Row>
              <Select
                aria-labelledby="future-zone-label"
                onChange={(value) => handleSelectChange("futureZone", value)}
                className="w-100"
                options={zoningOptions}
              />
            </Row>
          </Col>

          <Col>
            <Row id="preferred-dev-label">Preferred Development</Row>
            <Row>
              <Select
                isMulti
                aria-labelledby="preferred-dev-label"
                onChange={(value) => handleSelectChange("preferred", value)}
                closeMenuOnSelect={false}
                className="w-100"
                options={developmentOptions}
              />
            </Row>
          </Col>
        </Row>

        <Row className="mb-3">
          <h4>Site Servicing</h4>
        </Row>
        <Row className="mb-3">
          <Col className="mr-5">
            <Row id="water-label" className="mb-1">
              Does the site have access to water supply?
            </Row>

            <Radios
              aria-labelledby="water-label"
              labels={radioLabels}
              name="waterSupply"
              handleRadioChange={handleRadioChange}
            />
            {radioData.waterSupply.value === "Yes" && (
              <MaxCapRow
                name="waterSupply"
                handleChange={handleCapacityChange}
              />
            )}
          </Col>
          <Col>
            <Row id="sewer-label" className="mb-1">
              Does the site have access to sewer?
            </Row>
            <Radios
              aria-labelledby="sewer-label"
              labels={radioLabels}
              name="sewer"
              handleRadioChange={handleRadioChange}
            />
            {radioData.sewer === "Yes" && (
              <MaxCapRow handleChange={handleCapacityChange} />
            )}
          </Col>
        </Row>
        <Row className="mb-3">
          <Col className="mr-5">
            <Row id="road-label" className="mb-1">
              Does the site have road access?
            </Row>

            <Radios
              aria-labelledby="road-label"
              labels={radioLabels}
              name="roadAccess"
              handleRadioChange={handleRadioChange}
            />
          </Col>

          <Col>
            <Row id="gas-label" className="mb-1">
              Does the site have access to natural gas supply and
              infrastructure?
            </Row>
            <Radios
              aria-labelledby="gas-label"
              labels={radioLabels}
              name="naturalGas"
              handleRadioChange={handleRadioChange}
            />
            {radioData.naturalGas === "Yes" && (
              <MaxCapRow
                handleChange={handleCapacityChange}
                units="MMBTU/hour"
              />
            )}
          </Col>
        </Row>
        <Row className="mb-3">
          <Col className="mr-5">
            <Row id="electrical-label" className="mb-1">
              Does the site have access to electrical supply and infrastructure?
            </Row>
            <Radios
              aria-labelledby="electrical-label"
              labels={radioLabels}
              name="electrical"
              handleRadioChange={handleRadioChange}
            />
            {radioData.electrical === "Yes" && (
              <MaxCapRow handleChange={handleCapacityChange} units="MW" />
            )}
          </Col>
          <Col />
        </Row>
      </Container>
      <ButtonRow
        prevRoute="/addOpportunity/siteDetails"
        onClick={handleContinue}
      />
    </>
  );
}
