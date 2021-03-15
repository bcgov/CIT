import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { Provider } from "react-redux";
import AppRoute from "./AppRoute";
import { store } from "../../store";

const history = createMemoryHistory();

describe("App Route", () => {
  it("Document title is updated", () => {
    const title = "Test Title";
    const container = document.createElement("div");
    document.body.appendChild(container);
    act(() => {
      ReactDOM.render(
        <Provider store={store}>
          <Router history={history}>
            <AppRoute component={() => <p>Title Test Page</p>} title={title} />
          </Router>
        </Provider>,
        container
      );
    });

    expect(document.title).toBe("Test Title");
  });
});
