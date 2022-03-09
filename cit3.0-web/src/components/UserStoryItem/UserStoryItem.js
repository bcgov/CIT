import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import { Button } from "react-bootstrap";
import ReactHtmlParser from "react-html-parser";
import "./UserStoryItem.css";

export default function UserStoryItem({ userStory, onUserStoryChange }) {
  const userStoryYes = userStory.user_story_paths.find(
    (x) => x.label === "Yes"
  );
  const userStoryNo = userStory.user_story_paths.find((x) => x.label === "No");
  const selectStyle = {
    container: (base) => ({
      ...base,
      flex: 0,
      margin: 0,
      paddingRight: 8,
    }),
    option: (base, state) => ({
      ...base,
      border: "solid white 1px",
      color: "#ffffff",
      backgroundColor: state.isSelected ? "#003366" : "#3288D9",
    }),
    menu: (base) => ({
      ...base,
      width: userStoryYes ? 100 : 400,
      border: "solid white 2px",
    }),
    menuList: (base) => ({
      ...base,
      border: "solid white 2px",
    }),
    singleValue: (base) => ({
      ...base,
      color: "#3288D9",
      fontSize: "1em",
    }),
    control: (base) => ({
      ...base,
      borderTop: "none",
      borderLeft: "none",
      borderRight: "none",
      borderBottom: "2px solid #376fa3",
      borderRadius: "0",
      boxShadow: "none",
      width: userStoryYes ? 100 : 330,
    }),
    indicatorSeparator: (base) => ({
      ...base,
      display: "none",
    }),
    dropdownIndicator: (base) => ({
      ...base,
      color: "#3288d9",
    }),
    placeholder: (base) => ({
      ...base,
      text: "",
    }),
  };

  return (
    <>
      <div className="select-container">
        {userStory.postText && <>{ReactHtmlParser(userStory.postText)}</>}
        {userStory.user_story_paths &&
          userStory.user_story_paths.length > 0 &&
          userStoryYes && (
            <>
              <Button
                variant="primary"
                className="m-2"
                size="sm"
                onClick={() => onUserStoryChange(userStoryYes)}
              >
                Yes
              </Button>{" "}
              <Button
                variant="outline-primary"
                className="m-2"
                size="sm"
                onClick={() => onUserStoryChange(userStoryNo)}
              >
                No
              </Button>
            </>
          )}
        {userStory.user_story_paths &&
          userStory.user_story_paths.length > 0 &&
          !userStoryYes && (
            <Select
              placeholder=""
              options={userStory.user_story_paths}
              styles={selectStyle}
              onChange={onUserStoryChange}
              aria-sort="ascending"
            />
          )}
      </div>
    </>
  );
}

UserStoryItem.propTypes = {
  userStory: PropTypes.shape().isRequired,
  onUserStoryChange: PropTypes.func,
};

UserStoryItem.defaultProps = {
  onUserStoryChange: null,
};
