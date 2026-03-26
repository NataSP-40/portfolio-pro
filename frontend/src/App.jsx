import { useEffect } from "react";
import "./App.css";
import useApiClient from "./api.js";
import { fetchContactInfo, fetchProfile } from "./services.js";
import Profile from "./components/Profile/Profile.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import Contact from "./components/Contact/Contact.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Projects from "./components/Projects/Projects.jsx";
import TechnicalStack from "./components/TechnicalStack/TechnicalStack.jsx";

function App() {
  const {
    data: profile,
    loading: profileLoading,
    error: profileError,
    request: requestProfile,
  } = useApiClient();

  const {
    data: contact,
    loading: contactLoading,
    error: contactError,
    request: requestContact,
  } = useApiClient();

  useEffect(() => {
    requestProfile(fetchProfile).catch(() => {});
  }, [requestProfile]);

  useEffect(() => {
    requestContact(fetchContactInfo).catch(() => {});
  }, [requestContact]);

  const profileData = Array.isArray(profile) ? profile[0] : profile;
  const contactInfo = Array.isArray(contact) ? contact[0] : contact;

  return (
    <div className="min-h-screen bg-softwhite">
      <Navbar />
      <main className="max-w-7xl mx-auto py-10">
        {/* Section 1: Profile */}
        <section id="profile">
          <Profile
            profileData={profileData}
            loading={profileLoading}
            error={profileError}
            contactInfo={contactInfo}
            contactLoading={contactLoading}
            contactError={contactError}
          />
        </section>

        {/* Section 2: Projects */}
        <section id="projects" className="mt-10">
          <Projects />
        </section>

        {/* Section 3: Technical Stack */}
        <section id="skills" className="mt-20">
          <TechnicalStack
            profileData={profileData}
            loading={profileLoading}
            error={profileError}
          />
        </section>

        {/* Section 4: Contact */}
        <section id="contact" className="mt-20">
          <Contact
            contactInfo={contactInfo}
            contactLoading={contactLoading}
            contactError={contactError}
          />
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
