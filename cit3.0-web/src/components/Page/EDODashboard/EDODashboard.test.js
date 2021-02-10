import { render, cleanup, waitFor } from "@testing-library/react";
import axios from "axios";
import EDODashboard from "./EDODashboard";

afterEach(cleanup);

describe("EDODashboard", () => {
  it("Renders a clickable next button", async () => {
    axios.get.mockResolvedValueOnce({
      data: {
        results: [],
      },
    });

    const { getByText } = render(<EDODashboard />);
    expect(axios.get).toHaveBeenCalledTimes(1);
    await waitFor(() => {
      expect(getByText(/Add your first/i).textContent).toBe(
        "Add your first opportunity"
      );
    });
  });

  it("Renders how it works blurb", () => {
    axios.get.mockResolvedValueOnce({
      data: {
        results: [],
      },
    });

    const { getByText } = render(<EDODashboard />);
    expect(getByText(/How it /i).textContent).toBe("How it works");
    expect(getByText(/We invite you to/i).textContent).toContain(
      "We invite you to promote up to 5 opportunities for investment"
    );
  });

  it("Displays a message if there are no opportunities entered", async () => {
    axios.get.mockResolvedValueOnce({
      data: {
        results: [],
      },
    });

    const { getByText } = render(<EDODashboard />);
    await waitFor(() => {
      expect(getByText(/As soon as you add/i).textContent).toContain(
        "As soon as you add opportunities, you can see"
      );
    });
  });

  it("Displays a table of opportunities if opportunities have been previously entered", async () => {
    axios.get.mockResolvedValueOnce({
      data: {
        results: [
          {
            id: 1,
            address: "1234 Test Pl.",
            point: "SRID=4326;POINT (90 -90)",
          },
          {
            id: 2,
            address: "5678 Test Ave.",
            point: "SRID=4326;POINT (20 -40)",
          },
          {
            id: 3,
            address: "9999 Test Rd.",
            point: "SRID=4326;POINT (20 -40)",
          },
        ],
      },
    });

    const { getByText } = render(<EDODashboard />);
    await waitFor(() => {
      expect(getByText(/1234/i).textContent).toBe("1234 Test Pl.");
      expect(getByText(/5678/i).textContent).toBe("5678 Test Ave.");
      expect(getByText(/9999/i).textContent).toBe("9999 Test Rd.");
    });
  });
});
