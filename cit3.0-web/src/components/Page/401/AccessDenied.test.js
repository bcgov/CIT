import React from "react";
import { render, screen } from "@testing-library/react";
import AccessDenied from "./AccessDenied";

describe("AccessDenied", () => {
  it("renders correctly", () => {
    render(<AccessDenied />);
    const AccessDeniedPage = screen.getByTestId("AccessDeniedPage");
    expect(AccessDeniedPage).toBeInTheDocument();
  });
});
