import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Row } from "react-bootstrap";
import axios from "axios";
import OpportunityList from "../OpportunityList/OpportunityList";
import Paginator from "../Paginator/Paginator";

export default function OpportunityListContainer({ totalCount }) {
  const [opportunities, setOpportunities] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(4);
  //   const [pageSize, setPageSize] = useState(4);
  useEffect(() => {
    axios
      .get(`/api/opportunity/list?page=${currentPage}&page_size=${pageSize}`)
      .then((data) => {
        setOpportunities(data.data.results);
      })
      .catch(() => {
        setOpportunities(null);
      });
  }, [currentPage]);
  return (
    opportunities && (
      <>
        <Row>
          <OpportunityList opportunities={opportunities} />
        </Row>

        {totalCount ? (
          <Row className="d-flex flex-column align-items-center justify-content-center p-2">
            <Paginator
              count={totalCount}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              pageSize={4}
            />
            <p>
              Showing {pageSize} of {totalCount} properties
            </p>
          </Row>
        ) : null}
      </>
    )
  );
}

OpportunityListContainer.defaultProps = {
  totalCount: 0,
};

OpportunityListContainer.propTypes = {
  totalCount: PropTypes.number,
};
