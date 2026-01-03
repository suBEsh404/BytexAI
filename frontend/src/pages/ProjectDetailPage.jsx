// src/pages/ProjectDetailPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeftRight, Rocket, Bookmark, PenTool, Link, Target, Clipboard, Check, X, BarChart3, Lightbulb, Star } from "lucide-react";
import RatingStars from "../components/RatingStars";
import { getProject, getProjectReviews, toggleBookmark } from "../services/projectService";
import { useAuth } from "../context/AuthContext";

/**
 * ProjectDetailPage — final combined version
 * - Forced AI demo hero image (Unsplash)
 * - Secondary image
 * - Use project screenshots if available (fallback to AI demo)
 * - Hero fade + zoom animations
 * - Gallery thumbnail hover animations
 * - Structured, responsive layout for BYTEXAI dark theme
 */

// ---------- IMAGES ----------
const HERO_AI_IMAGE =
  "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200&auto=format&fit=crop";

const SECONDARY_AI_IMAGE =
  "https://images.unsplash.com/photo-1676299081847-bbdc771adf08?q=80&w=1200&auto=format&fit=crop";

const FALLBACK_IMAGE = HERO_AI_IMAGE;
const FALLBACK_LOGO = "https://picsum.photos/200?grayscale";

export default function ProjectDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [project, setProject] = useState(null);
  const [heroImage, setHeroImage] = useState(HERO_AI_IMAGE);
  const [secondaryImage, setSecondaryImage] = useState(SECONDARY_AI_IMAGE);

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [distribution, setDistribution] = useState([0, 0, 0, 0, 0]);

  // review form
  const [ratingValue, setRatingValue] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // load project + reviews
  useEffect(() => {
    loadAll();
    // eslint-disable-next-line
  }, [id]);

  async function loadAll() {
    setLoading(true);
    try {
      const p = await getProject(id);
      const r = await getProjectReviews(id);
      setProject(p || null);
      setReviews(r || []);
      computeDistribution(r || []);

      // If project provides screenshots, use them, otherwise keep AI demo images
      const screenshots = (p && Array.isArray(p.screenshots) ? p.screenshots.filter(Boolean) : []);
      if (screenshots.length >= 2) {
        setHeroImage(screenshots[0]);
        setSecondaryImage(screenshots[1]);
      } else if (screenshots.length === 1) {
        setHeroImage(screenshots[0]);
        setSecondaryImage(p?.image || SECONDARY_AI_IMAGE);
      } else if (p?.image || p?.logo_url) {
        setHeroImage(p.image || p.logo_url || HERO_AI_IMAGE);
        setSecondaryImage(p.logo_url || SECONDARY_AI_IMAGE);
      } else {
        // default AI demo images
        setHeroImage(HERO_AI_IMAGE);
        setSecondaryImage(SECONDARY_AI_IMAGE);
      }
    } catch (err) {
      console.error("Failed to load project", err);
      // ensure fallback visuals
      setHeroImage(HERO_AI_IMAGE);
      setSecondaryImage(SECONDARY_AI_IMAGE);
    } finally {
      setLoading(false);
    }
  }

  function computeDistribution(arr = []) {
    const d = [0, 0, 0, 0, 0];
    arr.forEach((x) => {
      const v = Math.max(1, Math.min(5, Math.round(Number(x.rating) || 0)));
      d[v - 1] += 1;
    });
    setDistribution(d);
  }

  const handleBookmark = async () => {
    if (!user) {
      navigate("/login");
      return;
    }
    try {
      await toggleBookmark(id);
      alert("Bookmark toggled (mock)");
    } catch (err) {
      console.error(err);
      alert("Failed to toggle bookmark");
    }
  };

  const submitReview = async () => {
    if (!user) {
      navigate("/login");
      return;
    }
    setSubmitting(true);
    try {
      const newReview = {
        id: "tmp-" + Date.now(),
        user_id: user.id || "me",
        user_name: user.name || "You",
        user_role: user.role || "user",
        rating: ratingValue,
        comment,
        created_at: new Date().toISOString(),
      };
      const updated = [newReview, ...reviews];
      setReviews(updated);
      computeDistribution(updated);
      setComment("");
      setRatingValue(5);
      alert("Review added (mock)");
    } catch (err) {
      console.error(err);
      alert("Failed to add review");
    } finally {
      setSubmitting(false);
    }
  };

  // swap hero and secondary images (animated by inline transitions)
  const swapImages = () => {
    setHeroImage((prev) => {
      const current = prev;
      setSecondaryImage(current);
      return secondaryImage || FALLBACK_IMAGE;
    });
  };

  // replace hero with clicked thumbnail
  const replaceHeroWith = (src) => {
    if (!src) return;
    setHeroImage(src);
  };

  // FADE animation when heroImage changes
  useEffect(() => {
    const img = document.getElementById("bytexai-hero-img");
    if (!img) return;
    img.style.transition = "opacity 260ms ease, transform 300ms ease";
    img.style.opacity = 0;
    setTimeout(() => {
      img.style.opacity = 1;
    }, 120);
  }, [heroImage]);

  if (loading) {
    return (
      <div className="app-container" style={{ paddingTop: 100 }}>
        <div className="card" style={{ padding: 20, borderRadius: 12 }}>
          Loading project...
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="app-container" style={{ paddingTop: 100 }}>
        <div className="card" style={{ padding: 20, borderRadius: 12 }}>
          Project not found.
        </div>
      </div>
    );
  }

  const totalReviews = reviews.length;
  const avgRating =
    project.average_rating && Number(project.average_rating) > 0
      ? Number(project.average_rating).toFixed(2)
      : totalReviews
      ? (reviews.reduce((a, b) => a + Number(b.rating || 0), 0) / totalReviews).toFixed(2)
      : "—";

  // derive feature bullets from full_description if present
  const features = (project.full_description || "")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .filter((l) => /^[-•*]/.test(l))
    .map((s) => s.replace(/^[-•*]\s*/, ""))
    .slice(0, 8);

  const pct = (count) => (totalReviews ? Math.round((count / totalReviews) * 100) : 0);

  return (
    <>
      <div className="app-container">
        {/* HERO */}
        <div className="profile-card" style={{ padding: 18 }}>
          <div style={{ display: "flex", gap: 18, flexWrap: "wrap", alignItems: "flex-start" }}>
            {/* Left: hero + mini gallery */}
            <div style={{ flex: "0 0 460px", minWidth: 260 }}>
              <div
                style={{
                  borderRadius: 14,
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.04)",
                  boxShadow: "0 12px 40px rgba(2,6,23,0.6)",
                }}
              >
                <img
                  id="bytexai-hero-img"
                  src={heroImage || FALLBACK_IMAGE}
                  alt={`${project.title} hero`}
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = FALLBACK_IMAGE;
                  }}
                  style={{
                    width: "100%",
                    height: 300,
                    objectFit: "cover",
                    display: "block",
                    transform: "scale(1)",
                    transition: "transform 300ms ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                />
              </div>

              <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
                {/* Thumbnail 1 (secondaryImage) */}
                <button
                  onClick={() => replaceHeroWith(secondaryImage || FALLBACK_IMAGE)}
                  title="Use as hero"
                  style={{
                    width: 160,
                    height: 100,
                    padding: 0,
                    borderRadius: 8,
                    overflow: "hidden",
                    border: "1px solid rgba(255,255,255,0.04)",
                    background: "transparent",
                    cursor: "pointer",
                    transition: "transform 260ms ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.06)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                  <img
                    src={secondaryImage || FALLBACK_IMAGE}
                    alt="secondary"
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = FALLBACK_IMAGE;
                    }}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                </button>

                {/* Swap button */}
                <button
                  onClick={swapImages}
                  title="Swap hero & secondary"
                  style={{
                    width: 80,
                    height: 100,
                    borderRadius: 8,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.04)",
                    cursor: "pointer",
                    color: "var(--muted)",
                    fontSize: 20,
                    transition: "transform 200ms ease, background 200ms ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.08)";
                    e.currentTarget.style.background = "rgba(147, 197, 253, 0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                  }}
                >
                  <ArrowLeftRight size={20} aria-label="Swap images" />
                </button>
              </div>
            </div>

            {/* Middle: title & meta */}
            <div style={{ flex: "1 1 520px", minWidth: 300 }}>
              <h1 style={{ margin: 0, fontSize: 30 }}>{project.title}</h1>
              <div className="text-muted" style={{ marginTop: 8 }}>
                {project.short_description}
              </div>

              <div style={{ marginTop: 14, display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
                <a href="#creator" style={{ color: "var(--accent)", fontWeight: 700, textDecoration: "none" }}>
                  By {project.created_by_name || "Creator"}
                </a>
                <div className="chips" style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <div className="chip chip-accent">{project.category}</div>
                  {(project.tech_stack || "")
                    .split(",")
                    .slice(0, 4)
                    .map((t, i) => (
                      <div key={i} className="chip chip-primary">
                        {t.trim()}
                      </div>
                    ))}
                </div>
              </div>

              <div style={{ marginTop: 14, display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
                <a className="btn btn-primary" style={{ padding: "10px 14px", cursor: "pointer" }} href={project.project_url || "#"} target="_blank" rel="noreferrer">
                  <Rocket size={16} aria-label="Open Project" /> Open Project
                </a>

                <button onClick={handleBookmark} className="btn btn-outline" style={{ padding: "10px 14px", cursor: "pointer" }}>
                  <Bookmark size={16} aria-label=" Bookmark" /> Bookmark
                </button>

                <div style={{ marginLeft: "auto", display: "flex", gap: 8, alignItems: "center" }}>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontWeight: 800, fontSize: 20 }}>{avgRating}</div>
                    <div className="text-muted" style={{ fontSize: 13 }}>
                      {totalReviews} reviews
                    </div>
                  </div>
                </div>
              </div>

              {/* short meta row */}
              <div style={{ marginTop: 16, display: "flex", gap: 12, flexWrap: "wrap" }}>
                <div style={{ background: "rgba(255,255,255,0.02)", padding: "8px 12px", borderRadius: 10 }}>
                  <div className="small text-muted">Created</div>
                  <div style={{ fontWeight: 800 }}>{new Date(project.created_at || Date.now()).toLocaleDateString()}</div>
                </div>

                <div style={{ background: "rgba(255,255,255,0.02)", padding: "8px 12px", borderRadius: 10 }}>
                  <div className="small text-muted">Status</div>
                  <div style={{ fontWeight: 800 }}>{project.status || "Published"}</div>
                </div>
              </div>
            </div>

            {/* Right: quick stats & CTAs */}
            <div style={{ minWidth: 160, textAlign: "right" }}>
              <div style={{ fontSize: 22, fontWeight: 800 }}>{avgRating}</div>
              <div style={{ color: "var(--muted)", marginTop: 6 }}>{totalReviews} reviews</div>

              <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 8 }}>
                <button className="btn btn-outline" style={{ padding: "10px 12px", cursor: "pointer" }}>
                  <PenTool size={16} aria-label="Request Review" /> Request Review
                </button>
                <button className="btn btn-primary" style={{ padding: "10px 12px", cursor: "pointer" }} onClick={() => navigator.share ? navigator.share({title: project.title, url: window.location.href}) : navigator.clipboard.writeText(window.location.href)}>
                  <Link size={16} aria-label="Share" /> Share
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* MAIN COLUMNS */}
        <div className="columns" style={{ marginTop: 20 }}>
          <div className="column-main">
            {/* ABOUT */}
            <div className="card">
              <h3>About this project</h3>
              <div style={{ marginTop: 10, whiteSpace: "pre-wrap", color: "var(--text)" }}>{project.full_description}</div>

              <h4 style={{ marginTop: 20 }}>Key features</h4>
              {features.length > 0 ? (
                <ul style={{ marginTop: 10 }}>
                  {features.map((f, i) => (
                    <li key={i} style={{ marginBottom: 6 }}>
                      {f}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-muted">No specific features listed.</div>
              )}

              <div style={{ marginTop: 14, display: "flex", gap: 8 }}>
                <a className="btn btn-primary" href={project.project_url || "#"} target="_blank" rel="noreferrer" style={{ cursor: "pointer" }}>
                  <Target size={16} aria-label="Try Demo" /> Try Demo
                </a>
                <button className="btn btn-outline" onClick={() => {navigator.clipboard?.writeText(window.location.href); alert('Link copied!')}} style={{ cursor: "pointer" }}>
                  <Clipboard size={16} aria-label="Copy Link" /> Copy Link
                </button>
              </div>
            </div>

            {/* REVIEWS */}
            <div className="card" style={{ marginTop: 18 }}>
              <h3>Reviews</h3>

              <div style={{ marginTop: 14, display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap" }}>
                <div style={{ minWidth: 120 }}>
                  <div style={{ fontSize: 26, fontWeight: 800 }}>{avgRating}</div>
                  <div className="text-muted">Average</div>
                </div>

                <div style={{ flex: 1 }}>
                  {[5, 4, 3, 2, 1].map((s) => {
                    const count = distribution[s - 1] || 0;
                    return (
                      <div key={s} style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 8 }}>
                        <div style={{ width: 30, display: 'flex', alignItems: 'center', gap: 4 }}>{s} <Star size={16} /></div>
                        <div style={{ flex: 1, height: 10, background: "rgba(255,255,255,0.08)", borderRadius: 20, overflow: "hidden" }}>
                          <div style={{ height: "100%", width: `${pct(count)}%`, background: "var(--primary)" }} />
                        </div>
                        <div style={{ width: 40, textAlign: "right" }}>{count}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Write a review */}
              <div style={{ marginTop: 18 }}>
                <h4>Write a review</h4>
                {!user ? (
                  <div className="text-muted">
                    Please <a href="/login" style={{ color: "var(--accent)" }}>login</a> to post a review.
                  </div>
                ) : (
                  <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 10 }}>
                    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                      <div style={{ fontWeight: 800 }}>Your rating</div>
                      <RatingStars value={ratingValue} onChange={(v) => setRatingValue(v)} />
                    </div>

                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Write your thoughts..."
                      style={{
                        marginTop: 6,
                        padding: 12,
                        borderRadius: 10,
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.04)",
                        color: "var(--text)",
                      }}
                    />

                    <div style={{ display: "flex", gap: 8 }}>
                      <button className="btn btn-primary" onClick={submitReview} disabled={submitting} style={{ cursor: submitting ? "not-allowed" : "pointer" }}>
                        {submitting ? "Submitting..." : <><Check size={16} aria-label="Submit Review" /> Submit Review</>}
                      </button>
                      <button className="btn btn-outline" onClick={() => { setComment(""); setRatingValue(5); }} style={{ cursor: "pointer" }}>
                        <X size={16} aria-label="Cancel" /> Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Reviews list */}
              <div style={{ marginTop: 18 }}>
                {reviews.length === 0 ? (
                  <div className="text-muted">No reviews yet — be the first to write one.</div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {reviews.map((rv) => (
                      <div key={rv.id || rv.user_id} style={{ background: "rgba(255,255,255,0.02)", padding: 12, borderRadius: 10 }}>
                        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                          <div style={{ width: 44, height: 44, borderRadius: 999, background: "rgba(255,255,255,0.04)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800 }}>
                            {(rv.user_name || "U").split(" ").map(n => n[0]).slice(0,2).join("")}
                          </div>

                          <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 800, color: "var(--text)" }}>{rv.user_name || "User"}</div>
                            <div style={{ color: "var(--muted)", fontSize: 12 }}>{rv.user_role || "user"} • {new Date(rv.created_at || Date.now()).toLocaleDateString()}</div>
                          </div>

                          <div><RatingStars value={Number(rv.rating)} /></div>
                        </div>

                        {rv.comment && <div style={{ marginTop: 8, color: "var(--text)" }}>{rv.comment}</div>}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* SIDE PANEL */}
          <div className="column-side">
            <div className="card side-card">
              <div className="small text-muted">Project stats</div>

              <div style={{ marginTop: 8 }}>
                <div className="stat-value">{avgRating}</div>
                <div className="text-muted small">Average rating</div>
              </div>

              <div style={{ marginTop: 12 }}>
                <div className="stat-value">{totalReviews}</div>
                <div className="text-muted small">Total reviews</div>
              </div>

              <div style={{ marginTop: 12 }}>
                <div className="stat-value">{project.created_by_name || "Creator"}</div>
                <div className="text-muted small">Owner</div>
              </div>

              <div style={{ marginTop: 16 }}>
                <h4 style={{ margin: 0, color: "var(--text)" }}>AI Suggestions</h4>
                <div style={{ marginTop: 8, color: "var(--muted)", fontSize: 13 }}>
                  <ul style={{ marginTop: 8 }}>
                    <li>Check response latency under high load.</li>
                    <li>Consider caching heavy model outputs.</li>
                    <li>Add sample prompts to the help page.</li>
                  </ul>
                </div>
              </div>

              <div style={{ marginTop: 14, display: "flex", gap: 8, flexDirection: 'column' }}>
                <button className="btn btn-outline" style={{ cursor: "pointer" }}>Request Review</button>
                <button className="btn btn-primary" style={{ cursor: "pointer" }} onClick={() => navigator.share ? navigator.share({title: project.title, url: window.location.href}) : navigator.clipboard.writeText(window.location.href)}>Share</button>
                {user?.role === 'developer' && (
                  <>
                    <button onClick={() => navigate(`/projects/${id}/analysis`)} className="btn btn-outline" style={{ cursor: "pointer" }}><BarChart3 size={16} aria-label="View Analysis" /> View Analysis</button>
                    <button onClick={() => navigate(`/projects/${id}/suggestions`)} className="btn btn-outline" style={{ cursor: "pointer" }}><Lightbulb size={16} aria-label="AI Suggestions" /> AI Suggestions</button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <div style={{ height: 60 }} />
      </div>
    </>
  );
}
