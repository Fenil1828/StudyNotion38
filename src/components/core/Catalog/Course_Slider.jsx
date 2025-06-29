// // // import React from 'react'

// // // // Import Swiper React components
// // // import { Swiper, SwiperSlide } from "swiper/react"

// // // // Import Swiper styles
// // // import "swiper/css"
// // // import "swiper/css/free-mode"
// // // import "swiper/css/pagination"
// // // import Course_Card from './Course_Card'

// // // // Import required modules
// // // // import { FreeMode, Pagination } from "swiper"
// // // import { FreeMode, Pagination} from "swiper/modules"

// // // const Course_Slider = ({
// // //   courses
  
// // // }) => {
// // //   return (
// // //     <div>
// // //       {
// // //         courses?.length ? (
// // //           <Swiper
// // //               slidesPerView={1}
// // //               spaceBetween={25}
// // //               loop={true}
// // //               modules={[FreeMode, Pagination]}
// // //               breakpoints={{
// // //                 1024: {
// // //                   slidesPerView: 3,
// // //                 },
// // //               }}
// // //           className="max-h-[30rem]"
// // //           >

// // //             {
// // //               courses?.map((course, i ) => (
// // //                 <SwiperSlide key={i} >
// // //                   <Course_Card course={course} Height={"h-[250px]"} />
// // //                 </SwiperSlide>
// // //               ))
// // //             }
// // //           </Swiper> 
          
        

// // //         ) : (
// // //           <p className='text-xl text-richblack-5'>No Course Found</p>
// // //         )
// // //       }      
// // //     </div>
// // //   )
// // // }

// // // export default Course_Slider

// // // Course_Slider.jsx
// // import React from 'react'
// // import { Swiper, SwiperSlide } from "swiper/react"
// // import "swiper/css"
// // import "swiper/css/free-mode"
// // import "swiper/css/pagination"
// // import "swiper/css/navigation"
// // import Course_Card from './Course_Card'
// // import { FreeMode, Pagination, Navigation } from "swiper/modules"

// // const Course_Slider = ({ courses }) => {
// //   return (
// //     <div className="relative py-6 px-2 sm:px-0">
// //       {courses?.length ? (
// //         <>
// //           <Swiper
// //             slidesPerView={1}
// //             spaceBetween={20}
// //             loop={true}
// //             freeMode={true}
// //             pagination={{
// //               clickable: true,
// //               dynamicBullets: true,
// //             }}
// //             navigation={{
// //               nextEl: '.swiper-button-next',
// //               prevEl: '.swiper-button-prev',
// //             }}
// //             modules={[FreeMode, Pagination, Navigation]}
// //             breakpoints={{
// //               480: {
// //                 slidesPerView: 1.5,
// //               },
// //               640: {
// //                 slidesPerView: 2,
// //               },
// //               768: {
// //                 slidesPerView: 2.5,
// //               },
// //               1024: {
// //                 slidesPerView: 3,
// //                 spaceBetween: 25,
// //               },
// //               1280: {
// //                 slidesPerView: 4,
// //                 spaceBetween: 30,
// //               },
// //             }}
// //             className="mySwiper"
// //           >
// //             {courses?.map((course, i) => (
// //               <SwiperSlide key={i}>
// //                 <div className="pb-12">
// //                   <Course_Card course={course} Height={"h-[250px] md:h-[280px] lg:h-[300px]"} />
// //                 </div>
// //               </SwiperSlide>
// //             ))}
// //           </Swiper>
          
// //           {/* Custom Navigation Buttons */}
// //           <div className="swiper-button-prev absolute top-1/2 left-0 z-10 -translate-y-1/2 bg-richblack-800 text-richblack-5 w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:bg-richblack-700 transition-colors duration-200">
// //             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
// //             </svg>
// //           </div>
// //           <div className="swiper-button-next absolute top-1/2 right-0 z-10 -translate-y-1/2 bg-richblack-800 text-richblack-5 w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:bg-richblack-700 transition-colors duration-200">
// //             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
// //             </svg>
// //           </div>
// //         </>
// //       ) : (
// //         <p className='text-xl text-richblack-5 text-center py-12'>No Courses Found</p>
// //       )}      
// //     </div>
// //   )
// // }

// // export default Course_Slider


// import React from 'react'
// import { Swiper, SwiperSlide } from "swiper/react"
// import "swiper/css"
// import "swiper/css/free-mode"
// import "swiper/css/pagination"
// import "swiper/css/navigation"
// import "swiper/css/effect-coverflow"
// import Course_Card from './Course_Card'
// import { FreeMode, Pagination, Navigation, Autoplay, EffectCoverflow } from "swiper/modules"

