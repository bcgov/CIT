import { useState } from "react";
import "./NumberRangeFilter.css";
import { Button } from "shared-components";
import { Modal, Row, Container } from "react-bootstrap";
import TextInput from "../FormComponents/TextInput";

export default function NumberRangeFilter() {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const updateMax = () => console.log("Update Max");
  const updateMin = () => console.log("Update Min");

  const maxValue = 50000;
  const minValue = 0;

  const minName = "number-range-min";
  const maxName = "number-range-max";

  return (
    <>
      <Button
        label="Parcel Size"
        styling="bcgov-normal-white filter-button unselected btn"
        onClick={handleShow}
      />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Parcel Size</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Size of Property (in square feet)</p>
          <p>slidebar goes here</p>
          <Container fluid>
            <Row className="d-flex justify-content-between">
              <div className="modal-text-input">
                <TextInput
                  aria-labelledby="water-max-cap-label"
                  handleChange={updateMax}
                  name={maxName}
                  rows={1}
                  value={maxValue}
                />
              </div>
              <div className="modal-text-input">
                <TextInput
                  aria-labelledby="water-max-cap-label"
                  handleChange={updateMin}
                  name={minName}
                  rows={1}
                  value={minValue}
                />
              </div>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <p>Footer!</p>
        </Modal.Footer>
      </Modal>
    </>
  );
}
