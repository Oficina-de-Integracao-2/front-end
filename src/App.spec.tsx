import { render } from "@testing-library/react";
import App from "./App.tsx";
import React from "react";

test("", () => {
  const { getByText } = render(<App />);

  expect(getByText("Hello world!")).toBeTruthy();
});
