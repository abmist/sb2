import React, { useState, useRef, useEffect } from "react";
import { render, screen } from "@testing-library/react";
import { userEvent, within } from "@storybook/testing-library";
// import { renderHook, act } from "@testing-library/react-hooks";
import "@testing-library/jest-dom";
// import { composeStories, composeStory } from "@storybook/testing-react";
import { Heading } from "./Heading";

test("Should render a Heading", () => {
  render(<Heading>heading</Heading>);
  const heading = screen.getByText("heading");
  expect(heading).not.toBeNull();
});

test("Should include 'warning' class", () => {
  render(<Heading className="warning">heading</Heading>);
  const classToMatch = "warning";
  const heading = screen.getByText("heading");
  expect(heading).toHaveClass(classToMatch);
  expect(heading.classList.contains(classToMatch)).toBe(true);
});

test("Should not include 'special' class", () => {
  render(<Heading className="special">heading</Heading>);
  const classToMatch = "spacial";
  const heading = screen.getByText("heading");
  expect(heading).not.toHaveClass(classToMatch);
  expect(heading.classList.contains(classToMatch)).toBe(false);
});

test("Should include 'heading' class by default", () => {
  render(<Heading>heading</Heading>);
  const classToMatch = "heading";
  const heading = screen.getByText("heading");
  expect(heading).toHaveClass(classToMatch);
  expect(heading.classList.contains(classToMatch)).toBe(true);
});

test("Should have level h2", () => {
  render(<Heading level="h2">heading</Heading>);
  const classToMatch = "h2";
  const heading = screen.getByText("heading");
  expect(heading).toHaveClass(classToMatch);
  expect(heading.classList.contains(classToMatch)).toBe(true);
  const h2 = document.querySelector("h2");
  expect(h2).toBeInTheDocument();
});
