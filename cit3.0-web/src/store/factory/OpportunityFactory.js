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
  return `SRID=4326;${geojsonToWKT(geoJSON)}`;
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
  const nearestLocations = {};
  if (state.regionalDistrict.id) {
    nearestLocations.regional_district_id = parseInt(
      state.regionalDistrict.id,
      10
    );
  }
  if (state.community.distance) {
    nearestLocations.nearest_community = {
      community_id: parseInt(state.community.id, 10),
      community_distance: parseFloat(state.community.distance.toFixed(2)),
    };
  }
  nearestLocations.nearest_municipalities_object = state.municipalities.map(
    (m) => ({
      municipality_id: parseInt(m.pk, 10),
      municipality_distance: parseFloat(m.distance.toFixed(2)),
    })
  );
  nearestLocations.nearest_first_nations_object = state.firstNationCommunities.map(
    (f) => ({
      reserve_id: parseInt(f.pk, 10),
      reserve_distance: parseFloat(f.distance.toFixed(2)),
    })
  );
  if (state.physical.nearLake.value) {
    nearestLocations.nearest_lake = {
      lake_id: parseInt(state.physical.nearLake.pk, 10),
      lake_distance: parseFloat(state.physical.nearLake.value.toFixed(2)),
    };
  }
  if (state.physical.nearRiver.value) {
    nearestLocations.nearest_river = {
      river_id: parseInt(state.physical.nearRiver.pk, 10),
      river_distance: parseFloat(state.physical.nearRiver.value.toFixed(2)),
    };
  }
  if (state.transportation.nearHighway.value) {
    nearestLocations.nearest_highway = {
      highway_id: parseInt(state.transportation.nearHighway.pk, 10),
      highway_distance: parseFloat(
        state.transportation.nearHighway.value.toFixed(2)
      ),
    };
  }
  if (state.transportation.nearAirport.value) {
    nearestLocations.nearest_airport = {
      airport_id: parseInt(state.transportation.nearAirport.pk, 10),
      airport_distance: parseFloat(
        state.transportation.nearAirport.value.toFixed(2)
      ),
    };
  }
  if (state.transportation.nearRailway.value) {
    nearestLocations.nearest_railway = {
      railway_id: parseInt(state.transportation.nearRailway.pk, 10),
      railway_distance: parseFloat(
        state.transportation.nearRailway.value.toFixed(2)
      ),
    };
  }
  if (state.transportation.nearPort.value) {
    nearestLocations.nearest_port = {
      port_id: parseInt(state.transportation.nearPort.pk, 10),
      port_distance: parseFloat(state.transportation.nearPort.value.toFixed(2)),
    };
  }
  if (state.transportation.nearCustomsPort.value) {
    nearestLocations.nearest_customs_port_of_entry = {
      customs_port_id: parseInt(state.transportation.nearCustomsPort.pk, 10),
      customs_port_distance: parseFloat(
        state.transportation.nearCustomsPort.value.toFixed(2)
      ),
    };
  }
  if (state.services.nearResearchCenter.value) {
    nearestLocations.nearest_research_centre = {
      research_centre_id: parseInt(state.services.nearResearchCenter.pk, 10),
      research_centre_distance: parseFloat(
        state.services.nearResearchCenter.value.toFixed(2)
      ),
    };
  }
  if (state.services.nearHealth.value) {
    nearestLocations.nearest_health_center = {
      hospital_id: parseInt(state.services.nearHealth.pk, 10),
      hospital_distance: parseFloat(state.services.nearHealth.value.toFixed(2)),
    };
  }
  if (state.services.transmission.value) {
    nearestLocations.nearest_transmission_line = parseFloat(
      state.services.transmission.value.toFixed(2)
    );
  }
  if (state.services.nearFire.value) {
    nearestLocations.nearest_fire_station = {
      first_responder_id: parseInt(state.services.nearFire.pk, 10),
      first_responder_distance: parseFloat(
        state.services.nearFire.value.toFixed(2)
      ),
    };
  }
  if (state.services.nearPolice.value) {
    nearestLocations.nearest_police_station = {
      first_responder_id: parseInt(state.services.nearPolice.pk, 10),
      first_responder_distance: parseFloat(
        state.services.nearPolice.value.toFixed(2)
      ),
    };
  }
  if (state.services.nearAmbulance.value) {
    nearestLocations.nearest_ambulance_station = {
      first_responder_id: parseInt(state.services.nearAmbulance.pk, 10),
      first_responder_distance: parseFloat(
        state.services.nearAmbulance.value.toFixed(2)
      ),
    };
  }
  if (state.services.nearCoastGuard.value) {
    nearestLocations.nearest_coast_guard_station = {
      first_responder_id: parseInt(state.services.nearCoastGuard.pk, 10),
      first_responder_distance: parseFloat(
        state.services.nearCoastGuard.value.toFixed(2)
      ),
    };
  }
  if (state.services.nearSecondarySchool.value) {
    console.log("post secondary school: ", state.services.nearSecondarySchool);
    nearestLocations.nearest_post_secondary = {
      location_id: parseInt(state.services.nearSecondarySchool.pk, 10),
      location_distance: parseFloat(
        state.services.nearSecondarySchool.value.toFixed(2)
      ),
    };
  }
  if (state.userInfo.preferredDevelopment.value.length) {
    nearestLocations.opportunity_preferred_development = state.userInfo.preferredDevelopment.value.map(
      (option) => option.value || option
    );
  }
  return {
    ...request,
    deleted: state.deleted,
    opportunity_address: state.address,
    geo_position: `SRID=4326;POINT(${state.coords[1]} ${state.coords[0]})`,
    parcel_geometry: geoJSONToString(state.siteInfo.geometry),
    parcel_size: state.siteInfo.parcelSize.value
      ? parseFloat(state.siteInfo.parcelSize.value.toFixed(3))
      : null,
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
      parseFloat(state.userInfo.saleOrLease.rentalPrice).toFixed(2)
    ),
    opportunity_sale_price: parseFloat(
      parseFloat(state.userInfo.saleOrLease.salePrice).toFixed(2)
    ),
    opportunity_road_connected: state.services.roadAccess.name[0],
    opportunity_water_connected: state.services.waterSupply.name[0],
    opportunity_water_capacity: parseFloat(state.services.waterSupply.value),
    opportunity_sewer_connected: state.services.sewer.name[0],
    opportunity_sewer_capacity: parseFloat(state.services.sewer.value),
    opportunity_natural_gas_connected: state.services.naturalGas.name[0],
    opportunity_natural_gas_capacity: parseFloat(
      state.services.naturalGas.value
    ),
    opportunity_electrical_connected: state.services.electrical.name[0],
    opportunity_electrical_capacity: parseFloat(
      state.services.electrical.value
    ),
    ...nearestLocations,
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
    wktToGeoJSON(response.parcel_geometry.split("SRID=4326;")[1]).coordinates;
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
