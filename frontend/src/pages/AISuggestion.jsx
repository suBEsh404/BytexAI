// src/pages/AISuggestion.jsx
import React, { useMemo, useState } from "react";

/**
 * AI Suggestions Page
 * Route: /AISuggestion
 *
 * - Mock suggestions per project
 * - Actions: Apply (mock), Save, Mark Resolved, Copy, Export CSV
 * - Clean SaaS UI using BYTEXAI theme variables
 */

const SAMPLE_PROJECTS = [
  { id: "1", name: "Voice Assistant Pro" },
  { id: "2", name: "Object DetectX" },
  { id: "3", name: "DesignGen" },
];

const SAMPLE_SUGGESTIONS = {
  "1": [
    {
      id: "s1",
      title: "Cache heavy model outputs",
      severity: "High",
      confidence: 0.91,
      description:
        "Responses from the model are expensive to compute. Cache results for repeated prompts for 5–15 minutes when inputs match.",
      tags: ["performance", "cost"],
      applied: false,
      resolved: false,
    },
    {
      id: "s2",
      title: "Add sample prompts to landing",
      severity: "Low",
      confidence: 0.83,
      description:
        "Many users submit vague queries. Provide 4-6 curated prompt examples in the demo UI to increase signal quality.",
      tags: ["ux", "product"],
      applied: false,
      resolved: false,
    },
    {
      id: "s3",
      title: "Rate-limit per-IP to prevent abuse",
      severity: "Medium",
      confidence: 0.78,
      description:
        "High request bursts may be abusive. Implement per-IP throttling and provide clearer Quota exceeded messages.",
      tags: ["reliability", "security"],
      applied: false,
      resolved: false,
    },
  ],
  "2": [
    {
      id: "s4",
      title: "Reduce input image size for on-device preproc",
      severity: "Medium",
      confidence: 0.86,
      description:
        "Large input images inflate inference time. Resize client-side to 640px width when using live video streams.",
      tags: ["performance", "edge"],
      applied: false,
      resolved: false,
    },
  ],
  "3": [
    {
      id: "s5",
      title: "Add user consent prompt before generating",
      severity: "Low",
      confidence: 0.74,
      description:
        "Generative mockups may use copyrighted assets; add a consent checkbox and TOS link before generation.",
      tags: ["compliance", "ux"],
      applied: false,
      resolved: false,
    },
  ],
};

function formatPercent(v) {
  return Math.round(v * 100) + "%";
}

