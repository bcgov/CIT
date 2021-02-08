import { render, cleanup } from "@testing-library/react";
import PageTitleHeader from "./PageTitleHeader";

afterEach(cleanup);

const title = "Add opportunity";

const text = "Text description here";

describe("PageTitleHeader", () => {
  it("renders a title", () => {
    const { getByText } = render(<PageTitleHeader title={title} text={text} />);
    expect(getByText(/opportunity/i).textContent).toBe("Add opportunity");
  });
  it("renders the text", () => {
    const { getByText } = render(<PageTitleHeader title={title} text={text} />);
    expect(getByText(/description/i).textContent).toBe("Text description here");
  });
  it("renders a column", () => {
    const { container } = render(<PageTitleHeader title={title} text={text} />);
    expect(container.firstChild.toHaveClass("col"));
  });
});
