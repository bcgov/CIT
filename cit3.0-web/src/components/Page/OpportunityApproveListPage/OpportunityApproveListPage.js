import React, { useEffect, useState } from "react";
import axios from "axios";
import { Col, Container, Row } from "react-bootstrap";
import "./OpportunityApproveListPage.css";
import { useHistory } from "react-router-dom";
import querystring from "querystring";
import OpportunityListContainer from "../../OpportunitiesListContainer/OpportunitiesListContainer";
import Flyout from "../../Flyout/Flyout";
import OpportunityApprovalItem from "../../OpportunityApprovalItem/OpportunityApprovalItem";
import ApprovalFlyoutContent from "./ApprovalFlyoutContent";
import { GET_OPPORTUNITIES_LIST_URL } from "../../../store/constants/api-urls";
import OpportunityList from "../../OpportunityList/OpportunityList";
import Paginator from "../../Paginator/Paginator";

const OpportunityApproveListPage = () => {
  const [totalCount, setTotalCount] = useState(0);
  const [opportunities, setOpportunities] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");
  const pageSize = 10;
  const history = useHistory();
  let search = querystring.decode(window.location.search.split("?")[1]);

  useEffect(
    () =>
      axios
        .get(
          `${GET_OPPORTUNITIES_LIST_URL}?${
            query ? `${query}&` : ""
          }page=${currentPage}&page_size=${pageSize}`
        )
        .then((data) => {
          setOpportunities(data.data.results);
          setTotalCount(data.data.count);
        })
        .catch(() => {
          setOpportunities([]);
          setTotalCount(0);
        }),
    [currentPage, query]
  );

  useEffect(() => {
    setQuery(window.location.search.split("?")[1]);
    search = querystring.decode(query);
  }, []);

  return (
    <div data-testid="OpportunityApproveListPage">
      <Flyout
        flyoutComponent={ApprovalFlyoutContent}
        flyoutProps={{
          title: "Filter Opportunities",
          search,
          onQuery: (key, value) => {
            search = querystring.decode(query);
            if (value !== "") {
              search[key] = value;
            } else {
              delete search[key];
            }
            setQuery(querystring.encode(search));
            history.push({ search: query });
          },
          resetFilters: () => {
            setQuery("");
            search = querystring.decode(query);
            history.push({ search: query });
          },
        }}
      >
        <Container className="opportunity-list-wrap">
          <Row>
            <h3 className="">Opportunities</h3>
          </Row>
          <Row>
            <Col sm={3} md={3} lg={3}>
              &nbsp;
            </Col>
            <Col>
              <b>Address</b>
            </Col>
            <Col>
              <b>Date added</b>
            </Col>
            <Col>
              <b>Status</b>
            </Col>
            <Col>
              <b>Action(s)</b>
            </Col>
          </Row>
          {totalCount ? (
            <>
              <Row>
                {opportunities.length ? (
                  <OpportunityList
                    component={() => OpportunityApprovalItem}
                    opportunities={opportunities}
                  />
                ) : null}
              </Row>
              <Row className="d-flex flex-column align-items-center justify-content-center p-2">
                <Paginator
                  count={totalCount}
                  setCurrentPage={setCurrentPage}
                  currentPage={currentPage}
                  pageSize={pageSize}
                />
                <p>
                  Showing {opportunities.length} of {totalCount} properties
                </p>
              </Row>
            </>
          ) : (
            <Row>
              <h3 className="dashboard-header my-4 w-100">No results</h3>
              <div>
                <p className="dashboard-text">
                  There are no opportunities that match your search.
                </p>
              </div>
            </Row>
          )}
        </Container>
      </Flyout>
    </div>
  );
};

OpportunityApproveListPage.propTypes = {};

OpportunityApproveListPage.defaultProps = {};

export default OpportunityApproveListPage;
