import { render, cleanup } from "@testing-library/react";
import AddOpportunity from "./AddOpportunity";

afterEach(cleanup);

describe("AddOpportunity", () => {
  it("renders the Continue Button", () => {
    const { getByText } = render(<AddOpportunity match={{}} />);
    const continueButton = getByText("Continue");
    expect(continueButton).toBeInTheDocument();
  });
  it("renders the Cancel Button", () => {
    const { getByText } = render(<AddOpportunity match={{}} />);
    const cancel = getByText(/Cancel/i);
    expect(cancel).toBeInTheDocument();
  });
  it("renders the Address Search bar", () => {
    const { container } = render(<AddOpportunity match={{}} />);
    const addressInput = container.querySelector("input");
    expect(addressInput).toBeInTheDocument();
  });

  it("renders the Portal Header", () => {
    const { getByText } = render(<AddOpportunity match={{}} />);
    const headerText = getByText(/Portal/i);
    expect(headerText.textContent).toBe("Opportunity Portal");
  });
  it("renders the navigation header", () => {
    const { getByText } = render(<AddOpportunity match={{}} />);
    const navItem = getByText("Additional Info");
    expect(navItem).toBeInTheDocument();
  });
  it("renders the Page Title Header", () => {
    const { getByText } = render(<AddOpportunity match={{}} />);
    const addOp = getByText("Add an Opportunity");
    expect(addOp).toBeInTheDocument();
  });
  it("renders the Map", () => {
    const { getByText } = render(<AddOpportunity match={{}} />);
    expect(getByText(/leaflet/i).textContent).toBe("Leaflet");
  });
});
