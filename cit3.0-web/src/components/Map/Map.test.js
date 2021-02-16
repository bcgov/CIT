import { render, cleanup } from "@testing-library/react";
import Map from "./Map";

afterEach(cleanup);

const coords = [49.2827, -123.1207];

describe("Map component", () => {
  it("renders the noninteractive map states", () => {
    const { queryByText } = render(
      <Map coords={coords} isInteractive={false} />
    );
    expect(queryByText(/leaflet/i)).toBeNull();
  });
});
