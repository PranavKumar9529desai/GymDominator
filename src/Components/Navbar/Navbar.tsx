import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

type colors = 'white' | 'black';

const optimizedLogo = new Image();
optimizedLogo.src = '/favicon.ico';

export const Navbar = ({ TextColor }: { TextColor: colors }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isscrolled, setScrolled] = useState<boolean>(false);
  const location = useLocation();

  const navigate = useNavigate();

  const sections = [
    { name: 'About', path: '/about' },
    { name: 'Features', path: '/features' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    navigate('/');
    setIsOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
      <nav
        className={`
          fixed w-full z-50 transition-all duration-500
          ${isscrolled ? 'py-2 bg-slate-900/95 backdrop-blur-md shadow-lg' : 'py-4 bg-transparent'}
          ${TextColor === 'white' ? 'text-white' : 'text-black'}
        `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Simplified Logo Section */}
            <Link to="/">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center space-x-3"
              >
                <img
                  src={optimizedLogo.src}
                  alt="GymNavigator Logo"
                  className="w-8 h-8 object-contain"
                />
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    GymNavigator
                  </h1>
                  <span className="text-xs text-gray-400">Professional Tracking</span>
                </div>
              </motion.div>
            </Link>

            {/* Updated Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {sections.map((section, i) => (
                <motion.div
                  key={section.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <button
                    type="button"
                    onClick={() => handleNavigation(section.path)}
                    className="relative py-2 font-medium"
                  >
                    <span
                      className={
                        location.pathname === section.path
                          ? 'text-blue-400'
                          : 'text-white hover:text-blue-400 transition-colors'
                      }
                    >
                      {section.name}
                    </span>
                    <span
                      className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 transform origin-left transition-transform duration-300 ${
                        location.pathname === section.path ? 'scale-x-100' : 'scale-x-0'
                      }`}
                    />
                  </button>
                </motion.div>
              ))}

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const token = localStorage.getItem('jwt');
                  navigate(token ? '/dashboard' : '/signin');
                }}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium"
              >
                {localStorage.getItem('jwt') ? 'Go to Dashboard' : 'Get Started'}
              </motion.button>

              {localStorage.getItem('jwt') && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg border border-red-500/50 hover:bg-red-500/10 text-red-500 font-medium transition-colors"
                >
                  Sign Out
                </motion.button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setIsOpen(true)}
            >
              <svg 
                className="w-6 h-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                role="img"
                aria-label="Menu button"
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
        </div>
      </nav>

      {/* Enhanced Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 lg:hidden"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 20 }}
              className="absolute top-0 right-0 w-[300px] h-full bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 shadow-xl"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <svg
                  className="w-6 h-6 text-white/80"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  role="img"
                  aria-label="Close menu"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Menu Content */}
              <div className="h-full flex flex-col">
                {/* Header */}
                <div className="p-6 border-b border-white/10">
                  <div className="flex items-center space-x-3">
                    <img src={optimizedLogo.src} alt="Logo" className="w-10 h-10" />
                    <div>
                      <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                        GymNavigator
                      </h2>
                      <p className="text-sm text-gray-400">Professional Tracking</p>
                    </div>
                  </div>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 px-4 py-6">
                  <div className="space-y-2">
                    {sections.map((section, index) => (
                      <button
                        type="button"
                        key={section.name}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => handleNavigation(section.path)}
                        className={`flex items-center w-full p-4 rounded-lg group transition-all ${
                          location.pathname === section.path
                            ? 'bg-blue-500/20 text-blue-400'
                            : 'text-white/90 hover:bg-white/10'
                        }`}
                      >
                        <span className="flex-1 text-left">{section.name}</span>
                        <svg
                          className={`w-5 h-5 ${
                            location.pathname === section.path ? 'text-blue-400' : 'text-gray-400'
                          } group-hover:translate-x-1 transition-transform`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          role="img"
                          aria-label="Toggle section"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    ))}
                  </div>
                </nav>

                {/* Footer */}
                <div className="p-6 border-t border-white/10">
                  {localStorage.getItem('jwt') ? (
                    <div className="space-y-2">
                      <motion.button
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => {
                          navigate('/profile');
                          setIsOpen(false);
                        }}
                        className="w-full py-2.5 px-4 rounded-lg bg-white/10 text-white font-medium hover:bg-white/15 transition-colors flex items-center gap-2"
                      >
                        <div className="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center text-sm">
                          {localStorage.getItem('username')?.[0]?.toUpperCase() || 'U'}
                        </div>
                        Profile
                      </motion.button>

                      <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full py-2.5 px-4 text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          role="img"
                          aria-label="Logout"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                          />
                        </svg>
                        Sign Out
                      </button>
                    </div>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        navigate('/signin');
                        setIsOpen(false);
                      }}
                      className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium hover:opacity-90 transition-opacity"
                    >
                      Get Started
                    </motion.button>
                  )}

                  {/* Existing social links */}
                  <div className="mt-6 flex justify-center space-x-4">
                    <a href="https://facebook.com" className="text-gray-400 hover:text-white transition-colors">
                      <svg 
                        className="w-6 h-6" 
                        fill="currentColor" 
                        viewBox="0 0 24 24"
                        role="img"
                        aria-label="Facebook"
                      >
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </a>
                    <a href="https://twitter.com" className="text-gray-400 hover:text-white transition-colors">
                      <svg 
                        className="w-6 h-6" 
                        fill="currentColor" 
                        viewBox="0 0 24 24"
                        role="img"
                        aria-label="Twitter"
                      >
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                      </svg>
                    </a>
                    <a href="https://telegram.org" className="text-gray-400 hover:text-white transition-colors">
                      <svg 
                        className="w-6 h-6" 
                        fill="currentColor" 
                        viewBox="0 0 24 24"
                        role="img"
                        aria-label="Telegram"
                      >
                        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.223-.555.223l.198-2.8 5.106-4.618c.222-.196-.054-.304-.346-.108l-6.32 3.98-2.7-.844c-.585-.183-.608-.586.122-.87l10.547-4.069c.485-.177.915.107.752.863z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
