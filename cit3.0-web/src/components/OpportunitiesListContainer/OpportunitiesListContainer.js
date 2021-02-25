import { useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import axios from "axios";
import PropTypes from "prop-types";
import OpportunityList from "../OpportunityList/OpportunityList";
import Paginator from "../Paginator/Paginator";

export default function OpportunityListContainer({ opps }) {
  const [opportunities, setOpportunities] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(null);
  const [pageSize, setPageSize] = useState(4);
  useEffect(() => {
    axios
      .get(
        `/api/pipeline/opportunities?page=${currentPage}&page_size=${pageSize}`
      )
      .then((data) => {
        console.log(data.data.results);
        setOpportunities(data.data.results);
        setCount(data.data.count);
      })
      .catch((err) => {
        console.log(err);
        setOpportunities([]);
      });
  }, [currentPage]);
  return (
    <Col>
      <Row>
        {opportunities && (
          <h4>{opportunities.length} Properties match your search</h4>
        )}
        <OpportunityList opportunities={opportunities} />
      </Row>

      <Row className="d-flex flex-column align-items-center justify-content-center p-2">
        <Paginator
          count={count}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          pageSize={4}
        />
        <p>
          Showing {pageSize} of {count} properties
        </p>
      </Row>
    </Col>
  );
}

OpportunityListContainer.propTypes = {
  opps: PropTypes.arrayOf(PropTypes.shape).isRequired,
};
