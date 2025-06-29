// // import React, { useEffect, useState } from 'react'
// // import { useSelector } from 'react-redux'
// // import { getInstructorData } from '../../../services/operations/profileAPI'
// // import { fetchInstructorCourses } from '../../../services/operations/courseDetailsAPI'
// // import InstructorChart from './InstructorDashboard/InstructorChart'
// // import { Link } from 'react-router-dom'

// // const Instructor = () => {

// //     const { token } = useSelector((state) => state.auth)
// //     const { user } = useSelector((state) => state.profile)
// //     const [loading, setLoading] = useState(false)
// //     const [instructorData , setInstructorData] = useState(null)
// //     const [courses, setCourses] = useState([])

// //     useEffect(() => {
// //         ;(async () => {
// //             setLoading(true)

// //             const instructorApiData = await getInstructorData(token)
// //             const result = await fetchInstructorCourses(token)
// //             console.log(instructorApiData)

// //             if(instructorApiData.length) setInstructorData(instructorApiData)

// //                 if(result){
// //                     setCourses(result)
// //                 }
// //                 setLoading(false)
// //         })()
// //     }, [])

// //     const totalAmount = instructorData?.reduce(
// //         (acc, curr) => acc + curr.totalAmountGenerated,
// //         0
// //     )

// //     const totalStudents = instructorData?.reduce(
// //         (acc , curr) => acc + curr.totalStudentsEnrolled,
// //         0
// //     )


// //   return (
// //     <div>
// //        <div className='space-y-2'>
// //         <h1 className='text-2xl font-bold text-richblack-5'>
// //             Hi {user?.firstName} 👋
// //         </h1>
// //         <p className='font-medium text-richblack-200'>
// //             Let's start something new
// //         </p>

// //        </div>

// //         {
// //             loading ? (
// //                 <div className='spinner'></div>
// //             ) : courses.length > 0 ? (
// //                 <div>
// //                     <div className='my-4 flex h-[450px] space-x-4'>
// //                         {
// //                             totalAmount > 0 || totalStudents > 0 ? (
// //                                 <InstructorChart courses={instructorData} />
// //                             ) : (
// //                                 <div className='flex-1 rounded-md bg-richblack-800 p-6'>
// //                                     <p className='text-lg font-bold text-richblack-5'>Visualize</p>
// //                                     <p className='mt-4 text-xl font-medium text-richblack-50'>
// //                                         Not Enough Data To Visualize
// //                                     </p>
// //                                 </div>
// //                             )
// //                         }

// //                         {/* total statics */}

// //                         <div className='flex min-w-[250px] flex-col rounded-md bg-richblack-800 p-6'>
// //                             <p className='text-lg font-bold text-richblack-5' >Statistics</p>

// //                             <div className='mt-4 space-y-4'>

// //                                 <div>
// //                                     <p className='text-lg text-richblack-200' >Total Courses</p>
// //                                     <p className='text-3xl font-semibold text-richblack-50'>
// //                                         {courses?.length}
// //                                     </p>
// //                                 </div>

// //                                 <div>
// //                                     <p className='text-lg text-richblack-200'>Total Students</p>
// //                                     <p className='text-3xl font-semibold text-richblack-50'>
// //                                         {totalStudents}
// //                                     </p>
// //                                 </div>

// //                                 <div>
// //                                     <p className='text-lg text-richblack-200'>Total Income</p>
// //                                     <p className='text-3xl font-semibold text-richblack-50'>
// //                                         Rs. {totalAmount}
// //                                     </p>
// //                                 </div>
                            
// //                             </div>


// //                         </div>

// //                     </div>

// //                     <div className='rounded-md bg-richblack-800 p-6'>
// //                         {/* render courses */}
// //                         <div className='flex items-center justify-between'>
// //                             <p className='text-lg font-bold text-richblack-5'>Your Courses</p>

// //                             <Link to="/dashboard/my-courses">
// //                               <p className='text-xs font-semibold text-yellow-50'>View All</p>
// //                             </Link>
// //                         </div>

// //                         <div className='my-4 flex items-start space-y-6'>

// //                             {
// //                                 courses.slice(0, 3).map((course) => (
// //                                     <div
// //                                      key={course._id}
// //                                      className='w-1/3'
// //                                     >

