// // // import React, { useEffect, useState } from "react"
// // // import { useSelector } from "react-redux"
// // // import { useParams } from "react-router-dom"

// // // // import CourseCard from "../components/Catalog/CourseCard"
// // // // import CourseSlider from "../components/Catalog/CourseSlider"
// // // // import Footer from "../../components/Common/Footer"
// // // import Course_Card from "../components/core/Catalog/Course_Card"
// // // import Course_Slider from "../components/core/Catalog/Course_Slider"
// // // import { apiConnector } from "../services/apiConnector"
// // // import { categories } from "../services/apis"
// // // import { getCatalogPageData } from "../services/operations/pageAndComponntDatas"
// // // import Error from "./Error"
// // // import Footer from "../components/common/Footer"

// // // function Catalog() {
// // //   const { loading } = useSelector((state) => state.profile)
// // //   const { catalogName } = useParams()
// // //   const [active, setActive] = useState(1)
// // //   const [catalogPageData, setCatalogPageData] = useState(null)
// // //   const [categoryId, setCategoryId] = useState("")
// // //   // Fetch All Categories
// // //   useEffect(() => {
// // //     ;(async () => {
// // //       try {
// // //         const res = await apiConnector("GET", categories.CATEGORIES_API)
// // //         const category_id = res?.data?.data?.filter(
// // //           (ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName
// // //         )[0]._id
// // //         setCategoryId(category_id)
// // //       } catch (error) {
// // //         console.log("Could not fetch Categories.", error)
// // //       }
// // //     })()
// // //   }, [catalogName])
// // //   useEffect(() => {
// // //     if (categoryId) {
// // //       ;(async () => {
// // //         try {
// // //           const res = await getCatalogPageData(categoryId)
// // //           setCatalogPageData(res)
// // //         } catch (error) {
// // //           console.log(error)
// // //         }
// // //       })()
// // //     }
// // //   }, [categoryId])

// // //   if (loading || !catalogPageData) {
// // //     return (
// // //       <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
// // //         <div className="spinner"></div>
// // //       </div>
// // //     )
// // //   }
// // //   if (!loading && !catalogPageData.success) {
// // //     return <Error />
// // //   }

// // //   return (
// // //     <>
// // //       {/* Hero Section */}
// // //       <div className=" box-content bg-richblack-800 px-4">
// // //         <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent ">
// // //           <p className="text-sm text-richblack-300">
// // //             {`Home / Catalog / `}
// // //             <span className="text-yellow-25">
// // //               {catalogPageData?.data?.selectedCategory?.name}
// // //             </span>
// // //           </p>
// // //           <p className="text-3xl text-richblack-5">
// // //             {catalogPageData?.data?.selectedCategory?.name}
// // //           </p>
// // //           <p className="max-w-[870px] text-richblack-200">
// // //             {catalogPageData?.data?.selectedCategory?.description}
// // //           </p>
// // //         </div>
// // //       </div>

// // //       {/* Section 1 */}
// // //       <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
// // //         <div className="section_heading">Courses to get you started</div>
// // //         <div className="my-4 flex border-b border-b-richblack-600 text-sm">
// // //           <p
// // //             className={`px-4 py-2 ${
// // //               active === 1
// // //                 ? "border-b border-b-yellow-25 text-yellow-25"
// // //                 : "text-richblack-50"
// // //             } cursor-pointer`}
// // //             onClick={() => setActive(1)}
// // //           >
// // //             Most Populer
// // //           </p>
// // //           <p
// // //             className={`px-4 py-2 ${
// // //               active === 2
// // //                 ? "border-b border-b-yellow-25 text-yellow-25"
// // //                 : "text-richblack-50"
// // //             } cursor-pointer`}
// // //             onClick={() => setActive(2)}
// // //           >
// // //             New
// // //           </p>
// // //         </div>
// // //         <div>
// // //           <Course_Slider
// // //             Courses={catalogPageData?.data?.selectedCategory?.courses}
// // //           />
// // //         </div>
// // //       </div>




      
// // //       {/* Section 2 */}
// // //       <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
// // //         <div className="section_heading">
// // //           Top courses in {catalogPageData?.data?.differentCategory?.name}
// // //         </div>
// // //         <div className="py-8">
// // //           <Course_Slider
// // //             Courses={catalogPageData?.data?.differentCategory?.courses}
// // //           />
// // //         </div>
// // //       </div>

