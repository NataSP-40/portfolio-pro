const About = ({ profileData }) => {
  if (!profileData) return null;

  return (
    <section id="about" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="space-y-6 max-w-3xl">
        <h3 className="text-4xl font-black text-slate-900 tracking-tight">
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
  );
};

export default About;
