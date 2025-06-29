// // // // // // import React, { useEffect, useState } from 'react'
// // // // // // import { useSelector } from 'react-redux'
// // // // // // import { useNavigate } from 'react-router-dom'
// // // // // // import { fetchInstructorCourses } from '../../../services/operations/courseDetailsAPI'
// // // // // // import IconBtn from '../../common/IconBtn'
// // // // // // import { VscAdd } from 'react-icons/vsc'
// // // // // // import CoursesTable from './InstructorCourses/CoursesTable'

// // // // // // const MyCourses = () => {

// // // // // //   const {token} = useSelector((state) => state.auth)

// // // // // //   const navigate = useNavigate()

// // // // // //   const [courses, setCourses] = useState([])

// // // // // //   useEffect(() => {
// // // // // //     const fetchCourses = async () => {
// // // // // //       const result = await fetchInstructorCourses(token)

// // // // // //       if(result){
// // // // // //         setCourses(result)
// // // // // //       }
// // // // // //     }
// // // // // //     fetchCourses()
// // // // // //   }, [])

// // // // // //   return (
// // // // // //     <div>
// // // // // //       <div className='mb-14 flex items-center justify-between'>
// // // // // //         <h1 className='text-3xl font-medium text-richblack-5'>My Courses</h1>

// // // // // //         <IconBtn
// // // // // //          text="Add Course"
// // // // // //          onClick={() => navigate("/dashboard/add-course")}
// // // // // //         >
// // // // // //           <VscAdd />
// // // // // //         </IconBtn>
// // // // // //       </div>
// // // // // //       {courses && <CoursesTable courses={courses} setCourses={setCourses} />}
// // // // // //     </div>
// // // // // //   )
// // // // // // }

// // // // // // export default MyCourses

// // // // // import React, { useEffect, useState } from 'react'
// // // // // import { useSelector } from 'react-redux'
// // // // // import { useNavigate } from 'react-router-dom'
// // // // // import { fetchInstructorCourses } from '../../../services/operations/courseDetailsAPI'
// // // // // import IconBtn from '../../common/IconBtn'
// // // // // import { VscAdd } from 'react-icons/vsc'
// // // // // import { FiEdit, FiTrash2 } from 'react-icons/fi'
// // // // // import { FaClock, FaRupeeSign } from 'react-icons/fa'
// // // // // import { motion } from 'framer-motion'

// // // // // const MyCourses = () => {
// // // // //   const { token } = useSelector((state) => state.auth)
// // // // //   const navigate = useNavigate()
// // // // //   const [courses, setCourses] = useState([])
// // // // //   const [loading, setLoading] = useState(true)

// // // // //   useEffect(() => {
// // // // //     const fetchCourses = async () => {
// // // // //       setLoading(true)
// // // // //       try {
// // // // //         const result = await fetchInstructorCourses(token)
// // // // //         if (result) {
// // // // //           setCourses(result)
// // // // //         }
// // // // //       } catch (error) {
// // // // //         console.error("Error fetching courses:", error)
// // // // //       } finally {
// // // // //         setLoading(false)
// // // // //       }
// // // // //     }
// // // // //     fetchCourses()
// // // // //   }, [token])

// // // // //   // Function to format duration
// // // // //   const formatDuration = (seconds) => {
// // // // //     if (!seconds) return "0h 0m"
// // // // //     const hours = Math.floor(seconds / 3600)
// // // // //     const minutes = Math.floor((seconds % 3600) / 60)
// // // // //     return `${hours}h ${minutes}m`
// // // // //   }

// // // // //   // Function to handle course deletion
// // // // //   const handleDeleteCourse = (courseId) => {
// // // // //     // Implement your delete logic here
// // // // //     console.log("Deleting course:", courseId)
// // // // //     setCourses(courses.filter(course => course._id !== courseId))
// // // // //   }

// // // // //   return (
// // // // //     <div className="p-4 md:p-6">
// // // // //       <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4'>
// // // // //         <motion.h1 
// // // // //           initial={{ opacity: 0, y: -20 }}
// // // // //           animate={{ opacity: 1, y: 0 }}
// // // // //           className='text-2xl md:text-3xl font-bold text-richblack-5'
// // // // //         >
// // // // //           My Courses
// // // // //         </motion.h1>

// // // // //         <motion.div
// // // // //           whileHover={{ scale: 1.05 }}
// // // // //           whileTap={{ scale: 0.95 }}
// // // // //         >
// // // // //           <IconBtn
// // // // //             text="Create New Course"
// // // // //             onClick={() => navigate("/dashboard/add-course")}
// // // // //             customClasses="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700"
// // // // //           >
// // // // //             <VscAdd className="text-lg" />
// // // // //           </IconBtn>
// // // // //         </motion.div>
// // // // //       </div>

// // // // //       {loading ? (
// // // // //         <div className="flex justify-center items-center h-64">
// // // // //           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-50"></div>
// // // // //         </div>
// // // // //       ) : courses.length === 0 ? (
// // // // //         <div className="flex flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-richblack-800 to-richblack-900 p-8 py-16 text-center border border-richblack-700">
// // // // //           <div className="bg-richblack-700 rounded-full p-5 mb-6">
// // // // //             <VscAdd className="text-4xl text-yellow-50" />
// // // // //           </div>
// // // // //           <h2 className="text-2xl font-bold text-richblack-5 mb-3">
// // // // //             Create Your First Course
// // // // //           </h2>
// // // // //           <p className="text-richblack-200 max-w-md mb-8">
// // // // //             You haven't created any courses yet. Share your knowledge and start teaching today.
// // // // //           </p>
// // // // //           <IconBtn
// // // // //             text="Create Course"
// // // // //             onClick={() => navigate("/dashboard/add-course")}
// // // // //             customClasses="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700"
// // // // //           >
// // // // //             <VscAdd />
// // // // //           </IconBtn>
// // // // //         </div>
// // // // //       ) : (
// // // // //         <div className="overflow-hidden rounded-2xl border border-richblack-700 shadow-xl">
// // // // //           {/* Desktop Table */}
// // // // //           <div className="hidden md:block">
// // // // //             <div className="grid grid-cols-[3fr,1fr,1fr,1fr,120px] bg-gradient-to-r from-richblack-700 to-richblack-800 text-richblack-5 font-medium px-6 py-4">
// // // // //               <div>Course Name</div>
// // // // //               <div>Duration</div>
// // // // //               <div>Price</div>
// // // // //               <div>Students</div>
// // // // //               <div>Actions</div>
// // // // //             </div>
            
// // // // //             <div className="divide-y divide-richblack-700">
// // // // //               {courses.map((course, index) => (
// // // // //                 <motion.div
// // // // //                   key={course._id}
// // // // //                   initial={{ opacity: 0, y: 20 }}
// // // // //                   animate={{ opacity: 1, y: 0 }}
// // // // //                   transition={{ delay: index * 0.1 }}
// // // // //                   className="grid grid-cols-[3fr,1fr,1fr,1fr,120px] items-center px-6 py-4 hover:bg-richblack-750 transition-colors"
// // // // //                 >
// // // // //                   <div className="flex items-center gap-4">
// // // // //                     <img 
// // // // //                       src={course.thumbnail} 
// // // // //                       alt={course.courseName} 
// // // // //                       className="h-14 w-14 rounded-lg object-cover border border-richblack-600"
// // // // //                     />
// // // // //                     <div>
// // // // //                       <p className="font-semibold text-richblack-5">{course.courseName}</p>
// // // // //                       <p className="text-xs text-richblack-300 line-clamp-1">
// // // // //                         {course.courseDescription}
// // // // //                       </p>
// // // // //                     </div>
// // // // //                   </div>
                  
// // // // //                   <div className="flex items-center text-richblack-200">
// // // // //                     <FaClock className="mr-2 text-richblack-400" />
// // // // //                     {formatDuration(course?.totalDuration)}
// // // // //                   </div>
                  
// // // // //                   <div className="flex items-center text-richblack-5 font-medium">
// // // // //                     <FaRupeeSign className="mr-1" />
// // // // //                     {course.price}
// // // // //                   </div>
                  
// // // // //                   <div className="text-richblack-5">
// // // // //                     {course.studentEnrolled.length} students
// // // // //                   </div>
                  
// // // // //                   <div className="flex gap-3">
// // // // //                     <button
// // // // //                       onClick={() => navigate(`/dashboard/edit-course/${course._id}`)}
// // // // //                       className="p-2 rounded-full bg-richblack-700 hover:bg-richblack-600 transition-colors"
// // // // //                     >
// // // // //                       <FiEdit className="text-xl text-richblack-100" />
// // // // //                     </button>
// // // // //                     <button
// // // // //                       onClick={() => handleDeleteCourse(course._id)}
// // // // //                       className="p-2 rounded-full bg-richblack-700 hover:bg-pink-900/50 transition-colors"
// // // // //                     >
// // // // //                       <FiTrash2 className="text-xl text-pink-400" />
// // // // //                     </button>
// // // // //                   </div>
// // // // //                 </motion.div>
// // // // //               ))}
// // // // //             </div>
// // // // //           </div>

