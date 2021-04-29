import React from "react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import OpportunityPage from "./OpportunityPage";
import {
  GET_OPPORTUNITIES_URL,
  GET_OPTIONS_URL,
} from "../../../store/constants/api-urls";

export default {
  title: "Opportunity Page",
  component: OpportunityPage,
};

export const Default = () => {
  const mock = new MockAdapter(axios);
  mock.onGet(`${GET_OPPORTUNITIES_URL}3`).reply(200, {
    id: 18,
    opportunity_address: "3436 Garden Dr, Vancouver, BC",
    opportunity_name: "Your opportunity name",
    geo_position: "SRID=4326;POINT (-123.0579659342766 49.25289403851823)",
    approval_status: "PUBL",
    date_created: "2021-04-26T18:20:05.645212Z",
    date_updated: "2021-04-26T18:21:29.327171Z",
    date_published: null,
    business_contact_name: "Bob Test",
    business_contact_email: "test@mail.com",
    opportunity_description: "Here is my information",
    environmental_information: "Here is some environmental information",
    opportunity_link: "www.google.ca",
    community_link: "www.google.ca",
    regional_district_id: 10,
    parcel_ownership: "Private",
    parcel_size: "0.262",
    pid: "010291521",
    user_id: 2,
    parcel_geometry:
      "SRID=4326;POLYGON ((-123.05814303 49.25283916, -123.05755695 49.25283719, -123.05755665 49.25292758, -123.05755651 49.25294918, -123.05814247 49.25295069, -123.05814303 49.25283916), (-123.05814303 49.25283916, -123.05755695 49.25283719, -123.05755665 49.25292758, -123.05755651 49.25294918, -123.05814247 49.25295069, -123.05814303 49.25283916))",
    elevation_at_location: "68.000",
    soil_name: "UNCLASSIFIED URBAN",
    soil_texture: "-",
    soil_drainage: "-",
    opportunity_sale_price: null,
    opportunity_rental_price: null,
    opportunity_road_connected: "Y",
    opportunity_water_connected: "N",
    opportunity_water_capacity: null,
    opportunity_sewer_connected: "Y",
    opportunity_sewer_capacity: "22.000",
    opportunity_natural_gas_connected: "Y",
    opportunity_natural_gas_capacity: "33.000",
    opportunity_electrical_connected: "U",
    opportunity_electrical_capacity: null,
    private_note: "",
    public_note: "",
    last_admin: "Jack Admin",
    land_use_zoning: null,
    ocp_zoning_code: null,
    opportunity_property_status: null,
    opportunity_preferred_development: [],
    opportunity_preferred_development_v2: null,
    nearest_port: {
      port_id: 3145,
      port_distance: 3.96,
      name: "Pacific Elevators",
    },
    nearest_airport: {
      airport_id: 2689,
      airport_distance: 2.41,
      name: "Vancouver (Vancouver Film Studios) Heliport",
    },
    nearest_research_centre: {
      research_centre_id: 9198,
      research_centre_distance: "2.2700",
    },
    nearest_customs_port_of_entry: {
      customs_port_id: 4462,
      customs_port_distance: 5.54,
      name: "Port Metro Vancouver",
    },
    nearest_transmission_line: "4.3800",
    nearest_coast_guard_station: {
      first_responder_id: 971,
      first_responder_distance: "6.4100",
    },
    nearest_ambulance_station: {
      first_responder_id: 623,
      first_responder_distance: "1.1800",
    },
    nearest_police_station: {
      first_responder_id: 237,
      first_responder_distance: "1.1800",
    },
    nearest_fire_station: {
      first_responder_id: 629,
      first_responder_distance: "1.2300",
    },
    nearest_health_center: {
      hospital_id: 5802,
      hospital_distance: "2.8400",
    },
    nearest_railway: {
      railway_id: 5035,
      railway_distance: 0.58,
      name: "Unnamed Railways 6302",
    },
    nearest_highway: {
      highway_id: 196,
      highway_distance: 0.55,
      name: "Grandview Hwy S",
    },
    nearest_river: {
      river_id: 16558,
      river_distance: "5.0600",
    },
    nearest_lake: {
      lake_id: 835,
      lake_distance: "12.4800",
    },
    nearest_first_nations: [
      {
        id: 52,
        reserve_id_id: 914,
        reserve_distance: 5.63,
        reserve_name: "SEYMOUR CREEK 2",
        reserve_link: "Squamish",
      },
      {
        id: 53,
        reserve_id_id: 24,
        reserve_distance: 6.33,
        reserve_name: "KITSILANO 6",
        reserve_link: "Squamish",
      },
      {
        id: 54,
        reserve_id_id: 913,
        reserve_distance: 6.74,
        reserve_name: "MISSION 1",
        reserve_link: "Squamish",
      },
    ],
    nearest_municipalities: [
      {
        id: 77,
        municipality_id_id: 31,
        municipality_distance: 0,
        municipality_name: "Vancouver",
        municipality_population: 631486,
      },
      {
        id: 78,
        municipality_id_id: 68,
        municipality_distance: 2.5,
        municipality_name: "Burnaby",
        municipality_population: 232755,
      },
      {
        id: 79,
        municipality_id_id: 13,
        municipality_distance: 4.99,
        municipality_name: "North Vancouver - City",
        municipality_population: 52898,
      },
      {
        id: 80,
        municipality_id_id: 36,
        municipality_distance: 4.99,
        municipality_name: "North Vancouver - District",
        municipality_population: 85935,
      },
      {
        id: 81,
        municipality_id_id: 29,
        municipality_distance: 5.1,
        municipality_name: "Richmond",
        municipality_population: 198309,
      },
    ],
    nearest_post_secondary: {
      location_id: 9055,
      location_distance: "1.2300",
    },
    nearest_community: {
      community_id: 1023,
      community_distance: "3.0800",
    },
    network_at_road: "Yes",
    network_avg: "50/10",
    municipality: {
      name: "Vancouver",
      id: 31,
    },
    regional_district: {
      name: "Metro Vancouver Regional District",
      id: 10,
    },
  });

  mock.onGet(`${GET_OPTIONS_URL}`).reply(200, {});

  return <OpportunityPage id={3} />;
};