// const Course_Slider = ({ courses }) => {
//   return (
//     <div className="relative py-8 px-2 sm:px-4">
//       {courses?.length ? (
//         <div className="relative">
//           <Swiper
//             slidesPerView={1}
//             spaceBetween={20}
//             loop={courses.length > 3}
//             freeMode={true}
//             autoplay={{
//               delay: 4000,
//               disableOnInteraction: false,
//               pauseOnMouseEnter: true,
//             }}
//             pagination={{
//               clickable: true,
//               dynamicBullets: true,
//               bulletClass: 'swiper-pagination-bullet !bg-richblack-400',
//               bulletActiveClass: 'swiper-pagination-bullet-active !bg-yellow-25',
//               dynamicMainBullets: 3,
//             }}
//             navigation={{
//               nextEl: '.custom-next',
//               prevEl: '.custom-prev',
//             }}
//             modules={[FreeMode, Pagination, Navigation, Autoplay]}
//             breakpoints={{
//               320: {
//                 slidesPerView: 1,
//                 spaceBetween: 15,
//               },
//               480: {
//                 slidesPerView: 1.2,
//                 spaceBetween: 20,
//               },
//               640: {
//                 slidesPerView: 1.8,
//                 spaceBetween: 20,
//               },
//               768: {
//                 slidesPerView: 2.2,
//                 spaceBetween: 25,
//               },
//               1024: {
//                 slidesPerView: 2.8,
//                 spaceBetween: 30,
//               },
//               1280: {
//                 slidesPerView: 3.5,
//                 spaceBetween: 30,
//               },
//               1536: {
//                 slidesPerView: 4,
//                 spaceBetween: 35,
//               },
//             }}
//             className="!pb-16 !overflow-visible"
//           >
//             {courses?.map((course, i) => (
//               <SwiperSlide key={i} className="!h-auto">
//                 <div 
//                   className="h-full transform transition-all duration-700 hover:z-10"
//                   style={{ 
//                     animationDelay: `${i * 150}ms`,
//                     animation: 'slideInUp 0.8s ease-out forwards'
//                   }}
//                 >
//                   <Course_Card 
//                     course={course} 
//                     Height={"h-[220px] sm:h-[250px] md:h-[280px] lg:h-[300px]"} 
//                   />
//                 </div>
//               </SwiperSlide>
//             ))}
//           </Swiper>
          
//           {/* Enhanced Custom Navigation */}
//           <button className="custom-prev group absolute top-1/2 -left-2 sm:-left-4 z-20 -translate-y-1/2 bg-gradient-to-r from-richblack-800 to-richblack-700 text-richblack-25 w-12 h-12 rounded-full flex items-center justify-center shadow-2xl hover:shadow-yellow-25/20 transition-all duration-300 hover:scale-110 active:scale-95 border border-richblack-600 hover:border-yellow-25/50">
//             <svg 
//               xmlns="http://www.w3.org/2000/svg" 
//               className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-0.5" 
//               fill="none" 
//               viewBox="0 0 24 24" 
//               stroke="currentColor"
//             >
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
//             </svg>
//             <div className="absolute inset-0 bg-gradient-to-r from-yellow-25/0 to-yellow-25/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//           </button>
          
//           <button className="custom-next group absolute top-1/2 -right-2 sm:-right-4 z-20 -translate-y-1/2 bg-gradient-to-r from-richblack-700 to-richblack-800 text-richblack-25 w-12 h-12 rounded-full flex items-center justify-center shadow-2xl hover:shadow-yellow-25/20 transition-all duration-300 hover:scale-110 active:scale-95 border border-richblack-600 hover:border-yellow-25/50">
//             <svg 
//               xmlns="http://www.w3.org/2000/svg" 
//               className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5" 
//               fill="none" 
//               viewBox="0 0 24 24" 
//               stroke="currentColor"
//             >
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
//             </svg>
//             <div className="absolute inset-0 bg-gradient-to-r from-yellow-25/20 to-yellow-25/0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//           </button>
          
//           {/* Progress Bar */}
//           <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-richblack-700 rounded-full overflow-hidden">
//             <div className="h-full bg-gradient-to-r from-yellow-25 to-yellow-50 rounded-full animate-pulse"></div>
//           </div>
//         </div>
//       ) : (
//         <div className="flex flex-col items-center justify-center py-20 px-4">
//           <div className="w-24 h-24 mb-6 rounded-full bg-gradient-to-br from-richblack-700 to-richblack-800 flex items-center justify-center">
//             <svg className="w-12 h-12 text-richblack-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
//             </svg>
//           </div>
//           <h3 className="text-2xl font-bold text-richblack-5 mb-2">No Courses Available</h3>
//           <p className="text-richblack-300 text-center max-w-md">
//             We're working hard to bring you amazing courses. Check back soon for new content!
//           </p>
//         </div>
//       )}
      
//       <style jsx>{`
//         @keyframes slideInUp {
//           from {
//             opacity: 0;
//             transform: translateY(30px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
        
