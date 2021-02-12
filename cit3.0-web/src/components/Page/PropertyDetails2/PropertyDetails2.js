import PropTypes from "prop-types";

export default function PropertyDetails2({ location }) {
  console.log("location: ", location.state);
  return (
    <>
      <h1>{location.state.selectData.propStatus}</h1>
    </>
  );
}

PropertyDetails2.propTypes = {
  location: PropTypes.shape().isRequired,
};
