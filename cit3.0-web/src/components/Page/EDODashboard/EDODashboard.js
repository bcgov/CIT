import { Button } from "shared-components";
import { useHistory } from "react-router-dom";

export default function EDODashboard() {
  const history = useHistory();

  const goToMap = () => {
    history.push("/addOpportunity");
  };

  return (
    <div>
      <Button onClick={goToMap} label="Next" styling="bcgov-normal-blue btn" />
    </div>
  );
}
