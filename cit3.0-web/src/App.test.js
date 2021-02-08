import { render, screen } from "@testing-library/react";
import axios from "axios";
import App from "./App";

test("renders text in header", () => {
  axios.get.mockResolvedValueOnce({
    data: {
      results: [],
    },
  });

  render(<App />);
  const linkElement = screen.getByText(/Community Information Tool/i);
  expect(linkElement).toBeInTheDocument();
});
