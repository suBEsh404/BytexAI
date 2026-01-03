// src/pages/ProjectAnalysis.jsx
import React, { useEffect, useMemo, useState } from "react";

/**
 * Project Analysis Page
 * - Mock data + simple SVG charts (no external libs)
 * - Responsive, dark-theme friendly
 * - Route: /ProjectAnalysis
 */

/* --- helper: mock projects --- */
const SAMPLE_PROJECTS = [
  { id: "1", title: "Voice Assistant Pro" },
  { id: "2", title: "Object DetectX" },
  { id: "3", title: "DesignGen" }
];

/* --- generate mock timeseries --- */
function makeTimeseries(points = 24, base = 400) {
  const arr = [];
  for (let i = 0; i < points; i++) {
    const jitter = Math.round((Math.sin(i / 3.5) + 1) * 20 + Math.random() * 30);
    arr.push(Math.max(0, base + jitter - i * (base * 0.005)));
  }
  return arr;
}

/* --- CSV export --- */
function downloadCSV(filename, rows) {
  const header = Object.keys(rows[0] || {}).join(",");
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

/* --- small sparkline SVG --- */
function Sparkline({ values = [], width = 220, height = 48, stroke = "var(--primary)" }) {
  if (!values || values.length === 0) return null;
  const max = Math.max(...values);
  const min = Math.min(...values);
  const len = values.length;
  const points = values.map((v, i) => {
    const x = (i / (len - 1)) * width;
    const y = height - ((v - min) / Math.max(1, max - min)) * height;
    return `${x},${y}`;
  });
  const d = `M${points.join(" L ")}`;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ overflow: "visible" }}>
      <path d={d} fill="none" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* subtle area */}
      <path d={`${d} L ${width},${height} L 0,${height} Z`} fill={stroke} opacity="0.06" />
    </svg>
  );
}

/* --- small donut chart --- */
function Donut({ data = [], size = 120, thickness = 18 }) {
  const total = data.reduce((s, x) => s + x.value, 0) || 1;
  let angle = -90;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <defs>
        <filter id="s" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="rgba(0,0,0,0.25)" />
        </filter>
      </defs>
      <g transform={`translate(${size / 2},${size / 2})`}>
        {data.map((d, i) => {
          const angleDelta = (d.value / total) * 360;
          const start = (angle * Math.PI) / 180;
          const end = ((angle + angleDelta) * Math.PI) / 180;
          const r = size / 2 - 2;
          const x1 = Math.cos(start) * (r - thickness / 2);
          const y1 = Math.sin(start) * (r - thickness / 2);
          const x2 = Math.cos(end) * (r - thickness / 2);
          const y2 = Math.sin(end) * (r - thickness / 2);
          const large = angleDelta > 180 ? 1 : 0;
          const path = `M ${Math.cos(start) * r} ${Math.sin(start) * r} A ${r} ${r} 0 ${large} 1 ${Math.cos(end) * r} ${Math.sin(end) * r}`;
          angle += angleDelta;
          return (
            <path
              key={i}
              d={path}
              stroke={d.color}
              strokeWidth={thickness}
              fill="none"
              strokeLinecap="butt"
              style={{ filter: "url(#s)" }}
            />
          );
        })}
        {/* inner circle to create donut hole */}
        <circle r={size / 2 - thickness - 2} fill="var(--card)" />
      </g>
    </svg>
  );
}

/* --- latency bars --- */
function LatencyBars({ buckets = [] }) {
  const max = Math.max(...buckets.map((b) => b.value), 1);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {buckets.map((b, i) => (
        <div key={i} style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <div style={{ width: 72, color: "var(--muted)", fontSize: 13 }}>{b.label}</div>
          <div style={{ flex: 1, height: 10, background: "rgba(0,0,0,0.06)", borderRadius: 8, overflow: "hidden" }}>
            <div style={{ width: `${Math.round((b.value / max) * 100)}%`, height: "100%", background: "var(--primary)" }} />
          </div>
          <div style={{ width: 48, textAlign: "right", color: "var(--muted)", fontSize: 13 }}>{b.value}</div>
        </div>
      ))}
    </div>
  );
}

