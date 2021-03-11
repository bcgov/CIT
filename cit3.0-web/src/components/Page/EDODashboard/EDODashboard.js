import { useState, useEffect } from "react";
import { Button } from "shared-components";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./EDODashboard.css";
import { useDispatch } from "react-redux";
import OpportunityTable from "../../OpportunityTable/OpportunityTable";
import { resetOpportunity } from "../../../store/actions/opportunity";
import { GET_OPPORTUNITIES_LIST_URL } from "../../../store/constants/api-urls";

export default function EDODashboard() {
  const [tableData, setTableData] = useState(null);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(GET_OPPORTUNITIES_LIST_URL)
      .then((data) => {
        setTableData(data.data.results);
      })
      .catch((err) => {
        /* eslint-disable-next-line */
        console.error(err);
        setTableData([]);
      });
  }, []);

  const goToMap = () => {
    dispatch(resetOpportunity());
    history.push("/opportunity");
  };

  let dataSection;
  let addOpportunityButton;

  if (!tableData) {
    dataSection = null;
    addOpportunityButton = null;
  } else if (tableData.length === 0) {
    dataSection = (
      <>
        <h1 className="dashboard-header">
          Your Community Promoted Opportunities
        </h1>
        <p className="dashboard-text">
          As soon as you add opportunities, you can see the status and manage
          them here.
        </p>
      </>
    );
    addOpportunityButton = (
      <Button
        onClick={goToMap}
        label="Add your first opportunity"
        styling="bcgov-normal-blue btn"
      />
    );
  } else {
    dataSection = (
      <>
        <h1 className="dashboard-header">
          {"Your Promoted Opportunities in <community_name>"}
        </h1>
        <OpportunityTable tableData={tableData} />
      </>
    );
    addOpportunityButton = (
      <Button
        onClick={goToMap}
        label="+ Add your opportunity"
        styling="bcgov-normal-blue btn"
      />
    );
  }

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-header">How it works</h1>
      <p className="dashboard-text">
        We invite you to promote up to 5 opportunities for investment in your
        community. We will guide you through this simple 3 step process. Once
        your opportunity is added, you will get to review it before submitting
        it for review. It usually takes about 3-5 business days to get your
        opportunity reviewed and live on our Investor Portal. You can view your
        opportunities and update them on your dashboard below.
      </p>
      <div className="add-opportunity-button">{addOpportunityButton}</div>
      <hr />
      {dataSection}
    </div>
  );
}
