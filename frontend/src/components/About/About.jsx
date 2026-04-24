import { getMediaUrl } from "../../services";

const About = ({ profileData }) => {
  if (!profileData) return null;

  const imageUrl = getMediaUrl(profileData.profile_image);

  const skillsByCategory =
    profileData.skills &&
    typeof profileData.skills === "object" &&
    !Array.isArray(profileData.skills)
      ? Object.entries(profileData.skills)
      : [];

  return (
    <section
      id="about"
      className="scroll-mt-28 mx-auto max-w-7xl bg-surface px-6 py-24 text-ink"
    >
      <div className="grid gap-12 items-start md:grid-cols-2">
        <div>
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={profileData.name ? `${profileData.name} profile` : "Profile"}
              className="w-full max-w-md rounded-xl border border-line/60 object-cover shadow-[0_16px_35px_-20px_rgba(10,10,10,0.42)]"
            />
          ) : (
            <div className="flex min-h-[360px] w-full max-w-md items-center justify-center rounded-xl border border-line/60 bg-[#ebe5da] px-6 shadow-[0_16px_35px_-20px_rgba(10,10,10,0.38)]">
              <span className="font-body text-xs uppercase tracking-[0.14em] text-ink-muted">
                Profile image coming soon
              </span>
            </div>
          )}
        </div>

        <div className="space-y-8">
          <div className="space-y-4">
            <h3 className="font-display text-3xl font-light uppercase tracking-[0.22em] text-ink sm:text-4xl">
              About Me
            </h3>
            <div className="h-px w-24 bg-ink/25"></div>
            <p className="font-body text-base leading-relaxed text-ink-muted md:text-lg">
              {profileData.about_me}
            </p>
          </div>

          {skillsByCategory.length > 0 && (
            <div className="grid gap-4 sm:grid-cols-2">
              {skillsByCategory.map(([category, skillList]) => (
                <div
                  key={category}
                  className="rounded-lg border border-line/60 bg-[#ebe5da]/70 p-4"
                >
                  <h4 className="font-display mb-3 text-xs font-medium uppercase tracking-[0.16em] text-ink">
                    {category}
                  </h4>
                  <ul className="space-y-2">
                    {(Array.isArray(skillList) ? skillList : []).map(
                      (skill) => (
                        <li
                          key={`${category}-${skill}`}
                          className="font-body mb-2 mr-2 inline-flex rounded-full border border-ink/15 bg-[#f2eee6] px-3 py-1.5 text-xs uppercase tracking-[0.08em] text-ink-muted"
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
