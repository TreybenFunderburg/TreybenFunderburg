import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          background: "#0a0a0a",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 136,
            height: 136,
            background: "#00d4ff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            clipPath: "polygon(0 0, 112px 0, 136px 24px, 136px 136px, 24px 136px, 0 112px)",
            fontFamily: "sans-serif",
            fontWeight: 800,
            fontSize: 52,
            color: "#000",
            letterSpacing: "-1px",
          }}
        >
          FW
        </div>
      </div>
    ),
    { ...size }
  );
}