function downloadCSV(filename, rows) {
  if (!rows.length) return;
  const header = Object.keys(rows[0]).join(",");
  const csv =
    header +
    "\n" +
    rows
      .map((r) =>
        Object.values(r)
          .map((v) => `"${String(v).replace(/"/g, '""')}"`)
          .join(",")
      )
      .join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export default function AISuggestion() {
  const [projectId, setProjectId] = useState(SAMPLE_PROJECTS[0].id);
  const [suggestions, setSuggestions] = useState(() => {
    // deep clone to make local editable state
    const clone = {};
    Object.keys(SAMPLE_SUGGESTIONS).forEach((k) => {
      clone[k] = SAMPLE_SUGGESTIONS[k].map((s) => ({ ...s }));
    });
    return clone;
  });
  const [query, setQuery] = useState("");
  const [filterSeverity, setFilterSeverity] = useState("All");

  const list = suggestions[projectId] || [];

  const filtered = useMemo(() => {
    return list
      .filter((s) => (filterSeverity === "All" ? true : s.severity === filterSeverity))
      .filter((s) => (query ? (s.title + s.description + s.tags.join(" ")).toLowerCase().includes(query.toLowerCase()) : true));
  }, [list, query, filterSeverity]);

  function toggleApply(id) {
    setSuggestions((prev) => {
      const copy = { ...prev };
      copy[projectId] = copy[projectId].map((s) => (s.id === id ? { ...s, applied: !s.applied } : s));
      return copy;
    });
  }

  function toggleResolved(id) {
    setSuggestions((prev) => {
      const copy = { ...prev };
      copy[projectId] = copy[projectId].map((s) => (s.id === id ? { ...s, resolved: !s.resolved } : s));
      return copy;
    });
  }

  function saveNote(id, note) {
    // local only — store note on suggestion as `note`
    setSuggestions((prev) => {
      const copy = { ...prev };
      copy[projectId] = copy[projectId].map((s) => (s.id === id ? { ...s, note } : s));
      return copy;
    });
  }

  function copyToClipboard(text) {
    navigator.clipboard?.writeText(text);
    alert("Copied to clipboard");
  }

  function exportAll() {
    const rows = (suggestions[projectId] || []).map((s) => ({
      id: s.id,
      title: s.title,
      severity: s.severity,
      confidence: formatPercent(s.confidence),
      applied: s.applied ? "yes" : "no",
      resolved: s.resolved ? "yes" : "no",
      tags: (s.tags || []).join("; "),
    }));
    downloadCSV(`${projectId}-ai-suggestions.csv`, rows);
  }

  return (
    <div className="app-container" style={{ paddingTop: 96 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 26 }}>AI Suggestions</h1>
          <div style={{ color: "var(--muted)", marginTop: 6 }}>Actionable recommendations generated by BYTEXAI</div>
        </div>

        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <select value={projectId} onChange={(e) => setProjectId(e.target.value)} style={{ padding: "8px 10px", borderRadius: 10, background: "var(--card)", border: "1px solid rgba(0,0,0,0.06)" }}>
            {SAMPLE_PROJECTS.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>

          <select value={filterSeverity} onChange={(e) => setFilterSeverity(e.target.value)} style={{ padding: "8px 10px", borderRadius: 10 }}>
            <option>All</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>

          <input placeholder="Search suggestions..." value={query} onChange={(e) => setQuery(e.target.value)} style={{ padding: "8px 10px", borderRadius: 10, minWidth: 220 }} />

          <button className="btn btn-outline" onClick={() => { setQuery(""); setFilterSeverity("All"); }}>Reset</button>
          <button className="btn btn-primary" onClick={exportAll}>Export All</button>
        </div>
      </div>

      <div style={{ height: 14 }} />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 14 }}>
        {/* left: suggestions list */}
        <div>
          <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 10 }}>
            <div style={{ fontWeight: 800, fontSize: 18 }}>{filtered.length} suggestions</div>
            <div style={{ color: "var(--muted)" }}>for {SAMPLE_PROJECTS.find(p => p.id === projectId).name}</div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {filtered.map((s) => (
              <div key={s.id} className="card" style={{ padding: 14, display: "flex", gap: 12, alignItems: "flex-start", transition: "box-shadow 220ms" }}>
                <div style={{ width: 6, height: 48, borderRadius: 6, background: s.severity === "High" ? "var(--danger)" : s.severity === "Medium" ? "var(--accent)" : "var(--primary)" }} />

                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <div style={{ fontWeight: 800 }}>{s.title}</div>
                    <div style={{ marginLeft: "auto", display: "flex", gap: 8, alignItems: "center" }}>
                      <div style={{ color: "var(--muted)", fontSize: 13 }}>{s.severity}</div>
                      <div style={{ color: "var(--muted)", fontSize: 13 }}>{formatPercent(s.confidence)}</div>
                    </div>
                  </div>

                  <div style={{ color: "var(--muted)", marginTop: 8 }}>{s.description}</div>

                  <div style={{ marginTop: 10, display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                    {(s.tags || []).map((t) => <div key={t} className="chip" style={{ padding: "6px 8px", fontSize: 12 }}>{t}</div>)}

                    <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
                      <button className="btn btn-outline" onClick={() => { toggleApply(s.id); }}> {s.applied ? "Undo Apply" : "Apply" } </button>
                      <button className="btn btn-outline" onClick={() => { copyToClipboard(JSON.stringify(s, null, 2)); }}>Copy</button>
                      <button className="btn btn-primary" onClick={() => { toggleResolved(s.id); }}>{s.resolved ? "Reopen" : "Mark Resolved"}</button>
                    </div>
                  </div>

                  <div style={{ marginTop: 10, display: "flex", gap: 8, alignItems: "center" }}>
                    <small className="text-muted">Note:</small>
                    <input
                      placeholder="Add quick note..."
                      defaultValue={s.note || ""}
                      onBlur={(e) => saveNote(s.id, e.target.value)}
                      style={{ padding: "8px 10px", borderRadius: 8, flex: 1, border: "1px solid rgba(0,0,0,0.06)" }}
                    />
                  </div>
                </div>
              </div>
            ))}

            {filtered.length === 0 && (
              <div className="card" style={{ padding: 18, textAlign: "center", color: "var(--muted)" }}>
                No suggestions match your filters.
              </div>
            )}
          </div>
        </div>

        {/* right: detail & summary */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div className="card" style={{ padding: 14 }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontSize: 14, color: "var(--muted)" }}>Summary</div>
                <div style={{ fontWeight: 800, fontSize: 18, marginTop: 6 }}>Top suggestions</div>
              </div>
              <div>
                <button className="btn btn-outline" onClick={() => exportAll()}>Export selected</button>
              </div>
            </div>

            <div style={{ marginTop: 12 }}>
              <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ color: "var(--muted)", fontSize: 13 }}>High priority</div>
                  <div style={{ fontWeight: 800, marginTop: 6 }}>
                    {listCount(suggestions[projectId] || [], (s) => s.severity === "High")} suggestions
                  </div>
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ color: "var(--muted)", fontSize: 13 }}>Applied</div>
                  <div style={{ fontWeight: 800, marginTop: 6 }}>
                    {listCount(suggestions[projectId] || [], (s) => s.applied)} applied
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", gap: 8 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ color: "var(--muted)", fontSize: 13 }}>Avg confidence</div>
                  <div style={{ fontWeight: 800, marginTop: 6 }}>
                    {formatPercent(avgConfidence(suggestions[projectId] || []))}
                  </div>
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ color: "var(--muted)", fontSize: 13 }}>Resolved</div>
                  <div style={{ fontWeight: 800, marginTop: 6 }}>
                    {listCount(suggestions[projectId] || [], (s) => s.resolved)} items
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card" style={{ padding: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 14, color: "var(--muted)" }}>Quick actions</div>
                <div style={{ fontWeight: 800, marginTop: 6 }}>Batch operations</div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  className="btn btn-outline"
                  onClick={() => {
                    // mark all visible suggestions as applied
                    setSuggestions((prev) => {
                      const copy = { ...prev };
                      copy[projectId] = (copy[projectId] || []).map((s) => ({ ...s, applied: true }));
                      return copy;
                    });
                  }}
                >
                  Apply all
                </button>

                <button
                  className="btn btn-outline"
                  onClick={() => {
                    setSuggestions((prev) => {
                      const copy = { ...prev };
                      copy[projectId] = (copy[projectId] || []).map((s) => ({ ...s, resolved: false }));
                      return copy;
                    });
                  }}
                >
                  Reset resolved
                </button>
              </div>
            </div>

            <div style={{ marginTop: 12, color: "var(--muted)" }}>
              These actions are frontend mockups. When you integrate with backend/ops, wire each action to API calls (create ticket, apply infra changes, close issue).
            </div>
          </div>

          <div className="card" style={{ padding: 14 }}>
            <div style={{ fontWeight: 800 }}>Explainability</div>
            <div style={{ color: "var(--muted)", marginTop: 8 }}>
              Each suggestion includes a confidence score and recommended steps. You can attach playbooks or automate ticket creation in future.
            </div>
            <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
              <button className="btn btn-primary" onClick={() => alert("Run a dry-run (mock) — no changes applied.")}>Run Dry-Run</button>
              <button className="btn btn-outline" onClick={() => copyToClipboard(JSON.stringify(filtered, null, 2))}>Export visible</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ----- helpers (kept below component to keep file single) ----- */
function listCount(arr = [], fn) {
  return (arr || []).filter(fn).length;
}
function avgConfidence(arr = []) {
  if (!arr.length) return 0;
  const v = arr.reduce((s, x) => s + (x.confidence || 0), 0) / arr.length;
  return Math.round(v * 100) / 100;
}
function copyToClipboard(txt) {
  navigator.clipboard?.writeText(txt);
  alert("Copied to clipboard");
}
