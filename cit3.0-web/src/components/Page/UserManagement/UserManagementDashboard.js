import "./UserManagementDashboard.css";
import UserTable from "../../UserTable/UserTable";

export default function UserManagementDashboard() {
  return (
    <div className="user-container">
      <h1 className="user-header">EDO to Community Association</h1>
      <UserTable />
    </div>
  );
}
