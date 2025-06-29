// // // import React, { useEffect } from 'react'
// // // import { useForm } from 'react-hook-form'
// // // import { useSelector } from 'react-redux'
// // // import { createRating } from '../../../services/operations/courseDetailsAPI'
// // // import { RxCross2 } from 'react-icons/rx'
// // // import ReactStars from "react-rating-stars-component"
// // // import IconBtn from '../../common/IconBtn'


// // // const CourseReviewModal = ({setReviewModal}) => {

// // //   const { user }  = useSelector((state) => state.profile)
// // //   const { token } = useSelector((state) => state.auth)
// // //   const { courseEntireData } = useSelector((state) => state.viewCourse)

// // //   const {
// // //     register,
// // //     handleSubmit,
// // //     setValue,
// // //     formState: { errors },
// // //   } = useForm()

// // //   useEffect(() => {
// // //     setValue("courseExperience" ,"")
// // //     setValue("courseRating" , 0)

// // //   } , [])

// // //   const ratingChanged = (newRating) => {
// // //     setValue("courseRating" , newRating)
// // //   }



// // //   const onSubmit = async (data) => {
// // //    console.log({ courseId: courseEntireData._id, rating: data.createRating, review: data.courseExperience });
// // //     await createRating({
// // //       courseId: courseEntireData._id,
// // //       rating: data.createRating,
// // //       review: data.courseExperience,
// // //     },
// // //     token
// // //   )  
// // //     setReviewModal(false)
// // //   }

  
// // //   return (
// // //     <div className='fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm'>
      
// // //       <div className='my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800'>

// // //           {/*  modal header  */}
// // //         <div className='flex items-center justify-between rounded-t-lg bg-richblack-700 p-5'>
// // //           <p className='text-xl font-semibold text-richblack-5'>Add Review</p>

// // //           <button onClick={() => setReviewModal(false)}>
// // //             <RxCross2 className='text-2xl text-richblack-5' />
// // //           </button>
// // //         </div>

// // //         {/* modal body */}

// // //         <div className='p-6'>
// // //           <div className='flex items-center justify-center gap-x-4'>
// // //             <img 
// // //             src={user?.image} 
// // //             alt={user?.firstName + "profile"}
// // //             className='aspect-square w-[50px] rounded-full object-cover'
            
// // //             />

// // //             <div className=''>
// // //               <p className='font-semibold text-richblack-5'>
// // //                 {user?.firstName} {user?.lastName}
// // //               </p>

// // //               <p className='text-sm text-richblack-5'>Posting Publicly</p>
// // //             </div>
// // //           </div>

// // //           <form
// // //             onSubmit={handleSubmit(onSubmit)}
// // //             className='mt-6 flex flex-col items-center'
// // //           >

// // //             <ReactStars
// // //               count={5}
// // //               onChange={ratingChanged}
// // //               size={24}
// // //               activeColor="#ffd700"
// // //             />

// // //             <div className='flex w-11/12 flex-col space-y-2'>

// // //               <label htmlFor="courseExeperience"
// // //                className='text-sm text-richblack-5'
// // //               >
// // //                 Add Your Exeperience <sup className='text-pink-200'>*</sup>
// // //               </label>

// // //               <textarea
// // //               id="courseExeperience"
// // //                placeholder='Add Your Exeperience'
// // //                {...register("courseExeperience" , {required :true})}
// // //                className='form-style resize-x-none min-h-[130px] w-full'
// // //               />

// // //                 {
// // //                   errors.courseExperience && (
// // //                     <span className='ml-2 text-xs tracking-wide text-pink-200'>
// // //                       Please Add Your Experience
// // //                     </span>
// // //                   )
// // //                 }

              

// // //             </div>

// // //             <div className='mt-6 flex w-11/12 justify-end gap-x-2'>
// // //                 <button
// // //                   onClick={() => setReviewModal(false)}
// // //                   className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblue-900` }
// // //                 >
// // //                   Cancel
// // //                 </button>
// // //                 <IconBtn text="Save" />
// // //             </div>
// // //           </form>
// // //         </div>
// // //       </div>

