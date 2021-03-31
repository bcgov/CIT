import "./UserManagementDashboard.css";
import UserTable from "../../UserTable/UserTable";
import { getUsers } from "../../../store/actions/user";
import UserFactory from "../../../store/factory/UserFactory";

export default function UserManagementDashboard() {
  const userList = [];

  const tableData = [
    {
      municipalities: [],
      regional_districts: [
        {
          id: 12,
          name: "Squamish-Lillooet Regional District",
        },
      ],
      id: 2,
      name: "John Smith",
      email: "John.Smith@Test.ca",
      date_created: "2021-Mar-25",
    },
    {
      municipalities: [
        {
          id: 15,
          name: "Whistler",
        },
      ],
      regional_districts: [
        {
          id: 22,
          name: "Comox Valley Regional District",
        },
      ],
      id: 1,
      name: "Jane Doe",
      email: "Jane.Doe@test.com",
      date_created: "2021-Mar-25",
    },
  ];

  // userList.data.map((user) =>
  //   UserFactory.createStateFromResponse(user)
  // );

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-header">EDO to Community Association</h1>
      <hr />
      <UserTable tableData={tableData} />
    </div>
  );
}
