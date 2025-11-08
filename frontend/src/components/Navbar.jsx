import React, { useState } from 'react';
import { HelpCircle, Menu, X } from 'lucide-react';
import { FileSpreadsheet } from 'lucide-react';
import Logo from '../assets/Logo.png'

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md border-b border-gray-100 rounded-xl">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 transition-opacity">
            <div className="w-12 h-12">
              <img src={Logo} alt="" />
            </div>
            <span className="text-2xl font-bold text-gray-900">ExcelGPT</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {/* <a href="#" className="text-gray-700 font-medium hover:text-green-500 transition-colors instrument-sans-main">Features</a>
            <a href="#" className="text-gray-700 font-medium hover:text-green-500 transition-colors instrument-sans-main">Pricing</a>
            <a href="#" className="text-gray-700 font-medium hover:text-green-500 transition-colors instrument-sans-main">Docs</a> */}
            
            <button className="flex items-center gap-2 bg-gradient-to-br from-green-500 to-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md">
              <HelpCircle size={18} />
              Help
            </button>
          </div>

          {/* Mobile menu button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700 hover:text-green-500 transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-gray-100 flex flex-col gap-4">
            {/* <a href="#" className="text-gray-700 font-medium hover:text-green-500 transition-colors">Features</a>
            <a href="#" className="text-gray-700 font-medium hover:text-green-500 transition-colors">Pricing</a>
            <a href="#" className="text-gray-700 font-medium hover:text-green-500 transition-colors">Docs</a> */}
            
            <button className="flex items-center justify-center gap-2 bg-gradient-to-br from-green-500 to-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors w-full">
              <HelpCircle size={18} />
              Help
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;