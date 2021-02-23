/**
 * Factory to convert model to request object, reason there is more
 * visual and control data the api needs not know
 * @param {Object} model from redux opportunity model
 */
export default {
  createFromModel(model) {
    return {
      address: model.address,
      point: `SRID=4326;POINT(${model.coords[1]} ${model.coords[0]})`,
      approval_status: model.approvalStatus,
    };
  },
};
