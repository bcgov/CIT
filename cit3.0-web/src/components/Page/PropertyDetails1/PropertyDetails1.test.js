import { render, cleanup, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import PropertyDetails1 from "./PropertyDetails1";

afterEach(cleanup);

describe("Property Details1", () => {
  it("renders the PageTitleHeader component", () => {
    const { getByText } = render(
      <BrowserRouter>
        <PropertyDetails1 />
      </BrowserRouter>
    );
    const pageTitle = getByText(/Enter/i);
    expect(pageTitle.textContent).toBe("Enter Property Details");
  });
  it("renders all inputs", () => {
    const { container } = render(
      <BrowserRouter>
        <PropertyDetails1 />
      </BrowserRouter>
    );
    const inputs = container.querySelectorAll("input");
    expect(inputs.length).toBe(19);
  });
  it("renders a select with an associated label", () => {
    const { getByLabelText } = render(
      <BrowserRouter>
        <PropertyDetails1 />
      </BrowserRouter>
    );
    const propStatus = getByLabelText("Sale or Lease");
    fireEvent.change(propStatus, { target: { value: "sale" } });
    expect(propStatus.value).toBe("sale");
  });
});
