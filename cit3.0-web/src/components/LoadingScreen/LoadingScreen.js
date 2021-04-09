import { Container, Spinner, Col } from "react-bootstrap";
import "./LoadingScreen.css";

export default function LoadingScreen() {
  return (
    <Container className="spinner-container d-flex flex-column justify-content-center align-items-center">
      <Col className="d-flex flex-column justify-content-center align-items-center">
        <h1>Loading location data for your opportunity...</h1>
        <Spinner className="my-4 bc-spinner" animation="border" role="status" />
        <h2>Please wait as this may take several moments</h2>
      </Col>
    </Container>
  );
}