// // //     </div>
// // //   )
// // // }

// // // export default CourseReviewModal

// // import React, { useEffect } from 'react'
// // import { useForm } from 'react-hook-form'
// // import { useSelector } from 'react-redux'
// // import { createRating } from '../../../services/operations/courseDetailsAPI'
// // import { RxCross2 } from 'react-icons/rx'
// // import ReactStars from "react-rating-stars-component"
// // import IconBtn from '../../common/IconBtn'

// // const CourseReviewModal = ({setReviewModal}) => {
// //   const { user }  = useSelector((state) => state.profile)
// //   const { token } = useSelector((state) => state.auth)
// //   const { courseEntireData } = useSelector((state) => state.viewCourse)

// //   const {
// //     register,
// //     handleSubmit,
// //     setValue,
// //     formState: { errors },
// //   } = useForm()

// //   useEffect(() => {
// //     setValue("courseExperience", "")
// //     setValue("courseRating", 0)
// //   }, [])

// //   const ratingChanged = (newRating) => {
// //     setValue("courseRating", newRating)
// //   }

// //   const onSubmit = async (data) => {
// //     await createRating(
// //       {
// //         courseId: courseEntireData._id,
// //         rating: data.courseRating,  // Changed from createRating to courseRating
// //         review: data.courseExperience,
// //       },
// //       token
// //     )  
// //     setReviewModal(false)
// //   }

// //   return (
// //     <div className='fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm'>
// //       <div className='my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800'>
// //         {/* modal header */}
// //         <div className='flex items-center justify-between rounded-t-lg bg-richblack-700 p-5'>
// //           <p className='text-xl font-semibold text-richblack-5'>Add Review</p>
// //           <button onClick={() => setReviewModal(false)}>
// //             <RxCross2 className='text-2xl text-richblack-5' />
// //           </button>
// //         </div>

// //         {/* modal body */}
// //         <div className='p-6'>
// //           <div className='flex items-center justify-center gap-x-4'>
// //             <img 
// //               src={user?.image} 
// //               alt={user?.firstName + "profile"}
// //               className='aspect-square w-[50px] rounded-full object-cover'
// //             />
// //             <div className=''>
// //               <p className='font-semibold text-richblack-5'>
// //                 {user?.firstName} {user?.lastName}
// //               </p>
// //               <p className='text-sm text-richblack-5'>Posting Publicly</p>
// //             </div>
// //           </div>

// //           <form
// //             onSubmit={handleSubmit(onSubmit)}
// //             className='mt-6 flex flex-col items-center'
// //           >
// //             <ReactStars
// //               count={5}
// //               onChange={ratingChanged}
// //               size={24}
// //               activeColor="#ffd700"
// //             />

// //             <div className='flex w-11/12 flex-col space-y-2'>
// //               <label htmlFor="courseExperience" className='text-sm text-richblack-5'>
// //                 Add Your Experience <sup className='text-pink-200'>*</sup>
// //               </label>
// //               <textarea
// //                 id="courseExperience"
// //                 placeholder='Add Your Experience'
// //                 {...register("courseExperience", {required: true})}
// //                 className='form-style resize-x-none min-h-[130px] w-full'
// //               />
// //               {errors.courseExperience && (
// //                 <span className='ml-2 text-xs tracking-wide text-pink-200'>
// //                   Please Add Your Experience
// //                 </span>
// //               )}
// //             </div>

// //             <div className='mt-6 flex w-11/12 justify-end gap-x-2'>
// //               <button
// //                 onClick={() => setReviewModal(false)}
// //                 className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblue-900`}
// //               >
// //                 Cancel
// //               </button>
// //               <IconBtn text="Save" />
// //             </div>
// //           </form>
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }

// // export default CourseReviewModal


// // src/components/core/ViewCourse/CourseReviewModal.js
// import React, { useEffect } from 'react';
// import { useForm } from 'react-hook-form';
// import { useSelector } from 'react-redux';
// import { createRating } from '../../../services/operations/courseDetailsAPI';
// import { RxCross2 } from 'react-icons/rx';
// import ReactStars from "react-rating-stars-component";
// import IconBtn from '../../common/IconBtn';

