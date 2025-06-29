import React from 'react'
import { FaCheck } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import PublishCourse from './PublishCourse/PublishCourse'
import CourseBuilderForm from './CourseBuilderForm/CourseBuilderForm'
import CourseInformationForm from './CourseInformationForm/CourseInformationForm'

const RenderStep = () => {

    const { step } = useSelector((state) => state.course)

    const steps = [
        {
            id: 1,
            title: "Course Information",
        },

        {
            id: 2,
            title: "Course Builder",
        },

        {
            id: 3,
            title: "Publish",
        },
    ]

  return (
    <>
      <div className='relative mb-2 flex justify-center'>
        {
            steps.map((item) => (
                <>
                  <div
                   className='flex flex-col items-center'
                   key={item.id}
                  >

                    <button
                     className={`grid cursor-default aspect-square w-[34px] place-items-center rounded-full border-[1px]
                        ${step === item.id
                            ? "border-yellow-50 bg-yellow-900 text-yellow-50"
                            : "border-richblack-700 bg-richblack-800 text-richblack-300"
                        } ${step > item.id && "bg-yellow-50 text-yellow-50"}
                        `}
                    >
                        {
                            step > item.id ? (
                                <FaCheck className='font-bold text-richblack-900' />
                            ) : (
                                item.id
                            )
                        }

                    </button>

                  </div>

                    {item.id !== steps.length && (
                        <>
                        <div
                         className={`h-[calc(34px/2)] w-[33%] border-dashed border-b-2
                            ${step > item.id ? "border-yellow-50" : "border-richblack-500"}
                            `}
                        >
                        </div>
                        </>
                    )}

                </>
            ))
        }
      </div>

        <div className='relative mb-16 flex w-full select-none justify-between'>
            {
                steps.map((item) => (
                    <>
                      <div
                       className='flex min-w-[130px] flex-col items-center gap-y-2'
                        key={item.id}
                      >

                        <p
                         className={`text-sm ${
                            step >= item.id ? "text-richblack-5" : "text-richblack-500"
                         }`}
                        >
                            {item.title}
                        </p>

                      </div>
                    </>
                ))
            }
        </div>

            {/* //render specific components based on current steps */}
            {step === 1 && <CourseInformationForm/>}
            {step === 2 && <CourseBuilderForm/>}
            {step === 3 && <PublishCourse/>}

    </>
  )
}

export default RenderStep
 

// import React from 'react';
// import { FaCheck } from 'react-icons/fa';
// import { useSelector } from 'react-redux';

// // Import your step components
// import PublishCourse from './PublishCourse/PublishCourse';
// import CourseBuilderForm from './CourseBuilderForm/CourseBuilderForm';
// import CourseInformationForm from './CourseInformationForm/CourseInformationForm';

// const RenderStep = () => {
//   const { step } = useSelector((state) => state.course);

//   const steps = [
//     {
//       id: 1,
//       title: "Course Information",
//     },
//     {
//       id: 2,
//       title: "Course Builder",
//     },
//     {
//       id: 3,
//       title: "Publish",
//     },
//   ];

//   return (
//     <>
//       {/* Step Indicators */}
//       <div className='relative mb-8 flex w-full justify-between items-center px-4 sm:px-0'> {/* Adjusted margin-bottom, added horizontal padding for small screens */}
//         {steps.map((item) => (
//           <React.Fragment key={item.id}> {/* Use React.Fragment for key on outer loop */}
//             <div className='flex flex-col items-center flex-1'> {/* Added flex-1 to distribute space evenly */}
//               <button
//                 className={`grid cursor-default aspect-square w-[30px] sm:w-[34px] place-items-center rounded-full border-[1px]
//                   ${step === item.id
//                     ? "border-yellow-50 bg-yellow-900 text-yellow-50"
//                     : "border-richblack-700 bg-richblack-800 text-richblack-300"
//                   } ${step > item.id && "bg-yellow-50 text-richblack-900"}
//                 `} 
//               >
//                 {step > item.id ? (
//                   <FaCheck className='font-bold' /> // FaCheck color is determined by button's text color
//                 ) : (
//                   item.id
//                 )}
//               </button>
//             </div>

//             {/* Dashed Line Separator */}
//             {item.id !== steps.length && (
//               <div
//                 className={`h-[calc(30px/2)] sm:h-[calc(34px/2)] w-[30%] sm:w-[33%] border-dashed border-b-2
//                   ${step > item.id ? "border-yellow-50" : "border-richblack-500"}
//                 `} 
//               ></div>
//             )}
//           </React.Fragment>
//         ))}
//       </div>

//       {/* Step Titles */}
//       <div className='relative mb-16 flex w-full select-none justify-between px-4 sm:px-0'> {/* Adjusted horizontal padding for small screens */}
//         {steps.map((item) => (
//           <div
//             className='flex min-w-[90px] sm:min-w-[130px] flex-col items-center gap-y-2' // Adjusted min-width for smaller screens
//             key={item.id}
//           >
//             <p
//               className={`text-xs sm:text-sm ${ // Adjusted font size for smaller screens
//                 step >= item.id ? "text-richblack-5" : "text-richblack-500"
//               }`}
//             >
//               {item.title}
//             </p>
//           </div>
//         ))}
//       </div>

//       {/* Render specific components based on current steps */}
//       {step === 1 && <CourseInformationForm />}
//       {step === 2 && <CourseBuilderForm />}
//       {step === 3 && <PublishCourse />}
//     </>
//   );
// };

// export default RenderStep;