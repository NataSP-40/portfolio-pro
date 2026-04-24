import { getMediaUrl } from "../../services";

const ProjectCard = ({ project }) => {
  if (!project) {
    return null;
  }

  const techStack =
    project.technologies
      ?.split(",")
      .map((tech) => tech.trim())
      .filter(Boolean) || [];
  const imageUrl = project.project_image
    ? getMediaUrl(project.project_image)
    : "";
  const cardDescription = project.description || "No description provided.";
  const liveButtonClassName =
    "font-body inline-flex min-w-[130px] items-center justify-center rounded-sm border border-ink/35 bg-transparent px-4 py-2 text-xs font-medium uppercase tracking-[0.12em] text-ink transition-colors duration-200 hover:bg-[#f2eee6]";
  const githubButtonClassName =
    "font-body inline-flex min-w-[130px] items-center justify-center rounded-sm border border-ink bg-ink px-4 py-2 text-xs font-medium uppercase tracking-[0.12em] text-surface transition-opacity duration-200 hover:opacity-90";

  return (
    <article className="flex h-full flex-col overflow-hidden rounded border border-line/60 bg-[#ebe5da] shadow-[0_12px_30px_rgba(10,10,10,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(10,10,10,0.1)]">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={project.title}
          className="aspect-video w-full object-cover"
        />
      ) : (
        <div className="aspect-video w-full bg-[#ded7c9]" />
      )}

      <div className="flex flex-1 flex-col p-6">
        <div className="space-y-4">
          <h3
            className="font-display text-xl font-medium uppercase tracking-[0.14em] text-ink md:text-2xl"
          >
            {project.title}
          </h3>

          <p className="font-body line-clamp-3 text-sm leading-6 text-ink-muted md:text-base">
            {cardDescription}
          </p>

          {/* {techStack.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <span
                  key={`${project.id}-${tech}`}
                  className="rounded-full border px-3 py-1 text-xs font-medium"
                  style={{
                    borderColor: "#2b2a27",
                    color: "#2b2a27",
                    fontFamily: '"Inter", sans-serif',
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          )} */}
        </div>

        {(project.live_link || project.repo_link) && (
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 border-t border-ink/15 pt-4">
            {project.live_link && (
              <a
                href={project.live_link}
                target="_blank"
                rel="noreferrer"
                className={liveButtonClassName}
              >
                Live Site
              </a>
            )}
            {project.repo_link && (
              <a
                href={project.repo_link}
                target="_blank"
                rel="noreferrer"
                className={githubButtonClassName}
              >
                Github
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
};

export default ProjectCard;