// //                                         <img src={course.thumbnail}
// //                                          alt={course.courseName}
// //                                          className='h-[201px] w-full rounded-md object-cover'
// //                                          />

// //                                          <div className='mt-3 w-full'>
// //                                             <p className='text-sm font-medium text-richblack-50'>
// //                                                 {course.courseName}
// //                                             </p>

// //                                             <div className='mt-1 flex items-center space-y-2'>
// //                                                 <p className='text-xs font-medium text-richblack-300'>
// //                                                     {course.studentEnrolled.length} Students
// //                                                 </p>

// //                                                 <p className='text-xs font-medium text-richblack-300'>
// //                                                     |
// //                                                 </p>

// //                                                 <p className='text-xs font-medium text-richblack-300'>
// //                                                     Rs. {course.price}
// //                                                 </p>
// //                                             </div>

// //                                          </div>

// //                                     </div>

// //                                 ))
// //                             }

// //                         </div>








// //                     </div>
// //                 </div>
// //             ) : (
// //                 <div className='mt-20 rounded-md bg-richblack-800 p-6 py-20'>
// //                     <p className='text-center text-2xl font-bold text-richblack-5'>
// //                         You have not created any courses yet
// //                     </p>

// //                     <Link to="/dashboard/add-course">
// //                         <p className='mt-1 text-center text-lg font-semibold text-yellow-50'>
// //                             Create a course
// //                         </p>
// //                     </Link>
// //                 </div>
// //             )
// //         }

// //     </div>
// //   )
// // }

// // export default Instructor

// // import { useEffect, useState } from "react"
// // import { useSelector } from "react-redux"
// // import { Link } from "react-router-dom"

// // import { fetchInstructorCourses } from "../../../services/operations/courseDetailsAPI"
// // import { getInstructorData } from "../../../services/operations/profileAPI"
// // import InstructorChart from "./InstructorDashboard/InstructorChart"

// // export default function Instructor() {
// //   const { token } = useSelector((state) => state.auth)
// //   const { user } = useSelector((state) => state.profile)
// //   const [loading, setLoading] = useState(false)
// //   const [instructorData, setInstructorData] = useState(null)
// //   const [courses, setCourses] = useState([])

// //   useEffect(() => {
// //     ;(async () => {
// //       setLoading(true)
// //       const instructorApiData = await getInstructorData(token)
// //       const result = await fetchInstructorCourses(token)
// //       console.log(instructorApiData)
// //       if (instructorApiData.length) setInstructorData(instructorApiData)
// //       if (result) {
// //         setCourses(result)
// //       }
// //       setLoading(false)
// //     })()
// //   }, [])

// //   const totalAmount = instructorData?.reduce(
// //     (acc, curr) => acc + curr.totalAmountGenerated,
// //     0
// //   )

// //   const totalStudents = instructorData?.reduce(
// //     (acc, curr) => acc + curr.totalStudentsEnrolled,
// //     0
// //   )

// //   return (
// //     <div>
// //       <div className="space-y-2">
// //         <h1 className="text-2xl font-bold text-richblack-5">
// //           Hi {user?.firstName} 👋
// //         </h1>
// //         <p className="font-medium text-richblack-200">
// //           Let's start something new
// //         </p>
// //       </div>

// //       {loading ? (
// //         <div className="spinner"></div>
// //       ) : courses.length > 0 ? (
// //         <div>
// //           <div className="my-4 flex h-[450px] space-x-4">
// //             {/* Render chart / graph */}
// //             {totalAmount > 0 || totalStudents > 0 ? (
// //               <InstructorChart courses={instructorData} />
// //             ) : (
// //               <div className="flex-1 rounded-md bg-richblack-800 p-6">
// //                 <p className="text-lg font-bold text-richblack-5">Visualize</p>
// //                 <p className="mt-4 text-xl font-medium text-richblack-50">
// //                   Not Enough Data To Visualize
// //                 </p>
// //               </div>
// //             )}
// //             {/* Total Statistics */}
// //             <div className="flex min-w-[250px] flex-col rounded-md bg-richblack-800 p-6">
// //               <p className="text-lg font-bold text-richblack-5">Statistics</p>
// //               <div className="mt-4 space-y-4">
// //                 <div>
// //                   <p className="text-lg text-richblack-200">Total Courses</p>
// //                   <p className="text-3xl font-semibold text-richblack-50">
// //                     {courses.length}
// //                   </p>
// //                 </div>
// //                 <div>
// //                   <p className="text-lg text-richblack-200">Total Students</p>
// //                   <p className="text-3xl font-semibold text-richblack-50">
// //                     {totalStudents}
// //                   </p>
// //                 </div>
// //                 <div>
// //                   <p className="text-lg text-richblack-200">Total Income</p>
// //                   <p className="text-3xl font-semibold text-richblack-50">
// //                     Rs. {totalAmount}
// //                   </p>
// //                 </div>
// //               </div>
// //             </div>


