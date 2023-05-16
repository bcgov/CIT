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
      <Container className="mb-3 mt-3 w-100">
        <Row className="mb-3 mt-3 w-100 bcgov-feedback-notice">
          <Col sm={12} className="svg-box">
            We are continuing to evolve the tool and would appreciate{" "}
            <a href="mailto:citinfo@gov.bc.ca">your feedback</a>.
          </Col>
        </Row>
      </Container>
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
                      label="View investment land opportunities&nbsp;&nbsp;&#128269;"
                    />
                    <br />
                    <div style={{ height: "40px !important" }}>&nbsp;</div>
                  </Row>
                </Col>
              </Container>
            </Col>
          </Row>
        </Container>
        {keycloak.obj.authenticated ? (
          <Container className="mb-5 mt-3 w-50 box bcgov-homepage-topic">
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
                        community. Promote industrial, commercial and
                        agricultural properties available for sale or lease in
                        your community and the tool will automatically add key
                        location information to support site selection
                        decisions.
                      </p>
                    </Row>
                    <Row className="d-flex justify-content-start w-100 bcgov-ciot-button">
                      <Button
                        onClick={() =>
                          history.push(`/investmentopportunities/dashboard`)
                        }
                        styling="home-buttons"
                        label="Add a land investment +"
                      />
                    </Row>
                  </Col>
                </Container>
              </Col>
            </Row>
          </Container>
        ) : null}
      </div>

      {/* <Container className="mb-5 mt-3 w-50 box">
        <Row className="mt-5 mb-3">
          <h1>How the Program Works</h1>
          <p className="dashboard-text">
            Community representatives can add up to five properties per
            community to be featured on the tool. To create a new listing,
            follow a simple process to add some key information about the
            property. The tool will automatically provide additional location
            information to help investors and site selectors quickly evaluate
            whether the site meets their specific needs. All listings will be
            reviewed prior to publication and will go live within 3-5 business
            days.
          </p>
          <ul className="dashed">
            <li>
              Before you add a listing, review the eligibility criteria to
              ensure the property meets the eligibility criteria.
            </li>
            <li>
              Properties must be zoned for industrial, commercial or
              agricultural use. Industrial properties of any size may be listed.
              Commercial and agricultural properties may be listed if they are
              at least 5 acres in size.
            </li>
            <li>Land must be available for sale or lease.</li>
            <li>
              Land may be publicly or privately owned but may only be listed
              with the written permission of the landowner.
            </li>
            <li>
              Land must be free of constraints that could impact the developable
              area or range of land uses permitted on the property.
              <br />
              Potential constraints could include but are not limited to:
              <ul className="dashed">
                <li>Restrictions on title</li>
                <li>Future planned roads or existing rights-of-way</li>
                <li>Identified flood zone</li>
                <li>
                  Presence of provincially significant cultural or natural
                  heritage features
                </li>
              </ul>
            </li>
            <li>
              Listings must be approved by either a municipality, regional
              district, electoral area, province, First Nation or a provincial
              economic development organization, and from the Chief
              Administrative Officer or their delegate.
            </li>
          </ul>
        </Row>
        <Row className="my-3 h-50 w-100">
          <Col sm={3}>
            <img
              src="/images/Add_Opportunity.svg"
              height="100%"
              width="100%"
              alt="how to add an opportunity"
            />
          </Col>
          <Col sm={9}>
            <Container className="h-50">
              <Col className="d-flex h-50 flex-column justify-content-around">
                <Row className="mb-2">
                  <h2>How to add a property:</h2>
                </Row>
                <Row>
                  <p>
                    Property listings can be added by an authorized
                    representative for each community - typically an economic
                    development officer or CAO. Listings must be approved by
                    either a municipality, regional district, electoral area,
                    province, First Nation or a regional economic development
                    organization, and from the Chief Administrative Officer or
                    their delegate.
                  </p>
                  <p>
                    To create a listing, authorized representatives will be
                    required to log-in with a <b>Business BCeID</b>. A one-time
                    verification process will confirm your status as an
                    authorized community representative when you create your
                    first listing. All listings will be reviewed prior to
                    publication and will go live within 3-5 business days.
                  </p>
                </Row>
              </Col>
            </Container>
          </Col>
        </Row>
        <Row>
          <Col>
            <DisclaimerCIOT />
          </Col>
        </Row>
      </Container> */}
    </>
  );
}
