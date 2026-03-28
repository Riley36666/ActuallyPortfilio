import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const { pathname } = useLocation();

  const linkClasses = (path) =>
    `px-5 py-2 rounded-full transition font-medium ${
      pathname === path
        ? "bg-teal-300 text-black shadow-[0_0_15px_rgba(45,212,191,0.6)]"
        : "text-gray-300 hover:bg-teal-300 hover:text-black"
    }`;

  return (
    <nav className="flex items-center justify-between px-10 py-4 bg-black text-white">
      {/* Left side indicator */}
      <div className="flex items-center gap-2">
        <span className="w-3 h-3 bg-teal-300 rounded-full animate-pulse"></span>
        <p className="text-teal-300 text-sm font-semibold">Online</p>
      </div>

      {/* Rounded nav container */}
      <div className="flex gap-4 bg-gray-900/40 px-6 py-3 rounded-full border border-gray-700/40 backdrop-blur-md">
        <Link to="/" className={linkClasses("/")}>
          Home
        </Link>
        <Link to="/AboutMe" className={linkClasses("/aboutme")}>
        About Me</Link>
        <Link to="/project" className={linkClasses("/project")}>
          Projects
        </Link>
        <Link to="/contact" className={linkClasses("/contact")}>
        Contact</Link>
      </div>

      {/* Right side visitor indicator */}
      <div className="text-gray-300 text-sm">
        
      </div>
    </nav>
  );
}
