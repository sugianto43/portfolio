import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button } from "@/components/ui/button";

describe("Button", () => {
  it("renders its children", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument();
  });

  it("applies the accent variant class", () => {
    render(<Button variant="accent">Accent</Button>);
    expect(screen.getByRole("button", { name: "Accent" })).toHaveClass(
      "bg-accent"
    );
  });

  it("renders as the child element when asChild is set", () => {
    render(
      <Button asChild>
        <a href="/resume.pdf">Download</a>
      </Button>
    );
    const link = screen.getByRole("link", { name: "Download" });
    expect(link).toHaveAttribute("href", "/resume.pdf");
  });
});