//         .swiper-pagination {
//           bottom: 0 !important;
//         }
        
//         .swiper-pagination-bullet {
//           width: 8px !important;
//           height: 8px !important;
//           opacity: 0.5 !important;
//           transition: all 0.3s ease !important;
//         }
        
//         .swiper-pagination-bullet-active {
//           opacity: 1 !important;
//           transform: scale(1.2) !important;
//         }
        
//         .swiper-wrapper {
//           align-items: stretch;
//         }
//       `}</style>
//     </div>
//   )
// }

// export default Course_Slider

import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import "swiper/css/navigation"
import "swiper/css/effect-coverflow"
import Course_Card from './Course_Card'
import { FreeMode, Pagination, Navigation, Autoplay, EffectCoverflow } from "swiper/modules"

const Course_Slider = ({ Courses }) => {
  // Use Courses prop (capital C) to match the component usage
  const coursesToShow = Courses || [];
  
  return (
    <div className="relative py-8 px-2 sm:px-4">
      {coursesToShow?.length ? (
        <div className="relative">
          <Swiper
            slidesPerView={1}
            spaceBetween={20}
            loop={coursesToShow.length > 3}
            freeMode={true}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
              bulletClass: 'swiper-pagination-bullet !bg-richblack-400',
              bulletActiveClass: 'swiper-pagination-bullet-active !bg-yellow-25',
              dynamicMainBullets: 3,
            }}
            navigation={{
              nextEl: '.custom-next',
              prevEl: '.custom-prev',
            }}
            modules={[FreeMode, Pagination, Navigation, Autoplay]}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 15,
              },
              480: {
                slidesPerView: 1.2,
                spaceBetween: 20,
              },
              640: {
                slidesPerView: 1.8,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2.2,
                spaceBetween: 25,
              },
              1024: {
                slidesPerView: 2.8,
                spaceBetween: 30,
              },
              1280: {
                slidesPerView: 3.5,
                spaceBetween: 30,
              },
              1536: {
                slidesPerView: 4,
                spaceBetween: 35,
              },
            }}
            className="!pb-16 !overflow-visible"
          >
            {coursesToShow?.map((course, i) => (
              <SwiperSlide key={i} className="!h-auto">
                <div 
                  className="h-full transform transition-all duration-700 hover:z-10"
                  style={{ 
                    animationDelay: `${i * 150}ms`,
                    animation: 'slideInUp 0.8s ease-out forwards'
                  }}
                >
                  <Course_Card 
                    course={course} 
                    Height={"h-[220px] sm:h-[250px] md:h-[280px] lg:h-[300px]"} 
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          
          {/* Enhanced Custom Navigation */}
          {/* <button className="custom-prev group absolute top-1/2 -left-2 sm:-left-4 z-20 -translate-y-1/2 bg-gradient-to-r from-richblack-800 to-richblack-700 text-richblack-25 w-12 h-12 rounded-full flex items-center justify-center shadow-2xl hover:shadow-yellow-25/20 transition-all duration-300 hover:scale-110 active:scale-95 border border-richblack-600 hover:border-yellow-25/50">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-0.5" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
            <div className="absolute -left-1 inset-0 bg-gradient-to-r from-yellow-25/0 to-yellow-25/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
          
          <button className="custom-next group absolute top-1/2 -right-8 sm:-right-4 z-20 -translate-y-1/2 bg-gradient-to-r from-richblack-700 to-richblack-800 text-richblack-25 w-12 h-12 rounded-full flex items-center justify-center shadow-2xl hover:shadow-yellow-25/20 transition-all duration-300 hover:scale-110 active:scale-95 border border-richblack-600 hover:border-yellow-25/50">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-25/20 to-yellow-25/0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button> */}
          
          {/* Progress Bar */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-richblack-700 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-yellow-25 to-yellow-50 rounded-full animate-pulse"></div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 px-4">
          <div className="w-24 h-24 mb-6 rounded-full bg-gradient-to-br from-richblack-700 to-richblack-800 flex items-center justify-center">
            <svg className="w-12 h-12 text-richblack-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-richblack-5 mb-2">No Courses Available</h3>
          <p className="text-richblack-300 text-center max-w-md">
            We're working hard to bring you amazing courses. Check back soon for new content!
          </p>
        </div>
      )}
      
      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .swiper-pagination {
          bottom: 0 !important;
        }
        
        .swiper-pagination-bullet {
          width: 8px !important;
          height: 8px !important;
          opacity: 0.5 !important;
          transition: all 0.3s ease !important;
        }
        
        .swiper-pagination-bullet-active {
          opacity: 1 !important;
          transform: scale(1.2) !important;
        }
        
        .swiper-wrapper {
          align-items: stretch;
        }
      `}</style>
    </div>
  )
}

export default Course_Slider