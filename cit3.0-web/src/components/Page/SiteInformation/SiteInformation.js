import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { Spinner, Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Alert } from "shared-components";
import { MdError } from "react-icons/md";

import NavigationHeader from "../../Headers/NavigationHeader/NavigationHeader";
import OpportunityView from "../../OpportunityView/OpportunityView";
import ButtonRow from "../../ButtonRow/ButtonRow";
import "./SiteInformation.css";

export default function SiteInformation({ location }) {
  document.title = `Investments - Add Opportunity - Site Information`;
  const history = useHistory();
  const goToNextPage = () => {
    history.push(`/opportunity/property-details`);
  };

  const municipality = useSelector((state) => state.opportunity.municipality);
  console.log(municipality);

  // this page will run the searches and pass the data to opportunity view and map
  return (
    <>
      <NavigationHeader currentStep={2} />
      {municipality.name ? (
        <>
          <Container className="p-0 mt-3">
            <Alert
              icon={<MdError size={32} />}
              type="warning"
              styling="bcgov-warning-background"
              element="This shows you all the information we could collect from many open
        source BC Gov. databases"
            />
          </Container>
          <OpportunityView data={location.state} />
          <ButtonRow
            showPrevious
            prevRoute="/opportunity"
            onClick={goToNextPage}
          />
        </>
      ) : (
        <Container className="spinner-container d-flex flex-column justify-content-center align-items-center">
          <Col className="d-flex flex-column justify-content-center align-items-center">
            <h1>Loading location data for your opportunity...</h1>
            <Spinner
              className="my-4 bc-spinner"
              animation="border"
              role="status"
            />
            <h2>Please wait as this may take several moments</h2>
          </Col>
        </Container>
        //
      )}
    </>
  );
}

SiteInformation.propTypes = {
  location: PropTypes.shape().isRequired,
};
