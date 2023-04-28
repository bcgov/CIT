import proj4 from "proj4";
import { SRID_DEF_3005 } from "./constants";

import * as Constants from "./constants";

export function setColour(name, type) {
  switch (name) {
    case "nearestAirport":
      return Constants.AIRPORT[type];
    case "nearestPort":
      return Constants.AIRPORT[type];
    case "nearestCustomsPortOfEntry":
      return Constants.CUSTOMS_PORT[type];
    case "nearestResearchCentre":
      return Constants.AIRPORT[type];
    case "nearestFireStation":
      return Constants.FIRE[type];
    case "nearestPoliceStation":
      return Constants.POLICE[type];
    case "nearestAmbulanceStation":
      return Constants.AMBULANCE[type];
    case "nearestCoastGuardStation":
      return Constants.COAST_GUARD[type];
    case "nearestHealthCenter":
      return Constants.HOSPITALS[type];
    case "Schools":
      return Constants.SCHOOLS[type];
    case "nearestPostSecondary":
      return Constants.POST_SECONDARY[type];
    case "Courts":
      return Constants.COURTS[type];
    case "Walk-In Clinics":
      return Constants.WALKIN_CLINICS[type];
    case "Natural Resource Projects":
      return Constants.NATURAL_RESOURCE_PROJECTS[type];
    case "Economic Projects":
      return Constants.ECONOMIC_PROJECTS[type];
    default:
      return "black";
  }
}
export function toKebabCase(str = "") {
  return (
    str &&
    str
      .match(
        /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
      )
      .map((x) => x.toLowerCase())
      .join("-")
  );
}

export function createOpportunityLink(id, name = null) {
  if (name) {
    return `/investmentopportunities/view/${toKebabCase(name)}-${id}`;
  }
  return `/manage/investmentopportunities/view/${id}`;
}

export function determineStatusTextColour(approvalStatus, adminView) {
  if (approvalStatus === "PEND") {
    return <div className="status-text-orange">Pending Review</div>;
  }
  if (approvalStatus === "PUBL") {
    return <div className="status-text-green">Published</div>;
  }
  if (approvalStatus === "NCOM") {
    if (adminView) {
      return <div className="status-text-red">Pending Edit</div>;
    }
    return <div className="status-text-red">Needs to be edited</div>;
  }
  if (approvalStatus === "NWED") {
    if (adminView) {
      return <div className="status-text-orange">New - Edited</div>;
    }
    return <div className="status-text-orange">Pending Review</div>;
  }
  if (approvalStatus === "CLOS") {
    return <div className="status-text-orange">Closed</div>;
  }
  return approvalStatus;
}

export function formatDate(ISODate) {
  return ISODate.split("T")[0];
}

export function getAddress(address) {
  if (!address) {
    return "No Address";
  }
  const splitAddress = address.split(",");
  const street = splitAddress.shift();
  const city = splitAddress.join(", ");
  return (
    <>
      {street}
      <br />
      {city}
    </>
  );
}

export function convertCoords(coords) {
  proj4.defs("EPSG:3005", SRID_DEF_3005);
  return proj4(proj4("EPSG:4326"), proj4("EPSG:3005"), [coords[1], coords[0]]);
}
