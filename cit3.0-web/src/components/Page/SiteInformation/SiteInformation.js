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
    history.push(`/investmentopportunities/property-details`);
  };

  return (
    <>
      <NavigationHeader currentStep={2} />
      <Container className="p-0 mt-3">
        <Alert
          icon={<></>}
          type="warning"
          styling="bcgov-warning-background"
          element="Your listing will include the following location and proximity data available from open data sources. You will be able to add additional data to your listing in the next steps, including site servicing information. The remainder of the information is not editable and is provided for reference only. Proximity details are provided in straight-line distances. All information should be verified independently before being used or relied upon. The Province of British Columbia does not guarantee the quality, accuracy, completeness or timeliness of this information."
        />
      </Container>
      <OpportunityView data={location.state} />
      <ButtonRow
        showPrevious
        prevRoute="/investmentopportunities/add"
        onClick={goToNextPage}
      />
    </>
  );
}

SiteInformation.propTypes = {
  location: PropTypes.shape().isRequired,
};
