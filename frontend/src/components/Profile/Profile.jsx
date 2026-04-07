import { useEffect, useState } from "react";
import { fetchProfileContent } from "../../services";

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    // Fetch profile content through the shared service layer.
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

    fetchProfileData();

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
        <p
          className="text-lg text-[#4a4944]"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
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
        <p
          className="text-lg text-[#4a4944]"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          {error}
        </p>
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
          <h1
            className="text-5xl font-bold leading-[0.95] tracking-[-0.03em] text-[#2b2a27] sm:text-6xl md:text-7xl lg:text-8xl"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            {headline}
          </h1>

          {title && (
            <h2
              className="mx-auto mt-5 max-w-3xl text-xl font-semibold text-[#2b2a27] md:text-2xl"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {title}
            </h2>
          )}

          <p
            className="mx-auto mt-8 max-w-3xl text-lg leading-relaxed text-[#4a4944] md:text-xl"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            {subheadline}
          </p>
        </header>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <a
            href={primaryButton?.href || "#projects"}
            className="rounded-md bg-[#2b2a27] px-6 py-3 text-base font-medium text-white transition-opacity hover:opacity-90 hover:text-white"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            {primaryButton?.label || "View My Work"}
          </a>

          <a
            href={secondaryButton?.href || "#contact"}
            className="rounded-md border border-[#2b2a27] bg-transparent px-7 py-3 text-base font-medium text-[#2b2a27] transition-colors duration-200 hover:bg-[#2b2a27] hover:text-[#f3f5ed]"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            {secondaryButton?.label || "Get in Touch"}
          </a>
        </div>
      </article>
    </section>
  );
};

export default Profile;
