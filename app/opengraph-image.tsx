import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/data";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#0c0c0e",
          color: "#fafafa",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontSize: 24,
            color: "#3b82f6",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: "#3b82f6",
            }}
          />
          ~/portfolio
        </div>
        <div style={{ display: "flex", fontSize: 72, fontWeight: 600 }}>
          {siteConfig.name}
        </div>
        <div style={{ display: "flex", fontSize: 36, color: "#a1a1aa" }}>
          {siteConfig.title}
        </div>
      </div>
    ),
    { ...size }
  );
}
