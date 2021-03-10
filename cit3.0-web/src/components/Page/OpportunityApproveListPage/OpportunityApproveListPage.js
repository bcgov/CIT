import React, { useState } from "react";
import axios from "axios";
import { Col, Container, Row } from "react-bootstrap";
import "./OpportunityApproveListPage.css";
import { useHistory } from "react-router-dom";
import querystring from "querystring";
import PortalHeader from "../../Headers/PortalHeader/PortalHeader";
import OpportunityListContainer from "../../OpportunitiesListContainer/OpportunitiesListContainer";
import Flyout from "../../Flyout/Flyout";
import OpportunityApprovalItem from "../../OpportunityApprovalItem/OpportunityApprovalItem";
import ApprovalFlyoutContent from "./ApprovalFlyoutContent";
import { GET_OPPOTUNITIES_LIST_URL } from "../../../store/constants/api-urls";

const OpportunityApproveListPage = () => {
  const [totalCount, setTotalCount] = useState(0);
  axios.get(GET_OPPOTUNITIES_LIST_URL).then((data) => {
    setTotalCount(data.data.count);
  });

  const history = useHistory();
  let query = window.location.search.split("?")[1];
  let search = querystring.decode(query);

  return (
    <div data-testid="OpportunityApproveListPage">
      <PortalHeader
        title="Manage Opportunities"
        text="Approve, Close, or return opportunities for edits"
      />
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
            query = querystring.encode(search);
            history.push({ search: query });
          },
          resetFiliters: () => {
            query = "";
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
            <OpportunityListContainer
              query={query}
              totalCount={totalCount}
              component={() => OpportunityApprovalItem}
            />
          ) : (
            <>
              <h1 className="dashboard-header">
                Community Promoted Opportunities
              </h1>
              <p className="dashboard-text">
                There are no opportunities that match your search.
              </p>
            </>
          )}
        </Container>
      </Flyout>
    </div>
  );
};

OpportunityApproveListPage.propTypes = {};

OpportunityApproveListPage.defaultProps = {};

export default OpportunityApproveListPage;
