import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import BusinessContact from "./BusinessContact";

describe("<BusinessContact />", () => {
  it("it should mount", () => {
    const { getByTestId } = render(<BusinessContact />);
    const businessContact = getByTestId("BusinessContact");
    expect(businessContact).toBeInTheDocument();
  });

  it("it should contain a svg", () => {
    const { getByTestId } = render(<BusinessContact />);
    const businessContact = getByTestId("BusinessContact");
    expect(businessContact.querySelector("svg")).toBeInTheDocument();
  });

  it("it should contain a h3 header", () => {
    const { getByTestId } = render(<BusinessContact />);
    const businessContact = getByTestId("BusinessContact");
    expect(businessContact.querySelector("h3")).toBeInTheDocument();
  });

  it("it should have a business name N/A  when empty", () => {
    const { getByTestId } = render(<BusinessContact />);
    const businessContact = getByTestId("BusinessContact");
    expect(
      businessContact.querySelector("b[id=business-name]").textContent
    ).toBe("N/A");
  });

  it("it should have a business email N/A when empty", () => {
    const { getByTestId } = render(<BusinessContact />);
    const businessContact = getByTestId("BusinessContact");
    expect(
      businessContact.querySelector("b[id=business-email]").textContent
    ).toBe("N/A");
  });

  it("it should have a business name to be assigned", () => {
    const { getByTestId } = render(<BusinessContact name="Jane Doe" />);
    const businessContact = getByTestId("BusinessContact");
    expect(
      businessContact.querySelector("b[id=business-name]").textContent
    ).toBe("Jane Doe");
  });

  it("it should have a business email to be assigned", () => {
    const { getByTestId } = render(
      <BusinessContact email="jane.doe@example.com" />
    );
    const businessContact = getByTestId("BusinessContact");
    expect(
      businessContact.querySelector("b[id=business-email]").textContent
    ).toBe("jane.doe@example.com");
  });
});
