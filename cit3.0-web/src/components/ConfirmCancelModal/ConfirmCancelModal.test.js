import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ConfirmCancelModal from "./ConfirmCancelModal";

describe("<MarkAsSoldModal />", () => {
  test("it should mount", () => {
    render(<ConfirmCancelModal />);

    const markAsSoldModal = screen.getByText("Yes");

    expect(markAsSoldModal).toBeInTheDocument();
  });
});
