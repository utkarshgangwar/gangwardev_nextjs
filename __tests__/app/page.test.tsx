import { render, screen } from "@testing-library/react";
import Home from "../../src/app/page"; // Adjust path if using path aliases

// 1. Mock the inner HomePage component to isolate the page entry point
jest.mock("../../src/components/Home/page", () => {
  return function MockInnerHomePage() {
    return (
      <div data-testid="mock-home-page">
        <h1>Welcome to Utkarsh's Portfolio</h1>
        <p>Main landing view component content</p>
      </div>
    );
  };
});

describe("Root Home Page Entry", () => {
  it("renders the root page structural layout shell successfully", () => {
    render(<Home />);

    // Check if the entry point component successfully loaded the module wrapper
    const mainWrapper = screen.getByTestId("mock-home-page");
    expect(mainWrapper).toBeInTheDocument();
  });

  it("contains the expected header elements from the inner component mockup", () => {
    render(<Home />);

    // Verify key layout text strings are presented to the document frame safely
    const primaryHeading = screen.getByRole("heading", { level: 1 });
    expect(primaryHeading).toHaveTextContent("Welcome to Utkarsh's Portfolio");

    const descriptionText = screen.getByText(
      /Main landing view component content/i,
    );
    expect(descriptionText).toBeInTheDocument();
  });
});
