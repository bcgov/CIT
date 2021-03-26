import { render, cleanup } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import SiteInformation from "./SiteInformation";
import { store } from "../../../store";

afterEach(cleanup);

const location = {
  state: {
    address: "305 Belleville St, Victoria, BC",
  },
};

describe("SiteInformation", () => {
  it("renders the navigation header", () => {
    const { getByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <SiteInformation location={location} />
        </BrowserRouter>
      </Provider>
    );
    const navText = getByText(/Additional/i);
    expect(navText.textContent).toBe("Additional Info");
  });
  it("renders the Physical resource info", () => {
    const { getByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <SiteInformation location={location} />
        </BrowserRouter>
      </Provider>
    );
    const physical = getByText(/physical/i);
    expect(physical).toBeInTheDocument();
  });
  it("renders the Previous page link", () => {
    const { getByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <SiteInformation location={location} />
        </BrowserRouter>
      </Provider>
    );
    const link = getByText(/previous/i);
    expect(link).toBeInTheDocument();
  });
});