// // //       {/* Section 3 */}
// // //       <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
// // //         <div className="section_heading">Frequently Bought</div>
// // //         <div className="py-8">
// // //           <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
// // //             {catalogPageData?.data?.mostSellingCourses
// // //               ?.slice(0, 4)
// // //               .map((course, i) => (
// // //                 <Course_Card course={course} key={i} Height={"h-[400px]"} />
// // //               ))}
// // //           </div>
// // //         </div>
// // //       </div>

// // //       <Footer />
// // //     </>
// // //   )
// // // }

// // // export default Catalog


// // import React, { useEffect, useState } from "react"
// // import { useSelector } from "react-redux"
// // import { useParams } from "react-router-dom"
// // import Course_Card from "../components/core/Catalog/Course_Card"
// // import Course_Slider from "../components/core/Catalog/Course_Slider"
// // import { apiConnector } from "../services/apiConnector"
// // import { categories } from "../services/apis"
// // import { getCatalogPageData } from "../services/operations/pageAndComponntDatas"
// // import Error from "./Error"
// // import Footer from "../components/common/Footer"

// // function Catalog() {
// //   const { loading } = useSelector((state) => state.profile)
// //   const { catalogName } = useParams()
// //   const [active, setActive] = useState(1)
// //   const [catalogPageData, setCatalogPageData] = useState(null)
// //   const [categoryId, setCategoryId] = useState("")
  
// //   // Fetch All Categories
// //   useEffect(() => {
// //     ;(async () => {
// //       try {
// //         const res = await apiConnector("GET", categories.CATEGORIES_API)
// //         const category_id = res?.data?.data?.filter(
// //           (ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName
// //         )[0]._id
// //         setCategoryId(category_id)
// //       } catch (error) {
// //         console.log("Could not fetch Categories.", error)
// //       }
// //     })()
// //   }, [catalogName])
  
// //   useEffect(() => {
// //     if (categoryId) {
// //       ;(async () => {
// //         try {
// //           const res = await getCatalogPageData(categoryId)
// //           setCatalogPageData(res)
// //         } catch (error) {
// //           console.log(error)
// //         }
// //       })()
// //     }
// //   }, [categoryId])

// //   if (loading || !catalogPageData) {
// //     return (
// //       <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
// //         <div className="spinner"></div>
// //       </div>
// //     )
// //   }
// //   if (!loading && !catalogPageData.success) {
// //     return <Error />
// //   }

// //   return (
// //     <div className="bg-richblack-900">
// //       {/* Hero Section */}
// //       <div className="bg-gradient-to-b from-richblack-800 to-richblack-900 px-4 sm:px-6">
// //         <div className="mx-auto flex min-h-[200px] max-w-maxContentTab flex-col justify-center gap-3 py-8 lg:max-w-maxContent md:min-h-[260px]">
// //           <p className="text-sm text-richblack-300 text-center md:text-left">
// //             {`Home / Catalog / `}
// //             <span className="text-yellow-25">
// //               {catalogPageData?.data?.selectedCategory?.name}
// //             </span>
// //           </p>
// //           <p className="text-2xl md:text-3xl lg:text-4xl text-richblack-5 font-bold text-center md:text-left">
// //             {catalogPageData?.data?.selectedCategory?.name}
// //           </p>
// //           <p className="max-w-[870px] text-richblack-200 text-sm md:text-base text-center md:text-left">
// //             {catalogPageData?.data?.selectedCategory?.description}
// //           </p>
// //         </div>
// //       </div>

// //       {/* Section 1 */}
// //       <div className="mx-auto w-full max-w-maxContentTab px-4 py-8 sm:py-12 lg:max-w-maxContent">
// //         <div className="text-2xl font-bold text-richblack-5 mb-6 text-center md:text-left">
// //           Courses to get you started
// //         </div>
// //         <div className="my-4 flex border-b border-b-richblack-600 text-sm overflow-x-auto">
// //           <button
// //             className={`px-4 py-2 transition-all duration-200 ${
// //               active === 1
// //                 ? "border-b-2 border-b-yellow-25 text-yellow-25 font-medium"
// //                 : "text-richblack-50 hover:text-richblack-200"
// //             } cursor-pointer whitespace-nowrap`}
// //             onClick={() => setActive(1)}
// //           >
// //             Most Popular
// //           </button>
// //           <button
// //             className={`px-4 py-2 transition-all duration-200 ${
// //               active === 2
// //                 ? "border-b-2 border-b-yellow-25 text-yellow-25 font-medium"
// //                 : "text-richblack-50 hover:text-richblack-200"
// //             } cursor-pointer whitespace-nowrap`}
// //             onClick={() => setActive(2)}
// //           >
// //             New
// //           </button>
// //         </div>
// //         <div className="py-4">
// //           <Course_Slider
// //             Courses={catalogPageData?.data?.selectedCategory?.courses}
// //           />
// //         </div>
// //       </div>

