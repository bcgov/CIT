import { render, cleanup, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";

import AddressSearchBar from "./AddressSearchBar";

afterEach(cleanup);

const setAddress = jest.fn();
const getCoords = jest.fn();

describe("AddressSearchBar", () => {
  it("renders the label", () => {
    const { container } = render(
      <AddressSearchBar setAddress={setAddress} getCoords={getCoords} />
    );
    const label = container.querySelector("label");
    expect(label).toBeInTheDocument();
  });
  it("renders the label text", () => {
    const { getByText } = render(
      <AddressSearchBar setAddress={setAddress} getCoords={getCoords} />
    );
    const label = getByText(/Enter/i);
    expect(label).toHaveTextContent("Enter Address");
  });
  it("renders the input element", () => {
    const { container } = render(
      <AddressSearchBar setAddress={setAddress} getCoords={getCoords} />
    );
    const input = container.querySelector("input");
    expect(input).toBeInTheDocument();
  });
  it("adds text to input", async () => {
    axios.get.mockResolvedValueOnce({
      data: {
        features: [{ properties: { fullAddress: "305 Belleville St" } }],
      },
    });
    const { container } = render(
      <AddressSearchBar setAddress={setAddress} getCoords={getCoords} />
    );
    const input = container.querySelector("input");
    fireEvent.change(input, { target: { value: "305 Belleville St" } });
    await waitFor(() => container.querySelector("input"));
    expect(input.value).toBe("305 Belleville St");
  });
  it("returns data when address is entered in input", async () => {
    axios.get.mockResolvedValueOnce({
      data: {
        features: [{ properties: { fullAddress: "305 Belleville St" } }],
      },
    });
    const { container } = render(
      <AddressSearchBar setAddress={setAddress} getCoords={getCoords} />
    );
    const input = container.querySelector("input");
    fireEvent.change(input, { target: { value: "305 Belleville St" } });
    const list = await waitFor(() => container.querySelector("ul"));
    expect(axios.get).toHaveBeenCalledTimes(1);
  });
  it("does not render dropdown when input is empty", () => {
    const { container } = render(
      <AddressSearchBar setAddress={setAddress} getCoords={getCoords} />
    );
    const list = container.querySelector("ul");
    expect(list).not.toBeInTheDocument();
  });
  it("renders dropdown when address is entered in input", async () => {
    axios.get.mockResolvedValueOnce({
      data: {
        features: [{ properties: { fullAddress: "305 Belleville St" } }],
      },
    });
    const { container } = render(
      <AddressSearchBar setAddress={setAddress} getCoords={getCoords} />
    );
    const input = container.querySelector("input");
    fireEvent.change(input, { target: { value: "305 Belleville St" } });
    const list = await waitFor(() => container.querySelector("ul"));
    expect(list).toBeInTheDocument();
  });
});
