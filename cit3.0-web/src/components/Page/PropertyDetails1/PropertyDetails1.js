import { Container, Col, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import PageTitleHeader from "../../Headers/PageTitleHeader/PageTitleHeader";
import ButtonRow from "../../ButtonRow/ButtonRow";

export default function PropertyDetails1() {
  const history = useHistory();
  const goToNextPage = () => {
    history.push({
      pathname: `propDetails2`,
      state: { stuff: "stuff" },
    });
  };
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
  return (
    <>
      <Container>
        <PageTitleHeader
          title={"Enter Property Details"}
          text={
            "Tell us more about this investment opportunity.  All fields are optional."
          }
        />
        <Row className="mb-3">
          <h4>Investment Opportunity General Details</h4>
        </Row>
        <Row className="mb-3">
          <Col className="mr-5">
            <Row>Property Status</Row>
            <Row>
              <Select className="w-100" options={PropStatusOptions} />
            </Row>
          </Col>
          <Col>
            <Row>Official Community Planning Zoning</Row>
            <Row>
              <Select className="w-100" options={zoningOptions} />
            </Row>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col className="mr-5">
            <Row>Land Use Zoning</Row>
            <Row>
              <Select className="w-100" options={zoningOptions} />
            </Row>
          </Col>

          <Col>
            <Row>OCP Zoning</Row>
            <Row>
              <Select className="w-100" options={zoningOptions} />
            </Row>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col className="mr-5">
            <Row>Preferred Development</Row>
            <Row>
              <Select
                isMulti
                closeMenuOnSelect={false}
                className="w-100"
                options={developmentOptions}
              />
            </Row>
          </Col>
          <Col> </Col>
        </Row>
      </Container>
      <ButtonRow
        prevRoute="/addOpportunity/siteDetails"
        onClick={goToNextPage}
      />
    </>
  );
}
