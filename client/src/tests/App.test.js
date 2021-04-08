import { render, screen } from "@testing-library/react";
import App from "../App";

test("app should always show a header bar", () => {
  render(<App />);
  const linkElement = screen.getByText("Moguls Analysis");
  expect(linkElement).toBeInTheDocument();
});
