import _ from "lodash";
import { geojsonToWKT, wktToGeoJSON } from "@terraformer/wkt";
import { Opportunity } from "../models/opportunity";

const geoJSONToString = (geom) => {
  if (!geom.coordinates) {
    return null;
  }
  const geoJSON = {
    type: geom.type,
    coordinates: geom.coordinates,
  };
  return `SRID=3005;${geojsonToWKT(geoJSON)}`;
};

/**
 * Factory to convert model to request object, reason there is more
 * visual and control data the api needs not know
 * @param {Object} model from redux opportunity model
 */
function createRequestFromModel(state) {
  const request = {};
  // Remap camelCase names to sligified names
  Object.entries(state).forEach((section) => {
    if (typeof section[1] === "object" && section[1] !== null) {
      Object.entries(section[1]).forEach((field) => {
        const newKey = _.snakeCase(field[0]);

        if (field[1]) {
          // Model set methods map to redux state sections
          request[newKey] = field[1].value;
        }
      });
    } else {
      const newSectionKey = _.snakeCase(section[0]);
      if (newSectionKey !== "date_created") {
        request[newSectionKey] = section[1];
      }
    }
  });
  return {
    ...request,
    deleted: state.deleted,
    opportunity_address: state.address,
    geo_position: `SRID=3005;POINT(${state.coords[1]} ${state.coords[0]})`,
    parcel_geometry: geoJSONToString(state.siteInfo.geometry),
    parcel_size: state.siteInfo.parcelSize.value,
    parcel_ownership: state.siteInfo.parcelOwnership.name,
    pid: Array.isArray(request.pid) ? request.pid.join(",") : "",
    approval_status: state.approvalStatus,
    opportunity_name: state.name,
    business_contact_name: state.businessContactName,
    business_contact_email: state.businessContactEmail,
    public_note: state.publicNote,
    private_note: state.privateNote,
    last_admin: state.lastAdmin,
    land_use_zoning: state.userInfo.currentZone.value,
    ocp_zoning_code: state.userInfo.futureZone.value,
    opportunity_property_status: state.userInfo.saleOrLease.value,
    opportunity_rental_price: parseFloat(
      state.userInfo.saleOrLease.rentalPrice
    ),
    opportunity_sale_price: parseFloat(state.userInfo.saleOrLease.salePrice),
    opportunity_preferred_development: state.userInfo.preferredDevelopment.value.map(
      (option) => option.value || option
    ),
    opportunity_road_connected: state.services.roadAccess.name[0],
    opportunity_water_connected: state.services.waterSupply.name[0],
    opportunity_water_capacity: parseFloat(state.services.waterSupply.value),
    opportunity_sewer_connected: state.services.sewer.name[0],
    opportunity_sewer_capacity: parseFloat(state.services.sewer.value),
    opportunity_natual_gas_connected: state.services.naturalGas.name[0],
    opportunity_natual_gas_capacity: parseFloat(
      state.services.naturalGas.value
    ),
    opportunity_electrical_connected: state.services.electrical.name[0],
    opportunity_electrical_capacity: parseFloat(
      state.services.electrical.value
    ),
    regional_district_id: parseInt(state.regionalDistrict.id, 10),
    nearest_community: {
      community_id: parseInt(state.community.id, 10),
      community_distance: state.community.distance.toFixed(2),
    },
    nearest_municipalities: state.municipalities.map((m) => parseInt(m.pk, 10)),
    nearest_first_nations: state.firstNationCommunities.map((f) =>
      parseInt(f.pk, 10)
    ),
    nearest_lake: {
      lake_id: state.physical.nearLake.pk,
      lake_distance: state.physical.nearLake.value.toFixed(2),
    },
    nearest_river: {
      river_id: state.physical.nearRiver.pk,
      river_distance: state.physical.nearRiver.value.toFixed(2),
    },
    nearest_highway: {
      highway_id: state.transportation.nearHighway.pk,
      highway_distance: state.transportation.nearHighway.value.toFixed(2),
    },
    nearest_airport: {
      airport_id: state.transportation.nearAirport.pk,
      airport_distance: state.transportation.nearAirport.value.toFixed(2),
    },
    nearest_railway: {
      railway_id: state.transportation.nearRailway.pk,
      railway_distance: state.transportation.nearRailway.value.toFixed(2),
    },
    nearest_port: {
      port_id: state.transportation.nearPort.pk,
      port_distance: state.transportation.nearPort.value.toFixed(2),
    },
    nearest_customs_port_of_entry: {
      customs_port_id: state.transportation.nearCustomsPort.pk,
      customs_port_distance: state.transportation.nearCustomsPort.value.toFixed(
        2
      ),
    },
    nearest_research_centre: {
      research_centre_id: state.services.nearResearchCenter.pk,
      research_centre_distance: state.services.nearResearchCenter.value.toFixed(
        2
      ),
    },
    nearest_health_center: {
      hospital_id: state.services.nearHealth.pk,
      hospital_distance: state.services.nearHealth.value.toFixed(2),
    },
    nearest_transmission_line: state.services.transmission.value.toFixed(2),
    nearest_fire_station: {
      first_responder_id: state.services.nearFire.pk,
      first_responder_distance: state.services.nearFire.value.toFixed(2),
    },
    nearest_police_station: {
      first_responder_id: state.services.nearPolice.pk,
      first_responder_distance: state.services.nearPolice.value.toFixed(2),
    },
    nearest_ambulance_station: {
      first_responder_id: state.services.nearAmbulance.pk,
      first_responder_distance: state.services.nearAmbulance.value.toFixed(2),
    },
    nearest_coast_guard_station: {
      first_responder_id: state.services.nearCoastGuard.pk,
      first_responder_distance: state.services.nearCoastGuard.value.toFixed(2),
    },
    nearest_post_secondary: {
      location_id: state.services.nearSecondarySchool.pk,
      location_distance: state.services.nearSecondarySchool.value.toFixed(2),
    },
  };
}

function createStateFromResponse(response) {
  /* eslint prefer-destructuring: "off" */
  const model = new Opportunity();

  // Remap sligified names to camelCase names
  Object.entries(response).forEach((field) => {
    const newKey = _.camelCase(field[0]);

    if (field[1]) {
      // Model set methods map to redux state sections
      model[newKey] = field[1];
    }
  });
  model.createLink();
  model.PID = response.pid;
  model.parcelGeometry =
    response.parcel_geometry &&
    wktToGeoJSON(response.parcel_geometry.split("SRID=3005;")[1]).coordinates;
  return { ...model.asState() };
}

function createModelFromState(state) {
  return new Opportunity(state);
}

function mergeProximityState(state, proximity) {
  const model = createModelFromState(state);

  // Remap sligified names to camelCase names
  Object.entries(proximity).forEach((field) => {
    const newKey = _.camelCase(field[0]);

    if (field[1]) {
      // Model set methods map to redux state sections
      model[newKey] = field[1];
    }
  });
  return model;
}
export default {
  createRequestFromModel,
  createStateFromResponse,
  createModelFromState,
  mergeProximityState,
};
