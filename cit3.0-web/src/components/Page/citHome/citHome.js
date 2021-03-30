import "./citHome.css";
import {
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
  Button,
} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "../HomePage/HomePage.scss";
import { Button as SharedButton } from "shared-components";
import { BsSearch } from "react-icons/bs";

export default function citHome() {
  const history = useHistory();
  return (
    <Container className="py-5 px-2">
      <Row>
        <Col sm={9}>
          <h1 className="main-header-text py-2">
            Welcome to the Community <br />
            Information Tool
          </h1>
          <h2>
            Explore B.C. communities and analyze data from a community lens.
          </h2>
          <p className="py-4">
            The Community Information Tool offers insight into communities
            across B.C. with integrated socioeconomic data, infrastructure, and
            community assets data. The Tool supports community, regional, and
            province-wide planning which is essential to building thriving,
            healthy communities.
          </p>
        </Col>
        <Col sm={3} className="svg-box pt-3">
          <img
            className="add-opp-img"
            src="/images/CIT_logo.svg"
            height="100%"
            width="100%"
            alt="cit logo mountains"
          />
        </Col>
      </Row>
      <Row>
        <Col className="box mr-3 cit-box">
          <Row>
            <Col>
              <h3>View my community or region</h3>
              <p className="my-2">
                Community and regional profiles include socioeconomic data,
                infrastructure and community assets to provide a sense of what a
                community is like – and how it is changing.{" "}
              </p>
              <InputGroup className="my-3">
                <FormControl
                  placeholder=""
                  aria-label="community search box"
                  aria-describedby="basic-addon1"
                  className="input-border"
                />
                <InputGroup.Append>
                  <Button className="no-outline" variant="outline-secondary">
                    <BsSearch />
                  </Button>
                </InputGroup.Append>
              </InputGroup>
            </Col>
          </Row>
          <Row className="pb-0 d-flex justify-content-end">
            <Col sm={3} className="svg-box pt-3">
              <img
                className="add-opp-img"
                src="/images/house_CITHOME.svg"
                height="100%"
                width="100%"
                alt="cit home community search box"
              />
            </Col>
          </Row>
        </Col>
        <Col className="box ml-3 cit-box explore-box corner">
          <Row>
            <Col>
              <h3>Discover insights and patterns among B.C. communities</h3>
              <p className="my-2">
                Find all communities in B.C. with particular characteristics –
                whether you’re interested in economic health, access to
                education and health care, connectivity, infrastructure, or
                emergency management.
              </p>
            </Col>
          </Row>
          <Row>
            <Col className="mt-2 d-flex justify-content-end">
              <SharedButton
                onClick={() => history.push(`/communityInsights`)}
                styling="home-buttons explore-button"
                label="Explore B.C. Communities"
              />
            </Col>
          </Row>
          <Row className="mb-0 pr-0 mt-3 d-flex justify-content-end">
            <Col sm={6} className="p-0 mb-0 svg-box">
              <img
                className="add-opp-img"
                src="/images/HouseMountain.svg"
                height="100%"
                width="100%"
                alt="cit home community search box"
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
