import { render, cleanup } from "@testing-library/react";
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
  it("renders 5 dropdowns", () => {
    const { container } = render(
      <BrowserRouter>
        <PropertyDetails1 />
      </BrowserRouter>
    );
    const inputs = container.querySelector("input");
    expect(inputs.length).toBe(5);
  });
  it("renders radio inputs", () => {
    const { container } = render(
      <BrowserRouter>
        <PropertyDetails1 />
      </BrowserRouter>
    );
    const inputs = container.querySelector("input");
  });
});
