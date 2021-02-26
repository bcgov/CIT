import { Row, Col, Container } from "react-bootstrap";
import { useState } from "react";
import PortalHeader from "../../Headers/PortalHeader/PortalHeader";
import OpportunityListContainer from "../../OpportunitiesListContainer/OpportunitiesListContainer";
import OpportunityMapContainer from "../../OpportunityDisplayMap/OpportunityMapContainer";
import Flyout from "../../Flyout/Flyout";

export default function InvestorMainView() {
  const [totalCount, setTotalCount] = useState(null);
  return (
    <div className="w-100">
      <PortalHeader title="Investor Portal" text="Description" />
      <Flyout>
        <Container>
          <Row>
            <Col>
              <OpportunityMapContainer setTotalCount={setTotalCount} />
            </Col>
          </Row>
          <Row>
            <Col>
              <OpportunityListContainer totalCount={totalCount} />
            </Col>
          </Row>
        </Container>
      </Flyout>
    </div>
  );
}
