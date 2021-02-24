import { useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import PageTitleHeader from "../../Headers/PageTitleHeader/PageTitleHeader";
import ButtonRow from "../../ButtonRow/ButtonRow";
import Radios from "../../FormComponents/Radios";
import PortalHeader from "../../Headers/PortalHeader/PortalHeader";
import NavigationHeader from "../../Headers/NavigationHeader/NavigationHeader";
import MaxCapRow from "../../FormComponents/MaxCapRow";
import {
  setUserInfo,
  setService,
  setServiceCapacity,
} from "../../../store/actions/opportunity";

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
  const dispatch = useDispatch();

  // Select states
  const preferred = useSelector(
    (state) => state.opportunity.userInfo.preferred.value
  );
  const saleOrLease = useSelector((state) => {
    const { value } = state.opportunity.userInfo.saleOrLease;
    const index = PropStatusOptions.findIndex(
      (item) => value && item.value === value
    );
    if (index === -1) {
      return value;
    }
    const { label } = PropStatusOptions[index];
    return {
      value,
      label,
    };
  });
  const currentZone = useSelector((state) => {
    const { value } = state.opportunity.userInfo.currentZone;
    const index = zoningOptions.findIndex(
      (item) => value && item.value === value
    );
    if (index === -1) {
      return value;
    }
    const { label } = zoningOptions[index];
    return {
      value,
      label,
    };
  });
  const futureZone = useSelector((state) => {
    const { value } = state.opportunity.userInfo.futureZone;
    const index = zoningOptions.findIndex(
      (item) => value && item.value === value
    );
    if (index === -1) {
      return value;
    }
    const { label } = zoningOptions[index];
    return {
      value,
      label,
    };
  });

  // Radio states
  const roadAccess = useSelector((state) => {
    const { name } = state.opportunity.services.roadAccess;
    return name;
  });
  const waterSupply = useSelector((state) => {
    const { name } = state.opportunity.services.waterSupply;
    return name;
  });
  const waterSupplyCapacity = useSelector((state) => {
    const { value } = state.opportunity.services.waterSupply;
    return value;
  });
  const sewer = useSelector((state) => {
    const { name } = state.opportunity.services.sewer;
    return name;
  });
  const sewerCapacity = useSelector((state) => {
    const { value } = state.opportunity.services.sewer;
    return value;
  });
  const naturalGas = useSelector((state) => {
    const { name } = state.opportunity.services.naturalGas;
    return name;
  });
  const naturalGasCapacity = useSelector((state) => {
    const { value } = state.opportunity.services.naturalGas;
    return value;
  });
  const electrical = useSelector((state) => {
    const { name } = state.opportunity.services.electrical;
    return name;
  });
  const electricalCapacity = useSelector((state) => {
    const { value } = state.opportunity.services.electrical;
    return value;
  });

  const [isValid, setIsValid] = useState(true);

  const history = useHistory();

  const goToNextPage = () => {
    history.push({
      pathname: `propDetails2`,
    });
  };

  const radioLabels = ["Yes", "No", "Unknown"];

  const handleSelectChange = (selectName, data) => {
    if (selectName === "preferred") {
      dispatch(setUserInfo(selectName, data));
    } else {
      dispatch(setUserInfo(selectName, data.value));
    }
  };

  const handleRadioChange = (name, label) => {
    if (label !== "Yes") {
      dispatch(setService(name, label));
      dispatch(setServiceCapacity(name, ""));
    } else {
      dispatch(setService(name, label));
    }
  };

  const handleCapacityChange = (name, value) => {
    dispatch(setServiceCapacity(name, value));
    if (value !== "" && Number.isNaN(value)) {
      setIsValid(false);
    } else if (value === "") {
      setIsValid(true);
    }
  };

  const handleContinue = () => {
    goToNextPage();
  };

  return (
    <>
      <PortalHeader />
      <NavigationHeader currentStep={3} />
      <Container role="form">
        <Row>
          <Row>
            <PageTitleHeader
              title="Enter Property Details"
              text="Tell us more about this investment opportunity.  All fields are optional."
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
                value={saleOrLease}
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
                value={currentZone}
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
                value={futureZone}
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
                value={preferred}
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
              value={waterSupply}
              handleRadioChange={handleRadioChange}
            />
            {waterSupply === "Yes" && (
              <MaxCapRow
                name="waterSupply"
                handleChange={(iName, iValue) =>
                  handleCapacityChange(iName, iValue)
                }
                unitString="cubic meters"
                valid={
                  !(
                    waterSupplyCapacity &&
                    Number.isNaN(Number(waterSupplyCapacity))
                  )
                }
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
              value={sewer}
              handleRadioChange={handleRadioChange}
            />
            {sewer === "Yes" && (
              <MaxCapRow
                name="sewer"
                handleChange={(iName, iValue) =>
                  handleCapacityChange(iName, iValue)
                }
                unitString="cubic meters"
                valid={!(sewerCapacity && Number.isNaN(Number(sewerCapacity)))}
              />
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
              value={roadAccess}
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
              value={naturalGas}
              handleRadioChange={handleRadioChange}
            />
            {naturalGas === "Yes" && (
              <MaxCapRow
                name="naturalGas"
                value={naturalGasCapacity}
                handleChange={(iName, iValue) =>
                  handleCapacityChange(iName, iValue)
                }
                units="MMBTU/hour"
                unitString="MMBtu"
                valid={
                  !(
                    naturalGasCapacity &&
                    Number.isNaN(Number(naturalGasCapacity))
                  )
                }
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
              value={electrical}
              handleRadioChange={handleRadioChange}
            />
            {electrical === "Yes" && (
              <MaxCapRow
                name="electrical"
                value={electricalCapacity}
                handleChange={(iName, iValue) =>
                  handleCapacityChange(iName, iValue)
                }
                units="MW"
                valid={
                  !(
                    electricalCapacity &&
                    Number.isNaN(Number(electricalCapacity))
                  )
                }
              />
            )}
          </Col>
          <Col />
        </Row>
      </Container>
      <ButtonRow
        prevRoute="/addOpportunity/siteDetails"
        onClick={handleContinue}
        noContinue={!isValid}
      />
    </>
  );
}
