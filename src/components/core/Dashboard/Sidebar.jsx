// // import React, { useState } from 'react'
// // import { useDispatch, useSelector } from 'react-redux'

// // import {sidebarLinks} from "../../../data/dashboard-links"
// // import SidebarLink from './SidebarLink'
// // import { logout } from '../../../services/operations/authAPI'
// // import { useNavigate } from 'react-router-dom'
// // import { VscSignOut } from 'react-icons/vsc'
// // import ConfirmationModal from '../../common/ConfirmationModal'

// // const Sidebar = () => {

// //     const {user , loading: profileLoading} = useSelector((state) => state.profile)
// //     const { loading:authLoading} = useSelector((state) => state.auth)

// //     const dispatch = useDispatch();
// //     const navigate =useNavigate();

// //     const [confirmationModal , setconfirmationModal] = useState(null);


// //     if( profileLoading || authLoading){
// //         return(
// //             <div className='grid h-[calc(100vh-3.5rem)] min-w-[220px] items-center border-r-[1px] border-r-richblack-700 bg-richblue-800'>
// //                 <div className='spinner'></div>
// //             </div>
// //         )
// //     }


// //   return (
// //     <>
// //     <div className='flex h-[calc(100vh-3.5rem)] min-w-[220px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 py-10'>
      
// //       <div className='flex flex-col '>

// //         {
// //             sidebarLinks.map((link) => {
// //                 if(link.type && user?.accountType !== link.type) return null;
                
// //                 return(
// //                     <SidebarLink
// //                     key={link.id}
// //                     link={link}
// //                     iconName={link.icon}
// //                     />
// //                 )
            
// //             })
// //         }

// //       </div>

// //       <div className='mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-700' />

// //         <div className='flex flex-col'>
// //             <SidebarLink
// //                 link={{name: "Settings" , path: "/dashboard/settings"}}
// //                 iconName="VscSettingsGear"
// //             />
// //             <button
// //                 onClick={() => {
// //                     setconfirmationModal({
// //                         text1: "Are you sure?",
// //                         text2: "You will be logged out of your account.",
// //                         btn1Text: "Logout",
// //                         btn2Text: "Cancel",
// //                         btn1Handler : () => dispatch(logout(navigate)),
// //                         btn2Handler : () => setconfirmationModal(null)
// //                     })
// //                 }}
// //                 className='px-8 py-2 text-sm font-medium text-richblack-300'
// //             >
// //                 <div className='flex items-center gap-x-2'>
// //                     <VscSignOut className='text-lg'/>
// //                     <span>Logout</span>

// //                 </div>

// //             </button>
// //         </div>
// //     </div>
// //     {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
// //     </>
// //   )
// // }

// // export default Sidebar

// import React, { useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { sidebarLinks } from "../../../data/dashboard-links"
// import { logout } from '../../../services/operations/authAPI'
// import { useNavigate } from 'react-router-dom'
// import { VscSignOut, VscChromeClose } from 'react-icons/vsc'
// import ConfirmationModal from '../../common/ConfirmationModal'
// import { motion, AnimatePresence } from 'framer-motion'
// import { HiMenuAlt3 } from 'react-icons/hi'
// import { FaUserCircle } from 'react-icons/fa'

// const Sidebar = () => {
//     const { user } = useSelector((state) => state.profile)
//     const { loading: authLoading } = useSelector((state) => state.auth)
//     const dispatch = useDispatch()
//     const navigate = useNavigate()
//     const [confirmationModal, setConfirmationModal] = useState(null)
//     const [sidebarOpen, setSidebarOpen] = useState(false)
//     const [activeLink, setActiveLink] = useState(null)

//     const toggleSidebar = () => {
//         setSidebarOpen(!sidebarOpen)
//     }

//     const handleLinkClick = (link) => {
//         setActiveLink(link.id)
//         navigate(link.path)
//         setSidebarOpen(false)
//     }

//     const handleLogout = () => {
//         setConfirmationModal({
//             text1: "Are you sure?",
//             text2: "You will be logged out of your account.",
//             btn1Text: "Logout",
//             btn2Text: "Cancel",
//             btn1Handler: () => dispatch(logout(navigate)),
//             btn2Handler: () => setConfirmationModal(null)
//         })
//     }

//     if (authLoading) {
//         return (
//             <div className="fixed top-0 left-0 right-0 h-16 bg-richblack-800 flex items-center justify-between px-4 z-50">
//                 <div className="w-8 h-8 rounded-full bg-richblack-700 animate-pulse"></div>
//                 <div className="text-xl font-bold text-transparent bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text">
//                     StudyNotion
//                 </div>
//                 <div className="w-8 h-8 rounded-full bg-richblack-700 animate-pulse"></div>
//             </div>
//         )
//     }

