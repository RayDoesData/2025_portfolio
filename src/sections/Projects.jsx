import React from "react";
import { myProjects } from "../contstants";

const Projects = () => {
  return (
    <section className="relative c-space pb-2"> {/* Adjust spacing here */}
      <h2 className="text-heading mb-6">My Projects</h2>

      <div className="w-full flex flex-col gap-8">
        {myProjects.map((project) => (
          <div
            key={project.id}
            className="relative w-full h-56 rounded-lg overflow-hidden shadow-lg group"
          >
            {/* Full-Width Background Image */}
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />

            {/* Banner Overlay */}
            <div className="absolute inset-0 bg-black/60 p-4 flex flex-col justify-end backdrop-blur-sm text-white">
              <h3 className="text-lg font-semibold mb-1">{project.title}</h3>
              <p className="text-sm text-neutral-300">{project.description}</p>

              {/* Sub Description (Bullets) */}
              {project.subDescription && (
                <ul className="list-disc list-inside text-xs text-neutral-400 mt-1">
                  {project.subDescription.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              )}

              {/* Tools / Tags */}
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <span className="text-xs text-neutral-400 mr-2">Tools:</span>
                {project.tags?.map((tag) => (
                  <div key={tag.id} className="flex items-center gap-1">
                    {tag.path && (
                      <img
                        src={tag.path}
                        alt={tag.name}
                        className="w-4 h-4 object-contain"
                      />
                    )}
                    <span className="text-xs text-neutral-300">
                      {tag.name}
                    </span>
                  </div>
                ))}
              </div>

              {/* Links */}
              <div className="flex gap-4 mt-3 text-sm">
                {project.repoHref && (
                  <a
                    href={project.repoHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-neutral-300"
                  >
                    View Project →
                  </a>
                )}
                {project.videoHref && (
                  <a
                    href={project.videoHref}
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
        ))}
      </div>
    </section>
  );
};

export default Projects;


