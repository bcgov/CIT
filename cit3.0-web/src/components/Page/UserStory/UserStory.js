import { useState, useEffect } from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import { ArrowRight } from "react-bootstrap-icons";
import axios from "axios";
import { useHistory } from "react-router-dom";

import "../HomePage/HomePage.scss";

import { useDispatch, useSelector } from "react-redux";
import { getOptions, setOptions } from "../../../store/actions/options";
import { userStoryPaths } from "../../../data/userStoryPaths.json";
import { useKeycloakWrapper } from "../../../hooks/useKeycloakWrapper";
import "./UserStory.css";
import UserStoryItem from "../../UserStoryItem/UserStoryItem";

export default function UserStory() {
  let loading = false;
  const [userOptions, setAllOptions] = useState([]);
  const [who, setwho] = useState("");
  const [isYesButton, setIsYesButton] = useState(false);
  const [isNoButton, setIsNoButton] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState("");
  const [areaType, setAreaType] = useState("");
  const [areaFilterId, setAreaFilterId] = useState("");
  const [areaSearchFilter, setAreaSearchFilter] = useState("");
  const [powerBiReports, setPowerBiReports] = useState([]);
  const [communities, setCommunities] = useState(null);
  const [regionals, setRegionals] = useState(null);

  const keycloak = useKeycloakWrapper();

  const history = useHistory();
  const dispatch = useDispatch();

  const userName = keycloak ? keycloak.firstName : "";

  const redirectPage = (urlPath) => {
    let path = urlPath;

    if (urlPath && urlPath.includes("reportfilter")) {
      const areaFilter = encodeURIComponent(areaSearchFilter);
      path = `${urlPath}?${areaFilterId}=${areaFilter}`;

      if (powerBiReports.length > 0) {
        const powerBiqs = `powerbi=${powerBiReports.join(",")}`;
        path = `${path}&${powerBiqs}`;
      }
    }
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

  useEffect(() => {
    const option = userStoryPaths.find((x) => x.code === "START");
    option.postText = option.preText;
    setAllOptions([option]);
  }, []);

  const resetUserStory = () => {
    const options = userStoryPaths.find((x) => x.code === "START");
    setAllOptions([options]);
    setIsNoButton(false);
    setIsYesButton(false);
  };

  const handleUserStoryChange = (e) => {
    let param;

    if (e.length === 0) {
      setIsNoButton(false);
      setIsYesButton(false);
      return;
    }

    if (Array.isArray(e)) {
      setPowerBiReports(e.map((x) => x.value.toLowerCase()));
      param = e.find((x, index) => index < 1);
    } else {
      param = e;
    }

    if (param && !param.code) {
      param.code = "AREA-TYPE-LIST-YES";
      param.group = "area-type-list";
      param.url = "reports/publicreport/reportfilter";
      setAreaSearchFilter(param.label);
    }

    if (param.code === "VIEWING-YES" || param.code === "DISCOVERING-YES") {
      redirectPage(param.url);
    }

    if (param && param.group === "who") {
      setwho(param);
    }

    const groupIndex = userOptions.findIndex((x) => x.group === param.group);

    let newUserOptions = [];
    if (groupIndex > 0) {
      newUserOptions = userOptions.filter((x, index) => index < groupIndex);
    } else {
      newUserOptions = userOptions;
    }

    const userOption = userStoryPaths.find((x) => x.code === param.code);

    if (param.group === "area") {
      setAreaType(userOption.label);
      setAreaFilterId(userOption.code.toLowerCase());
    }

    if (userOption.code.includes("REGIONALDISTRICTS")) {
      userOption.user_story_paths = regionals;
    }

    if (userOption.code.includes("COMMUNITYAREA")) {
      userOption.user_story_paths = communities;
    }

    let replaceText = userOption.preText;
    replaceText = replaceText.replace(
      "{AREA-TYPE-1}",
      userOption.label.slice(0, -1)
    );
    replaceText = replaceText.replace("{AREA-TYPE-2}", areaType);
    replaceText = replaceText.replace("{AREA-SEARCH-FILTER}", param.label);
    userOption.postText = replaceText;

    setAllOptions([...newUserOptions, userOption]);

    const isLastOption = userOption.user_story_paths.length < 2;

    if (userOption.code.includes("-YES") || isLastOption) {
      setIsYesButton(true);
      setIsNoButton(false);
      setRedirectUrl(param.url);
    } else {
      setIsYesButton(false);
      setIsNoButton(false);
    }
    if (userOption.code.includes("-NO")) {
      const isNo = userOption.user_story_paths.find((x) =>
        x.code.includes("-NO")
      );
      if (isNo) {
        setIsNoButton(true);
        setIsYesButton(false);
      }
    }
  };

  const handleIsNo = () => {
    handleUserStoryChange(who);
  };

  const header = (
    <>
      <h3>
        Hi{userName ? " " : ""}
        {userName}, welcome to our Community Information Tool
      </h3>
      <p>
        The Community Information Tool offers insight into communities across
        B.C. with integrated socio-economic data, infrastructure, and community
        assets data. The Tool supports community, regional, and province-wide
        planning, which is essential to building thriving, healthy communities.
      </p>
    </>
  );

  const resetButton = (
    <Button
      variant="outline-primary"
      className="user-story-button"
      onClick={resetUserStory}
    >
      Reset Search Criteria
    </Button>
  );

  const noButton = (
    <Button
      variant="outline-primary"
      className="user-story-button"
      onClick={handleIsNo}
      active
    >
      Ok
    </Button>
  );

  const yesButton = (
    <Button
      variant="primary"
      active
      className="bcgov-normal-blue user-story-button"
      onClick={() => redirectPage(redirectUrl)}
    >
      Let&apos;s Go <ArrowRight />
    </Button>
  );

  return (
    <>
      <Container className="mt-4 your-story your-story-elements">
        <Row>
          <Col sm={12}>{header}</Col>
        </Row>
        <Row>
          <Col sm={9}>
            <Container className="your-story your-story-elements">
              <Row>
                {userOptions.map((story) => (
                  <UserStoryItem
                    key={story.id}
                    userStory={story}
                    onUserStoryChange={handleUserStoryChange}
                  />
                ))}
              </Row>
              {isYesButton && (
                <>
                  <Row className="section-break">
                    {resetButton} {yesButton}
                  </Row>
                </>
              )}
              {isNoButton && (
                <>
                  <Row className="section-break">{noButton}</Row>
                </>
              )}
            </Container>
          </Col>
          <Col sm={3} className="svg-box pt-3 your-story-image">
            <img
              className="add-opp-img"
              src="/images/CIT_logo.svg"
              height="100%"
              width="100%"
              alt="cit logo mountains"
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}
