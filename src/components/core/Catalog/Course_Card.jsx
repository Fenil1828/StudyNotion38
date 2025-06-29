// // import React, { useEffect, useState } from 'react'
// // import GetAvgRating from '../../../utils/avgRating'
// // import { Link } from 'react-router-dom'
// // import RatingStars from '../../common/RatingStars'

// // const Course_Card = ({
// //     course, Height
// // }) => {

// //     const [avgReviewCount , setAvgReviewCount ] = useState(0)

// //     useEffect(() => {
// //         const count = GetAvgRating(course.ratingAndReviews)
// //         setAvgReviewCount(count)
// //     } , [course])
    

// //     console.log("corse id is " , course._id)

// //   return (
// //     <>
// //       <Link to={`/courses/${course._id}`}>
// //         <div className=''>
// //             <div className='rounded-lg'>
// //                 <img src={course?.thumbnail} 
// //                 alt="course thumbnail"
// //                  className={`${Height} w-full rounded-xl object-cover`}
// //                 />
// //             </div>

// //             <div className='flex flex-col gap-2 px-1 py-3'>

// //                 <p className='text-xl text-richblack-5'>{course?.courseName}</p>
// //                 <p className='text-sm text-richblack-50'>
// //                     {course?.instructor?.firstName} {course?.instructor?.lastName}
// //                 </p>

// //                 <div className='flex items-center gap-2'>
// //                     <span className='text-yellow-5'> {avgReviewCount || 0}
// //                          </span>
// //                     <RatingStars Review_Count={avgReviewCount}  />
                   
// //                    <span className='text-richblack-400'>
// //                         {course?.ratingAndReviews?.length} Ratings
// //                    </span>
// //                 </div>
// //                 <p className='text-xl text-richblack-5'>Rs. {course?.price}</p>
// //             </div>
// //         </div>
// //       </Link>
// //     </>
// //   )
// // }

// // export default Course_Card


// // Course_Card.jsx
// import React, { useEffect, useState } from 'react'
// import GetAvgRating from '../../../utils/avgRating'
// import { Link } from 'react-router-dom'
// import RatingStars from '../../common/RatingStars'

// const Course_Card = ({ course, Height }) => {
//   const [avgReviewCount, setAvgReviewCount] = useState(0)
//   const [hovered, setHovered] = useState(false)

//   useEffect(() => {
//     const count = GetAvgRating(course.ratingAndReviews)
//     setAvgReviewCount(count)
//   }, [course])

//   return (
//     <div className="relative group">
//       <div className="relative overflow-hidden rounded-xl transition-all duration-300 shadow-lg group-hover:shadow-2xl">
//         <Link to={`/courses/${course._id}`}>
//           <div className="relative">
//             <img 
//               src={course?.thumbnail} 
//               alt="course thumbnail"
//               className={`${Height} w-full object-cover transition-transform duration-500 group-hover:scale-105`}
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-richblack-900 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
//           </div>
          
//           <div className={`absolute bottom-0 left-0 right-0 p-4 transition-all duration-300 ${hovered ? 'translate-y-0' : 'translate-y-10'} opacity-0 group-hover:opacity-100 group-hover:translate-y-0`}>
//             <button className="w-full py-2 px-4 bg-yellow-50 text-richblack-900 font-bold rounded-md hover:bg-yellow-100 transition-colors duration-200 shadow-lg transform hover:-translate-y-1 active:translate-y-0">
//               Buy Now
//             </button>
//           </div>
//         </Link>
//       </div>

//       <div className='flex flex-col gap-2 px-1 py-3'>
//         <p className='text-xl text-richblack-5 font-bold group-hover:text-yellow-50 transition-colors duration-200'>
//           {course?.courseName}
//         </p>
//         <p className='text-sm text-richblack-200'>
//           {course?.instructor?.firstName} {course?.instructor?.lastName}
//         </p>

//         <div className='flex items-center gap-2'>
//           <span className='text-yellow-50 font-medium'>{avgReviewCount || 0}</span>
//           <RatingStars Review_Count={avgReviewCount} />
//           <span className='text-richblack-300 text-sm'>
//             ({course?.ratingAndReviews?.length} ratings)
//           </span>
//         </div>
        
//         <div className="flex justify-between items-center mt-1">
//           <p className='text-xl text-yellow-50 font-bold'>₹{course?.price}</p>
//           {course.discount && (
//             <span className="text-richblack-300 line-through text-sm">
//               ₹{Math.round(course.price * (1 + course.discount/100))}
//             </span>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Course_Card








