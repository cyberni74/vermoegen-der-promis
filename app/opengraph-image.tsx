import { ImageResponse } from "next/og";

export const alt = "Vermögen der Promis – Schätzungen 2026";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f3eee6",
          color: "#1c1712",
          padding: "64px",
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: "0.18em", textTransform: "uppercase", color: "#8a6a32" }}>
          Schätzungen · 2026
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, lineHeight: 1, fontWeight: 600 }}>Vermögen der Promis</div>
          <div style={{ marginTop: 24, fontSize: 32, color: "#5f574e" }}>
            Nettovermögen 2026. Jede Zahl ist eine Schätzung.
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
