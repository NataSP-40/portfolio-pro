const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white py-8 mt-20">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-gray-300">
          © {currentYear} Natalia Pricop. All rights reserved.
        </p>
        <p className="text-gray-400 text-sm mt-2">
          Built with React, Django, and Tailwind CSS
        </p>
      </div>
    </footer>
  );
};

export default Footer;
