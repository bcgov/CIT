import React, { useEffect, useState } from "react";
import axios from "axios";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import "./OpportunityApproveListPage.css";
import { useHistory } from "react-router-dom";
import querystring from "querystring";
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
  const [isLoaded, setIsLoaded] = useState(false);
  const pageSize = 10;
  const history = useHistory();
  let search = querystring.decode(window.location.search.split("?")[1]);

  // For returning to the correct page when cancelling a delete
  window.sessionStorage.setItem("back_url", window.location.pathname);

  const { CancelToken } = axios;
  let source;

  useEffect(() => {
    if (source) {
      source.cancel("newer search");
    }
    source = CancelToken.source();
    setIsLoaded(false);
    axios
      .get(
        `${GET_OPPORTUNITIES_LIST_URL}?${
          query ? `${query}&` : ""
        }page=${currentPage}&page_size=${pageSize}`,
        {
          cancelToken: source.token,
        }
      )
      .then((data) => {
        if (data.data.results.length) {
          setIsLoaded(true);
          setOpportunities(data.data.results);
          setTotalCount(data.data.count);
        } else {
          setIsLoaded(true);
          setOpportunities([]);
          setTotalCount(0);
        }
      })
      .catch((thrown) => {
        if (!axios.isCancel(thrown)) {
          setOpportunities([]);
          setTotalCount(0);
        }
      });
    return () => {
      source.cancel("Cancelling in cleanup");
    };
  }, [currentPage, query]);

  useEffect(() => {
    setQuery(window.location.search.split("?")[1]);
    search = querystring.decode(query);
  }, []);

  return (
    <div
      data-testid="OpportunityApproveListPage"
      className="OpportunityApproveListPage"
    >
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
            setCurrentPage(1);
            history.push({ search: querystring.encode(search) });
          },
          resetFilters: () => {
            setQuery("");
            search = querystring.decode(query);
            history.push({ search: "" });
          },
        }}
      >
        <Container className="opportunity-list-wrap">
          {!isLoaded ? (
            <>
              <div className="center-spinner">
                <Spinner animation="border" />
              </div>
            </>
          ) : (
            <>
              <Row>
                {opportunities && opportunities.length ? (
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
                  Showing {opportunities ? opportunities.length : 0} of{" "}
                  {totalCount} properties
                </p>
              </Row>
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