// //           </div>
// //           <div className="rounded-md bg-richblack-800 p-6">
// //             {/* Render 3 courses */}
// //             <div className="flex items-center justify-between">
// //               <p className="text-lg font-bold text-richblack-5">Your Courses</p>
// //               <Link to="/dashboard/my-courses">
// //                 <p className="text-xs font-semibold text-yellow-50">View All</p>
// //               </Link>
// //             </div>


// //             <div className="my-4 flex items-start space-x-6">
// //               {courses.slice(0, 3).map((course) => (
// //                 <div key={course._id} className="w-1/3">
// //                   <img
// //                     src={course.thumbnail}
// //                     alt={course.courseName}
// //                     className="h-[201px] w-full rounded-md object-cover"
// //                   />
// //                   <div className="mt-3 w-full">
// //                     <p className="text-sm font-medium text-richblack-50">
// //                       {course.courseName}
// //                     </p>
// //                     <div className="mt-1 flex items-center space-x-2">
// //                       <p className="text-xs font-medium text-richblack-300">
// //                         {course.studentEnrolled.length} students
// //                       </p>
// //                       <p className="text-xs font-medium text-richblack-300">
// //                         |
// //                       </p>
// //                       <p className="text-xs font-medium text-richblack-300">
// //                         Rs. {course.price}
// //                       </p>
// //                     </div>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>

            
// //           </div>
// //         </div>
// //       ) : (
// //         <div className="mt-20 rounded-md bg-richblack-800 p-6 py-20">
// //           <p className="text-center text-2xl font-bold text-richblack-5">
// //             You have not created any courses yet
// //           </p>
// //           <Link to="/dashboard/add-course">
// //             <p className="mt-1 text-center text-lg font-semibold text-yellow-50">
// //               Create a course
// //             </p>
// //           </Link>
// //         </div>
// //       )}
// //     </div>
// //   )
// // }

// // import { useEffect, useState } from "react"
// // import { useSelector } from "react-redux"
// // import { Link } from "react-router-dom"
// // import { FaDollarSign, FaGraduationCap, FaBook, FaChartLine, FaArrowRight } from "react-icons/fa"
// // import { fetchInstructorCourses } from "../../../services/operations/courseDetailsAPI"
// // import { getInstructorData } from "../../../services/operations/profileAPI"
// // import InstructorChart from "./InstructorDashboard/InstructorChart"
// // import { motion } from "framer-motion"

// // export default function Instructor() {
// //   const { token } = useSelector((state) => state.auth)
// //   const { user } = useSelector((state) => state.profile)
// //   const [loading, setLoading] = useState(false)
// //   const [instructorData, setInstructorData] = useState(null)
// //   const [courses, setCourses] = useState([])

// //   useEffect(() => {
// //     ;(async () => {
// //       setLoading(true)
// //       const instructorApiData = await getInstructorData(token)
// //       const result = await fetchInstructorCourses(token)
// //       if (instructorApiData.length) setInstructorData(instructorApiData)
// //       if (result) setCourses(result)
// //       setLoading(false)
// //     })()
// //   }, [])

// //   const totalAmount = instructorData?.reduce(
// //     (acc, curr) => acc + curr.totalAmountGenerated,
// //     0
// //   )

// //   const totalStudents = instructorData?.reduce(
// //     (acc, curr) => acc + curr.totalStudentsEnrolled,
// //     0
// //   )

