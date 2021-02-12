import { render, cleanup } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import SiteInformation from "./SiteInformation";

afterEach(cleanup);

const location = {
  state: {
    address: "305 Belleville St, Victoria, BC",
  },
};

describe("SiteInformation", () => {
  it("renders the portal header", () => {
    const { getByText } = render(
      <BrowserRouter>
        <SiteInformation location={location} />
      </BrowserRouter>
    );
    const headerTitle = getByText(/Portal/i);
    expect(headerTitle.textContent).toBe("Opportunity Portal");
  });
  it("renders the navigation header", () => {
    const { getByText } = render(
      <BrowserRouter>
        <SiteInformation location={location} />
      </BrowserRouter>
    );
    const navText = getByText(/Additional/i);
    expect(navText.textContent).toBe("Additional Info");
  });
  it("renders the Physical resource info", () => {
    const { getByText } = render(
      <BrowserRouter>
        <SiteInformation location={location} />
      </BrowserRouter>
    );
    const physical = getByText(/physical/i);
    expect(physical).toBeInTheDocument();
  });
  it("renders the Previous page link", () => {
    const { getByText, container } = render(
      <BrowserRouter>
        <SiteInformation location={location} />
      </BrowserRouter>
    );
    const link = getByText(/previous/i);
    expect(link).toBeInTheDocument();
  });
});
