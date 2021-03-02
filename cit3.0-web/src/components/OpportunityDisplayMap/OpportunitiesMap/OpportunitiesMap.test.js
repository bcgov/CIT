import React from "react";
import { render, screen } from "@testing-library/react";
import OpportunitiesMap from "./OpportunitiesMap";

describe("OpportunitiesMap", () => {
  describe("Layout", () => {
    it("renders a map", () => {
      render(<OpportunitiesMap />);
      expect(screen.getByText(/leaflet/i).textContent).toBe("Leaflet");
    });
  });
});
