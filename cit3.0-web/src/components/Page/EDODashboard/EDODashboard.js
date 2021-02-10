import { useState, useEffect } from "react";
import { Button } from "shared-components";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./EDODashboard.css";
import OpportunityTable from "../../OpportunityTable/OpportunityTable";

export default function EDODashboard() {
  const [tableData, setTableData] = useState(null);
  const history = useHistory();

  useEffect(() => {
    axios
      .get("/api/pipeline/investments")
      .then((data) => {
        setTableData(data.data.results);
      })
      .catch((err) => {
        console.log(err);
        setTableData([]);
      });
  }, []);

  const goToMap = () => {
    history.push("/addOpportunity");
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
