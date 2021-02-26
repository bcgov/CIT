import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { Alert } from "shared-components";
import { MdError } from "react-icons/md";
import { Container } from "react-bootstrap";
import PortalHeader from "../../Headers/PortalHeader/PortalHeader";
import NavigationHeader from "../../Headers/NavigationHeader/NavigationHeader";
import OpportunityView from "../../OpportunityView/OpportunityView";
import ButtonRow from "../../ButtonRow/ButtonRow";
import "./SiteInformation.css";

export default function SiteInformation({ location }) {
  document.title = `Investments - Add Opportunity - Site Information`;
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
