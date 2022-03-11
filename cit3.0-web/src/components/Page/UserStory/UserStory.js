import { useState, useEffect } from "react";
import { Container, Button, Row } from "react-bootstrap";
import { ArrowRight } from "react-bootstrap-icons";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "../HomePage/HomePage.scss";

import { useDispatch, useSelector } from "react-redux";
import { getOptions, setOptions } from "../../../store/actions/options";
import { useKeycloakWrapper } from "../../../hooks/useKeycloakWrapper";
import { userStoryPaths } from "../../../data/userStoryPaths.json";

import "./UserStory.css";
import UserStoryItem from "../../UserStoryItem/UserStoryItem";

let loading = false;

export default function UserStory() {
  const [userOptions, setAllOptions] = useState([]);
  const [isYesButton, setIsYesButton] = useState(false);
  const [isNoButton, setIsNoButton] = useState(false);
  const [redirectURL, setRedirectURL] = useState("");
  const [communities, setCommunities] = useState(null);
  const [regionals, setRegionals] = useState(null);

  const history = useHistory();
  const dispatch = useDispatch();

  const redirectPage = () => {
    console.log(redirectURL);
    const path = redirectURL;
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

  const handleAllOptionsChange = (e) => {
    if (!e.code) {
      e.code = "AREA-OPTION-LIST-YES";
      e.group = "area-option-list";
    }

    const groupIndex = userOptions.findIndex((x) => x.group === e.group);

    let newUserOptions = [];
    if (groupIndex > 0) {
      newUserOptions = userOptions.filter((x, index) => index < groupIndex);
    } else {
      newUserOptions = userOptions;
    }

    const userOption = userStoryPaths.find((x) => x.code === e.code);
    userOption.postText = userOption.preText;
    if (userOption.preText.includes("{AREA-TYPE}")) {
      userOption.postText = userOption.preText.replace(
        "{AREA-TYPE}",
        userOption.label
      );
    }
    if (userOption.preText.includes("{SEARCH-FILTER}")) {
      userOption.postText = userOption.preText.replace(
        "{SEARCH-FILTER}",
        e.label
      );
      e.url = `cit-dashboard/public/${e.label}`;
    }

    if (userOption.code.includes("REGIONALDISTRICTS")) {
      userOption.user_story_paths = regionals;
    }
    if (userOption.code.includes("COMMUNITYAREA")) {
      userOption.user_story_paths = communities;
    }
    setAllOptions([...newUserOptions, userOption]);

    const isLastOption = userOption.user_story_paths.length < 2;

    if (userOption.code.includes("-YES") || isLastOption) {
      setIsYesButton(true);
      setIsNoButton(true);
      setRedirectURL(e.url);
    } else {
      setIsYesButton(false);
      setIsNoButton(false);
    }
    if (userOption.code.includes("-NO")) {
      setIsNoButton(true);
      setIsYesButton(false);
    }
  };

  return (
    <>
      <Container className="mt-4 your-story your-story-elements">
        <Row>
          <h3>Hi, welcome to our Community Information Tool</h3>
          <p>
            The Community Information Tool offers insight into communities
            across B.C. with integrated socio-economic data, infrastructure, and
            community assets data. The Tool supports community, regional, and
            province-wide planning, which is essential to building thriving,
            healthy communities.
          </p>
          <h3>
            Tell us a bit more about you and we will help you get to info that
            is relevant to you
          </h3>
        </Row>
        <Row>
          {userOptions.map((story) => (
            <UserStoryItem
              key={story.id}
              userStory={story}
              onUserStoryChange={handleAllOptionsChange}
            />
          ))}
        </Row>
      </Container>
      {(isNoButton || isYesButton) && (
        <>
          <Container className="my-5">
            <Row>
              {isNoButton && (
                <>
                  <Button
                    variant="outline-primary"
                    size="lg"
                    className="mr-4"
                    onClick={resetUserStory}
                  >
                    {" "}
                    Reset Search
                  </Button>
                </>
              )}
              {isYesButton && (
                <>
                  <Button
                    variant="primary"
                    size="lg"
                    active
                    className="mr-5"
                    onClick={redirectPage}
                  >
                    {" "}
                    View Result <ArrowRight />
                  </Button>
                </>
              )}
            </Row>
          </Container>
        </>
      )}
    </>
  );
}
