import React from "react";
import "@bcgov/bootstrap-theme/dist/css/bootstrap-theme.min.css";
import "bootstrap/dist/css/bootstrap.css";

import { action } from "@storybook/addon-actions";
import ButtonRow from "./ButtonRow";

export default {
  title: "Button Row",
  component: ButtonRow,
};

export const ButtonRowContinueDisabled = () => (
  <ButtonRow
    noContinue
    onClick={() => action("clicked")}
    onCancelClick={() => action("clicked")}
  />
);

export const ButtonRowContinueEnabled = () => (
  <ButtonRow
    noContinue={false}
    onClick={() => action("clicked")}
    onCancelClick={() => action("clicked")}
  />
);

export const ButtonRowWithPreviousPageLink = () => (
  <ButtonRow
    noContinue={false}
    prevRoute="/investmentopportunities/property-details"
    onClick={() => action("clicked")}
    onCancelClick={() => action("clicked")}
  />
);