// // // // //           {/* Mobile Cards */}
// // // // //           <div className="md:hidden space-y-4 p-4">
// // // // //             {courses.map((course, index) => (
// // // // //               <motion.div
// // // // //                 key={course._id}
// // // // //                 initial={{ opacity: 0, y: 20 }}
// // // // //                 animate={{ opacity: 1, y: 0 }}
// // // // //                 transition={{ delay: index * 0.1 }}
// // // // //                 className="bg-gradient-to-br from-richblack-800 to-richblack-900 rounded-xl p-4 border border-richblack-700 shadow-lg"
// // // // //               >
// // // // //                 <div className="flex gap-4 mb-4">
// // // // //                   <img 
// // // // //                     src={course.thumbnail} 
// // // // //                     alt={course.courseName} 
// // // // //                     className="h-16 w-16 rounded-lg object-cover border border-richblack-600"
// // // // //                   />
// // // // //                   <div>
// // // // //                     <h3 className="font-bold text-richblack-5">{course.courseName}</h3>
// // // // //                     <p className="text-xs text-richblack-300 line-clamp-2 mt-1">
// // // // //                       {course.courseDescription}
// // // // //                     </p>
// // // // //                   </div>
// // // // //                 </div>
                
// // // // //                 <div className="grid grid-cols-2 gap-4 mb-4">
// // // // //                   <div className="bg-richblack-700/50 rounded-lg p-3">
// // // // //                     <div className="flex items-center text-richblack-200 text-sm mb-1">
// // // // //                       <FaClock className="mr-2" />
// // // // //                       Duration
// // // // //                     </div>
// // // // //                     <div className="text-richblack-5 font-medium">
// // // // //                       {formatDuration(course?.totalDuration)}
// // // // //                     </div>
// // // // //                   </div>
                  
// // // // //                   <div className="bg-richblack-700/50 rounded-lg p-3">
// // // // //                     <div className="flex items-center text-richblack-200 text-sm mb-1">
// // // // //                       <FaRupeeSign className="mr-2" />
// // // // //                       Price
// // // // //                     </div>
// // // // //                     <div className="text-richblack-5 font-medium">
// // // // //                       ₹{course.price}
// // // // //                     </div>
// // // // //                   </div>
                  
// // // // //                   <div className="bg-richblack-700/50 rounded-lg p-3 col-span-2">
// // // // //                     <div className="text-richblack-200 text-sm mb-1">
// // // // //                       Students Enrolled
// // // // //                     </div>
// // // // //                     <div className="text-richblack-5 font-medium">
// // // // //                       {course.studentEnrolled.length} students
// // // // //                     </div>
// // // // //                   </div>
// // // // //                 </div>
                
// // // // //                 <div className="flex justify-between gap-3">
// // // // //                   <button
// // // // //                     onClick={() => navigate(`/dashboard/edit-course/${course._id}`)}
// // // // //                     className="flex-1 flex items-center justify-center gap-2 bg-richblack-700 hover:bg-richblack-600 text-richblack-5 py-2 rounded-lg transition-colors"
// // // // //                   >
// // // // //                     <FiEdit />
// // // // //                     <span>Edit</span>
// // // // //                   </button>
// // // // //                   <button
// // // // //                     onClick={() => handleDeleteCourse(course._id)}
// // // // //                     className="flex-1 flex items-center justify-center gap-2 bg-richblack-700 hover:bg-pink-900/50 text-pink-400 py-2 rounded-lg transition-colors"
// // // // //                   >
// // // // //                     <FiTrash2 />
// // // // //                     <span>Delete</span>
// // // // //                   </button>
// // // // //                 </div>
// // // // //               </motion.div>
// // // // //             ))}
// // // // //           </div>
// // // // //         </div>
// // // // //       )}
// // // // //     </div>
// // // // //   )
// // // // // }

// // // // // export default MyCourses

// // // // import React, { useEffect, useState } from 'react'
// // // // import { useSelector } from 'react-redux'
// // // // import { useNavigate } from 'react-router-dom'
// // // // import { fetchInstructorCourses } from '../../../services/operations/courseDetailsAPI'
// // // // import IconBtn from '../../common/IconBtn'
// // // // import { VscAdd } from 'react-icons/vsc'
// // // // import { FiEdit, FiTrash2 } from 'react-icons/fi'
// // // // import { FaClock, FaRupeeSign } from 'react-icons/fa'
// // // // import { motion } from 'framer-motion'

// // // // const MyCourses = () => {
// // // //   const { token } = useSelector((state) => state.auth)
// // // //   const navigate = useNavigate()
// // // //   const [courses, setCourses] = useState([])
// // // //   const [loading, setLoading] = useState(true)

// // // //   useEffect(() => {
// // // //     const fetchCourses = async () => {
// // // //       setLoading(true)
// // // //       try {
// // // //         const result = await fetchInstructorCourses(token)
// // // //         if (result) {
// // // //           setCourses(result)
// // // //         }
// // // //       } catch (error) {
// // // //         console.error("Error fetching courses:", error)
// // // //       } finally {
// // // //         setLoading(false)
// // // //       }
// // // //     }
// // // //     fetchCourses()
// // // //   }, [token])

// // // //   // Function to calculate total duration of a course
// // // //   const calculateTotalDuration = (course) => {
// // // //     if (!course.courseContent) return 0;
    
// // // //     return course.courseContent.reduce((total, section) => {
// // // //       const sectionDuration = section.subSection.reduce((sum, subSec) => {
// // // //         return sum + (parseInt(subSec.timeDuration) || 0);
// // // //       }, 0);
// // // //       return total + sectionDuration;
// // // //     }, 0);
// // // //   }

// // // //   // Function to format duration
// // // //   const formatDuration = (seconds) => {
// // // //     if (!seconds) return "0h 0m"
// // // //     const hours = Math.floor(seconds / 3600)
// // // //     const minutes = Math.floor((seconds % 3600) / 60)
// // // //     return `${hours}h ${minutes}m`
// // // //   }

// // // //   // Function to handle course deletion
// // // //   const handleDeleteCourse = (courseId) => {
// // // //     // Implement your delete logic here
// // // //     console.log("Deleting course:", courseId)
// // // //     setCourses(courses.filter(course => course._id !== courseId))
// // // //   }

// // // //   return (
// // // //     <div className="p-4 md:p-6">
// // // //       <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4'>
// // // //         <motion.h1 
// // // //           initial={{ opacity: 0, y: -20 }}
// // // //           animate={{ opacity: 1, y: 0 }}
// // // //           className='text-2xl md:text-3xl font-bold text-richblack-5'
// // // //         >
// // // //           My Courses
// // // //         </motion.h1>

// // // //         <motion.div
// // // //           whileHover={{ scale: 1.05 }}
// // // //           whileTap={{ scale: 0.95 }}
// // // //         >
// // // //           <IconBtn
// // // //             text="Create New Course"
// // // //             onClick={() => navigate("/dashboard/add-course")}
// // // //             customClasses="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700"
// // // //           >
// // // //             <VscAdd className="text-lg" />
// // // //           </IconBtn>
// // // //         </motion.div>
// // // //       </div>

// // // //       {loading ? (
// // // //         <div className="flex justify-center items-center h-64">
// // // //           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-50"></div>
// // // //         </div>
// // // //       ) : courses.length === 0 ? (
// // // //         <div className="flex flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-richblack-800 to-richblack-900 p-8 py-16 text-center border border-richblack-700">
// // // //           <div className="bg-richblack-700 rounded-full p-5 mb-6">
// // // //             <VscAdd className="text-4xl text-yellow-50" />
// // // //           </div>
// // // //           <h2 className="text-2xl font-bold text-richblack-5 mb-3">
// // // //             Create Your First Course
// // // //           </h2>
// // // //           <p className="text-richblack-200 max-w-md mb-8">
// // // //             You haven't created any courses yet. Share your knowledge and start teaching today.
// // // //           </p>
// // // //           <IconBtn
// // // //             text="Create Course"
// // // //             onClick={() => navigate("/dashboard/add-course")}
// // // //             customClasses="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700"
// // // //           >
// // // //             <VscAdd />
// // // //           </IconBtn>
// // // //         </div>
// // // //       ) : (
// // // //         <div className="overflow-hidden rounded-2xl border border-richblack-700 shadow-xl">
// // // //           {/* Desktop Table */}
// // // //           <div className="hidden md:block">
// // // //             <div className="grid grid-cols-[3fr,1fr,1fr,1fr,120px] bg-gradient-to-r from-richblack-700 to-richblack-800 text-richblack-5 font-medium px-6 py-4">
// // // //               <div>Course Name</div>
// // // //               <div>Duration</div>
// // // //               <div>Price</div>
// // // //               <div>Students</div>
// // // //               <div>Actions</div>
// // // //             </div>
            
