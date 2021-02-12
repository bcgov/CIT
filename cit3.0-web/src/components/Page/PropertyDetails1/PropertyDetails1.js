import { useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import PageTitleHeader from "../../Headers/PageTitleHeader/PageTitleHeader";
import ButtonRow from "../../ButtonRow/ButtonRow";
import Radios from "../../FormComponents/Radios";
import PortalHeader from "../../Headers/PortalHeader/PortalHeader";
import NavigationHeader from "../../Headers/NavigationHeader/NavigationHeader";

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
    propStatus: null,
    communityZone: null,
    landZone: null,
    preferred: null,
    ocpZone: null,
  });

  const [radioData, setRadioData] = useState({
    accessibleByRoad: null,
    waterSewage: null,
    naturalGas: null,
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

  const handleRadioChange = (name, label, data) => {
    setRadioData((prev) => ({
      ...prev,
      [name]: label,
    }));
  };

  const handleContinue = () => {
    console.log("selectData: ", selectData);
    console.log("RadioData: ", radioData);
    goToNextPage();
  };

  return (
    <>
      <PortalHeader />
      <NavigationHeader />
      <Container>
        <Row>
          <PageTitleHeader
            title={"Enter Property Details"}
            text={
              "Tell us more about this investment opportunity.  All fields are optional."
            }
          />
        </Row>

        <Row className="mb-3">
          <h4>Investment Opportunity General Details</h4>
        </Row>
        <Row className="mb-3">
          <Col className="mr-5">
            <Row>Property Status</Row>
            <Row>
              <Select
                onChange={(value) => handleSelectChange("propStatus", value)}
                className="w-100"
                options={PropStatusOptions}
              />
            </Row>
          </Col>
          <Col>
            <Row>Official Community Planning Zoning</Row>
            <Row>
              <Select
                onChange={(value) => handleSelectChange("communityZone", value)}
                className="w-100"
                options={zoningOptions}
              />
            </Row>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col className="mr-5">
            <Row>Land Use Zoning</Row>
            <Row>
              <Select
                onChange={(value) => handleSelectChange("landZone", value)}
                className="w-100"
                options={zoningOptions}
              />
            </Row>
          </Col>

          <Col>
            <Row>OCP Zoning</Row>
            <Row>
              <Select
                onChange={(value) => handleSelectChange("ocpZone", value)}
                className="w-100"
                options={zoningOptions}
              />
            </Row>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col className="mr-5">
            <Row>Preferred Development</Row>
            <Row>
              <Select
                isMulti
                onChange={(value) => handleSelectChange("preferred", value)}
                closeMenuOnSelect={false}
                className="w-100"
                options={developmentOptions}
              />
            </Row>
          </Col>
          <Col> </Col>
        </Row>
        <Row className="mb-3">
          <h4>Site Servicing</h4>
        </Row>
        <Row className="mb-3">
          <Col className="mr-5">
            <Row className="mb-1">Is the site accessible by road?</Row>

            <Radios
              labels={radioLabels}
              name="accessibleByRoad"
              handleRadioChange={handleRadioChange}
            />
          </Col>
          <Col>
            <Row className="mb-1">Is the site connected to water/sewage?</Row>
            <Radios
              labels={radioLabels}
              name="waterSewage"
              handleRadioChange={handleRadioChange}
            />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col className="mr-5">
            <Row className="mb-1">Is the site connected to Natural Gas?</Row>
            <Radios
              labels={radioLabels}
              name="naturalGas"
              handleRadioChange={handleRadioChange}
            />
          </Col>
        </Row>
      </Container>
      <ButtonRow
        prevRoute="/addOpportunity/siteDetails"
        onClick={handleContinue}
      />
    </>
  );
}
