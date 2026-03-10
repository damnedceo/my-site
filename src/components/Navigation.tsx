import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'ГЛАВНАЯ', href: '/' },
    { label: 'О НАС', href: '/about' },
    { label: 'УСЛУГИ', href: '/services' },
    { label: 'КЕЙСЫ', href: '/cases' },
    { label: 'БЛОГ', href: '/blog' },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled || location.pathname !== '/'
            ? 'bg-white/95 backdrop-blur-sm border-b border-black'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link
              to="/"
              className="font-mono text-sm lg:text-base font-bold tracking-wider"
            >
              YANDEXSEO.PRO
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`font-mono text-xs tracking-widest py-1 relative ${
                    isActive(link.href) 
                      ? 'text-black after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-black' 
                      : 'link-underline'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <Link
              to="/contacts"
              className="hidden lg:block btn-fill border-2 border-black px-6 py-2 font-mono text-xs tracking-widest transition-colors duration-300"
            >
              КОНТАКТЫ
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-white transition-transform duration-500 lg:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`font-mono text-xl tracking-widest ${
                isActive(link.href) ? 'text-black font-bold' : 'text-gray-600'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/contacts"
            className="btn-fill border-2 border-black px-8 py-3 font-mono text-sm tracking-widest mt-4"
          >
            КОНТАКТЫ
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navigation;
