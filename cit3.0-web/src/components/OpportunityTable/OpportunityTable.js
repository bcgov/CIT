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
