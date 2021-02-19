// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
/* eslint-disable */
import "@testing-library/jest-dom";

// the following needs to be here to allow Polyline/Ploygon
// see link for further details:  https://stackoverflow.com/questions/54382414/fixing-react-leaflet-testing-error-cannot-read-property-layeradd-of-null/54384719#54384719
const createElementNSOrig = global.document.createElementNS;
global.document.createElementNS = (namespaceURI, qualifiedName) => {
  if (
    namespaceURI === "http://www.w3.org/2000/svg" &&
    qualifiedName === "svg"
  ) {
    const element = createElementNSOrig.apply(this, arguments);
    element.createSVGRect = () => {};
    return element;
  }
  return createElementNSOrig.apply(this, arguments);
};
