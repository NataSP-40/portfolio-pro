import { useEffect, useState } from "react";
import { fetchProjects } from "../../services";
import ProjectCard from "./ProjectCard";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadProjects = async (isMountedRef) => {
    setLoading(true);
    setError("");

    try {
      const response = await fetchProjects();
      if (!isMountedRef.current) {
        return;
      }

      setProjects(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      if (!isMountedRef.current) {
        return;
      }

      const message =
        err.response?.data?.detail ||
        err.message ||
        "Unable to load projects right now.";

      setError(message);
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    const isMountedRef = { current: true };

    loadProjects(isMountedRef);

    return () => {
      isMountedRef.current = false;
    };
  }, []);

  return (
    <section
      id="projects"
      className="scroll-mt-28 mx-auto w-[92vw] pt-0 pb-8 md:w-[90vw] lg:w-[88vw]"
    >
      <h2 className="font-display mb-10 text-2xl font-light uppercase tracking-[0.24em] text-ink sm:text-3xl md:text-4xl">
        My Projects
      </h2>

      {loading && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded border border-line/60 bg-[#ebe5da] shadow-sm"
            >
              <div className="aspect-video animate-pulse bg-[#ded7c9]" />
              <div className="space-y-3 p-6">
                <div className="h-6 w-2/3 animate-pulse rounded bg-[#ded7c9]" />
                <div className="h-4 w-full animate-pulse rounded bg-[#ded7c9]" />
                <div className="h-4 w-5/6 animate-pulse rounded bg-[#ded7c9]" />
                <div className="flex gap-2 pt-2">
                  <div className="h-8 w-20 animate-pulse rounded-full bg-[#ded7c9]" />
                  <div className="h-8 w-24 animate-pulse rounded-full bg-[#ded7c9]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && error && (
        <div className="rounded border border-line/60 bg-[#ebe5da] p-6 text-center shadow-sm">
          <p className="font-body text-base text-ink-muted">{error}</p>
          <button
            type="button"
            onClick={() => loadProjects({ current: true })}
            className="font-body mt-4 inline-flex items-center justify-center rounded-full px-4 py-2 text-xs font-medium uppercase tracking-[0.12em] text-ink transition-colors hover:bg-[#ded7c9]"
          >
            Try again
          </button>
        </div>
      )}

      {!loading && !error && projects.length === 0 && (
        <div className="rounded border border-line/60 bg-[#ebe5da] p-6 text-center shadow-sm">
          <p className="font-body text-base text-ink-muted">
            No projects to show yet.
          </p>
        </div>
      )}

      {!loading && !error && projects.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Projects;