// import React, { useEffect, useState } from 'react'
// import GetAvgRating from '../../../utils/avgRating'
// import { Link } from 'react-router-dom'
// import RatingStars from '../../common/RatingStars'

// const Course_Card = ({ course, Height }) => {
//   const [avgReviewCount, setAvgReviewCount] = useState(0)
//   const [isHovered, setIsHovered] = useState(false)

//   useEffect(() => {
//     const count = GetAvgRating(course.ratingAndReviews)
//     setAvgReviewCount(count)
//   }, [course])

//   return (
//     <div 
//       className="group h-full flex flex-col bg-richblack-800 rounded-2xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-2xl hover:shadow-yellow-25/10 border border-richblack-700 hover:border-yellow-25/30 transform hover:scale-[1.02] will-change-transform"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       {/* Image Container */}
//       <div className="relative overflow-hidden">
//         <Link to={`/courses/${course._id}`}>
//           <div className="relative">
//             <img
//               src={course?.thumbnail}
//               alt={course?.courseName || "Course thumbnail"}
//               className={`${Height} w-full object-cover transition-all duration-700 group-hover:scale-110`}
//               loading="lazy"
//             />
            
//             {/* Overlay Gradients */}
//             <div className="absolute inset-0 bg-gradient-to-t from-richblack-900/90 via-richblack-900/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
//             <div className="absolute inset-0 bg-gradient-to-br from-yellow-25/0 via-transparent to-blue-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
//             {/* Floating Badge */}
//             <div className="absolute top-4 right-4 bg-yellow-25 text-richblack-900 px-3 py-1 rounded-full text-xs font-bold shadow-lg transform translate-x-full group-hover:translate-x-0 transition-transform duration-500 delay-100">
//               ⭐ Popular
//             </div>
            
//             {/* Animated Play Button */}
//             <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
//               <div className="w-16 h-16 bg-yellow-25/90 backdrop-blur-sm rounded-full flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-500 delay-200 shadow-2xl">
//                 <svg className="w-6 h-6 text-richblack-900 ml-1" fill="currentColor" viewBox="0 0 24 24">
//                   <path d="M8 5v14l11-7z"/>
//                 </svg>
//               </div>
//             </div>
            
//             {/* Quick Preview Button */}
//             <div className={`absolute bottom-4 left-4 right-4 transition-all duration-500 ${
//               isHovered ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
//             }`}>
//               <button className="w-full py-3 px-4 bg-gradient-to-r from-yellow-25 to-yellow-50 text-richblack-900 font-bold rounded-xl hover:from-yellow-50 hover:to-yellow-25 transition-all duration-300 shadow-xl transform hover:-translate-y-1 active:translate-y-0 backdrop-blur-sm border border-yellow-100/50">
//                 <span className="flex items-center justify-center gap-2">
//                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                   </svg>
//                   Quick Preview
//                 </span>
//               </button>
//             </div>
//           </div>
//         </Link>
//       </div>

//       {/* Content Section */}
//       <div className='flex flex-col flex-grow p-5 space-y-4'>
//         {/* Course Title */}
//         <Link to={`/courses/${course._id}`}>
//           <h3 className='text-lg md:text-xl font-bold text-richblack-5 group-hover:text-yellow-25 transition-colors duration-300 line-clamp-2 leading-tight'>
//             {course?.courseName}
//           </h3>
//         </Link>
        
//         {/* Instructor */}
//         <div className="flex items-center gap-2">
//           <div className="w-8 h-8 bg-gradient-to-br from-yellow-25 to-yellow-50 rounded-full flex items-center justify-center">
//             <span className="text-richblack-900 font-bold text-sm">
//               {course?.instructor?.firstName?.charAt(0)}
//             </span>
//           </div>
//           <p className='text-sm text-richblack-300 font-medium'>
//             {course?.instructor?.firstName} {course?.instructor?.lastName}
//           </p>
//         </div>

//         {/* Rating Section */}
//         <div className='flex items-center gap-3'>
//           <div className="flex items-center gap-1">
//             <span className='text-yellow-25 font-bold text-lg'>{avgReviewCount || 0}</span>
//             <RatingStars Review_Count={avgReviewCount} />
//           </div>
//           <span className='text-richblack-400 text-sm'>
//             ({course?.ratingAndReviews?.length || 0} reviews)
//           </span>
//         </div>

