import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState, useEffect } from "react";

export default function OpportunityTable(props) {
  const [tableData, setTableData] = useState(null);
  const tableContent = [];
  const opportunities = props.tableData;

  console.log(props);

  useEffect(() => {
    if (opportunities) {
      for (let i = 0; i < opportunities.length; i += 1) {
        const tableRow = (
          <Row key={i}>
            <Col>{opportunities[i].point}</Col>
            <Col>{opportunities[i].address}</Col>
            <Col>Awaiting Review</Col>
            <Col>View opportunity</Col>
          </Row>
        );
        tableContent.push(tableRow);
      }
      setTableData(tableContent);
    }
  }, []);

  const table = (
    <Container fluid>
      <Row>
        <Col>
          <b>Point</b>
        </Col>
        <Col>
          <b>Details</b>
        </Col>
        <Col>
          <b>Status</b>
        </Col>
        <Col>
          <b>Actions</b>
        </Col>
      </Row>
      {tableData}
    </Container>
  );

  return table;
}
