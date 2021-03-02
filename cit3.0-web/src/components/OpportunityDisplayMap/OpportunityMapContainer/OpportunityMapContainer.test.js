import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import OpportunityMapContainer from "./OpportunityMapContainer";

describe("OpportunityMapContainer", () => {
  it("renders a map", () => {
    axios.get.mockResolvedValueOnce({
      id: 1,
      opportunity_address: "1234 Test Pl.",
      point: "SRID=4326;POINT (-123.8687427 48.4774108)",
      approval_status: "PEND",
      date_created: "2021-02-16T17:34:38.184663Z",
    });
    const { getByText } = render(
      <OpportunityMapContainer totalCount={5} setTotalCount={jest.fn} />
    );

    expect(getByText(/leaflet/i).textContent).toBe("Leaflet");
    expect(axios.get).toHaveBeenCalledTimes(1);
  });
  it("renders the close map button when map is showing", () => {
    axios.get.mockResolvedValueOnce({
      id: 1,
      opportunity_address: "1234 Test Pl.",
      point: "SRID=4326;POINT (-123.8687427 48.4774108)",
      approval_status: "PEND",
      date_created: "2021-02-16T17:34:38.184663Z",
    });
    render(<OpportunityMapContainer totalCount={5} setTotalCount={jest.fn} />);
    expect(screen.getByText(/leaflet/i)).toBeInTheDocument();
    expect(screen.getByTestId("close-map-icon")).toBeInTheDocument();
  });
  it("hides the map on close-map click", async () => {
    axios.get.mockResolvedValueOnce({
      id: 1,
      opportunity_address: "1234 Test Pl.",
      point: "SRID=4326;POINT (-123.8687427 48.4774108)",
      approval_status: "PEND",
      date_created: "2021-02-16T17:34:38.184663Z",
    });
    render(<OpportunityMapContainer totalCount={5} setTotalCount={jest.fn} />);
    const closeIcon = screen.getByTestId("close-map-icon");
    fireEvent.click(closeIcon);
    await waitFor(() => screen.getByTestId("show-map-icon"));
    setTimeout(() => {
      expect(screen.getByText(/leaflet/i)).not.toBeInTheDocument();
    }, 500);
  });
  it("renders the show map button when map is hidden", async () => {
    axios.get.mockResolvedValueOnce({
      id: 1,
      opportunity_address: "1234 Test Pl.",
      point: "SRID=4326;POINT (-123.8687427 48.4774108)",
      approval_status: "PEND",
      date_created: "2021-02-16T17:34:38.184663Z",
    });
    render(<OpportunityMapContainer totalCount={5} setTotalCount={jest.fn} />);
    const closeIcon = screen.getByTestId("close-map-icon");
    fireEvent.click(closeIcon);
    await waitFor(() => screen.getByTestId("show-map-icon"));
    const showIcon = screen.getByTestId("show-map-icon");
    expect(showIcon).toBeInTheDocument();
    expect(closeIcon).not.toBeInTheDocument();
  });
});
