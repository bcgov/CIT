import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Row } from "react-bootstrap";
import axios from "axios";
import OpportunityList from "../OpportunityList/OpportunityList";
import Paginator from "../Paginator/Paginator";
import OpportunityListItem from "../OpportunityListItem/OpportunityListItem";

export default function OpportunityListContainer({
  totalCount,
  component: Component,
  query,
}) {
  const [opportunities, setOpportunities] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  // eslint-disable-next-line
  const [pageSize, setPageSize] = useState(4);
  useEffect(() => {
    axios
      .get(
        `/api/opportunity/list/?${
          query ? `${query}&` : ""
        }page=${currentPage}&page_size=${pageSize}`
      )
      .then((data) => {
        setOpportunities(data.data.results);
      })
      .catch(() => {
        setOpportunities(null);
      });
  }, [currentPage, query]);
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
  query: "",
};

OpportunityListContainer.propTypes = {
  totalCount: PropTypes.number,
  component: PropTypes.func,
  query: PropTypes.string,
};
