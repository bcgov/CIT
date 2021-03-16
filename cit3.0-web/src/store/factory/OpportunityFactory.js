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
export default {
  createRequestFromModel(state) {
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
      opportunity_preferred_development: state.userInfo.preferredDevelopment.value.map(
        (option) => option.value || option
      ),
      opportunity_road_connected: parseFloat(state.services.roadAccess.name[0]),
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
    };
  },
  createStateFromResponse(response) {
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
  },
};
