import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import ReactHtmlParser from "react-html-parser";
import "./UserStoryItem.css";

export default function UserStoryItem({ userStory, onUserStoryChange }) {
  let selectStyle = {
    container: (base) => ({
      ...base,
      flex: 0,
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
      width: 400,
      border: "solid white 2px",
    }),
    menuList: (base) => ({
      ...base,
      border: "solid white 2px",
    }),
    singleValue: (base) => ({
      ...base,
      color: "#3288D9",
      fontSize: "1.1em",
    }),
    control: (base) => ({
      ...base,
      borderTop: "none",
      borderLeft: "none",
      borderRight: "none",
      borderBottom: "2px solid #376fa3",
      borderRadius: "0",
      boxShadow: "none",
      width: 330,
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

  const yesNoStyle = {
    container: (base) => ({
      ...base,
      flex: 0,
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
      width: 100,
      border: "solid white 2px",
    }),
    menuList: (base) => ({
      ...base,
      border: "solid white 2px",
    }),
    singleValue: (base) => ({
      ...base,
      color: "#3288D9",
      fontSize: "1.1em",
    }),
    control: (base) => ({
      ...base,
      borderTop: "none",
      borderLeft: "none",
      borderRight: "none",
      borderBottom: "2px solid #376fa3",
      borderRadius: "0",
      boxShadow: "none",
      width: 100,
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

  const yesNo = userStory.user_story_paths.filter((x) => x.label === "Yes");
  if (yesNo.length > 0) selectStyle = yesNoStyle;

  return (
    <>
      <div className="select-container">
        {userStory.postText && <>{ReactHtmlParser(userStory.postText)}</>}
        {userStory.user_story_paths &&
          userStory.user_story_paths.length > 0 && (
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
