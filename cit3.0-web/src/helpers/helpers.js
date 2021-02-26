import * as Constants from "./constants";

export function setColour(name, type) {
  switch (name) {
    case "Hospitals":
      return Constants.HOSPITALS[type];
    case "Schools":
      return Constants.SCHOOLS[type];
    case "Post Secondary Schools":
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
