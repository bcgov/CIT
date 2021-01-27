import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders text in header", () => {
  render(<App />);
  const linkElement = screen.getByText(/Community/i);
  expect(linkElement).toBeInTheDocument();
});
