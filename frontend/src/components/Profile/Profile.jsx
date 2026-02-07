import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Essential for the CTA buttons
import { fetchProfile } from "../../api.js";

const Profile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetchProfile()
      .then((response) => {
        console.log("Full API Response:", response.data);
        // Logic: Handle list vs single object from DRF
        const data = Array.isArray(response.data)
          ? response.data[0]
          : response.data;
        console.log("Extracted Profile Object:", data);
        setProfile(data);
      })
      .catch((error) => console.error("Error fetching profile:", error));
  }, []);

  // Guard Clause: Prevents "undefined" errors while fetching
  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* SECTION 1: HERO SECTION */}
      {/* min-h-[80vh] makes the hero take up most of the screen on load */}
      <section className="flex flex-col items-center justify-center text-center py-20 px-6 bg-gray-50">
        <div className="max-w-4xl">
          {/* Milestone 4: Profile Image inside Hero */}
          <img
            src={profile.profile_image}
            alt={profile.name}
            className="w-40 h-40 rounded-full mx-auto mb-8 object-cover shadow-xl border-4 border-white"
          />

          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4">
            Hello, I am <span className="text-blue-600">{profile.name}</span>.
          </h1>
          <h2 className="text-2xl md:text-3xl font-medium text-gray-700 mb-6">
            Full Stack Software Engineer
          </h2>
          <p className="text-xl text-gray-600 mb-10 leading-relaxed">
            I build elegant, high-performance web applications with modern
            technologies. Passionate about clean code and exceptional user
            experiences.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/projects"
              className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition shadow-lg"
            >
              View My Work
            </Link>
            <Link
              to="/contact"
              className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-full font-bold hover:bg-blue-50 transition"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 2: ABOUT & SKILLS */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* About Me Text */}
          <div>
            <h3 className="text-3xl font-bold mb-6 text-gray-900 border-b-4 border-blue-500 inline-block">
              About Me
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              I'm a full-stack software engineer with 4+ years of experience
              building web applications that users love. I specialize in React
              and Node.js, with a passion for creating clean, efficient, and
              scalable solutions.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              When I'm not coding, you'll find me exploring new technologies,
              contributing to open source, or sharing knowledge through
              technical writing.
            </p>
          </div>

          {/* Technical Skills Stack */}
          <div className="bg-gray-50 p-8 rounded-2xl shadow-inner">
            <h3 className="text-2xl font-bold mb-8 text-gray-900">
              Technical Stack
            </h3>

            <div className="space-y-6">
              {/* Frontend Category */}
              <div>
                <h4 className="font-bold text-blue-600 uppercase text-sm tracking-widest mb-3">
                  Frontend
                </h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    "React",
                    "JavaScript",
                    "HTML/CSS",
                    "Tailwind CSS",
                    "Next.js",
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="bg-white px-3 py-1 rounded border border-gray-200 text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Backend Category */}
              <div>
                <h4 className="font-bold text-blue-600 uppercase text-sm tracking-widest mb-3">
                  Backend
                </h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Node.js",
                    "Python",
                    "PostgreSQL",
                    "MongoDB",
                    "REST APIs",
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="bg-white px-3 py-1 rounded border border-gray-200 text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tools Category */}
              <div>
                <h4 className="font-bold text-blue-600 uppercase text-sm tracking-widest mb-3">
                  Tools
                </h4>
                <div className="flex flex-wrap gap-2">
                  {["Git", "Docker", "AWS", "CI/CD", "Jest"].map((skill) => (
                    <span
                      key={skill}
                      className="bg-white px-3 py-1 rounded border border-gray-200 text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;
