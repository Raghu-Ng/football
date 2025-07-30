import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingCart, User, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import ThemeToggle from './ThemeToggle';
import { useNavigate } from "react-router-dom";
import unitedFcLogo from '../assets/united-fc-kodagu-logo.png';

interface NavigationProps {
  onCartOpen: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ onCartOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(true);
  const { user, signOut } = useAuth();
  const { state } = useCart();
  const navigate = useNavigate();

  // useEffect`(() => {
  //   const handleScroll = () => {
  //     setIsScrolled(window.scrollY > 50);
  //   };
  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);`

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/#about' },
    { name: 'Players', href: '/players' },
    { name: 'News', href: '/news' },
    { name: 'Gallery', href: '/#gallery' },
    { name: 'Store', href: '/#store' },
    { name: 'Contact', href: '/#contact' }
  ];

  const handleNavClick = (href: string) => {
    if (href === '/') {
      navigate('/?scroll=top');
      setIsOpen(false);
      return;
    }
    if (href.startsWith('/#')) {
      const section = href.split('#')[1];
      navigate(`/?scroll=${section}`);
      setIsOpen(false);
      return;
    }
    navigate(href);
    setIsOpen(false);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-orange-200/50 dark:border-cyan-500/20 shadow-lg shadow-orange-500/10 dark:shadow-cyan-500/10' 
        : 'bg-transparent'
    }`}>
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <div className="flex items-center space-x-2">
<div className="w-10 h-10">
  <img
    src={unitedFcLogo}
    alt="United FC Kodagu Logo"
    className="w-full h-full object-contain"
  />
</div>
              <span className="font-bold text-xl text-gray-900 dark:text-white">
                United FC Kodagu
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className="px-3 py-2 text-sm font-medium transition-all hover:text-orange-500 dark:hover:text-cyan-400 text-gray-700 dark:text-gray-300 relative group"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-red-500 dark:from-cyan-400 dark:to-blue-500 transition-all group-hover:w-full" />
                </button>
              ))}
              
              {/* Theme Toggle */}
              <ThemeToggle />
              
              {/* Cart Button */}
              <button
                onClick={() => navigate('/cart')}
                className="relative p-2 rounded-full transition-all text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-cyan-400 hover:bg-orange-400/10 dark:hover:bg-cyan-400/10"
              >
                <ShoppingCart size={20} />
                {state.items.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-orange-500 to-red-600 dark:from-cyan-500 dark:to-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                    {state.items.length}
                  </span>
                )}
              </button>

              {/* Auth Button */}
              {user ? (
                <div className="flex items-center gap-2">
                  <div className="rounded-full overflow-hidden">
                    <img src={`https://placehold.co/40x40/blue/white?text=${user.email?.slice(0, 2).toUpperCase()}`} alt="" />
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="p-2 rounded-full transition-all text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-400/10"
                  >
                    <LogOut size={20} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => navigate("/signin")}
                  className="bg-gradient-to-r from-orange-500 to-red-600 dark:from-cyan-500 dark:to-blue-600 hover:from-orange-400 hover:to-red-500 dark:hover:from-cyan-400 dark:hover:to-blue-500 text-white px-6 py-2 rounded-full font-medium transition-all flex items-center gap-2 shadow-lg shadow-orange-500/25 dark:shadow-cyan-500/25"
                >
                  <User size={16} />
                  Sign In
                </button>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => navigate('/cart')}
              className="relative p-2 rounded-full text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-cyan-400"
            >
              <ShoppingCart size={20} />
              {state.items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-orange-500 to-red-600 dark:from-cyan-500 dark:to-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {state.items.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-cyan-400"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-orange-200/50 dark:border-cyan-500/20">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-cyan-400 hover:bg-orange-400/10 dark:hover:bg-cyan-400/10 w-full text-left rounded-lg transition-all"
              >
                {item.name}
              </button>
            ))}
            {user ? (
              <div className="px-3 py-2 border-t border-gray-200 dark:border-gray-700 mt-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{user.email}</p>
                <button
                  onClick={handleSignOut}
                  className="text-red-500 dark:text-red-400 font-medium hover:text-red-600 dark:hover:text-red-300"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => navigate("/signin")}
                className="w-full mt-4 bg-gradient-to-r from-orange-500 to-red-600 dark:from-cyan-500 dark:to-blue-600 text-white px-6 py-3 rounded-full font-medium transition-all"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;