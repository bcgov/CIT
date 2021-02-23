import _ from "lodash";
import { toKebabCase } from "../../helpers/helpers";
/**
 * Factory to convert model to request object, reason there is more
 * visual and control data the api needs not know
 * @param {Object} model from redux opportunity model
 */
export default {
  createFromModel(model) {
    return {
      opportunity_address: model.address,
      geo_position: `SRID=4326;POINT(${model.coords[1]} ${model.coords[0]})`,
      approval_status: model.approvalStatus,
      opportunity_name: model.name,
    };
  },
  createFromResponse(response) {
    /* eslint prefer-destructuring: "off" */
    const model = {};
    // Remap sligified name to camelCase
    Object.entries(response).forEach((field) => {
      const newKey = _.camelCase(field[0]);
      model[newKey] = field[1];
      return null;
    });

    // Update model for UI/UX member variables
    const geoPosition = response.geo_position.match(/\((.*) (.*)\)/);
    model.address = model.opportunityAddress;
    model.coords = [parseFloat(geoPosition[2]), parseFloat(geoPosition[1])];
    model.link = `/investment/${toKebabCase(response.opportunity_name)}-${
      response.id
    }`;
    model.name = model.opportunityName;
    return model;
  },
};
