import "bootstrap/dist/css/bootstrap.css";
import "@bcgov/bootstrap-theme/dist/css/bootstrap-theme.min.css";
import { Provider } from "react-redux";
import { store } from "../src/store/index";

export const decorators = [
  (Story) => (
    <Provider store={store}><Story /></Provider>
  ),
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
};