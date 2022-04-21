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
  const [isLoading, setIsLoading] = useState(true);
  const [userOptions, setUserOptions] = useState([]);
  const [isLongVersion, setIsLongVersion] = useState(true);
  const [showReport, setShowReport] = useState(false);
  const [who, setWho] = useState("");
  const [isGoButton, setIsGoButton] = useState(false);
  const [isOkButton, setIsOkButton] = useState(false);
  const [areaType, setAreaType] = useState("");
  const [powerBiReport, setPowerBiReport] = useState("");
  const [reportFilter, setReportFilter] = useState("");
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

  const [collapse, setCollapse] = useState(true);

  const zoneType = useRef();
  const zoneName = useRef();
  const redirectUrl = useRef();

  const keycloak = useKeycloakWrapper();

  const history = useHistory();

  const userName = keycloak ? keycloak.firstName : "";

  const showResult = (urlPath) => {
    if (!urlPath) return;

    if (urlPath && urlPath.includes("powerbi")) {
      setPowerBiReport(urlPath);
      setIsLongVersion(false);
      if (zoneType.current || zoneName.current) {
        const zoneFilter = {
          zoneType: zoneType.current,
          zoneName: zoneName.current,
        };
        setReportFilter(zoneFilter);
      } else {
        setReportFilter(null);
      }
      setShowReport(true);
      return;
    }
    history.push(urlPath);
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
    const option = userStoryPaths.find((x) => x.code === "START");
    option.longTextLabel = option.longText;
    setUserOptions([option]);
  }, []);

  const resetUserStory = () => {
    const option = userStoryPaths.find((x) => x.code === "START");
    setUserOptions([option]);
    setIsOkButton(false);
    setIsGoButton(false);
  };

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

    let newUserOptions = [];
    if (groupIndex > 0) {
      newUserOptions = userOptions.filter((x, index) => index < groupIndex);
    } else {
      newUserOptions = userOptions;
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

    if (param.group === "zone-type-list") zoneName.current = param.label;

    if (param.group === "zone") {
      setAreaType(userOption.label);

      switch (userOption.code) {
        case "COMMUNITY":
          userOption.user_story_paths = communities;
          zoneType.current = "Communities";
          break;
        case "COMMUNITYAREA":
          userOption.user_story_paths = censusSubdivisions;
          zoneType.current = "Communities and Unincorporated Areas";
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
          zoneType.current = "Regional Districts";
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
          console.log({ tsunamiZones });
          userOption.user_story_paths = tsunamiZones;
          zoneType.current = "Tsunami Zone";
          break;
        case "WILDFIREZONES":
          userOption.user_story_paths = wildfireZones;
          zoneType.current = "Wildfire Zone";
          break;
        default:
          zoneType.current = null;
          zoneName.current = null;
      }
    }

    let replaceText = userOption.longText;
    replaceText = replaceText.replace(
      "{ZONE-TYPE-1}",
      userOption.label.slice(0, -1)
    );

    replaceText = replaceText.replace("{ZONE-TYPE-2}", areaType);
    replaceText = replaceText.replace("{ZONE-SEARCH-FILTER}", param.label);
    userOption.longTextLabel = replaceText;

    setUserOptions([...newUserOptions, userOption]);

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

  const handleIsOk = () => {
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
        B.C. with integrated socio-economic, infrastructure, and community
        assets data. The Tool supports community, regional, and province-wide
        planning, which is essential to building thriving, healthy communities.
      </p>
    </>
  );

  const resetButton = (
    <Button
      type="button"
      variant="outline-primary"
      className="user-story-button"
      onClick={resetUserStory}
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
                <ReportOverview reportFilter={reportFilter} user={who.code} />
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
