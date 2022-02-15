import * as React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./AccessDenied.css";

const AccessDenied = () => {
  const backUrl = localStorage.getItem("currentAppHome");
  const userId = useSelector((state) => state.user.id);

  return (
    <Container data-testid="AccessDeniedPage">
      <Row>
        <Col className="mt-5">
          <h2 className="my-4">
            Thank you for interest in the Community Information Tool, for IDIR
            access please{" "}
            <a
              href={`mailto:citinfo@gov.bc.ca?subject="CIT Permission Request"`}
            >
              contact us
            </a>
            .
          </h2>
          <ul style={{ lineHeight: "2rem" }} className="my-4">
            <li>
              If you have requested permissions recently, refresh the page to
              get the new role.
            </li>
            <li>
              If this message is shown in error{" "}
              <a
                href={`mailto:citinfo@gov.bc.ca?subject="CIT Permission Request"`}
              >
                contact us
              </a>{" "}
              for assistance.
            </li>
          </ul>
          <hr className="hr-bold my-2" />
          <div className="d-flex justify-content-between">
            <Link to={backUrl}>Return to Homepage</Link>
            <Link to="/login/">{!userId ? "Login to continue" : ""}</Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AccessDenied;
