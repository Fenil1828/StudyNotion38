

// import React, { useEffect, useState, useRef } from 'react';
// import { Link, matchPath, useLocation, useNavigate } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { AiOutlineMenu, AiOutlineClose, AiOutlineShoppingCart } from 'react-icons/ai';
// import { BsChevronDown } from 'react-icons/bs';
// import { motion, AnimatePresence } from 'framer-motion';
// import Logo from "../../assets/Logo/Logo-Full-Light.png";
// import { NavbarLinks } from '../../data/navbar-links';
// import { ACCOUNT_TYPE } from '../../utils/constants';
// import { apiConnector } from '../../services/apiConnector';
// import { categories } from '../../services/apis';
// import { logout } from '../../services/operations/authAPI'; // Import logout action

// const Navbar = () => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const { token } = useSelector((state) => state.auth);
//     const { user } = useSelector((state) => state.profile);
//     const { totalItems } = useSelector((state) => state.cart);
//     const location = useLocation();
//     const profileRef = useRef(null);
//     const catalogRef = useRef(null);

//     const [loading, setLoading] = useState(false);
//     const [subLinks, setSubLinks] = useState([]);
//     const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//     const [catalogDropdownOpen, setCatalogDropdownOpen] = useState(false);
//     const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
//     const [scrolled, setScrolled] = useState(false);
//     const [mobileCatalogDropdownOpen, setMobileCatalogDropdownOpen] = useState(false); // Separate state for mobile

//     // Fetch categories
//     useEffect(() => {
//         const fetchCategories = async () => {
//             setLoading(true);
//             try {
//                 const res = await apiConnector("GET", categories.CATEGORIES_API);
//                 setSubLinks(res.data.data || []);
//             } catch (error) {
//                 console.error("Could not fetch categories", error);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchCategories();
//     }, []);

//     // Handle scroll effect
//     useEffect(() => {
//         const handleScroll = () => {
//             setScrolled(window.scrollY > 10);
//         };
//         window.addEventListener('scroll', handleScroll);
//         return () => window.removeEventListener('scroll', handleScroll);
//     }, []);

//     // Close dropdowns when clicking outside
//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (profileRef.current && !profileRef.current.contains(event.target)) {
//                 setProfileDropdownOpen(false);
//             }
//             if (catalogRef.current && !catalogRef.current.contains(event.target)) {
//                 setCatalogDropdownOpen(false);
//             }
//         };
//         document.addEventListener('mousedown', handleClickOutside);
//         return () => document.removeEventListener('mousedown', handleClickOutside);
//     }, []);

//     // Close menus on route change
//     useEffect(() => {
//         setMobileMenuOpen(false);
//         setCatalogDropdownOpen(false);
//         setProfileDropdownOpen(false);
//         setMobileCatalogDropdownOpen(false); // Close mobile catalog dropdown too
//     }, [location.pathname]);

//     const matchRoute = (route) => {
//         return matchPath({ path: route }, location.pathname);
//     };

//     // Handle logout
//     const handleLogout = () => {
//         dispatch(logout(navigate));
//         setProfileDropdownOpen(false);
//         setMobileMenuOpen(false);
//     };

//     // Animation variants
//     const menuVariants = {
//         open: { 
//             y: 0, 
//             opacity: 1,
//             transition: { 
//                 type: "spring", 
//                 damping: 25, 
//                 duration: 0.3 
//             }
//         },
//         closed: { 
//             y: "-100%", 
//             opacity: 0,
//             transition: { 
//                 ease: "easeInOut", 
//                 duration: 0.2 
//             } 
//         }
//     };

//     const dropdownVariants = {
//         open: {
//             opacity: 1,
//             y: 0,
//             scale: 1,
//             transition: {
//                 type: "spring",
//                 damping: 25,
//                 stiffness: 300,
//                 mass: 0.5
//             }
//         },
//         closed: {
//             opacity: 0,
//             y: -15,
//             scale: 0.95,
//             transition: {
//                 duration: 0.15
//             }
//         }
//     };

//     // Unique slide-in animation for mobile items
//     const itemSlideIn = (index) => ({
//         hidden: { opacity: 0, x: -30 },
//         visible: { 
//             opacity: 1, 
//             x: 0,
//             transition: {
//                 delay: index * 0.1,
//                 type: "spring",
//                 stiffness: 120
//             }
//         }
//     });

//     return (
//         <motion.div 
//             initial={{ y: -100 }}
//             animate={{ y: 0 }}
//             transition={{ type: "spring", stiffness: 120, damping: 20 }}
//             className={`fixed top-0 w-full z-50 transition-all duration-300 ${
//                 scrolled 
//                     ? 'bg-richblack-800 shadow-lg py-0 border-b border-richblack-600' 
//                     : 'py-2 bg-transparent'
//             }`}
//         >
//             <div className='w-11/12 max-w-maxContent mx-auto flex items-center justify-between '>
//                 {/* Logo with bounce animation */}
//                 <Link to="/" className="z-50">
//                     <motion.img 
//                         src={Logo} 
//                         alt="Logo" 
//                         width={160}
//                         height={42}
//                         loading='lazy'
//                         className="h-10 object-contain"
//                         whileHover={{ 
//                             scale: 1.05,
//                             rotate: [0, -2, 0, 2, 0],
//                             transition: { duration: 0.5 }
//                         }}
//                     />
//                 </Link>

