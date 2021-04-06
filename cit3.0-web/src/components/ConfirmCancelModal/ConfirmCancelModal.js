import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";
import { Button } from "shared-components";
import "./ConfirmCancelModal.scss";

const ConfirmCancelModal = ({
  show,
  handleClose,
  handleSubmit,
  body,
  label,
}) => (
  <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
    <Modal.Header>
      <Modal.Title>{label}</Modal.Title>
    </Modal.Header>
    <Modal.Body>{body}</Modal.Body>
    <Modal.Footer>
      <Button
        label="Cancel"
        styling="bcgov-normal-white mr-auto modal-reset-button btn"
        onClick={handleClose}
      />
      <Button
        label="Confirm"
        styling="bcgov-normal-blue modal-save-button btn"
        onClick={handleSubmit}
      />
    </Modal.Footer>
  </Modal>
);

ConfirmCancelModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  body: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

ConfirmCancelModal.defaultProps = {};

export default ConfirmCancelModal;
