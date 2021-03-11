import { useState } from "react";
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
  setBusinessNameShared,
} from "../../../store/actions/opportunity";
import Validator from "../../FormComponents/Validator";

export default function PropertyDetails2() {
  document.title = `Investments - Add Opportunity - Additional Information`;
  const dispatch = useDispatch();
  const businessContactEmail = useSelector(
    (state) => state.opportunity.businessContactEmail
  );
  const businessContactName = useSelector(
    (state) => state.opportunity.businessContactName
  );
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

  const [validEmail, setValidEmail] = useState(true);

  const regex = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  const validateEmail = (value) =>
    value ? setValidEmail(regex.test(value)) : setValidEmail(true);

  const history = useHistory();

  const noteLabel =
    "Please note, the information you enter in this section will appear as is on the listing to promote this opportunity.  Do not include any personal infomation. ";
  const oppDescLabel =
    "Opportunity description including site characteristics, permit info, or any other relevant information.";
  const enviroLabel =
    "Please tell us about any environmental assessment info or environmental sensitivity, if known.";
  const commUrlLabel = "Link to your community website/webpage";
  const listingUrlLabel = "Link to more info about this opportunity";
  const urlNoteComm =
    "This will direct potential Investors to a webpage of your choice where they can learn more about your community.";
  const urlNote =
    "This will direct potential Investors to a webpage, brochure, PDF, image etc. of your choice where they can learn more about your community.";
  const placeholderComm = "Enter URL here (eg. my community.ca)";
  const placeholder = "Enter URL here (eg. realtor.ca/myopportunity)";

  const goToNextPage = () => {
    history.push({
      pathname: `/addOpportunity/review`,
    });
  };
  const handleContinue = () => {
    goToNextPage();
  };

  const handleCheck = (isChecked) => {
    dispatch(setBusinessNameShared(isChecked));
  };
  return (
    <>
      <NavigationHeader currentStep={4} />
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
          <h4>Site Information</h4>
        </Row>
        <Row className="mb-4">
          <TextInput
            heading={oppDescLabel}
            notes={noteLabel}
            name="opportunityDescription"
            value={oppDesc}
            handleChange={(_, value) =>
              dispatch(setUserInfo("opportunityDescription", value))
            }
          />
        </Row>
        <Row className="mb-3">
          <h4>Environmental Information</h4>
        </Row>
        <Row className="mb-4">
          <TextInput
            heading={enviroLabel}
            notes={noteLabel}
            name="environmentalInformation"
            value={envInfo}
            handleChange={(_, value) =>
              dispatch(setUserInfo("environmentalInformation", value))
            }
          />
        </Row>
        <Row className="mb-4">
          <TextInput
            heading={commUrlLabel}
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
            heading={listingUrlLabel}
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
        <Row className="mb-3">
          <h4>Business Contract</h4>
        </Row>
        <Row className="mb-3">
          <Form.Check
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
            <p id="email-label" className="mb-0">
              Business Contact Email
            </p>
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
            {!validEmail && (
              <Validator message="Please enter a valid email address" />
            )}
          </Col>
          <Col />
        </Row>
      </Container>
      <ButtonRow
        prevRoute="/addOpportunity/propDetails1"
        onClick={handleContinue}
        noContinue={!validEmail}
      />
    </>
  );
}