//         {/* Course Stats */}
//         <div className="flex items-center gap-4 text-xs text-richblack-400">
//           <div className="flex items-center gap-1">
//             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//             </svg>
//             <span>12h 30m</span>
//           </div>
//           <div className="flex items-center gap-1">
//             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//             </svg>
//             <span>24 lessons</span>
//           </div>
//           <div className="flex items-center gap-1">
//             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//             </svg>
//             <span>2.5k students</span>
//           </div>
//         </div>

//         {/* Price Section */}
//         <div className="flex justify-between items-center mt-auto pt-4 border-t border-richblack-700">
//           <div className="flex items-center gap-3">
//             <p className='text-2xl font-bold bg-gradient-to-r from-yellow-25 to-yellow-50 bg-clip-text text-transparent'>
//               ₹{course?.price}
//             </p>
//             {course.discount && (
//               <span className="text-richblack-400 line-through text-sm">
//                 ₹{Math.round(course.price * (1 + course.discount/100))}
//               </span>
//             )}
//           </div>
          
//           {/* Add to Cart Button */}
//           <button className="group/btn bg-gradient-to-r from-richblack-700 to-richblack-600 hover:from-yellow-25 hover:to-yellow-50 text-richblack-100 hover:text-richblack-900 px-4 py-2 rounded-lg transition-all duration-300 font-medium text-sm shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0">
//             <span className="flex items-center gap-2">
//               <svg className="w-4 h-4 transition-transform duration-300 group-hover/btn:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293c-.195.195-.195.512 0 .707L7 18M17 8v13a2 2 0 01-2 2H9a2 2 0 01-2-2V8m8 0V6a2 2 0 00-2-2H9a2 2 0 00-2 2v2m8 0H7" />
//               </svg>
//               Add
//             </span>
//           </button>
//         </div>

//         {/* Course Level Badge */}
//         <div className="absolute top-4 left-4 bg-richblack-800/90 backdrop-blur-sm text-yellow-25 px-3 py-1 rounded-full text-xs font-medium border border-richblack-600">
//           Beginner
//         </div>
//       </div>

//       {/* Hover Effects */}
//       <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-yellow-25/5 via-transparent to-blue-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      
//       {/* Animated Border */}
//       <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-yellow-25/20 via-transparent to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" 
//            style={{
//              background: 'linear-gradient(45deg, transparent 30%, rgba(251, 191, 32, 0.1) 50%, transparent 70%)',
//              animation: isHovered ? 'shimmer 2s ease-in-out infinite' : 'none'
//            }}>
//       </div>

//       <style jsx>{`
//         @keyframes shimmer {
//           0% { transform: translateX(-100%) rotate(45deg); }
//           100% { transform: translateX(100%) rotate(45deg); }
//         }
        
//         .line-clamp-2 {
//           display: -webkit-box;
//           -webkit-line-clamp: 2;
//           -webkit-box-orient: vertical;
//           overflow: hidden;
//         }
//       `}</style>
//     </div>
//   )
// }

// export default Course_Card

import React, { useEffect, useState } from 'react';
import GetAvgRating from '../../../utils/avgRating';
import { Link } from 'react-router-dom';
import RatingStars from '../../common/RatingStars';
import { useDispatch, useSelector } from 'react-redux';
// import { addToCart } from '../../../services/operations/studentFeaturesAPI';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../../../slices/cartSlice';

