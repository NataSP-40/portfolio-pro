import { useEffect } from "react";
import useApiClient from "../../api";
import { fetchProjects } from "../../services";
import ProjectCard from "./ProjectCard";

const Projects = () => {
  const {
    data: projectsData,
    loading,
    error,
    request: requestProjects,
  } = useApiClient();

  useEffect(() => {
    requestProjects(fetchProjects).catch(() => {});
  }, [requestProjects]);

  const projects = Array.isArray(projectsData) ? projectsData : [];

  if (projects.length === 0) return <p>No projects found.</p>;

  return (
    <section className="mx-auto w-[92vw] md:w-[90vw] lg:w-[88vw] py-8">
      {/* <h2 className="py-8 text-transparent bg-clip-text bg-gradient-to-r from-indigo-900 to-violet-900 text-2xl font-black tracking-tight mb-jects6">
        My Projects
      </h2> */}
      <h2 className="py-4 text-4xl font-black text-slate-900 tracking-tight">
        My{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-900 to-violet-900">
          Projects
        </span>
      </h2>
      {loading && (
        <p className="text-center text-gray-500">Loading projects...</p>
      )}
      {error && !loading && <p className="text-center text-red-600">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
