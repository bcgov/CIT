import PropTypes from "prop-types";
import PortalHeader from "../../Headers/PortalHeader/PortalHeader";
import NavigationHeader from "../../Headers/NavigationHeader/NavigationHeader";

export default function SiteInformation({ address }) {
  return (
    <>
      <PortalHeader />
      <NavigationHeader />
      <div>{address}</div>
    </>
  );
}

SiteInformation.propTypes = {
  address: PropTypes.string.isRequired,
};
