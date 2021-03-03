import React from "react";
import Proptypes from "prop-types";

const DummyFlyoutContent = ({ title, text, onClick }) => (
  <>
    <h3>{title}</h3>
    <p>{text}</p>
    <button type="button" onClick={onClick}>
      Text Action
    </button>
  </>
);

DummyFlyoutContent.propTypes = {
  title: Proptypes.string.isRequired,
  text: Proptypes.string.isRequired,
  onClick: Proptypes.func.isRequired,
};

export default DummyFlyoutContent;