// //       {/* Section 2 */}
// //       <div className="mx-auto w-full max-w-maxContentTab px-4 py-8 sm:py-12 lg:max-w-maxContent">
// //         <div className="text-2xl font-bold text-richblack-5 mb-6 text-center md:text-left">
// //           Top courses in {catalogPageData?.data?.differentCategory?.name}
// //         </div>
// //         <div className="py-4">
// //           <Course_Slider
// //             Courses={catalogPageData?.data?.differentCategory?.courses}
// //           />
// //         </div>
// //       </div>

// //       {/* Section 3
// //       <div className="mx-auto w-full max-w-maxContentTab px-4 py-8 sm:py-12 lg:max-w-maxContent">
// //         <div className="text-2xl font-bold text-richblack-5 mb-6 text-center md:text-left">
// //           Frequently Bought
// //         </div>
// //         <div className="py-4">
// //           <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
// //             {catalogPageData?.data?.mostSellingCourses
// //               ?.slice(0, 4)
// //               .map((course, i) => (
// //                 <div 
// //                   key={i}
// //                   className="transform transition-transform duration-300 hover:scale-[1.02] will-change-transform"
// //                 >
// //                   <Course_Card 
// //                     course={course} 
// //                     Height={"h-[320px] sm:h-[350px] md:h-[400px]"} 
// //                   />
// //                 </div>
// //               ))}
// //           </div>
// //         </div>
// //       </div> */}

// //     {/* Section 3 */}
// //         <div className="mx-auto w-full max-w-maxContentTab px-4 py-8 sm:py-12 lg:max-w-maxContent">
// //           <div className="text-2xl font-bold text-richblack-5 mb-6 text-center md:text-left">
// //             Frequently Bought
// //           </div>
// //           <div className="py-4">
// //             <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 lg:gap-8">
// //               {catalogPageData?.data?.mostSellingCourses?.map((course, i) => (
// //                 <div 
// //                   key={i}
// //                   className="transform transition-transform duration-300 hover:scale-[1.02] will-change-transform"
// //                 >
// //                   <Course_Card 
// //                     course={course} 
// //                     Height={"h-[320px] sm:h-[350px] md:h-[400px]"} 
// //                   />
// //                 </div>
// //               ))}
// //             </div>
// //           </div>
// //         </div>


// //       <Footer />
// //     </div>
// //   )
// // }

// // export default Catalog


// import React, { useEffect, useState } from "react"
// import { useSelector } from "react-redux"
// import { useParams } from "react-router-dom"
// import Course_Card from "../components/core/Catalog/Course_Card"
// import Course_Slider from "../components/core/Catalog/Course_Slider"
// import { apiConnector } from "../services/apiConnector"
// import { categories } from "../services/apis"
// import { getCatalogPageData } from "../services/operations/pageAndComponntDatas"
// import Error from "./Error"
// import Footer from "../components/common/Footer"

// function Catalog() {
//   const { loading } = useSelector((state) => state.profile)
//   const { catalogName } = useParams()
//   const [active, setActive] = useState(1)
//   const [catalogPageData, setCatalogPageData] = useState(null)
//   const [categoryId, setCategoryId] = useState("")
  
//   // Fetch All Categories
//   useEffect(() => {
//     ;(async () => {
//       try {
//         const res = await apiConnector("GET", categories.CATEGORIES_API)
//         const category_id = res?.data?.data?.filter(
//           (ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName
//         )[0]._id
//         setCategoryId(category_id)
//       } catch (error) {
//         console.log("Could not fetch Categories.", error)
//       }
//     })()
//   }, [catalogName])
  
//   useEffect(() => {
//     if (categoryId) {
//       ;(async () => {
//         try {
//           const res = await getCatalogPageData(categoryId)
//           setCatalogPageData(res)
//         } catch (error) {
//           console.log(error)
//         }
//       })()
//     }
//   }, [categoryId])

//   if (loading || !catalogPageData) {
//     return (
//       <div className="min-h-screen bg-richblack-900 flex items-center justify-center">
//         <div className="relative">
//           <div className="w-16 h-16 border-4 border-yellow-25 border-t-transparent rounded-full animate-spin"></div>
//           <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-yellow-50 rounded-full animate-spin animation-delay-150"></div>
//         </div>
//       </div>
//     )
//   }
  
