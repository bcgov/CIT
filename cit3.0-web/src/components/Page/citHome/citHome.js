import "./citHome.css";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "../HomePage/HomePage.scss";
import { Button as SharedButton } from "shared-components";
import { BsSearch } from "react-icons/bs";
import { useEffect, useState } from "react";
import axios from "axios";
import { Typeahead } from "react-bootstrap-typeahead";
import { useKeycloakWrapper } from "../../../hooks/useKeycloakWrapper";
import useConfiguration from "../../../hooks/useConfiguration";

export default function citHome() {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [places, setPlaces] = useState(null);
  const [communities, setCommunities] = useState(null);
  const [regional, setRegional] = useState(null);
  const history = useHistory();
  const keycloak = useKeycloakWrapper();
  const [loggedIn] = useState(keycloak.obj.authenticated);
  const configuration = useConfiguration();
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const publicUrl = "/community-insights/public/";
  const privateUrl = "/community-insights/private/";

  useEffect(() => {
    axios.get("/api/opportunity/options").then((data) => {
      const commNames = data.data.communities.map((comm) => comm.place_name);
      setCommunities(commNames);
      const regNames = data.data.regionalDistricts.map((dist) => dist.name);
      setRegional(regNames);
      setPlaces([...commNames, ...regNames]);
    });
  }, []);
  const typeOfSelected = (place) => {
    if (communities.find((c) => c === place)) {
      return "community";
    }
    if (regional.find((r) => r === place)) {
      return "regionalDistrict";
    }
    return null;
  };

  useEffect(() => {
    let type;
    if (selectedPlace) {
      type = typeOfSelected(selectedPlace);
    }
    if (selectedPlace && loggedIn) {
      history.push(`${privateUrl}${type}=${selectedPlace}`);
    } else if (selectedPlace && !loggedIn) {
      handleShow();
    }
  }, [selectedPlace]);

  const handleExploreClick = () => {
    if (loggedIn) {
      history.push(privateUrl);
    } else {
      handleShow();
    }
  };

  const handlePublic = () => {
    if (selectedPlace) {
      const type = typeOfSelected(selectedPlace);
      history.push(`${publicUrl}${type}=${selectedPlace}`);
    } else {
      history.push(publicUrl);
    }
  };

  const handleLogin = () => {
    // login and redirect to private report
    if (selectedPlace) {
      const type = typeOfSelected(selectedPlace);
      keycloak.obj.login({
        redirectUri: encodeURI(
          `${configuration.baseUrl}${privateUrl}${type}=${selectedPlace}`
        ),
      });
    } else {
      keycloak.obj.login({
        redirectUri: encodeURI(`${configuration.baseUrl}${privateUrl}`),
      });
    }
  };

  return (
    <>
      <Container className="py-5 px-2">
        <Row>
          <Col sm={9}>
            <h1 className="main-header-text py-2">
              Welcome to the Community <br />
              Information Tool
            </h1>
            <h2>
              Explore B.C. communities and analyze data from a community lens.
            </h2>
            <p className="py-4">
              The Community Information Tool offers insight into communities
              across B.C. with integrated socioeconomic data, infrastructure,
              and community assets data. The Tool supports community, regional,
              and province-wide planning which is essential to building
              thriving, healthy communities.
            </p>
          </Col>
          <Col sm={3} className="svg-box pt-3">
            <img
              className="add-opp-img"
              src="/images/CIT_logo.svg"
              height="100%"
              width="100%"
              alt="cit logo mountains"
            />
          </Col>
        </Row>
        <Row>
          <Col className="box mr-3 cit-box">
            <Row>
              <Col>
                <h3>View my community or region</h3>
                <p className="my-2">
                  Community and regional profiles include socioeconomic data,
                  infrastructure and community assets to provide a sense of what
                  a community is like – and how it is changing.{" "}
                </p>
                <>
                  {places ? (
                    <div className="w-100 mt-4 comm-search-div">
                      <Typeahead
                        id="search-by-community"
                        size="large"
                        onChange={(selected) => setSelectedPlace(selected[0])}
                        options={places}
                      />
                      <Button
                        className="search-glass-box"
                        variant="outline-secondary"
                      >
                        <BsSearch />
                      </Button>
                    </div>
                  ) : null}
                </>
              </Col>
            </Row>
            <Row className="pb-0 d-flex justify-content-end">
              <Col sm={3} className="svg-box pt-3">
                <img
                  className="add-opp-img"
                  src="/images/house_CITHOME.svg"
                  height="100%"
                  width="100%"
                  alt="cit home community search box"
                />
              </Col>
            </Row>
          </Col>
          <Col className="box ml-3 cit-box explore-box corner">
            <Row>
              <Col>
                <h3>Discover insights and patterns among B.C. communities</h3>
                <p className="my-2">
                  Find all communities in B.C. with particular characteristics –
                  whether you’re interested in economic health, access to
                  education and health care, connectivity, infrastructure, or
                  emergency management.
                </p>
              </Col>
            </Row>
            <Row>
              <Col className="mt-2 d-flex justify-content-end">
                <SharedButton
                  onClick={handleExploreClick}
                  styling="home-buttons explore-button"
                  label="Explore B.C. Communities"
                />
              </Col>
            </Row>
            <Row className="mb-0 pr-0 mt-3 d-flex justify-content-end">
              <Col sm={6} className="p-0 mb-0 svg-box">
                <img
                  className="add-opp-img"
                  src="/images/HouseMountain.svg"
                  height="100%"
                  width="100%"
                  alt="cit home community search box"
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>
            Would you like to log in or continue as public?
          </Modal.Title>
        </Modal.Header>
        {/* <Modal.Body>{body}</Modal.Body> */}
        <Modal.Footer>
          <SharedButton
            label="Continue as Public"
            styling="bcgov-normal-white mr-auto modal-reset-button btn"
            onClick={handlePublic}
          />
          <SharedButton
            label="Login"
            styling="bcgov-normal-blue modal-save-button btn"
            onClick={handleLogin}
          />
        </Modal.Footer>
      </Modal>
    </>
  );
}
