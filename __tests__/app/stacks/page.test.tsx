import { render, screen } from "@testing-library/react";
import StacksPage from "../../../src/app/stacks/page"; // Adjust path if using path aliases

// 1. Mock the TechCanvas component to intercept the props passed to it
jest.mock("../../../src/components/Stacks-Animation/page", () => {
  return function MockTechCanvas({
    techStack,
  }: {
    techStack: Array<{ name: string; iconId: string }>;
  }) {
    return (
      <div data-testid="mock-tech-canvas">
        {techStack.map((tech) => (
          <div key={tech.iconId} data-testid="tech-item">
            <span data-testid="tech-name">{tech.name}</span>
            <span data-testid="tech-id">{tech.iconId}</span>
          </div>
        ))}
      </div>
    );
  };
});

describe("Stacks Page", () => {
  it("renders the TechCanvas canvas container wrapper successfully", () => {
    render(<StacksPage />);

    // Check if the component wrapper actually rendered
    const canvasWrapper = screen.getByTestId("mock-tech-canvas");
    expect(canvasWrapper).toBeInTheDocument();
  });

  it("passes the complete tech stack data array to the canvas sub-component", () => {
    render(<StacksPage />);

    // Assert total count of elements rendered from the data array
    const totalItems = screen.getAllByTestId("tech-item");
    expect(totalItems.length).toBe(22); // Based on your 22 array elements

    // Sample check specific elements are correctly mapped and forwarded
    expect(screen.getByText("NODE.JS")).toBeInTheDocument();
    expect(screen.getByText("react")).toBeInTheDocument();
    expect(screen.getByText("Next.js")).toBeInTheDocument();
    expect(screen.getByText("lambda")).toBeInTheDocument();
  });
});
