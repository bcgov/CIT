import { useState } from "react";
import PropTypes from "prop-types";
import { Button } from "shared-components";
import { Modal, Row, Container } from "react-bootstrap";

export default function SelectFilter(props) {
  const {
    label,
    filters,
    setFilters,
    isSelected,
    setIsSelected,
    setQueryFilters,
  } = props;

  const [show, setShow] = useState(false);
  const [displaySelected, setDisplaySelected] = useState({});
  const [filtersOnOpen, setFiltersOnOpen] = useState([{}]);

  const handleShow = () => {
    setShow(true);
    setFiltersOnOpen([...filters]);
  };
  const handleClose = () => {
    setFilters(filtersOnOpen);
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

  const createFilterString = (currentFilters) => {
    const allSelectedFilters = currentFilters.filter(
      (filter) => filter.isSelected === true
    );

    const allSelectedFilterLabels = allSelectedFilters.map(
      (filter) => filter.code
    );

    return allSelectedFilterLabels.toString();
  };

  const isModified = () => {
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
    setQueryFilters(createFilterString(filters));
    setShow(false);
  };
  const handleClear = () => {
    const clearedFilters = filters.map((filter) => ({
      ...filter,
      isSelected: false,
    }));

    setFilters(clearedFilters);

    setIsSelected(false);
    setQueryFilters(createFilterString(clearedFilters));
    setShow(false);
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
        <Modal.Header closeButton>
          <Modal.Title>{label}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container fluid>
            <Row className="d-flex">{mapFiltersToButtons()}</Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button
            label="Remove filter"
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
  isSelected: PropTypes.bool.isRequired,
  setIsSelected: PropTypes.func.isRequired,
  setQueryFilters: PropTypes.func.isRequired,
};
