import { render, cleanup } from "@testing-library/react";
import PropertyInfo from "./PropertyInfo";

afterEach(cleanup);

const text = "Confirm Parcel or Private";
const tag = true;

describe("PropertyInfo", () => {
  it("renders the given text", () => {
    const { getByText } = render(<PropertyInfo info={text} />);
    expect(getByText(/Confirm/i).textContent).toBe(text);
  });
  it("renders a paragraph element if tag prop is true", () => {
    const { container } = render(<PropertyInfo info={text} tag={tag} />);
    const pTag = container.querySelector("p");
    expect(pTag).toBeInTheDocument();
  });
  it("does not render a paragraph element if tag prop is false", () => {
    const { container } = render(<PropertyInfo info={text} tag={false} />);
    const pTag = container.querySelector("p");
    expect(pTag).not.toBeInTheDocument();
  });
  it("renders an h3 element if tag prop is false", () => {
    const { container } = render(<PropertyInfo info={text} tag={false} />);
    const h3 = container.querySelector("h3");
    expect(h3).toBeInTheDocument();
  });
  it("does not render an h3 element if tag prop is true", () => {
    const { container } = render(<PropertyInfo info={text} tag={tag} />);
    const h3 = container.querySelector("h3");
    expect(h3).not.toBeInTheDocument();
  });
});
