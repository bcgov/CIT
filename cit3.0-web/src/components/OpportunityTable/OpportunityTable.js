import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState, useEffect } from "react";
import Map from "../Map/Map";
import "./OpportunityTable.css";

export default function OpportunityTable(props) {
  const [tableData, setTableData] = useState(null);
  const tableContent = [];
  const opportunities = props.tableData;

  const latLongFromPoint = (point) => {
    const splitText = point.split(/[\s()]+/);

    return [parseFloat(splitText[1]), parseFloat(splitText[2])];
  };

  const determineTextColour = (approvalStatus) => {
    if (approvalStatus === "Pending Review") {
      return <div className="status-text-orange">{approvalStatus}</div>;
    }
    if (approvalStatus === "Published") {
      return <div className="status-text-green">{approvalStatus}</div>;
    }
    if (approvalStatus === "Needs to be edited") {
      return <div className="status-text-red">{approvalStatus}</div>;
    }
    if (approvalStatus === "Not completed") {
      return <div className="status-text-red">{approvalStatus}</div>;
    }
    return approvalStatus;
  };

  const determineActions = (approvalStatus) => {
    if (approvalStatus === "Published") {
      return (
        <>
          <a href="/">View Listing</a>
          <br />
          <a href="/">Mark as &quot;sold&quot;</a>
          <br />
          <a href="/">Edit Listing</a>
          <br />
          <a href="/">Delete</a>
        </>
      );
    }
    return (
      <>
        <a href="/">View Listing</a>
        <br />
        <a href="/">Edit Listing</a>
        <br />
        <a href="/">Delete</a>
      </>
    );
  };

  useEffect(() => {
    if (opportunities) {
      for (let i = 0; i < opportunities.length; i += 1) {
        const tableRow = (
          <div key={i} className="opportunity-table-row">
            <Row>
              <Col>
                <div className="opportunity-table-map-container">
                  <Map
                    coords={latLongFromPoint(opportunities[i].point)}
                    isInteractive={false}
                  />
                </div>
              </Col>
              <Col>{opportunities[i].address}</Col>
              <Col>{determineTextColour(opportunities[i].approval_status)}</Col>
              <Col>{determineActions(opportunities[i].approval_status)}</Col>
            </Row>
          </div>
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
