import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import "./Navbar.css";

export default function Navbar() {
  const { pathname } = useLocation();

  const links = [
    { name: "Home", path: "/" },
    { name: "About", path: "/aboutme" },
    { name: "Projects", path: "/project" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4">
      <div className="flex items-center justify-between max-w-6xl mx-auto">

        {/* Left */}
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-teal-400 rounded-full animate-pulse"></span>
          <p className="text-teal-300 text-sm font-semibold tracking-wide">
            Online
          </p>
        </div>

        {/* Center nav */}
        <div className="relative flex gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10 backdrop-blur-xl shadow-lg">

          {links.map((link) => {
            const isActive = pathname === link.path;

            return (
              <Link
                key={link.path}
                to={link.path}
                className="relative px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition"
              >
                {/* Active pill */}
                {isActive && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-teal-400 rounded-full -z-10 shadow-[0_0_20px_rgba(45,212,191,0.6)]"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}

                {/* Text */}
                <span className={isActive ? "text-black" : ""}>
                  {link.name}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Right */}
        <div className="hidden md:block text-gray-400 text-sm">
          Riley.dev
        </div>

      </div>
    </nav>
  );
}