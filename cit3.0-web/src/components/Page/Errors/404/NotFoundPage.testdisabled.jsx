import React from "react";
import { describe, it, expect } from "vitest"; // Import Vitest functions
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NotFoundPage from "./NotFoundPage";

describe("NotFoundPage", () => {
  it("renders correctly", () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );

    const notFoundPage = screen.getByTestId("NotFoundPage");
    expect(notFoundPage).toBeInTheDocument();
  });
});
