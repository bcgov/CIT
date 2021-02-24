import PropTypes from "prop-types";
import { Row, Pagination, Col } from "react-bootstrap";
import OpportunityListItem from "../OpportunityListItem/OpportunityListItem";
import Paginator from "../Paginator/Paginator";

export default function OpportunityList({
  opportunities,
  pageCount,
  handlePageClick,
}) {
  return (
    <>
      <h4>{opportunities.length} Properties match your search</h4>
      {opportunities &&
        opportunities.map((opp) => (
          <OpportunityListItem
            key={opp.id}
            id={opp.id}
            coords={opp.point}
            address={opp.address}
            public
          />
        ))}
      <Col>
        <Paginator count={3} previous={2} next={4} />
      </Col>
    </>
  );
}

OpportunityList.propTypes = {
  opportunities: PropTypes.arrayOf(PropTypes.shape).isRequired,
  pageCount: PropTypes.number.isRequired,
  handlePageClick: PropTypes.func.isRequired,
};
