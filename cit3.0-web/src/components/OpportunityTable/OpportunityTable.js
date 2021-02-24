import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./OpportunityTable.css";
import OpportunityListItem from "../OpportunityListItem/OpportunityListItem";
import OpportunityFactory from "../../store/factory/OpportunityFactory";

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
          opportunities.map((oppData) => {
            const opportunity = OpportunityFactory.createFromResponse(oppData);
            return <OpportunityListItem opportunity={opportunity} />;
          })}
      </Container>
    </div>
  );

  return table;
}
