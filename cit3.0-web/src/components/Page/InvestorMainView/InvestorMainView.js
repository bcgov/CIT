import { Row, Col, Container } from "react-bootstrap";
import { useState } from "react";
import PortalHeader from "../../Headers/PortalHeader/PortalHeader";
import OpportunityListContainer from "../../OpportunitiesListContainer/OpportunitiesListContainer";
import OpportunityMapContainer from "../../OpportunityDisplayMap/OpportunityMapContainer/OpportunityMapContainer";
import Flyout from "../../Flyout/Flyout";
import DummyFlyoutContent from "./DummyFlyoutContent";

export default function InvestorMainView() {
  const [totalCount, setTotalCount] = useState(0);
  return (
    <div className="w-100">
      <PortalHeader title="Investor Portal" text="Description" />
      <Flyout
        flyoutComponent={DummyFlyoutContent}
        flyoutProps={{
          title: "Filters",
          text: "General Details",
          onClick: () => {
            // eslint-disable-next-line
            console.log("asd");
          },
        }}
      >
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
