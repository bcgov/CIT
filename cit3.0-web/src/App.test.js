import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders text in header", () => {
  render(<App />);
  const linkElement = screen.getByText(/Community Information Tool/i);
  expect(linkElement).toBeInTheDocument();
});
