import { render, cleanup } from "@testing-library/react";
import EDODashboard from "./EDODashboard";

afterEach(cleanup);

describe("EDODashboard", () => {
  it("Renders a clickable next button", () => {
    const { getByText } = render(<EDODashboard />);
    expect(getByText(/Add your first/i).textContent).toBe(
      "Add your first opportunity"
    );
  });

  it("Renders how it works blurb", () => {
    const { getByText } = render(<EDODashboard />);
    expect(getByText(/How it /i).textContent).toBe("How it works");
    expect(getByText(/We invite you to/i).textContent).toContain(
      "We invite you to promote up to 5 opportunities for investment"
    );
  });
});
