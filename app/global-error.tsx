"use client";

import * as React from "react";

// Inline styles only: this replaces the entire root layout (including <html>/<body>),
// so it can't assume Tailwind's stylesheet or the ThemeProvider survived whatever crashed.
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
          background: "#0c0c0e",
          color: "#fafafa",
        }}
      >
        <div style={{ textAlign: "center", padding: "0 1.5rem" }}>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 600, margin: 0 }}>
            Something went wrong
          </h1>
          <p style={{ color: "#a1a1aa", marginTop: "1rem" }}>
            A critical error occurred. Please try again.
          </p>
          <button
            onClick={() => reset()}
            style={{
              marginTop: "2rem",
              padding: "0.625rem 1.5rem",
              borderRadius: "9999px",
              border: "none",
              background: "#3b82f6",
              color: "#fff",
              fontSize: "0.875rem",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
