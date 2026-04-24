import { useEffect, useState } from "react";
import { fetchProfileContent, fetchResume } from "../../services";
import { GitHubIcon, LinkedInIcon } from "../SocialIcons/SocialIcons";

const profileSocialLinkClassName =
  "inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/25 text-ink transition-colors duration-200 hover:border-ink hover:bg-ink hover:text-surface";

const Profile = ({ contactInfo, contactLoading, contactError }) => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [resumeUrl, setResumeUrl] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchProfileData = async () => {
      try {
        const payload = await fetchProfileContent();

        if (isMounted) {
          setProfileData(payload || null);
          setError("");
        }
      } catch (fetchError) {
        if (isMounted) {
          setError(
            fetchError?.response?.data?.detail ||
              fetchError.message ||
              "Profile failed to load.",
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    const fetchResumeUrl = async () => {
      try {
        const response = await fetchResume();
        const url = response?.data?.resume_url;
        if (isMounted && url) {
          setResumeUrl(url);
        }
      } catch {
        // resume unavailable — button remains hidden
      }
    };

    fetchProfileData();
    fetchResumeUrl();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <section
        id="profile"
        className="mx-auto flex min-h-[60vh] w-full max-w-5xl items-center justify-center px-6 py-20 text-center"
      >
        <p className="font-body text-base text-ink-muted md:text-lg">
          Loading profile...
        </p>
      </section>
    );
  }

  if (error) {
    return (
      <section
        id="profile"
        className="mx-auto flex min-h-[60vh] w-full max-w-5xl items-center justify-center px-6 py-20 text-center"
      >
        <p className="font-body text-base text-ink-muted md:text-lg">{error}</p>
      </section>
    );
  }

  const headline = profileData?.headline || "Your headline";
  const title = profileData?.title;
  const subheadline = profileData?.subheadline || "Your subheadline goes here.";
  const primaryButton = profileData?.primary_button;
  const secondaryButton = profileData?.secondary_button;

  return (
    <section
      id="profile"
      className="scroll-mt-28 mx-auto w-full max-w-6xl px-6 py-24 text-center md:px-10 md:py-32"
    >
      <article className="mx-auto max-w-5xl">
        <header>
          <h1 className="font-display text-4xl font-light leading-[0.98] tracking-[0.08em] text-ink sm:text-5xl md:text-6xl lg:text-7xl">
            {headline}
          </h1>

          {title && (
            <h2 className="font-display mx-auto mt-6 max-w-3xl text-base font-normal uppercase tracking-[0.2em] text-ink-muted md:text-lg">
              {title}
            </h2>
          )}

          <p className="font-body mx-auto mt-8 max-w-3xl text-lg leading-relaxed text-ink-muted md:text-xl">
            {subheadline}
          </p>
        </header>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <a
            href={primaryButton?.href || "#projects"}
            className="font-body rounded-sm bg-ink px-6 py-3 text-sm font-medium uppercase tracking-[0.12em] text-surface transition-opacity hover:opacity-90 hover:text-surface"
          >
            {primaryButton?.label || "View My Work"}
          </a>

          {resumeUrl && (
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body rounded-sm border border-ink bg-transparent px-7 py-3 text-sm font-medium uppercase tracking-[0.12em] text-ink transition-colors duration-200 hover:bg-ink hover:text-surface"
            >
              View Resume
            </a>
          )}
        </div>

        {!contactLoading && !contactError && (contactInfo?.linkedin_link || contactInfo?.github_link) && (
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            {contactInfo?.linkedin_link && (
              <a
                href={contactInfo.linkedin_link}
                target="_blank"
                rel="noopener noreferrer"
                className={profileSocialLinkClassName}
                aria-label="LinkedIn profile"
              >
                <LinkedInIcon size={20} />
              </a>
            )}

            {contactInfo?.github_link && (
              <a
                href={contactInfo.github_link}
                target="_blank"
                rel="noopener noreferrer"
                className={profileSocialLinkClassName}
                aria-label="GitHub profile"
              >
                <GitHubIcon size={20} />
              </a>
            )}
          </div>
        )}
      </article>
    </section>
  );
};

export default Profile;
