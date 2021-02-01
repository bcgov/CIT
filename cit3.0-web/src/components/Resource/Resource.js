import PropTypes from "prop-types";

export default function Resource({ resource, resourceData }) {
  const sortDataByDistance = (data) =>
    data.sort((a, b) => a.distance - b.distance);

  function showDistance(data) {
    return (
      <p>
        {" "}
        <span>{sortDataByDistance(data)[0].distance.toFixed(2)} km</span>
      </p>
    );
  }
  return (
    <div className="row" key={resource}>
      <div className="col-sm">
        <h4>{resource}</h4>
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