// // // //             <div className="divide-y divide-richblack-700">
// // // //               {courses.map((course, index) => {
// // // //                 const totalSeconds = calculateTotalDuration(course);
                
// // // //                 return (
// // // //                   <motion.div
// // // //                     key={course._id}
// // // //                     initial={{ opacity: 0, y: 20 }}
// // // //                     animate={{ opacity: 1, y: 0 }}
// // // //                     transition={{ delay: index * 0.1 }}
// // // //                     className="grid grid-cols-[3fr,1fr,1fr,1fr,120px] items-center px-6 py-4 hover:bg-richblack-750 transition-colors"
// // // //                   >
// // // //                     <div className="flex items-center gap-4">
// // // //                       <img 
// // // //                         src={course.thumbnail} 
// // // //                         alt={course.courseName} 
// // // //                         className="h-14 w-14 rounded-lg object-cover border border-richblack-600"
// // // //                       />
// // // //                       <div>
// // // //                         <p className="font-semibold text-richblack-5">{course.courseName}</p>
// // // //                         <p className="text-xs text-richblack-300 line-clamp-1">
// // // //                           {course.courseDescription}
// // // //                         </p>
// // // //                       </div>
// // // //                     </div>
                    
// // // //                     <div className="flex items-center text-richblack-200">
// // // //                       <FaClock className="mr-2 text-richblack-400" />
// // // //                       {formatDuration(totalSeconds)}
// // // //                     </div>
                    
// // // //                     <div className="flex items-center text-richblack-5 font-medium">
// // // //                       <FaRupeeSign className="mr-1" />
// // // //                       {course.price}
// // // //                     </div>
                    
// // // //                     <div className="text-richblack-5">
// // // //                       {course.studentEnrolled.length} students
// // // //                     </div>
                    
// // // //                     <div className="flex gap-3">
// // // //                       <button
// // // //                         onClick={() => navigate(`/dashboard/edit-course/${course._id}`)}
// // // //                         className="p-2 rounded-full bg-richblack-700 hover:bg-richblack-600 transition-colors"
// // // //                       >
// // // //                         <FiEdit className="text-xl text-richblack-100" />
// // // //                       </button>
// // // //                       <button
// // // //                         onClick={() => handleDeleteCourse(course._id)}
// // // //                         className="p-2 rounded-full bg-richblack-700 hover:bg-pink-900/50 transition-colors"
// // // //                       >
// // // //                         <FiTrash2 className="text-xl text-pink-400" />
// // // //                       </button>
// // // //                     </div>
// // // //                   </motion.div>
// // // //                 )
// // // //               })}
// // // //             </div>
// // // //           </div>

// // // //           {/* Mobile Cards */}
// // // //           <div className="md:hidden space-y-4 p-4">
// // // //             {courses.map((course, index) => {
// // // //               const totalSeconds = calculateTotalDuration(course);
              
// // // //               return (
// // // //                 <motion.div
// // // //                   key={course._id}
// // // //                   initial={{ opacity: 0, y: 20 }}
// // // //                   animate={{ opacity: 1, y: 0 }}
// // // //                   transition={{ delay: index * 0.1 }}
// // // //                   className="bg-gradient-to-br from-richblack-800 to-richblack-900 rounded-xl p-4 border border-richblack-700 shadow-lg"
// // // //                 >
// // // //                   <div className="flex gap-4 mb-4">
// // // //                     <img 
// // // //                       src={course.thumbnail} 
// // // //                       alt={course.courseName} 
// // // //                       className="h-16 w-16 rounded-lg object-cover border border-richblack-600"
// // // //                     />
// // // //                     <div>
// // // //                       <h3 className="font-bold text-richblack-5">{course.courseName}</h3>
// // // //                       <p className="text-xs text-richblack-300 line-clamp-2 mt-1">
// // // //                         {course.courseDescription}
// // // //                       </p>
// // // //                     </div>
// // // //                   </div>
                  
// // // //                   <div className="grid grid-cols-2 gap-4 mb-4">
// // // //                     <div className="bg-richblack-700/50 rounded-lg p-3">
// // // //                       <div className="flex items-center text-richblack-200 text-sm mb-1">
// // // //                         <FaClock className="mr-2" />
// // // //                         Duration
// // // //                       </div>
// // // //                       <div className="text-richblack-5 font-medium">
// // // //                         {formatDuration(totalSeconds)}
// // // //                       </div>
// // // //                     </div>
                    
// // // //                     <div className="bg-richblack-700/50 rounded-lg p-3">
// // // //                       <div className="flex items-center text-richblack-200 text-sm mb-1">
// // // //                         <FaRupeeSign className="mr-2" />
// // // //                         Price
// // // //                       </div>
// // // //                       <div className="text-richblack-5 font-medium">
// // // //                         ₹{course.price}
// // // //                       </div>
// // // //                     </div>
                    
// // // //                     <div className="bg-richblack-700/50 rounded-lg p-3 col-span-2">
// // // //                       <div className="text-richblack-200 text-sm mb-1">
// // // //                         Students Enrolled
// // // //                       </div>
// // // //                       <div className="text-richblack-5 font-medium">
// // // //                         {course.studentEnrolled.length} students
// // // //                       </div>
// // // //                     </div>
// // // //                   </div>
                  
// // // //                   <div className="flex justify-between gap-3">
// // // //                     <button
// // // //                       onClick={() => navigate(`/dashboard/edit-course/${course._id}`)}
// // // //                       className="flex-1 flex items-center justify-center gap-2 bg-richblack-700 hover:bg-richblack-600 text-richblack-5 py-2 rounded-lg transition-colors"
// // // //                     >
// // // //                       <FiEdit />
// // // //                       <span>Edit</span>
// // // //                     </button>
// // // //                     <button
// // // //                       onClick={() => handleDeleteCourse(course._id)}
// // // //                       className="flex-1 flex items-center justify-center gap-2 bg-richblack-700 hover:bg-pink-900/50 text-pink-400 py-2 rounded-lg transition-colors"
// // // //                     >
// // // //                       <FiTrash2 />
// // // //                       <span>Delete</span>
// // // //                     </button>
// // // //                   </div>
// // // //                 </motion.div>
// // // //               )
// // // //             })}
// // // //           </div>
// // // //         </div>
// // // //       )}
// // // //     </div>
// // // //   )
// // // // }

// // // // export default MyCourses

// // // import React, { useEffect, useState } from 'react'
// // // import { useSelector } from 'react-redux'
// // // import { useNavigate } from 'react-router-dom'
// // // import { fetchInstructorCourses } from '../../../services/operations/courseDetailsAPI'
// // // import IconBtn from '../../common/IconBtn'
// // // import { VscAdd } from 'react-icons/vsc'
// // // import { FiEdit, FiTrash2 } from 'react-icons/fi'
// // // import { FaClock, FaRupeeSign } from 'react-icons/fa'
// // // import { motion } from 'framer-motion'

// // // const MyCourses = () => {
// // //   const { token } = useSelector((state) => state.auth)
// // //   const navigate = useNavigate()
// // //   const [courses, setCourses] = useState([])
// // //   const [loading, setLoading] = useState(true)

// // //   useEffect(() => {
// // //     const fetchCourses = async () => {
// // //       setLoading(true)
// // //       try {
// // //         const result = await fetchInstructorCourses(token)
// // //         if (result) {
// // //           setCourses(result)
// // //         }
// // //       } catch (error) {
// // //         console.error("Error fetching courses:", error)
// // //       } finally {
// // //         setLoading(false)
// // //       }
// // //     }
// // //     fetchCourses()
// // //   }, [token])

// // //   // Function to calculate total duration of a course
// // //   const calculateTotalDuration = (course) => {
// // //     // Safely handle missing courseContent
// // //     if (!course?.courseContent) return 0;
    
// // //     return course.courseContent.reduce((total, section) => {
// // //       // Safely handle missing subSection
// // //       if (!section?.subSection) return total;
      
// // //       const sectionDuration = section.subSection.reduce((sum, subSec) => {
// // //         return sum + (parseInt(subSec?.timeDuration) || 0);
// // //       }, 0);
// // //       return total + sectionDuration;
// // //     }, 0);
// // //   }

// // //   // Function to format duration
// // //   const formatDuration = (seconds) => {
// // //     if (!seconds) return "0h 0m"
// // //     const hours = Math.floor(seconds / 3600)
// // //     const minutes = Math.floor((seconds % 3600) / 60)
// // //     return `${hours}h ${minutes}m`
// // //   }

// // //   // Function to handle course deletion
// // //   const handleDeleteCourse = (courseId) => {
// // //     // Implement your delete logic here
// // //     console.log("Deleting course:", courseId)
// // //     setCourses(courses.filter(course => course._id !== courseId))
// // //   }

