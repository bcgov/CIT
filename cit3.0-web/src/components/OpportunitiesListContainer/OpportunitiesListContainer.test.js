import React from "react";
import { render } from "@testing-library/react";
import axios from "axios";
import OpportunitiesListContainer from "./OpportunitiesListContainer";

describe("OpportunitiesListContainer", () => {
  it("should mount", async () => {
    axios.get.mockResolvedValue({
      id: 1,
      opportunity_address: "1234 Test Pl.",
      point: "SRID=4326;POINT (-123.8687427 48.4774108)",
      approval_status: "PEND",
      date_created: "2021-02-16T17:34:38.184663Z",
    });
    render(<OpportunitiesListContainer totalCount={1} />);
    expect(axios.get).toHaveBeenCalledTimes(1);
  });
});