//   if (!loading && !catalogPageData.success) {
//     return <Error />
//   }

//   return (
//     <div className="bg-richblack-900 min-h-screen">
//       {/* Hero Section with Enhanced Design */}
//       <div className="relative overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-yellow-400/20"></div>
//         <div className="absolute inset-0 bg-gradient-to-b from-richblack-800/95 to-richblack-900/95"></div>
        
//         {/* Animated Background Elements */}
//         <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-25/10 rounded-full blur-xl animate-pulse"></div>
//         <div className="absolute bottom-10 right-10 w-40 h-40 bg-blue-400/10 rounded-full blur-xl animate-pulse animation-delay-300"></div>
        
//         <div className="relative z-10 px-4 sm:px-6 lg:px-8">
//           <div className="mx-auto flex min-h-[280px] max-w-7xl flex-col justify-center gap-6 py-12 md:min-h-[320px] lg:py-16">
//             {/* Breadcrumb */}
//             <nav className="text-sm text-richblack-300 text-center md:text-left">
//               <span className="hover:text-yellow-25 transition-colors cursor-pointer">Home</span>
//               <span className="mx-2">/</span>
//               <span className="hover:text-yellow-25 transition-colors cursor-pointer">Catalog</span>
//               <span className="mx-2">/</span>
//               <span className="text-yellow-25 font-medium">
//                 {catalogPageData?.data?.selectedCategory?.name}
//               </span>
//             </nav>
            
//             {/* Main Title */}
//             <div className="space-y-4">
//               <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-richblack-5 text-center md:text-left leading-tight">
//                 <span className="bg-gradient-to-r from-yellow-25 via-yellow-50 to-yellow-25 bg-clip-text text-transparent animate-gradient">
//                   {catalogPageData?.data?.selectedCategory?.name}
//                 </span>
//               </h1>
              
//               <p className="max-w-4xl text-richblack-200 text-base md:text-lg lg:text-xl text-center md:text-left leading-relaxed">
//                 {catalogPageData?.data?.selectedCategory?.description}
//               </p>
//             </div>
            
//             {/* Stats */}
//             <div className="flex flex-wrap justify-center md:justify-start gap-6 mt-6">
//               <div className="bg-richblack-800/50 backdrop-blur-sm px-4 py-2 rounded-full border border-richblack-700">
//                 <span className="text-yellow-25 font-bold text-lg">
//                   {catalogPageData?.data?.selectedCategory?.courses?.length || 0}
//                 </span>
//                 <span className="text-richblack-300 ml-2 text-sm">Courses</span>
//               </div>
//               <div className="bg-richblack-800/50 backdrop-blur-sm px-4 py-2 rounded-full border border-richblack-700">
//                 <span className="text-yellow-25 font-bold text-lg">★ 4.8</span>
//                 <span className="text-richblack-300 ml-2 text-sm">Average Rating</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Section 1 - Courses to get started */}
//       <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:py-16 lg:py-20">
//         <div className="mb-8">
//           <h2 className="text-3xl md:text-4xl font-bold text-richblack-5 mb-4 text-center md:text-left">
//             Courses to get you started
//           </h2>
//           <p className="text-richblack-300 text-lg text-center md:text-left">
//             Choose from our most popular and newest courses
//           </p>
//         </div>
        
//         {/* Enhanced Tab Navigation */}
//         <div className="relative mb-8">
//           <div className="flex border-b border-richblack-700 overflow-x-auto scrollbar-hide">
//             <button
//               className={`relative px-6 py-3 text-base font-medium transition-all duration-300 whitespace-nowrap ${
//                 active === 1
//                   ? "text-yellow-25"
//                   : "text-richblack-300 hover:text-richblack-100"
//               }`}
//               onClick={() => setActive(1)}
//             >
//               Most Popular
//               {active === 1 && (
//                 <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-yellow-25 to-yellow-50 rounded-full"></div>
//               )}
//             </button>
//             <button
//               className={`relative px-6 py-3 text-base font-medium transition-all duration-300 whitespace-nowrap ${
//                 active === 2
//                   ? "text-yellow-25"
//                   : "text-richblack-300 hover:text-richblack-100"
//               }`}
//               onClick={() => setActive(2)}
//             >
//               New Releases
//               {active === 2 && (
//                 <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-yellow-25 to-yellow-50 rounded-full"></div>
//               )}
//             </button>
//           </div>
//         </div>
        
