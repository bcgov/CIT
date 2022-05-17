import * as React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";

const Disclaimer = () => {
  const backUrl = localStorage.getItem("currentAppHome");
  const userId = useSelector((state) => state.user.id);

  return (
    <Container data-testid="DisclaimerPage">
      <Row>
        <Col>
          <h2 className="my-4">Disclaimer</h2>
        </Col>
      </Row>
      <Row>
        <Col>
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
  );
};

export default Disclaimer;
