import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./OpportunityTable.css";
import OpportunityListItem from "../OpportunityListItem/OpportunityListItem";

export default function OpportunityTable(props) {
  const opportunities = props.tableData;

  const table = (
    <div className="opportunity-table w-100">
      <Container fluid>
        {!props.public && (
          <Row>
            <Col>
              <b>Point</b>
            </Col>
            <Col>
              <b>Details</b>
            </Col>
            <Col>
              <b>Date added</b>
            </Col>
            <Col>
              <b>Status</b>
            </Col>
            <Col>
              <b>Actions</b>
            </Col>
          </Row>
        )}
        {opportunities &&
          opportunities.map((opp, i) => (
            <OpportunityListItem
              id={i}
              coords={opp.point}
              address={opp.address}
              date_created={opp.date_created}
              approval_status={opp.approval_status}
            />
          ))}
      </Container>
    </div>
  );

  return table;
}
