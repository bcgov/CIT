import React from "react";
import Proptypes from "prop-types";

const PublicLayout = ({ children }) => (
  <main className="App-content">{children}</main>
);

PublicLayout.propTypes = {
  children: Proptypes.shape().isRequired,
};

export default PublicLayout;
