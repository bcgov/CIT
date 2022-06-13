import { useState, useEffect, useRef } from "react";
import {
  Container,
  Button,
  Row,
  Col,
  Collapse,
  Spinner,
} from "react-bootstrap";
import {
  ArrowRight,
  ChevronRight,
  ChevronDown,
  ChevronUp,
} from "react-bootstrap-icons";
import { useHistory } from "react-router-dom";
import { useKeycloakWrapper } from "../../../hooks/useKeycloakWrapper";
import useConfiguration from "../../../hooks/useConfiguration";

import UserStoryItem from "../../UserStoryItem/UserStoryItem";
import ReportOverview from "../../ReportOverview/ReportOverview";
import ReportCriteriaSearch from "../../ReportCriteriaSearch/ReportCriteriaSearch";
import ReportCompare from "../../ReportCompare/ReportCompare";
import {
  getCensusEconomicRegions,
  getCommunities,
  getHealthAuthorityBoundaries,
  getNaturalResourceRegions,
  getRegionalDistricts,
  getSchoolDistricts,
  getTourismRegions,
  getCensusSubdivisions,
  getTsunamiZones,
  getWildfireZones,
} from "../../../helpers/userStoryData";

import { userStoryPaths } from "../../../data/userStoryPaths.json";
import "../HomePage/HomePage.scss";
import "./UserStory.css";