const Course_Card = ({ course, Height }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const [avgReviewCount, setAvgReviewCount] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [courseStats, setCourseStats] = useState({
    totalDuration: 0,
    totalLessons: 0,
    totalStudents: 0
  });

  useEffect(() => {
    const count = GetAvgRating(course.ratingAndReviews);
    setAvgReviewCount(count);
    
    // Calculate course stats
    if (course.courseContent) {
      let duration = 0;
      let lessons = 0;
      
      course.courseContent.forEach((section) => {
        if (section.subSection) {
          lessons += section.subSection.length;
          section.subSection.forEach((sub) => {
            duration += parseInt(sub.timeDuration || 0);
          });
        }
      });
      
      setCourseStats({
        totalDuration: duration,
        totalLessons: lessons,
        totalStudents: course.studentsEnrolled?.length || 0
      });
    }
  }, [course]);

  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  const formatStudentCount = (count) => {
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'k';
    }
    return count;
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    e.preventDefault();
    
    if (loading) return;
    
    setLoading(true);
    
    if (token) {
      dispatch(addToCart(course, navigate));
    } else {
      navigate("/login");
    }
    
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <div 
      className="group h-full flex flex-col bg-richblack-800 rounded-2xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-2xl hover:shadow-yellow-25/10 border border-richblack-700 hover:border-yellow-25/30 transform hover:scale-[1.02] will-change-transform"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <Link to={`/courses/${course._id}`}>
          <div className="relative">
            <img
              src={course?.thumbnail}
              alt={course?.courseName || "Course thumbnail"}
              className={`${Height} w-full object-cover transition-all duration-700 group-hover:scale-110`}
              loading="lazy"
            />
            
            {/* Overlay Gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-richblack-900/90 via-richblack-900/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-25/0 via-transparent to-blue-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Floating Badge */}
            {course.tag && (
              <div className="absolute top-4 right-4 bg-yellow-25 text-richblack-900 px-3 py-1 rounded-full text-xs font-bold shadow-lg transform translate-x-full group-hover:translate-x-0 transition-transform duration-500 delay-100">
                {course.tag}
              </div>
            )}
            
            {/* Animated Play Button */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
              <div className="w-16 h-16 bg-yellow-25/90 backdrop-blur-sm rounded-full flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-500 delay-200 shadow-2xl">
                <svg className="w-6 h-6 text-richblack-900 ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
            
            {/* Quick Preview Button */}
            <div className={`absolute bottom-4 left-4 right-4 transition-all duration-500 ${
              isHovered ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              <Link to={`/courses/${course._id}`} className="w-full block">
                <button className="w-full py-3 px-4 bg-gradient-to-r from-yellow-25 to-yellow-50 text-richblack-900 font-bold rounded-xl hover:from-yellow-50 hover:to-yellow-25 transition-all duration-300 shadow-xl transform hover:-translate-y-1 active:translate-y-0 backdrop-blur-sm border border-yellow-100/50">
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    Quick Preview
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </Link>
      </div>

      {/* Content Section */}
      <div className='flex flex-col flex-grow p-5 space-y-4'>
        {/* Course Title */}
        <Link to={`/courses/${course._id}`}>
          <h3 className='text-lg md:text-xl font-bold text-richblack-5 group-hover:text-yellow-25 transition-colors duration-300 line-clamp-2 leading-tight'>
            {course?.courseName}
          </h3>
        </Link>
        
        {/* Instructor */}
        {/* <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-yellow-25 to-yellow-50 rounded-full flex items-center justify-center">
            <span className="text-richblack-900 font-bold text-sm">
              {course?.instructor?.firstName?.charAt(0) || "I"}
            </span>
          </div>
          <p className='text-sm text-richblack-300 font-medium'>
            {course?.instructor?.firstName} {course?.instructor?.lastName}
          </p>
        </div> */}

        {/* Price Section */}
        <div className="flex justify-between items-center mt-auto pt-4 border-t border-richblack-700">
          <div className="flex items-center gap-3">
            <p className='text-2xl font-bold bg-gradient-to-r from-yellow-25 to-yellow-50 bg-clip-text text-transparent'>
              ₹{course?.price}
            </p>
            {course.discount && (
              <span className="text-richblack-400 line-through text-sm">
                ₹{Math.round(course.price * (1 + course.discount/100))}
              </span>
            )}
          </div>
          
          {/* Add to Cart Button */}
          <button 
            onClick={handleAddToCart}
            disabled={loading}
            className={`group/btn bg-gradient-to-r from-richblack-700 to-richblack-600 hover:from-yellow-25 hover:to-yellow-50 text-richblack-100 hover:text-richblack-900 px-4 py-2 rounded-lg transition-all duration-300 font-medium text-sm shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 ${
              loading ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Adding...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 transition-transform duration-300 group-hover/btn:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293c-.195.195-.195.512 0 .707L7 18M17 8v13a2 2 0 01-2 2H9a2 2 0 01-2-2V8m8 0V6a2 2 0 00-2-2H9a2 2 0 00-2 2v2m8 0H7" />
                </svg>
                Add
              </span>
            )}
          </button>
        </div>

        {/* Course Level Badge */}
        <div className="absolute top-4 left-4 bg-richblack-800/90 backdrop-blur-sm text-yellow-25 px-3 py-1 rounded-full text-xs font-medium border border-richblack-600">
          {course?.level || "Beginner"}
        </div>
      </div>

      {/* Hover Effects */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-yellow-25/5 via-transparent to-blue-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      
      {/* Animated Border */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-yellow-25/20 via-transparent to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" 
           style={{
             background: 'linear-gradient(45deg, transparent 30%, rgba(251, 191, 32, 0.1) 50%, transparent 70%)',
             animation: isHovered ? 'shimmer 2s ease-in-out infinite' : 'none'
           }}>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%) rotate(45deg); }
          100% { transform: translateX(100%) rotate(45deg); }
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default Course_Card;