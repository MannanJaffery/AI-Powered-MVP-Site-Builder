import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";


const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);




  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "FAQ", href: "#faq" },
    { name: "Pricing", href: "#pricing" },
  ];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setMenuOpen(false);
    } catch (error) {
      console.error("Logout Error:", error.message);
    }
  };

  return (
    <nav className="w-full z-50 fixed top-0 left-0 bg-white/80 backdrop-blur-md border-b shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 md:py-4">
        {/* Logo */}
        <a href="/" className="text-2xl font-bold">
          Bloom<span className="text-blue-600">Queue</span>
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

          {user && (
            <a href="/input-idea">New Project</a>
          )}
        </ul>

        {/* Auth Button */}
        <div className="hidden md:block">
                {user ? (
                <button
                    onClick={handleLogout}
                    className="px-4 py-2 rounded-xl text-sm font-semibold transition-colors bg-gray-50 text-gray-700 hover:bg-gray-100"
                >
                    Sign Out
                </button>
                ) : (
                <a
                    href="/login"
                    className="px-4 py-2 rounded-xl text-sm font-semibold transition-colors bg-gray-50 text-gray-700 hover:bg-gray-100"
                >
                    Login
                </a>
                )}
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
              {user ? (
                <button
                onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                }}
                className="font-bold text-black"
                >
                Sign Out
                </button>
              ) : (
                <a
                  href="/login"
                  className="font-bold text-black"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </a>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
