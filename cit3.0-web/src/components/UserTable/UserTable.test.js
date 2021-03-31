import { render } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { Provider } from "react-redux";
import UserTable from "./UserTable";
import { store } from "../../store";

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
const history = createMemoryHistory();

describe("UserTable", () => {
  it("displays the user data", () => {
    const { getByText } = render(
      <Provider store={store}>
        <Router history={history}>
          <UserTable tableData={tableData} />
        </Router>
      </Provider>
    );

    expect(getByText(/Jane.Doe/i).textContent).toBe("Jane.Doe@test.com");
    expect(getByText(/John.Smith/i).textContent).toBe("John.Smith@Test.ca");
    expect(getByText(/Squamish-Lillooet/i).textContent).toBe(
      "Squamish-Lillooet Regional District"
    );
    expect(getByText(/Whistler/i).textContent).toBe("Whistler");
  });
});
