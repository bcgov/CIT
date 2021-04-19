import React, { useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import PageTitleHeader from "../../Headers/PageTitleHeader/PageTitleHeader";
import ButtonRow from "../../ButtonRow/ButtonRow";
import Radios from "../../FormComponents/Radios";
import NavigationHeader from "../../Headers/NavigationHeader/NavigationHeader";
import MaxCapRow from "../../FormComponents/MaxCapRow";
import {
  setUserInfo,
  setService,
  setServiceCapacity,
  setRentalPrice,
  setSalePrice,
} from "../../../store/actions/opportunity";
import { setOptions, getOptions } from "../../../store/actions/options";
import "./PropertyDetails1.scss";
import Validator from "../../FormComponents/Validator";

export default function PropertyDetails1() {
  const dispatch = useDispatch();

  const [rentalError, setRentalError] = useState(false);
  const [saleError, setSaleError] = useState(false);
  const [waterSupplyError, setWaterSupplyError] = useState(false);
  const [sewerError, setSewerError] = useState(false);
  const [naturalGasError, setNaturalGasError] = useState(false);
  const [electricalError, setElectricalError] = useState(false);

  const rentalPrice = useSelector(
    (state) => state.opportunity.userInfo.saleOrLease.rentalPrice
  );

  const salePrice = useSelector(
    (state) => state.opportunity.userInfo.saleOrLease.salePrice
  );

  // Get options for store
  const PropStatusOptions = useSelector(
    (state) => state.options.propertyStatuses
  ).map((option) => ({ value: option.code, label: option.name }));
  const zoningOptions = useSelector(
    (state) => state.options.landUseZoning
  ).map((option) => ({ value: option.code, label: option.name }));
  const developmentOptions = useSelector(
    (state) => state.options.preferredDevelopment
  ).map((option) => ({ value: option.code, label: option.name }));

  // Fetch options, if not already stored on client
  if (
    !PropStatusOptions.length ||
    !zoningOptions.length ||
    !developmentOptions.length
  ) {
    getOptions().then((response) => {
      dispatch(setOptions(response.data));
    });
  }
  // Select states
  const preferred = useSelector((state) => {
    let result = state.opportunity.userInfo.preferredDevelopment.value;
    if (
      Array.isArray(state.opportunity.userInfo.preferredDevelopment.value) &&
      typeof state.opportunity.userInfo.preferredDevelopment.value[0] !==
        "object"
    ) {
      result = state.opportunity.userInfo.preferredDevelopment.value.map(
        (item) => {
          let found = {};
          found = developmentOptions.find((dev) => dev.value === item);
          return found;
        }
      );
    }
    return result;
  });
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

  const history = useHistory();

  const goToNextPage = () => {
    history.push("/investmentopportunities/additional-details");
  };

  const radioLabels = ["Yes", "No", "Unknown"];

  const handleSelectChange = (selectName, data) => {
    if (selectName === "preferredDevelopment") {
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

  // map error functions to names
  const funcs = {
    waterSupply: setWaterSupplyError,
    electrical: setElectricalError,
    naturalGas: setNaturalGasError,
    sewer: setSewerError,
  };

  const handleCapacityChange = (name, value) => {
    dispatch(setServiceCapacity(name, value));
    if (value && isNaN(Number(value))) {
      funcs[name](true);
    } else {
      funcs[name](false);
    }
  };

  const handlePriceInputChange = (value, id) => {
    if (id === "rental-input") {
      dispatch(setRentalPrice(value));
      if (isNaN(Number(value))) {
        setRentalError(true);
      } else {
        setRentalError(false);
      }
    }
    if (id === "asking-input") {
      dispatch(setSalePrice(value));
      if (isNaN(Number(value))) {
        setSaleError(true);
      } else {
        setSaleError(false);
      }
    }
  };

  const handleContinue = () => {
    goToNextPage();
  };

  return (
    <div>
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
            <Row>
              {(saleOrLease.value === "SALE" ||
                saleOrLease.value === "BOTH") && (
                <Col className="mr-5">
                  <Row id="asking-price">Asking Price</Row>
                  <Row>
                    <div
                      id="rental-div"
                      className="d-flex align-items-center px-1 price-div"
                    >
                      <span className="mr-2">$</span>
                      <input
                        type="text"
                        id="asking-input"
                        className="price-input w-100"
                        aria-labelledby="asking-price"
                        value={salePrice}
                        onChange={(e) =>
                          handlePriceInputChange(e.target.value, e.target.id)
                        }
                      />
                    </div>

                    {saleError && (
                      <Validator message="Price must be a valid number" />
                    )}
                  </Row>
                </Col>
              )}
              {(saleOrLease.value === "LEAS" ||
                saleOrLease.value === "BOTH") && (
                <Col className="mr-5">
                  <Row id="rental-price">Rental Price</Row>
                  <Row>
                    <div
                      id="rental-div"
                      className="d-flex align-items-center px-1 price-div"
                    >
                      <span className="mr-2">$</span>
                      <input
                        type="text"
                        id="rental-input"
                        aria-labelledby="rental-price"
                        value={rentalPrice}
                        placeholder="/month"
                        onChange={(e) =>
                          handlePriceInputChange(e.target.value, e.target.id)
                        }
                        className="price-input w-100"
                      />
                    </div>
                    {rentalError && (
                      <Validator message="Price must be a valid number" />
                    )}
                  </Row>
                </Col>
              )}
            </Row>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col className="mr-5">
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
          <Col>
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
        </Row>
        <Row className="mb-3">
          <Col className="mr-5">
            <Row id="preferred-dev-label">Preferred Development</Row>
            <Row>
              <Select
                isMulti
                defaultValue={preferred}
                aria-labelledby="preferred-dev-label"
                value={preferred}
                onChange={(value) =>
                  handleSelectChange("preferredDevelopment", value)
                }
                closeMenuOnSelect={false}
                className="w-100"
                options={developmentOptions}
              />
            </Row>
          </Col>
          <Col />
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
                value={waterSupplyCapacity}
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
                value={sewerCapacity}
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
        prevRoute="/investmentopportunities/site-info"
        onClick={handleContinue}
        noContinue={
          rentalError ||
          saleError ||
          waterSupplyError ||
          electricalError ||
          sewerError ||
          naturalGasError
        }
      />
    </div>
  );
}
