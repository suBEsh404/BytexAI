// src/components/ProjectCard.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function ProjectCard({ project, onRemove }) {
  return (
    <div
      className="bookmark-card relative p-4 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-xl mb-4.5 shadow-sm hover:shadow-md transition-shadow cursor-default"
      tabIndex={0}
      onKeyDown={(e) => {
        // allow Enter key to open details (accessibility nicety)
        if (e.key === "Enter") {
          const link = e.currentTarget.querySelector("a.btn-outline");
          if (link) link.click();
        }
      }}
    >
      {/* image + content */}
      <div style={{ display: "flex", gap: 14 }}>
        {/* IMAGE BLOCK */}
        <div className="w-24 h-24 min-w-24 min-h-24 rounded-xl overflow-hidden bg-gray-100 dark:bg-slate-700 flex-shrink-0 flex items-center justify-center">
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://picsum.photos/200";
            }}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              transition: "transform 420ms cubic-bezier(.2,.9,.2,1)"
            }}
          />
        </div>

        {/* CONTENT */}
        <div className="flex-1">
          {/* Title + Rating */}
          <div className="flex items-center">
            <div className="text-lg font-bold text-gray-900 dark:text-white">
              {project.title}
            </div>

            <div className="ml-auto flex items-center gap-1.5">
              <span className="text-yellow-400 text-base">★</span>
              <span className="text-gray-900 dark:text-white font-bold">{project.rating}</span>
              <span className="text-gray-600 dark:text-gray-400 text-sm">({project.reviews})</span>
            </div>
          </div>

          {/* Description */}
          <div className="mt-2 text-gray-600 dark:text-gray-400 text-sm leading-5">
            {project.short_description}
          </div>

          {/* chips */}
          <div className="mt-2.5 flex flex-wrap gap-2">
            <div className="px-2.5 py-1.5 rounded-3xl text-xs bg-indigo-500/18 text-indigo-400 font-semibold">
              {project.category}
            </div>
            {project.tech_stack?.split(",").slice(0, 3).map((t, i) => (
              <div key={i} className="px-2.5 py-1.5 rounded-3xl bg-sky-500/15 text-sky-400 text-xs font-semibold">
                {t.trim()}
              </div>
            ))}
          </div>

          {/* ACTIONS */}
          <div className="mt-3.5 flex items-center gap-2.5">
            <a href={project.project_url} target="_blank" rel="noreferrer" className="btn btn-primary px-3.5 py-2 text-sm font-semibold">
              Open
            </a>

            <Link to={`/ProductDetails/${project.id}`} className="btn btn-outline px-3.5 py-2 text-sm font-semibold">
              Details
            </Link>

            <button
              onClick={() => onRemove && onRemove(project.id)}
              className="btn btn-outline px-3.5 py-2 text-sm font-semibold ml-auto"
              aria-label={`Remove ${project.title}`}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
