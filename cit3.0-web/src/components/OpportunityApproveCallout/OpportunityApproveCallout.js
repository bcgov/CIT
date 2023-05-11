import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Form, Row, Modal } from "react-bootstrap";
import { Button } from "shared-components";
import "./OpportunityApproveCallout.css";
import TextInput from "../FormComponents/TextInput";
import {
  resetOpportunity,
  setApprovalStatus,
  setPrivateNote,
  setPublicNote,
} from "../../store/actions/opportunity";
import { closeNotification } from "../../store/actions/notification";
import { sendEdoPublishedNotification } from "../../store/actions/email";
import Radios from "../FormComponents/Radios";
import { useKeycloakWrapper } from "../../hooks/useKeycloakWrapper";

const OpportunityApproveCallout = ({
  publicNote,
  privateNote,
  currentStatus,
  userQuestion,
  validUser,
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
  const [approveUser, setApproveUser] = useState("No");
  const listingLink = useSelector((state) => state.opportunity.link);
  const opportunityName = useSelector((state) => state.opportunity.name);
  const opportunityId = useSelector((state) => state.opportunity.id);
  const keycloak = useKeycloakWrapper();
  const [asked, setAsked] = useState(false);

  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const goBackToAdmin = () => {
    dispatch(resetOpportunity());
    dispatch(closeNotification());
    history.goBack();
  };

  const validateStatusChange = () => {
    setPublicValidated(true);
    setPrivateValidated(true);
    // No business logic
    if (["PUBL", "CLOS"].includes(nextStatus)) {
      return true;
    }
    // EDO Comment needed
    if (["NCOM"].includes(nextStatus) && newPublicNote === "") {
      setPublicValidated(false);
      return false;
    }
    return true;
  };

  // Get current status name
  const statusOption = approvalStatuses.find(
    (s) => currentStatus === s.status_code
  );
  const currentStatusName = statusOption && statusOption.status_name;

  // This catches possible delays in props
  useEffect(() => {
    setNextStatus(currentStatus);
    setNewPublicNote(publicNote);
    setNewPrivateNote(privateNote);
  }, [currentStatus]);

  // Validate form changes
  useEffect(() => {
    validateStatusChange();
  }, [nextStatus, newPublicNote, newPrivateNote]);

  // Add form data to state, and submit to DB
  const submitStatusChange = () => {
    if (validateStatusChange()) {
      dispatch(setApprovalStatus(nextStatus));
      dispatch(setPublicNote(newPublicNote));
      dispatch(setPrivateNote(newPrivateNote));
      const alertStatus = approvalStatuses.find(
        (s) => nextStatus === s.status_code
      ).status_name;
      onStatusChange(alertStatus, approveUser);
      if (nextStatus === "PUBL" && currentStatus !== "PUBL") {
        sendEdoPublishedNotification(
          opportunityId,
          listingLink,
          keycloak.obj.token
        )
          .then(() => {})
          .catch((error) => console.log(error));
      }
    }
  };

  const checkComment = () => {
    if (
      nextStatus !== currentStatus && // status has changed
      newPublicNote !== "" && // comment box is not empty
      publicNote === newPublicNote && // comment has not changed
      asked === false
    ) {
      handleShow();
      setAsked(true);
    } else {
      submitStatusChange();
    }
  };

  // Copy the visually hidden textarea
  const copyLink = () => {
    document.getElementById("link").select();
    document.execCommand("copy");
  };

  // Use broswer print method
  const openPdf = () => {
    window.print();
  };

  // Open generic email with link
  const emailLink = () => {
    const subject = opportunityName;
    let uri = "mailto:?subject=";
    uri += encodeURIComponent(subject);
    uri += "&body=";
    uri += encodeURIComponent(window.location.origin + listingLink);
    window.open(uri);
  };

  return (
    <Container
      className="OpportunityApproveCallout"
      data-testid="OpportunityApproveCallout"
    >
      <textarea
        readOnly
        id="link"
        className="visually-hidden"
        value={window.location.origin + listingLink}
      />
      <Row>
        <Col>
          <div role="form">
            <p className="m-0">
              <b>Current Status - {currentStatusName}</b>
            </p>
            {!validUser ? (
              <>
                <p className="pt-4">{userQuestion}</p>
                <div className="ml-3 mb-3">
                  <Radios
                    name="ApproveUser"
                    value={approveUser}
                    labels={["Yes", "No"]}
                    handleRadioChange={(key, value) => {
                      setApproveUser(value);
                    }}
                  />
                </div>
                <Form.Control.Feedback
                  className="mt-0 mb-3"
                  type="invalid"
                  style={{
                    display:
                      approveUser === "No" && nextStatus === "PUBL"
                        ? "block"
                        : "none",
                  }}
                >
                  User must approved to publish an Opportunity
                </Form.Control.Feedback>
              </>
            ) : null}
            <TextInput
              heading="Internal Note"
              notes="This note will only be visible to administrators."
              id="public-note"
              name="public-note"
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
              heading="Comment to Community User"
              notes="This comment will be returned to the Community User along with the status change."
              id="private-note"
              name="private-note"
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
            <div className="d-flex flex-row">
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
                      <option
                        key={status.status_code}
                        value={status.status_code}
                      >
                        {status.status_name}
                      </option>
                    ))}
                </Form.Control>
              </Form.Group>
              <div className="d-flex flex-grow-1 justify-content-end">
                <div className="d-flex flex-column">
                  <button
                    type="button"
                    className="a-tag"
                    onClick={() => copyLink()}
                  >
                    Copy Listing Link
                  </button>
                  <button
                    type="button"
                    className="a-tag"
                    onClick={() => emailLink()}
                  >
                    Email Listing Link
                  </button>
                  <button
                    type="button"
                    className="a-tag"
                    onClick={() => openPdf()}
                  >
                    View Listing PDF
                  </button>
                </div>
              </div>
            </div>
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
            disabled={
              !validUser && approveUser === "No" && nextStatus === "PUBL"
            }
            id="submit"
            onClick={checkComment}
            label="Change Opportunity Status"
            styling="bcgov-normal-blue btn primary"
          />
        </Col>
      </Row>
      <Modal
        show={show}
        onHide={handleClose}
        keyboard={false}
        backdrop="static"
        size="lg"
        centered
      >
        <Modal.Body>
          <h3>You currently have this comment for the Community User:</h3>
          <p className="modal-text-indent">{publicNote}</p>
          <h4>
            The comment will show on the listing. Would you like to delete this
            comment?
          </h4>
        </Modal.Body>
        <Modal.Footer>
          <Button
            label="Close"
            styling="BC-Gov-SecondaryButton bc-gov-btn"
            onClick={handleClose}
          />
          <Button
            label="Delete Comment"
            styling="bcgov-normal-blue btn primary more-pad"
            onClick={() => {
              setNewPublicNote("");
              handleClose();
            }}
          />
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

OpportunityApproveCallout.propTypes = {
  publicNote: PropTypes.string,
  privateNote: PropTypes.string,
  currentStatus: PropTypes.string,
  userQuestion: PropTypes.string,
  validUser: PropTypes.bool,
  approvalStatuses: PropTypes.arrayOf(PropTypes.shape()),
  onStatusChange: PropTypes.func.isRequired,
};

OpportunityApproveCallout.defaultProps = {
  publicNote: "",
  privateNote: "",
  currentStatus: "",
  userQuestion: "",
  validUser: true,
  approvalStatuses: [],
};

export default OpportunityApproveCallout;
