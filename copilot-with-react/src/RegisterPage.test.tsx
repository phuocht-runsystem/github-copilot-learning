import React from "react";
import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RegisterPage from "./RegisterPage";

describe("RegisterPage", () => {
  beforeEach(() => {
    render(<RegisterPage />);
  });

  it("renders all form fields and labels", () => {
    expect(screen.getByLabelText(/Username:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Mobile Number:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Password:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirm Password:/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Register/i })).toBeInTheDocument();
  });

  it("shows validation errors when submitting empty form", async () => {
    await userEvent.click(screen.getByRole("button", { name: /Register/i }));
    expect(await screen.findByText(/Username must be at least 8 characters long/i)).toBeInTheDocument();
    expect(await screen.findByText(/Please enter a valid email address/i)).toBeInTheDocument();
    expect(await screen.findByText(/Please enter a valid mobile number/i)).toBeInTheDocument();
    expect(await screen.findByText(/Password must be at least 6 characters long/i)).toBeInTheDocument();
  });

  it("shows error for invalid email", async () => {
    await userEvent.type(screen.getByLabelText(/Email:/i), "invalidemail");
    await userEvent.click(screen.getByRole("button", { name: /Register/i }));
    expect(await screen.findByText(/Please enter a valid email address/i)).toBeInTheDocument();
  });

  it("shows error for short username", async () => {
    await userEvent.type(screen.getByLabelText(/Username:/i), "short");
    await userEvent.click(screen.getByRole("button", { name: /Register/i }));
    expect(await screen.findByText(/Username must be at least 8 characters long/i)).toBeInTheDocument();
  });

  it("shows error for invalid mobile number", async () => {
    await userEvent.type(screen.getByLabelText(/Mobile Number:/i), "123");
    await userEvent.click(screen.getByRole("button", { name: /Register/i }));
    expect(await screen.findByText(/Please enter a valid mobile number/i)).toBeInTheDocument();
  });

  it("shows error for short password", async () => {
    await userEvent.type(screen.getByLabelText(/^Password:/i), "123");
    await userEvent.click(screen.getByRole("button", { name: /Register/i }));
    expect(await screen.findByText(/Password must be at least 6 characters long/i)).toBeInTheDocument();
  });

  it("shows error when passwords do not match", async () => {
    await userEvent.type(screen.getByLabelText(/^Password:/i), "password123");
    await userEvent.type(screen.getByLabelText(/Confirm Password:/i), "password321");
    await userEvent.click(screen.getByRole("button", { name: /Register/i }));
    expect(await screen.findByText(/Passwords do not match/i)).toBeInTheDocument();
  });

  it("submits form with valid data and shows no errors", async () => {
    await userEvent.type(screen.getByLabelText(/Username:/i), "validuser1");
    await userEvent.type(screen.getByLabelText(/Email:/i), "user@example.com");
    await userEvent.type(screen.getByLabelText(/Mobile Number:/i), "1234567890");
    await userEvent.type(screen.getByLabelText(/^Password:/i), "password123");
    await userEvent.type(screen.getByLabelText(/Confirm Password:/i), "password123");
    await userEvent.click(screen.getByRole("button", { name: /Register/i }));

    expect(screen.queryByText(/Username must be at least 8 characters long/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Please enter a valid email address/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Please enter a valid mobile number/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Password must be at least 6 characters long/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Passwords do not match/i)).not.toBeInTheDocument();
  });

  it("clears error when user corrects username", async () => {
    await userEvent.type(screen.getByLabelText(/Username:/i), "short");
    await userEvent.click(screen.getByRole("button", { name: /Register/i }));
    expect(await screen.findByText(/Username must be at least 8 characters long/i)).toBeInTheDocument();

    await userEvent.clear(screen.getByLabelText(/Username:/i));
    await userEvent.type(screen.getByLabelText(/Username:/i), "longusername");
    expect(screen.queryByText(/Username must be at least 8 characters long/i)).not.toBeInTheDocument();
  });

  it("clears error when user corrects email", async () => {
    await userEvent.type(screen.getByLabelText(/Email:/i), "invalidemail");
    await userEvent.click(screen.getByRole("button", { name: /Register/i }));
    expect(await screen.findByText(/Please enter a valid email address/i)).toBeInTheDocument();

    await userEvent.clear(screen.getByLabelText(/Email:/i));
    await userEvent.type(screen.getByLabelText(/Email:/i), "valid@email.com");
    expect(screen.queryByText(/Please enter a valid email address/i)).not.toBeInTheDocument();
  });

  it("clears error when user corrects mobile number", async () => {
    await userEvent.type(screen.getByLabelText(/Mobile Number:/i), "123");
    await userEvent.click(screen.getByRole("button", { name: /Register/i }));
    expect(await screen.findByText(/Please enter a valid mobile number/i)).toBeInTheDocument();

    await userEvent.clear(screen.getByLabelText(/Mobile Number:/i));
    await userEvent.type(screen.getByLabelText(/Mobile Number:/i), "1234567890");
    expect(screen.queryByText(/Please enter a valid mobile number/i)).not.toBeInTheDocument();
  });

  it("clears error when user corrects password", async () => {
    await userEvent.type(screen.getByLabelText(/^Password:/i), "123");
    await userEvent.click(screen.getByRole("button", { name: /Register/i }));
    expect(await screen.findByText(/Password must be at least 6 characters long/i)).toBeInTheDocument();

    await userEvent.clear(screen.getByLabelText(/^Password:/i));
    await userEvent.type(screen.getByLabelText(/^Password:/i), "password123");
    expect(screen.queryByText(/Password must be at least 6 characters long/i)).not.toBeInTheDocument();
  });

  it("clears error when user corrects confirm password", async () => {
    await userEvent.type(screen.getByLabelText(/^Password:/i), "password123");
    await userEvent.type(screen.getByLabelText(/Confirm Password:/i), "password321");
    await userEvent.click(screen.getByRole("button", { name: /Register/i }));
    expect(await screen.findByText(/Passwords do not match/i)).toBeInTheDocument();

    await userEvent.clear(screen.getByLabelText(/Confirm Password:/i));
    await userEvent.type(screen.getByLabelText(/Confirm Password:/i), "password123");
    expect(screen.queryByText(/Passwords do not match/i)).not.toBeInTheDocument();
  });
});
