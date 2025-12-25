// src/components/core/DashboardLayout.jsx
import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardNavbar from './DashboardNavbar';
import DashboardSidebar from './DashboardSidebar';

const DashboardLayout = () => {
  const location = useLocation();
  const { user } = useSelector((state) => state.profile);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile sidebar when route changes
  useEffect(() => {
    setMobileSidebarOpen(false);
  }, [location.pathname]);

  // Toggle sidebar on desktop
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Animation variants
  const contentVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0, 
      x: -20,
      transition: { 
        duration: 0.2,
        ease: "easeIn"
      } 
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-richblack-900">
      {/* Dashboard Navbar */}
      <DashboardNavbar 
        scrolled={scrolled} 
        toggleSidebar={toggleSidebar} 
        sidebarOpen={sidebarOpen}
        setMobileSidebarOpen={setMobileSidebarOpen}
      />
      
      <div className="flex flex-1 pt-16">
        {/* Desktop Sidebar */}
        <DashboardSidebar 
          sidebarOpen={sidebarOpen} 
          mobileSidebarOpen={mobileSidebarOpen}
          setMobileSidebarOpen={setMobileSidebarOpen}
        />
        
        {/* Main Content */}
        <main className={`flex-1 transition-all duration-300 ${
          sidebarOpen ? 'ml-[250px]' : 'ml-0'
        }`}>
          <div className="w-full max-w-7xl mx-auto px-4 py-6 md:px-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                variants={contentVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="min-h-[calc(100vh-10rem)]"
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
      
      {/* Floating Action Button for Mobile */}
      {!mobileSidebarOpen && (
        <motion.button
          className="md:hidden fixed bottom-6 right-6 z-40 rounded-full p-3 bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg shadow-blue-500/50"
          whileHover={{ scale: 1.05, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setMobileSidebarOpen(true)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </motion.button>
      )}
    </div>
  );
};

export default DashboardLayout;