import { render, cleanup } from "@testing-library/react";
import NavigationHeader from "./NavigationHeader";

afterEach(cleanup);

const navItems = [
  "Location",
  "View Data",
  "Property Details",
  "Additional Info",
  "Review & Submit",
];

describe("Navigation Header", () => {
  it("renders NavigationHeaderItems", () => {
    const { container } = render(
      <NavigationHeader currentStep={1} navItems={navItems} />
    );
    expect(container.firstChild.classList.contains("nav-item"));
  });
  it("renders 5 navItems", () => {
    const { queryAllByTestId } = render(
      <NavigationHeader currentStep={1} navItems={navItems} />
    );
    const items = queryAllByTestId("nav-item");
    expect(items.length).toBe(5);
  });
  it("renders the first Item in navItems", () => {
    const { getByText } = render(
      <NavigationHeader currentStep={1} navItems={navItems} />
    );
    const item = getByText(navItems[0]);
    expect(item).toBeInTheDocument();
  });
});
