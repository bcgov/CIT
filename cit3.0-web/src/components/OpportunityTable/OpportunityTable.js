import Container from "react-bootstrap/Container";
import { v4 } from "uuid";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./OpportunityTable.scss";
import OpportunityListItem from "../OpportunityListItem/OpportunityListItem";
import OpportunityFactory from "../../store/factory/OpportunityFactory";

export default function OpportunityTable(props) {
  const opportunities = props.tableData;

  const table = (
    <div className="opportunity-table w-100">
      <Container fluid>
        {/* {!props.public && (
          <Row>
            <Col className="hide-point">
              <h2>Point</h2>
            </Col>
            <Col className="details">
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
        )} */}
        {opportunities &&
          opportunities.map((oppData) => {
            const opportunity = OpportunityFactory.createStateFromResponse(
              oppData
            );
            return (
              <OpportunityListItem
                key={v4()}
                opportunity={opportunity}
                handleModalOpen={props.handleModalOpen}
                publicView={false}
              />
            );
          })}
      </Container>
    </div>
  );

  return table;
}
