import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import styles from "./DisclaimerCIT.css";

const DisclaimerCIT = () => (
  <div className={styles.DisclaimerCIT}>
    <Container>
      <Row className="disclaimer">
        <Col xs={1} className="col-blue">
          <div className="blue-block" />
        </Col>
        <Col xs={11} className="disclaimer-text">
          <h5>Disclaimer</h5>
          <p>
            The Community Information Tool and associated materials, including
            maps, reports, data, trade-marks and official marks (collectively,
            “Materials“), are owned or used under license by the Province of
            British Columbia (“Province”) and are protected by copyright and
            trade-mark laws. Unless otherwise expressly indicated, the Materials
            are provided to you for informational purposes only. You may use the
            data contained as permitted under the applicable license terms
            identified under the “Access and Use Constraints” section for each
            particular data set. You are solely responsible for ensuring that
            your use of the data complies with the applicable license terms. The
            Province is not responsible for any third party data or the content
            or reliability of any third party website. Links or references to
            third party websites do not imply endorsement of any kind by the
            Province.
          </p>
          <p>
            Your use of the Materials is entirely at your own risk. The
            Materials are provided to you “as is” without warranty of any kind,
            whether express or implied, including without limitation warranties
            regarding availability, accuracy, completeness or currency of data.
            The Province expressly disclaims all implied warranties, including
            without limitation implied warranties of merchantability, fitness
            for a particular purpose and non-infringement. The Province is not
            responsible for any errors or omissions in the Materials, and under
            no circumstances will the Province be liable to any person or entity
            for any direct, indirect, special, incidental, consequential or
            other loss, injury or damage based on any use of or otherwise
            arising in connection with the Materials, even if the Province has
            been specifically advised of the possibility of such loss, injury or
            damage. The Province reserves the right to alter or remove the
            Materials at any time, for any reason, without notice to you.
          </p>
        </Col>
      </Row>
    </Container>
  </div>
);

DisclaimerCIT.propTypes = {};

DisclaimerCIT.defaultProps = {};

export default DisclaimerCIT;
