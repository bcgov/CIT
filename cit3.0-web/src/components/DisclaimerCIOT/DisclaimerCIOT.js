import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import styles from "./DisclaimerCIOT.css";

const DisclaimerCIOT = () => (
  <div className={styles.DisclaimerCIOT}>
    <Container className="ml-0 mr-0">
      <Row className="disclaimer">
        <Col xs={1} className="col-blue">
          <div className="blue-block" />
        </Col>
        <Col xs={11} className="disclaimer-text">
          <h5>Disclaimer</h5>
          <p>
            Property listings on this site include information provided by
            authorized community representatives and obtained from
            <span>
              {" "}
              <Link to="/datasources">open data sources.</Link>
            </span>{" "}
            . The Province of British Columbia has not verified the information
            and prospective purchasers, lessors, and others should conduct their
            own usual due diligence and make such enquiries as they deem
            necessary before purchasing, leasing or otherwise investing in the
            subject site. Prospective purchasers, lessors and others interested
            in the subject site should check existing laws and regulations to
            confirm that this particular property is suitable for their intended
            purpose or use and what permits, approvals and consultations,
            including with Indigenous communities, are required in order to
            develop such property, as well as any costs associated with such
            development. Listings are for information purposes only and are not
            intended to provide investment advice. Reliance upon any information
            shall be at the user&apos;s sole risk. All information should be
            verified independently before being used or relied upon. The
            Province of British Columbia does not guarantee the quality,
            accuracy, completeness or timeliness of this information and assumes
            no obligation to update this information or advise on further
            developments. The Province of British Columbia disclaims any
            liability for unauthorized use or reproduction of any information
            contained in this document and is not responsible for any direct,
            indirect, special or consequential damages or any other damages
            caused, arising out of or in connection with use of this
            information. The Province of British Columbia is not acting as a
            real estate broker or agent for any party in connection with any of
            the properties described on this website.
          </p>
        </Col>
      </Row>
    </Container>
  </div>
);

DisclaimerCIOT.propTypes = {};

DisclaimerCIOT.defaultProps = {};

export default DisclaimerCIOT;
