import PropTypes from "prop-types";
import { Container, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import PortalHeader from "../../Headers/PortalHeader/PortalHeader";
import NavigationHeader from "../../Headers/NavigationHeader/NavigationHeader";
import OpportunityView from "../../OpportunityView/OpportunityView";
import ButtonRow from "../../ButtonRow/ButtonRow";

export default function SiteInformation({ location }) {
  const history = useHistory();
  const goToNextPage = () => {
    history.push({
      pathname: `propDetails1`,
      state: { stuff: "stuff" },
    });
  };

  // this page will run the searches and pass the data to opportunity view and map
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
      <ButtonRow
        showPrevious
        prevRoute="/addOpportunity"
        onClick={goToNextPage}
      />
    </>
  );
}

SiteInformation.propTypes = {
  location: PropTypes.shape().isRequired,
};