// const CourseReviewModal = ({ setReviewModal }) => {
//   const { user } = useSelector((state) => state.profile);
//   const { token } = useSelector((state) => state.auth);
//   const { courseEntireData } = useSelector((state) => state.viewCourse);

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     formState: { errors },
//   } = useForm();

//   useEffect(() => {
//     setValue("courseExperience", "");
//     setValue("courseRating", 0);
//   }, []);

//   const ratingChanged = (newRating) => {
//     setValue("courseRating", newRating);
//   };

//   const onSubmit = async (data) => {
//     await createRating(
//       {
//         courseId: courseEntireData._id,
//         rating: data.courseRating,
//         review: data.courseExperience,
//       },
//       token
//     );
//     setReviewModal(false);
//   };

//   return (
//     <div className='fixed inset-0 z-50 grid place-items-center bg-black/70 backdrop-blur-sm p-4'>
//       <div className='relative w-full max-w-md rounded-xl bg-richblack-800 border border-richblack-600 shadow-2xl overflow-hidden'>
//         <div className='flex items-center justify-between p-5 bg-richblack-700'>
//           <h3 className='text-xl font-bold text-richblack-5'>Add Review</h3>
//           <button 
//             onClick={() => setReviewModal(false)}
//             className='p-1 rounded-full hover:bg-richblack-600 transition-colors'
//           >
//             <RxCross2 className='text-richblack-5 text-xl' />
//           </button>
//         </div>
        
//         <div className='p-6'>
//           <div className='flex items-center justify-center gap-4 mb-6'>
//             <img 
//               src={user?.image} 
//               alt={user?.firstName + "profile"}
//               className='w-14 h-14 rounded-full object-cover border-2 border-richblack-500'
//             />
//             <div>
//               <p className='font-semibold text-richblack-5'>{user?.firstName} {user?.lastName}</p>
//               <p className='text-sm text-richblack-400'>Posting Publicly</p>
//             </div>
//           </div>
          
//           <form
//             onSubmit={handleSubmit(onSubmit)}
//             className='flex flex-col items-center w-full'
//           >
//             <div className="mb-6">
//               <ReactStars
//                 count={5}
//                 onChange={ratingChanged}
//                 size={32}
//                 activeColor="#ffd700"
//                 className="mx-auto"
//               />
//             </div>

//             <div className='w-full mb-6'>
//               <label htmlFor="courseExperience" className='block text-sm font-medium text-richblack-5 mb-2'>
//                 Add Your Experience <sup className='text-pink-200'>*</sup>
//               </label>
//               <textarea
//                 id="courseExperience"
//                 placeholder='Share your thoughts about this course...'
//                 {...register("courseExperience", {required: true})}
//                 className='w-full bg-richblack-700 border border-richblack-600 rounded-lg p-3 text-richblack-5 focus:outline-none focus:ring-2 focus:ring-yellow-500 min-h-[150px]'
//               />
//               {errors.courseExperience && (
//                 <span className='ml-2 text-xs tracking-wide text-pink-200'>
//                   Please add your experience
//                 </span>
//               )}
//             </div>

//             <div className='flex gap-3 w-full'>
//               <button
//                 onClick={() => setReviewModal(false)}
//                 className='flex-1 py-3 px-4 bg-richblack-600 hover:bg-richblack-500 rounded-lg text-richblack-5 font-medium transition-colors'
//               >
//                 Cancel
//               </button>
//               <IconBtn 
//                 text="Submit Review" 
//                 type="submit"
//                 customClasses="flex-1 py-3"
//               />
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CourseReviewModal;


// src/components/core/ViewCourse/CourseReviewModal.js
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { createRating } from '../../../services/operations/courseDetailsAPI';
import { RxCross2 } from 'react-icons/rx';
import ReactStars from "react-rating-stars-component";
import IconBtn from '../../common/IconBtn';