//                 {/* Desktop Navigation */}
//                 <nav className="hidden md:block">
//                     <ul className="flex gap-x-8 text-richblack-25">
//                         {NavbarLinks.map((link, index) => (
//                             <motion.li 
//                                 key={index}
//                                 whileHover={{ y: -3 }}
//                                 transition={{ type: "spring", stiffness: 300 }}
//                             >
//                                 {link.title === "Catalog" ? (
//                                     <div 
//                                         ref={catalogRef}
//                                         className={`group relative flex cursor-pointer items-center gap-1 ${
//                                             matchRoute("/catalog/:catalogName") 
//                                                 ? "text-yellow-25" 
//                                                 : 'text-richblack-25'
//                                         }`}
//                                         onMouseEnter={() => setCatalogDropdownOpen(true)}
//                                         onMouseLeave={() => setCatalogDropdownOpen(false)}
//                                     >
//                                         <p className='font-medium'>{link.title}</p>
//                                         <BsChevronDown className="text-xs transition-transform duration-200" />
                                        
//                                         <AnimatePresence>
//                                             {catalogDropdownOpen && (
//                                                 <motion.div
//                                                     variants={dropdownVariants}
//                                                     initial="closed"
//                                                     animate="open"
//                                                     exit="closed"
//                                                     className="absolute  top-full z-50 mt-3 w-[220px] -translate-x-3/4 rounded-xl bg-richblack-5 p-4 text-richblack-900 shadow-2xl"
//                                                 >
//                                                     <div className="absolute left-[30%] top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-richblack-5"></div>
//                                                     {loading ? (
//                                                         <p className="text-center">Loading...</p>
//                                                     ) : subLinks.length ? (
//                                                         <div className="grid grid-cols-1 gap-2">
//                                                             {subLinks.map((subLink, i) => (
//                                                                 <motion.div
//                                                                     key={i}
//                                                                     whileHover={{ x: 5 }}
//                                                                     transition={{ type: "spring", stiffness: 400 }}
//                                                                 >
//                                                                     <Link
//                                                                         to={`/catalog/${subLink.name
//                                                                             .split(" ")
//                                                                             .join("-")
//                                                                             .toLowerCase()}`}
//                                                                         className="block rounded-lg py-2 pl-3 hover:bg-richblack-100 transition-all duration-200"
//                                                                         onClick={() => setCatalogDropdownOpen(false)} // Close dropdown immediately
//                                                                     >
//                                                                         <p className="font-medium">{subLink.name}</p>
//                                                                     </Link>
//                                                                 </motion.div>
//                                                             ))}
//                                                         </div>
//                                                     ) : (
//                                                         <p className="text-center">No Courses Found</p>
//                                                     )}
//                                                 </motion.div>
//                                             )}
//                                         </AnimatePresence>
//                                     </div>
//                                 ) : (
//                                     <Link to={link?.path}>
//                                         <motion.p 
//                                             className={`font-medium ${
//                                                 matchRoute(link?.path) 
//                                                     ? "text-yellow-25" 
//                                                     : "text-richblack-25 hover:text-richblack-50"
//                                             } transition-colors duration-200`}
//                                             whileHover={{ 
//                                                 scale: 1.05,
//                                                 textShadow: "0px 0px 8px rgba(255,255,255,0.5)"
//                                             }}
//                                         >
//                                             {link.title}
//                                         </motion.p>
//                                     </Link>
//                                 )}
//                             </motion.li>
//                         ))}
//                     </ul>
//                 </nav>

//                 {/* Desktop Buttons */}
//                 <div className="hidden md:flex items-center gap-x-6">
//                     {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
//                         <Link to="/dashboard/cart" className="relative">
//                             <motion.div 
//                                 whileHover={{ scale: 1.1, rotate: [0, -5, 0, 5, 0] }}
//                                 whileTap={{ scale: 0.9 }}
//                                 className="relative"
//                             >
//                                 <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
//                                 {totalItems > 0 && (
//                                     <motion.span 
//                                         initial={{ scale: 0 }}
//                                         animate={{ scale: 1 }}
//                                         className="absolute -bottom-2 -right-2 grid h-6 w-6 place-items-center overflow-hidden rounded-full bg-pink-600 text-center text-xs font-bold text-white">
//                                         {totalItems}
//                                     </motion.span>
//                                 )}
//                             </motion.div>
//                         </Link>
//                     )}
                    
