import { fireEvent, render } from "@testing-library/react";
import Flyout from "./Flyout";

describe("Flyout", () => {
  it("Changes the flyout button's CSS class when clicked", () => {
    const { container, getByText } = render(
      <Flyout>
        <div>
          <p>Test child paragraph</p>
        </div>
      </Flyout>
    );

    expect(
      container.getElementsByClassName("icon").item(0)
    ).toBeInTheDocument();
    expect(
      container.getElementsByClassName("icon").item(0).classList
    ).toContain("closed");
    fireEvent.click(getByText(/>>/i));
    expect(
      container.getElementsByClassName("icon").item(0).classList
    ).toContain("open");
  });
});
