import PropTypes from "prop-types";
import { Container, Row, Col } from "react-bootstrap";
import PortalHeader from "../../Headers/PortalHeader/PortalHeader";
import NavigationHeader from "../../Headers/NavigationHeader/NavigationHeader";
import OpportunityView from "../../OpportunityView/OpportunityView";

export default function SiteInformation({ location }) {
  console.log(location.state);
  return (
    <>
      <PortalHeader />
      <NavigationHeader />
      <Container>
        <Row>
          This shows you all the information we could collect from many open
          source BC Gov. databases
        </Row>
        <Row>Some warning about this data not being editable</Row>
      </Container>
      <OpportunityView data={location.state} />
    </>
  );
}

SiteInformation.propTypes = {
  location: PropTypes.shape().isRequired,
};
