import { Row, Col, Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import OpportunityListContainer from "../../OpportunitiesListContainer/OpportunitiesListContainer";
import OpportunityMapContainer from "../../OpportunityDisplayMap/OpportunityMapContainer/OpportunityMapContainer";
import Flyout from "../../Flyout/Flyout";
import SearchFlyoutContent from "../../SearchFlyoutContent/SearchFlyoutContent";
import { GET_OPPORTUNITIES_LIST_URL } from "../../../store/constants/api-urls";

export default function InvestorMainView() {
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [opportunities, setOpportunities] = useState(null);
  const [paginatedOpportunities, setPaginatedOpportunities] = useState(null);
  const [pageSize] = useState(4);
  const [query, setQuery] = useState("");

  useEffect(() => {
    setCurrentPage(1);
    axios
      .get(`${GET_OPPORTUNITIES_LIST_URL}?${query ? `${query}&` : ""}`)
      .then((data) => {
        setOpportunities(data.data.results);
        setTotalCount(data.data.count);
      })
      .catch(() => {
        setOpportunities(null);
      });
  }, [query]);

  useEffect(() => {
    axios
      .get(
        `${GET_OPPORTUNITIES_LIST_URL}?${
          query ? `${query}&` : ""
        }page=${currentPage}&page_size=${pageSize}`
      )
      .then((data) => {
        setPaginatedOpportunities(data.data.results);
      })
      .catch(() => {
        setPaginatedOpportunities(null);
      });
  }, [currentPage, query]);

  return (
    <div className="w-100">
      <Flyout flyoutComponent={SearchFlyoutContent} flyoutProps={{ setQuery }}>
        <Container>
          <Row>
            <Col>
              <OpportunityMapContainer
                totalCount={totalCount}
                opportunities={opportunities}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <OpportunityListContainer
                totalCount={totalCount}
                opportunities={paginatedOpportunities}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                pageSize={pageSize}
              />
            </Col>
          </Row>
        </Container>
      </Flyout>
    </div>
  );
}
