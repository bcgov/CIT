import { render, cleanup } from "@testing-library/react";
import { Provider } from "react-redux";
import Map from "./Map";
import { store } from "../../store";

afterEach(cleanup);

const coords = [49.2827, -123.1207];

describe("Map component", () => {
  it("renders the noninteractive map states", () => {
    const { queryByText } = render(
      <Provider store={store}>
        <Map coords={coords} isInteractive={false} />
      </Provider>
    );
    expect(queryByText(/leaflet/i)).toBeNull();
  });
});
