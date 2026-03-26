import { useEffect, useState } from "react";
import { fetchResume } from "../../services";

const RESUME_URL = import.meta.env.VITE_RESUME_URL || "/resume.pdf";

const NAV_LINKS = [
  { label: "Home", href: "#profile" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const linkClassName =
  "rounded-full px-4 py-2 text-base font-semibold text-slate-700 transition-all duration-300 hover:bg-slate-100 hover:text-indigo-700";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [resumeUrl, setResumeUrl] = useState(RESUME_URL);

  useEffect(() => {
    const closeMenuOnDesktop = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", closeMenuOnDesktop);
    return () => window.removeEventListener("resize", closeMenuOnDesktop);
  }, []);

  useEffect(() => {
    let isMounted = true;

    const loadResume = async () => {
      try {
        const response = await fetchResume();
        const apiResumeUrl = response?.data?.resume_url;
        if (isMounted && apiResumeUrl) {
          setResumeUrl(apiResumeUrl);
        }
      } catch {
        if (isMounted) {
          setResumeUrl(RESUME_URL);
        }
      }
    };

    loadResume();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200/70 bg-white/85 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-3 md:px-8">
        <a
          href={resumeUrl}
          className="text-transparent font-bold uppercase bg-clip-text bg-gradient-to-r from-indigo-900 to-violet-900"
          target="_blank"
          rel="noopener noreferrer"
        >
          VIEW Full Résumé
        </a>

        <ul className="hidden list-none items-center gap-2 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={linkClassName}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          className="relative grid h-11 w-11 place-content-center rounded-xl border border-slate-300 bg-white text-slate-800 shadow-sm transition hover:border-indigo-500 hover:text-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 md:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
        >
          <span
            className={`block h-0.5 w-5 rounded-full bg-current transition-transform duration-300 ${
              isOpen ? "translate-y-[7px] rotate-45" : ""
            }`}
          ></span>
          <span
            className={`my-1 block h-0.5 w-5 rounded-full bg-current transition-opacity duration-300 ${
              isOpen ? "opacity-0" : "opacity-100"
            }`}
          ></span>
          <span
            className={`block h-0.5 w-5 rounded-full bg-current transition-transform duration-300 ${
              isOpen ? "-translate-y-[7px] -rotate-45" : ""
            }`}
          ></span>
        </button>
      </div>

      <div
        id="mobile-navigation"
        className={`overflow-hidden border-t border-slate-200/80 bg-white/95 px-5 transition-all duration-300 md:hidden ${
          isOpen
            ? "max-h-80 py-4 opacity-100"
            : "pointer-events-none max-h-0 py-0 opacity-0"
        }`}
      >
        <ul className="flex list-none flex-col gap-2">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={handleLinkClick}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="block rounded-xl px-4 py-3 text-left text-lg font-semibold text-slate-700 transition-colors duration-300 hover:bg-slate-100 hover:text-indigo-700"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
