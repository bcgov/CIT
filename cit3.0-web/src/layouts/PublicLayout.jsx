/* eslint-disable react/prop-types */
import React from "react";

const PublicLayout = ({ children = <></> }) => (
  <main className="App-content">{children}</main>
);

// To be converted to an interface
// PublicLayout.propTypes = {
//   children: Proptypes.shape(),
// };

export default PublicLayout;
