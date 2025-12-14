import React, { useState } from 'react';
import { HelpCircle, Menu, X } from 'lucide-react';
import { FileSpreadsheet } from 'lucide-react';
import Logo from '../assets/Logo.png'

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white/90 backdrop-blur-sm shadow-lg border-b border-gray-100 rounded-2xl">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <a href="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
            <span className="text-2xl font-press underline decoration-green-500 bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
              ExcelGPT
            </span>
          </a>

          <div className="hidden md:flex items-center gap-4">
            <button className="flex items-center gap-2 bg-gradient-to-br from-green-500 to-green-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:shadow-lg transition-all active:scale-95">
              <HelpCircle size={18} />
              Help
            </button>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700 hover:text-green-500 transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-gray-100 flex flex-col gap-4">
            <button className="flex items-center justify-center gap-2 bg-gradient-to-br from-green-500 to-green-600 text-white px-4 py-2 rounded-xl font-semibold hover:shadow-lg transition-all w-full">
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