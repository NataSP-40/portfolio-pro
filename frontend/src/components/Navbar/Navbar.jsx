import { useEffect, useState } from "react";
import { fetchNavbarContent, fetchResume } from "../../services";
import useApiClient from "../../hooks/useApiClient";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [navbarData, setNavbarData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { data: resumeData, request: requestResume } = useApiClient();

  useEffect(() => {
    let isMounted = true;

    // Fetch navbar content through the shared service layer.
    const fetchNavbarData = async () => {
      try {
        const payload = await fetchNavbarContent();

        if (isMounted) {
          setNavbarData(payload || null);
          setError("");
        }
      } catch (fetchError) {
        if (isMounted) {
          setError(
            fetchError?.response?.data?.detail ||
              fetchError.message ||
              "Navigation failed to load.",
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchNavbarData();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const loadResume = async () => {
      try {
        await requestResume(fetchResume);
      } catch {
        // Resume is optional in nav; hide CTA silently when unavailable.
      }
    };

    loadResume();
  }, [requestResume]);

  useEffect(() => {
    const closeMenuOnDesktop = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", closeMenuOnDesktop);
    return () => window.removeEventListener("resize", closeMenuOnDesktop);
  }, []);

  const navLinks = Array.isArray(navbarData?.links) ? navbarData.links : [];
  const filteredNavLinks = navLinks.filter((link) => {
    const value = (link?.label || link?.title || "").trim().toLowerCase();
    return value !== "skills";
  });
  const logoText = navbarData?.logo_text || "Logo";
  const resumeUrl = resumeData?.resume_url;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#2b2a27]/10 bg-[#f3f5ed]/85 backdrop-blur-md">
      <nav
        className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4 md:px-10"
        aria-label="Main navigation"
      >
        <a
          href="#profile"
          className="text-2xl font-bold tracking-tight text-[#2b2a27] font-['Space_Grotesk',sans-serif]"
        >
          {loading ? "Loading..." : logoText}
        </a>

        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          className="rounded-md border border-[#2b2a27]/20 px-3 py-2 text-sm font-medium text-[#2b2a27] md:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Menu
        </button>

        <ul className="hidden items-center gap-8 md:flex">
          {loading && (
            <li
              className="text-sm text-[#4a4944]"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Loading navigation...
            </li>
          )}

          {!loading && error && (
            <li
              className="text-sm text-[#4a4944]"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {error}
            </li>
          )}

          {!loading &&
            !error &&
            filteredNavLinks.map((link, index) => (
              <li key={link.id || `${link.href}-${index}`}>
                <a
                  href={link.href || "#"}
                  className="text-base font-medium text-[#4a4944] transition-colors duration-200 hover:text-[#2b2a27]"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {link.label}
                </a>
              </li>
            ))}

          {!loading && !error && resumeUrl && (
            <li>
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-[#2b2a27] bg-transparent px-4 py-1 text-sm font-medium text-[#2b2a27] transition-colors duration-200 hover:bg-[#e6e9df]"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Hire Me
              </a>
            </li>
          )}
        </ul>
      </nav>

      <div
        id="mobile-navigation"
        className={`overflow-hidden border-t border-[#2b2a27]/10 px-6 transition-all duration-300 md:hidden ${
          isOpen ? "max-h-80 py-4 opacity-100" : "max-h-0 py-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col gap-3">
          {!loading &&
            !error &&
            filteredNavLinks.map((link, index) => (
              <li key={link.id || `mobile-${link.href}-${index}`}>
                <a
                  href={link.href || "#"}
                  onClick={() => setIsOpen(false)}
                  className="text-base font-medium text-[#4a4944] transition-colors duration-200 hover:text-[#2b2a27]"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {link.label}
                </a>
              </li>
            ))}

          {!loading && !error && resumeUrl && (
            <li>
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="inline-block rounded-full border border-[#2b2a27] bg-transparent px-4 py-1 text-sm font-medium text-[#2b2a27] transition-colors duration-200 hover:bg-[#e6e9df]"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Hire Me
              </a>
            </li>
          )}

          {loading && (
            <li
              className="text-sm text-[#4a4944]"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Loading navigation...
            </li>
          )}

          {!loading && error && (
            <li
              className="text-sm text-[#4a4944]"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {error}
            </li>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
