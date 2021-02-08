import { act, render } from "@testing-library/react";
import axios from "axios";
import App from "./App";

test("renders text in header", async () => {
  const promise = Promise.resolve();

  axios.get.mockResolvedValueOnce({
    data: {
      results: [],
    },
  });

  const { getByText } = render(<App />);
  const linkElement = getByText(/Community Information Tool/i);
  expect(linkElement).toBeInTheDocument();
  await act(async () => promise);
});