// //   return (
// //     <div className="p-4 md:p-6">
// //       <motion.div 
// //         initial={{ opacity: 0, y: 20 }}
// //         animate={{ opacity: 1, y: 0 }}
// //         transition={{ duration: 0.5 }}
// //         className="space-y-2 mb-8"
// //       >
// //         <h1 className="text-2xl md:text-3xl font-bold text-richblack-5">
// //           Hi {user?.firstName} 👋
// //         </h1>
// //         <p className="font-medium text-richblack-200">
// //           Let's start something new
// //         </p>
// //       </motion.div>

// //       {loading ? (
// //         <div className="flex justify-center items-center h-64">
// //           <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-yellow-50"></div>
// //         </div>
// //       ) : courses.length > 0 ? (
// //         <div className="space-y-8">
// //           {/* Stats and Chart Section */}
// //           <div className="flex flex-col lg:flex-row gap-6">
// //             {/* Chart */}
// //             <div className="flex-1 rounded-2xl bg-gradient-to-br from-richblack-800 to-richblack-900 p-6 shadow-xl border border-richblack-700">
// //               <div className="flex items-center gap-3 mb-6">
// //                 <FaChartLine className="text-xl text-cyan-300" />
// //                 <h2 className="text-xl font-bold text-richblack-5">Performance Overview</h2>
// //               </div>
              
// //               {totalAmount > 0 || totalStudents > 0 ? (
// //                 <div className="h-72 md:h-80">
// //                   <InstructorChart courses={instructorData} />
// //                 </div>
// //               ) : (
// //                 <div className="flex flex-col items-center justify-center h-64 text-center">
// //                   <div className="bg-richblack-700 rounded-full p-4 mb-4">
// //                     <FaChartLine className="text-4xl text-richblack-300" />
// //                   </div>
// //                   <p className="text-xl font-medium text-richblack-50 mb-2">
// //                     Not Enough Data To Visualize
// //                   </p>
// //                   <p className="text-richblack-300 max-w-md">
// //                     Your performance data will appear here once you have more student enrollments and course activity.
// //                   </p>
// //                 </div>
// //               )}
// //             </div>
            
// //             {/* Statistics Card */}
// //             <div className="w-full lg:w-[350px] rounded-2xl bg-gradient-to-br from-richblack-800 to-richblack-900 p-6 shadow-xl border border-richblack-700">
// //               <h2 className="text-xl font-bold text-richblack-5 mb-6">Your Impact</h2>
// //               <div className="space-y-5">
// //                 <motion.div 
// //                   whileHover={{ scale: 1.03 }}
// //                   className="bg-richblack-700/50 hover:bg-richblack-700 rounded-xl p-4 transition-all duration-300"
// //                 >
// //                   <div className="flex items-center gap-3">
// //                     <div className="bg-cyan-900/30 p-3 rounded-lg">
// //                       <FaBook className="text-cyan-300 text-xl" />
// //                     </div>
// //                     <div>
// //                       <p className="text-richblack-200">Total Courses</p>
// //                       <p className="text-2xl md:text-3xl font-bold text-cyan-300">
// //                         {courses.length}
// //                       </p>
// //                     </div>
// //                   </div>
// //                 </motion.div>
                
// //                 <motion.div 
// //                   whileHover={{ scale: 1.03 }}
// //                   className="bg-richblack-700/50 hover:bg-richblack-700 rounded-xl p-4 transition-all duration-300"
// //                 >
// //                   <div className="flex items-center gap-3">
// //                     <div className="bg-yellow-900/30 p-3 rounded-lg">
// //                       <FaGraduationCap className="text-yellow-300 text-xl" />
// //                     </div>
// //                     <div>
// //                       <p className="text-richblack-200">Total Students</p>
// //                       <p className="text-2xl md:text-3xl font-bold text-yellow-300">
// //                         {totalStudents}
// //                       </p>
// //                     </div>
// //                   </div>
// //                 </motion.div>
                
