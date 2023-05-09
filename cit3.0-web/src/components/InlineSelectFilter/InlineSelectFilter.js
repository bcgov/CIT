import { useState } from "react";
import PropTypes from "prop-types";
import { Button } from "shared-components";
import { Row, Container } from "react-bootstrap";
import "./InlineSelectFilter.scss";

export default function InlineSelectFilter(props) {
  const {
    label,
    filters,
    setFilters,
    isSelected,
    setIsSelected,
    setQueryFilters,
  } = props;

  const [show, setShow] = useState(false);
  const [filtersOnOpen, setFiltersOnOpen] = useState([{}]);

  const divStyle = {
    display: "inline",
    backgroundColor: "#f5f5f5",
    // border: "1px solid #888",
    width: "auto !important",
    height: "auto !important",
    overflow: "auto",
    position: "relative",
    zIndex: "1",
    left: "10%",
    top: "10%",
  };

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

  const [displaySelected, setDisplaySelected] = useState(createLabel());

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
      <Button
        label="&#x2714;"
        styling="bcgov-normal-blue btn bcgov-filter-apply"
        onClick={handleSave}
      />
      <Button
        label="&#x2716;"
        styling="bcgov-normal-white mr-auto btn bcgov-filter-clear"
        onClick={handleClear}
      />
      <Container fluid>
        <Row className="d-flex">{mapFiltersToButtons()}</Row>
      </Container>
    </>
  );
}

InlineSelectFilter.propTypes = {
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
