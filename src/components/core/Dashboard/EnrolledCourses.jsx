import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getUserEnrolledCourses } from '../../../services/operations/profileAPI'
import ProgressBar from '@ramonak/react-progress-bar'

const EnrolledCourses = () => {

  const { token } = useSelector((state) => state.auth)

  const navigate = useNavigate()

  const [enrolledCourses , setEnrolledCourses] = useState([])

  console.log("corse duration ")

  useEffect(() => {
    ;(async () => {
      try{
        const res = await getUserEnrolledCourses(token)

        const filterPublishCourse = res.filter((ele) => ele.status !== "Draft")
        
        setEnrolledCourses(filterPublishCourse)
      
      } 
      catch(error){
        console.log("Could not fetch enrolled coursees")
      }
    })()
  } ,[])

  return (
    <div>
        <div className='text-3xl text-richblack-50'>Enrolled Courses</div>

        {
          !enrolledCourses ? (
            <div className='grid min-h-[calc(100vh-3.5rem)] place-items-center'>
              <div className='spinner'></div>
            </div>
          ) : !enrolledCourses?.length ? (
            <p className='grid h-[10vh] w-full place-content-center text-richblack-5'>
              You have not enrolled in any course yet
            </p>
          ) : (
            <div className='my-8 text-richblack-5'>

              {/* //section_heading */}

              <div className='flex rounded-t-lg bg-richblack-500'>
                <p className='w-[45%] px-5 py-3'>Course Name</p>
                <p className='w-1/4 px-2 py-3'>Duration</p>
                <p className='flex-1 px-2 py-3'>Progress</p>
              </div>

              {/*  course name */}

              {
                enrolledCourses.map((course , i ,arr) => (
                  <div
                   className={`flex items-center border border-richblack-700
                     ${ i=== arr.length - 1 ? "rounded-b-lg" : "rounded-none"}
                    `}
                    key={i}
                    
                  >
                    <div
                     className='flex w-[45%] cursor-pointer items-center gap-4 px-5 py-3'
                      onClick={() => {
                        navigate(
                          
                       `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                        )
                      }}
                    
                    >

                      <img src={course.thumbnail} alt="course_img" 
                       className='h-14 w-14 rounded-lg object-cover'
                      />

                      <div className='flex max-w-xs flex-col gap-2'>
                        <p className='font-semibold'>{course.courseName}</p>
                        <p className='text-xs text-richblack-300'>
                          {
                            course.courseDescription?.length > 50
                            ? `${course.courseDescription.slice(0, 50)}...`
                            : course.courseDescription
                          }
                        </p>
                      </div>


                    </div>

                    <div className='w-1/4 px-2 py-3'>{course?.totalDuration}</div>
                    <div className='flex w-1/5 flex-col gap-2 px-2 py-3'>
                      <p>Progress: {course.progressPercentage || 0} %</p>
                      <ProgressBar 
                      completed={course.progressPercentage || 0}
                       height="8px"
                      isLabelVisible={false}
                      />
                    </div>

                  </div>
                ))
              }
            </div>
          )
        }
    
    </div>
  )
}

export default EnrolledCourses


// import React, { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
// import { getUserEnrolledCourses } from '../../../services/operations/profileAPI'
// import ProgressBar from '@ramonak/react-progress-bar'
// import { FaClock, FaPlayCircle, FaCertificate } from 'react-icons/fa'

// const EnrolledCourses = () => {
//   const { token } = useSelector((state) => state.auth)
//   const navigate = useNavigate()
//   const [enrolledCourses, setEnrolledCourses] = useState(null)
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     const fetchEnrolledCourses = async () => {
//       try {
//         setLoading(true)
//         const res = await getUserEnrolledCourses(token)
//         const filterPublishCourse = res.filter((ele) => ele.status !== "Draft")
//         setEnrolledCourses(filterPublishCourse)
//       } catch (error) {
//         console.log("Could not fetch enrolled courses", error)
//       } finally {
//         setLoading(false)
//       }
//     }
//     fetchEnrolledCourses()
//   }, [token])

//   // Function to convert seconds to hours and minutes
//   const formatDuration = (seconds) => {
//     if (!seconds) return "0h 0m"
//     const hours = Math.floor(seconds / 3600)
//     const minutes = Math.floor((seconds % 3600) / 60)
//     return `${hours}h ${minutes}m`
//   }

//   if (loading) {
//     return (
//       <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
//         <div className="flex flex-col items-center">
//           <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-yellow-50 mb-4"></div>
//           <p className="text-richblack-100">Loading your learning journey...</p>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="p-4 md:p-6 max-w-7xl mx-auto">
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
//         <h1 className="text-3xl md:text-4xl font-bold text-richblack-5 mb-4 md:mb-0">
//           My Learning Journey
//         </h1>
//         {enrolledCourses?.length > 0 && (
//           <div className="flex gap-3">
//             <div className="bg-richblack-800 px-4 py-2 rounded-lg flex items-center">
//               <FaCertificate className="text-yellow-50 mr-2" />
//               <span className="text-richblack-5">{enrolledCourses.length} Courses</span>
//             </div>
//           </div>
//         )}
//       </div>

//       {!enrolledCourses?.length ? (
//         <div className="grid place-items-center min-h-[50vh]">
//           <div className="text-center max-w-md">
//             <div className="mx-auto bg-gradient-to-br from-richblack-800 to-richblack-900 rounded-full w-24 h-24 flex items-center justify-center mb-4 border-2 border-dashed border-richblack-600">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-richblack-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
//               </svg>
//             </div>
//             <h3 className="text-2xl font-medium text-richblack-5 mb-2">Your Learning Path Awaits</h3>
//             <p className="text-richblack-200 mb-6">
//               You haven't enrolled in any courses yet. Discover new skills and start your learning journey today.
//             </p>
//             <button
//               onClick={() => navigate("/catalog/all")}
//               className="relative bg-gradient-to-r from-yellow-400 to-yellow-600 text-richblack-900 font-bold py-3 px-6 rounded-lg overflow-hidden group"
//             >
//               <span className="relative z-10">Explore Courses</span>
//               <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-yellow-700 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
//             </button>
//           </div>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Desktop Table View */}
//           <div className="lg:col-span-3 hidden lg:block">
//             <div className="bg-richblack-800 rounded-xl overflow-hidden shadow-2xl">
//               {/* Table Header */}
//               <div className="grid grid-cols-[45%,15%,40%] bg-gradient-to-r from-richblack-700 to-richblack-800 text-richblack-50 font-medium px-6 py-4">
//                 <p>Course Name</p>
//                 <p>Duration</p>
//                 <p>Progress</p>
//               </div>

//               {/* Course Items */}
//               <div className="divide-y divide-richblack-700">
//                 {enrolledCourses.map((course, index) => (
//                   <div
//                     key={index}
//                     className="grid grid-cols-[45%,15%,40%] items-center px-6 py-4 hover:bg-richblack-750 transition-all duration-200 cursor-pointer group"
//                     onClick={() => navigate(
//                       `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
//                     )}
//                   >
//                     {/* Course Info */}
//                     <div className="flex items-center gap-4">
//                       <div className="relative">
//                         <img 
//                           src={course.thumbnail} 
//                           alt="course_img" 
//                           className="h-16 w-16 rounded-xl object-cover border-2 border-richblack-600 group-hover:border-yellow-50 transition-colors"
//                         />
//                         <div className="absolute inset-0 bg-gradient-to-t from-richblack-900 to-transparent opacity-70 rounded-xl"></div>
//                       </div>
//                       <div>
//                         <p className="font-semibold text-richblack-5 group-hover:text-yellow-50 transition-colors">
//                           {course.courseName}
//                         </p>
//                         <p className="text-xs text-richblack-300 line-clamp-1">
//                           {course.courseDescription}
//                         </p>
//                       </div>
//                     </div>

//                     {/* Duration */}
//                     <div className="flex items-center text-richblack-25 font-medium">
//                       <FaClock className="mr-2 text-richblack-400" />
//                       {formatDuration(course?.totalDuration)}
//                     </div>

//                     {/* Progress */}
//                     <div className="flex flex-col gap-2">
//                       <div className="flex justify-between items-center">
//                         <span className="text-sm text-richblack-25">
//                           {course.progressPercentage || 0}% Complete
//                         </span>
//                         <button 
//                           onClick={(e) => {
//                             e.stopPropagation()
//                             navigate(`/view-course/${course?._id}`)
//                           }}
//                           className="flex items-center bg-richblack-600 text-yellow-50 px-3 py-1 rounded-lg hover:bg-richblack-500 transition-colors group/button"
//                         >
//                           <span>Continue</span>
//                           <FaPlayCircle className="ml-2 text-yellow-50 group-hover/button:text-yellow-100 transition-colors" />
//                         </button>
//                       </div>
//                       <div className="relative pt-1">
//                         <div className="flex h-2 overflow-hidden text-xs bg-richblack-700 rounded-full">
//                           <div 
//                             style={{ width: `${course.progressPercentage || 0}%` }}
//                             className="flex flex-col justify-center bg-gradient-to-r from-cyan-400 to-cyan-600 shadow-none whitespace-nowrap"
//                           ></div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Mobile Card View */}
//           <div className="lg:hidden space-y-6">
//             {enrolledCourses.map((course, index) => (
//               <div 
//                 key={index}
//                 className="bg-richblack-800 rounded-2xl overflow-hidden shadow-2xl border border-richblack-700 transition-all duration-300 hover:shadow-cyan-500/20"
//                 onClick={() => navigate(
//                   `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
//                 )}
//               >
//                 <div className="relative">
//                   <img 
//                     src={course.thumbnail} 
//                     alt={course.courseName} 
//                     className="w-full h-48 object-cover"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-richblack-900 to-transparent"></div>
//                   <div className="absolute bottom-4 left-4">
//                     <h3 className="text-xl font-bold text-richblack-5">{course.courseName}</h3>
//                   </div>
//                 </div>
                
//                 <div className="p-5">
//                   <p className="text-richblack-200 text-sm mb-4 line-clamp-2">
//                     {course.courseDescription}
//                   </p>
                  
//                   <div className="flex justify-between items-center mb-3">
//                     <div className="flex items-center text-richblack-25">
//                       <FaClock className="mr-2 text-richblack-400" />
//                       <span>{formatDuration(course?.totalDuration)}</span>
//                     </div>
                    
//                     <span className="text-cyan-300 font-medium">
//                       {course.progressPercentage || 0}% Complete
//                     </span>
//                   </div>
                  
//                   <div className="relative pt-1 mb-6">
//                     <div className="flex h-2 overflow-hidden text-xs bg-richblack-700 rounded-full">
//                       <div 
//                         style={{ width: `${course.progressPercentage || 0}%` }}
//                         className="flex flex-col justify-center bg-gradient-to-r from-cyan-400 to-cyan-600 shadow-none whitespace-nowrap"
//                       ></div>
//                     </div>
//                   </div>
                  
//                   <button 
//                     onClick={(e) => {
//                       e.stopPropagation()
//                       navigate(`/view-course/${course?._id}`)
//                     }}
//                     className="w-full flex items-center justify-center bg-gradient-to-r from-cyan-600 to-cyan-800 text-richblack-5 py-3 px-4 rounded-lg hover:from-cyan-700 hover:to-cyan-900 transition-all duration-300"
//                   >
//                     <FaPlayCircle className="mr-2 text-xl" />
//                     Continue Learning
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
      
//       {/* Stats Section */}
//       {enrolledCourses?.length > 0 && (
//         <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
//           <div className="bg-gradient-to-br from-richblack-800 to-richblack-900 rounded-2xl p-5 border border-richblack-700">
//             <div className="text-3xl font-bold text-cyan-300 mb-2">
//               {enrolledCourses.length}
//             </div>
//             <div className="text-richblack-200">Courses Enrolled</div>
//           </div>
          
//           <div className="bg-gradient-to-br from-richblack-800 to-richblack-900 rounded-2xl p-5 border border-richblack-700">
//             <div className="text-3xl font-bold text-cyan-300 mb-2">
//               {enrolledCourses.reduce((acc, course) => acc + (course.progressPercentage === 100 ? 1 : 0), 0)}
//             </div>
//             <div className="text-richblack-200">Courses Completed</div>
//           </div>
          
//           <div className="bg-gradient-to-br from-richblack-800 to-richblack-900 rounded-2xl p-5 border border-richblack-700">
//             <div className="text-3xl font-bold text-cyan-300 mb-2">
//               {Math.round(enrolledCourses.reduce((acc, course) => acc + (course.progressPercentage || 0), 0) / enrolledCourses.length)}%
//             </div>
//             <div className="text-richblack-200">Average Progress</div>
//           </div>
          
//           <div className="bg-gradient-to-br from-richblack-800 to-richblack-900 rounded-2xl p-5 border border-richblack-700">
//             <div className="text-3xl font-bold text-cyan-300 mb-2">
//               {formatDuration(enrolledCourses.reduce((acc, course) => acc + (course.totalDuration || 0), 0))}
//             </div>
//             <div className="text-richblack-200">Total Duration</div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default EnrolledCourses