export default function UserStory() {
  const configuration = useConfiguration();
  const keycloak = useKeycloakWrapper();
  const [isLoading, setIsLoading] = useState(true);
  const [userOptions, setUserOptions] = useState([]);
  const [isLongVersion, setIsLongVersion] = useState(true);
  const [showReport, setShowReport] = useState(false);
  const [who, setWho] = useState("");
  const [isGoButton, setIsGoButton] = useState(false);
  const [isOkButton, setIsOkButton] = useState(false);
  const [areaType, setAreaType] = useState("");
  const [powerBiReport, setPowerBiReport] = useState("");
  const [reportFilter, setReportFilter] = useState(null);
  const [communities, setCommunities] = useState(null);
  const [censusSubdivisions, setCensusSubdivisions] = useState(null);
  const [economicRegions, setEconomicRegions] = useState(null);
  const [naturalResourceRegions, setNaturalResourceRegions] = useState(null);
  const [regionalDistricts, setRegionalDistricts] = useState(null);
  const [tourismRegions, setTourismRegions] = useState(null);
  const [tsunamiZones, setTsunamiZones] = useState(null);
  const [wildfireZones, setWildfireZones] = useState(null);
  const [schoolDistricts, setSchoolDistricts] = useState(null);
  const [healthAuthorityBoundaries, setHealthAuthorityBoundaries] = useState(
    null
  );

  const [isLoginWithIdir] = useState(keycloak.idp === "idir");
  const [isInternal] = useState(location.pathname.includes("internal"));

  const [collapse, setCollapse] = useState(true);

  const zoneFilter = useRef();
  const zoneType = useRef();
  const zoneId = useRef();
  const zoneLabel = useRef();
  const redirectUrl = useRef();

  const history = useHistory();

  const userName = keycloak ? keycloak.firstName : "";

  const userStoryUrl = "/userstory/internal";

  const singularize = (text) => {
    if (text.endsWith("ies")) return `${text.slice(0, -3)}y`;
    return text.slice(0, -1);
  };

  const saveUserStory = () => {
    const userStoryValues = {
      userOptions,
      reportFilter: zoneFilter.current,
    };
    localStorage.setItem("userStory", JSON.stringify(userStoryValues));
  };

  const loadUserStory = () => {
    const saved = localStorage.getItem("userStory");
    return JSON.parse(saved);
  };

  const showResult = (urlPath) => {
    if (!urlPath) return;

    if (urlPath && !urlPath.includes("powerbi")) {
      history.push(urlPath);
      return;
    }

    setPowerBiReport(urlPath);
    setIsLongVersion(false);

    setReportFilter(zoneFilter.current);
    setShowReport(true);
  };

  useEffect(() => {
    Promise.all([
      getCensusEconomicRegions(),
      getCommunities(),
      getNaturalResourceRegions(),
      getRegionalDistricts(),
      getTourismRegions(),
      getCensusSubdivisions(),
      getTsunamiZones(),
      getWildfireZones(),
      getHealthAuthorityBoundaries(),
      getSchoolDistricts(),
    ]).then((response) => {
      setEconomicRegions(response[0]);
      setCommunities(response[1]);
      setNaturalResourceRegions(response[2]);
      setRegionalDistricts(response[3]);
      setTourismRegions(response[4]);
      setCensusSubdivisions(response[5]);
      setTsunamiZones(response[6]);
      setWildfireZones(response[7]);
      setHealthAuthorityBoundaries(response[8]);
      setSchoolDistricts(response[9]);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (isInternal && isLoginWithIdir) {
      const options = loadUserStory();
      if (options && options.userOptions && options.userOptions.length > 0) {
        const urlPath = options.userOptions[options.userOptions.length - 1].url;
        const user = options.userOptions.find((x) => x.group === "who");
        setWho(user);
        setIsLongVersion(false);
        zoneFilter.current = options.reportFilter;
        setUserOptions(options.userOptions);

        showResult(urlPath);
        return;
      }
    }

    const option = userStoryPaths.find((x) => x.code === "START");
    option.longTextLabel = option.longText;
    setUserOptions([option]);
  }, []);

  const handleUserStoryChange = (e) => {
    let param;

    if (e.length === 0) {
      setIsOkButton(false);
      setIsGoButton(false);
      return;
    }

    if (Array.isArray(e)) {
      param = e.find((x, index) => index < 1);
    } else {
      param = e;
    }
    if (param && !param.code) {
      const zone = userStoryPaths.find((x) => x.group === "zone-type-list");
      if (zone) {
        param.code = zone.code;
        param.group = zone.group;
        param.url = zone.url;
      }
    }

    if (param && param.group === "who") {
      setWho(param);
    }

    const groupIndex = userOptions.findIndex((x) => x.group === param.group);

    let currentUserOptions = [];
    if (groupIndex > 0) {
      currentUserOptions = userOptions.filter((x, index) => index < groupIndex);
    } else {
      currentUserOptions = userOptions;
    }

    const userOption = userStoryPaths.find((x) => x.code === param.code);

    if (!isLongVersion && userOption && userOption.group !== "zone") {
      const isYes = userOption.user_story_paths.find((x) =>
        x.code.includes("-YES")
      );
      if (isYes) {
        userOption.user_story_paths = [isYes];
      }
    }

    if (param.group === "zone-type-list") {
      zoneLabel.current = param.label;
      zoneId.current = param.value;
    }
    if (param.group === "zone") {
      setAreaType(userOption.label);

      switch (userOption.code) {
        case "COMMUNITY":
          userOption.user_story_paths = communities;
          zoneType.current = "Community";
          break;
        case "CENSUSSUBDIVISION":
          userOption.user_story_paths = censusSubdivisions;
          zoneType.current = "Census Subdivision";
          break;
        case "ECONOMICREGIONS":
          userOption.user_story_paths = economicRegions;
          zoneType.current = "Economic Region";
          break;
        case "HEALTHAUTHORITY":
          userOption.user_story_paths = healthAuthorityBoundaries;
          zoneType.current = "Health Authority";
          break;
        case "NATURALRESOURCEREGIONS":
          userOption.user_story_paths = naturalResourceRegions;
          zoneType.current = null;
          break;
        case "REGIONALDISTRICTS":
          userOption.user_story_paths = regionalDistricts;
          zoneType.current = "Regional District";
          break;
        case "SCHOOLDISTRICTS":
          userOption.user_story_paths = schoolDistricts;
          zoneType.current = "School District";
          break;
        case "TOURISMREGIONS":
          userOption.user_story_paths = tourismRegions;
          zoneType.current = "Tourism Region";
          break;
        case "TSUNAMIZONES":
          userOption.user_story_paths = tsunamiZones;
          zoneType.current = "Tsunami Zone";
          break;
        case "WILDFIREZONES":
          userOption.user_story_paths = wildfireZones;
          zoneType.current = "Wildfire Zone";
          break;
        default:
          zoneType.current = null;
          zoneId.current = null;
          zoneLabel.current = null;
      }
    }

    zoneFilter.current = null;
    if (zoneType.current || zoneId.current) {
      zoneFilter.current = {
        zoneType: zoneType.current,
        zoneId: zoneId.current,
        zoneLabel: zoneLabel.current,
      };
    }

    let replaceText = userOption.longText;
    if (replaceText.includes("{ZONE-TYPE-1}")) {
      replaceText = replaceText.replace(
        "{ZONE-TYPE-1}",
        singularize(userOption.label)
      );
    }

    replaceText = replaceText.replace("{ZONE-TYPE-2}", areaType);
    replaceText = replaceText.replace("{ZONE-SEARCH-FILTER}", param.label);
    userOption.longTextLabel = replaceText;

    if (currentUserOptions.length > 0) {
      currentUserOptions[currentUserOptions.length - 1].selectedValue =
        param.value;
    }

    setUserOptions([...currentUserOptions, userOption]);

    if (param.code.includes("-YES") && isLongVersion) {
      setIsOkButton(false);
      showResult(param.url);
      return;
    }

    const isLastOption = userOption.user_story_paths.length < 2;

    if (userOption.code.includes("-GO") || isLastOption) {
      setIsGoButton(true);
      setIsOkButton(false);
      redirectUrl.current = param.url;
    } else {
      setIsGoButton(false);
      setIsOkButton(false);
    }

    if (userOption.code.includes("-NO")) {
      const isNo = userOption.user_story_paths.find((x) =>
        x.code.includes("-NO")
      );
      if (isNo) {
        setIsOkButton(true);
        setIsGoButton(false);
      }
    }
  };

  const handleLogin = () => {
    saveUserStory();
    const loginWithIdir = keycloak.obj.createLoginUrl({
      idpHint: "idir",
      redirectUri: encodeURI(`${configuration.baseUrl}${userStoryUrl}`),
    });
    window.location.href = loginWithIdir;
  };

  const handleReset = () => {
    const option = userStoryPaths.find((x) => x.code === "START");
    setUserOptions([option]);
    setIsOkButton(false);
    setIsGoButton(false);
  };

  const handleIsOk = () => {
    handleUserStoryChange(who);
  };

  const header = (
    <>
      <h1>
        Hi{userName ? " " : ""}
        {userName}, welcome to our Community Information Tool
      </h1>
      <p>
        The Community Information Tool offers insight into communities across
        B.C. with integrated socio-economic, connectivity, and community assets
        data. The Tool supports community, regional, and province-wide planning,
        which is essential to building thriving, healthy communities.
      </p>
    </>
  );

  const resetButton = (
    <Button
      type="button"
      variant="outline-primary"
      className="user-story-button"
      onClick={handleReset}
    >
      Reset Search Criteria
    </Button>
  );

  const okButton = (
    <Button
      variant="outline-primary"
      className="user-story-button"
      onClick={handleIsOk}
      active
    >
      Ok
    </Button>
  );

  const goButton = (
    <Button
      variant="primary"
      active
      className="user-story-button"
      onClick={() => showResult(redirectUrl.current)}
    >
      {isLongVersion ? "Let's Go" : "View Results For Your New Search"}{" "}
      {isLongVersion ? <ArrowRight /> : <ChevronRight />}
    </Button>
  );

  const storyResultLink = (
    <>
      <div className="collapse-link">
        <p>
          Based on
          <button
            type="button"
            aria-controls="user story collapse text"
            aria-expanded={collapse}
            onClick={() => setCollapse(!collapse)}
          >
            your story{" "}
            {collapse ? (
              <ChevronUp size={20} className="chevron-icon" />
            ) : (
              <ChevronDown size={20} className="chevron-icon" />
            )}
          </button>
          here are your results
        </p>
      </div>
    </>
  );

  return (
    <>
      {isLoading && (
        <>
          <div className="center-spinner">
            <Spinner animation="border" />
          </div>
        </>
      )}
      {!isLoading && (
        <Container className="my-4 user-story-top-container">
          <div>{!isLongVersion && <>{storyResultLink}</>}</div>
          <Collapse in={collapse}>
            <div className={showReport ? "x-smaller-section-container" : ""}>
              <div className={showReport ? "x-smaller-section" : ""}>
                {isLongVersion && <Row>{header}</Row>}
                <Row>
                  <Col sm={isLongVersion ? 9 : 12}>
                    <Row className="options-container">
                      {userOptions.map((story) => (
                        <div key={story.id}>
                          <UserStoryItem
                            key={story.id}
                            userStory={story}
                            isLongVersion={isLongVersion}
                            onUserStoryChange={handleUserStoryChange}
                          />
                        </div>
                      ))}
                    </Row>
                    {(isGoButton || showReport) && (
                      <Row
                        className={`user-story-buttons ${
                          showReport ? "short-version-button-location" : ""
                        }`}
                      >
                        {isGoButton || showReport ? resetButton : null}{" "}
                        {isGoButton ? goButton : null}
                      </Row>
                    )}
                    {isOkButton && (
                      <Row className="section-break">{okButton}</Row>
                    )}
                  </Col>
                  {isLongVersion && (
                    <Col sm={3} className="svg-box pt-3 user-story-image">
                      <img
                        className="add-opp-img"
                        src="/images/CIT_logo.svg"
                        height="100%"
                        width="100%"
                        alt="cit logo mountains"
                      />
                    </Col>
                  )}
                </Row>
              </div>
            </div>
          </Collapse>
          {showReport && (
            <>
              {powerBiReport.includes("overview") && (
                <ReportOverview
                  reportFilter={reportFilter}
                  user={who.code}
                  handleLogin={handleLogin}
                />
              )}
              {powerBiReport.includes("compare") && <ReportCompare />}
              {powerBiReport.includes("criteriaSearch") && (
                <ReportCriteriaSearch />
              )}
            </>
          )}
        </Container>
      )}
    </>
  );
}
