import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-soft-white shadow-md sticky top-0 z-10 w-full">
      <NavLink to="/" className="text-xl font-bold text-gray-800">
        Portfolio(LOGO here)
      </NavLink>
      <ul className="flex flex-row list-none gap-6 items-center">
        <li>
          <NavLink to="/" className="hover:text-blue-500">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/projects" className="hover:text-blue-500">
            Projects
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact" className="hover:text-blue-500">
            Contact
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
