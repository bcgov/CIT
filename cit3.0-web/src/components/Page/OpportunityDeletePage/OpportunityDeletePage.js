import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Alert } from "shared-components/build/components/alert/Alert";
import { MdError } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { Container } from "react-bootstrap";
import OpportunityFactory from "../../../store/factory/OpportunityFactory";
import {
  deleteOpportunity,
  getOpportunity,
  resetOpportunity,
  setOpportunity,
} from "../../../store/actions/opportunity";
import ButtonRow from "../../ButtonRow/ButtonRow";
import TextInput from "../../FormComponents/TextInput";

const OpportunityDeletePage = ({ id }) => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const [confirmName, setConfirmName] = useState();
  const opportunity = useSelector((state) => state.opportunity);

  useEffect(() => {
    let opId = id;
    if (!id) {
      const found = location.pathname.match(/(\d+)+\/?$/);
      opId = found && parseInt(found[0], 10);
    }
    if (opId !== opportunity.id) {
      getOpportunity(opId).then((response) => {
        const opp = OpportunityFactory.createStateFromResponse(response.data);
        dispatch(setOpportunity(opp));
      });
    }
  }, []);

  const handleDeleteOpportunity = (e) => {
    deleteOpportunity(opportunity).then(() => {
      dispatch(resetOpportunity());
      history.goBack();
    });
    e.preventDefault();
  };

  return (
    <div data-testid="OpportunityDeletePage">
      <Container className="my-3">
        <Alert
          icon={<MdError size={32} />}
          type="error"
          styling="bcgov-error-background"
          element="Deleting an opportunity is permanent"
        />
        <h3 className="my-3">{opportunity.name}</h3>
        <h4 className="my-3">{opportunity.address}</h4>
        <TextInput
          heading="Type the Opportunity name to confirm deletion"
          name="confirm-name"
          value={confirmName}
          handleChange={(_, value) => setConfirmName(value)}
          rows={1}
        />
        <ButtonRow
          onClick={(e) => handleDeleteOpportunity(e)}
          continueLabel="Delete"
          noContinue={confirmName !== opportunity.name}
        />
      </Container>
    </div>
  );
};

OpportunityDeletePage.propTypes = { id: PropTypes.number };
OpportunityDeletePage.defaultProps = { id: 0 };

export default OpportunityDeletePage;