// // //   return (
// // //     <div className="p-4 md:p-6">
// // //       <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4'>
// // //         <motion.h1 
// // //           initial={{ opacity: 0, y: -20 }}
// // //           animate={{ opacity: 1, y: 0 }}
// // //           className='text-2xl md:text-3xl font-bold text-richblack-5'
// // //         >
// // //           My Courses
// // //         </motion.h1>

// // //         <motion.div
// // //           whileHover={{ scale: 1.05 }}
// // //           whileTap={{ scale: 0.95 }}
// // //         >
// // //           <IconBtn
// // //             text="Create New Course"
// // //             onClick={() => navigate("/dashboard/add-course")}
// // //             customClasses="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700"
// // //           >
// // //             <VscAdd className="text-lg" />
// // //           </IconBtn>
// // //         </motion.div>
// // //       </div>

// // //       {loading ? (
// // //         <div className="flex justify-center items-center h-64">
// // //           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-50"></div>
// // //         </div>
// // //       ) : courses.length === 0 ? (
// // //         <div className="flex flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-richblack-800 to-richblack-900 p-8 py-16 text-center border border-richblack-700">
// // //           <div className="bg-richblack-700 rounded-full p-5 mb-6">
// // //             <VscAdd className="text-4xl text-yellow-50" />
// // //           </div>
// // //           <h2 className="text-2xl font-bold text-richblack-5 mb-3">
// // //             Create Your First Course
// // //           </h2>
// // //           <p className="text-richblack-200 max-w-md mb-8">
// // //             You haven't created any courses yet. Share your knowledge and start teaching today.
// // //           </p>
// // //           <IconBtn
// // //             text="Create Course"
// // //             onClick={() => navigate("/dashboard/add-course")}
// // //             customClasses="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700"
// // //           >
// // //             <VscAdd />
// // //           </IconBtn>
// // //         </div>
// // //       ) : (
// // //         <div className="overflow-hidden rounded-2xl border border-richblack-700 shadow-xl">
// // //           {/* Desktop Table */}
// // //           <div className="hidden md:block">
// // //             <div className="grid grid-cols-[3fr,1fr,1fr,1fr,120px] bg-gradient-to-r from-richblack-700 to-richblack-800 text-richblack-5 font-medium px-6 py-4">
// // //               <div>Course Name</div>
// // //               <div>Duration</div>
// // //               <div>Price</div>
// // //               <div>Students</div>
// // //               <div>Actions</div>
// // //             </div>
            
// // //             <div className="divide-y divide-richblack-700">
// // //               {courses.map((course, index) => {
// // //                 const totalSeconds = calculateTotalDuration(course);
                
// // //                 return (
// // //                   <motion.div
// // //                     key={course._id}
// // //                     initial={{ opacity: 0, y: 20 }}
// // //                     animate={{ opacity: 1, y: 0 }}
// // //                     transition={{ delay: index * 0.1 }}
// // //                     className="grid grid-cols-[3fr,1fr,1fr,1fr,120px] items-center px-6 py-4 hover:bg-richblack-750 transition-colors"
// // //                   >
// // //                     <div className="flex items-center gap-4">
// // //                       <img 
// // //                         src={course.thumbnail} 
// // //                         alt={course.courseName} 
// // //                         className="h-14 w-14 rounded-lg object-cover border border-richblack-600"
// // //                       />
// // //                       <div>
// // //                         <p className="font-semibold text-richblack-5">{course.courseName}</p>
// // //                         <p className="text-xs text-richblack-300 line-clamp-1">
// // //                           {course.courseDescription}
// // //                         </p>
// // //                       </div>
// // //                     </div>
                    
// // //                     <div className="flex items-center text-richblack-200">
// // //                       <FaClock className="mr-2 text-richblack-400" />
// // //                       {formatDuration(totalSeconds)}
// // //                     </div>
                    
// // //                     <div className="flex items-center text-richblack-5 font-medium">
// // //                       <FaRupeeSign className="mr-1" />
// // //                       {course.price}
// // //                     </div>
                    
// // //                     <div className="text-richblack-5">
// // //                       {course.studentEnrolled.length} students
// // //                     </div>
                    
// // //                     <div className="flex gap-3">
// // //                       <button
// // //                         onClick={() => navigate(`/dashboard/edit-course/${course._id}`)}
// // //                         className="p-2 rounded-full bg-richblack-700 hover:bg-richblack-600 transition-colors"
// // //                       >
// // //                         <FiEdit className="text-xl text-richblack-100" />
// // //                       </button>
// // //                       <button
// // //                         onClick={() => handleDeleteCourse(course._id)}
// // //                         className="p-2 rounded-full bg-richblack-700 hover:bg-pink-900/50 transition-colors"
// // //                       >
// // //                         <FiTrash2 className="text-xl text-pink-400" />
// // //                       </button>
// // //                     </div>
// // //                   </motion.div>
// // //                 )
// // //               })}
// // //             </div>
// // //           </div>

// // //           {/* Mobile Cards */}
// // //           <div className="md:hidden space-y-4 p-4">
// // //             {courses.map((course, index) => {
// // //               const totalSeconds = calculateTotalDuration(course);
              
// // //               return (
// // //                 <motion.div
// // //                   key={course._id}
// // //                   initial={{ opacity: 0, y: 20 }}
// // //                   animate={{ opacity: 1, y: 0 }}
// // //                   transition={{ delay: index * 0.1 }}
// // //                   className="bg-gradient-to-br from-richblack-800 to-richblack-900 rounded-xl p-4 border border-richblack-700 shadow-lg"
// // //                 >
// // //                   <div className="flex gap-4 mb-4">
// // //                     <img 
// // //                       src={course.thumbnail} 
// // //                       alt={course.courseName} 
// // //                       className="h-16 w-16 rounded-lg object-cover border border-richblack-600"
// // //                     />
// // //                     <div>
// // //                       <h3 className="font-bold text-richblack-5">{course.courseName}</h3>
// // //                       <p className="text-xs text-richblack-300 line-clamp-2 mt-1">
// // //                         {course.courseDescription}
// // //                       </p>
// // //                     </div>
// // //                   </div>
                  
// // //                   <div className="grid grid-cols-2 gap-4 mb-4">
// // //                     <div className="bg-richblack-700/50 rounded-lg p-3">
// // //                       <div className="flex items-center text-richblack-200 text-sm mb-1">
// // //                         <FaClock className="mr-2" />
// // //                         Duration
// // //                       </div>
// // //                       <div className="text-richblack-5 font-medium">
// // //                         {formatDuration(totalSeconds)}
// // //                       </div>
// // //                     </div>
                    
// // //                     <div className="bg-richblack-700/50 rounded-lg p-3">
// // //                       <div className="flex items-center text-richblack-200 text-sm mb-1">
// // //                         <FaRupeeSign className="mr-2" />
// // //                         Price
// // //                       </div>
// // //                       <div className="text-richblack-5 font-medium">
// // //                         ₹{course.price}
// // //                       </div>
// // //                     </div>
                    
// // //                     <div className="bg-richblack-700/50 rounded-lg p-3 col-span-2">
// // //                       <div className="text-richblack-200 text-sm mb-1">
// // //                         Students Enrolled
// // //                       </div>
// // //                       <div className="text-richblack-5 font-medium">
// // //                         {course.studentEnrolled.length} students
// // //                       </div>
// // //                     </div>
// // //                   </div>
                  
// // //                   <div className="flex justify-between gap-3">
// // //                     <button
// // //                       onClick={() => navigate(`/dashboard/edit-course/${course._id}`)}
// // //                       className="flex-1 flex items-center justify-center gap-2 bg-richblack-700 hover:bg-richblack-600 text-richblack-5 py-2 rounded-lg transition-colors"
// // //                     >
// // //                       <FiEdit />
// // //                       <span>Edit</span>
// // //                     </button>
// // //                     <button
// // //                       onClick={() => handleDeleteCourse(course._id)}
// // //                       className="flex-1 flex items-center justify-center gap-2 bg-richblack-700 hover:bg-pink-900/50 text-pink-400 py-2 rounded-lg transition-colors"
// // //                     >
// // //                       <FiTrash2 />
// // //                       <span>Delete</span>
// // //                     </button>
// // //                   </div>
// // //                 </motion.div>
// // //               )
// // //             })}
// // //           </div>
// // //         </div>
// // //       )}
// // //     </div>
// // //   )
// // // }

// // // export default MyCourses



// // import React, { useEffect, useState } from 'react'
// // import { useSelector } from 'react-redux'
// // import { useNavigate } from 'react-router-dom'
// // import { fetchInstructorCourses } from '../../../services/operations/courseDetailsAPI'
// // import IconBtn from '../../common/IconBtn'
// // import { VscAdd } from 'react-icons/vsc'
// // import { FiEdit, FiTrash2 } from 'react-icons/fi'
// // import { FaClock, FaRupeeSign } from 'react-icons/fa'
// // import { motion } from 'framer-motion'
// // import { getUserEnrolledCourses } from '../../../services/operations/profileAPI'

