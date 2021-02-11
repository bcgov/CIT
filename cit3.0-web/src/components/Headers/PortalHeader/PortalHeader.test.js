import { render, cleanup } from "@testing-library/react";
import PortalHeader from "./PortalHeader";

afterEach(cleanup);

const title = "Opportunity Portal";
const text = "Description";

describe("Portal Header", () => {
  it("renders the header for the Investment Opportunity Portal", () => {
    const { getByText } = render(<PortalHeader title={title} text={text} />);
    const portalTitle = getByText(/Opportunity/i);
    expect(portalTitle.textContent).toBe(title);
  });
  it("renders the text for the Investment Opportunity Portal", () => {
    const { getByText } = render(<PortalHeader title={title} text={text} />);
    const portalText = getByText(/Description/i);
    expect(portalText.textContent).toBe(text);
  });
});