//                     {token === null ? (
//                         <div className="flex gap-3">
//                             <Link to="/login">
//                                 <motion.button
//                                     whileHover={{ scale: 1.03, boxShadow: "0px 0px 12px rgba(255,255,255,0.2)" }}
//                                     whileTap={{ scale: 0.97 }}
//                                     className="rounded-lg px-4 py-2 font-medium text-richblack-100 bg-gradient-to-r from-richblack-700 to-richblack-800 hover:from-richblack-600 hover:to-richblack-700 transition-all duration-200 shadow-sm"
//                                 >
//                                     Log in
//                                 </motion.button>
//                             </Link>
//                             <Link to="/signup">
//                                 <motion.button
//                                     whileHover={{ scale: 1.03, boxShadow: "0px 0px 12px rgba(234,179,8,0.4)" }}
//                                     whileTap={{ scale: 0.97 }}
//                                     className="rounded-lg px-4 py-2 font-medium text-richblack-900 bg-gradient-to-r from-yellow-50 to-yellow-100 hover:from-yellow-100 hover:to-yellow-200 transition-all duration-200 shadow-sm"
//                                 >
//                                     Sign up
//                                 </motion.button>
//                             </Link>
//                         </div>
//                     ) : (
//                         <div className="relative" ref={profileRef}>
//                             <motion.button
//                                 whileHover={{ scale: 1.1 }}
//                                 whileTap={{ scale: 0.9 }}
//                                 onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
//                                 className="flex items-center gap-2 p-1 rounded-full"
//                             >
//                                 <motion.div 
//                                     className="relative"
//                                     animate={profileDropdownOpen ? { rotate: 360 } : { rotate: 0 }}
//                                     transition={{ duration: 0.5 }}
//                                 >
//                                     <img 
//                                         src={user.image} 
//                                         alt="Profile" 
//                                         className="h-10 w-10 rounded-full object-cover border-2 border-yellow-50 shadow-md"
//                                     />
//                                     <div className="absolute inset-0 rounded-full border-2 border-transparent animate-ping opacity-0" />
//                                 </motion.div>
//                                 <BsChevronDown className={`text-xs transition-transform duration-300 ${
//                                     profileDropdownOpen ? 'rotate-180 text-yellow-50' : 'text-richblack-25'
//                                 }`} />
//                             </motion.button>
                            
//                             <AnimatePresence>
//                                 {profileDropdownOpen && (
//                                     <motion.div
//                                         variants={dropdownVariants}
//                                         initial="closed"
//                                         animate="open"
//                                         exit="closed"
//                                         className="absolute right-0 top-full mt-3 w-52 rounded-xl bg-richblack-800 shadow-xl z-50 overflow-hidden border border-richblack-600 backdrop-blur-sm"
//                                     >
//                                         <motion.div
//                                             initial={{ opacity: 0 }}
//                                             animate={{ opacity: 1 }}
//                                             transition={{ delay: 0.1 }}
//                                             className="p-4 border-b border-richblack-600"
//                                         >
//                                             <p className="text-sm text-richblack-5 font-semibold">{user.firstName} {user.lastName}</p>
//                                             <p className="text-xs text-richblack-200">{user.email}</p>
//                                         </motion.div>
                                        
//                                         <Link 
//                                             to="/dashboard/my-profile"
//                                             className="block px-4 py-3 text-sm text-richblack-5 hover:bg-richblack-700 transition-colors duration-200 flex items-center gap-2"
//                                             onClick={() => setProfileDropdownOpen(false)}
//                                         >
//                                             <span className="w-2 h-2 rounded-full bg-yellow-50"></span>
//                                             Dashboard
//                                         </Link>
//                                         <button 
//                                             className="block w-full text-left px-4 py-3 text-sm text-richblack-5 hover:bg-richblack-700 transition-colors duration-200 flex items-center gap-2 border-t border-richblack-600"
//                                             onClick={handleLogout} // Use logout handler
//                                         >
//                                             <span className="w-2 h-2 rounded-full bg-pink-500"></span>
//                                             Logout
//                                         </button>
//                                     </motion.div>
//                                 )}
//                             </AnimatePresence>
//                         </div>
//                     )}
//                 </div>

//                 {/* Mobile Menu Button */}
//                 <div className="flex md:hidden items-center gap-4">
//                     {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
//                         <Link to="/dashboard/cart" className="relative">
//                             <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
//                             {totalItems > 0 && (
//                                 <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-pink-600 text-center text-xs font-bold text-white">
//                                     {totalItems}
//                                 </span>
//                             )}
//                         </Link>
//                     )}
        
                    
//                     <motion.button 
//                         whileTap={{ scale: 0.9, rotate: 90 }}
//                         onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//                         className="text-richblack-100 p-1"
//                     >
//                         {mobileMenuOpen ? (
//                             <AiOutlineClose fontSize={26} />
//                         ) : (
//                             <AiOutlineMenu fontSize={26} />
//                         )}
//                     </motion.button>
//                 </div>
//             </div>

