import { useState } from "react";
import PropTypes from "prop-types";
import { Container, Col, Row } from "react-bootstrap";
import { Button } from "shared-components";
import "./Flyout.scss";

export default function Flyout(props) {
  const [leftOpenState, setLeftOpenState] = useState(false);

  const { children, flyoutComponent: FlyoutComponent, flyoutProps } = props;

  const toggleSidebar = () => {
    setLeftOpenState(!leftOpenState);
  };

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
            <FlyoutComponent {...flyoutProps} />
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
      <div className="children">{children}</div>
    </div>
  );
}

Flyout.defaultProps = {
  children: <div />,
  flyoutComponent: () => <div />,
  flyoutProps: {},
};

Flyout.propTypes = {
  children: PropTypes.node,
  flyoutComponent: PropTypes.func,
  flyoutProps: PropTypes.shape(),
};
