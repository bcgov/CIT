import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { Alert } from "shared-components";
import PortalHeader from "../../Headers/PortalHeader/PortalHeader";
import NavigationHeader from "../../Headers/NavigationHeader/NavigationHeader";
import OpportunityView from "../../OpportunityView/OpportunityView";
import ButtonRow from "../../ButtonRow/ButtonRow";
import "./SiteInformation.css";

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
      <NavigationHeader currentStep={2} />
      <Alert
        className="container"
        icon={
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 24 24"
            size="32"
            height="32"
            width="32"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
          </svg>
        }
        type="warning"
        styling="bcgov-warning-background"
        element="This shows you all the information we could collect from many open
        source BC Gov. databases"
      />
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
