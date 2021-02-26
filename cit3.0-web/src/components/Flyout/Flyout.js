import { useState } from "react";
import PropTypes from "prop-types";
import { Container, Col, Row } from "react-bootstrap";
import { Button } from "shared-components";
import "./Flyout.scss";
import OpportunityMapContainer from "../OpportunityMap/OpportunityMapContainer";
import OpportunityListContainer from "../OpportunitiesListContainer/OpportunitiesListContainer";

export default function Flyout(props) {
  const [leftOpenState, setLeftOpenState] = useState(false);

  const { children } = props;

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
              styling="bcgov-normal-blue btn"
            />
          </div>
          <div className="content">
            <h3>Left content</h3>
            <p>
              Aenean ut felis finibus, aliquet mi a, feugiat felis. Donec porta,
              odio et vulputate laoreet, nibh odio iaculis mi, et ornare nulla
              orci vitae ligula. Sed mi velit, aliquam sit amet efficitur eget,
              scelerisque vel ligula. Aliquam finibus erat nec accumsan posuere.
              Vestibulum rhoncus, velit vitae volutpat vehicula, leo orci
              faucibus eros, at ornare nibh nunc nec mi. Donec porttitor
              ultricies mauris quis euismod. Praesent sem libero, venenatis ut
              ornare eget, volutpat tincidunt lacus. Pellentesque aliquam turpis
              et mauris consectetur, quis condimentum nunc dignissim. Cras
              lectus libero, pellentesque non malesuada at, condimentum nec ex.
              Nam sed accumsan enim. Donec eros massa, malesuada quis nulla
              elementum, imperdiet condimentum orci. Integer non velit et nulla
              vestibulum vestibulum. Proin vehicula tristique libero, eu
              tincidunt erat cursus ac. Ut malesuada ante ut est dictum, ornare
              varius arcu aliquet. Quisque vitae libero eget orci tristique
              aliquam id sit amet nunc.
            </p>
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
};

Flyout.propTypes = {
  children: PropTypes.node,
};
