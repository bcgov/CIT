import { Container, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "./HomePage.scss";
import { Button } from "shared-components";
import { useKeycloakWrapper } from "../../../hooks/useKeycloakWrapper";
import Roles from "../../../constants/roles";

export default function HomePage() {
  const keycloak = useKeycloakWrapper();
  const history = useHistory();
  return (
    <>
      <div className="w-100 header-div bcgov-homepage-header">
        <img
          height="333px" // keep this height
          width="600px"
          src="/images/CIOT_homepage-banner.png"
          alt="Beautiful British Columbia"
        />
      </div>
      <div className="header-text bcgov-homepage-header-text">
        <div className="d-flex flex-column align-items-end">
          <h1 className="main-header-text bcgov-homepage-header-text">
            Community Investment Opportunities
          </h1>
          <h2 className="sub-header-text bcgov-homepage-sub-header-text">
            Connecting investors with opportunities in communities across
            British Columbia
          </h2>
        </div>
      </div>
      <div className="bcgov-ciot-homepage-topics">
        <Container className="mb-2 mt-3 w-50 box bcgov-homepage-topic">
          <Row className="mb-1 mt-3 w-100 box">
            <Col className="svg-box">
              <img
                src="/images/find_investment_land_icon.svg"
                height="50%"
                width="50%"
                alt="find-opportunities"
              />
            </Col>
          </Row>
          <Row className="mb-1 mt-3 w-100 box bcgov-homepage-row">
            <Col>
              <Container className="h-50">
                <Col className="d-flex flex-column justify-content-around bcgov-homepage-text">
                  <Row>
                    <h2>Find investment opportunities in British Columbia</h2>
                  </Row>
                  <Row>
                    <p>
                      Find properties that meet your site selection criteria for
                      your next investment into B.C. Search for industrial,
                      commercial, and agricultural properties by size, site
                      servicing, and more.
                    </p>
                  </Row>
                  <Row className="d-flex justify-content-centered w-100 bcgov-ciot-button">
                    <Button
                      onClick={() =>
                        history.push(`/investmentopportunities/search`)
                      }
                      styling="home-buttons"
                      label={
                        <>
                          <span>
                            View Investments and Opportunities&nbsp;&nbsp;
                          </span>
                          <img
                            src="/images/searchIcon.svg"
                            className="bcgov-ciot-button-icon"
                            width="20"
                            height="20"
                            alt="Search"
                            styling="padding-top: -10px;"
                          />
                        </>
                      }
                    />
                    <br />
                    <div style={{ height: "40px !important" }}>&nbsp;</div>
                  </Row>
                </Col>
              </Container>
            </Col>
          </Row>
        </Container>
        <Container className="mb-2 mt-3 w-50 box bcgov-homepage-topic">
          <Row className="mb-2 mt-3 w-100 box">
            <Col className="svg-box">
              <img
                src="/images/promote_investment_land_icon.svg"
                height="50%"
                width="50%"
                alt="find-opportunities"
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Container className="h-50">
                <Col className="py-2 d-flex flex-column justify-content-centered bcgov-homepage-text">
                  <Row>
                    <h2>Promote investment lands in your community</h2>
                  </Row>
                  <Row>
                    <p>
                      Help investors find the next big opportunity in your
                      community. Promote industrial, commercial and agricultural
                      properties available for sale or lease in your community
                      and the tool will automatically add key location
                      information to support site selection decisions.
                    </p>
                  </Row>
                  <Row className="d-flex justify-content-start w-100 bcgov-ciot-button">
                    <Button
                      onClick={() =>
                        history.push(`/investmentopportunities/dashboard`)
                      }
                      styling="home-buttons"
                      label={
                        <>
                          <span>Add a land investment&nbsp;&nbsp;</span>
                          <img
                            src="/images/plus.svg"
                            width="20"
                            height="20"
                            alt="Add"
                            className="bcgov-ciot-button-icon"
                          />
                        </>
                      }
                    />
                  </Row>
                </Col>
              </Container>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="bcgov-ciot-help-panel bcgov-ciot-button">
        <Container className="bcgov-ciot-hompage-desc">
          <h2>How does the program work?</h2>
          <ul>
            <li>
              Investment properities are regulary being adding to the site
            </li>
            <li>
              Properties will be zoned for industrial, commercial or
              agricultural use
            </li>
            <li>Industrial properties of all sizes are listed</li>
            <li>
              Commercial &amp; agricultural properties are listed if they are
              over 5 acres in size
            </li>
            <li>Land is for either lease or sale</li>
            <li>All properties are free from constraint</li>
          </ul>
        </Container>
        <Container className="bcgov-ciot-hompage-login">
          <h2>Listing Administrators</h2>
          <Button
            onClick={() => history.push(`/investmentopportunities/dashboard`)}
            styling="home-buttons bcgov-ciot-button"
            label="Login here to add your new listings"
          />
        </Container>
      </div>
    </>
  );
}
