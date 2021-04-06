import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ConfirmCancelModal from "./ConfirmCancelModal";

describe("<ConfirmCancelModal />", () => {
  test("it should mount", () => {
    render(
      <ConfirmCancelModal
        show
        handleClose={jest.fn()}
        handleSubmit={jest.fn()}
        body="Body text"
        label="Label text"
      />
    );

    const markAsSoldModalBody = screen.getByText("Body text");
    const markAsSoldModalLabel = screen.getByText("Label text");

    expect(markAsSoldModalBody).toBeInTheDocument();
    expect(markAsSoldModalLabel).toBeInTheDocument();
  });
});
