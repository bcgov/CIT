import { useState, useEffect } from "react";
import { Button } from "shared-components";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./EDODashboard.css";
import OpportunityTable from "../../OpportunityTable/OpportunityTable";

export default function EDODashboard() {
  const [tableData, setTableData] = useState([]);
  const history = useHistory();

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/pipeline/investments")
      .then((data) => {
        setTableData(data.data.results);
      })
      .catch((err) => console.log(err));
  }, []);

  const goToMap = () => {
    history.push("/addOpportunity");
  };

  let dataSection;

  if (tableData.length === 0) {
    dataSection = (
      <p className="dashboard-text">
        As soon as you add opportunities, you can see the status and manage them
        here.
      </p>
    );
  } else {
    dataSection = <OpportunityTable tableData={tableData} />;
  }

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-header">How it works</h1>
      <p className="dashboard-text">
        We invite you to promote up to 5 opportunities for investment in your
        community. We will guide you through this simple 3 step process.
      </p>
      <div className="add-opportunity-button">
        <Button
          onClick={goToMap}
          label="Add your first opportunity"
          styling="bcgov-normal-blue btn"
        />
      </div>
      <hr />
      <h1 className="dashboard-header">
        Your Community Promoted Opportunities
      </h1>
      {dataSection}
    </div>
  );
}