// // const MyCourses = () => {
// //   const { token } = useSelector((state) => state.auth)
// //   const navigate = useNavigate()
// //   const [courses, setCourses] = useState([])
// //   const [loading, setLoading] = useState(true)
// //   const [enrolledCourses, setEnrolledCourses] = useState([])

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       setLoading(true)
// //       try {
// //         // Fetch both instructor courses and enrolled courses in parallel
// //         const [instructorCourses, enrolled] = await Promise.all([
// //           fetchInstructorCourses(token),
// //           getUserEnrolledCourses(token)
// //         ])
        
// //         if (instructorCourses) setCourses(instructorCourses)
// //         if (enrolled) {
// //           const filterPublishCourse = enrolled.filter(ele => ele.status !== "Draft")
// //           setEnrolledCourses(filterPublishCourse)
// //         }
// //       } catch (error) {
// //         console.error("Error fetching data:", error)
// //       } finally {
// //         setLoading(false)
// //       }
// //     }
// //     fetchData()
// //   }, [token])

// //   // Function to find duration for a course from enrolledCourses
// //   const getCourseDuration = (courseId) => {
// //     const enrolledCourse = enrolledCourses.find(course => course._id === courseId)
// //     return enrolledCourse?.totalDuration || 0
// //   }

// //   // Function to format duration
// //   const formatDuration = (seconds) => {
// //     if (!seconds) return "0h 0m"
// //     const hours = Math.floor(seconds / 3600)
// //     const minutes = Math.floor((seconds % 3600) / 60)
// //     return `${hours}h ${minutes}m`
// //   }

// //   // Function to handle course deletion
// //   const handleDeleteCourse = (courseId) => {
// //     console.log("Deleting course:", courseId)
// //     setCourses(courses.filter(course => course._id !== courseId))
// //   }

// //   return (
// //     <div className="p-4 md:p-6">
// //       <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4'>
// //         <motion.h1 
// //           initial={{ opacity: 0, y: -20 }}
// //           animate={{ opacity: 1, y: 0 }}
// //           className='text-2xl md:text-3xl font-bold text-richblack-5'
// //         >
// //           My Courses
// //         </motion.h1>

// //         <motion.div
// //           whileHover={{ scale: 1.05 }}
// //           whileTap={{ scale: 0.95 }}
// //         >
// //           <IconBtn
// //             text="Create New Course"
// //             onClick={() => navigate("/dashboard/add-course")}
// //             customClasses="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700"
// //           >
// //             <VscAdd className="text-lg" />
// //           </IconBtn>
// //         </motion.div>
// //       </div>

// //       {loading ? (
// //         <div className="flex justify-center items-center h-64">
// //           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-50"></div>
// //         </div>
// //       ) : courses.length === 0 ? (
// //         <div className="flex flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-richblack-800 to-richblack-900 p-8 py-16 text-center border border-richblack-700">
// //           <div className="bg-richblack-700 rounded-full p-5 mb-6">
// //             <VscAdd className="text-4xl text-yellow-50" />
// //           </div>
// //           <h2 className="text-2xl font-bold text-richblack-5 mb-3">
// //             Create Your First Course
// //           </h2>
// //           <p className="text-richblack-200 max-w-md mb-8">
// //             You haven't created any courses yet. Share your knowledge and start teaching today.
// //           </p>
// //           <IconBtn
// //             text="Create Course"
// //             onClick={() => navigate("/dashboard/add-course")}
// //             customClasses="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700"
// //           >
// //             <VscAdd />
// //           </IconBtn>
// //         </div>
// //       ) : (
// //         <div className="overflow-hidden rounded-2xl border border-richblack-700 shadow-xl">
// //           {/* Desktop Table */}
// //           <div className="hidden md:block">
// //             <div className="grid grid-cols-[3fr,1fr,1fr,1fr,120px] bg-gradient-to-r from-richblack-700 to-richblack-800 text-richblack-5 font-medium px-6 py-4">
// //               <div>Course Name</div>
// //               <div>Duration</div>
// //               <div>Price</div>
// //               <div>Students</div>
// //               <div>Actions</div>
// //             </div>
            
// //             <div className="divide-y divide-richblack-700">
// //               {courses.map((course, index) => {
// //                 // Get duration from enrolledCourses
// //                 const totalSeconds = getCourseDuration(course._id)
// //                 const formattedDuration = formatDuration(totalSeconds)
                
// //                 return (
// //                   <motion.div
// //                     key={course._id}
// //                     initial={{ opacity: 0, y: 20 }}
// //                     animate={{ opacity: 1, y: 0 }}
// //                     transition={{ delay: index * 0.1 }}
// //                     className="grid grid-cols-[3fr,1fr,1fr,1fr,120px] items-center px-6 py-4 hover:bg-richblack-750 transition-colors"
// //                   >
// //                     <div className="flex items-center gap-4">
// //                       <img 
// //                         src={course.thumbnail} 
// //                         alt={course.courseName} 
// //                         className="h-14 w-14 rounded-lg object-cover border border-richblack-600"
// //                       />
// //                       <div>
// //                         <p className="font-semibold text-richblack-5">{course.courseName}</p>
// //                         <p className="text-xs text-richblack-300 line-clamp-1">
// //                           {course.courseDescription}
// //                         </p>
// //                       </div>
// //                     </div>
                    
// //                     <div className="flex items-center text-richblack-200">
// //                       <FaClock className="mr-2 text-richblack-400" />
// //                       {formattedDuration}
// //                     </div>
                    
// //                     <div className="flex items-center text-richblack-5 font-medium">
// //                       <FaRupeeSign className="mr-1" />
// //                       {course.price}
// //                     </div>
                    
// //                     <div className="text-richblack-5">
// //                       {course.studentEnrolled.length} students
// //                     </div>
                    
// //                     <div className="flex gap-3">
// //                       <button
// //                         onClick={() => navigate(`/dashboard/edit-course/${course._id}`)}
// //                         className="p-2 rounded-full bg-richblack-700 hover:bg-richblack-600 transition-colors"
// //                       >
// //                         <FiEdit className="text-xl text-richblack-100" />
// //                       </button>
// //                       <button
// //                         onClick={() => handleDeleteCourse(course._id)}
// //                         className="p-2 rounded-full bg-richblack-700 hover:bg-pink-900/50 transition-colors"
// //                       >
// //                         <FiTrash2 className="text-xl text-pink-400" />
// //                       </button>
// //                     </div>
// //                   </motion.div>
// //                 )
// //               })}
// //             </div>
// //           </div>

// //           {/* Mobile Cards */}
// //           <div className="md:hidden space-y-4 p-4">
// //             {courses.map((course, index) => {
// //               // Get duration from enrolledCourses
// //               const totalSeconds = getCourseDuration(course._id)
// //               const formattedDuration = formatDuration(totalSeconds)
              
// //               return (
// //                 <motion.div
// //                   key={course._id}
// //                   initial={{ opacity: 0, y: 20 }}
// //                   animate={{ opacity: 1, y: 0 }}
// //                   transition={{ delay: index * 0.1 }}
// //                   className="bg-gradient-to-br from-richblack-800 to-richblack-900 rounded-xl p-4 border border-richblack-700 shadow-lg"
// //                 >
// //                   <div className="flex gap-4 mb-4">
// //                     <img 
// //                       src={course.thumbnail} 
// //                       alt={course.courseName} 
// //                       className="h-16 w-16 rounded-lg object-cover border border-richblack-600"
// //                     />
// //                     <div>
// //                       <h3 className="font-bold text-richblack-5">{course.courseName}</h3>
// //                       <p className="text-xs text-richblack-300 line-clamp-2 mt-1">
// //                         {course.courseDescription}
// //                       </p>
// //                     </div>
// //                   </div>
                  
// //                   <div className="grid grid-cols-2 gap-4 mb-4">
// //                     <div className="bg-richblack-700/50 rounded-lg p-3">
// //                       <div className="flex items-center text-richblack-200 text-sm mb-1">
// //                         <FaClock className="mr-2" />
// //                         Duration
// //                       </div>
// //                       <div className="text-richblack-5 font-medium">
// //                         {formattedDuration}
// //                       </div>
// //                     </div>
                    
// //                     <div className="bg-richblack-700/50 rounded-lg p-3">
// //                       <div className="flex items-center text-richblack-200 text-sm mb-1">
// //                         <FaRupeeSign className="mr-2" />
// //                         Price
// //                       </div>
// //                       <div className="text-richblack-5 font-medium">
// //                         ₹{course.price}
// //                       </div>
// //                     </div>
                    
// //                     <div className="bg-richblack-700/50 rounded-lg p-3 col-span-2">
// //                       <div className="text-richblack-200 text-sm mb-1">
// //                         Students Enrolled
// //                       </div>
// //                       <div className="text-richblack-5 font-medium">
// //                         {course.studentEnrolled.length} students
// //                       </div>
// //                     </div>
// //                   </div>
                  
