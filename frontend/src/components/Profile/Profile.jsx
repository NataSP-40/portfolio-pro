import { getMediaUrl } from "../../services";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";

const Profile = ({
  profileData,
  loading,
  error,
  contactInfo,
  contactLoading,
  contactError,
}) => {
  const profileImageUrl = getMediaUrl(profileData?.profile_image);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-600">{error}</div>;
  if (!profileData) return <div className="text-center">No profile found.</div>;

  return (
    <div className="min-h-screen">
      <section className="py-10 px-6 md:min-h-[90vh]">
        <div className="mx-auto flex max-w-7xl flex-col gap-12">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-[20rem_minmax(0,1fr)] md:items-center">
            <div className="group flex flex-col items-center">
              <div className="relative inline-block">
                {profileImageUrl ? (
                  <img
                    src={profileImageUrl}
                    alt={profileData.name}
                    className="w-75 h-75 rounded-full object-cover shadow-2xl border-4 border-white transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-75 h-75 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-5xl font-bold shadow-xl border-4 border-white transition-transform duration-500 group-hover:scale-105">
                    {(profileData.name || "?").charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="absolute inset-0 bg-indigo-400 rounded-full blur-2xl opacity-20 -z-10 group-hover:opacity-40 transition-opacity"></div>
              </div>

              {!contactLoading && !contactError && (
                <div className="mt-5 flex justify-center gap-3">
                  {contactInfo?.linkedin_link && (
                    <a
                      href={contactInfo.linkedin_link}
                      aria-label="LinkedIn profile"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full text-slate-500 hover:text-indigo-700 hover:bg-indigo-50 transition-colors"
                    >
                      <FaLinkedinIn size={32} />
                    </a>
                  )}

                  {contactInfo?.github_link && (
                    <a
                      href={contactInfo.github_link}
                      aria-label="GitHub profile"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full text-slate-500 hover:text-indigo-700 hover:bg-indigo-50 transition-colors"
                    >
                      <FaGithub size={32} />
                    </a>
                  )}
                </div>
              )}
            </div>

            <div className="text-center md:text-left">
              <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
                Hello, I am{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-900 to-violet-900">
                  {profileData.name}
                </span>
              </h1>

              <h2 className="text-2xl md:text-3xl font-semibold text-slate-700 mb-8 italic">
                {profileData.title}
              </h2>

              <p className="text-xl text-slate-600 mb-12 leading-relaxed max-w-2xl mx-auto md:mx-0">
                {profileData.hero_statement}
              </p>

              <div className="flex flex-wrap justify-center md:justify-start gap-6">
                <a
                  href="#projects"
                  className="bg-white text-violet-900 border-2 border-violet-900 px-10 py-4 rounded-xl font-bold hover:bg-purple-50 hover:-translate-y-1 transition-all duration-300"
                >
                  View My Work
                </a>

                <a
                  href="#contact"
                  className="bg-white text-violet-900 border-2 border-violet-900 px-10 py-4 rounded-xl font-bold hover:bg-purple-50 hover:-translate-y-1 transition-all duration-300"
                >
                  Get in Touch
                </a>
              </div>
            </div>
          </div>

          <section
            id="about"
            className="relative left-1/2 -translate-x-1/2 mt-6 md:mt-10 bg-white/80 backdrop-blur-sm p-6 md:p-8 lg:p-10 rounded-2xl md:rounded-3xl shadow-xl border border-slate-100 w-[92vw] md:w-[90vw] lg:w-[88vw]"
          >
            <div className="space-y-4 md:space-y-6 text-left">
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
                About{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-900 to-violet-900">
                  Me
                </span>
              </h3>
              <div className="h-2 w-20 bg-indigo-600 rounded-full"></div>
              <p className="text-lg text-slate-700 leading-relaxed italic border-l-4 border-indigo-100 pl-6">
                {profileData.about_me || profileData.bio}
              </p>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
};

export default Profile;