// //                 <motion.div 
// //                   whileHover={{ scale: 1.03 }}
// //                   className="bg-richblack-700/50 hover:bg-richblack-700 rounded-xl p-4 transition-all duration-300"
// //                 >
// //                   <div className="flex items-center gap-3">
// //                     <div className="bg-green-900/30 p-3 rounded-lg">
// //                       <FaDollarSign className="text-green-300 text-xl" />
// //                     </div>
// //                     <div>
// //                       <p className="text-richblack-200">Total Income</p>
// //                       <p className="text-2xl md:text-3xl font-bold text-green-300">
// //                         ₹{totalAmount}
// //                       </p>
// //                     </div>
// //                   </div>
// //                 </motion.div>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Courses Section */}
// //           <motion.div 
// //             initial={{ opacity: 0 }}
// //             animate={{ opacity: 1 }}
// //             transition={{ delay: 0.2, duration: 0.5 }}
// //             className="rounded-2xl bg-gradient-to-br from-richblack-800 to-richblack-900 p-6 shadow-xl border border-richblack-700"
// //           >
// //             <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
// //               <div className="flex items-center gap-3 mb-4 md:mb-0">
// //                 <div className="bg-yellow-900/30 p-2 rounded-lg">
// //                   <FaBook className="text-yellow-300" />
// //                 </div>
// //                 <h2 className="text-xl font-bold text-richblack-5">Your Courses</h2>
// //               </div>
              
// //               <Link to="/dashboard/my-courses">
// //                 <div className="flex items-center gap-2 group">
// //                   <span className="text-sm font-semibold text-yellow-50 group-hover:text-yellow-100 transition-colors">
// //                     View All
// //                   </span>
// //                   <FaArrowRight className="text-yellow-50 group-hover:text-yellow-100 group-hover:translate-x-1 transition-all" />
// //                 </div>
// //               </Link>
// //             </div>

// //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //               {courses.slice(0, 3).map((course) => (
// //                 <motion.div
// //                   key={course._id}
// //                   whileHover={{ y: -5 }}
// //                   className="bg-richblack-700/50 hover:bg-richblack-700 rounded-xl overflow-hidden border border-richblack-600 transition-all duration-300 group"
// //                 >
// //                   <div className="relative">
// //                     <img
// //                       src={course.thumbnail}
// //                       alt={course.courseName}
// //                       className="w-full h-48 object-cover"
// //                     />
// //                     <div className="absolute inset-0 bg-gradient-to-t from-richblack-900 to-transparent"></div>
// //                   </div>
                  
// //                   <div className="p-4">
// //                     <h3 className="font-bold text-richblack-5 group-hover:text-yellow-50 transition-colors line-clamp-1">
// //                       {course.courseName}
// //                     </h3>
                    
// //                     <div className="flex justify-between items-center mt-4">
// //                       <div className="flex items-center gap-2 text-richblack-300 text-sm">
// //                         <FaGraduationCap />
// //                         <span>{course.studentEnrolled.length} students</span>
// //                       </div>
                      
// //                       <div className="text-lg font-bold text-yellow-50">
// //                         ₹{course.price}
// //                       </div>
// //                     </div>
                    
// //                     <Link 
// //                       to={`/dashboard/edit-course/${course._id}`}
// //                       className="mt-4 block text-center bg-richblack-600 hover:bg-richblack-500 text-richblack-5 py-2 rounded-lg transition-colors duration-300"
// //                     >
// //                       Manage Course
// //                     </Link>
// //                   </div>
// //                 </motion.div>
// //               ))}
// //             </div>
// //           </motion.div>
// //         </div>
// //       ) : (
// //         <motion.div 
// //           initial={{ opacity: 0, scale: 0.9 }}
// //           animate={{ opacity: 1, scale: 1 }}
// //           className="flex flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-richblack-800 to-richblack-900 p-8 py-16 text-center border border-richblack-700"
// //         >
// //           <div className="bg-richblack-700 rounded-full p-6 mb-6">
// //             <FaBook className="text-5xl text-yellow-50" />
// //           </div>
// //           <h2 className="text-2xl font-bold text-richblack-5 mb-3">
// //             Your Teaching Journey Begins Here
// //           </h2>
// //           <p className="text-richblack-200 max-w-md mb-8">
// //             You haven't created any courses yet. Share your knowledge and start inspiring students today.
// //           </p>
// //           <Link to="/dashboard/add-course">
// //             <motion.button
// //               whileHover={{ scale: 1.05 }}
// //               whileTap={{ scale: 0.95 }}
// //               className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-richblack-900 font-bold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all"
// //             >
// //               Create Your First Course
// //             </motion.button>
// //           </Link>
// //         </motion.div>
// //       )}
// //     </div>
// //   )
// // }