// //                   <div className="flex justify-between gap-3">
// //                     <button
// //                       onClick={() => navigate(`/dashboard/edit-course/${course._id}`)}
// //                       className="flex-1 flex items-center justify-center gap-2 bg-richblack-700 hover:bg-richblack-600 text-richblack-5 py-2 rounded-lg transition-colors"
// //                     >
// //                       <FiEdit />
// //                       <span>Edit</span>
// //                     </button>
// //                     <button
// //                       onClick={() => handleDeleteCourse(course._id)}
// //                       className="flex-1 flex items-center justify-center gap-2 bg-richblack-700 hover:bg-pink-900/50 text-pink-400 py-2 rounded-lg transition-colors"
// //                     >
// //                       <FiTrash2 />
// //                       <span>Delete</span>
// //                     </button>
// //                   </div>
// //                 </motion.div>
// //               )
// //             })}
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   )
// // }

// // export default MyCourses









// import React, { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
// import { fetchInstructorCourses } from '../../../services/operations/courseDetailsAPI'
// import IconBtn from '../../common/IconBtn'
// import { VscAdd } from 'react-icons/vsc'
// import { FiEdit, FiTrash2 } from 'react-icons/fi'
// import { FaClock, FaRupeeSign } from 'react-icons/fa'
// import { motion } from 'framer-motion'

// const MyCourses = () => {
//   const { token } = useSelector((state) => state.auth)
//   const navigate = useNavigate()
//   const [courses, setCourses] = useState([])
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     const fetchCourses = async () => {
//       setLoading(true)
//       try {
//         const result = await fetchInstructorCourses(token)
//         if (result) {
//           setCourses(result)
//         }
//       } catch (error) {
//         console.error("Error fetching courses:", error)
//       } finally {
//         setLoading(false)
//       }
//     }
//     fetchCourses()
//   }, [token])

//   // Function to calculate total duration of a course
//   const calculateTotalDuration = (course) => {
//     // Safely handle missing courseContent
//     if (!course?.courseContent) return 0;
    
//     return course.courseContent.reduce((total, section) => {
//       // Safely handle missing subSection
//       if (!section?.subSection) return total;
      
//       const sectionDuration = section.subSection.reduce((sum, subSec) => {
//         return sum + (parseInt(subSec?.timeDuration) || 0);
//       }, 0);
//       return total + sectionDuration;
//     }, 0);
//   }

//   // Function to format duration
//   const formatDuration = (seconds) => {
//     if (!seconds) return "0h 0m"
//     const hours = Math.floor(seconds / 3600)
//     const minutes = Math.floor((seconds % 3600) / 60)
//     return `${hours}h ${minutes}m`
//   }

//   // Function to handle course deletion
//   const handleDeleteCourse = (courseId) => {
//     // Implement your delete logic here
//     console.log("Deleting course:", courseId)
//     setCourses(courses.filter(course => course._id !== courseId))
//   }

//   return (
//     <div className="p-4 md:p-6">
//       <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4'>
//         <motion.h1 
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className='text-2xl md:text-3xl font-bold text-richblack-5'
//         >
//           My Courses
//         </motion.h1>

//         <motion.div
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//         >
//           <IconBtn
//             text="Create New Course"
//             onClick={() => navigate("/dashboard/add-course")}
//             customClasses="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700"
//           >
//             <VscAdd className="text-lg" />
//           </IconBtn>
//         </motion.div>
//       </div>

//       {loading ? (
//         <div className="flex justify-center items-center h-64">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-50"></div>
//         </div>
//       ) : courses.length === 0 ? (
//         <div className="flex flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-richblack-800 to-richblack-900 p-8 py-16 text-center border border-richblack-700">
//           <div className="bg-richblack-700 rounded-full p-5 mb-6">
//             <VscAdd className="text-4xl text-yellow-50" />
//           </div>
//           <h2 className="text-2xl font-bold text-richblack-5 mb-3">
//             Create Your First Course
//           </h2>
//           <p className="text-richblack-200 max-w-md mb-8">
//             You haven't created any courses yet. Share your knowledge and start teaching today.
//           </p>
//           <IconBtn
//             text="Create Course"
//             onClick={() => navigate("/dashboard/add-course")}
//             customClasses="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700"
//           >
//             <VscAdd />
//           </IconBtn>
//         </div>
//       ) : (
//         <div className="overflow-hidden rounded-2xl border border-richblack-700 shadow-xl">
//           {/* Desktop Table */}
//           <div className="hidden md:block">
//             <div className="grid grid-cols-[3fr,1fr,1fr,1fr,120px] bg-gradient-to-r from-richblack-700 to-richblack-800 text-richblack-5 font-medium px-6 py-4">
//               <div>Course Name</div>
//               <div>Duration</div>
//               <div>Price</div>
//               <div>Students</div>
//               <div>Actions</div>
//             </div>
            
//             <div className="divide-y divide-richblack-700">
//               {courses.map((course, index) => {
//                 const totalSeconds = calculateTotalDuration(course);
                
//                 return (
//                   <motion.div
//                     key={course._id}
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: index * 0.1 }}
//                     className="grid grid-cols-[3fr,1fr,1fr,1fr,120px] items-center px-6 py-4 hover:bg-richblack-750 transition-colors"
//                   >
//                     <div className="flex items-center gap-4">
//                       <img 
//                         src={course.thumbnail} 
//                         alt={course.courseName} 
//                         className="h-14 w-14 rounded-lg object-cover border border-richblack-600"
//                       />
//                       <div>
//                         <p className="font-semibold text-richblack-5">{course.courseName}</p>
//                         <p className="text-xs text-richblack-300 line-clamp-1">
//                           {course.courseDescription}
//                         </p>
//                       </div>
//                     </div>
                    
//                     <div className="flex items-center text-richblack-200">
//                       <FaClock className="mr-2 text-richblack-400" />
//                       {formatDuration(totalSeconds)}
//                     </div>
                    
//                     <div className="flex items-center text-richblack-5 font-medium">
//                       <FaRupeeSign className="mr-1" />
//                       {course.price}
//                     </div>
                    
//                     <div className="text-richblack-5">
//                       {course.studentEnrolled.length} students
//                     </div>
                    
//                     <div className="flex gap-3">
//                       <button
//                         onClick={() => navigate(`/dashboard/edit-course/${course._id}`)}
//                         className="p-2 rounded-full bg-richblack-700 hover:bg-richblack-600 transition-colors"
//                       >
//                         <FiEdit className="text-xl text-richblack-100" />
//                       </button>
//                       <button
//                         onClick={() => handleDeleteCourse(course._id)}
//                         className="p-2 rounded-full bg-richblack-700 hover:bg-pink-900/50 transition-colors"
//                       >
//                         <FiTrash2 className="text-xl text-pink-400" />
//                       </button>
//                     </div>
//                   </motion.div>
//                 )
//               })}
//             </div>
//           </div>

//           {/* Mobile Cards */}
//           <div className="md:hidden space-y-4 p-4">
//             {courses.map((course, index) => {
//               const totalSeconds = calculateTotalDuration(course);
              
//               return (
//                 <motion.div
//                   key={course._id}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: index * 0.1 }}
//                   className="bg-gradient-to-br from-richblack-800 to-richblack-900 rounded-xl p-4 border border-richblack-700 shadow-lg"
//                 >
//                   <div className="flex gap-4 mb-4">
//                     <img 
//                       src={course.thumbnail} 
//                       alt={course.courseName} 
//                       className="h-16 w-16 rounded-lg object-cover border border-richblack-600"
//                     />
//                     <div>
//                       <h3 className="font-bold text-richblack-5">{course.courseName}</h3>
//                       <p className="text-xs text-richblack-300 line-clamp-2 mt-1">
//                         {course.courseDescription}
//                       </p>
//                     </div>
//                   </div>
                  
//                   <div className="grid grid-cols-2 gap-4 mb-4">
//                     <div className="bg-richblack-700/50 rounded-lg p-3">
//                       <div className="flex items-center text-richblack-200 text-sm mb-1">
//                         <FaClock className="mr-2" />
//                         Duration
//                       </div>
//                       <div className="text-richblack-5 font-medium">
//                         {formatDuration(totalSeconds)}
//                       </div>
//                     </div>
                    
//                     <div className="bg-richblack-700/50 rounded-lg p-3">
//                       <div className="flex items-center text-richblack-200 text-sm mb-1">
//                         <FaRupeeSign className="mr-2" />
//                         Price
//                       </div>
//                       <div className="text-richblack-5 font-medium">
//                         ₹{course.price}
//                       </div>
//                     </div>
                    
