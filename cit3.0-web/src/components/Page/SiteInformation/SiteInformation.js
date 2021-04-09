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
          icon={<MdError size={32} />}
          type="warning"
          styling="bcgov-warning-background"
          element="This shows you all the information we could collect from many open
        source BC Gov. databases"
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
