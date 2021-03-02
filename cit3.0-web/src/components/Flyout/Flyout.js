import { useState } from "react";
import PropTypes from "prop-types";
import { Container, Col, Row } from "react-bootstrap";
// import Switch from "react-switch";
import { Button } from "shared-components";
import NumberRangeFilter from "../NumberRangeFilter/NumberRangeFilter";
import "./Flyout.scss";

export default function Flyout(props) {
  const [leftOpenState, setLeftOpenState] = useState(false);

  const { children } = props;

  // let waterSwitchValue = false;

  const toggleSidebar = () => {
    setLeftOpenState(!leftOpenState);
  };

  // const updateWaterSwitchValue = (value) => {
  //   waterSwitchValue = value;
  // };

  const leftOpen = leftOpenState ? "open" : "closed";
  return (
    <div id="search-page-layout">
      <div id="left" className={leftOpen}>
        <div className={`sidebar ${leftOpen}`}>
          <div className="header" align="right">
            <Button
              onClick={toggleSidebar}
              label="<< Close filter panel"
              styling="bcgov-normal-blue close-panel-button btn"
            />
          </div>
          <div className="content">
            <h2>Filter your search</h2>
            <h3>General site details</h3>
            <NumberRangeFilter />
            <br />
            {/* <Switch
              checked={waterSwitchValue}
              onChange={updateWaterSwitchValue(waterSwitchValue)}
            /> */}
          </div>
        </div>
      </div>

      <div id="sidebar-button-area">
        <Container fluid>
          <Row>
            <div className={`icon ${leftOpen}`}>
              <Col>
                <Button
                  onClick={toggleSidebar}
                  label=">>"
                  styling="bcgov-normal-white"
                />
              </Col>
            </div>
          </Row>
        </Container>
      </div>

      <div>{children}</div>
    </div>
  );
}

Flyout.defaultProps = {
  children: <div />,
};

Flyout.propTypes = {
  children: PropTypes.node,
};
