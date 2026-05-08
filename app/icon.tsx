import { ImageResponse } from "next/og";

export const contentType = "image/png";
export const size = {
  width: 512,
  height: 512,
};

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background:
            "radial-gradient(circle at 30% 28%, rgba(0,229,255,0.25), rgba(10,10,15,1) 56%), linear-gradient(145deg, #0a0a0f, #141526)",
          color: "#e8e8f0",
          display: "flex",
          height: "100%",
          justifyContent: "center",
          position: "relative",
          width: "100%",
        }}
      >
        <div
          style={{
            border: "3px solid rgba(0,229,255,0.24)",
            borderRadius: "28%",
            height: "84%",
            position: "absolute",
            width: "84%",
          }}
        />
        <div
          style={{
            display: "flex",
            fontFamily: "sans-serif",
            fontSize: 220,
            fontWeight: 800,
            letterSpacing: "-0.08em",
            lineHeight: 1,
          }}
        >
          <span>S</span>
          <span style={{ color: "#00e5ff" }}>.</span>
          <span style={{ color: "#7b61ff" }}>A</span>
        </div>
      </div>
    ),
    size
  );
}
