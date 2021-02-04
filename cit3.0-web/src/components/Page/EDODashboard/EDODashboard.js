import { Button } from "shared-components";
import { useHistory } from "react-router-dom";
import "./EDODashboard.css";

export default function EDODashboard() {
  const history = useHistory();

  const goToMap = () => {
    history.push("/addInvestment");
  };

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
      <p className="dashboard-text">
        As soon as you add opportunities, you can see the status and manage them
        here.
      </p>
    </div>
  );
}
