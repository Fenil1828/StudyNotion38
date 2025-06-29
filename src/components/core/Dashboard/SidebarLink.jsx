// import React from 'react'

// import * as Icons from "react-icons/vsc"
// import { useDispatch } from 'react-redux'
// import { Link, matchPath, NavLink, useLocation } from 'react-router-dom'
// import { resetCourseState } from '../../../slices/courseSlice'

// const SidebarLink = ({link , iconName}) => {

//     const Icon = Icons[iconName]
//     const location = useLocation()
//     const dispatch  = useDispatch()

//     const matchRoute = (route) => {
//         return matchPath({path:route} , location.pathname)
//     }

//   return (
//     <NavLink
//      to={link.path}
//      onClick={() => dispatch(resetCourseState())}
//      className={`relative px-8 py-2 text-sm font-medium ${matchRoute(link.path)
//         ? "bg-yellow-800 text-yellow-50"
//         : "bg-opacity-0 text-richblack-300"
//      } transition-all duration-200`}
//     >

//         <span className={`absolute left-0 top-0 h-full w-[0.15rem] bg-yellow-50
//             ${matchRoute(link.path) ? "opacity-100" : "opacity-0"}
//             `}>
//         </span>

//         <div className='flex items-center gap-x-2'>
//             <Icon className="text-lg" />
//             <span classNam>{link.name}</span>
//         </div>

//     </NavLink>
//   )
// }

// export default SidebarLink

import React from 'react';
import * as Icons from "react-icons/vsc";
import { useDispatch } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { resetCourseState } from '../../../slices/courseSlice';
import { motion } from 'framer-motion';

const SidebarLink = ({ link, iconName, mobile = false, onClick }) => {
    const Icon = Icons[iconName];
    const location = useLocation();
    const dispatch = useDispatch();

    const matchRoute = (route) => {
        return location.pathname === route || location.pathname.includes(route);
    };

    const isActive = matchRoute(link.path);

    return (
        <motion.div
            whileHover={{ x: mobile ? 0 : 5 }}
            whileTap={{ scale: 0.97 }}
            className={`w-full ${mobile ? 'mb-1' : ''}`}
        >
            <NavLink
                to={link.path}
                onClick={() => {
                    dispatch(resetCourseState());
                    if (onClick) onClick();
                }}
                className={`relative flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all duration-300 ${
                    isActive
                        ? "bg-gradient-to-r from-yellow-800/30 to-yellow-600/20 text-yellow-50"
                        : "text-richblack-300 hover:bg-richblack-700"
                } ${mobile ? 'rounded-lg' : ''}`}
            >
                {/* Animated active indicator */}
                {isActive && (
                    <motion.span
                        className={`absolute left-0 top-0 h-full w-[0.2rem] bg-yellow-50`}
                        initial={{ height: 0 }}
                        animate={{ height: "100%" }}
                        transition={{ duration: 0.3 }}
                    />
                )}

                <motion.div
                    animate={isActive ? { scale: 1.1 } : { scale: 1 }}
                    className="flex items-center gap-x-2"
                >
                    <Icon className={`text-lg ${isActive ? 'text-yellow-50' : 'text-richblack-300'}`} />
                    <span className={`${isActive ? 'font-semibold' : 'font-medium'}`}>
                        {link.name}
                    </span>
                </motion.div>

                {/* Hover effect */}
                {!isActive && (
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-yellow-800/10 to-yellow-600/5 opacity-0 hover:opacity-100 transition-opacity duration-300"
                        initial={{ width: 0 }}
                        whileHover={{ width: "100%" }}
                    />
                )}
            </NavLink>
        </motion.div>
    );
};

export default SidebarLink;