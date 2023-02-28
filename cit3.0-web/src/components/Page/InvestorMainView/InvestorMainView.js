import { Row, Col, Container, Spinner } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import querystring from "querystring";
import axios from "axios";
import OpportunityListContainer from "../../OpportunitiesListContainer/OpportunitiesListContainer";
import OpportunityMapContainer from "../../OpportunityDisplayMap/OpportunityMapContainer/OpportunityMapContainer";
import Flyout from "../../Flyout/Flyout";
import SearchFlyoutContent from "../../SearchFlyoutContent/SearchFlyoutContent";
import { GET_OPPORTUNITIES_LIST_URL } from "../../../store/constants/api-urls";
import FooterLinks from "../../FooterLinks/FooterLinks";

export default function InvestorMainView() {
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [opportunities, setOpportunities] = useState(null);
  const [paginatedOpportunities, setPaginatedOpportunities] = useState(null);
  const [isLoadedMap, setIsLoadedMap] = useState(false);
  const [
    isLoadedOpportunityListPage,
    setIsLoadedOpportunityListPage,
  ] = useState(false);
  const pageSize = 10;
  const [query, setQuery] = useState("");
  const history = useHistory();
  let search = querystring.decode(window.location.search.split("?")[1]);

  // For returning to the correct page
  window.sessionStorage.setItem("back_url", window.location.pathname);

  useEffect(() => {
    const latestQuery = window.location.search.split("?")[1];
    setQuery(latestQuery);
    search = querystring.decode(querystring.encode(latestQuery));
  }, []);
  const { CancelToken } = axios;
  let sourceSearch;
  let sourceSearchPagination;

  useEffect(() => {
    if (sourceSearch) {
      sourceSearch.cancel("newer search");
    }
    sourceSearch = CancelToken.source();
    search = querystring.decode(query);
    search.approval_status_id = "PUBL";
    const latestQuery = querystring.encode(search);
    setIsLoadedMap(false);
    if (latestQuery.length > 0) {
      setCurrentPage(1);
      axios
        .get(
          `${GET_OPPORTUNITIES_LIST_URL}?${
            latestQuery ? `${latestQuery}` : ""
          }`,
          {
            cancelToken: sourceSearch.token,
          }
        )
        .then((data) => {
          setOpportunities(data.data.results);
          setTotalCount(data.data.count);
          setIsLoadedMap(true);
        })
        .catch(() => {
          setOpportunities(null);
        });
    }
    return () => {
      sourceSearch.cancel("Cancelling in cleanup");
    };
  }, [query]);

  useEffect(() => {
    if (sourceSearchPagination) {
      sourceSearchPagination.cancel("newer search");
    }
    sourceSearchPagination = CancelToken.source();

    search = querystring.decode(query);
    search.approval_status_id = "PUBL";
    search.page_size = pageSize;
    search.page = currentPage;
    const latestQuery = querystring.encode(search);
    setIsLoadedOpportunityListPage(false);
    if (latestQuery.length > 0) {
      axios
        .get(
          `${GET_OPPORTUNITIES_LIST_URL}?${
            latestQuery ? `${latestQuery}` : ""
          }`,
          {
            cancelToken: sourceSearchPagination.token,
          }
        )
        .then((data) => {
          setPaginatedOpportunities(data.data.results);
          setIsLoadedOpportunityListPage(true);
        })
        .catch(() => {
          setPaginatedOpportunities(null);
        });
    }
    return () => {
      sourceSearchPagination.cancel("Cancelling in cleanup");
    };
  }, [currentPage, query]);

  return (
    <div className="w-100">
      <Flyout
        flyoutComponent={SearchFlyoutContent}
        flyoutProps={{
          search,
          onQuery: (keyValues) => {
            search = querystring.decode(query);
            Object.entries(keyValues).forEach((keyValue) => {
              const [key, value] = keyValue;
              if (value !== "") {
                search[key] = value;
              } else {
                delete search[key];
              }
            });
            setQuery(querystring.encode(search));
            history.push({ search: querystring.encode(search) });
          },
          resetFilters: () => {
            setQuery("");
            search = querystring.decode(query);
            history.push({ search: "" });
          },
        }}
      >
        {!isLoadedMap || !isLoadedOpportunityListPage ? (
          <>
            <div className="center-spinner">
              <Spinner animation="border" />
            </div>
          </>
        ) : (
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
        )}
      </Flyout>
      <FooterLinks type="search-page" />
    </div>
  );
}
