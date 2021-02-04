import { render, cleanup } from "@testing-library/react";
import EDODashboard from "./EDODashboard";

afterEach(cleanup);

describe("EDODashboard", () => {
  it("Renders a clickable next button", () => {
    const { getByText } = render(<EDODashboard />);
    expect(getByText(/next/i).textContent).toBe("Next");
  });
});
