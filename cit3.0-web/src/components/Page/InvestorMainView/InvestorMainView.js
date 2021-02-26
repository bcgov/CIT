import { Row, Col, Container } from "react-bootstrap";
import PortalHeader from "../../Headers/PortalHeader/PortalHeader";
import OpportunityListContainer from "../../OpportunitiesListContainer/OpportunitiesListContainer";
import OpportunityMapContainer from "../../OpportunityMap/OpportunityMapContainer";
import Flyout from "../../Flyout/Flyout";

export default function InvestorMainView() {
  return (
    <div className="w-100">
      <PortalHeader title="Investor Portal" text="Description" />
      <Flyout>
        <Container>
          <Row>
            <Col>
              <OpportunityMapContainer />
            </Col>
          </Row>
          <Row>
            <Col>
              <OpportunityListContainer />
            </Col>
          </Row>
        </Container>
      </Flyout>
    </div>
  );
}