//             {/* Mobile Menu */}
//             <AnimatePresence>
//                 {mobileMenuOpen && (
//                     <motion.div 
//                         variants={menuVariants}
//                         initial="closed"
//                         animate="open"
//                         exit="closed"
//                         className="md:hidden fixed top-16 left-0 right-0 bg-gradient-to-b from-richblack-800 to-richblack-900 bg-opacity-95 backdrop-blur-lg z-40 shadow-xl rounded-b-2xl overflow-hidden"
//                     >
//                         <div className="flex flex-col p-6 gap-4">
//                             <ul className="flex flex-col gap-6">
//                                 {NavbarLinks.map((link, index) => (
//                                     <motion.li 
//                                         key={index}
//                                         variants={itemSlideIn(index)}
//                                         initial="hidden"
//                                         animate="visible"
//                                     >
//                                         {link.title === "Catalog" ? (
//                                             <div className="flex flex-col">
//                                                 <button 
//                                                     className={`flex items-center justify-between w-full py-2 text-lg ${
//                                                         mobileCatalogDropdownOpen ? 'text-yellow-25' : 'text-richblack-25'
//                                                     }`}
//                                                     onClick={() => setMobileCatalogDropdownOpen(!mobileCatalogDropdownOpen)}
//                                                 >
//                                                     <span>{link.title}</span>
//                                                     <BsChevronDown className={`transition-transform duration-300 ${
//                                                         mobileCatalogDropdownOpen ? 'rotate-180' : ''
//                                                     }`} />
//                                                 </button>
                                                
//                                                 {mobileCatalogDropdownOpen && (
//                                                     <motion.div 
//                                                         initial={{ height: 0, opacity: 0 }}
//                                                         animate={{ height: 'auto', opacity: 1 }}
//                                                         transition={{ duration: 0.3 }}
//                                                         className="ml-4 mt-2 pl-4 border-l-2 border-yellow-50 flex flex-col gap-3 overflow-hidden"
//                                                     >
//                                                         {loading ? (
//                                                             <p>Loading...</p>
//                                                         ) : subLinks.length ? (
//                                                             subLinks.map((subLink, i) => (
//                                                                 <Link
//                                                                     to={`/catalog/${subLink.name
//                                                                         .split(" ")
//                                                                         .join("-")
//                                                                         .toLowerCase()}`}
//                                                                     className="py-2 pl-2 text-richblack-25 hover:text-yellow-25 transition-colors border-b border-richblack-700"
//                                                                     key={i}
//                                                                     onClick={() => {
//                                                                         setMobileMenuOpen(false);
//                                                                         setMobileCatalogDropdownOpen(false);
//                                                                     }}
//                                                                 >
//                                                                     {subLink.name}
//                                                                 </Link>
//                                                             ))
//                                                         ) : (
//                                                             <p>No Courses Found</p>
//                                                         )}
//                                                     </motion.div>
//                                                 )}
//                                             </div>
//                                         ) : (
//                                             <Link 
//                                                 to={link?.path}
//                                                 className="block py-3 text-lg text-richblack-25 hover:text-yellow-25 transition-colors"
//                                                 onClick={() => setMobileMenuOpen(false)}
//                                             >
//                                                 <p className={`${matchRoute(link?.path) ? "text-yellow-25 font-medium" : ""} flex items-center`}>
//                                                     <span className="w-2 h-2 bg-yellow-50 rounded-full mr-3"></span>
//                                                     {link.title}
//                                                 </p>
//                                             </Link>
//                                         )}
//                                     </motion.li>
//                                 ))}
//                             </ul>
                            
//                             <div className="flex flex-col gap-4 pt-4 mt-2 border-t border-richblack-700">
//                                 {token === null ? (
//                                     <>
//                                         <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
//                                             <motion.button
//                                                 whileHover={{ scale: 1.02 }}
//                                                 whileTap={{ scale: 0.98 }}
//                                                 className="w-full rounded-xl bg-gradient-to-r from-richblack-700 to-richblack-800 py-3 text-richblack-5 font-medium hover:from-richblack-600 hover:to-richblack-700 transition-all duration-200"
//                                             >
//                                                 Log in
//                                             </motion.button>
//                                         </Link>
//                                         <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
//                                             <motion.button
//                                                 whileHover={{ scale: 1.02 }}
//                                                 whileTap={{ scale: 0.98 }}
//                                                 className="w-full rounded-xl bg-gradient-to-r from-yellow-50 to-yellow-100 py-3 text-richblack-900 font-medium hover:from-yellow-100 hover:to-yellow-200 transition-all duration-200"
//                                             >
//                                                 Sign up
//                                             </motion.button>
//                                         </Link>
//                                     </>
//                                 ) : (
//                                     <div className="flex flex-col gap-4 pt-4 mt-2 border-t border-richblack-700">
//                                         {token && user && (
//                                             <motion.div 
//                                                 className="flex items-center gap-4 mb-3 p-3 rounded-xl bg-gradient-to-r from-indigo-900/70 to-purple-900/70"
//                                                 initial={{ opacity: 0, x: -20 }}
//                                                 animate={{ opacity: 1, x: 0 }}
//                                                 transition={{ delay: 0.2 }}
//                                             >
//                                                 <motion.div
//                                                     whileHover={{ scale: 1.05 }}
//                                                     whileTap={{ scale: 0.95 }}
//                                                     className="relative"
//                                                 >
//                                                     <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-full blur-sm opacity-70 animate-pulse"></div>
//                                                     <img 
//                                                         src={user.image} 
//                                                         alt="Profile" 
//                                                         className="h-16 w-16 rounded-full object-cover border-4 border-white relative z-10"
//                                                     />
//                                                 </motion.div>
                                                