//     return (
//         <>
//             {/* Mobile Navbar */}
//             <motion.div 
//                 className="fixed top-0 left-0 right-0 h-16 bg-richblack-800 border-b border-richblack-700 flex items-center justify-between px-4 z-50 shadow-lg"
//                 initial={{ y: -100 }}
//                 animate={{ y: 0 }}
//                 transition={{ type: "spring", stiffness: 120 }}
//             >
//                 <motion.button
//                     whileHover={{ scale: 1.1 }}
//                     whileTap={{ scale: 0.9 }}
//                     onClick={toggleSidebar}
//                     className="text-richblack-100 p-2 rounded-lg bg-richblack-700"
//                 >
//                     <HiMenuAlt3 className="text-2xl" />
//                 </motion.button>
                
//                 <motion.div 
//                     className="text-xl font-bold text-transparent bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text"
//                     whileHover={{ scale: 1.05 }}
//                 >
//                     StudyNotion
//                 </motion.div>
                
//                 <div className="relative">
//                     {user?.image ? (
//                         <motion.img
//                             src={user.image}
//                             alt="Profile"
//                             className="h-10 w-10 rounded-full object-cover border-2 border-yellow-50 shadow-md"
//                             whileHover={{ scale: 1.1 }}
//                             whileTap={{ scale: 0.9 }}
//                         />
//                     ) : (
//                         <motion.div
//                             className="h-10 w-10 rounded-full bg-richblack-700 flex items-center justify-center border-2 border-yellow-50"
//                             whileHover={{ scale: 1.1 }}
//                             whileTap={{ scale: 0.9 }}
//                         >
//                             <FaUserCircle className="text-2xl text-yellow-50" />
//                         </motion.div>
//                     )}
//                 </div>
//             </motion.div>

//             {/* Sidebar Overlay */}
//             <AnimatePresence>
//                 {sidebarOpen && (
//                     <motion.div
//                         className="fixed inset-0 bg-black bg-opacity-70 z-40"
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         exit={{ opacity: 0 }}
//                         onClick={() => setSidebarOpen(false)}
//                     />
//                 )}
//             </AnimatePresence>

//             {/* Sidebar */}
//             <AnimatePresence>
//                 {sidebarOpen && (
//                     <motion.div
//                         className="fixed top-0 left-0 h-full w-4/5 max-w-xs bg-gradient-to-b from-richblack-800 to-richblack-900 z-50 shadow-2xl overflow-y-auto"
//                         initial={{ x: -400 }}
//                         animate={{ x: 0 }}
//                         exit={{ x: -400 }}
//                         transition={{ type: "spring", damping: 25 }}
//                     >
//                         <div className="flex flex-col h-full">
//                             {/* Header */}
//                             <div className="p-4 flex items-center justify-between border-b border-richblack-700">
//                                 <div className="flex items-center gap-3">
//                                     {user?.image ? (
//                                         <img
//                                             src={user.image}
//                                             alt="Profile"
//                                             className="h-12 w-12 rounded-full object-cover border-2 border-yellow-50 shadow-md"
//                                         />
//                                     ) : (
//                                         <div className="h-12 w-12 rounded-full bg-richblack-700 flex items-center justify-center border-2 border-yellow-50">
//                                             <FaUserCircle className="text-3xl text-yellow-50" />
//                                         </div>
//                                     )}
//                                     <div>
//                                         <p className="font-bold text-richblack-5">
//                                             {user?.firstName} {user?.lastName}
//                                         </p>
//                                         <p className="text-xs text-richblack-200">
//                                             {user?.accountType}
//                                         </p>
//                                     </div>
//                                 </div>
//                                 <motion.button
//                                     whileHover={{ rotate: 90, scale: 1.1 }}
//                                     whileTap={{ scale: 0.9 }}
//                                     onClick={() => setSidebarOpen(false)}
//                                     className="text-richblack-100 p-2 rounded-full bg-richblack-700"
//                                 >
//                                     <VscChromeClose className="text-xl" />
//                                 </motion.button>
//                             </div>

//                             {/* Navigation Links */}
//                             <div className="flex-1 py-6 px-4">
//                                 <div className="flex flex-col gap-2">
//                                     {sidebarLinks.map((link) => {
//                                         if (link.type && user?.accountType !== link.type) return null
                                        
