import React from "react";
import Proptypes from "prop-types";

const DummyFlyoutContent = ({ title, text }) => (
  <>
    <h3>{title}</h3>
    <p>{text}</p>
  </>
);

DummyFlyoutContent.propTypes = {
  title: Proptypes.string.isRequired,
  text: Proptypes.string.isRequired,
};

export default DummyFlyoutContent;
