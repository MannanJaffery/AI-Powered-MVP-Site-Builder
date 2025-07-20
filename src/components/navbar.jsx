
import { useState } from "react";
import { Menu, X } from "lucide-react"; 

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);


  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "Templates", href: "#templates" },
    { name: "Pricing", href: "#pricing" },
  ];



  return (
    <nav className="w-full z-20 fixed top-0 left-0 shadow-sm bg-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 md:py-4">
        {/* Logo */}
        <a href="/" className="text-2xl font-bold">
          MVP<span className="text-blue-600">Builder</span>
        </a>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 text-sm font-medium">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a href={link.href} className="hover:text-blue-600 transition">
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <div className="hidden md:block">
          <a
            href="#start"
            className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition"
          >
            Start Building
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4">
          <ul className="space-y-4 text-sm font-medium">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block hover:text-blue-600 transition"
                >
                  {link.name}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#start"
                onClick={() => setMenuOpen(false)}
                className="block mt-2 px-4 py-2 bg-blue-600 text-white text-center rounded-xl hover:bg-blue-700 transition"
              >
                Start Building
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

