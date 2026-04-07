const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-[#e6e9df] py-8 font-['Inter']">
      <div className="mx-auto max-w-7xl px-4 text-center">
        <p className="text-[#2b2a27]">
          © {currentYear} Natalia Pricop. All rights reserved.
        </p>
        <p className="mt-2 text-sm text-[#4a4944]">
          Built with React, Django, and Tailwind CSS
        </p>
      </div>
    </footer>
  );
};

export default Footer;
