import PropTypes from "prop-types";
import Resource from "../Resource/Resource";

export default function ResourceList({ resources }) {
  return (
    <div className="container-fluid pb-1">
      <div className="row mb-3">
        <div className="col-sm font-weight-bold">
          <h2>Resource</h2>
        </div>
        <div className="col-sm d-flex justify-content-center">
          <h2>#</h2>
        </div>
        <div className="col-sm d-flex justify-content-end">
          <h2>Nearest </h2>
        </div>
      </div>
      {Object.entries(resources).map(([resource, resourceData]) => (
        <Resource
          key={resource}
          resource={resource}
          resourceData={resourceData}
        />
      ))}
    </div>
  );
}

ResourceList.propTypes = {
  resources: PropTypes.shape({
    resource: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.shape),
  }).isRequired,
};
