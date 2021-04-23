import { useState, useEffect } from "react";
import { Container, Col, Row, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PageTitleHeader from "../../Headers/PageTitleHeader/PageTitleHeader";
import ButtonRow from "../../ButtonRow/ButtonRow";
import NavigationHeader from "../../Headers/NavigationHeader/NavigationHeader";
import TextInput from "../../FormComponents/TextInput";
import {
  setBusinessContactName,
  setBusinessContactEmail,
  setUserInfo,
  resetOpportunity,
} from "../../../store/actions/opportunity";
import {
  setUserInfoName,
  setUserInfoEmail,
  setUserInfoRole,
  getUser,
  setUser,
  resetUser,
} from "../../../store/actions/user";
import Validator from "../../FormComponents/Validator";
import "./PropertyDetails2.css";
import { useKeycloakWrapper } from "../../../hooks/useKeycloakWrapper";
import UserFactory from "../../../store/factory/UserFactory";

export default function PropertyDetails2() {
  const dispatch = useDispatch();
  const [businessContactSync, setBusinessContactSync] = useState(false);
  // const [userInfoSync, setUserInfoSync] = useState(false);
  const businessContactEmail = useSelector(
    (state) => state.opportunity.businessContactEmail
  );
  const businessContactName = useSelector(
    (state) => state.opportunity.businessContactName
  );
  const userInfoEmail = useSelector((state) => state.user.email);
  const userInfoName = useSelector((state) => state.user.name);
  const userInfoRole = useSelector((state) => state.user.role);
  const commLink = useSelector(
    (state) => state.opportunity.userInfo.communityLink.value
  );
  const listingLink = useSelector(
    (state) => state.opportunity.userInfo.opportunityLink.value
  );
  const oppDesc = useSelector(
    (state) => state.opportunity.userInfo.opportunityDescription.value
  );
  const envInfo = useSelector(
    (state) => state.opportunity.userInfo.environmentalInformation.value
  );
  const keycloak = useKeycloakWrapper();

  const [validBusinessEmail, setValidBusinessEmail] = useState(true);

  const regex = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  const validateEmail = (value) => {
    if (value) {
      setValidBusinessEmail(regex.test(value));
    } else {
      setValidBusinessEmail(false);
    }
  };

  const history = useHistory();

  const noteLabel =
    "Please note, the information you enter in this section will appear as is on the listing to promote this opportunity. Do not include any personal information. ";
  const oppDescLabel =
    "Please describe the property including site characteristics, allowed uses, approval processes, permits, etc.";
  const enviroLabel =
    "Provide information about any environmental sensitivities of the site, and any required or completed environmental assessments.";
  const commUrlLabel = "Link to your community website/webpage";
  const listingUrlLabel = "Link to more info about this opportunity";
  const urlNoteComm =
    "This will direct potential investors to a webpage of your choice where they can learn more about your community.";
  const urlNote =
    "This will direct potential investors to a webpage, brochure, PDF, image etc. of your choice where they can learn more about the property.";
  const placeholderComm = "Enter URL here (eg. my community.ca)";
  const placeholder = "Enter URL here (eg. realtor.ca/myopportunity)";

  const goToNextPage = () => {
    history.push(`/investmentopportunities/review`);
  };

  const handleContinue = () => {
    goToNextPage();
  };

  const onCancelClick = () => {
    dispatch(resetOpportunity());
    history.push("/investmentopportunities/dashboard");
  };

  const handleCheck = (isChecked) => {
    setBusinessContactSync(isChecked);
    dispatch(setBusinessContactName(isChecked ? keycloak.displayName : ""));
    dispatch(setBusinessContactEmail(isChecked ? keycloak.email : ""));
    validateEmail(isChecked ? keycloak.email : "");
  };

  useEffect(() => {
    handleCheck(true);
  }, []);

  return (
    <>
      <NavigationHeader currentStep={4} />
      <Container role="form">
        <Row>
          <Row>
            <PageTitleHeader
              title="Enter Property Details"
              text="Tell us more about this investment opportunity."
              span="All fields are required unless marked otherwise."
            />
          </Row>
        </Row>
        <Row className="mb-3">
          <h4>Site Information</h4>
        </Row>
        <Row className="mb-4">
          <TextInput
            heading={oppDescLabel}
            notes={noteLabel}
            name="opportunityDescription"
            value={oppDesc}
            maxLength={1000}
            handleChange={(_, value) =>
              dispatch(setUserInfo("opportunityDescription", value))
            }
          />
          <div className="d-flex justify-content-between w-100 margin-top-valid">
            {!oppDesc ? (
              <Validator message="This field is required. Please enter information about your property." />
            ) : (
              <p>{"   "}</p>
            )}
            <div className="text-right">{`${oppDesc.length}/1000 Characters`}</div>
          </div>
        </Row>
        <Row className="mb-3">
          <h4>
            Environmental Information{" "}
            <span className="optional-text">(optional)</span>
          </h4>
        </Row>
        <Row className="mb-4">
          <TextInput
            heading={enviroLabel}
            notes={noteLabel}
            name="environmentalInformation"
            value={envInfo}
            maxLength={1000}
            handleChange={(_, value) =>
              dispatch(setUserInfo("environmentalInformation", value))
            }
          />
          <div className="text-right w-100 margin-top-valid">
            <span>{`${envInfo.length}/1000 Characters`}</span>
          </div>
        </Row>
        <Row className="mb-4">
          <TextInput
            heading={<span>{`${commUrlLabel}  (optional)`}</span>}
            notes={urlNoteComm}
            rows={1}
            placeholder={placeholderComm}
            name="communityLink"
            value={commLink}
            handleChange={(_, value) =>
              dispatch(setUserInfo("communityLink", value))
            }
          />
        </Row>
        <Row className="mb-4">
          <TextInput
            heading={<span>{`${listingUrlLabel}  (optional)`}</span>}
            notes={urlNote}
            rows={1}
            placeholder={placeholder}
            value={listingLink}
            handleChange={(_, value) =>
              dispatch(setUserInfo("opportunityLink", value))
            }
            name="opportunityLink"
          />
        </Row>
        <Row>
          <div className="d-flex flex-column">
            <h4>Business Contact</h4>
            <span style={{ opacity: "0.7" }} className="my-1">
              This will be the contact information displayed on the public
              listing of this opportunity.
            </span>
          </div>
        </Row>
        <Row className="mb-3">
          <Form.Check
            checked={businessContactSync}
            onClick={(e) => handleCheck(e.target.checked)}
            type="checkbox"
            label="Use the Contact Name/Email associated with the BCeID logged in."
            aria-label="Use the Contact Name/Email associated with the BCeID logged in."
          />
        </Row>
        <Row className="mb-4">
          <Col className="pl-0">
            <TextInput
              required={false}
              heading="Business Contact Name"
              notes=""
              rows={1}
              value={businessContactName}
              handleChange={(name, value) =>
                dispatch(setBusinessContactName(value))
              }
              name="busName"
            />
            {!businessContactName && (
              <div className="margin-top-valid">
                <Validator message="Please enter a contact name" />
              </div>
            )}
            <p id="email-label" className="mb-0">
              Business Contact Email
            </p>
            <div className="pb-3">
              <input
                autoComplete="off"
                aria-labelledby="email-label"
                className="bcgov-text-input mb-1 w-100"
                type="email"
                name="busEmail"
                pattern="/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g"
                onChange={(e) => {
                  dispatch(setBusinessContactEmail(e.target.value));
                  validateEmail(e.target.value);
                }}
                value={businessContactEmail}
              />
            </div>
            {!validBusinessEmail && (
              <div className="margin-top-valid">
                <Validator message="Please enter a valid email address" />
              </div>
            )}
          </Col>
          <Col />
        </Row>
        <Row>
          <div className="d-flex flex-column">
            <h4>Your Information</h4>
            <span style={{ opacity: "0.7" }} className="my-1">
              This will be for our records, and won&apos;t be shown to the
              public.
            </span>
          </div>
        </Row>
        <Row className="mb-4">
          <Col className="pl-0">
            <TextInput
              required
              heading="Your Full Name"
              notes=""
              rows={1}
              value={userInfoName}
              handleChange={(name, value) => {
                dispatch(setUserInfoName(value));
              }}
              name="userInfoName"
            />
            {!userInfoName && (
              <div className="margin-top-valid">
                <Validator message="Please enter your name" />
              </div>
            )}

            <p id="email-label" className="mb-0">
              Email (This is the email associated with your log in information
              and cannot be changed)
            </p>

            <div className="pb-3">
              <input
                required
                disabled
                readOnly
                autoComplete="off"
                aria-labelledby="email-label"
                className="bcgov-text-input mb-1 w-100"
                type="email"
                name="userInfoEmail"
                pattern="/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g"
                value={userInfoEmail}
              />
            </div>
            <TextInput
              required
              heading="Your Title/Role"
              notes=""
              rows={1}
              value={userInfoRole}
              handleChange={(name, value) => {
                dispatch(setUserInfoRole(value));
              }}
              name="userInfoRole"
            />
          </Col>
          <Col />
        </Row>
      </Container>
      <ButtonRow
        prevRoute="/investmentopportunities/property-details"
        onClick={handleContinue}
        noContinue={
          !userInfoName ||
          !validBusinessEmail ||
          !businessContactName ||
          !oppDesc
        }
        onCancelClick={onCancelClick}
      />
    </>
  );
}
