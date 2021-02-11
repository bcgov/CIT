import { render, cleanup } from "@testing-library/react";
import NavigationHeader from "./NavigationHeader";

afterEach(cleanup);

const navItems = [
  "Location",
  "Property Details",
  "Additional Info",
  "Review & Submit",
];

describe("Navigation Header", () => {
  it("renders a column", () => {
    const { container } = render(<NavigationHeader navItems={navItems} />);
    expect(container.firstChild).toHaveClass("col");
  });
  it("renders 4 navItems", () => {
    const { container } = render(<NavigationHeader navItems={navItems} />);
    const childCol = container.firstChild;
    const childRow = childCol.firstChild;
    expect(childRow.childElementCount).toBe(4);
  });
  it("renders the first Item in navItems", () => {
    const { getByText } = render(<NavigationHeader navItems={navItems} />);
    const item = getByText(navItems[0]);
    expect(item).toBeInTheDocument();
  });
});
