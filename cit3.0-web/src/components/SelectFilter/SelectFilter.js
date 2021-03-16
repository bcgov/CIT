import { useState } from "react";
import PropTypes from "prop-types";
import { Button } from "shared-components";
import { Modal, Row, Container } from "react-bootstrap";

export default function SelectFilter(props) {
  const { label, filters, setFilters } = props;

  const [isSelected, setIsSelected] = useState(false);
  const [show, setShow] = useState(false);
  const [displaySelected, setDisplaySelected] = useState({});

  const handleShow = () => setShow(true);
  const handleClose = () => {
    setIsSelected(true);
    setShow(false);
  };

  const createLabel = () => {
    const allSelectedFilters = filters.filter(
      (filter) => filter.isSelected === true
    );

    const allSelectedFilterLabels = allSelectedFilters.map(
      (filter) => filter.label
    );

    return allSelectedFilterLabels.join(", ");
  };

  const isModified = () => {
    console.log(filters);
    for (let i = 0; i < filters.length; i++) {
      if (filters[i].isSelected === true) {
        return true;
      }
    }

    return false;
  };

  const handleSave = () => {
    if (isModified()) {
      setIsSelected(true);
      setDisplaySelected(createLabel());
    } else {
      setIsSelected(false);
    }
    setShow(false);
  };
  const handleClear = () => {
    const clearedFilters = filters.map((filter) => ({
      label: filter.label,
      isSelected: false,
    }));

    setFilters(clearedFilters);
  };

  const toggleFilter = (filterLabel) => {
    const currentFilters = [...filters];
    const clickedFilter = currentFilters.find(
      (filter) => filter.label === filterLabel
    );
    const clickedFilterIndex = currentFilters.indexOf(clickedFilter);
    const clickedFilterClone = { ...clickedFilter };
    clickedFilterClone.isSelected = !clickedFilterClone.isSelected;
    currentFilters[clickedFilterIndex] = clickedFilterClone;
    setFilters(currentFilters);
  };

  const mapFiltersToButtons = () =>
    filters.map((filter) => {
      if (filter.isSelected) {
        return (
          <Button
            key={filter.label}
            label={filter.label}
            styling="bcgov-normal-blue filter-button selected btn"
            onClick={() => toggleFilter(filter.label)}
          />
        );
      }
      return (
        <Button
          key={filter.label}
          label={filter.label}
          styling="bcgov-normal-white filter-button unselected btn"
          onClick={() => toggleFilter(filter.label)}
        />
      );
    });

  return (
    <>
      {!isSelected ? (
        <Button
          label={label}
          styling="bcgov-normal-white filter-button unselected btn"
          onClick={handleShow}
        />
      ) : (
        <Button
          label={`${label}: ${displaySelected}`}
          styling="bcgov-normal-blue filter-button selected btn"
          onClick={handleShow}
        />
      )}

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>{label}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container fluid>
            <Row className="d-flex">{mapFiltersToButtons()}</Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button
            label="Clear"
            styling="bcgov-normal-white mr-auto modal-reset-button btn"
            onClick={handleClear}
          />
          <Button
            label="Save"
            styling="bcgov-normal-blue modal-save-button btn"
            onClick={handleSave}
          />
        </Modal.Footer>
      </Modal>
    </>
  );
}

SelectFilter.propTypes = {
  label: PropTypes.string.isRequired,
  filters: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      isSelected: PropTypes.bool.isRequired,
    }).isRequired
  ).isRequired,
  setFilters: PropTypes.func.isRequired,
};
