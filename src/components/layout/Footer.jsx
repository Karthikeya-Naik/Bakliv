import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import Container from '../ui/Container';

const Footer = () => {
  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' }
  ];

  const socialLinks = [
    { name: 'LinkedIn', icon: Linkedin, href: '#' }
  ];

  return (
    <footer className="bg-white" style={{ color: '#54595f' }}>
      
      {/* Footer content */}
      <Container>
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-gray-700">Quick Links</h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
              
              {/* Social Links */}
              <div className="mt-6 flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="p-2 bg-blue-950 text-white rounded-full hover:bg-blue-900 transition-colors duration-300"
                    aria-label={social.name}
                  >
                    <social.icon size={20} />
                  </a>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-gray-700">Contact Info</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail size={18} className="text-[#181d54]" />
                  <span className="text-gray-600">contact-us@bakliv.com</span>
                </div>
              </div>
            </div>

            {/* About BAKLIV */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-gray-700">About BAKLIV</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                BAKLIV is a pharmaceutical company focused on delivering safe, effective, and high-quality healthcare solutions with a commitment to innovation and care.
              </p>
              <button className="bg-blue-950 text-white px-6 py-2 rounded-lg hover:bg-blue-900 transition-colors duration-300 flex items-center space-x-2">
                <Phone size={16} />
                <span>Get in Touch</span>
              </button>
            </div>
          </div>
        </div>
      </Container>

      {/* Bottom section with logo and copyright */}
      <div className="border-t border-gray-400 mx-12">
        <Container>
          <div className="py-8 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <img 
                src="/src/assets/logo.png" 
                alt="BAKLIV Logo" 
                className="h-8 w-auto"
              />
            </div>
            <div className="text-gray-500 text-sm font-light">
              Copyright © 2024. All rights reserved to BAKLIV
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;