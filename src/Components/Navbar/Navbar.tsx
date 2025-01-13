import { useEffect, useState } from "react";
import { HashLink } from "react-router-hash-link";

type colors = "white" | "black";

export const Navbar = ({ TextColor }: { TextColor: colors }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isscrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <nav
        className={`
          fixed w-full z-50 h-16 transition-all duration-300 px-6
          ${isscrolled 
            ? 'bg-slate-900/95 backdrop-blur-md shadow-lg' 
            : 'bg-transparent backdrop-blur-sm'}
          ${TextColor === "white" ? "text-white" : "text-black"}
        `}
      >
        <div className="flex justify-between items-center h-full w-full max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <img
              className="h-8 w-8 object-contain"
              src="/favicon.ico"
              alt="GymNavigator Logo"
            />
            <span className="text-xl font-montserrat font-bold">
              GymNavigator
            </span>
          </div>
          
          <div className="hidden lg:flex items-center gap-8">
            {["About us", "Contact us", "Home"].map((item) => (
              <HashLink
                key={item}
                to={`#${item.toLowerCase().replace(' ', '-')}`}
                smooth
                className="relative font-medium hover:text-cyan-400 transition-all duration-200
                  after:content-[''] after:absolute after:w-full after:h-[2px] 
                  after:bg-cyan-400 after:bottom-0 after:left-0
                  after:scale-x-0 hover:after:scale-x-100
                  after:transition-transform after:duration-300"
              >
                {item}
              </HashLink>
            ))}
          </div>

          <button
            className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
            onClick={() => setIsOpen(true)}
            aria-label="Open menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsOpen(false)}
        />

        {/* Sidebar */}
        <div
          className={`absolute top-0 right-0 w-[280px] h-full bg-slate-900 shadow-xl transition-transform duration-300 transform
            ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-8">
              <span className="text-xl font-bold text-white">Menu</span>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                aria-label="Close menu"
              >
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              {["About us", "Contact us", "Home"].map((item) => (
                <HashLink
                  key={item}
                  to={`#${item.toLowerCase().replace(' ', '-')}`}
                  smooth
                  className="block py-3 px-4 text-white hover:bg-white/10 rounded-lg transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </HashLink>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
