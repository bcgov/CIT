import { render, cleanup } from "@testing-library/react";
import { Provider } from "react-redux";
import AddOpportunity from "./AddOpportunity";
import { store } from "../../../store";

afterEach(cleanup);

describe("AddOpportunity", () => {
  it("renders the Continue Button", () => {
    const { getByText } = render(
      <Provider store={store}>
        <AddOpportunity match={{}} />
      </Provider>
    );
    const continueButton = getByText("Continue");
    expect(continueButton).toBeInTheDocument();
  });
  it("renders the Cancel Button", () => {
    const { getByText } = render(
      <Provider store={store}>
        <AddOpportunity match={{}} />
      </Provider>
    );
    const cancel = getByText(/Cancel/i);
    expect(cancel).toBeInTheDocument();
  });
  it("renders the Address Search bar", () => {
    const { container } = render(
      <Provider store={store}>
        <AddOpportunity match={{}} />
      </Provider>
    );
    const addressInput = container.querySelector("input");
    expect(addressInput).toBeInTheDocument();
  });
  it("renders the navigation header", () => {
    const { getByText } = render(
      <Provider store={store}>
        <AddOpportunity match={{}} />
      </Provider>
    );
    const navItem = getByText("Additional Info");
    expect(navItem).toBeInTheDocument();
  });
  it("renders the Page Title Header", () => {
    const { getByText } = render(
      <Provider store={store}>
        <AddOpportunity match={{}} />
      </Provider>
    );
    const addOp = getByText("Add an Opportunity");
    expect(addOp).toBeInTheDocument();
  });
  it("renders the Map", () => {
    const { getByText } = render(
      <Provider store={store}>
        <AddOpportunity match={{}} />
      </Provider>
    );
    expect(getByText(/leaflet/i).textContent).toBe("Leaflet");
  });
});
