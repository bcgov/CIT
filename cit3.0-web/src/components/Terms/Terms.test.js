import { render, screen, cleanup } from "@testing-library/react";
import Terms from "./Terms";

afterEach(cleanup);

const setAgreed = jest.fn();

describe("Terms of Use", () => {
  it("should mount", () => {
    render(<Terms setAgreed={setAgreed} />);

    const TermsText = screen.getByText(/Terms of Use/i);

    expect(TermsText).toBeInTheDocument();
  });
  it("should have a checked checkbox if agreed=true", () => {
    render(<Terms setAgreed={setAgreed} agreed />);
    const checkbox = screen.getByLabelText("I agree to the Terms of Use");
    expect(checkbox.checked).toBe(true);
  });
});
