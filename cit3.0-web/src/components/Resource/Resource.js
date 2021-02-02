import PropTypes from "prop-types";
import setColour from "../../helpers/helpers";

export default function Resource({ resource, resourceData }) {
  const sortDataByDistance = (data) =>
    data.sort((a, b) => a.distance - b.distance);

  function showDistance(data) {
    return (
      <p>{sortDataByDistance(data)[0].distance.toFixed(2) || "unknown"} km</p>
    );
  }
  return (
    <div className="row" key={resource}>
      <div className="col-sm">
        <h4 style={{ color: setColour(resource, "colourHex") }}>{resource}</h4>
      </div>
      <div className="col-sm d-flex justify-content-center">
        {resourceData.length}
      </div>
      <div className="col-sm d-flex justify-content-end">
        {showDistance(resourceData)}
      </div>
    </div>
  );
}

Resource.propTypes = {
  resource: PropTypes.string.isRequired,
  resourceData: PropTypes.arrayOf(PropTypes.shape).isRequired,
};
