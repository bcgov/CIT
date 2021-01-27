import { render, fireEvent, cleanup } from "@testing-library/react";
import axios from "axios";
import MapContainer from "./MapContainer";

afterEach(cleanup);

const address = "501 Belleville St, Victoria";
const changeEvent = (content) => ({
  target: {
    value: content,
  },
});

describe("MapContainer", () => {
  describe("Layout", () => {
    it("renders a map", () => {
      const { getByText } = render(<MapContainer />);
      expect(getByText(/leaflet/i).textContent).toBe("Leaflet");
    });

    it("has input for an address", () => {
      const { queryByPlaceholderText } = render(<MapContainer />);
      const addressInput = queryByPlaceholderText("Address");
      expect(addressInput).toBeInTheDocument();
    });

    it("has a search button", () => {
      const { container } = render(<MapContainer />);
      const searchButton = container.querySelector("button");
      expect(searchButton).toBeInTheDocument();
    });
  });

  describe("interactions", () => {
    it("sets the address into the state", () => {
      const { queryByPlaceholderText } = render(<MapContainer />);
      const addressInput = queryByPlaceholderText("Address");
      fireEvent.change(addressInput, changeEvent(address));
      expect(addressInput).toHaveValue(address);
    });
  });

  describe("api call", () => {
    it("returns data from axios call", async () => {
      axios.get.mockResolvedValueOnce({
        data: { coords: [49.2827, -123.1207] },
      });
      const { container, queryByPlaceholderText } = render(<MapContainer />);
      const searchButton = container.querySelector("button");
      const addressInput = queryByPlaceholderText("Address");
      fireEvent.change(addressInput, changeEvent(address));
      fireEvent.click(searchButton);
      expect(axios.get).toHaveBeenCalledTimes(1);
    });
  });
});