//         <div className="mb-4">
//           <Course_Slider
//             Courses={catalogPageData?.data?.selectedCategory?.courses}
//           />
//         </div>
//       </div>

//       {/* Section 2 - Top courses in different category */}
//       <div className="bg-richblack-800/30 backdrop-blur-sm">
//         <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:py-16 lg:py-20">
//           <div className="mb-8">
//             <h2 className="text-3xl md:text-4xl font-bold text-richblack-5 mb-4 text-center md:text-left">
//               Top courses in{" "}
//               <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
//                 {catalogPageData?.data?.differentCategory?.name}
//               </span>
//             </h2>
//             <p className="text-richblack-300 text-lg text-center md:text-left">
//               Explore related courses that complement your learning journey
//             </p>
//           </div>
          
//           <div className="mb-4">
//             <Course_Slider
//               Courses={catalogPageData?.data?.differentCategory?.courses}
//             />
//           </div>
//         </div>
//       </div>

//       {/* Section 3 - Frequently Bought */}
//       <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:py-16 lg:py-20">
//         <div className="mb-8">
//           <h2 className="text-3xl md:text-4xl font-bold text-richblack-5 mb-4 text-center md:text-left">
//             Frequently Bought Together
//           </h2>
//           <p className="text-richblack-300 text-lg text-center md:text-left">
//             Popular course combinations chosen by learners like you
//           </p>
//         </div>
        
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
//           {catalogPageData?.data?.mostSellingCourses?.map((course, i) => (
//             <div 
//               key={i}
//               className="group transform transition-all duration-500 hover:scale-105 will-change-transform"
//               style={{ animationDelay: `${i * 100}ms` }}
//             >
//               <Course_Card 
//                 course={course} 
//                 Height={"h-[280px] sm:h-[320px] md:h-[350px]"} 
//               />
//             </div>
//           ))}
//         </div>
//       </div>

//       <Footer />
//     </div>
//   )
// }

// export default Catalog

import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import Course_Card from "../components/core/Catalog/Course_Card"
import Course_Slider from "../components/core/Catalog/Course_Slider"
import { apiConnector } from "../services/apiConnector"
import { categories } from "../services/apis"
import { getCatalogPageData } from "../services/operations/pageAndComponntDatas"
import Error from "./Error"
import Footer from "../components/common/Footer"

