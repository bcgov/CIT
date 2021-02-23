import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState, useEffect } from "react";
import Map from "../Map/Map";
import OpportunityFactory from "../../store/factory/OpportunityFactory";
import "./OpportunityTable.css";

export default function OpportunityTable(props) {
  const [tableData, setTableData] = useState(null);
  const tableContent = [];
  const opportunities = props.tableData;

  const determineTextColour = (approvalStatus) => {
    if (approvalStatus === "PEND") {
      return <div className="status-text-orange">Pending Review</div>;
    }
    if (approvalStatus === "PUBL") {
      return <div className="status-text-green">Published</div>;
    }
    if (approvalStatus === "EDIT") {
      return <div className="status-text-red">Needs to be edited</div>;
    }
    if (approvalStatus === "NCOM") {
      return <div className="status-text-red">Not completed</div>;
    }
    return approvalStatus;
  };

  const determineActions = (opportunity) => {
    if (opportunity.approvalStatus === "PUBL") {
      return (
        <>
          <a href={opportunity.link}>View Listing</a>
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
        <a href={opportunity.link}>View Listing</a>
        <br />
        <a href="/">Edit Listing</a>
        <br />
        <a href="/">Delete</a>
      </>
    );
  };

  const formatDate = (ISODate) => {
    const dateString = ISODate.substring(0, 10);
    return dateString;
  };

  useEffect(() => {
    if (opportunities) {
      for (let i = 0; i < opportunities.length; i += 1) {
        const opportunity = OpportunityFactory.createFromResponse(
          opportunities[i]
        );
        const tableRow = (
          <div key={i} className="opportunity-table-row">
            <Row>
              <Col>
                <div className="opportunity-table-map-container">
                  <Map coords={opportunity.coords} isInteractive={false} />
                </div>
              </Col>
              <Col>{opportunity.address}</Col>
              <Col>{formatDate(opportunity.dateCreated)}</Col>
              <Col>{determineTextColour(opportunity.approvalStatus)}</Col>
              <Col>{determineActions(opportunity)}</Col>
            </Row>
          </div>
        );
        tableContent.push(tableRow);
      }
      setTableData(tableContent);
    }
  }, []);

  const table = (
    <div className="opportunity-table">
      <Container fluid>
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
        {tableData}
      </Container>
    </div>
  );

  return table;
}
