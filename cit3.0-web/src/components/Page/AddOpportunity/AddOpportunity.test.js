import { render, cleanup } from "@testing-library/react";
import AddOpportunity from "./AddOpportunity";

afterEach(cleanup);

describe("AddOpportunity", () => {
  it("renders the Continue Button", () => {
    const { getByText } = render(<AddOpportunity />);
    const continueButton = getByText("Continue");
    expect(continueButton).toBeInTheDocument();
  });
});
