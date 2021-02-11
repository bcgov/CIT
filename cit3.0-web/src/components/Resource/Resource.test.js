import { render, cleanup } from "@testing-library/react";
import Resource from "./Resource";

afterEach(cleanup);

const resource = "Post Secondary Schools";

const resourceData = [
  {
    Address: "4461 Interurban Rd",
    City: "Victoria",
    "Economic Development Region": "Vancouver Island/Coast",
    Institution: "Camosun College",
    "Institution Type": "Public Post-Secondary",
    Latitude: 48.490802,
    Location: "Interurban Campus",
    "Location Description": "Campus",
    Longitude: -123.416497,
    _id: 7,
    distance: 2,
  },
];

describe("Resource", () => {
  it("renders a row", () => {
    const { container } = render(
      <Resource resource={resource} resourceData={resourceData} />
    );
    expect(container.firstChild).toHaveClass("row");
  });
  it("renders 3 columns", () => {
    const { container } = render(
      <Resource resource={resource} resourceData={resourceData} />
    );
    expect(container.getElementsByClassName("col").length).toBe(3);
  });
  it("renders the resource name", () => {
    const { getByText } = render(
      <Resource resource={resource} resourceData={resourceData} />
    );
    const post = getByText("Post Secondary Schools");
    expect(post).toBeInTheDocument();
  });
  it("renders length of list", () => {
    const { getByText } = render(
      <Resource resource={resource} resourceData={resourceData} />
    );
    const length = getByText("1");
    expect(length).toBeInTheDocument();
  });
});