//                     <div className="bg-richblack-700/50 rounded-lg p-3 col-span-2">
//                       <div className="text-richblack-200 text-sm mb-1">
//                         Students Enrolled
//                       </div>
//                       <div className="text-richblack-5 font-medium">
//                         {course.studentEnrolled.length} students
//                       </div>
//                     </div>
//                   </div>
                  
//                   <div className="flex justify-between gap-3">
//                     <button
//                       onClick={() => navigate(`/dashboard/edit-course/${course._id}`)}
//                       className="flex-1 flex items-center justify-center gap-2 bg-richblack-700 hover:bg-richblack-600 text-richblack-5 py-2 rounded-lg transition-colors"
//                     >
//                       <FiEdit />
//                       <span>Edit</span>
//                     </button>
//                     <button
//                       onClick={() => handleDeleteCourse(course._id)}
//                       className="flex-1 flex items-center justify-center gap-2 bg-richblack-700 hover:bg-pink-900/50 text-pink-400 py-2 rounded-lg transition-colors"
//                     >
//                       <FiTrash2 />
//                       <span>Delete</span>
//                     </button>
//                   </div>
//                 </motion.div>
//               )
//             })}
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default MyCourses







// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { fetchInstructorCourses } from '../../../services/operations/courseDetailsAPI';
// import IconBtn from '../../common/IconBtn';
// import { VscAdd } from 'react-icons/vsc';
// import { FiEdit, FiTrash2 } from 'react-icons/fi';
// import { FaClock, FaRupeeSign } from 'react-icons/fa';
// import { motion } from 'framer-motion';

// const MyCourses = () => {
//   const { token } = useSelector(state => state.auth);
//   const navigate = useNavigate();
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchCourses = async () => {
//       setLoading(true);
//       const result = await fetchInstructorCourses(token);
//       if (result) setCourses(result);
//       setLoading(false);
//     };
//     fetchCourses();
//   }, [token]);

// //   const calculateTotalDuration = course => {
// //     if (!course?.courseContent) return 0;
// //     return course.courseContent.reduce((total, section) => {
// //       if (!Array.isArray(section.subSection)) return total;
      
// //      const sectionDuration = section.subSection.reduce((sum, sub) => {
// //   const mins = parseInt(sub?.timeDuration, 10);
// //   const secs = Number.isNaN(mins) ? 0 : mins * 60;  // convert minutes → seconds
// //   return sum + secs;
// // }, 0);

// //       return total + sectionDuration;
// //     }, 0);
// //   };


// //   const calculateTotalDuration = (course) => {
// //   if (!course?.courseContent) return 0;

// //   return course.courseContent.reduce((total, section) => {
// //     if (!Array.isArray(section.subSection)) return total;

// //     const sectionDuration = section.subSection.reduce((sum, sub) => {
// //       const secs = parseInt(sub?.timeDuration, 10);
// //       const seconds = Number.isNaN(secs) ? 0 : secs; // seconds, unchanged
// //       return sum + seconds;
// //     }, 0);

// //     return total + sectionDuration;
// //   }, 0);
// // };

//   const calculateTotalDuration = (course) => {
//   if (!course?.courseContent) return 0;

//   return course.courseContent.reduce((total, section) => {
//     if (!Array.isArray(section.subSection)) return total;

//     const sectionDuration = section.subSection.reduce((sum, sub) => {
//       const secs = parseInt(sub?.timeDuration, 10);
//       return sum + (Number.isNaN(secs) ? 0 : secs);
//     }, 0);

//     return total + sectionDuration;
//   }, 0);
// };


// const formatDuration = (seconds) => {
//   const hrs = Math.floor(seconds / 3600);
//   const mins = Math.floor((seconds % 3600) / 60);
//   const secs = seconds % 60;

//   const parts = [];
//   if (hrs) parts.push(`${hrs}h`);
//   if (mins) parts.push(`${mins}m`);
//   if (secs || parts.length === 0) parts.push(`${secs}s`);

//   return parts.join(' ');
// };










// // const formatDuration = (seconds) => {
// //   if (!seconds) return "0h 0m";
// //   const hours = Math.floor(seconds / 3600);
// //   const minutes = Math.floor((seconds % 3600) / 60);
// //   return `${hours}h ${minutes}m`;
// // };



//   // const formatDuration = seconds => {
//   //   if (!seconds) return '0h 0m';
//   //   const hours = Math.floor(seconds / 3600);
//   //   const minutes = Math.floor((seconds % 3600) / 60);
//   //   return `${hours}h ${minutes}m`;
//   // };

//   const handleDeleteCourse = courseId => {
//     console.log('Deleting course:', courseId);
//     setCourses(prev => prev.filter(c => c._id !== courseId));
//   };

//   if (loading) return (
//     <div className="flex justify-center items-center h-64">
//       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-50"></div>
//     </div>
//   );

//   return (
//     <div className="p-4 md:p-6">
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
//         <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-2xl md:text-3xl font-bold text-richblack-5">
//           My Courses
//         </motion.h1>
//         <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//           <IconBtn text="Create New Course" onClick={() => navigate('/dashboard/add-course')}
//                    customClasses="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700">
//             <VscAdd className="text-lg" />
//           </IconBtn>
//         </motion.div>
//       </div>

//       {courses.length === 0 ? (
//         <div className="flex flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-richblack-800 to-richblack-900 p-8 py-16 text-center border border-richblack-700">
//           <div className="bg-richblack-700 rounded-full p-5 mb-6">
//             <VscAdd className="text-4xl text-yellow-50" />
//           </div>
//           <h2 className="text-2xl font-bold text-richblack-5 mb-3">Create Your First Course</h2>
//           <p className="text-richblack-200 max-w-md mb-8">
//             You haven't created any courses yet. Share your knowledge and start teaching today.
//           </p>
//           <IconBtn text="Create Course" onClick={() => navigate('/dashboard/add-course')}
//                    customClasses="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700">
//             <VscAdd />
//           </IconBtn>
//         </div>
//       ) : (
//         <div className="overflow-hidden rounded-2xl border border-richblack-700 shadow-xl">
//           {/* Desktop Table */}
//           <div className="hidden md:block">
//             <div className="grid grid-cols-[3fr,1fr,1fr,1fr,120px] bg-gradient-to-r from-richblack-700 to-richblack-800 text-richblack-5 font-medium px-6 py-4">
//               <div>Course Name</div>
//               <div>Duration</div>
//               <div>Price</div>
//               <div>Students</div>
//               <div>Actions</div>
//             </div>
//             <div className="divide-y divide-richblack-700">
//               {courses.map((course, idx) => {
//                 const totalSeconds = calculateTotalDuration(course);
//                 return (
//                   <motion.div key={course._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}
//                               className="grid grid-cols-[3fr,1fr,1fr,1fr,120px] items-center px-6 py-4 hover:bg-richblack-750 transition-colors">
//                     <div className="flex items-center gap-4">
//                       <img src={course.thumbnail} alt={course.courseName}
//                            className="h-14 w-14 rounded-lg object-cover border border-richblack-600"/>
//                       <div>
//                         <p className="font-semibold text-richblack-5">{course.courseName}</p>
//                         <p className="text-xs text-richblack-300 line-clamp-1">{course.courseDescription}</p>
//                       </div>
//                     </div>
//                     <div className="flex items-center text-richblack-200"><FaClock className="mr-2 text-richblack-400"/>{formatDuration(totalSeconds)}</div>
//                     <div className="flex items-center text-richblack-5 font-medium"><FaRupeeSign className="mr-1"/>{course.price}</div>
//                     <div className="text-richblack-5">{course.studentEnrolled.length} students</div>
//                     <div className="flex gap-3">
//                       <button onClick={() => navigate(`/dashboard/edit-course/${course._id}`)}
//                               className="p-2 rounded-full bg-richblack-700 hover:bg-richblack-600"><FiEdit className="text-xl text-richblack-100"/></button>
//                       <button onClick={() => handleDeleteCourse(course._id)}
//                               className="p-2 rounded-full bg-richblack-700 hover:bg-pink-900/50"><FiTrash2 className="text-xl text-pink-400"/></button>
//                     </div>
//                   </motion.div>
//                 );
//               })}
//             </div>
//           </div>

//           {/* Mobile Cards */}
//           <div className="md:hidden space-y-4 p-4">
//             {courses.map((course, idx) => {
//               const totalSeconds = calculateTotalDuration(course);
//               return (
//                 <motion.div key={course._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}
//                             className="bg-gradient-to-br from-richblack-800 to-richblack-900 rounded-xl p-4 border border-richblack-700 shadow-lg">
//                   <div className="flex gap-4 mb-4">
//                     <img src={course.thumbnail} alt={course.courseName}
//                          className="h-16 w-16 rounded-lg object-cover border border-richblack-600"/>
//                     <div>
//                       <h3 className="font-bold text-richblack-5">{course.courseName}</h3>
//                       <p className="text-xs text-richblack-300 line-clamp-2 mt-1">{course.courseDescription}</p>
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-2 gap-4 mb-4">
//                     <div className="bg-richblack-700/50 rounded-lg p-3">
//                       <div className="flex items-center text-richblack-200 text-sm mb-1"><FaClock className="mr-2"/>Duration</div>
//                       <div className="text-richblack-5 font-medium">{formatDuration(totalSeconds)}</div>
//                     </div>
//                     <div className="bg-richblack-700/50 rounded-lg p-3">
//                       <div className="flex items-center text-richblack-200 text-sm mb-1"><FaRupeeSign className="mr-2"/>Price</div>
//                       <div className="text-richblack-5 font-medium">₹{course.price}</div>
//                     </div>
//                     <div className="bg-richblack-700/50 rounded-lg p-3 col-span-2">
//                       <div className="text-richblack-200 text-sm mb-1">Students Enrolled</div>
//                       <div className="text-richblack-5 font-medium">{course.studentEnrolled.length} students</div>
//                     </div>
//                   </div>

//                   <div className="flex justify-between gap-3">
//                     <button onClick={() => navigate(`/dashboard/edit-course/${course._id}`)}
//                             className="flex-1 flex items-center justify-center gap-2 bg-richblack-700 hover:bg-richblack-600 text-richblack-5 py-2 rounded-lg">
//                       <FiEdit/><span>Edit</span>
//                     </button>
//                     <button onClick={() => handleDeleteCourse(course._id)}
//                             className="flex-1 flex items-center justify-center gap-2 bg-richblack-700 hover:bg-pink-900/50 text-pink-400 py-2 rounded-lg">
//                       <FiTrash2/><span>Delete</span>
//                     </button>
//                   </div>
//                 </motion.div>
//               );
//             })}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyCourses;

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchInstructorCourses } from '../../../services/operations/courseDetailsAPI';
import IconBtn from '../../common/IconBtn';
import { VscAdd } from 'react-icons/vsc';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { FaClock, FaRupeeSign } from 'react-icons/fa';
import { motion } from 'framer-motion';

