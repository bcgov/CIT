import { render, cleanup } from "@testing-library/react";
import NavigationHeaderItem from "./NavigationHeaderItem";

afterEach(cleanup);

describe("Navigation Header Item", () => {
  it("renders a Navigation Header Item with the given label", () => {
    const { getByText } = render(
      <NavigationHeaderItem currentStep={1} step={1} label="Location" />
    );
    const item = getByText(/Location/i);
    expect(item.textContent).toBe("Location");
  });
  it("renders a Navigation Header Item with the given step value", () => {
    const { getByText } = render(
      <NavigationHeaderItem currentStep={1} step={1} label="Location" />
    );
    const item = getByText(/1/i);
    expect(item.textContent).toBe("1");
  });
});
