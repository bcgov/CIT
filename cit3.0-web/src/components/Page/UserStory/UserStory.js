import { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "../HomePage/HomePage.scss";
import Select from "react-select";
import ReactHtmlParser from "react-html-parser";

import { useDispatch, useSelector } from "react-redux";
import { getOptions, setOptions } from "../../../store/actions/options";
import { useKeycloakWrapper } from "../../../hooks/useKeycloakWrapper";
import { userStoryOptions1 } from "../../../data/userStoryOptions1.json";
import { userStoryOptions2 } from "../../../data/userStoryOptions2.json";
import { userStoryOptions3 } from "../../../data/userStoryOptions3.json";

import styles from "./UserStory.css";

let loading = false;

export default function UserStory() {
  const [isOption2Visible, setIsOption2Visible] = useState(false);
  const [isOption3Visible, setIsOption3Visible] = useState(false);
  const [isOption4Visible, setIsOption4Visible] = useState(false);
  const [isOption5Visible, setIsOption5Visible] = useState(false);

  const [isSmallerPage, setIsSmallerPage] = useState(false);
  const [isComparing, setIsComparing] = useState(false);
  const [isViewing, setIsViewing] = useState(false);
  const [isDiscovering, setIsDiscovering] = useState(false);
  const [isPromoting, setIsPromoting] = useState(false);
  const [isLearning, setIsLearning] = useState(false);

  const [options2, setOptions2] = useState([]);
  const [redirectURL, setRedirectURL] = useState("");
  const [searchFilter, setSearchFilter] = useState("");
  const [option3Text1, setOption3Text1] = useState("");
  const [option3Text2, setOption3Text2] = useState("");
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

  const redirectPage = () => {
    const path = `cit-dashboard/public/${encodeURIComponent(
      searchFilter.toLowerCase()
    )}`;
    history.push(path);
  };

  const redirectComparePage = () => {
    const path = "cit-dashboard/public/compare-area";
    history.push(path);
  };

  const redirectCriteriaSearchPage = () => {
    const path = "cit-dashboard/public/criteria-search";
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
      flex: 0,
      paddingRight: 8,
    }),
    option: (base, state) => ({
      ...base,
      border: "solid white 1px",
      color: "#ffffff",
      backgroundColor: state.isSelected ? "#003366" : "#003366",
    }),
    menu: (base, state) => ({
      ...base,
      width: 400,
      border: "solid white 2px",
    }),
    menuList: (base, state) => ({
      ...base,
      border: "solid white 2px",
    }),

    singleValue: (base) => ({
      ...base,
      color: "#3288D9",
      fontSize: "1.1em",
    }),
    control: (base, state) => ({
      ...base,
      borderTop: "none",
      borderLeft: "none",
      borderRight: "none",
      borderBottom: "3px solid #376fa3",
      borderRadius: "0",
      boxShadow: "none",
      width: 400,
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
      text: "",
    }),
  };

  const handleLogin = () => {
    keycloak.login();
    // if (keycloak && !keycloak.authenticated) {
    //   keycloak.login;
    // }
  };

  const handleOption1Change = (e) => {
    // if (e.isLoginRequired) handleLogin();
    const options2temp = [];
    e.userStoryOptions2.forEach((elem) => {
      options2temp.push(userStoryOptions2.find((x) => x.id === elem.id));
    });
    setOptions2(options2temp);
    setIsOption2Visible(true);
    setIsOption3Visible(false);
    setIsOption4Visible(false);
    setIsOption5Visible(false);
  };

  const handleOption2Change = (e) => {
    setIsComparing(e.code === "COMPARING");
    setIsDiscovering(e.code === "DISCOVERING");
    setIsViewing(e.code === "VIEWING");
    setIsPromoting(e.code === "PROMOTING");
    setIsLearning(e.code === "LEARNING");
    if (e.code === "COMPARING" || e.code === "DISCOVERING") {
      setIsOption3Visible(false);
    } else {
      setIsOption3Visible(true);
    }
    setIsOption4Visible(false);
    setIsOption5Visible(false);
    setOption3Text1(e.text1);
    setOption3Text2(e.text2);
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
        setOptions4(communities);
        setIsOption4Visible(true);
        break;
      default:
        setAreaType("---");
    }
  };

  const handleOption4Change = (e) => {
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
          <div className="your-story your-story-elements">
            <h3 className="my-4">Community Information Tool</h3>
            <hr />
            <h3 className="my-4">
              Hi, welcome to our Community Information Tool. We have lots of
              information available. Tell us a bit more about you and we will
              help you get to info that is relevant to you
            </h3>
            <>
              <span className="user-story-label">I am</span>
              <Select
                placeholder=""
                options={userStoryOptions1}
                styles={selectStyle}
                onChange={handleOption1Change}
              />
            </>
            {isOption2Visible && (
              <>
                <span className="user-story-label">and I am interested in</span>
                <Select
                  placeholder=""
                  options={options2}
                  styles={selectStyle}
                  onChange={handleOption2Change}
                />
              </>
            )}
            {isOption3Visible && (
              <>
                {option3Text1 && (
                  <span className="user-story-label">
                    {ReactHtmlParser(option3Text1)}
                  </span>
                )}
                {option3Text2 && (
                  <span className="user-story-label">
                    {ReactHtmlParser(option3Text2)}
                  </span>
                )}
                <Select
                  placeholder=""
                  options={userStoryOptions3}
                  styles={selectStyle}
                  onChange={handleOption3Change}
                />
              </>
            )}
            {isOption4Visible && (
              <>
                <span className="user-story-label">
                  Which {areaType} specifically?
                </span>
                <Select
                  placeholder="Select "
                  options={options4}
                  styles={selectStyle}
                  onChange={handleOption4Change}
                />
              </>
            )}
          </div>
        </Container>

        <Container>
          {isOption5Visible && (
            <>
              <p>
                <span className="user-story-label">
                  Ok, let’s learn more about{" "}
                  <span className="searchFilter">{searchFilter}</span>
                </span>
              </p>
              <p>
                <Button color="primary" className="m-4" onClick={redirectPage}>
                  GO
                </Button>
              </p>
            </>
          )}
          {isComparing && (
            <>
              <br />
              <p>Ok, let’s go to the compare page.</p>
              <div className="app flex-row align-items-left">
                <Button
                  color="primary"
                  className="m-4"
                  onClick={redirectComparePage}
                >
                  GO
                </Button>
              </div>
            </>
          )}
          {isDiscovering && (
            <>
              <br />
              <p>Ok, let’s go</p>
              <div className="app flex-row align-items-left">
                <Button
                  color="primary"
                  className="m-4"
                  onClick={redirectCriteriaSearchPage}
                >
                  GO
                </Button>
              </div>
            </>
          )}
        </Container>
      </div>
    </>
  );
}