const MyCourses = () => {
  const { token } = useSelector(state => state.auth);
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      const result = await fetchInstructorCourses(token);
      if (result) setCourses(result);
      setLoading(false);
    };
    fetchCourses();
  }, [token]);

  const calculateTotalDuration = (course) => {
    if (!course?.courseContent) return 0;
    
    return course.courseContent.reduce((total, section) => {
      if (!Array.isArray(section.subSection)) return total;
      
      const sectionDuration = section.subSection.reduce((sum, sub) => {
        const secs = parseInt(sub?.timeDuration, 10);
        return sum + (Number.isNaN(secs) ? 0 : secs);
      }, 0);
      
      return total + sectionDuration;
    }, 0);
  };

  const formatDuration = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    const parts = [];
    if (hrs) parts.push(`${hrs}h`);
    if (mins) parts.push(`${mins}m`);
    if (secs || parts.length === 0) parts.push(`${secs}s`);
    
    return parts.join(' ');
  };

  const handleDeleteCourse = courseId => {
    console.log('Deleting course:', courseId);
    setCourses(prev => prev.filter(c => c._id !== courseId));
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-50"></div>
    </div>
  );

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-2xl md:text-3xl font-bold text-richblack-5">
          My Courses
        </motion.h1>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <IconBtn text="Create New Course" onClick={() => navigate('/dashboard/add-course')}
                   customClasses="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700">
            <VscAdd className="text-lg" />
          </IconBtn>
        </motion.div>
      </div>

      {courses.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-richblack-800 to-richblack-900 p-8 py-16 text-center border border-richblack-700">
          <div className="bg-richblack-700 rounded-full p-5 mb-6">
            <VscAdd className="text-4xl text-yellow-50" />
          </div>
          <h2 className="text-2xl font-bold text-richblack-5 mb-3">Create Your First Course</h2>
          <p className="text-richblack-200 max-w-md mb-8">
            You haven't created any courses yet. Share your knowledge and start teaching today.
          </p>
          <IconBtn text="Create Course" onClick={() => navigate('/dashboard/add-course')}
                   customClasses="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700">
            <VscAdd />
          </IconBtn>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-richblack-700 shadow-xl">
          {/* Desktop Table */}
          <div className="hidden md:block">
            <div className="grid grid-cols-[3fr,1fr,1fr,1fr,1fr,120px] bg-gradient-to-r from-richblack-700 to-richblack-800 text-richblack-5 font-medium px-6 py-4">
              <div>Course Name</div>
              <div>Duration</div>
              <div>Price</div>
              <div>Students</div>
              <div>Status</div>
              <div>Actions</div>
            </div>
            <div className="divide-y divide-richblack-700">
              {courses.map((course, idx) => {
                const totalSeconds = calculateTotalDuration(course);
                const isPublished = course.status === 'Published';
                
                return (
                  <motion.div key={course._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}
                              className="grid grid-cols-[3fr,1fr,1fr,1fr,1fr,120px] items-center px-6 py-4 hover:bg-richblack-750 transition-colors">
                    <div className="flex items-center gap-4">
                      <img src={course.thumbnail} alt={course.courseName}
                           className="h-14 w-14 rounded-lg object-cover border border-richblack-600"/>
                      <div>
                        <p className="font-semibold text-richblack-5">{course.courseName}</p>
                        <p className="text-xs text-richblack-300 line-clamp-1">{course.courseDescription}</p>
                      </div>
                    </div>
                    <div className="flex items-center text-richblack-200"><FaClock className="mr-2 text-richblack-400"/>{formatDuration(totalSeconds)}</div>
                    <div className="flex items-center text-richblack-5 font-medium"><FaRupeeSign className="mr-1"/>{course.price}</div>
                    <div className="text-richblack-5">{course.studentEnrolled.length} students</div>
                    <div>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        isPublished 
                          ? 'bg-green-900/20 text-caribbeangreen-300' 
                          : 'bg-richblack-700 text-richblack-300'
                      }`}>
                        {course.status}
                      </span>
                    </div>
                    <div className="flex gap-3">
                      <button onClick={() => navigate(`/dashboard/edit-course/${course._id}`)}
                              className="p-2 rounded-full bg-richblack-700 hover:bg-richblack-600"><FiEdit className="text-xl text-richblack-100"/></button>
                      <button onClick={() => handleDeleteCourse(course._id)}
                              className="p-2 rounded-full bg-richblack-700 hover:bg-pink-900/50"><FiTrash2 className="text-xl text-pink-400"/></button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4 p-4">
            {courses.map((course, idx) => {
              const totalSeconds = calculateTotalDuration(course);
              const isPublished = course.status === 'Published';
              
              return (
                <motion.div key={course._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}
                            className="bg-gradient-to-br from-richblack-800 to-richblack-900 rounded-xl p-4 border border-richblack-700 shadow-lg">
                  <div className="flex gap-4 mb-4">
                    <img src={course.thumbnail} alt={course.courseName}
                         className="h-16 w-16 rounded-lg object-cover border border-richblack-600"/>
                    <div>
                      <h3 className="font-bold text-richblack-5">{course.courseName}</h3>
                      <p className="text-xs text-richblack-300 line-clamp-2 mt-1">{course.courseDescription}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="bg-richblack-700/50 rounded-lg p-3">
                      <div className="flex items-center text-richblack-200 text-sm mb-1"><FaClock className="mr-2"/>Duration</div>
                      <div className="text-richblack-5 font-medium">{formatDuration(totalSeconds)}</div>
                    </div>
                    <div className="bg-richblack-700/50 rounded-lg p-3">
                      <div className="flex items-center text-richblack-200 text-sm mb-1"><FaRupeeSign className="mr-2"/>Price</div>
                      <div className="text-richblack-5 font-medium">₹{course.price}</div>
                    </div>
                    <div className="bg-richblack-700/50 rounded-lg p-3">
                      <div className="text-richblack-200 text-sm mb-1">Status</div>
                      <div className={`text-xs font-medium ${
                        isPublished 
                          ? 'text-caribbeangreen-300' 
                          : 'text-richblack-300'
                      }`}>
                        {course.status}
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-richblack-700/50 rounded-lg p-3 mb-4">
                    <div className="text-richblack-200 text-sm mb-1">Students Enrolled</div>
                    <div className="text-richblack-5 font-medium">{course.studentEnrolled.length} students</div>
                  </div>

                  <div className="flex justify-between gap-3">
                    <button onClick={() => navigate(`/dashboard/edit-course/${course._id}`)}
                            className="flex-1 flex items-center justify-center gap-2 bg-richblack-700 hover:bg-richblack-600 text-richblack-5 py-2 rounded-lg">
                      <FiEdit/><span>Edit</span>
                    </button>
                    <button onClick={() => handleDeleteCourse(course._id)}
                            className="flex-1 flex items-center justify-center gap-2 bg-richblack-700 hover:bg-pink-900/50 text-pink-400 py-2 rounded-lg">
                      <FiTrash2/><span>Delete</span>
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCourses;