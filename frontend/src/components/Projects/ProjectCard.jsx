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
  const linkClassName =
    "text-sm font-medium transition-opacity hover:opacity-70";

  return (
    <article className="flex h-full flex-col overflow-hidden rounded bg-[#e6e9df] shadow-[0_12px_30px_rgba(43,42,39,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(43,42,39,0.1)]">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={project.title}
          className="aspect-video w-full object-cover"
        />
      ) : (
        <div className="aspect-video w-full bg-[#d9ddd0]" />
      )}

      <div className="flex flex-1 flex-col p-6">
        <div className="space-y-4">
          <h3
            className="text-2xl font-bold tracking-tight"
            style={{
              color: "#2b2a27",
              fontFamily: '"Space Grotesk", sans-serif',
            }}
          >
            {project.title}
          </h3>

          <p
            className="line-clamp-3 text-sm leading-6 md:text-base"
            style={{ color: "#4a4944", fontFamily: '"Inter", sans-serif' }}
          >
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
          <div
            className="mt-6 flex flex-wrap gap-40 pt-2"
            style={{ fontFamily: '"Inter", sans-serif' }}
          >
            {project.live_link && (
              <a
                href={project.live_link}
                target="_blank"
                rel="noreferrer"
                className={linkClassName}
                style={{ color: "#2b2a27" }}
              >
                Live Site
              </a>
            )}
            {project.repo_link && (
              <a
                href={project.repo_link}
                target="_blank"
                rel="noreferrer"
                className={linkClassName}
                style={{ color: "#2b2a27" }}
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