/* === main component === */
export default function ProjectAnalysis() {
  const [projectId, setProjectId] = useState(SAMPLE_PROJECTS[0].id);
  const [range, setRange] = useState("24h"); // 24h | 7d | 30d
  const series = useMemo(() => {
    if (range === "24h") return makeTimeseries(24, 380);
    if (range === "7d") return makeTimeseries(28, 420);
    return makeTimeseries(30, 520);
  }, [range, projectId]);

  // mock KPIs
  const kpis = useMemo(() => {
    const req = Math.round(series.reduce((s, v) => s + v, 0));
    const errors = Math.round(req * (0.01 + Math.random() * 0.02));
    const latency = Math.round(120 + Math.random() * 80);
    const uptime = (99 + Math.random()).toFixed(2);
    const acc = (75 + Math.random() * 20).toFixed(1);
    const active = Math.round(120 + Math.random() * 500);
    return { requests: req, errors, latency, uptime, accuracy: acc, active };
  }, [series]);

  const trafficData = [
    { label: "Web", value: 54, color: "#4F46E5" },
    { label: "API", value: 28, color: "#0EA5E9" },
    { label: "Mobile", value: 12, color: "#F59E0B" },
    { label: "Other", value: 6, color: "#10B981" }
  ];

  const latencyBuckets = [
    { label: "<100ms", value: Math.round(Math.random() * 120) },
    { label: "100–200ms", value: Math.round(Math.random() * 200) },
    { label: "200–500ms", value: Math.round(Math.random() * 100) },
    { label: ">500ms", value: Math.round(Math.random() * 30) }
  ];

  // mock recent errors
  const recentErrors = [
    { id: 1, time: "2025-12-07 21:12", code: "500", message: "Model inference timed out" },
    { id: 2, time: "2025-12-07 18:03", code: "429", message: "Rate limit exceeded" },
    { id: 3, time: "2025-12-06 09:22", code: "502", message: "Upstream gateway error" }
  ];

  const handleExport = () => {
    const rows = series.map((v, i) => ({ ts: i, value: v }));
    downloadCSV(`${projectId}-timeseries.csv`, rows);
  };

  return (
    <div className="app-container" style={{ paddingTop: 96 }}>
      {/* header */}
      <div style={{ display: "flex", gap: 16, alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 26 }}>Project Analysis</h1>
          <div style={{ color: "var(--muted)", marginTop: 6 }}>Performance, reliability and usage insights</div>
        </div>

        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <select value={projectId} onChange={(e) => setProjectId(e.target.value)} style={{ padding: "8px 10px", borderRadius: 8, background: "var(--card)", border: "1px solid rgba(0,0,0,0.06)" }}>
            {SAMPLE_PROJECTS.map((p) => (
              <option key={p.id} value={p.id}>{p.title}</option>
            ))}
          </select>

          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn btn-outline" onClick={() => setRange("24h")}>24h</button>
            <button className="btn btn-outline" onClick={() => setRange("7d")}>7d</button>
            <button className="btn btn-outline" onClick={() => setRange("30d")}>30d</button>
          </div>

          <button className="btn btn-primary" onClick={handleExport}>Export CSV</button>
        </div>
      </div>

      {/* KPI cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12, marginTop: 18 }}>
        <div className="card" style={{ padding: 14 }}>
          <div style={{ color: "var(--muted)", fontSize: 13 }}>Requests</div>
          <div style={{ fontSize: 20, fontWeight: 800, marginTop: 6 }}>{kpis.requests.toLocaleString()}</div>
          <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 8 }}>
            <Sparkline values={series.slice(-16)} />
            <div style={{ color: "var(--muted)", fontSize: 13 }}>trend</div>
          </div>
        </div>

        <div className="card" style={{ padding: 14 }}>
          <div style={{ color: "var(--muted)", fontSize: 13 }}>Errors</div>
          <div style={{ fontSize: 20, fontWeight: 800, marginTop: 6 }}>{kpis.errors}</div>
          <div style={{ marginTop: 8, color: kpis.errors > 100 ? "var(--danger)" : "var(--muted)" }}>error rate {(kpis.errors / Math.max(1, kpis.requests) * 100).toFixed(2)}%</div>
        </div>

        <div className="card" style={{ padding: 14 }}>
          <div style={{ color: "var(--muted)", fontSize: 13 }}>Median Latency</div>
          <div style={{ fontSize: 20, fontWeight: 800, marginTop: 6 }}>{kpis.latency} ms</div>
          <div style={{ marginTop: 8, color: "var(--muted)" }}>p95 ~ {kpis.latency * 2} ms</div>
        </div>

        <div className="card" style={{ padding: 14 }}>
          <div style={{ color: "var(--muted)", fontSize: 13 }}>Uptime</div>
          <div style={{ fontSize: 20, fontWeight: 800, marginTop: 6 }}>{kpis.uptime}%</div>
          <div style={{ marginTop: 8, color: "var(--muted)" }}>last 30d</div>
        </div>

        <div className="card" style={{ padding: 14 }}>
          <div style={{ color: "var(--muted)", fontSize: 13 }}>Model Accuracy</div>
          <div style={{ fontSize: 20, fontWeight: 800, marginTop: 6 }}>{kpis.accuracy}%</div>
          <div style={{ marginTop: 8, color: "var(--muted)" }}>validation set</div>
        </div>

        <div className="card" style={{ padding: 14 }}>
          <div style={{ color: "var(--muted)", fontSize: 13 }}>Active Users</div>
          <div style={{ fontSize: 20, fontWeight: 800, marginTop: 6 }}>{kpis.active}</div>
          <div style={{ marginTop: 8, color: "var(--muted)" }}>connected</div>
        </div>
      </div>

      {/* Main charts row */}
      <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 12, marginTop: 16 }}>
        {/* left: requests line + latency */}
        <div className="card" style={{ padding: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ color: "var(--muted)", fontSize: 13 }}>Request Trend</div>
              <div style={{ fontWeight: 800, fontSize: 18 }}>{SAMPLE_PROJECTS.find(p => p.id === projectId)?.title}</div>
            </div>
            <div style={{ color: "var(--muted)", fontSize: 13 }}>{range} • {series.length} points</div>
          </div>

          <div style={{ marginTop: 12 }}>
            <Sparkline values={series} width={700} />
          </div>

          <div style={{ marginTop: 16, display: "flex", gap: 18 }}>
            <div style={{ flex: 1 }}>
              <div style={{ color: "var(--muted)", fontSize: 13 }}>Latency distribution</div>
              <div style={{ marginTop: 10 }}>
                <LatencyBars buckets={latencyBuckets} />
              </div>
            </div>

            <div style={{ width: 220 }}>
              <div style={{ color: "var(--muted)", fontSize: 13 }}>Traffic sources</div>
              <div style={{ display: "flex", gap: 10, alignItems: "center", marginTop: 10 }}>
                <Donut data={trafficData} size={120} thickness={18} />
                <div>
                  {trafficData.map((t) => (
                    <div key={t.label} style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}>
                      <div style={{ width: 10, height: 10, background: t.color, borderRadius: 3 }} />
                      <div style={{ color: "var(--text)", fontWeight: 700 }}>{t.label}</div>
                      <div style={{ marginLeft: "auto", color: "var(--muted)" }}>{t.value}%</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* right: errors table + suggestions */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div className="card" style={{ padding: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ color: "var(--muted)", fontSize: 13 }}>Recent errors</div>
                <div style={{ fontWeight: 800, marginTop: 4 }}>Top issues</div>
              </div>

              <button className="btn btn-outline" onClick={() => downloadCSV(`${projectId}-errors.csv`, recentErrors)}>Export</button>
            </div>

            <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 8 }}>
              {recentErrors.map((err) => (
                <div key={err.id} style={{ display: "flex", gap: 10, alignItems: "center", padding: 8, borderRadius: 8, background: "rgba(0,0,0,0.03)" }}>
                  <div style={{ width: 48, textAlign: "center", fontWeight: 800, color: "var(--danger)" }}>{err.code}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700 }}>{err.message}</div>
                    <div style={{ color: "var(--muted)", fontSize: 12 }}>{err.time}</div>
                  </div>
                  <div>
                    <button className="btn btn-outline">Investigate</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card" style={{ padding: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ color: "var(--muted)", fontSize: 13 }}>AI Suggestions</div>
                <div style={{ fontWeight: 800, marginTop: 6 }}>Actionable insights</div>
              </div>
              <div style={{ color: "var(--muted)", fontSize: 12 }}>Auto-generated</div>
            </div>

            <ul style={{ marginTop: 12, color: "var(--text)" }}>
              <li style={{ marginBottom: 8 }}>Add caching for heavy model outputs to reduce p95 latency.</li>
              <li style={{ marginBottom: 8 }}>Introduce circuit-breaker for unstable upstreams (reduces 502/504).</li>
              <li style={{ marginBottom: 8 }}>Add sample prompts to the landing page to reduce low-quality queries.</li>
            </ul>

            <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
              <button className="btn btn-primary">Apply recommended changes</button>
              <button className="btn btn-outline">Save as ticket</button>
            </div>
          </div>
        </div>
      </div>

      {/* footer spacer */}
      <div style={{ height: 80 }} />
    </div>
  );
}