const CourseReviewModal = ({ setReviewModal }) => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { courseEntireData } = useSelector((state) => state.viewCourse);
  
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue("courseExperience", "");
    setValue("courseRating", 0);
  }, []);

  const ratingChanged = (newRating) => {
    setValue("courseRating", newRating);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    setSubmitError(null);
    
    try {
      const response = await createRating(
        {
          courseId: courseEntireData._id,
          rating: data.courseRating,
          review: data.courseExperience,
        },
        token
      );
      
      if (response) {
        setSubmitSuccess(true);
        setTimeout(() => {
          setReviewModal(false);
        }, 1500);
      }
    } catch (error) {
      console.error("Review submission error:", error);
      setSubmitError(
        error.response?.data?.message || 
        "Failed to submit review. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='fixed inset-0 z-50 grid place-items-center bg-black/70 backdrop-blur-sm p-4'>
      <div className='relative w-full max-w-md rounded-xl bg-richblack-800 border border-richblack-600 shadow-2xl overflow-hidden'>
        <div className='flex items-center justify-between p-5 bg-richblack-700'>
          <h3 className='text-xl font-bold text-richblack-5'>Add Review</h3>
          <button 
            onClick={() => setReviewModal(false)}
            className='p-1 rounded-full hover:bg-richblack-600 transition-colors'
          >
            <RxCross2 className='text-richblack-5 text-xl' />
          </button>
        </div>
        
        <div className='p-6'>
          {submitSuccess ? (
            <div className="flex flex-col items-center text-center py-8">
              <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-richblack-5 mb-2">Review Submitted!</h4>
              <p className="text-richblack-200">Thank you for your feedback.</p>
              <p className="text-richblack-200">This window will close shortly.</p>
            </div>
          ) : (
            <>
              <div className='flex items-center justify-center gap-4 mb-6'>
                <img 
                  src={user?.image} 
                  alt={user?.firstName + "profile"}
                  className='w-14 h-14 rounded-full object-cover border-2 border-richblack-500'
                />
                <div>
                  <p className='font-semibold text-richblack-5'>{user?.firstName} {user?.lastName}</p>
                  <p className='text-sm text-richblack-400'>Posting Publicly</p>
                </div>
              </div>
              
              <form
                onSubmit={handleSubmit(onSubmit)}
                className='flex flex-col items-center w-full'
              >
                <div className="mb-6">
                  <ReactStars
                    count={5}
                    onChange={ratingChanged}
                    size={32}
                    activeColor="#ffd700"
                    className="mx-auto"
                  />
                </div>

                <div className='w-full mb-4'>
                  <label htmlFor="courseExperience" className='block text-sm font-medium text-richblack-5 mb-2'>
                    Add Your Experience <sup className='text-pink-200'>*</sup>
                  </label>
                  <textarea
                    id="courseExperience"
                    placeholder='Share your thoughts about this course...'
                    {...register("courseExperience", {required: true})}
                    className='w-full bg-richblack-700 border border-richblack-600 rounded-lg p-3 text-richblack-5 focus:outline-none focus:ring-2 focus:ring-yellow-500 min-h-[150px]'
                  />
                  {errors.courseExperience && (
                    <span className='ml-2 text-xs tracking-wide text-pink-200'>
                      Please add your experience
                    </span>
                  )}
                </div>
                
                {submitError && (
                  <div className="w-full mb-4 p-3 bg-red-900/30 border border-red-500 rounded-lg">
                    <p className="text-red-300 text-sm">{submitError}</p>
                  </div>
                )}

                <div className='flex gap-3 w-full'>
                  <button
                    type="button"
                    onClick={() => setReviewModal(false)}
                    className='flex-1 py-3 px-4 bg-richblack-600 hover:bg-richblack-500 rounded-lg text-richblack-5 font-medium transition-colors'
                    disabled={loading}
                  >
                    Cancel
                  </button>
                  <IconBtn 
                    text={loading ? "Submitting..." : "Submit Review"} 
                    type="submit"
                    customClasses="flex-1 py-3"
                    disabled={loading}
                  />
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseReviewModal;