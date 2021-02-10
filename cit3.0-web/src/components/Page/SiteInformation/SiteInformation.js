import PropTypes from "prop-types";
import { Container, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import PortalHeader from "../../Headers/PortalHeader/PortalHeader";
import NavigationHeader from "../../Headers/NavigationHeader/NavigationHeader";
import OpportunityView from "../../OpportunityView/OpportunityView";
import ButtonRow from "../../ButtonRow/ButtonRow";

export default function SiteInformation({ location }) {
  console.log(location.state);
  const history = useHistory();
  const goToNextPage = () => {
    history.push({
      pathname: `propDetails1`,
      state: { stuff: "stuff" },
    });
  };
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
      <Container>
        <ButtonRow onClick={goToNextPage} />
      </Container>
    </>
  );
}

SiteInformation.propTypes = {
  location: PropTypes.shape().isRequired,
};
