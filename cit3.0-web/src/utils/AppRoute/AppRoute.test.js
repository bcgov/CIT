import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import AppRoute from "./AppRoute";

const history = createMemoryHistory();

describe("App Route", () => {
  it("Document title is updated", () => {
    const title = "Test Title";
    const container = document.createElement("div");
    document.body.appendChild(container);
    act(() => {
      ReactDOM.render(
        <Router history={history}>
          <AppRoute component={() => <p>Title Test Page</p>} title={title} />
        </Router>,
        container
      );
    });

    expect(document.title).toBe("Test Title");
  });
});
