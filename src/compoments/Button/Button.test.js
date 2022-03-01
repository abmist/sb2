import React, { useState, useRef, useEffect } from "react";
import { render, screen } from "@testing-library/react";
import { userEvent, within } from "@storybook/testing-library";
// import { renderHook, act } from "@testing-library/react-hooks";
import "@testing-library/jest-dom";
// import { composeStories, composeStory } from "@storybook/testing-react";
import { Button } from "./Button";

/**
 *
 * Maybe we don't need "@storybook/testing-react"
 * Maybe we don't need "@testing-library/react-hooks"
 * "@testing-library/jest-dom" => Not sure if needed or if came by default
 *
 */

// import { White } from "./Button.stories.mdx";
// import Meta, { blue as BlueStory } from "./Button.stories.mdx";
// const Blue = composeStory(BlueStory, Meta);

test("Should render a button", () => {
  render(<Button>click</Button>);
  const button = screen.getByText("click").closest("button");
  expect(button).not.toBeNull();
});

test("Should include 'blue' class", () => {
  render(<Button className="blue">click</Button>);
  const classToMatch = "blue";
  const button = screen.getByText("click").closest("button");
  expect(button).toHaveClass(classToMatch);
  expect(button.classList.contains(classToMatch)).toBe(true);
});

test("Should not include 'blue' class", () => {
  render(<Button className="white">click</Button>);
  const classToMatch = "blue";
  const button = screen.getByText("click").closest("button");
  expect(button).not.toHaveClass(classToMatch);
  expect(button.classList.contains(classToMatch)).toBe(false);
});

test("Should include 'button' class by default", () => {
  render(<Button>click</Button>);
  const classToMatch = "button";
  const button = screen.getByText("click").closest("button");
  expect(button).toHaveClass(classToMatch);
  expect(button.classList.contains(classToMatch)).toBe(true);
});

test("Should have download", () => {
  render(<Button isDownload={true}>A</Button>);
  const button = screen.getByText("Download file").closest("button");
  expect(button).toBeInTheDocument();
  // const svg = document.querySelector("svg");
  // expect(svg).toBeDefined();
  // expect(svg).toBeInTheDocument();
});

test("Should have attribute href", () => {
  render(
    <Button type="link" to="/go-there">
      click
    </Button>
  );
  const a = document.querySelector("a");
  expect(a).toHaveAttribute("href");
});

test("Should have attribute href and match", () => {
  render(
    <Button type="link" to="/go-there">
      click
    </Button>
  );
  const href = "/go-there";
  const a = document.querySelector("a");
  expect(a.getAttribute("href")).toEqual(href);
});

test("Should have type=link", () => {
  render(
    <Button type="link" to="/go-there">
      click
    </Button>
  );
  const type = "link";
  const a = document.querySelector("a");
  expect(a.getAttribute("type")).toEqual(type);
});

test("Should have 'a' tag", () => {
  render(
    <Button type="link" to="/go-there">
      click
    </Button>
  );
  const a = document.querySelector("a");
  expect(a).toBeInTheDocument();
});

test("Should not have a tag - missing 'to' prop", () => {
  render(<Button type="link">click</Button>);
  const a = document.querySelector("a");
  expect(a).not.toBeInTheDocument();
});

test("Should not have a tag - missing 'type=link' prop", () => {
  render(<Button to="/go-there">click</Button>);
  const a = document.querySelector("a");
  expect(a).not.toBeInTheDocument();
});

test("Should render a button as disabled", () => {
  render(<Button disabled={true}>click</Button>);
  const button = screen.getByText("click").closest("button");
  expect(button).toBeDisabled();
  expect(button).toHaveAttribute("disabled");
});

test("Should execute function passed as onClick prop - change", () => {
  const Wrapper = () => {
    const initialState = "NOTHING HERE.";
    const [word, setWord] = useState(initialState);
    const change = (newWord) => setWord(newWord);
    return (
      <div>
        <h1 data-testid="my-h1">{word}</h1>
        <Button onClick={() => change("NEW WORD")}>click</Button>
        <Button onClick={() => change(initialState)}>reset</Button>
      </div>
    );
  };

  render(<Wrapper />);

  const div = document.querySelector("div");
  const button = within(div).getByText("click").closest("button");

  userEvent.click(button);

  expect(screen.getByText("NEW WORD")).not.toBeNull();
});

test("Should execute function passed as onClick prop - counter", () => {
  const Wrapper = () => {
    const [counter, setCounter] = React.useState(0);
    const increment = () => setCounter((prev) => prev + 1);
    return (
      <div>
        <h1 data-testid="my-h1">{counter}</h1>
        <Button onClick={increment}>click</Button>
      </div>
    );
  };

  render(<Wrapper />);

  const div = document.querySelector("div");
  const button = within(div).getByText("click").closest("button");
  const result = screen.getByTestId("my-h1");

  userEvent.click(button);
  userEvent.click(button);
  userEvent.click(button);

  expect(result.textContent).toEqual("3");
});

// test("Should pass ref", () => {
//   const Wrapper = () => {
//     const initialState = "NOTHING HERE.";
//     const [word, setWord] = useState(initialState);
//     const change = (newWord) => setWord(newWord);
//     const parentRef = useRef("OLD REF");
//     useEffect(() => {
//       console.log("parentRef", parentRef);
//       console.log("word", word);
//     });
//     return (
//       <>
//         <h1 data-testid="my-h1">{word}</h1>
//         <Button onClick={change} ref={parentRef}>
//           click
//         </Button>
//       </>
//     );
//   };

// test("Should pass ref", () => {
//   const Wrapper = () => {
//     const parentRef = useRef("initial ref set in the parent");
//     return <Button ref={parentRef}>click</Button>;
//   };

//   render(<Wrapper />);

//   const div = document.querySelector("div");
//   const button = within(div).getByText("click").closest("button");

//   expect(button).toHaveAttribute("alt");
// });
