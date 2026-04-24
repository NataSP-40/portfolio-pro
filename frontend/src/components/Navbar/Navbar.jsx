import { useEffect, useState } from "react";
import { fetchNavbarContent, fetchResume } from "../../services";
import useApiClient from "../../hooks/useApiClient";
import logoMark from "../../assets/logo/np-logo.svg";

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
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", closeMenuOnDesktop);
    return () => window.removeEventListener("resize", closeMenuOnDesktop);
  }, []);

  const navLinks = Array.isArray(navbarData?.links) ? navbarData.links : [];
  const filteredNavLinks = navLinks.filter((link) => {
    const value = (link?.label || link?.title || "").trim().toLowerCase();
    const href = (link?.href || "").trim().toLowerCase();

    return (
      value !== "skills" &&
      value !== "home" &&
      href !== "#home" &&
      href !== "#profile"
    );
  });
  const logoText = navbarData?.logo_text || "Logo";
  const resumeUrl = resumeData?.resume_url;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-ink/10 bg-surface/85 backdrop-blur-md">
      <nav
        className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-3 md:px-10 md:py-4"
        aria-label="Main navigation"
      >
        <a
          href="#profile"
          className="inline-flex items-center"
          aria-label={logoText}
        >
          <img
            src={logoMark}
            alt={logoText}
            className="h-20 w-auto max-w-none md:h-24"
          />
        </a>

        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          className="font-body rounded-sm border border-ink/20 px-3 py-2 text-xs font-medium uppercase tracking-[0.16em] text-ink lg:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
        >
          Menu
        </button>

        <ul className="hidden items-center gap-6 lg:flex">
          {loading && (
            <li className="font-body text-sm text-ink-muted">
              Loading navigation...
            </li>
          )}

          {!loading && error && (
            <li className="font-body text-sm text-ink-muted">{error}</li>
          )}

          {!loading &&
            !error &&
            filteredNavLinks.map((link, index) => (
              <li key={link.id || `${link.href}-${index}`}>
                <a
                  href={link.href || "#"}
                  className="font-body text-xs font-medium uppercase tracking-[0.14em] text-ink-muted transition-colors duration-200 hover:text-ink"
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
                className="font-body rounded-full border border-ink bg-transparent px-4 py-1 text-xs font-medium uppercase tracking-[0.14em] text-ink transition-colors duration-200 hover:bg-[#ebe5da]"
              >
                Hire Me
              </a>
            </li>
          )}
        </ul>
      </nav>

      <div
        id="mobile-navigation"
        className={`overflow-hidden border-t border-ink/10 px-6 transition-all duration-300 lg:hidden ${
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
                  className="font-body text-sm font-medium uppercase tracking-[0.12em] text-ink-muted transition-colors duration-200 hover:text-ink"
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
                className="font-body inline-block rounded-full border border-ink bg-transparent px-4 py-1 text-xs font-medium uppercase tracking-[0.14em] text-ink transition-colors duration-200 hover:bg-[#ebe5da]"
              >
                Hire Me
              </a>
            </li>
          )}

          {loading && (
            <li className="font-body text-sm text-ink-muted">
              Loading navigation...
            </li>
          )}

          {!loading && error && (
            <li className="font-body text-sm text-ink-muted">{error}</li>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
