import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "MaakMijnCV — Gratis CV maken in 5 minuten";
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
          background: "#F0EFEA",
          padding: "72px 84px",
          fontFamily: "sans-serif",
          color: "#1A1919",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 22,
              height: 22,
              borderRadius: 999,
              background: "#A3CBA9",
              display: "flex",
            }}
          />
          <div style={{ fontSize: 34, fontWeight: 700, display: "flex" }}>
            MaakMijnCV
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 22,
          }}
        >
          <div
            style={{
              fontSize: 84,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -1.5,
              display: "flex",
            }}
          >
            Gratis CV maken in 5 minuten.
          </div>
          <div
            style={{
              fontSize: 30,
              lineHeight: 1.3,
              color: "#444",
              display: "flex",
            }}
          >
            14 ATS-vriendelijke templates. Geen account. Direct downloaden als
            PDF.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 24,
            color: "#5b5b5b",
          }}
        >
          <div style={{ display: "flex", gap: 28 }}>
            <div style={{ display: "flex" }}>ATS-proof</div>
            <div style={{ display: "flex" }}>Geen account</div>
            <div style={{ display: "flex" }}>Nederlands en Engels</div>
          </div>
          <div
            style={{
              display: "flex",
              background: "#A3CBA9",
              color: "#1A1919",
              padding: "14px 26px",
              borderRadius: 999,
              fontWeight: 700,
              fontSize: 24,
            }}
          >
            Start gratis
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
