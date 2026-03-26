const SKILL_COLORS = {
  Frontend: "bg-indigo-50 text-indigo-700",
  Backend: "bg-violet-50 text-violet-700",
  Tools: "bg-slate-50 text-slate-700",
};

const TechnicalStack = ({ profileData, loading, error }) => {
  const skills =
    profileData?.skills &&
    typeof profileData.skills === "object" &&
    !Array.isArray(profileData.skills)
      ? Object.entries(profileData.skills).map(([label, skillsList]) => ({
          label,
          skills: Array.isArray(skillsList) ? skillsList : [],
          color: SKILL_COLORS[label] || "bg-slate-50 text-slate-700",
        }))
      : [];

  if (loading) {
    return <div className="text-center mt-12">Loading technical stack...</div>;
  }

  if (error) {
    return <div className="text-center mt-12 text-red-600">{error}</div>;
  }

  return (
    <section className="mx-auto w-[92vw] md:w-[90vw] lg:w-[88vw]">
      <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-6 text-center">
        Technical{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-900 to-violet-900">
          Stack
        </span>
      </h3>

      <div className="space-y-5">
        {skills.length === 0 && (
          <p className="text-slate-500 text-sm text-center">
            No skills added yet.
          </p>
        )}

        {skills.map((cat) => (
          <div
            key={cat.label}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            <span className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] text-2xl font-black text-slate-900 text-center">
              {cat.label}
            </span>
            {cat.skills.map((skill) => (
              <span
                key={skill}
                className={`${cat.color} px-3 py-1 rounded-md text-xs font-semibold border border-transparent hover:border-current transition-colors cursor-default`}
              >
                {skill}
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default TechnicalStack;
