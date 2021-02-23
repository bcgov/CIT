/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Map from "../Map/Map";

export default function OpportunityListItem(props) {
  const latLongFromPoint = (point) => {
    const splitText = point.split(/[\s()]+/);
    return [parseFloat(splitText[2]), parseFloat(splitText[1])];
  };

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

  const determineActions = (approvalStatus) => {
    if (approvalStatus === "PUBL") {
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

  const formatDate = (ISODate) => {
    const dateString = ISODate.substring(0, 10);
    return dateString;
  };

  return (
    <div key={props.id} className="opportunity-table-row w-100">
      <Row>
        <Col>
          <div
            style={{ borderRight: "2px solid #606060" }}
            className="opportunity-table-map-container"
          >
            <Map
              coords={latLongFromPoint(props.coords)}
              isInteractive={false}
            />
          </div>
        </Col>
        <Col>{props.address}</Col>
        {!props.public ? (
          <>
            <Col>{formatDate(props.date_created)}</Col>
            <Col>{determineTextColour(props.approval_status)}</Col>
            <Col>{determineActions(props.approval_status)}</Col>
          </>
        ) : (
          <Col className="d-flex align-items-end justify-content-end mr-1">
            {props.public && (
              <Link to={`/investment/${props.id}`}>View property details</Link>
            )}
          </Col>
        )}
      </Row>
    </div>
  );
}
