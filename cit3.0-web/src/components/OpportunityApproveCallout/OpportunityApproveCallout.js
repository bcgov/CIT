import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Col, Container, Form, Row } from "react-bootstrap";
import { Button } from "shared-components";
import styles from "./OpportunityApproveCallout.module.css";
import TextInput from "../FormComponents/TextInput";
import {
  resetOpportunity,
  setApprovalStatus,
  setPrivateNote,
  setPublicNote,
} from "../../store/actions/opportunity";

const OpportunityApproveCallout = ({
  publicNote,
  privateNote,
  currentStatus,
  approvalStatuses,
  onStatusChange,
}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [nextStatus, setNextStatus] = useState(currentStatus);
  const [newPublicNote, setNewPublicNote] = useState(publicNote);
  const [newPrivateNote, setNewPrivateNote] = useState(privateNote);
  const [publicValidated, setPublicValidated] = useState(true);
  const [privateValidated, setPrivateValidated] = useState(true);

  const goBackToAdmin = () => {
    dispatch(resetOpportunity());
    history.goBack();
  };

  const validateStatusChange = () => {
    setPublicValidated(true);
    setPrivateValidated(true);
    // No business logic
    if (["PUBL", "CLOS", "NWED"].includes(nextStatus)) {
      return true;
    }
    // EDO Comment needed
    if (["NCOM"].includes(nextStatus) && newPublicNote === "") {
      setPublicValidated(false);
      return false;
    }
    // Internal note needed
    if (["PEND"].includes(nextStatus) && newPrivateNote === "") {
      setPrivateValidated(false);
      return false;
    }
    return true;
  };

  useEffect(() => {
    validateStatusChange();
  }, [nextStatus, newPublicNote, newPrivateNote]);

  const submitStatusChange = () => {
    if (validateStatusChange()) {
      dispatch(setApprovalStatus(nextStatus));
      dispatch(setPublicNote(newPublicNote));
      dispatch(setPrivateNote(newPrivateNote));
      onStatusChange({});
    }
  };

  return (
    <Container
      className={styles.OpportunityApproveCallout}
      data-testid="OpportunityApproveCallout"
    >
      <Row>
        <Col>
          <div role="form">
            <TextInput
              heading="Internal Note"
              notes="This note will only be visible to administrators."
              id="public-note"
              rows={3}
              value={newPrivateNote}
              handleChange={(_, value) => setNewPrivateNote(value)}
            />
            <Form.Control.Feedback
              className="mt-0 mb-3"
              type="invalid"
              style={{ display: !privateValidated ? "block" : "none" }}
            >
              You must set a note for this status
            </Form.Control.Feedback>
            <TextInput
              heading="Comment to Community/EDO"
              notes="This comment will be returned to the Community User/EDO along with the status change."
              id="private-note"
              rows={3}
              value={newPublicNote}
              handleChange={(_, value) => setNewPublicNote(value)}
            />
            <Form.Control.Feedback
              className="mt-0 mb-3"
              type="invalid"
              style={{ display: !publicValidated ? "block" : "none" }}
            >
              You must send a comment with this status
            </Form.Control.Feedback>
            <Form.Group controlId="regional_district">
              <Form.Label>Change Opportunity Status to</Form.Label>
              <Form.Control
                as="select"
                name="status-change"
                value={nextStatus}
                onChange={(e) => setNextStatus(e.target.value)}
              >
                {approvalStatuses &&
                  approvalStatuses.map((status) => (
                    <option value={status.status_code}>
                      {status.status_name}
                    </option>
                  ))}
              </Form.Control>
            </Form.Group>
          </div>
          <hr className="hr-bold" />
        </Col>
      </Row>
      <Row>
        <Col>
          <Button
            id="cancel"
            onClick={goBackToAdmin}
            label="Return to Dashboard"
            styling="BC-Gov-SecondaryButton bc-gov-btn"
          />
        </Col>
        <Col className="d-flex justify-content-end">
          <Button
            id="submit"
            onClick={submitStatusChange}
            label="Change Opportunity Status"
            styling="bcgov-normal-blue btn primary"
          />
        </Col>
      </Row>
    </Container>
  );
};

OpportunityApproveCallout.propTypes = {
  publicNote: PropTypes.string,
  privateNote: PropTypes.string,
  currentStatus: PropTypes.string,
  approvalStatuses: PropTypes.arrayOf(PropTypes.shape()),
  onStatusChange: PropTypes.func.isRequired,
};

OpportunityApproveCallout.defaultProps = {
  publicNote: "",
  privateNote: "",
  currentStatus: "",
  approvalStatuses: [],
};

export default OpportunityApproveCallout;
