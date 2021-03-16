import { Row, Col, Container } from "react-bootstrap";
import { useState } from "react";
import OpportunityListContainer from "../../OpportunitiesListContainer/OpportunitiesListContainer";
import OpportunityMapContainer from "../../OpportunityDisplayMap/OpportunityMapContainer/OpportunityMapContainer";
import Flyout from "../../Flyout/Flyout";
import SearchFlyoutContent from "../../SearchFlyoutContent/SearchFlyoutContent";

export default function InvestorMainView() {
  const [totalCount, setTotalCount] = useState(0);
  return (
    <div className="w-100">
      <Flyout flyoutComponent={SearchFlyoutContent} flyoutProps={{}}>
        <Container>
          <Row>
            <Col>
              <OpportunityMapContainer
                totalCount={totalCount}
                setTotalCount={setTotalCount}
              />
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
