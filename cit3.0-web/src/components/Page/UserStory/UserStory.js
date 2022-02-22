import { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "../HomePage/HomePage.scss";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { getOptions, setOptions } from "../../../store/actions/options";
import { useKeycloakWrapper } from "../../../hooks/useKeycloakWrapper";

import styles from "./UserStory.css";

const options1 = [
  {
    value: 1,
    label: "a BC Government Employee",
  },
  {
    value: 2,
    label: "an Investor",
  },
  {
    value: 3,
    label: "a Representative for my community",
  },
  {
    value: 4,
    label: "a Researcher",
  },
  {
    value: 5,
    label: "a Member of the Public",
  },
];

const options2 = [
  {
    value: 1,
    label: "viewing Investment Opportunities matching my criteria",
  },
  {
    value: 2,
    label: "learning more about the province or a specific area of BC",
  },
  {
    value: 3,
    label: "discovering insights and patterns among BC communities",
  },
  {
    value: 4,
    label: "comparing  an area",
  },
];

const options3 = [
  {
    value: 1,
    label: "All of British Columbia",
  },
  {
    value: 2,
    label: "Communities & Unincorporated areas",
  },
  {
    value: 3,
    label: "First Nations",
  },
  {
    value: 4,
    label: "Regional Districts",
  },
  {
    value: 5,
    label: "Economic Regions",
  },
  {
    value: 6,
    label: "Tourism Regions",
  },
  {
    value: 7,
    label: "Wildfire Zones ",
  },
  {
    value: 8,
    label: "Tsunami Notification Zones",
  },
  {
    value: 9,
    label: "Natural Resource Regions",
  },
];

let loading = false;

export default function UserStory() {
  const selectInputRef = useRef();
  const [isOption1Visible, setIsOption1Visible] = useState(true);
  const [isOption2Visible, setIsOption2Visible] = useState(false);
  const [isOption3Visible, setIsOption3Visible] = useState(false);
  const [isOption4Visible, setIsOption4Visible] = useState(false);
  const [isOption5Visible, setIsOption5Visible] = useState(false);
  const [searchFilter, setSearchFilter] = useState("");
  const [areaType, setAreaType] = useState("");
  const [areaTypeValue, setAreaTypeValue] = useState("");
  const [options4, setOptions4] = useState("");

  const [community, setCommunity] = useState("");
  const [regionalDistrict, setRegionalDistrict] = useState("");

  // set communities and regional districts to be able to find the type of place
  const [communities, setCommunities] = useState(null);
  const [regionals, setRegionals] = useState(null);

  const history = useHistory();
  const dispatch = useDispatch();

  const openPowerBI = () => {
    const path = `cit-dashboard/public/${encodeURIComponent(
      searchFilter.toLowerCase()
    )}`;
    history.push(path);
  };

  const regionalDistricts = useSelector(
    (state) => state.options.regionalDistricts
  );

  const statuses = useSelector((state) => state.options.statuses);
  if (!loading && (!statuses.length || !regionalDistricts.length)) {
    loading = true;
    getOptions().then((response) => {
      dispatch(setOptions(response.data));
      loading = false;
    });
  }

  const keycloak = useKeycloakWrapper();
  const [loggedInWithIdir] = useState(keycloak.idp === "idir");

  const selectStyle = {
    container: (base) => ({
      ...base,
      flex: 1,
    }),
    menu: (base) => ({
      ...base,
    }),
    singleValue: (base) => ({
      ...base,
      color: "#376fa3",
      fontWeight: "bold",
      fontSize: "1.2em",
    }),
    control: (base, state) => ({
      ...base,
      color: state.isSelected ? "red" : "blue",
      borderTop: "none",
      borderLeft: "none",
      borderRight: "none",
      borderBottom: "3px solid #376fa3",
      borderRadius: "0",
      boxShadow: "none",
    }),
    indicatorSeparator: (base) => ({
      ...base,
      display: "none",
    }),
    dropdownIndicator: (base) => ({
      ...base,
      color: "#3288d9",
      height: "36px",
      width: "36px",
    }),
    placeholder: (base) => ({
      ...base,
      text: "xxx",
    }),
  };

  const handleOption1Change = (e) => {
    if (e.label === "an Investor") {
      setIsOption2Visible(true);
    } else {
      setIsOption2Visible(false);
      setIsOption3Visible(false);
      setIsOption4Visible(false);
      setIsOption5Visible(false);
    }
  };

  const handleOption2Change = (e) => {
    if (
      e.label === "learning more about the province or a specific area of BC"
    ) {
      setIsOption3Visible(true);
    } else {
      setIsOption3Visible(false);
      setIsOption4Visible(false);
      setIsOption5Visible(false);
    }
  };

  const handleOption3Change = (e) => {
    setAreaType(e.label);
    setIsOption4Visible(false);
    setIsOption5Visible(false);
    switch (e.label) {
      case "Regional Districts":
        setOptions4(regionals);
        setIsOption4Visible(true);
        break;
      case "Communities & Unincorporated areas":
        console.log("Communities & Unincorporated areas", communities);
        setOptions4(communities);
        setIsOption4Visible(true);
        break;
      default:
        setAreaType("---");
    }
  };

  const handleOption4Change = (e) => {
    console.log(e.value);
    setIsOption5Visible(true);
    setSearchFilter(e.label);
  };

  useEffect(() => {
    axios.get("/api/opportunity/options").then((data) => {
      const commNames = data.data.communities.map((x) => ({
        value: x.id,
        label: x.place_name,
      }));

      setCommunities(commNames);

      const regNames = data.data.regionalDistricts.map((x) => ({
        value: x.id,
        label: x.name,
      }));

      setRegionals(regNames);
    });
  }, []);

  return (
    <>
      <div className={styles.UserStory}>
        <Container>
          <Row>
            <Col sm={12}>
              <h3 className="my-4">
                Hi, welcome to our Community Information Tool. We have lots of
                information available (expand on this??). Tell us a bit more
                about you and we will help you get to info that is relevant to
                you
              </h3>
            </Col>
          </Row>
          {isOption1Visible && (
            <Row className="row flex-nowrap">
              <Col sm={12} className="inline-row">
                <span className="user-story-label">I am</span>
                <Select
                  placeholder=""
                  options={options1}
                  styles={selectStyle}
                  onChange={handleOption1Change}
                />
              </Col>
            </Row>
          )}
          {isOption2Visible && (
            <Row>
              <Col sm={12} className="inline-row">
                <span className="user-story-label">and I am interested in</span>
                <Select
                  placeholder=""
                  options={options2}
                  styles={selectStyle}
                  onChange={handleOption2Change}
                />
              </Col>
            </Row>
          )}
          {isOption3Visible && (
            <>
              <Row>
                <Col sm={12} className="inline-row">
                  <span className="user-story-label">
                    Great! You can choose between different types of areas from
                    Communities and Unincorporated Areas, First Nations land and
                    Reserves, Regional District to larger Economic Regions or
                    Tourism Regions.
                  </span>
                </Col>
              </Row>
              <Row>
                <Col sm={12} className="inline-row">
                  <span className="user-story-label">
                    What kind of area would you like to look at?
                  </span>
                </Col>
              </Row>
              <Row>
                <Col sm={12} className="inline-row">
                  <span className="user-story-label">
                    I would like to look at
                  </span>
                  <Select
                    placeholder=""
                    options={options3}
                    styles={selectStyle}
                    onChange={handleOption3Change}
                  />
                </Col>
              </Row>
            </>
          )}
          {isOption4Visible && (
            <Row>
              <Col sm={12} className="inline-row">
                <span className="user-story-label">
                  Which {areaType} specifically?
                </span>
                <Select
                  placeholder="Select "
                  options={options4}
                  styles={selectStyle}
                  onChange={handleOption4Change}
                />
              </Col>
            </Row>
          )}
          {isOption5Visible && (
            <>
              <Row>
                <Col sm={12} className="inline-row">
                  <span className="user-story-label">
                    Ok, let’s learn more about{" "}
                    <span className="searchFilter">{searchFilter}</span>
                  </span>
                </Col>
              </Row>
              <Row>
                <Col sm={12} className="inline-row">
                  <div className="app flex-row align-items-center">
                    <Button
                      color="primary"
                      className="m-4"
                      onClick={openPowerBI}
                    >
                      GO
                    </Button>
                  </div>
                </Col>
              </Row>
            </>
          )}
        </Container>
      </div>
    </>
  );
}
