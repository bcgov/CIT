import { Container, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "./HomePage.scss";
import { Button } from "shared-components";

export default function HomePage() {
  const history = useHistory();
  return (
    <>
      <div className="w-100 header-div">
        <img
          height="350" // keep this height
          width="100%"
          src="/images/invest-450h.png"
          alt="Beautiful British Columbia"
        />
        <div className="header-text">
          <div className="d-flex flex-column align-items-end">
            <h1 className="main-header-text">
              Community Investment Opportunities
            </h1>
            <h2 className="sub-header-text">
              Your Portal to access some of the best Investments in British
              Columbia
            </h2>
          </div>
        </div>
      </div>
      <Container>
        <Row className="mb-5 mt-3 w-100 box">
          <Col sm={3} className="svg-box">
            <img
              style={{ padding: "3%" }}
              src="/images/BC_FindOpp.svg"
              height="100%"
              width="100%"
              alt="find-opportunities"
            />
          </Col>
          <Col sm={9}>
            <Container className="h-100">
              <Col className="d-flex h-100 flex-column justify-content-around">
                <Row>
                  <h2>Find investment opportunities in British Columbia</h2>
                </Row>
                <Row>
                  <p>
                    Find properties that meet your site selection criteria for
                    your next investment into B.C. Search for industrial,
                    commercial, and agricultural properties by size, site
                    servicing, labour force, and more.
                  </p>
                </Row>
                <Row className="d-flex justify-content-end w-100">
                  <Button
                    onClick={() =>
                      history.push(`/investmentopportunities/search`)
                    }
                    styling="home-buttons"
                    label="Search Properties"
                  />
                </Row>
              </Col>
            </Container>
          </Col>
        </Row>
        <Row className="my-3 w-100 box">
          <Col sm={8}>
            <Container className="h-100">
              <Col className="py-2 d-flex h-100 flex-column justify-content-around">
                <Row>
                  <h2>Promote investment lands in your community</h2>
                </Row>
                <Row>
                  <p>
                    Help investors find the next big opportunity in your
                    community. Promote industrial, commercial and agricultural
                    properties available for sale or lease in your community and
                    the tool will automatically add key location information to
                    support site selection decisions.
                  </p>
                </Row>
                <Row className="d-flex justify-content-start w-100">
                  <Button
                    onClick={() =>
                      history.push(`/investmentopportunities/dashboard`)
                    }
                    styling="home-buttons"
                    label="List Properties"
                  />
                </Row>
              </Col>
            </Container>
          </Col>
          <Col sm={4} className="svg-box">
            <img
              className="add-opp-img"
              src="/images/Add_OpportunityComm.svg"
              height="100%"
              width="100%"
              alt="find-opportunities"
            />
          </Col>
        </Row>
        <Row className="my-5">
          <h1>How the Program Works</h1>
          <p>
            Communities in B.C. can showcase up to five industrial, commercial
            or agricultural properties available for sale or lease. The tool
            will automatically provide additional location information to help
            investors and site selectors quickly identify sites that meet their
            specific needs, such as nearby infrastructure and labour force. The
            tool will be marketed to national and international audiences and
            increase the possibilities for attracting investment to your
            community.
          </p>
          <p>
            Communities in B.C. can add up to five property listings that meet
            the following criteria:
            <ul className="dashed">
              <li>
                Properties must be zoned for industrial, commercial or
                agricultural use. Industrial properties of any size may be
                listed. Commercial and agricultural properties may be listed if
                they are at least 5 acres in size.
              </li>
              <li>Land must be available for sale or lease.</li>
              <li>
                Land may be publicly or privately owned but may only be listed
                with the written permission of the landowner.
              </li>
              <li>
                Land must be free of constraints that could impact the
                developable area or range of land uses permitted on the
                property.
              </li>
              <p style={{ padding: "0px", marginBottom: "0px" }}>
                Potential constraints could include but are not limited to:
              </p>
              <ul className="dashed">
                <li>Restrictions on title</li>
                <li>Future planned roads or existing rights-of-way</li>
                <li>Identified flood zone</li>
                <li>
                  Presence of provincially significant cultural or natural
                  heritage features
                </li>
              </ul>
            </ul>
            <p>
              Listings must be approved by either a municipality, regional
              district, electoral area, province, First Nation or a provincial
              economic development organization, and from the Chief
              Administrative Officer or their delegate.
            </p>
          </p>
        </Row>
        <Row className="my-3 h-100 w-100">
          <Col sm={3}>
            <img
              src="/images/Add_Opportunity.svg"
              height="100%"
              width="100%"
              alt="how to add an opportunity"
            />
          </Col>
          <Col sm={9}>
            <Container className="h-100">
              <Col className="d-flex h-100 flex-column justify-content-around">
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
                    required to log-in with a BCeID. A one-time verification
                    process will confirm your status as an authorized community
                    representative community representative when you create your
                    first listing. All listings will be reviewed prior to
                    publication and will go live within 3-5 business days.
                  </p>
                </Row>
              </Col>
            </Container>
          </Col>
        </Row>
        <Row className="disclaimer">
          <Col xs={1} className="col-blue">
            <div className="blue-block" />
          </Col>
          <Col xs={11} className="disclaimer-text">
            <h5>Disclaimer</h5>
            <p>
              Property listings on this site include information provided by
              authorized community representatives and obtained from open data
              sources. The Province of British Columbia has not verified the
              information and prospective purchasers, lessors, and others should
              conduct their own usual due diligence and make such enquiries as
              they deem necessary before purchasing, leasing or otherwise
              investing in the subject site. Prospective purchasers, lessors and
              others interested in the subject site should check existing laws
              and regulations to confirm that this particular property is
              suitable for their intended purpose or use and what permits,
              approvals and consultations, including with Indigenous
              communities, are required in order to develop such property, as
              well as any costs associated with such development. Listings are
              for information purposes only and are not intended to provide
              investment advice. Reliance upon any information shall be at the
              user&apos;s sole risk. All information should be verified
              independently before being used or relied upon. The Province of
              British Columbia does not guarantee the quality, accuracy,
              completeness or timeliness of this information and assumes no
              obligation to update this information or advise on further
              developments. The Province of British Columbia disclaims any
              liability for unauthorized use or reproduction of any information
              contained in this document and is not responsible for any direct,
              indirect, special or consequential damages or any other damages
              caused, arising out of or in connection with use of this
              information. The Province of British Columbia is not acting as a
              real estate broker or agent for any party in connection with any
              of the properties described on this website.
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
}
