import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, Zap, Shield, Cpu } from 'lucide-react';

const Footer = () => {
  const quickLinks = [
    { name: 'About Us', href: '#about' },
    { name: 'Academy Programs', href: '#academy' },
    { name: 'Our Players', href: '#players' },
    { name: 'Latest News', href: '#news' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' }
  ];

  const programs = [
    { name: 'Youth Development', href: '#academy' },
    { name: 'Academy Elite', href: '#academy' },
    { name: 'Professional Prep', href: '#academy' },
    { name: 'Summer Camps', href: '#academy' },
    { name: 'Individual Training', href: '#academy' },
    { name: 'Goalkeeper Academy', href: '#academy' }
  ];

  const socialLinks = [
    { icon: <Facebook size={20} />, href: '#', name: 'Facebook' },
    { icon: <Twitter size={20} />, href: '#', name: 'Twitter' },
    { icon: <Instagram size={20} />, href: '#', name: 'Instagram' },
    { icon: <Youtube size={20} />, href: '#', name: 'Youtube' }
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      {/* Newsletter Banner */}
      <div className="bg-gradient-to-r from-orange-600 to-red-700 dark:from-cyan-600 dark:to-blue-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                <Zap className="w-6 h-6" />
                Stay Updated
              </h3>
              <p className="text-orange-100 dark:text-cyan-100">Get the latest news and updates from United FC Kodagu</p>
            </div>
            <div className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-80 px-4 py-3 rounded-l-full text-gray-900 focus:outline-none bg-white/90 backdrop-blur-sm"
              />
              <button className="bg-gray-900 hover:bg-gray-800 px-6 py-3 rounded-r-full font-semibold transition-colors flex items-center gap-2 text-white">
                <Shield className="w-4 h-4" />
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Club Info */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 dark:from-cyan-400 dark:to-blue-600 rounded-full flex items-center justify-center border border-orange-400/30 dark:border-cyan-400/30">
                <span className="font-bold text-lg text-white">FC</span>
              </div>
              <span className="font-bold text-xl">United FC Kodagu</span>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Developing the next generation of football talent through 
              <span className="text-orange-500 dark:text-cyan-400"> excellence</span>, 
              <span className="text-red-500 dark:text-blue-400"> discipline</span>, and 
              <span className="text-yellow-500 dark:text-purple-400"> passion</span> since 1999.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-cyan-400 transition-colors">
                <MapPin size={16} className="text-orange-500 dark:text-cyan-400" />
                <span>123 Football Avenue, Sports City</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-cyan-400 transition-colors">
                <Phone size={16} className="text-orange-500 dark:text-cyan-400" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-cyan-400 transition-colors">
                <Mail size={16} className="text-orange-500 dark:text-cyan-400" />
                <span>info@elitefc.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-orange-500 dark:text-cyan-400" />
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-cyan-400 transition-colors relative group"
                  >
                    {link.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-red-500 dark:from-cyan-400 dark:to-blue-500 transition-all group-hover:w-full" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="font-bold text-lg mb-6 flex items-center gap-2">
              <Shield className="w-5 h-5 text-orange-500 dark:text-cyan-400" />
              Programs
            </h4>
            <ul className="space-y-3">
              {programs.map((program) => (
                <li key={program.name}>
                  <button
                    onClick={() => scrollToSection(program.href)}
                    className="text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-cyan-400 transition-colors relative group"
                  >
                    {program.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-red-500 dark:from-cyan-400 dark:to-blue-500 transition-all group-hover:w-full" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Contact */}
          <div>
            <h4 className="font-bold text-lg mb-6 flex items-center gap-2">
              <Zap className="w-5 h-5 text-orange-500 dark:text-cyan-400" />
              Follow Us
            </h4>
            <div className="flex gap-4 mb-6">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-gradient-to-br hover:from-orange-500 hover:to-red-600 dark:hover:from-cyan-500 dark:hover:to-blue-600 hover:text-white transition-all border border-gray-300 dark:border-gray-700 hover:border-orange-400/50 dark:hover:border-cyan-400/50"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
            <div className="bg-gray-200/50 dark:bg-gray-800 p-4 rounded-lg border border-gray-300/50 dark:border-gray-700">
              <h5 className="font-semibold mb-2 text-orange-500 dark:text-cyan-400">Training Hours</h5>
              <p className="text-sm text-gray-700 dark:text-gray-300">Mon-Fri: 8:00 AM - 8:00 PM</p>
              <p className="text-sm text-gray-700 dark:text-gray-300">Sat-Sun: 9:00 AM - 6:00 PM</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-300 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              © 2024 United FC Kodagu. All rights reserved.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <button className="text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-cyan-400 text-sm transition-colors">
                Privacy Policy
              </button>
              <button className="text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-cyan-400 text-sm transition-colors">
                Terms of Service
              </button>
              <button className="text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-cyan-400 text-sm transition-colors">
                Cookie Policy
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;