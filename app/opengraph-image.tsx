import { ImageResponse } from "next/og";

export const alt = "Funderworks — Modern Websites for Local Businesses";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: "#0a0a0a",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* FW mark */}
        <div
          style={{
            width: 60,
            height: 60,
            background: "#00d4ff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            clipPath: "polygon(0 0, 49px 0, 60px 11px, 60px 60px, 11px 60px, 0 49px)",
            fontFamily: "sans-serif",
            fontWeight: 800,
            fontSize: 22,
            color: "#000",
            marginBottom: 36,
          }}
        >
          FW
        </div>

        {/* Wordmark */}
        <div
          style={{
            fontFamily: "sans-serif",
            fontWeight: 800,
            fontSize: 88,
            color: "#f0f0f0",
            letterSpacing: "-3px",
            lineHeight: 1,
            marginBottom: 20,
          }}
        >
          Funderworks
        </div>

        {/* Tagline */}
        <div
          style={{
            fontFamily: "sans-serif",
            fontWeight: 400,
            fontSize: 26,
            color: "#555555",
            marginBottom: 52,
            letterSpacing: "0.01em",
          }}
        >
          Modern Websites for Local Businesses
        </div>

        {/* Location pill */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            border: "1px solid rgba(0, 212, 255, 0.25)",
            padding: "8px 20px",
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#00d4ff",
            }}
          />
          <div
            style={{
              fontFamily: "sans-serif",
              fontWeight: 400,
              fontSize: 14,
              color: "#00d4ff",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            Charlotte, NC
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
