// src/pages/HomePlaceholder.jsx
import { Link } from "react-router-dom";

export default function HomePlaceholder() {
  return (
    <div className="app-container" style={{ paddingTop: 100 }}>

      {/* HERO SECTION */}
      <div
        style={{
          padding: "40px 24px",
          borderRadius: 18,
          background: "linear-gradient(135deg, rgba(79,70,229,0.20), rgba(14,165,233,0.10))",
          boxShadow: "0 20px 50px rgba(0,0,0,0.35)",
          border: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: 36,
            fontWeight: 900,
            color: "var(--text)",
          }}
        >
          Welcome to BYTEXAI 🚀
        </h1>

        <p
          style={{
            marginTop: 12,
            color: "var(--muted)",
            fontSize: 17,
            lineHeight: "1.6",
          }}
        >
          Explore AI projects, read insights, write reviews, and discover smart
          suggestions powered by AI.  
          Browse any project or start with our demo below.
        </p>

        {/* CTA BUTTONS */}
        <div style={{ marginTop: 24, display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link to="/ProductDetails/1" className="btn btn-primary" style={{ padding: "12px 18px" }}>
            Open Demo Project
          </Link>

          <Link to="/Bookmarks" className="btn btn-outline" style={{ padding: "12px 18px" }}>
            View Bookmarks
          </Link>

          <Link to="/AISuggestion" className="btn btn-outline" style={{ padding: "12px 18px" }}>
            AI Suggestions
          </Link>
        </div>
      </div>

      {/* FEATURED SECTION */}
      <div style={{ marginTop: 40 }}>
        <h2 style={{ fontSize: 26, fontWeight: 800, color: "var(--text)" }}>
          Featured Demo Project
        </h2>
        <p className="text-muted" style={{ marginTop: 6 }}>
          A sample AI tool to explore the full BYTEXAI UI.
        </p>

        {/* PROJECT CARD */}
        <Link
          to="/ProductDetails/1"
          style={{
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <div
            className="card"
            style={{
              display: "flex",
              marginTop: 16,
              gap: 16,
              padding: 16,
              borderRadius: 16,
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: 120,
                height: 90,
                borderRadius: 10,
                overflow: "hidden",
                flexShrink: 0,
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200&auto=format&fit=crop"
                alt="Demo AI Project"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>

            <div style={{ flex: 1 }}>
              <h3 style={{ margin: 0, fontSize: 20, fontWeight: 800 }}>
                AI Demo Project
              </h3>
              <p className="text-muted" style={{ marginTop: 6, fontSize: 14 }}>
                Experience the BYTEXAI project detail layout, review system, gallery,
                hero image, and more.
              </p>

              <div style={{ marginTop: 10 }}>
                <span className="chip chip-primary">AI</span>
                <span className="chip chip-accent" style={{ marginLeft: 8 }}>
                  Demo
                </span>
              </div>
            </div>

            <div style={{ marginLeft: "auto" }}>
              <div
                className="btn btn-outline"
                style={{ padding: "10px 14px", whiteSpace: "nowrap" }}
              >
                View Details →
              </div>
            </div>
          </div>
        </Link>
      </div>

      <div style={{ height: 60 }} />
    </div>
  );
}
