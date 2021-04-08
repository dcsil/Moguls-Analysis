import { render, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Signup from "../components/Login";

beforeEach(() => {
  jest.resetAllMocks();
});

afterEach(() => {
  cleanup();
});

it("check for sign up button", () => {
  const { queryByTitle } = render(<Signup />);
  const signupButton = queryByTitle("signupButton");
  expect(signupButton).toBeTruthy();
});

it("check for log in button", () => {
  const { queryByTitle } = render(<Signup />);
  const loginButton = queryByTitle("loginButton");
  expect(loginButton).toBeTruthy();
});

it("check for username text field", () => {
  const { getByTestId } = render(<Signup />);
  const usernameTextField = getByTestId("usernameTextField");
  expect(usernameTextField).toBeTruthy();
  userEvent.type(usernameTextField, "test@gmail.com");
  expect(usernameTextField).toHaveAttribute("value", "test@gmail.com");
});

it("check for password text field", () => {
  const { getByTestId } = render(<Signup />);
  const passwordTextField = getByTestId("passwordTextField");
  expect(passwordTextField).toBeTruthy();
  userEvent.type(passwordTextField, "123");
  expect(passwordTextField).toHaveValue("123");
});