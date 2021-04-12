import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { Container } from "react-bootstrap";
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

  return (
    <>
      <NavigationHeader currentStep={2} />
      <Container className="p-0 mt-3">
        <Alert
          type="warning"
          styling="bcgov-warning-background"
          element="Proximity (distance to) information is populated from available B.C. Open Data sources and cannot be edited. Data is presented for reference use only. All information should be verified independently before being used or relied upon. The Province of British Columbia does not guarantee the quality, accuracy, completeness or timeliness of this information."
        />
      </Container>
      <OpportunityView data={location.state} />
      <ButtonRow showPrevious prevRoute="/opportunity" onClick={goToNextPage} />
    </>
  );
}

SiteInformation.propTypes = {
  location: PropTypes.shape().isRequired,
};
