const About = ({ profileData }) => {
  if (!profileData) return null;

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";
  // If your backend returns relative media URLs (e.g. /media/profiles/me.jpg),
  // set VITE_API_BASE_URL to your Django server origin (e.g. http://127.0.0.1:8000).
  const imageUrl = profileData.profile_image
    ? profileData.profile_image.startsWith("http")
      ? profileData.profile_image
      : `${API_BASE_URL}${profileData.profile_image}`
    : null;

  const skillsByCategory =
    profileData.skills &&
    typeof profileData.skills === "object" &&
    !Array.isArray(profileData.skills)
      ? Object.entries(profileData.skills)
      : [];

  return (
    <section
      id="about"
      className="scroll-mt-28 py-24 px-6 max-w-7xl mx-auto bg-[#f3f5ed] text-[#2b2a27]"
    >
      <div className="grid gap-12 items-start md:grid-cols-2">
        <div>
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={profileData.name ? `${profileData.name} profile` : "Profile"}
              className="w-full max-w-md rounded-2xl object-cover shadow-[0_16px_35px_-20px_rgba(43,42,39,0.55)]"
            />
          ) : (
            <div className="w-full max-w-md min-h-[360px] rounded-2xl bg-[#e6e9df] shadow-[0_16px_35px_-20px_rgba(43,42,39,0.45)] flex items-center justify-center px-6">
              <span className="font-['Inter'] text-sm tracking-wide text-[#2b2a27]/70">
                Profile image coming soon
              </span>
            </div>
          )}
        </div>

        <div className="space-y-8">
          <div className="space-y-4">
            <h3 className="text-4xl font-black tracking-tight text-[#2b2a27] font-['Space_Grotesk']">
              About Me
            </h3>
            <div className="h-px w-24 bg-[#e6e9df]"></div>
            <p className="text-lg leading-relaxed text-[#2b2a27] font-['Inter']">
              {profileData.about_me}
            </p>
          </div>

          {skillsByCategory.length > 0 && (
            <div className="grid gap-4 sm:grid-cols-2">
              {skillsByCategory.map(([category, skillList]) => (
                <div key={category} className="rounded-xl bg-[#e6e9df]/60 p-4">
                  <h4 className="font-['Space_Grotesk'] text-base font-bold text-[#2b2a27] mb-3">
                    {category}
                  </h4>
                  <ul className="space-y-2">
                    {(Array.isArray(skillList) ? skillList : []).map(
                      (skill) => (
                        <li
                          key={`${category}-${skill}`}
                          className="font-['Inter'] text-sm text-[#2b2a27] bg-[#e6e9df] px-3 py-1.5 rounded-full inline-flex mr-2 mb-2"
                        >
                          {skill}
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default About;
