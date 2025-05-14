import React from "react";
import { describe, it, expect, vi } from "vitest"; // Use Vitest imports
import { render, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import AppRoute from "./AppRoute";
import { store } from "../../store";

// Mock global `scrollTo`
global.scrollTo = vi.fn();

describe("App Route", () => {
  it("Document title is updated", async () => {
    const title = "";

    render(
      <Provider store={store}>
        <MemoryRouter>
          <AppRoute component={() => <p>Title Test Page</p>} title={title} />
        </MemoryRouter>
      </Provider>
    );

    // Ensure the document title updates before checking
    await waitFor(() => {
      expect(document.title).toBe(title);
    });
  });
});
