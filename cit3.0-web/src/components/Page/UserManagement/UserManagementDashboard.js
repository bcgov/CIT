import "./UserManagementDashboard.css";
import UserTable from "../../UserTable/UserTable";

export default function UserManagementDashboard() {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-header">EDO to Community Association</h1>
      <UserTable />
    </div>
  );
}