//                                         return (
//                                             <motion.button
//                                                 key={link.id}
//                                                 className={`flex items-center gap-3 px-4 py-3 rounded-xl text-richblack-100 transition-all duration-300 ${
//                                                     activeLink === link.id 
//                                                         ? "bg-gradient-to-r from-blue-600/30 to-purple-600/30 border-l-4 border-yellow-50" 
//                                                         : "hover:bg-richblack-700"
//                                                 }`}
//                                                 whileHover={{ x: 5 }}
//                                                 whileTap={{ scale: 0.97 }}
//                                                 onClick={() => handleLinkClick(link)}
//                                             >
//                                                 <span className="text-xl">{link.icon}</span>
//                                                 <span className="font-medium">{link.name}</span>
//                                             </motion.button>
//                                         )
//                                     })}
//                                 </div>

//                                 <div className="mt-8 border-t border-richblack-700 pt-6">
//                                     <motion.button
//                                         className={`flex items-center gap-3 px-4 py-3 rounded-xl text-richblack-100 transition-all duration-300 hover:bg-richblack-700 w-full`}
//                                         whileHover={{ x: 5 }}
//                                         whileTap={{ scale: 0.97 }}
//                                         onClick={() => handleLinkClick({ path: "/dashboard/settings", id: "settings" })}
//                                     >
//                                         <span className="text-xl">⚙️</span>
//                                         <span className="font-medium">Settings</span>
//                                     </motion.button>

//                                     <motion.button
//                                         className="flex items-center gap-3 px-4 py-3 rounded-xl text-richblack-100 transition-all duration-300 hover:bg-richblack-700 w-full mt-2"
//                                         whileHover={{ x: 5 }}
//                                         whileTap={{ scale: 0.97 }}
//                                         onClick={handleLogout}
//                                     >
//                                         <VscSignOut className="text-xl" />
//                                         <span className="font-medium">Logout</span>
//                                     </motion.button>
//                                 </div>
//                             </div>

//                             {/* Footer */}
//                             <div className="p-4 border-t border-richblack-700 text-center">
//                                 <p className="text-xs text-richblack-400">
//                                     © {new Date().getFullYear()} StudyNotion. All rights reserved.
//                                 </p>
//                             </div>
//                         </div>
//                     </motion.div>
//                 )}
//             </AnimatePresence>

//             {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
//         </>
//     )
// }

// export default Sidebar


import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sidebarLinks } from "../../../data/dashboard-links";
import SidebarLink from './SidebarLink';
import { logout } from '../../../services/operations/authAPI';
import { useNavigate } from 'react-router-dom';
import { VscSignOut } from 'react-icons/vsc';
import ConfirmationModal from '../../common/ConfirmationModal';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3 } from 'react-icons/hi';
import { FaUserCircle } from 'react-icons/fa';