//                                                 <div className="flex-1">
//                                                     <p className="text-lg font-bold text-white">
//                                                         {user.firstName} {user?.lastName}
//                                                     </p>
//                                                     <p className="text-xs text-richblack-100 truncate max-w-[160px]">
//                                                         {user.email}
//                                                     </p>
//                                                 </div>
//                                             </motion.div>
//                                         )}

//                                         <div className="grid grid-cols-1 gap-3">
//                                             <motion.div
//                                                 whileHover={{ scale: 1.03 }}
//                                                 whileTap={{ scale: 0.98 }}
//                                             >
//                                                 <Link 
//                                                     to="/dashboard/my-profile" 
//                                                     className="block w-full rounded-xl py-3 text-center font-medium transition-all duration-300 relative overflow-hidden"
//                                                     onClick={() => setMobileMenuOpen(false)}
//                                                 >
//                                                     <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-700 z-0"></div>
//                                                     <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 opacity-0 hover:opacity-100 transition-opacity duration-300 z-10"></div>
//                                                     <span className="relative z-20 text-white flex items-center justify-center gap-2">
//                                                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                                                             <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
//                                                         </svg>
//                                                         Dashboard
//                                                     </span>
//                                                 </Link>
//                                             </motion.div>
                                            
//                                             <motion.div
//                                                 whileHover={{ scale: 1.03 }}
//                                                 whileTap={{ scale: 0.98 }}
//                                             >
//                                                 <button 
//                                                     className="block w-full rounded-xl py-3 text-center font-medium transition-all duration-300 relative overflow-hidden"
//                                                     onClick={handleLogout} // Use logout handler
//                                                 >
//                                                     <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-rose-700 z-0"></div>
//                                                     <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-rose-600 opacity-0 hover:opacity-100 transition-opacity duration-300 z-10"></div>
//                                                     <span className="relative z-20 text-white flex items-center justify-center gap-2">
//                                                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                                                             <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
//                                                         </svg>
//                                                         Logout
//                                                     </span>
//                                                 </button>
//                                             </motion.div>
//                                         </div>
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//                     </motion.div>
//                 )}
//             </AnimatePresence>
//         </motion.div>
//     )
// }

// export default Navbar;


