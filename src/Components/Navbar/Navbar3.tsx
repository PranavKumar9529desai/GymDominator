import { AnimatePresence, m } from '@util/lib/motion';
import { useEffect, useState } from 'react';
import { FiCreditCard, FiHeart, FiMenu, FiUser, FiX } from 'react-icons/fi'; // Add this import
import { GiGymBag } from 'react-icons/gi'; // New gym icon
import { Link, useLocation, useNavigate } from 'react-router-dom';

const optimizedLogo = new Image();
optimizedLogo.src = '/favicon.ico';

export const Navbar3 = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isscrolled, setScrolled] = useState<boolean>(false);
  const [isScrollingUp, setIsScrollingUp] = useState<boolean>(true);
  const [lastScrollY, setLastScrollY] = useState<number>(0);
  const location = useLocation();
  const navigate = useNavigate();

  const sections = [
    {
      name: 'My Gym',
      path: '/dashboard/gym',
      icon: <GiGymBag className="w-5 h-5" />,
    },
    {
      name: 'About Trainer',
      path: '/dashboard/trainer',
      icon: <FiUser className="w-5 h-5" />,
    },
    {
      name: 'Health Profile',
      path: '/dashboard/health-profile',
      icon: <FiHeart className="w-5 h-5" />,
    },
    {
      name: 'Wallet',
      path: '/dashboard/wallet',
      icon: <FiCreditCard className="w-5 h-5" />,
    },
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
      const currentScrollY = window.scrollY;
      setIsScrollingUp(currentScrollY < lastScrollY || currentScrollY <= 0);
      setScrolled(currentScrollY > 50);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <div>
      <nav
        className={`
        fixed w-full z-50 transition-all duration-300
        ${isscrolled ? 'py-2 bg-gray-100/95 backdrop-blur-md shadow-lg' : 'py-4 bg-gray-50/80'}
        ${!isScrollingUp && isscrolled ? '-translate-y-full' : 'translate-y-0'}
        text-gray-800
      `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/">
              <m.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center space-x-3"
              >
                <img src={optimizedLogo.src} alt="Logo" className="w-8 h-8" />
                <span className="text-xl font-bold text-gray-800">GymNavigator</span>
              </m.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {sections.map((section, i) => (
                <m.button
                  key={section.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => handleNavigation(section.path)}
                  className={`relative px-3 py-2 rounded-lg transition-colors ${
                    location.pathname === section.path
                      ? 'bg-blue-700/50 text-blue-300'
                      : 'hover:bg-blue-800/30'
                  }`}
                >
                  {section.icon}
                  <span>{section.name}</span>
                </m.button>
              ))}

              <m.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30 transition-colors"
              >
                Sign Out
              </m.button>
            </div>

            {/* Mobile Menu Button */}
            <m.button
              whileTap={{ scale: 0.9 }}
              className="lg:hidden p-2 rounded-lg "
              onClick={() => setIsOpen(true)}
            >
              <FiMenu className="w-6 h-6 text-gray-700" />
            </m.button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu - Slides from Top */}
      <AnimatePresence>
        {isOpen && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-50 lg:hidden"
          >
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            <m.div
              initial={{ y: '-100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30,
                duration: 0.2,
              }}
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-gray-50 to-gray-100 shadow-xl"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <Link to="/" className="flex items-center space-x-3">
                    <img src={optimizedLogo.src} alt="Logo" className="w-10 h-10" />
                    <span className="text-xl font-bold text-gray-800">GymNavigator</span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-full hover:bg-gray-200 transition-colors"
                  >
                    <FiX className="w-6 h-6 text-gray-600" />
                  </button>
                </div>

                <div className="space-y-3">
                  {sections.map((section, i) => (
                    <m.button
                      key={section.name}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      onClick={() => handleNavigation(section.path)}
                      className={`w-full p-4 rounded-xl text-left flex items-center space-x-4 transition-all
                        ${
                          location.pathname === section.path
                            ? 'bg-blue-50 text-blue-600 shadow-sm'
                            : 'text-gray-700 hover:bg-gray-50'
                        }
                      `}
                    >
                      <span
                        className={`${
                          location.pathname === section.path ? 'text-blue-500' : 'text-gray-500'
                        }`}
                      >
                        {section.icon}
                      </span>
                      <span className="font-medium">{section.name}</span>
                    </m.button>
                  ))}

                  <div className="pt-4 mt-4 border-t border-gray-200">
                    <m.button
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      onClick={handleLogout}
                      className="w-full p-4 rounded-xl bg-red-50 hover:bg-red-100 
                        text-red-600 border border-red-100 flex items-center 
                        justify-center space-x-2 transition-colors"
                    >
                      <FiX className="w-5 h-5" />
                      <span className="font-medium">Sign Out</span>
                    </m.button>
                  </div>
                </div>
              </div>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
};