function Catalog() {
  const { loading } = useSelector((state) => state.profile)
  const { catalogName } = useParams()
  const [active, setActive] = useState(1)
  const [catalogPageData, setCatalogPageData] = useState(null)
  const [categoryId, setCategoryId] = useState("")
  
  // Fetch All Categories
  useEffect(() => {
    ;(async () => {
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API)
        const category_id = res?.data?.data?.filter(
          (ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName
        )[0]._id
        setCategoryId(category_id)
      } catch (error) {
        console.log("Could not fetch Categories.", error)
      }
    })()
  }, [catalogName])
  
  useEffect(() => {
    if (categoryId) {
      ;(async () => {
        try {
          const res = await getCatalogPageData(categoryId)
          setCatalogPageData(res)
        } catch (error) {
          console.log(error)
        }
      })()
    }
  }, [categoryId])

  if (loading || !catalogPageData) {
    return (
      <div className="min-h-screen bg-richblack-900 flex items-center justify-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-yellow-25 border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-yellow-50 rounded-full animate-spin animation-delay-150"></div>
        </div>
      </div>
    )
  }
  
  if (!loading && !catalogPageData.success) {
    return <Error />
  }

  return (
    <div className="bg-richblack-900 min-h-screen">
      {/* Hero Section with Enhanced Design */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-yellow-400/20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-richblack-800/95 to-richblack-900/95"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-25/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-blue-400/10 rounded-full blur-xl animate-pulse animation-delay-300"></div>
        
        <div className="relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto flex min-h-[280px] max-w-7xl flex-col justify-center gap-6 py-12 md:min-h-[320px] lg:py-16">
            {/* Breadcrumb */}
            <nav className="text-sm text-richblack-300 text-center md:text-left">
              <span className="hover:text-yellow-25 transition-colors cursor-pointer">Home</span>
              <span className="mx-2">/</span>
              <span className="hover:text-yellow-25 transition-colors cursor-pointer">Catalog</span>
              <span className="mx-2">/</span>
              <span className="text-yellow-25 font-medium">
                {catalogPageData?.data?.selectedCategory?.name}
              </span>
            </nav>
            
            {/* Main Title */}
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-richblack-5 text-center md:text-left leading-tight">
                <span className="bg-gradient-to-r from-yellow-25 via-yellow-50 to-yellow-25 bg-clip-text text-transparent animate-gradient">
                  {catalogPageData?.data?.selectedCategory?.name}
                </span>
              </h1>
              
              <p className="max-w-4xl text-richblack-200 text-base md:text-lg lg:text-xl text-center md:text-left leading-relaxed">
                {catalogPageData?.data?.selectedCategory?.description}
              </p>
            </div>
            
            {/* Stats */}
            <div className="flex flex-wrap justify-center md:justify-start gap-6 mt-6">
              <div className="bg-richblack-800/50 backdrop-blur-sm px-4 py-2 rounded-full border border-richblack-700">
                <span className="text-yellow-25 font-bold text-lg">
                  {catalogPageData?.data?.selectedCategory?.courses?.length || 0}
                </span>
                <span className="text-richblack-300 ml-2 text-sm">Courses</span>
              </div>
              <div className="bg-richblack-800/50 backdrop-blur-sm px-4 py-2 rounded-full border border-richblack-700">
                <span className="text-yellow-25 font-bold text-lg">★ 4.8</span>
                <span className="text-richblack-300 ml-2 text-sm">Average Rating</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 1 - Courses to get started */}
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:py-16 lg:py-20">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-richblack-5 mb-4 text-center md:text-left">
            Courses to get you started
          </h2>
          <p className="text-richblack-300 text-lg text-center md:text-left">
            Choose from our most popular and newest courses
          </p>
        </div>
        
        {/* Enhanced Tab Navigation */}
        <div className="relative mb-8">
          <div className="flex border-b border-richblack-700 overflow-x-auto scrollbar-hide">
            <button
              className={`relative px-6 py-3 text-base font-medium transition-all duration-300 whitespace-nowrap ${
                active === 1
                  ? "text-yellow-25"
                  : "text-richblack-300 hover:text-richblack-100"
              }`}
              onClick={() => setActive(1)}
            >
              Most Popular
              {active === 1 && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-yellow-25 to-yellow-50 rounded-full"></div>
              )}
            </button>
            <button
              className={`relative px-6 py-3 text-base font-medium transition-all duration-300 whitespace-nowrap ${
                active === 2
                  ? "text-yellow-25"
                  : "text-richblack-300 hover:text-richblack-100"
              }`}
              onClick={() => setActive(2)}
            >
              New Releases
              {active === 2 && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-yellow-25 to-yellow-50 rounded-full"></div>
              )}
            </button>
          </div>
        </div>
        
        <div className="mb-4">
          <Course_Slider
            Courses={catalogPageData?.data?.selectedCategory?.courses}
          />
        </div>
      </div>

      {/* Section 2 - Top courses in different category */}
      <div className="bg-richblack-800/30 backdrop-blur-sm">
        <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:py-16 lg:py-20">
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-richblack-5 mb-4 text-center md:text-left">
              Top courses in{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {catalogPageData?.data?.differentCategory?.name || "Related Categories"}
              </span>
            </h2>
            <p className="text-richblack-300 text-lg text-center md:text-left">
              Explore related courses that complement your learning journey
            </p>
          </div>
          
          <div className="mb-4">
            {/* Debug info - remove in production */}
            {process.env.NODE_ENV === 'development' && (
              <div className="mb-4 p-4 bg-richblack-700 rounded-lg text-sm text-richblack-300">
                <p>Debug Info:</p>
                <p>Different Category: {catalogPageData?.data?.differentCategory?.name}</p>
                <p>Courses Count: {catalogPageData?.data?.differentCategory?.courses?.length || 0}</p>
              </div>
            )}
            
            <Course_Slider
              Courses={catalogPageData?.data?.differentCategory?.courses || catalogPageData?.data?.selectedCategory?.courses || []}
            />
          </div>
        </div>
      </div>

      {/* Section 3 - Frequently Bought */}
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:py-16 lg:py-20">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-richblack-5 mb-4 text-center md:text-left">
            Frequently Bought Together
          </h2>
          <p className="text-richblack-300 text-lg text-center md:text-left">
            Popular course combinations chosen by learners like you
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {catalogPageData?.data?.mostSellingCourses?.map((course, i) => (
            <div 
              key={i}
              className="group transform transition-all duration-500 hover:scale-105 will-change-transform"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <Course_Card 
                course={course} 
                Height={"h-[280px] sm:h-[320px] md:h-[350px]"} 
              />
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Catalog