import React, { useEffect, useState, useRef } from 'react';
import { Link, matchPath, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AiOutlineMenu, AiOutlineClose, AiOutlineShoppingCart } from 'react-icons/ai';
import { BsChevronDown } from 'react-icons/bs';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from '../../data/navbar-links';
import { ACCOUNT_TYPE } from '../../utils/constants';
import { apiConnector } from '../../services/apiConnector';
import { categories } from '../../services/apis';
import { logout } from '../../services/operations/authAPI'; // Import logout action

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const { totalItems } = useSelector((state) => state.cart);
    const location = useLocation();
    const profileRef = useRef(null);
    const catalogRef = useRef(null);

    const [loading, setLoading] = useState(false);
    const [subLinks, setSubLinks] = useState([]);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [catalogDropdownOpen, setCatalogDropdownOpen] = useState(false);
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [mobileCatalogDropdownOpen, setMobileCatalogDropdownOpen] = useState(false); // Separate state for mobile

    // Fetch categories
    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true);
            try {
                const res = await apiConnector("GET", categories.CATEGORIES_API);
                setSubLinks(res.data.data || []);
            } catch (error) {
                console.error("Could not fetch categories", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setProfileDropdownOpen(false);
            }
            if (catalogRef.current && !catalogRef.current.contains(event.target)) {
                setCatalogDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Close menus on route change
    useEffect(() => {
        setMobileMenuOpen(false);
        setCatalogDropdownOpen(false);
        setProfileDropdownOpen(false);
        setMobileCatalogDropdownOpen(false); // Close mobile catalog dropdown too
    }, [location.pathname]);

    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname);
    };

    // Handle logout
    const handleLogout = () => {
        dispatch(logout(navigate));
        setProfileDropdownOpen(false);
        setMobileMenuOpen(false);
    };

    // Animation variants
    const menuVariants = {
        open: { 
            y: 0, 
            opacity: 1,
            transition: { 
                type: "spring", 
                damping: 25, 
                duration: 0.3 
            }
        },
        closed: { 
            y: "-100%", 
            opacity: 0,
            transition: { 
                ease: "easeInOut", 
                duration: 0.2 
            } 
        }
    };

    const dropdownVariants = {
        open: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                damping: 25,
                stiffness: 300,
                mass: 0.5
            }
        },
        closed: {
            opacity: 0,
            y: -15,
            scale: 0.95,
            transition: {
                duration: 0.15
            }
        }
    };

    // Unique slide-in animation for mobile items
    const itemSlideIn = (index) => ({
        hidden: { opacity: 0, x: -30 },
        visible: { 
            opacity: 1, 
            x: 0,
            transition: {
                delay: index * 0.1,
                type: "spring",
                stiffness: 120
            }
        }
    });

    return (
        <motion.div 
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${
                scrolled 
                    ? 'bg-richblack-800 shadow-lg py-0 border-b border-richblack-600' 
                    : 'py-2 bg-transparent'
            }`}
        >
            <div className='w-11/12 max-w-maxContent mx-auto flex items-center justify-between '>
                {/* Logo with bounce animation */}
                <Link to="/" className="z-50">
                    <motion.img 
                        src={Logo} 
                        alt="Logo" 
                        width={160}
                        height={42}
                        loading='lazy'
                        className="h-10 object-contain"
                        whileHover={{ 
                            scale: 1.05,
                            rotate: [0, -2, 0, 2, 0],
                            transition: { duration: 0.5 }
                        }}
                    />
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:block">
                    <ul className="flex gap-x-8 text-richblack-25">
                        {NavbarLinks.map((link, index) => (
                            <motion.li 
                                key={index}
                                whileHover={{ y: -3 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                {link.title === "Catalog" ? (
                                    <div 
                                        ref={catalogRef}
                                        className={`group relative flex cursor-pointer items-center gap-1 ${
                                            matchRoute("/catalog/:catalogName") 
                                                ? "text-yellow-25" 
                                                : 'text-richblack-25'
                                        }`}
                                        onMouseEnter={() => setCatalogDropdownOpen(true)}
                                        onMouseLeave={() => setCatalogDropdownOpen(false)}
                                    >
                                        <p className='font-medium'>{link.title}</p>
                                        <BsChevronDown className="text-xs transition-transform duration-200" />
                                        
                                        <AnimatePresence>
                                            {catalogDropdownOpen && (
                                                <motion.div
                                                    variants={dropdownVariants}
                                                    initial="closed"
                                                    animate="open"
                                                    exit="closed"
                                                    className="absolute  top-full z-50 mt-3 w-[220px] -translate-x-3/4 rounded-xl bg-richblack-5 p-4 text-richblack-900 shadow-2xl"
                                                >
                                                    <div className="absolute left-[30%] top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-richblack-5"></div>
                                                    {loading ? (
                                                        <p className="text-center">Loading...</p>
                                                    ) : subLinks.length ? (
                                                        <div className="grid grid-cols-1 gap-2">
                                                            {subLinks.map((subLink, i) => (
                                                                <motion.div
                                                                    key={i}
                                                                    whileHover={{ x: 5 }}
                                                                    transition={{ type: "spring", stiffness: 400 }}
                                                                >
                                                                    <Link
                                                                        to={`/catalog/${subLink.name
                                                                            .split(" ")
                                                                            .join("-")
                                                                            .toLowerCase()}`}
                                                                        className="block rounded-lg py-2 pl-3 hover:bg-richblack-100 transition-all duration-200"
                                                                        onClick={() => setCatalogDropdownOpen(false)} // Close dropdown immediately
                                                                    >
                                                                        <p className="font-medium">{subLink.name}</p>
                                                                    </Link>
                                                                </motion.div>
                                                            ))}
                                                        </div>
                                                    ) : (
                                                        <p className="text-center">No Courses Found</p>
                                                    )}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ) : (
                                    <Link to={link?.path}>
                                        <motion.p 
                                            className={`font-medium ${
                                                matchRoute(link?.path) 
                                                    ? "text-yellow-25" 
                                                    : "text-richblack-25 hover:text-richblack-50"
                                            } transition-colors duration-200`}
                                            whileHover={{ 
                                                scale: 1.05,
                                                textShadow: "0px 0px 8px rgba(255,255,255,0.5)"
                                            }}
                                        >
                                            {link.title}
                                        </motion.p>
                                    </Link>
                                )}
                            </motion.li>
                        ))}
                    </ul>
                </nav>

                {/* Desktop Buttons */}
                <div className="hidden md:flex items-center gap-x-6">
                    {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
                        <Link to="/dashboard/cart" className="relative">
                            <motion.div 
                                whileHover={{ scale: 1.1, rotate: [0, -5, 0, 5, 0] }}
                                whileTap={{ scale: 0.9 }}
                                className="relative"
                            >
                                <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
                                {totalItems > 0 && (
                                    <motion.span 
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="absolute -bottom-2 -right-2 grid h-6 w-6 place-items-center overflow-hidden rounded-full bg-pink-600 text-center text-xs font-bold text-white">
                                        {totalItems}
                                    </motion.span>
                                )}
                            </motion.div>
                        </Link>
                    )}
                    
                    {token === null ? (
                        <div className="flex gap-3">
                            <Link to="/login">
                                <motion.button
                                    whileHover={{ scale: 1.03, boxShadow: "0px 0px 12px rgba(255,255,255,0.2)" }}
                                    whileTap={{ scale: 0.97 }}
                                    className="rounded-lg px-4 py-2 font-medium text-richblack-100 bg-gradient-to-r from-richblack-700 to-richblack-800 hover:from-richblack-600 hover:to-richblack-700 transition-all duration-200 shadow-sm"
                                >
                                    Log in
                                </motion.button>
                            </Link>
                            <Link to="/signup">
                                <motion.button
                                    whileHover={{ scale: 1.03, boxShadow: "0px 0px 12px rgba(234,179,8,0.4)" }}
                                    whileTap={{ scale: 0.97 }}
                                    className="rounded-lg px-4 py-2 font-medium text-richblack-900 bg-gradient-to-r from-yellow-50 to-yellow-100 hover:from-yellow-100 hover:to-yellow-200 transition-all duration-200 shadow-sm"
                                >
                                    Sign up
                                </motion.button>
                            </Link>
                        </div>
                    ) : (
                        <div className="relative" ref={profileRef}>
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                                className="flex items-center gap-2 p-1 rounded-full"
                            >
                                <motion.div 
                                    className="relative"
                                    animate={profileDropdownOpen ? { rotate: 360 } : { rotate: 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <img 
                                        src={user.image} 
                                        alt="Profile" 
                                        className="h-10 w-10 rounded-full object-cover border-2 border-yellow-50 shadow-md"
                                    />
                                    <div className="absolute inset-0 rounded-full border-2 border-transparent animate-ping opacity-0" />
                                </motion.div>
                                <BsChevronDown className={`text-xs transition-transform duration-300 ${
                                    profileDropdownOpen ? 'rotate-180 text-yellow-50' : 'text-richblack-25'
                                }`} />
                            </motion.button>
                            
                            <AnimatePresence>
                                {profileDropdownOpen && (
                                    <motion.div
                                        variants={dropdownVariants}
                                        initial="closed"
                                        animate="open"
                                        exit="closed"
                                        className="absolute right-0 top-full mt-3 w-52 rounded-xl bg-richblack-800 shadow-xl z-50 overflow-hidden border border-richblack-600 backdrop-blur-sm"
                                    >
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.1 }}
                                            className="p-4 border-b border-richblack-600"
                                        >
                                            <p className="text-sm text-richblack-5 font-semibold">{user.firstName} {user.lastName}</p>
                                            <p className="text-xs text-richblack-200">{user.email}</p>
                                        </motion.div>
                                        
                                        <Link 
                                            to="/dashboard/my-profile"
                                            className="block px-4 py-3 text-sm text-richblack-5 hover:bg-richblack-700 transition-colors duration-200 flex items-center gap-2"
                                            onClick={() => setProfileDropdownOpen(false)}
                                        >
                                            <span className="w-2 h-2 rounded-full bg-yellow-50"></span>
                                            Dashboard
                                        </Link>
                                        <button 
                                            className="block w-full text-left px-4 py-3 text-sm text-richblack-5 hover:bg-richblack-700 transition-colors duration-200 flex items-center gap-2 border-t border-richblack-600"
                                            onClick={handleLogout} // Use logout handler
                                        >
                                            <span className="w-2 h-2 rounded-full bg-pink-500"></span>
                                            Logout
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <div className="flex md:hidden items-center gap-4">
                    {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
                        <Link to="/dashboard/cart" className="relative">
                            <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
                            {totalItems > 0 && (
                                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-pink-600 text-center text-xs font-bold text-white">
                                    {totalItems}
                                </span>
                            )}
                        </Link>
                    )}
        
                    
                    <motion.button 
                        whileTap={{ scale: 0.9, rotate: 90 }}
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="text-richblack-100 p-1"
                    >
                        {mobileMenuOpen ? (
                            <AiOutlineClose fontSize={26} />
                        ) : (
                            <AiOutlineMenu fontSize={26} />
                        )}
                    </motion.button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div 
                        variants={menuVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        className="md:hidden fixed top-16 left-0 right-0 bg-gradient-to-b from-richblack-800 to-richblack-900 bg-opacity-95 backdrop-blur-lg z-40 shadow-xl rounded-b-2xl overflow-hidden"
                    >
                        <div className="flex flex-col p-6 gap-4">
                            <ul className="flex flex-col gap-6">
                                {NavbarLinks.map((link, index) => (
                                    <motion.li 
                                        key={index}
                                        variants={itemSlideIn(index)}
                                        initial="hidden"
                                        animate="visible"
                                    >
                                        {link.title === "Catalog" ? (
                                            <div className="flex flex-col">
                                                <button 
                                                    className={`flex items-center justify-between w-full py-2 text-lg ${
                                                        mobileCatalogDropdownOpen ? 'text-yellow-25' : 'text-richblack-25'
                                                    }`}
                                                    onClick={() => setMobileCatalogDropdownOpen(!mobileCatalogDropdownOpen)}
                                                >
                                                    <span>{link.title}</span>
                                                    <BsChevronDown className={`transition-transform duration-300 ${
                                                        mobileCatalogDropdownOpen ? 'rotate-180' : ''
                                                    }`} />
                                                </button>
                                                
                                                {mobileCatalogDropdownOpen && (
                                                    <motion.div 
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        transition={{ duration: 0.3 }}
                                                        className="ml-4 mt-2 pl-4 border-l-2 border-yellow-50 flex flex-col gap-3 overflow-hidden"
                                                    >
                                                        {loading ? (
                                                            <p>Loading...</p>
                                                        ) : subLinks.length ? (
                                                            subLinks.map((subLink, i) => (
                                                                <Link
                                                                    to={`/catalog/${subLink.name
                                                                        .split(" ")
                                                                        .join("-")
                                                                        .toLowerCase()}`}
                                                                    className="py-2 pl-2 text-richblack-25 hover:text-yellow-25 transition-colors border-b border-richblack-700"
                                                                    key={i}
                                                                    onClick={() => {
                                                                        setMobileMenuOpen(false);
                                                                        setMobileCatalogDropdownOpen(false);
                                                                    }}
                                                                >
                                                                    {subLink.name}
                                                                </Link>
                                                            ))
                                                        ) : (
                                                            <p>No Courses Found</p>
                                                        )}
                                                    </motion.div>
                                                )}
                                            </div>
                                        ) : (
                                            <Link 
                                                to={link?.path}
                                                className="block py-3 text-lg text-richblack-25 hover:text-yellow-25 transition-colors"
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                <p className={`${matchRoute(link?.path) ? "text-yellow-25 font-medium" : ""} flex items-center`}>
                                                    <span className="w-2 h-2 bg-yellow-50 rounded-full mr-3"></span>
                                                    {link.title}
                                                </p>
                                            </Link>
                                        )}
                                    </motion.li>
                                ))}
                            </ul>
                            
                            <div className="flex flex-col gap-4 pt-4 mt-2 border-t border-richblack-700">
                                {token === null ? (
                                    <>
                                        <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                                            <motion.button
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                className="w-full rounded-xl bg-gradient-to-r from-richblack-700 to-richblack-800 py-3 text-richblack-5 font-medium hover:from-richblack-600 hover:to-richblack-700 transition-all duration-200"
                                            >
                                                Log in
                                            </motion.button>
                                        </Link>
                                        <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                                            <motion.button
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                className="w-full rounded-xl bg-gradient-to-r from-yellow-50 to-yellow-100 py-3 text-richblack-900 font-medium hover:from-yellow-100 hover:to-yellow-200 transition-all duration-200"
                                            >
                                                Sign up
                                            </motion.button>
                                        </Link>
                                    </>
                                ) : (
                                    <div className="flex flex-col gap-4 pt-4 mt-2 border-t border-richblack-700">
                                        {token && user && (
                                            <motion.div 
                                                className="flex items-center gap-4 mb-3 p-3 rounded-xl bg-gradient-to-r from-indigo-900/70 to-purple-900/70"
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.2 }}
                                            >
                                                <motion.div
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    className="relative"
                                                >
                                                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-full blur-sm opacity-70 animate-pulse"></div>
                                                    <img 
                                                        src={user.image} 
                                                        alt="Profile" 
                                                        className="h-16 w-16 rounded-full object-cover border-4 border-white relative z-10"
                                                    />
                                                </motion.div>
                                                
                                                <div className="flex-1">
                                                    <p className="text-lg font-bold text-white">
                                                        {user.firstName} {user?.lastName}
                                                    </p>
                                                    <p className="text-xs text-richblack-100 truncate max-w-[160px]">
                                                        {user.email}
                                                    </p>
                                                </div>
                                            </motion.div>
                                        )}

                                        <div className="grid grid-cols-1 gap-3">
                                            <motion.div
                                                whileHover={{ scale: 1.03 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                <Link 
                                                    to="/dashboard/my-profile" 
                                                    className="block w-full rounded-xl py-3 text-center font-medium transition-all duration-300 relative overflow-hidden"
                                                    onClick={() => setMobileMenuOpen(false)}
                                                >
                                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-700 z-0"></div>
                                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 opacity-0 hover:opacity-100 transition-opacity duration-300 z-10"></div>
                                                    <span className="relative z-20 text-white flex items-center justify-center gap-2">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                                                        </svg>
                                                        Dashboard
                                                    </span>
                                                </Link>
                                            </motion.div>
                                            
                                            <motion.div
                                                whileHover={{ scale: 1.03 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                <button 
                                                    className="block w-full rounded-xl py-3 text-center font-medium transition-all duration-300 relative overflow-hidden"
                                                    onClick={handleLogout} // Use logout handler
                                                >
                                                    <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-rose-700 z-0"></div>
                                                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-rose-600 opacity-0 hover:opacity-100 transition-opacity duration-300 z-10"></div>
                                                    <span className="relative z-20 text-white flex items-center justify-center gap-2">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                                                        </svg>
                                                        Logout
                                                    </span>
                                                </button>
                                            </motion.div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

export default Navbar;
