import React from "react";
import axios from "axios";
import { cleanup, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { Provider } from "react-redux";
import OpportunityApproveListPage from "./OpportunityApproveListPage";
import { store } from "../../../store";

const history = createMemoryHistory();

afterEach(cleanup);
describe("<OpportunityApproveListPage />", () => {
  test("it should mount", () => {
    axios.get.mockResolvedValue({
      count: 1,
      results: [
        {
          approval_status: "PEND",
          business_contact_email: "",
          business_contact_name: "",
          community_link: "",
          date_created: "2021-03-09T19:33:52.654762Z",
          date_published: null,
          date_updated: "2021-03-09T19:33:52.655235Z",
          deleted: false,
          elevation_at_location: null,
          environmental_information: "",
          geo_position:
            "SRID=3005;POINT (-123.4149706363678 48.59645033955277)",
          id: 44,
          land_use_zoning: null,
          last_admin: null,
          ocp_zoning_code: null,
          opportunity_address: "7877 Patterson Rd, Central Saanich, BC",
          opportunity_description: "",
          opportunity_electrical_capacity: null,
          opportunity_electrical_connected: null,
          opportunity_link: "",
          opportunity_name: "Test-Poly",
          opportunity_natual_gas_capacity: null,
          opportunity_natual_gas_connected: null,
          opportunity_preferred_development: [],
          opportunity_property_status: null,
          opportunity_road_connected: null,
          opportunity_sewer_capacity: null,
          opportunity_sewer_connected: null,
          opportunity_water_capacity: null,
          opportunity_water_connected: null,
          parcel_geometry:
            "SRID=3005;POLYGON ((1190957.3974 401295.8556, 1191009.5032 401296.9912, 1191030.1112 401297.4402, 1190986.7942 401332.1262, 1190957.3974 401295.8556))",
          parcel_ownership: null,
          parcel_size: "0.320",
          pid: "000429121",
          private_note: null,
          public_note: null,
          soil_drainage: null,
          soil_name: null,
          soil_texture: null,
        },
      ],
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <OpportunityApproveListPage />
        </Router>
      </Provider>
    );

    const opportunityApproveListPage = screen.getByTestId(
      "OpportunityApproveListPage"
    );

    expect(opportunityApproveListPage).toBeInTheDocument();
  });
});
