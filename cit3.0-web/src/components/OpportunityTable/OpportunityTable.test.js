import { render } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { Provider } from "react-redux";
import OpportunityTable from "./OpportunityTable";
import { store } from "../../store";

const tableData = [
  {
    id: 1,
    opportunity_address: "1234 Test Pl.",
    point: "SRID=3005;POINT (-123.8687427 48.4774108)",
    approval_status: "PEND",
    date_created: "2021-02-16T17:34:38.184663Z",
  },
  {
    id: 2,
    opportunity_address: "5678 Test Ave.",
    point: "SRID=3005;POINT (-123.369984 48.452708)",
    approval_status: "PUBL",
    date_created: "2021-02-16T17:34:38.184663Z",
  },
  {
    id: 3,
    opportunity_address: "9999 Test Rd.",
    point: "SRID=3005;POINT (-123.3721727 48.4527115)",
    approval_status: "NEW",
    date_created: "2021-02-16T17:34:38.184663Z",
  },
  {
    id: 4,
    opportunity_address: "5555 Test St.",
    point: "SRID=3005;POINT (-123.3721727 48.4527115)",
    approval_status: "NCOM",
    date_created: "2021-02-16T17:34:38.184663Z",
  },
];
const history = createMemoryHistory();

describe("OpportunityTable", () => {
  it("displays the opportunity data", () => {
    const { getByText } = render(
      <Provider store={store}>
        <Router history={history}>
          <OpportunityTable tableData={tableData} />
        </Router>
      </Provider>
    );

    expect(getByText(/1234/i).textContent).toBe("1234 Test Pl.");
    expect(getByText(/5678/i).textContent).toBe("5678 Test Ave.");
    expect(getByText(/9999/i).textContent).toBe("9999 Test Rd.");
    expect(getByText(/5555/i).textContent).toBe("5555 Test St.");
  });

  it("colour codes the status based on the status value", () => {
    const { getByText } = render(
      <Provider store={store}>
        <Router history={history}>
          <OpportunityTable tableData={tableData} />
        </Router>
      </Provider>
    );

    expect(getByText(/Published/i)).toHaveClass("status-text-green");
    expect(getByText(/Pending Review/i)).toHaveClass("status-text-orange");
    expect(getByText(/New/i)).toHaveClass("status-text-green");
    expect(getByText(/Not completed/i)).toHaveClass("status-text-red");
  });

  it("displays the option to mark as closed for published opportunities", () => {
    const { getByText } = render(
      <Provider store={store}>
        <Router history={history}>
          <OpportunityTable tableData={tableData} />
        </Router>
      </Provider>
    );

    expect(getByText(/Closed/i).textContent).toBe("Closed");
  });
});
