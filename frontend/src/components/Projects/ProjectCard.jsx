import { useState } from "react";
import { getMediaUrl } from "../../services";

const ProjectCard = ({ project }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Handle undefined or null project
  if (!project) {
    return null;
  }

  const techStack =
    project.technologies?.split(",").map((tech) => tech.trim()) || [];
  const imageUrl = getMediaUrl(project.project_image);
  const cardDescription = project.description || "No description provided.";

  return (
    <div className="bg-white/80 backdrop-blur-sm p-10 rounded-3xl shadow-xl border border-slate-100 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-100 hover:scale-105">
      {/* Project Image */}
      <img
        src={imageUrl}
        alt={project.title}
        className="w-full h-48 object-cover"
      />

      <div className="p-6 flex-grow">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          {project.title}
        </h3>
        {/* View more details on click */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-white text-violet-900 border-2 border-violet-900 px-6 py-2 rounded-xl font-bold hover:bg-purple-50 transition-all"
        >
          {isOpen ? "Hide Details" : "View Details"}
        </button>
        {/* Dropdown Content: Hidden/Shown based on isOpen state */}
        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? "max-h-96" : "max-h-0 opacity-0"}`}
        >
          <p className="text-gray-600 mb-4">{cardDescription}</p>
          {project.solution && (
            <p className="text-gray-600 mb-4 line-clamp-3">
              <strong>Solution:</strong> {project.solution}
            </p>
          )}
          {project.challenges && (
            <p className="text-gray-600 mb-4 line-clamp-3">
              <strong>Challenges:</strong> {project.challenges}
            </p>
          )}
          <ul className="list-disc list-inside space-y-1 text-gray-600 mb-4">
            {techStack.map((tech, index) => (
              <li
                key={index}
                className="px-3 py-1 text-blue-800 text-xs font-semibold"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Action Links: Keep outside dropdown */}
      <div className="p-6 pt-0 flex justify-between items-center mt-auto gap-4">
        {project.repo_link && (
          <a
            href={project.repo_link}
            target="_blank"
            rel="noreferrer"
            className="bg-white text-violet-900 border-2 border-violet-900 px-6 py-2 rounded-xl font-bold hover:bg-purple-50 transition-all"
          >
            GitHub
          </a>
        )}
        {project.live_link && (
          <a
            href={project.live_link}
            target="_blank"
            rel="noreferrer"
            className="bg-white text-violet-900 border-2 border-violet-900 px-6 py-2 rounded-xl font-bold hover:bg-purple-50 transition-all"
          >
            Live Site
          </a>
        )}
        {!project.repo_link && !project.live_link && (
          <p className="text-sm text-gray-500">No public links available.</p>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
