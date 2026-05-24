import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: "#00d4ff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          clipPath: "polygon(0 0, 26px 0, 32px 6px, 32px 32px, 6px 32px, 0 26px)",
          fontFamily: "sans-serif",
          fontWeight: 800,
          fontSize: 12,
          color: "#000",
          letterSpacing: "-0.5px",
        }}
      >
        FW
      </div>
    ),
    { ...size }
  );
}
