import _ from "lodash";
import { Opportunity } from "../models/opportunity";
import {
  convert4326CoordsTo3005,
  geoJSONToString,
} from "../../helpers/conversions";

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
      if (typeof section[1] === "object") {
        Object.entries(section[1]).forEach((field) => {
          const newKey = _.snakeCase(field[0]);

          if (field[1]) {
            // Model set methods map to redux state sections
            request[newKey] = field[1].value;
          }
        });
      }
    });
    const coords3005 = convert4326CoordsTo3005(state.coords);
    return {
      ...request,
      opportunity_address: state.address,
      geo_position: `SRID=3005;POINT(${coords3005[0]} ${coords3005[1]})`,
      parcel_geometry: geoJSONToString(state.siteInfo.geometry),
      parcel_size: state.siteInfo.parcelSize.value,
      approval_status: state.approvalStatus,
      opportunity_name: state.name,
      business_contact_name: state.businessContactName,
      business_contact_email: state.businessContactEmail,
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
    return { ...model.asState() };
  },
};
