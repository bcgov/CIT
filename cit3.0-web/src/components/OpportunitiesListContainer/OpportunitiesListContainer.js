import PropTypes from "prop-types";
import { Row } from "react-bootstrap";
import OpportunityList from "../OpportunityList/OpportunityList";
import Paginator from "../Paginator/Paginator";
import OpportunityListItem from "../OpportunityListItem/OpportunityListItem";

export default function OpportunityListContainer({
  totalCount,
  opportunities,
  currentPage,
  setCurrentPage,
  pageSize,
  component: Component,
}) {
  return (
    opportunities && (
      <>
        <Row>
          <OpportunityList
            component={Component}
            opportunities={opportunities}
          />
        </Row>

        {totalCount ? (
          <Row className="d-flex flex-column align-items-center justify-content-center p-2">
            <Paginator
              count={totalCount}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              pageSize={pageSize}
            />
            <p>
              Showing {opportunities.length} of {totalCount} properties
            </p>
          </Row>
        ) : null}
      </>
    )
  );
}

OpportunityListContainer.defaultProps = {
  totalCount: 0,
  component: () => OpportunityListItem,
};

OpportunityListContainer.propTypes = {
  totalCount: PropTypes.number,
  opportunities: PropTypes.shape().isRequired,
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  pageSize: PropTypes.number.isRequired,
  component: PropTypes.func,
};
