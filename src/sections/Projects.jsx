import { myProjects } from "../contstants";

const Projects = () => {
  return (
    <section className="relative c-space section-spacing">
      <h2 className="text-heading">My Projects</h2>
      <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent mt-12 h-[1px] w-full" />
      
      <div className="mt-8 space-y-6">
        {myProjects.map((project) => (
          <div key={project.id} className="text-neutral-300">
            <h3 className="text-xl font-semibold mb-1 hover:text-white transition-all duration-300">
              <a
                href={project.repoHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                {project.title}
              </a>
            </h3>
            <div className="flex gap-4 text-sm text-accent">
              <a
                href={project.repoHref}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                View Project Repo →
              </a>
              <a
                href={project.videoHref}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Watch Walkthrough →
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;

