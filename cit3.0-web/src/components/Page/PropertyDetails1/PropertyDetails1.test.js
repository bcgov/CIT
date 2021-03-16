import { render, cleanup, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import axios from "axios";
import PropertyDetails1 from "./PropertyDetails1";
import { store } from "../../../store";

afterEach(cleanup);

beforeEach(() => {
  axios.get.mockResolvedValueOnce({
    statuses: ["Sale", "Lease"],
    regionalDistricts: ["district1"],
    landUseZoning: ["agricultural"],
    preferredDevelopment: ["agricultural"],
    propertyStatuses: ["sale"],
  });
});

describe("Property Details1", () => {
  it("renders the PageTitleHeader component", () => {
    const { getByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <PropertyDetails1 />
        </BrowserRouter>
      </Provider>
    );
    const pageTitle = getByText(/Enter/i);
    expect(pageTitle.textContent).toBe("Enter Property Details");
  });
  it("renders all inputs", () => {
    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <PropertyDetails1 />
        </BrowserRouter>
      </Provider>
    );
    const inputs = container.querySelectorAll("input");
    expect(inputs.length).toBe(19);
  });
  it("renders a select with an associated label", () => {
    const { getByLabelText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <PropertyDetails1 />
        </BrowserRouter>
      </Provider>
    );
    const propStatus = getByLabelText("Sale or Lease");
    fireEvent.change(propStatus, { target: { value: "sale" } });
    expect(propStatus.value).toBe("sale");
  });
});
