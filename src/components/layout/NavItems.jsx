import React from "react";
import { Link, useLocation } from "react-router-dom";

const NavItems = () => {
  const location = useLocation();
  const links = [
    { name: "Home", path: "/" },
    { name: "Work", path: "#", external: true },
  ];

  const getLinkClass = (isActive) => `
        px-3 md:px-5 
        py-2 rounded-full 
        text-[10px] md:text-xs 
        font-bold transition-all duration-300 uppercase 
        tracking-widest
        flex-shrink-0
        ${
          isActive
            ? "bg-[#fbbf24] text-[#0f172a] shadow-lg shadow-amber-500/20"
            : "text-gray-400 hover:text-white hover:bg-white/5"
        }
    `;

  return (
    <div className="relative flex items-center bg-[#1e293b]/90 backdrop-blur-lg rounded-full p-1.5 shadow-2xl border border-white/10 w-fit mx-auto transition-all duration-300 scale-90 md:scale-100">
      {/*LEFT SIDE*/}
      <div className="flex items-center">
        {/* Home */}
        <Link to="/" className={getLinkClass(location.pathname === "/")}>
          Home
        </Link>

        {/* About Dropdown */}
        <div className="relative group">
          <button className={`${getLinkClass(false)} cursor-pointer`}>
            About
          </button>
          <div className="absolute left-0 top-full mt-3 w-64 md:w-80 bg-[#1e293b] border border-white/10 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 transition-all duration-300 z-100 p-5 overflow-hidden">
            <h3 className="text-accent font-bold text-xs mb-2 uppercase tracking-tighter">
              The Story of Deck
            </h3>
            <div className="space-y-3 text-gray-300 text-[11px] md:text-xs leading-relaxed normal-case tracking-normal mb-4">
              <p>
                <span className="text-white font-semibold">CatDeck</span> is a
                specialized AI assistant powered by the{" "}
                <span className="text-accent">Groq API (Llama 3.3)</span>.
              </p>
              <p>
                This project is a dedicated effort to simplify web development
                workflows while showcasing my modern technical skillset and
                portfolio practices.
              </p>
            </div>
            <div className="space-y-1.5 border-t border-white/5 pt-3">
              <div className="flex justify-between text-[9px] uppercase tracking-widest text-gray-500">
                <span>Focus</span>
                <span className="text-gray-300">Web Development</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-4 w-px bg-white/10 mx-2 md:mx-3"></div>

      {/*RIGHT SIDE*/}
      <a
        href={links[1].path}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.preventDefault()}
        className={getLinkClass(false)}
      >
        {links[1].name}
      </a>

      {/*CONTACT WITH DROPDOWN */}
      <div className="relative group">
        <button className={`${getLinkClass(false)} cursor-pointer`}>
          Contact
        </button>

        <div className="absolute right-0 top-full mt-3 w-32 md:w-40 bg-[#1e293b] border border-white/10 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 transition-all duration-300 z-100 overflow-hidden">
          <a
            href="https://www.linkedin.com/in/chirag-in"
            target="_blank"
            className="block px-4 py-3 text-[10px] md:text-xs hover:bg-accent hover:text-[#0f172a] text-gray-300 font-bold transition-colors border-b border-white/5"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/Ikchiragcore"
            target="_blank"
            className="block px-4 py-3 text-[10px] md:text-xs hover:bg-accent hover:text-[#0f172a] text-gray-300 font-bold transition-colors border-b border-white/5"
          >
            GitHub
          </a>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=ikchirag06@gmail.com&su="
            target="_blank"
            rel="noopener noreferrer"
            className="block px-4 py-3 text-[10px] md:text-xs hover:bg-accent hover:text-[#0f172a] text-gray-300 font-bold transition-colors"
          >
            Gmail me
          </a>
        </div>
      </div>
    </div>
  );
};

export default NavItems;
