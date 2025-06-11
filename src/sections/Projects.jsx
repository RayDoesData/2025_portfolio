import React from "react";

const Project = ({ title, description, tools, previewImg, repoLink, videoLink }) => {
  return (
    <div className="relative w-full h-56 rounded-lg overflow-hidden shadow-lg group">
      {/* Background Image */}
      <img
        src={previewImg}
        alt={title}
        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
      />

      {/* Overlay Info */}
      <div className="absolute inset-0 bg-black/60 p-4 flex flex-col justify-end backdrop-blur-sm text-white">
        <h3 className="text-lg font-semibold mb-1">{title}</h3>
        <p className="text-sm text-neutral-300">{description}</p>
        <p className="text-xs text-neutral-400 mt-1">Tools: {tools?.join(", ")}</p>

        {/* Links */}
        <div className="flex gap-4 mt-3 text-sm">
          {repoLink && (
            <a
              href={repoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-neutral-300"
            >
              View Project →
            </a>
          )}
          {videoLink && (
            <a
              href={videoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-neutral-300"
            >
              Watch Walkthrough →
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Project;

