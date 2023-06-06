import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import OpportunityApproveCallout from "./OpportunityApproveCallout";

storiesOf("OpportunityApproveCallout", module).add("default", () => (
  <OpportunityApproveCallout
    privateNote="Here is a private note for administrators only."
    publicNote="Here is a note sent the Community User."
    currentStatus="PUBL"
    approvalStatuses={[{ status_name: "Published", status_code: "PUBL" }]}
    onStatusChange={(change) => {
      action("statusChange", change);
    }}
  />
));
