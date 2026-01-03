// src/pages/BookmarksPage.jsx
import React, { useEffect, useState } from "react";
import ProjectCard from "../components/ProjectCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

/**
 * Updated Bookmarks Page
 * - Uses picsum.photos images (reliable)
 * - Lazy loads images
 * - Persists bookmarks to localStorage
 */

const DEMO_KEY = "bytexai_demo_bookmarks_v1";

const SAMPLE_PROJECTS = [
  {
    id: "1",
    title: "Voice Assistant Pro",
    short_description:
      "A multi-lingual voice assistant with wake-word detection and custom skills.",
    image: "https://picsum.photos/id/1015/400/400",
    project_url: "https://example.com/voice",
    category: "NLP",
    tech_stack: "python,fastapi,transformers",
    rating: 4.7,
    reviews: 234,
  },
  {
    id: "2",
    title: "Object DetectX",
    short_description:
      "Real-time object detection for video streams with low-latency inference.",
    image: "https://picsum.photos/id/1027/400/400",
    project_url: "https://example.com/odx",
    category: "Computer Vision",
    tech_stack: "tensorflow,opencv,react",
    rating: 4.6,
    reviews: 180,
  },
  {
    id: "3",
    title: "Customer Insights AI",
    short_description:
      "Analyze support tickets to extract intent, sentiment and suggested responses.",
    image: "https://picsum.photos/id/1005/400/400",
    project_url: "https://example.com/insights",
    category: "Analytics",
    tech_stack: "node,postgres,mlflow",
    rating: 4.4,
    reviews: 92,
  },
  {
    id: "4",
    title: "DesignGen",
    short_description:
      "Generative UI mockups from prompts — exportable to Figma and code.",
    image: "https://picsum.photos/id/1011/400/400",
    project_url: "https://example.com/designgen",
    category: "Design",
    tech_stack: "react,vae,stable-diffusion",
    rating: 4.5,
    reviews: 144,
  },
];

function readBookmarksFromStorage() {
  try {
    const raw = localStorage.getItem(DEMO_KEY);
    if (!raw) return SAMPLE_PROJECTS;
    const parsed = JSON.parse(raw);
    // if parsed is empty array, show sample
    return Array.isArray(parsed) && parsed.length ? parsed : SAMPLE_PROJECTS;
  } catch {
    return SAMPLE_PROJECTS;
  }
}

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState(() => readBookmarksFromStorage());

  useEffect(() => {
    try {
      localStorage.setItem(DEMO_KEY, JSON.stringify(bookmarks));
    } catch (e) {
      // ignore storage errors
    }
  }, [bookmarks]);

  const handleRemove = (id) => {
    const keep = bookmarks.filter((b) => b.id !== id);
    setBookmarks(keep);
  };

  return (
    <div className="min-h-screen bg-blue-50 dark:bg-gradient-to-br dark:from-slate-900 dark:to-slate-800">
      <Navbar />
      <div className="pt-6 md:pt-8">
        <div className="app-container border-t border-gray-300 dark:border-slate-600 pt-6 md:pt-8">
          <div className="border border-gray-800 dark:border-slate-600 rounded-2xl mx-4 bg-white dark:bg-slate-800 p-6 md:p-8">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 800 }}>Saved Projects</h1>
          <div className="text-muted" style={{ marginTop: 6 }}>Your bookmarked AI tools & demos.</div>
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          <button
            className="btn btn-outline btn-small"
            onClick={() => {
              // reset to sample list
              setBookmarks(SAMPLE_PROJECTS);
            }}
          >
            Manage
          </button>
          <button
            className="btn btn-primary btn-small"
            onClick={() => {
              // import demo behaviour: add a sample if none exist
              if (!bookmarks.length) setBookmarks(SAMPLE_PROJECTS);
              else alert("Import demo: already have bookmarks.");
            }}
          >
            Import
          </button>
        </div>
      </div>

      <div style={{ height: 18 }} />

      {bookmarks.length === 0 ? (
        <div className="card" style={{ textAlign: "center", padding: 40 }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: "var(--text)" }}>No bookmarks yet</div>
          <p className="text-muted" style={{ marginTop: 8 }}>Browse projects and click “Bookmark” to save them here.</p>
          <div style={{ marginTop: 14 }}>
            <a href="/" className="btn btn-primary">Browse Projects</a>
          </div>
        </div>
      ) : (
        <div className="bookmarks-grid" style={{ marginTop: 12 }}>
          {bookmarks.map((p) => (
            // Use the existing ProjectCard but ensure it supports images.
            <ProjectCard key={p.id} project={p} onRemove={handleRemove} />
          ))}
        </div>
      )}
      <div style={{ height: 60 }} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
