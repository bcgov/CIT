import PropTypes from "prop-types";
import { Button } from "shared-components";
import { Row, Container } from "react-bootstrap";
import "./InlineSelectFilter.scss";

export default function InlineSelectFilter(props) {
  const { filters, setFilters } = props;

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
    <Container fluid>
      <Row className="d-flex">{mapFiltersToButtons()}</Row>
    </Container>
  );
}

InlineSelectFilter.propTypes = {
  filters: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      isSelected: PropTypes.bool.isRequired,
    }).isRequired
  ).isRequired,
  setFilters: PropTypes.func.isRequired,
};
