import PropTypes from "prop-types";
import { Container, Col, Row, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import PageTitleHeader from "../../Headers/PageTitleHeader/PageTitleHeader";
import ButtonRow from "../../ButtonRow/ButtonRow";
import PortalHeader from "../../Headers/PortalHeader/PortalHeader";
import NavigationHeader from "../../Headers/NavigationHeader/NavigationHeader";
import TextInput from "../../FormComponents/TextInput";

export default function PropertyDetails2({ location }) {
  const [checked, setChecked] = useState(false);
  const [formData, setFormData] = useState({
    oppDesc: "",
    envDesc: "",
    commLink: "",
    moreInfoLink: "",
    busName: "",
    busEmail: "",
  });

  console.log("location: ", location.state);
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
      pathname: `review`,
      state: { formData, checked },
    });
  };
  const handleContinue = () => {
    // goToNextPage();
    const state = { formData, checked };
    console.log(state);
  };

  const handleTextInput = (name, text) => {
    setFormData((prev) => ({
      ...prev,
      [name]: text,
    }));
  };

  const handleCheck = (isChecked) => {
    setChecked(isChecked);
    setFormData((prev) => ({
      ...prev,
      busEmail: "",
      busName: "",
    }));
  };
  return (
    <>
      {console.log(formData)}
      <PortalHeader />
      <NavigationHeader />
      <Container role="form">
        <Row>
          <Row>
            <PageTitleHeader
              title="Enter Property Details"
              text={
                "Tell us more about this investment opportunity.  All fields are optional."
              }
            />
          </Row>
        </Row>
        <Row className="mb-3">
          <h4>Site Information</h4>
        </Row>
        <Row>
          <TextInput
            heading={oppDescLabel}
            handleChange={handleTextInput}
            notes={noteLabel}
            name="oppDesc"
            value={formData.oppDesc}
          />
        </Row>
        <Row className="mb-3">
          <h4>Environmental Information</h4>
        </Row>
        <Row>
          <TextInput
            handleChange={handleTextInput}
            heading={enviroLabel}
            notes={noteLabel}
            name="envDesc"
            value={formData.envDesc}
          />
        </Row>
        <Row>
          <TextInput
            heading={commUrlLabel}
            notes={urlNoteComm}
            rows={1}
            placeholder={placeholderComm}
            name="commLink"
            handleChange={handleTextInput}
            value={formData.commLink}
          />
        </Row>
        <Row>
          <TextInput
            heading={listingUrlLabel}
            notes={urlNote}
            rows={1}
            placeholder={placeholder}
            name="moreInfoLink"
            handleChange={handleTextInput}
            value={formData.moreInfoLink}
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
        <Row>
          <Col className="pl-0">
            <TextInput
              disabled={checked}
              heading="Business Contact Name"
              notes={""}
              rows={1}
              name="busName"
              handleChange={handleTextInput}
              value={formData.busName}
            />
            <p id="email-label" className="mb-0">
              Business Contact Email
            </p>
            <input
              disabled={checked}
              aria-labelledby="email-label"
              className="bcgov-text-input mb-4 w-100"
              type="email"
              name="busEmail"
              pattern="/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g"
              onChange={(e) => handleTextInput("busEmail", e.target.value)}
              value={formData.busEmail}
            />
          </Col>
          <Col />
        </Row>
      </Container>
      <ButtonRow
        prevRoute="/addOpportunity/propDetails1"
        onClick={handleContinue}
      />
    </>
  );
}

PropertyDetails2.propTypes = {
  location: PropTypes.shape().isRequired,
};
