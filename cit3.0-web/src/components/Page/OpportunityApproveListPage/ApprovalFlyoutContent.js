import React, { useState } from "react";
import Proptypes from "prop-types";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import { v4 } from "uuid";

const FORM_SUB_FROM_INPUT = "submitted_from_date";
const FORM_SUB_TO_INPUT = "submitted_to_date";
const FORM_PUB_FROM_INPUT = "published_from_date";
const FORM_PUB_TO_INPUT = "published_to_date";

const ApprovalFlyoutContent = ({ title, onQuery, resetFiliters, search }) => {
  const [options, setOptions] = useState(0);
  const [subFromValidated, setSubFromvalidated] = useState();
  const [subToValidated, setSubTovalidated] = useState();
  const [pubFromValidated, setPubFromValidated] = useState();
  const [pubToValidated, setPubToValidated] = useState();
  if (!options) {
    axios.get("/api/opportunity/options/").then((data) => {
      setOptions(data.data);
    });
  }

  const validateInput = (fieldName, value) => {
    switch (fieldName) {
      case FORM_SUB_FROM_INPUT:
        setSubFromvalidated(
          value >= document.querySelector(`#${FORM_SUB_TO_INPUT}`).value
        );
        break;
      case FORM_SUB_TO_INPUT:
        setSubTovalidated(
          value <= document.querySelector(`#${FORM_SUB_FROM_INPUT}`).value
        );
        break;
      case FORM_PUB_FROM_INPUT:
        setPubFromValidated(
          value >= document.querySelector(`#${FORM_PUB_TO_INPUT}`).value
        );
        break;
      case FORM_PUB_TO_INPUT:
        setPubToValidated(
          value <= document.querySelector(`#${FORM_PUB_FROM_INPUT}`).value
        );
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <h3>{title}</h3>
      <div className="d-flex flex-column my-3">
        <h4 className="mb-3">Status</h4>
        {options.statuses &&
          options.statuses.map((status) => (
            <Button
              key={v4()}
              className="mb-3"
              onClick={() => onQuery("approval_status_id", status.status_code)}
              title={status.status_description}
            >
              {status.status_name}
            </Button>
          ))}
      </div>
      <div className="my-3">
        <h4 className="mb-3">Submitted Date</h4>
        <div className="d-flex flex-nowrap justify-content-around ml-3 light-input">
          <Form.Group controlId={FORM_SUB_FROM_INPUT}>
            <Form.Label>From</Form.Label>
            <Form.Control
              type="date"
              name="submitted-from-date"
              value={search[FORM_SUB_FROM_INPUT]}
              onInput={(e) =>
                validateInput(FORM_SUB_FROM_INPUT, e.target.value)
              }
              onChange={(e) => onQuery(FORM_SUB_FROM_INPUT, e.target.value)}
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
              value={search[FORM_SUB_TO_INPUT]}
              onInput={(e) => validateInput(FORM_SUB_TO_INPUT, e.target.value)}
              onChange={(e) => onQuery(FORM_SUB_TO_INPUT, e.target.value)}
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
        <h4 className="mb-3">Published Date</h4>
        <div className="d-flex flex-nowrap justify-content-around ml-3 light-input">
          <Form.Group controlId={FORM_PUB_FROM_INPUT}>
            <Form.Label>From</Form.Label>
            <Form.Control
              type="date"
              name="published-from-date"
              value={search[FORM_PUB_FROM_INPUT]}
              onInput={(e) =>
                validateInput(FORM_PUB_FROM_INPUT, e.target.value)
              }
              onChange={(e) => onQuery(FORM_PUB_FROM_INPUT, e.target.value)}
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
              value={search[FORM_PUB_TO_INPUT]}
              onInput={(e) => validateInput(FORM_PUB_TO_INPUT, e.target.value)}
              onChange={(e) => onQuery(FORM_PUB_TO_INPUT, e.target.value)}
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
        <h4 className="mb-3">Regional District</h4>
        <Form.Group controlId="regional_district">
          <Form.Label className="visually-hidden">To</Form.Label>
          <Form.Control
            as="select"
            name="regional-district"
            value={search.regional_district}
            onChange={(e) => onQuery("regional_district", e.target.value)}
          >
            <option value="">All</option>
            {options.regionalDistricts &&
              options.regionalDistricts.map((district) => (
                <option value={district.id}>
                  {district.name}({district.area_id})
                </option>
              ))}
          </Form.Control>
        </Form.Group>
      </div>
      <hr className="hr-bold" />
      <div className="d-flex justify-content-end">
        <Button
          className="BC-Gov-SecondaryButton"
          onClick={() => resetFiliters()}
        >
          Reset all filters
        </Button>
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
  resetFiliters: Proptypes.func.isRequired,
  search: Proptypes.shape(),
};

export default ApprovalFlyoutContent;
