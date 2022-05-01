import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import { Button } from "react-bootstrap";
import ReactHtmlParser from "react-html-parser";
import "./UserStoryItem.css";

export default function UserStoryItem({
  userStory,
  isLongVersion,
  onUserStoryChange,
}) {
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
      fontSize: "1em",
    }),
    option: (base, { isSelected, isFocused }) => ({
      ...base,
      border: "solid white 1px",
      color: "#ffffff",
      backgroundColor: isFocused
        ? "#003366"
        : isSelected
        ? "#003366"
        : "#3288D9",
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
      color: isLongVersion ? "#3288D9" : "#000000",
    }),
    valueContainer: (base) => ({
      ...base,
      color: isLongVersion ? "#3288D9" : "#000000",
      backgroundColor: isLongVersion ? "#ffffff" : "#f2f2f2",
      fontWeight: isLongVersion ? "normal" : "bold",
    }),
    multiValue: (base) => ({
      ...base,
      color: "#3288D9",
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
      backgroundColor: isLongVersion ? "#ffffff" : "#f2f2f2",
    }),
    placeholder: (base) => ({
      ...base,
      text: "",
    }),
  };

  return (
    <>
      <div className="select-container">
        {isLongVersion && userStory.longTextLabel && (
          <>{ReactHtmlParser(userStory.longTextLabel)}</>
        )}

        {userStory.text && <>{ReactHtmlParser(userStory.text)}</>}
        {userStory.user_story_paths &&
          userStory.user_story_paths.length > 1 &&
          userStoryYes &&
          isLongVersion && (
            <>
              <Button
                variant="primary"
                className="user-story-button"
                size="sm"
                onClick={() => onUserStoryChange(userStoryYes)}
              >
                Yes
              </Button>{" "}
              <Button
                variant="outline-primary"
                className="user-story-button"
                size="sm"
                onClick={() => onUserStoryChange(userStoryNo)}
              >
                No
              </Button>
            </>
          )}
        {userStory.user_story_paths &&
          userStory.user_story_paths.length > 1 &&
          !userStoryYes && (
            <Select
              placeholder=""
              value={userStory.user_story_paths.find(
                (x) => x.value === userStory.selectedValue
              )}
              options={userStory.user_story_paths}
              styles={selectStyle}
              onChange={onUserStoryChange}
              aria-sort="ascending"
              isMulti={userStory.isMultiple}
            />
          )}
      </div>
    </>
  );
}

UserStoryItem.propTypes = {
  userStory: PropTypes.shape().isRequired,
  isLongVersion: PropTypes.bool,
  onUserStoryChange: PropTypes.func,
};

UserStoryItem.defaultProps = {
  isLongVersion: true,
  onUserStoryChange: null,
};
