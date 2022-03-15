import { useState, useEffect } from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import { ArrowRight } from "react-bootstrap-icons";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "../HomePage/HomePage.scss";

import { useDispatch, useSelector } from "react-redux";
import { getOptions, setOptions } from "../../../store/actions/options";
import { userStoryPaths } from "../../../data/userStoryPaths.json";

import "./UserStory.css";
import UserStoryItem from "../../UserStoryItem/UserStoryItem";

export default function UserStory() {
  let loading = false;
  const [userOptions, setAllOptions] = useState([]);
  const [isYesButton, setIsYesButton] = useState(false);
  const [isNoButton, setIsNoButton] = useState(false);
  const [redirectURL, setRedirectURL] = useState("");
  const [areaType, setAreaType] = useState("");
  const [areaFilterId, setAreaFilterId] = useState("");
  const [areaSearchFilter, setAreaSearchFilter] = useState("");
  const [powerBiReports, setPowerBiReports] = useState([]);
  const [communities, setCommunities] = useState(null);
  const [regionals, setRegionals] = useState(null);

  const history = useHistory();
  const dispatch = useDispatch();

  const redirectPage = () => {
    let path = redirectURL;

    if (redirectURL.includes("reportfilter")) {
      const areaFilter = encodeURIComponent(areaSearchFilter);
      path = `${redirectURL}?${areaFilterId}=${areaFilter}`;

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
    replaceText = replaceText.replace("{AREA-TYPE-1}", userOption.label);
    replaceText = replaceText.replace("{AREA-TYPE-2}", areaType);
    replaceText = replaceText.replace("{AREA-SEARCH-FILTER}", param.label);
    userOption.postText = replaceText;

    setAllOptions([...newUserOptions, userOption]);

    const isLastOption = userOption.user_story_paths.length < 2;

    if (userOption.code.includes("-YES") || isLastOption) {
      setIsYesButton(true);
      setIsNoButton(true);
      setRedirectURL(param.url);
    } else {
      setIsYesButton(false);
      setIsNoButton(false);
    }
    if (userOption.code.includes("-NO")) {
      setIsNoButton(true);
      setIsYesButton(false);
    }
  };

  const header = (
    <>
      <h3>Hi, welcome to our Community Information Tool</h3>
      <p>
        The Community Information Tool offers insight into communities across
        B.C. with integrated socio-economic data, infrastructure, and community
        assets data. The Tool supports community, regional, and province-wide
        planning, which is essential to building thriving, healthy communities.
      </p>
    </>
  );

  const noButton = (
    <Button
      variant="outline-primary"
      className="user-story-button"
      onClick={resetUserStory}
    >
      Reset Search Criteria
    </Button>
  );

  const yesButton = (
    <Button
      variant="primary"
      active
      className="bcgov-normal-blue user-story-button"
      onClick={redirectPage}
    >
      View Results <ArrowRight />
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
              {(isNoButton || isYesButton) && (
                <>
                  <Row className="section-break">
                    {isNoButton && noButton}
                    {isYesButton && yesButton}
                  </Row>
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
