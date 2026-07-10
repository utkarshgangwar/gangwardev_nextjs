import { render, screen } from "@testing-library/react";
import AboutDesk from "../../../src/app/about/page"; // Adjust path if using path aliases

// 1. Mock the sub-component PaintingSlider to avoid canvas/carousel rendering issues in Jest
jest.mock("../../../src/components/About-Left-Section/page", () => {
  return function MockPaintingSlider() {
    return <div data-testid="painting-slider">Mocked Painting Slider</div>;
  };
});

describe("About Page (AboutDesk)", () => {
  it("renders the profile information and summary details successfully", async () => {
    // 2. Resolve the async Server Component before rendering
    const ResolvedAboutDesk = await AboutDesk();
    render(ResolvedAboutDesk);

    // 3. Test that key profile identifiers render correctly
    const nameHeading = screen.getByRole("heading", {
      name: /Utkarsh Gangwar/i,
    });
    expect(nameHeading).toBeInTheDocument();

    const roleText = screen.getByText(/MERN Stack Developer/i);
    expect(roleText).toBeInTheDocument();

    const locationText = screen.getByText(/Indore, India/i);
    expect(locationText).toBeInTheDocument();

    // 4. Test that the Summary section content is visible
    const summaryHeading = screen.getByRole("heading", { name: /Summary/i });
    expect(summaryHeading).toBeInTheDocument();

    const experienceText = screen.getByText(
      /5 years of experience specializing in the MERN stack/i,
    );
    expect(experienceText).toBeInTheDocument();

    // 5. Verify the mocked sub-component rendered safely
    const slider = screen.getByTestId("painting-slider");
    expect(slider).toBeInTheDocument();
  });

  it("renders standard technical skills tags from the array", async () => {
    const ResolvedAboutDesk = await AboutDesk();
    render(ResolvedAboutDesk);

    // Test a sample of explicit technical skill strings rendered in the template mapping
    expect(screen.getByText("React.js")).toBeInTheDocument();
    expect(screen.getByText("Next.js")).toBeInTheDocument();
    expect(screen.getByText("AWS")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
  });
});
