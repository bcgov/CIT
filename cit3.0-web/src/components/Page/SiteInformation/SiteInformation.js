import PropTypes from "prop-types";
import { useHistory, Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Alert } from "shared-components";
import { useDispatch } from "react-redux";

import NavigationHeader from "../../Headers/NavigationHeader/NavigationHeader";
import OpportunityView from "../../OpportunityView/OpportunityView";
import ButtonRow from "../../ButtonRow/ButtonRow";
import { resetOpportunity } from "../../../store/actions/opportunity";
import "./SiteInformation.css";

export default function SiteInformation({ location }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const goToNextPage = () => {
    history.push(`/investmentopportunities/property-details`);
  };

  const onCancelClick = () => {
    dispatch(resetOpportunity());
    history.push("/investmentopportunities/dashboard");
  };

  return (
    <>
      <NavigationHeader currentStep={2} />
      <Container className="p-0 mt-3">
        <Alert
          icon={<></>}
          type="warning"
          styling="bcgov-warning-background"
          element={
            <span>
              Your listing will include the following location and proximity
              data available from
              <span>
                {" "}
                <Link to="/investmentopportunities/datasources">
                  open data sources.
                </Link>
              </span>{" "}
              You will be able to add additional data to your listing in the
              next steps, including site servicing information. The remainder of
              the information is not editable and is provided for reference
              only. Proximity details are provided in straight-line distances.
              All information should be verified independently before being used
              or relied upon. The Province of British Columbia does not
              guarantee the quality, accuracy, completeness or timeliness of
              this information.
            </span>
          }
        />
      </Container>
      <OpportunityView data={location.state} />
      <ButtonRow
        showPrevious
        prevRoute="/investmentopportunities/add"
        onClick={goToNextPage}
        onCancelClick={onCancelClick}
      />
    </>
  );
}

SiteInformation.propTypes = {
  location: PropTypes.shape().isRequired,
};
