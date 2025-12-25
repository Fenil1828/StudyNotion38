// components/common/MobileNav.jsx
import React, { useState } from 'react';
import { HiMenuAlt3, HiX } from 'react-icons/hi';

const MobileNav = ({ navLinks, user, token }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-white p-2"
      >
        {isOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-richblack-900 border-t border-richblack-700 z-50">
          <div className="flex flex-col p-4 space-y-4">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.path}
                className="text-richblack-25 hover:text-yellow-25 py-2"
                onClick={() => setIsOpen(false)}
              >
                {link.title}
              </a>
            ))}
            
            {!token && (
              <div className="flex flex-col space-y-2 pt-4 border-t border-richblack-700">
                <button className="py-2 px-4 border border-richblack-700 text-richblack-100 rounded-md">
                  Log in
                </button>
                <button className="py-2 px-4 bg-yellow-50 text-richblack-900 rounded-md">
                  Sign up
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileNav;