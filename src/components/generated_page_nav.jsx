import { useState } from "react";
import { Menu, X } from "lucide-react";



const Generated_Page_Nav = ({makesidebarshow}) => {



     const [menuOpen, setMenuOpen] = useState(false);
  return (
<>

 <nav className="w-full z-50 fixed top-0 left-0 bg-white/80 backdrop-blur-md border-b shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 md:py-4">
        {/* Logo */}
        <a href="/" className="text-2xl font-bold">
          Bloom<span className="text-blue-600">Queue</span>
        </a>

        {/* Desktop Nav Items */}
        <div className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <button className="hover:text-blue-600 transition" onClick={()=>{
            makesidebarshow(true);
          }}>Edit</button>
          <button className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition">
            Publish
          </button>
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
            <li>
              <button
                onClick={() => setMenuOpen(false)}
                className="block hover:text-blue-600 transition"
              >
                Edit
              </button>
            </li>
            <li>
              <button
                onClick={() => setMenuOpen(false)}
                className="w-full text-left px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Publish
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>

</>
  )
}

export default Generated_Page_Nav;
