import React from "react";
import Proptypes from "prop-types";

const PublicLayout = ({ children }) => (
  <main className="App-content">{children}</main>
);

PublicLayout.defaultProps = {
  children: <></>,
};

PublicLayout.propTypes = {
  children: Proptypes.shape(),
};

export default PublicLayout;