const Sidebar = () => {
    const { user, loading: profileLoading } = useSelector((state) => state.profile);
    const { loading: authLoading } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [confirmationModal, setConfirmationModal] = useState(null);
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    // Track window size
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            if (window.innerWidth > 768) {
                setMobileSidebarOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (profileLoading || authLoading) {
        return (
            <div className='grid h-[calc(100vh-3.5rem)] min-w-[220px] items-center border-r-[1px] border-r-richblack-700 bg-richblue-800'>
                <div className='spinner'></div>
            </div>
        );
    }

    // Mobile navigation toggle
    const MobileNavbar = () => (
        <motion.div 
            className="md:hidden fixed top-0 left-0 right-0 h-16 bg-richblack-900  flex items-center justify-between px-4 z-50 shadow-lg w-[88%]"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 120 }}
        >
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setMobileSidebarOpen(true)}
                className="text-richblack-100 p-2 rounded-lg bg-richblack-700"
            >
                <HiMenuAlt3 className="text-2xl" />
            </motion.button>
            
            <motion.div 
                className="text-xl font-bold text-transparent bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text"
                whileHover={{ scale: 1.05 }}
            >
                StudyNotion
            </motion.div>
            
            <div className="relative">
                {/* {user?.image ? (
                    <img
                        src={user.image}
                        alt="Profile"
                        className="h-10 w-10 rounded-full object-cover border-2 border-yellow-50 shadow-md"
                    />
                ) : (
                    <FaUserCircle className="h-10 w-10 text-yellow-50" />
                )} */}
            </div>

            
        </motion.div>
    );

    // Mobile sidebar
    const MobileSidebar = () => (
        <AnimatePresence>
            {mobileSidebarOpen && (
                <>
                    <motion.div
                        className="fixed inset-0 bg-black bg-opacity-70 z-40 md:hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setMobileSidebarOpen(false)}
                    />
                    
                    <motion.div
                        className="fixed top-0 left-0 h-full w-4/5 max-w-xs bg-gradient-to-b from-richblack-800 to-richblack-900 z-50 shadow-2xl overflow-y-auto md:hidden"
                        initial={{ x: -400 }}
                        animate={{ x: 0 }}
                        exit={{ x: -400 }}
                        transition={{ type: "spring", damping: 25 }}
                    >
                        <div className="flex flex-col h-full p-4">
                            <div className="flex justify-end mb-6">
                                <motion.button
                                    whileHover={{ rotate: 90, scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => setMobileSidebarOpen(false)}
                                    className="text-richblack-100 p-2 rounded-full bg-richblack-700"
                                >
                                    <VscSignOut className="text-xl" />
                                </motion.button>
                            </div>
                            
                            <div className="flex items-center gap-3 mb-8 p-3 rounded-xl bg-gradient-to-r from-indigo-900/30 to-purple-900/30">
                                {user?.image ? (
                                    <img
                                        src={user.image}
                                        alt="Profile"
                                        className="h-14 w-14 rounded-full object-cover border-2 border-yellow-50 shadow-md"
                                    />
                                ) : (
                                    <FaUserCircle className="h-14 w-14 text-yellow-50" />
                                )}
                                <div>
                                    <p className="font-bold text-richblack-5">
                                        {user?.firstName} {user?.lastName}
                                    </p>
                                    <p className="text-xs text-richblack-200">
                                        {user?.accountType}
                                    </p>
                                </div>
                            </div>
                            
                            <div className="flex flex-col gap-1">
                                {sidebarLinks.map((link) => {
                                    if (link.type && user?.accountType !== link.type) return null;
                                    
                                    return (
                                        <SidebarLink
                                            key={link.id}
                                            link={link}
                                            iconName={link.icon}
                                            mobile={true}
                                            onClick={() => setMobileSidebarOpen(false)}
                                        />
                                    );
                                })}
                            </div>
                            
                            <div className="mt-auto pt-6 border-t border-richblack-700">
                                <SidebarLink
                                    link={{name: "Settings", path: "/dashboard/settings"}}
                                    iconName="VscSettingsGear"
                                    mobile={true}
                                    onClick={() => setMobileSidebarOpen(false)}
                                />
                                
                                <button
                                    onClick={() => {
                                        setMobileSidebarOpen(false);
                                        setConfirmationModal({
                                            text1: "Are you sure?",
                                            text2: "You will be logged out of your account.",
                                            btn1Text: "Logout",
                                            btn2Text: "Cancel",
                                            btn1Handler: () => dispatch(logout(navigate)),
                                            btn2Handler: () => setConfirmationModal(null)
                                        });
                                    }}
                                    className='flex items-center gap-3 w-full px-4 py-3 rounded-lg text-richblack-100 hover:bg-richblack-700 transition-colors'
                                >
                                    <VscSignOut className='text-xl' />
                                    <span className="font-medium">Logout</span>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );

    return (
        <>
            {/* Mobile navbar (only shows on small screens) */}
            {windowWidth < 768 && <MobileNavbar />}
            
            {/* Mobile sidebar overlay */}
            {windowWidth < 768 && <MobileSidebar />}
            
            {/* Regular desktop sidebar (shows on medium screens and above) */}
            <div className={`hidden md:flex h-[calc(100vh-3.5rem)] min-w-[220px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 py-10 ${
                mobileSidebarOpen ? 'ml-[-220px]' : ''
            }`}>
                <div className='flex flex-col '>
                    {sidebarLinks.map((link) => {
                        if (link.type && user?.accountType !== link.type) return null;
                        return (
                            <SidebarLink
                                key={link.id}
                                link={link}
                                iconName={link.icon}
                            />
                        );
                    })}
                </div>

                <div className='mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-700' />

                <div className='flex flex-col'>
                    <SidebarLink
                        link={{name: "Settings", path: "/dashboard/settings"}}
                        iconName="VscSettingsGear"
                    />
                    <button
                        onClick={() => {
                            setConfirmationModal({
                                text1: "Are you sure?",
                                text2: "You will be logged out of your account.",
                                btn1Text: "Logout",
                                btn2Text: "Cancel",
                                btn1Handler: () => dispatch(logout(navigate)),
                                btn2Handler: () => setConfirmationModal(null)
                            });
                        }}
                        className='flex items-center gap-3 px-4 py-3 text-sm font-medium text-richblack-300 hover:bg-richblack-700 transition-colors'
                    >
                        <VscSignOut className='text-lg' />
                        <span>Logout</span>
                    </button>
                </div>
            </div>
            
            {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
        </>
    );
};

export default Sidebar;     