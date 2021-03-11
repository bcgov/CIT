import "bootstrap/dist/css/bootstrap.css";
import "@bcgov/bootstrap-theme/dist/css/bootstrap-theme.min.css";
import "../src/index.css";
import "../src/App.css";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { store } from "../src/store/index";

export const decorators = [
  (Story) => (
    <Provider store={store}>
      <Router>
        <Story />
      </Router>
    </Provider>
  ),
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
};