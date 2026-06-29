import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.legalName} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #042334 0%, #053e5c 60%, #0a6394 100%)",
          padding: "72px",
          color: "#f6f6f4",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 26,
            letterSpacing: "3px",
            textTransform: "uppercase",
            color: "#ee9c45",
            fontWeight: 700,
          }}
        >
          <span>EGY·KEN Builders</span>
          <span>NCA 1 · Nairobi</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              width: 72,
              height: 6,
              background: "#ee9c45",
              marginBottom: 36,
            }}
          />
          <div style={{ display: "flex", flexDirection: "column", fontSize: 78, fontWeight: 800, lineHeight: 1.06, letterSpacing: "-2px" }}>
            <span>We build landmark structures,</span>
            <span style={{ color: "#ee9c45" }}>engineered to last.</span>
          </div>
        </div>

        <div style={{ fontSize: 28, color: "#b8bbba", maxWidth: 920 }}>
          {`${site.tagline} · Building & Civil Engineering across East Africa.`}
        </div>
      </div>
    ),
    { ...size },
  );
}