import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { FaDollarSign, FaGraduationCap, FaBook, FaChartLine, FaArrowRight } from "react-icons/fa"
import { FaIndianRupeeSign } from "react-icons/fa6";

import { fetchInstructorCourses } from "../../../services/operations/courseDetailsAPI"
import { getInstructorData } from "../../../services/operations/profileAPI"
import InstructorChart from "./InstructorDashboard/InstructorChart"
import { motion } from "framer-motion"
import { ErrorBoundary } from "react-error-boundary"

// Error fallback component for chart
const ChartErrorFallback = () => (
  <div className="flex flex-col items-center justify-center h-64 text-center">
    <div className="bg-richblack-700 rounded-full p-4 mb-4">
      <FaChartLine className="text-4xl text-richblack-300" />
    </div>
    <p className="text-xl font-medium text-richblack-50 mb-2">
      Chart Failed to Load
    </p>
    <p className="text-richblack-300 max-w-md">
      We're having trouble displaying the performance chart. Please try refreshing the page.
    </p>
  </div>
)

export default function Instructor() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const [loading, setLoading] = useState(false)
  const [instructorData, setInstructorData] = useState(null)
  const [courses, setCourses] = useState([])

  useEffect(() => {
    let isMounted = true;
    
    const fetchData = async () => {
      setLoading(true)
      try {
        const [instructorApiData, result] = await Promise.all([
          getInstructorData(token),
          fetchInstructorCourses(token)
        ]);
        
        if (isMounted) {
          if (instructorApiData.length) setInstructorData(instructorApiData)
          if (result) setCourses(result)
        }
      } catch (error) {
        console.error("Error fetching instructor data:", error)
      } finally {
        if (isMounted) setLoading(false)
      }
    }
    
    fetchData()
    
    return () => {
      isMounted = false;
    }
  }, [token])

  const totalAmount = instructorData?.reduce(
    (acc, curr) => acc + curr.totalAmountGenerated,
    0
  ) || 0

  const totalStudents = instructorData?.reduce(
    (acc, curr) => acc + curr.totalStudentsEnrolled,
    0
  ) || 0

  return (
    <div className="p-4 md:p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-2 mb-8"
      >
        <h1 className="text-2xl md:text-3xl font-bold text-richblack-5">
          Hi {user?.firstName} 👋
        </h1>
        <p className="font-medium text-richblack-200">
          Let's start something new
        </p>
      </motion.div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-yellow-50"></div>
        </div>
      ) : courses.length > 0 ? (
        <div className="space-y-8 text-white">
          {/* Stats and Chart Section */}
          <div className="flex flex-col lg:flex-row gap-6 text-white">
            {/* Chart */}
            <div className="flex-1 rounded-2xl bg-gradient-to-br from-richblack-800 to-richblack-900 p-6 shadow-xl border border-richblack-700">
              <div className="flex items-center gap-3 mb-6">
                <FaChartLine className="text-xl text-cyan-300" />
                <h2 className="text-xl font-bold text-richblack-5">Performance Overview</h2>
              </div>
              
              {/* Wrap chart in ErrorBoundary */}
              <ErrorBoundary FallbackComponent={ChartErrorFallback}>
                {totalAmount > 0 || totalStudents > 0 ? (
                  <div className="h-72 md:h-80 text-white">
                    <InstructorChart 
                      courses={instructorData} 
                      key={`chart-${instructorData?.length || 0}`} 
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-64 text-center">
                    <div className="bg-richblack-700 rounded-full p-4 mb-4">
                      <FaChartLine className="text-4xl text-richblack-300" />
                    </div>
                    <p className="text-xl font-medium text-richblack-50 mb-2">
                      Not Enough Data To Visualize
                    </p>
                    <p className="text-richblack-300 max-w-md">
                      Your performance data will appear here once you have more student enrollments and course activity.
                    </p>
                  </div>
                )}
              </ErrorBoundary>
            </div>
            
            {/* Statistics Card */}
            <div className="w-full lg:w-[350px] rounded-2xl bg-gradient-to-br from-richblack-800 to-richblack-900 p-6 shadow-xl border border-richblack-700">
              <h2 className="text-xl font-bold text-richblack-5 mb-6">Your Impact</h2>
              <div className="space-y-5">
                <motion.div 
                  whileHover={{ scale: 1.03 }}
                  className="bg-richblack-700/50 hover:bg-richblack-700 rounded-xl p-4 transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-cyan-900/30 p-3 rounded-lg">
                      <FaBook size={38} className="text-cyan-300 text-xl" />
                    </div>
                    <div>
                      <p className="text-richblack-200">Total Courses</p>
                      <p className="text-2xl md:text-3xl font-bold text-yellow-300">
                        {courses.length}
                      </p>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  whileHover={{ scale: 1.03 }}
                  className="bg-richblack-700/50 hover:bg-richblack-700 rounded-xl p-4 transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-yellow-900/30 p-3 rounded-lg">
                      <FaGraduationCap size={38} className="text-yellow-300 text-xl" />
                    </div>
                    <div>
                      <p className="text-richblack-200">Total Students</p>
                      <p className="text-2xl md:text-3xl font-bold text-yellow-300">
                        {totalStudents}
                      </p>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  whileHover={{ scale: 1.03 }}
                  className="bg-richblack-700/50 hover:bg-richblack-700 rounded-xl p-4 transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-green-900/30 p-3 rounded-lg">
                      <FaIndianRupeeSign size={38} className="text-green-300 text-xl" />
                    </div>
                    <div>
                      <p className="text-richblack-200">Total Income</p>
                      <p className="text-2xl md:text-3xl font-bold text-yellow-300">
                        ₹{totalAmount.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Courses Section */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="rounded-2xl bg-gradient-to-br from-richblack-800 to-richblack-900 p-6 shadow-xl border border-richblack-700"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <div className="flex items-center gap-3 mb-4 md:mb-0">
                <div className="bg-yellow-900/30 p-2 rounded-lg">
                  <FaBook className="text-yellow-300" />
                </div>
                <h2 className="text-xl font-bold text-richblack-5">Your Courses</h2>
              </div>
              
              <Link to="/dashboard/my-courses">
                <div className="flex items-center gap-2 group">
                  <span className="text-sm font-semibold text-yellow-50 group-hover:text-yellow-100 transition-colors">
                    View All
                  </span>
                  <FaArrowRight className="text-yellow-50 group-hover:text-yellow-100 group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.slice(0, 3).map((course) => (
                <motion.div
                  key={course._id}
                  whileHover={{ y: -5 }}
                  className="bg-richblack-700/50 hover:bg-richblack-700 rounded-xl overflow-hidden border border-richblack-600 transition-all duration-300 group"
                >
                  <div className="relative">
                    <img
                      src={course.thumbnail}
                      alt={course.courseName}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-richblack-900 to-transparent"></div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-bold text-richblack-5 group-hover:text-yellow-50 transition-colors line-clamp-1">
                      {course.courseName}
                    </h3>
                    
                    <div className="flex justify-between items-center mt-4">
                      <div className="flex items-center gap-2 text-richblack-300 text-sm">
                        <FaGraduationCap />
                        <span>{course.studentEnrolled.length} students</span>
                      </div>
                      
                      <div className="text-lg font-bold text-yellow-50">
                        ₹{course.price.toLocaleString()}
                      </div>
                    </div>
                    
                    <Link 
                      to={`/dashboard/edit-course/${course._id}`}
                      className="mt-4 block text-center bg-richblack-600 hover:bg-richblack-500 text-richblack-5 py-2 rounded-lg transition-colors duration-300"
                    >
                      Manage Course
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-richblack-800 to-richblack-900 p-8 py-16 text-center border border-richblack-700"
        >
          <div className="bg-richblack-700 rounded-full p-6 mb-6">
            <FaBook className="text-5xl text-yellow-50" />
          </div>
          <h2 className="text-2xl font-bold text-richblack-5 mb-3">
            Your Teaching Journey Begins Here
          </h2>
          <p className="text-richblack-200 max-w-md mb-8">
            You haven't created any courses yet. Share your knowledge and start inspiring students today.
          </p>
          <Link to="/dashboard/add-course">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              Create Your First Course
            </motion.button>
          </Link>
        </motion.div>
      )}
    </div>
  )
}


