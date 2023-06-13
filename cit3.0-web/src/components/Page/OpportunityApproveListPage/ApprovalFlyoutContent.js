import React, { useState, useEffect } from "react";
import Proptypes from "prop-types";
import { Form } from "react-bootstrap";
import { Button } from "shared-components";
import { v4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { getOptions, setOptions } from "../../../store/actions/options";

const FORM_SUB_FROM_INPUT = "submitted_from_date";
const FORM_SUB_TO_INPUT = "submitted_to_date";
const FORM_PUB_FROM_INPUT = "published_from_date";
const FORM_PUB_TO_INPUT = "published_to_date";
let loading = false;

const ApprovalFlyoutContent = ({ title, onQuery, resetFilters, search }) => {
  const dispatch = useDispatch();
  const regionalDistricts = useSelector(
    (state) => state.options.regionalDistricts
  );
  const statuses = useSelector((state) => state.options.statuses);
  if (!loading && (!statuses.length || !regionalDistricts.length)) {
    loading = true;
    getOptions().then((response) => {
      dispatch(setOptions(response.data));
      loading = false;
    });
  }
  const [subFromValidated, setSubFromValidated] = useState();
  const [subToValidated, setSubToValidated] = useState();
  const [pubFromValidated, setPubFromValidated] = useState();
  const [pubToValidated, setPubToValidated] = useState();

  const [subFrom, setSubFrom] = useState(search[FORM_SUB_FROM_INPUT]);
  const [subTo, setSubTo] = useState(search[FORM_SUB_TO_INPUT]);
  const [pubFrom, setPubFrom] = useState(search[FORM_PUB_FROM_INPUT]);
  const [pubTo, setPubTo] = useState(search[FORM_PUB_TO_INPUT]);

  const [statusCode, setStatusCode] = useState([]);
  const [regionalDistrict, setRegionalDistrict] = useState();

  const validateInput = (fieldName, value) => {
    let otherValue;
    switch (fieldName) {
      case FORM_SUB_FROM_INPUT:
        otherValue = document.querySelector(`#${FORM_SUB_TO_INPUT}`).value;
        setSubFromValidated(otherValue !== "" && value >= otherValue);
        break;
      case FORM_SUB_TO_INPUT:
        otherValue = document.querySelector(`#${FORM_SUB_FROM_INPUT}`).value;
        setSubToValidated(otherValue !== "" && value <= otherValue);
        break;
      case FORM_PUB_FROM_INPUT:
        otherValue = document.querySelector(`#${FORM_PUB_TO_INPUT}`).value;
        setPubFromValidated(otherValue !== "" && value >= otherValue);
        break;
      case FORM_PUB_TO_INPUT:
        otherValue = document.querySelector(`#${FORM_PUB_FROM_INPUT}`).value;
        setPubToValidated(otherValue !== "" && value <= otherValue);
        break;
      default:
        break;
    }
  };

  const handleStatusChange = (nextStatusCode) => {
    let removedStatus = statusCode;
    const index = statusCode.indexOf(nextStatusCode);
    if (index !== -1) {
      removedStatus = removedStatus.filter((item, ind) => ind !== index);
      setStatusCode(removedStatus);
    } else {
      removedStatus = [...statusCode, nextStatusCode];
      setStatusCode(removedStatus);
    }
    onQuery(
      "approval_status_id",
      Array.isArray(statusCode) ? removedStatus.join(",") : ""
    );
  };
  const handleRegionalDistrictChange = (nextRDCode) => {
    setRegionalDistrict(nextRDCode);
    onQuery("regional_district", nextRDCode);
  };

  const handleResetFilters = () => {
    setStatusCode([]);
    setRegionalDistrict("");
    setSubFrom("");
    setSubTo("");
    setPubFrom("");
    setPubTo("");
    setSubFromValidated(false);
    setSubToValidated(false);
    setPubFromValidated(false);
    setPubToValidated(false);
    resetFilters();
    resetFilters();
  };

  const handleSubFrom = (value) => {
    setSubFrom(value);
    onQuery(FORM_SUB_FROM_INPUT, value);
  };

  const handleSubTo = (value) => {
    setSubTo(value);
    onQuery(FORM_SUB_TO_INPUT, value);
  };

  const handlePubFrom = (value) => {
    setPubFrom(value);
    onQuery(FORM_PUB_FROM_INPUT, value);
  };
  const handlePubTo = (value) => {
    setPubTo(value);
    onQuery(FORM_PUB_TO_INPUT, value);
  };

  // Initialization
  useEffect(() => {
    setStatusCode(
      search.approval_status_id ? search.approval_status_id.split(",") : []
    );
    setRegionalDistrict(search.regional_district);
    setSubFrom(search[FORM_SUB_FROM_INPUT]);
    setSubTo(search[FORM_SUB_TO_INPUT]);
    setPubFrom(search[FORM_PUB_FROM_INPUT]);
    setPubTo(search[FORM_PUB_TO_INPUT]);
  }, []);

  const order = ["NEW", "PEND", "NCOM", "NWED", "PUBL", "CLOS"];

  return (
    <div className="container-fluid">
      <h2>{title}</h2>
      <h3 className="mb-3">Status</h3>
      <div className="d-flex row bcgov-ciot-buttons">
        {statuses &&
          statuses
            .sort(
              (a, b) =>
                order.indexOf(a.status_code) - order.indexOf(b.status_code)
            )
            .map((status) => (
              <Button
                key={v4()}
                styling={`mb-3 bcgov-button filter-button ${
                  !statusCode.includes(status.status_code)
                    ? "unselected bcgov-normal-white"
                    : "border-0 bcgov-normal-blue"
                }`}
                onClick={() => handleStatusChange(status.status_code)}
                label={status.status_name}
                title={status.status_description}
              />
            ))}
      </div>
      <div className="my-3">
        <h3 className="mb-3">Submitted Date</h3>
        <div className="d-flex flex-nowrap justify-content-around ml-3 light-input">
          <Form.Group controlId={FORM_SUB_FROM_INPUT}>
            <Form.Label>From</Form.Label>
            <Form.Control
              type="date"
              name="submitted-from-date"
              value={subFrom}
              onInput={(e) =>
                validateInput(FORM_SUB_FROM_INPUT, e.target.value)
              }
              onChange={(e) => handleSubFrom(e.target.value)}
              placeholder="Choose a date"
            />
            <Form.Control.Feedback
              type="invalid"
              style={{ display: subFromValidated ? "block" : "none" }}
            >
              Cannot be later than the To Date.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="submitted_to_date">
            <Form.Label>To</Form.Label>
            <Form.Control
              type="date"
              name={FORM_SUB_TO_INPUT}
              value={subTo}
              onInput={(e) => validateInput(FORM_SUB_TO_INPUT, e.target.value)}
              onChange={(e) => handleSubTo(e.target.value)}
              placeholder="Choose a date"
            />
            <Form.Control.Feedback
              type="invalid"
              style={{ display: subToValidated ? "block" : "none" }}
            >
              Cannot be earlier than the From Date.
            </Form.Control.Feedback>
          </Form.Group>
        </div>
      </div>
      <div className="my-3">
        <h3 className="mb-3">Published Date</h3>
        <div className="d-flex flex-nowrap justify-content-around ml-3 light-input">
          <Form.Group controlId={FORM_PUB_FROM_INPUT}>
            <Form.Label>From</Form.Label>
            <Form.Control
              type="date"
              name="published-from-date"
              value={pubFrom}
              onInput={(e) =>
                validateInput(FORM_PUB_FROM_INPUT, e.target.value)
              }
              onChange={(e) => handlePubFrom(e.target.value)}
              placeholder="Choose a date"
            />
            <Form.Control.Feedback
              type="invalid"
              style={{ display: pubFromValidated ? "block" : "none" }}
            >
              Cannot be later than the To Date.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="published_to_date">
            <Form.Label>To</Form.Label>
            <Form.Control
              type="date"
              name={FORM_PUB_TO_INPUT}
              value={pubTo}
              onInput={(e) => validateInput(FORM_PUB_TO_INPUT, e.target.value)}
              onChange={(e) => handlePubTo(e.target.value)}
              placeholder="Choose a date"
            />
            <Form.Control.Feedback
              type="invalid"
              style={{ display: pubToValidated ? "block" : "none" }}
            >
              Cannot be earlier than the From Date.
            </Form.Control.Feedback>
          </Form.Group>
        </div>
      </div>
      <div className="my-3">
        <h3 className="mb-3">Regional District</h3>
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
      </div>
      {/* <hr className="hr-bold" /> */}
      <div className="d-flex bcgov-ciot-button justify-content-end">
        <Button
          styling="BC-Gov-SecondaryButton btn btn-primary"
          label="Reset all filters"
          onClick={() => handleResetFilters()}
        />
      </div>
    </div>
  );
};

ApprovalFlyoutContent.defaultProps = {
  search: {},
};

ApprovalFlyoutContent.propTypes = {
  title: Proptypes.string.isRequired,
  onQuery: Proptypes.func.isRequired,
  resetFilters: Proptypes.func.isRequired,
  search: Proptypes.shape(),
};

export default ApprovalFlyoutContent;
