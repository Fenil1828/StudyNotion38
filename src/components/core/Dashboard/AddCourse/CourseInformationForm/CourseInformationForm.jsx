// // import React, { useEffect, useState } from 'react'
// // import { useForm } from 'react-hook-form'
// // import { HiOutlineCurrencyRupee } from 'react-icons/hi'
// // import { useDispatch, useSelector } from 'react-redux'
// // import ChipInput from './ChipInput'
// // import Upload from '../Upload'
// // import { setCourse, setStep } from '../../../../../slices/courseSlice'
// // import IconBtn from '../../../../common/IconBtn'
// // import { MdNavigateNext } from 'react-icons/md'
// // import RequirementsField from './RequirementsField'
// // import { addCourseDetails, editCourseDetails, fetchCourseCategories } from '../../../../../services/operations/courseDetailsAPI'
// // import toast from 'react-hot-toast'
// // import { COURSE_STATUS } from '../../../../../utils/constants'

// // const CourseInformationForm = () => {

// //     const {
// //         register,
// //         handleSubmit,
// //         setValue,
// //         getValue,
// //         formState: { errors },
// //     } = useForm()
    
// //     const dispatch = useDispatch()
// //     const {token} = useSelector((state) => state.auth)
// //     const { course, editCourse} = useSelector((state) => state.course)
// //     const [loading , setLoading] = useState(false)
// //     const [courseCategories, setCourseCategories] = useState([])

// //     useEffect(() => {
// //         const getCategories = async () => {
// //             setLoading(true)

// //             const categories = await fetchCourseCategories()

// //             if(categories.length > 0){
// //                 setCourseCategories(categories)
// //             }
// //             setLoading(false)
// //         }

// //         //if form is in edit mode

// //         if(editCourse){
// //             setValue("courseTitle", course.courseName)
// //             setValue("courseShortDesc", course.courseDescription)
// //             setValue("coursePrice", course.price)
// //             setValue("courseTags", course.tag)
// //             setValue("courseBenefits", course.whatYouWillLearn)
// //             setValue("courseCategory", course.category)
// //             setValue("courseRequirements", course.instructions)
// //             setValue("courseImage", course.thumbnail)
// //         }
// //         getCategories()

// //     }, [])


// //     const isFormUpdated = () => {
// //         const currentValues = getValue()

// //         if(
// //             currentValues.courseTitle !== course.courseName ||
// //             currentValues.courseShortDesc !== course.courseDescription ||
// //             currentValues.coursePrice !== course.price ||
// //             currentValues.courseTags.toString() !== course.tag.toString() ||
// //             currentValues.courseBenefits !== course.whatYouWillLearn ||
// //             currentValues.courseCategory._id !== course.category._id ||
// //             currentValues.courseRequirements.toString() !==
// //                 course.instructions.toString() ||
// //             currentValues.courseImage !== course.thumbnail
// //         ){
// //             return true
// //         }
// //         return false
// //     }


// //     const onSubmit = async (data) => {

// //         if(editCourse){

// //             if(isFormUpdated()){

// //                 const currentValues = getValue()
// //                 const formData = new FormData()

// //                 formData.append("courseId" , course._id)

// //                 if (currentValues.courseTitle !== course.courseName) {
// //                 formData.append("courseName", data.courseTitle)
// //                 }
// //             if (currentValues.courseShortDesc !== course.courseDescription) {
// //             formData.append("courseDescription", data.courseShortDesc)
// //             }
// //             if (currentValues.coursePrice !== course.price) {
// //             formData.append("price", data.coursePrice)
// //             }
// //             if (currentValues.courseTags.toString() !== course.tag.toString()) {
// //             formData.append("tag", JSON.stringify(data.courseTags))
// //             }
// //             if (currentValues.courseBenefits !== course.whatYouWillLearn) {
// //             formData.append("whatYouWillLearn", data.courseBenefits)
// //             }
// //             if (currentValues.courseCategory._id !== course.category._id) {
// //             formData.append("category", data.courseCategory)
// //             }
// //             if (
// //             currentValues.courseRequirements.toString() !==
// //             course.instructions.toString()
// //             ) {
// //             formData.append(
// //                 "instructions",
// //                 JSON.stringify(data.courseRequirements)
// //             )
// //             }
// //             if (currentValues.courseImage !== course.thumbnail) {
// //             formData.append("thumbnailImage", data.courseImage)
// //             }

// //             setLoading(true)

// //             const result = await editCourseDetails(formData , token)
// //             setLoading(false)

// //             if(result){
// //                 dispatch(setStep(2))
// //                 dispatch(setCourse(result))
// //             }
// //             }
// //             else{
// //                 toast.error("No Change Made to the form")
// //             }
// //             return
// //         }


// //         const formData = new FormData()

// //         formData.append("courseName", data.courseTitle)
// //         formData.append("courseDescription", data.courseShortDesc)
// //         formData.append("price", data.coursePrice)
// //         formData.append("tag", JSON.stringify(data.courseTags))
// //         formData.append("whatYouWillLearn", data.courseBenefits)
// //         formData.append("category", data.courseCategory)
// //         formData.append("status", COURSE_STATUS.DRAFT)
// //         formData.append("instructions", JSON.stringify(data.courseRequirements))
// //         formData.append("thumbnailImage", data.courseImage)

// //         setLoading(false)

// //         const result = await addCourseDetails(formData, token)

// //         if(result) {
// //             dispatch(setStep(2))
// //             dispatch(setCourse(result))
// //         }

// //         setLoading(false)
// //     }


// //   return (
// //     <form action=""
// //      onSubmit={handleSubmit(onSubmit)}
// //      className='space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6'
// //     >

// //         {/* for course title */}
// //         <div className='flex flex-col space-y-2'> 
// //             <label 
// //             className='text-sm text-richblack-5'
// //             htmlFor="courseTitle">
// //                 Course Title <sup className='text-pink-200'>*</sup>
// //             </label>

// //             <input 
// //              id='courseTitle'
// //              placeholder='Enter Course Title'
// //             {...register("courseTitle" , {required: true})}
// //             className='form-style w-full'
// //             />
// //             {
// //                 errors.courseTitle && (
// //                     <span className='ml-2 text-xs tracking-wide text-pink-200'>
// //                         Course title is required
// //                     </span>
// //                 )
// //             }
// //         </div>

// //         {/*course short description */}
// //         <div className='flex flex-col space-y-2'> 
// //             <label 
// //             className='text-sm text-richblack-5'
// //             htmlFor="courseShortDesc">
// //                 Course Short Description <sup className='text-pink-200'>*</sup>
// //             </label>

// //             <input 
// //              id='courseShortDesc'
// //              placeholder='Enter Course Title'
// //             {...register("courseShortDesc" , {required: true})}
// //             className='form-style resize-x-none min-h-[130px] w-full'
// //             />
// //             {
// //                 errors.courseShortDesc && (
// //                     <span className='ml-2 text-xs tracking-wide text-pink-200'>
// //                         Course Description is required
// //                     </span>
// //                 )
// //             }
// //         </div>

            
            
// //         {/*courseprice */}
// //         <div className='flex flex-col space-y-2'> 
// //             <label 
// //             className='text-sm text-richblack-5'
// //             htmlFor="coursePrice">
// //                 Course Price <sup className='text-pink-200'>*</sup>
// //             </label>

// //             <div className='relative'>
// //             <input 
// //              id='coursePrice'
// //              placeholder='Enter Course Price'
// //             {...register("coursePrice" , {
// //                 required:true,
// //                 valueAsNumber: true,
// //                 pattern: {
// //                     value: /^(0|[1-9]\d*)(\.\d+)?$/,
// //                 },
// //             })}
// //             className='form-style w-full !pl-12'
// //             />
// //             <HiOutlineCurrencyRupee className='absolute left-3 top-1/2 inline-block -translate-y-1/2 text-2xl text-richblack-400' />
// //             </div>

// //             {
// //                 errors.coursePrice && (
// //                     <span className='ml-2 text-xs tracking-wide text-pink-200'>
// //                         Course Price is required
// //                     </span>
// //                 )
// //             }
// //         </div>

// //         {/*course category */}
// //         <div className='flex flex-col space-y-2'> 
// //             <label 
// //             className='text-sm text-richblack-5'
// //             htmlFor="courseCategory">
// //                 Course Category <sup className='text-pink-200'>*</sup>
// //             </label>

// //             <select
// //                 {...register("courseCategory" , {required:true})}
// //                 defaultValue=""
// //                 id='courseCategory'
// //                 className='form-style w-full'
// //             >

// //                 <option value=""
// //                 disabled
// //                 >
// //                     Choose a Category
// //                 </option>
// //                 {
// //                     !loading && 
// //                         courseCategories?.map((category, index) => (
// //                             <option 
// //                              key={index}
// //                             value={category?._id}
// //                             >
// //                                 {category?.name}
// //                             </option>
// //                         ))
// //                 }

// //             </select>
// //             {
// //                 errors.courseCategory && (
// //                     <span className='ml-2 text-xs tracking-wide text-pink-200'>
// //                         Course Category is required
// //                     </span>
// //                 )
// //             }
// //         </div>

// //         {/* courses tags */}
// //         <ChipInput 
// //             label="Tags"
// //             name="courseTags"
// //             placeholder="Enter Tags and press Enter"
// //             register={register}
// //             errors={errors}
// //             setValue={setValue}
// //             getValue={getValue}
// //         />

// //         {/* course thumbnail images */}

// //         <Upload
// //             name="courseImage"
// //             label="course Thumbnail"
// //             register={register}
// //             setValue={setValue}
// //             errors={errors}
// //             editData={editCourse ? course?.thumbnail : null}
// //         />

// //         {/* benefits of courses */}

// //         <div className='flex flex-col space-y-2'> 
// //             <label 
// //             className='text-sm text-richblack-5'
// //             htmlFor="courseBenefits">
// //                 Benifits of the course <sup className='text-pink-200'>*</sup>
// //             </label>

// //             <input 
// //              id='courseBenefits'
// //              placeholder='Enter Course Price'
// //             {...register("courseBenefits" , {required: true})}   
// //             className='form-style resize-x-none min-h-[130px] w-full'
// //             />
          
// //             {
// //                 errors.courseBenefits && (
// //                     <span className='ml-2 text-xs tracking-wide text-pink-200'>
// //                         Benifits of the course is required
// //                     </span>
// //                 )
// //             }
// //         </div>


// //         {/* requirement or instructions */}
// //         <RequirementsField
// //             name="courseRequirements"
// //             label="Requirements/Instructions"
// //             register={register}
// //             setValue={setValue}
// //             errors={errors}
// //             getValue={getValue}
// //         />

// //             {/* next button */}

// //             <div
// //             className='flex justify-end gap-x-2'
// //             >
// //                 {
// //                     editCourse && (
// //                         <button
// //                             onClick={() => dispatch(setStep(2))}
// //                             disabled={loading}
// //                             className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
// //                         >
// //                             Continue Without Saving
// //                         </button>
// //                     )
// //                 }
// //                 <IconBtn
// //                     disabled={loading}
// //                     text={!editCourse ? "Next" : "Save Changes"}
// //                 >
// //                 <MdNavigateNext/>
// //                 </IconBtn>
// //             </div>

// //     </form>
// //   )
// // }

// // export default CourseInformationForm

// import React, { useEffect, useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { HiOutlineCurrencyRupee } from 'react-icons/hi';
// import { MdNavigateNext } from 'react-icons/md';
// import { useDispatch, useSelector } from 'react-redux';
// import toast from 'react-hot-toast';

// import { setCourse, setStep } from '../../../../../slices/courseSlice';
// import { addCourseDetails, editCourseDetails, fetchCourseCategories } from '../../../../../services/operations/courseDetailsAPI';
// import { COURSE_STATUS } from '../../../../../utils/constants';

// import IconBtn from '../../../../common/IconBtn';
// import ChipInput from './ChipInput';
// import RequirementsField from './RequirementsField';
// import Upload from '../Upload';

// const CourseInformationForm = () => {
//   const {
//     register,
//     handleSubmit,
//     setValue,
//     getValues, // Changed from getValue to getValues for consistency with react-hook-form v7+
//     formState: { errors },
//   } = useForm();

//   const dispatch = useDispatch();
//   const { token } = useSelector((state) => state.auth);
//   const { course, editCourse } = useSelector((state) => state.course);
//   const [loading, setLoading] = useState(false);
//   const [courseCategories, setCourseCategories] = useState([]);

//   useEffect(() => {
//     const getCategories = async () => {
//       setLoading(true);
//       try {
//         const categories = await fetchCourseCategories();
//         if (categories.length > 0) {
//           setCourseCategories(categories);
//         }
//       } catch (error) {
//         console.error("Failed to fetch course categories:", error);
//         toast.error("Could not fetch course categories");
//       }
//       setLoading(false);
//     };

//     // If form is in edit mode, populate fields
//     if (editCourse) {
//       setValue("courseTitle", course.courseName);
//       setValue("courseShortDesc", course.courseDescription);
//       setValue("coursePrice", course.price);
//       setValue("courseTags", course.tag);
//       setValue("courseBenefits", course.whatYouWillLearn);
//       setValue("courseCategory", course.category._id); // Ensure category ID is set
//       setValue("courseRequirements", course.instructions);
//       setValue("courseImage", course.thumbnail);
//     }
//     getCategories();
//   }, [editCourse, course, setValue]); // Added dependencies for useEffect

//   const isFormUpdated = () => {
//     const currentValues = getValues();
//     if (
//       currentValues.courseTitle !== course.courseName ||
//       currentValues.courseShortDesc !== course.courseDescription ||
//       currentValues.coursePrice !== course.price ||
//       JSON.stringify(currentValues.courseTags) !== JSON.stringify(course.tag) || // Deep compare arrays
//       currentValues.courseBenefits !== course.whatYouWillLearn ||
//       currentValues.courseCategory !== course.category._id || // Compare IDs
//       JSON.stringify(currentValues.courseRequirements) !==
//         JSON.stringify(course.instructions) || // Deep compare arrays
//       currentValues.courseImage !== course.thumbnail
//     ) {
//       return true;
//     }
//     return false;
//   };

//   const onSubmit = async (data) => {
//     if (editCourse) {
//       if (isFormUpdated()) {
//         const currentValues = getValues();
//         const formData = new FormData();

//         formData.append("courseId", course._id);

//         if (currentValues.courseTitle !== course.courseName) {
//           formData.append("courseName", data.courseTitle);
//         }
//         if (currentValues.courseShortDesc !== course.courseDescription) {
//           formData.append("courseDescription", data.courseShortDesc);
//         }
//         if (currentValues.coursePrice !== course.price) {
//           formData.append("price", data.coursePrice);
//         }
//         if (JSON.stringify(currentValues.courseTags) !== JSON.stringify(course.tag)) {
//           formData.append("tag", JSON.stringify(data.courseTags));
//         }
//         if (currentValues.courseBenefits !== course.whatYouWillLearn) {
//           formData.append("whatYouWillLearn", data.courseBenefits);
//         }
//         if (currentValues.courseCategory !== course.category._id) {
//           formData.append("category", data.courseCategory);
//         }
//         if (
//           JSON.stringify(currentValues.courseRequirements) !==
//           JSON.stringify(course.instructions)
//         ) {
//           formData.append(
//             "instructions",
//             JSON.stringify(data.courseRequirements)
//           );
//         }
//         if (currentValues.courseImage !== course.thumbnail) {
//           formData.append("thumbnailImage", data.courseImage);
//         }

//         setLoading(true);
//         const result = await editCourseDetails(formData, token);
//         setLoading(false);

//         if (result) {
//           dispatch(setStep(2));
//           dispatch(setCourse(result));
//         }
//       } else {
//         toast.error("No changes made to the form");
//       }
//       return;
//     }

//     const formData = new FormData();
//     formData.append("courseName", data.courseTitle);
//     formData.append("courseDescription", data.courseShortDesc);
//     formData.append("price", data.coursePrice);
//     formData.append("tag", JSON.stringify(data.courseTags));
//     formData.append("whatYouWillLearn", data.courseBenefits);
//     formData.append("category", data.courseCategory);
//     formData.append("status", COURSE_STATUS.DRAFT);
//     formData.append("instructions", JSON.stringify(data.courseRequirements));
//     formData.append("thumbnailImage", data.courseImage);

//     setLoading(true);
//     const result = await addCourseDetails(formData, token);
//     setLoading(false);

//     if (result) {
//       dispatch(setStep(2));
//       dispatch(setCourse(result));
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit(onSubmit)}
//       className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-4 md:p-6" // Adjusted padding for mobile
//     >
//       {/* Course Title */}
//       <div className="flex flex-col space-y-2">
//         <label htmlFor="courseTitle" className="text-sm text-richblack-5">
//           Course Title <sup className="text-pink-200">*</sup>
//         </label>
//         <input
//           id="courseTitle"
//           placeholder="Enter Course Title"
//           {...register("courseTitle", { required: true })}
//           className="form-style w-full"
//         />
//         {errors.courseTitle && (
//           <span className="ml-2 text-xs tracking-wide text-pink-200">
//             Course title is required
//           </span>
//         )}
//       </div>

//       {/* Course Short Description */}
//       <div className="flex flex-col space-y-2">
//         <label htmlFor="courseShortDesc" className="text-sm text-richblack-5">
//           Course Short Description <sup className="text-pink-200">*</sup>
//         </label>
//         <textarea // Changed to textarea for short description
//           id="courseShortDesc"
//           placeholder="Enter Course Short Description" // Updated placeholder
//           {...register("courseShortDesc", { required: true })}
//           className="form-style resize-y min-h-[100px] w-full" // Adjusted min-h and resize
//         />
//         {errors.courseShortDesc && (
//           <span className="ml-2 text-xs tracking-wide text-pink-200">
//             Course Description is required
//           </span>
//         )}
//       </div>

//       {/* Course Price */}
//       <div className="flex flex-col space-y-2">
//         <label htmlFor="coursePrice" className="text-sm text-richblack-5">
//           Course Price <sup className="text-pink-200">*</sup>
//         </label>
//         <div className="relative">
//           <input
//             id="coursePrice"
//             placeholder="Enter Course Price"
//             {...register("coursePrice", {
//               required: true,
//               valueAsNumber: true,
//               pattern: {
//                 value: /^(0|[1-9]\d*)(\.\d+)?$/,
//               },
//             })}
//             className="form-style w-full !pl-12"
//           />
//           <HiOutlineCurrencyRupee className="absolute left-3 top-1/2 inline-block -translate-y-1/2 text-2xl text-richblack-400" />
//         </div>
//         {errors.coursePrice && (
//           <span className="ml-2 text-xs tracking-wide text-pink-200">
//             Course Price is required
//           </span>
//         )}
//       </div>

//       {/* Course Category */}
//       <div className="flex flex-col space-y-2">
//         <label htmlFor="courseCategory" className="text-sm text-richblack-5">
//           Course Category <sup className="text-pink-200">*</sup>
//         </label>
//         <select
//           {...register("courseCategory", { required: true })}
//           defaultValue=""
//           id="courseCategory"
//           className="form-style w-full"
//         >
//           <option value="" disabled>
//             Choose a Category
//           </option>
//           {!loading &&
//             courseCategories?.map((category, index) => (
//               <option key={index} value={category?._id}>
//                 {category?.name}
//               </option>
//             ))}
//         </select>
//         {errors.courseCategory && (
//           <span className="ml-2 text-xs tracking-wide text-pink-200">
//             Course Category is required
//           </span>
//         )}
//       </div>

//       {/* Course Tags */}
//       <ChipInput
//         label="Tags"
//         name="courseTags"
//         placeholder="Enter Tags and press Enter"
//         register={register}
//         errors={errors}
//         setValue={setValue}
//         getValues={getValues}
//       />

//       {/* Course Thumbnail Image */}
//       <Upload
//         name="courseImage"
//         label="Course Thumbnail"
//         register={register}
//         setValue={setValue}
//         errors={errors}
//         editData={editCourse ? course?.thumbnail : null}
//       />

//       {/* Benefits of the Course */}
//       <div className="flex flex-col space-y-2">
//         <label htmlFor="courseBenefits" className="text-sm text-richblack-5">
//           Benefits of the Course <sup className="text-pink-200">*</sup>
//         </label>
//         <textarea // Changed to textarea for benefits
//           id="courseBenefits"
//           placeholder="Enter Benefits of the course" // Updated placeholder
//           {...register("courseBenefits", { required: true })}
//           className="form-style resize-y min-h-[100px] w-full" // Adjusted min-h and resize
//         />
//         {errors.courseBenefits && (
//           <span className="ml-2 text-xs tracking-wide text-pink-200">
//             Benefits of the course is required
//           </span>
//         )}
//       </div>

//       {/* Requirements or Instructions */}
//       <RequirementsField
//         name="courseRequirements"
//         label="Requirements/Instructions"
//         register={register}
//         setValue={setValue}
//         errors={errors}
//         getValues={getValues}
//       />

//       {/* Navigation Buttons */}
//       <div className="flex justify-end gap-x-2 flex-col-reverse md:flex-row"> {/* Stack buttons on small screens, row on medium+ */}
//         {editCourse && (
//           <button
//             onClick={() => dispatch(setStep(2))}
//             disabled={loading}
//             className={`flex cursor-pointer items-center justify-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900 mt-4 md:mt-0`} 

//           >
//             Continue Without Saving
//           </button>
//         )}
//         <IconBtn
//           disabled={loading}
//           text={!editCourse ? "Next" : "Save Changes"}
//         >
//           <MdNavigateNext />
//         </IconBtn>
//       </div>
//     </form>
//   );
// };

// export default CourseInformationForm;

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { HiOutlineCurrencyRupee } from 'react-icons/hi';
import { MdNavigateNext } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';

import { setCourse, setStep } from '../../../../../slices/courseSlice';
import { addCourseDetails, editCourseDetails, fetchCourseCategories } from '../../../../../services/operations/courseDetailsAPI';
import { COURSE_STATUS } from '../../../../../utils/constants';

import IconBtn from '../../../../common/IconBtn';
import ChipInput from './ChipInput';
import RequirementsField from './RequirementsField';
import Upload from '../Upload';

const CourseInformationForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues, // Changed from getValue to getValues for consistency with react-hook-form v7+
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { course, editCourse } = useSelector((state) => state.course);
  const [loading, setLoading] = useState(false);
  const [courseCategories, setCourseCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      try {
        const categories = await fetchCourseCategories();
        if (categories.length > 0) {
          setCourseCategories(categories);
        }
      } catch (error) {
        console.error("Failed to fetch course categories:", error);
        toast.error("Could not fetch course categories");
      }
      setLoading(false);
    };

    // If form is in edit mode, populate fields
    if (editCourse) {
      setValue("courseTitle", course.courseName);
      setValue("courseShortDesc", course.courseDescription);
      setValue("coursePrice", course.price);
      setValue("courseTags", course.tag);
      setValue("courseBenefits", course.whatYouWillLearn);
      setValue("courseCategory", course.category._id); // Ensure category ID is set
      setValue("courseRequirements", course.instructions);
      setValue("courseImage", course.thumbnail);
    }
    getCategories();
  }, [editCourse, course, setValue]); // Added dependencies for useEffect

  const isFormUpdated = () => {
    const currentValues = getValues();
    if (
      currentValues.courseTitle !== course.courseName ||
      currentValues.courseShortDesc !== course.courseDescription ||
      currentValues.coursePrice !== course.price ||
      JSON.stringify(currentValues.courseTags) !== JSON.stringify(course.tag) || // Deep compare arrays
      currentValues.courseBenefits !== course.whatYouWillLearn ||
      currentValues.courseCategory !== course.category._id || // Compare IDs
      JSON.stringify(currentValues.courseRequirements) !==
        JSON.stringify(course.instructions) || // Deep compare arrays
      currentValues.courseImage !== course.thumbnail
    ) {
      return true;
    }
    return false;
  };

  const onSubmit = async (data) => {
    if (editCourse) {
      if (isFormUpdated()) {
        const currentValues = getValues();
        const formData = new FormData();

        formData.append("courseId", course._id);

        if (currentValues.courseTitle !== course.courseName) {
          formData.append("courseName", data.courseTitle);
        }
        if (currentValues.courseShortDesc !== course.courseDescription) {
          formData.append("courseDescription", data.courseShortDesc);
        }
        if (currentValues.coursePrice !== course.price) {
          formData.append("price", data.coursePrice);
        }
        if (JSON.stringify(currentValues.courseTags) !== JSON.stringify(course.tag)) {
          formData.append("tag", JSON.stringify(data.courseTags));
        }
        if (currentValues.courseBenefits !== course.whatYouWillLearn) {
          formData.append("whatYouWillLearn", data.courseBenefits);
        }
        if (currentValues.courseCategory !== course.category._id) {
          formData.append("category", data.courseCategory);
        }
        if (
          JSON.stringify(currentValues.courseRequirements) !==
          JSON.stringify(course.instructions)
        ) {
          formData.append(
            "instructions",
            JSON.stringify(data.courseRequirements)
          );
        }
        if (currentValues.courseImage !== course.thumbnail) {
          formData.append("thumbnailImage", data.courseImage);
        }

        setLoading(true);
        const result = await editCourseDetails(formData, token);
        setLoading(false);

        if (result) {
          dispatch(setStep(2));
          dispatch(setCourse(result));
        }
      } else {
        toast.error("No changes made to the form");
      }
      return;
    }

    const formData = new FormData();
    formData.append("courseName", data.courseTitle);
    formData.append("courseDescription", data.courseShortDesc);
    formData.append("price", data.coursePrice);
    formData.append("tag", JSON.stringify(data.courseTags));
    formData.append("whatYouWillLearn", data.courseBenefits);
    formData.append("category", data.courseCategory);
    formData.append("status", COURSE_STATUS.DRAFT);
    formData.append("instructions", JSON.stringify(data.courseRequirements));
    formData.append("thumbnailImage", data.courseImage);

    setLoading(true);
    const result = await addCourseDetails(formData, token);
    setLoading(false);

    if (result) {
      dispatch(setStep(2));
      dispatch(setCourse(result));
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-4 md:p-6" // Adjusted padding for mobile
    >
      {/* Course Title */}
      <div className="flex flex-col space-y-2">
        <label htmlFor="courseTitle" className="text-sm text-richblack-5">
          Course Title <sup className="text-pink-200">*</sup>
        </label>
        <input
          id="courseTitle"
          placeholder="Enter Course Title"
          {...register("courseTitle", { required: true })}
          className="form-style w-full"
        />
        {errors.courseTitle && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course title is required
          </span>
        )}
      </div>

      {/* Course Short Description */}
      <div className="flex flex-col space-y-2">
        <label htmlFor="courseShortDesc" className="text-sm text-richblack-5">
          Course Short Description <sup className="text-pink-200">*</sup>
        </label>
        <textarea // Changed to textarea for short description
          id="courseShortDesc"
          placeholder="Enter Course Short Description" // Updated placeholder
          {...register("courseShortDesc", { required: true })}
          className="form-style resize-y min-h-[100px] w-full" // Adjusted min-h and resize
        />
        {errors.courseShortDesc && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course Description is required
          </span>
        )}
      </div>

      {/* Course Price */}
      <div className="flex flex-col space-y-2">
        <label htmlFor="coursePrice" className="text-sm text-richblack-5">
          Course Price <sup className="text-pink-200">*</sup>
        </label>
        <div className="relative">
          <input
            id="coursePrice"
            placeholder="Enter Course Price"
            {...register("coursePrice", {
              required: true,
              valueAsNumber: true,
              pattern: {
                value: /^(0|[1-9]\d*)(\.\d+)?$/,
              },
            })}
            className="form-style w-full !pl-12"
          />
          <HiOutlineCurrencyRupee className="absolute left-3 top-1/2 inline-block -translate-y-1/2 text-2xl text-richblack-400" />
        </div>
        {errors.coursePrice && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course Price is required
          </span>
        )}
      </div>

      {/* Course Category */}
      <div className="flex flex-col space-y-2">
        <label htmlFor="courseCategory" className="text-sm text-richblack-5">
          Course Category <sup className="text-pink-200">*</sup>
        </label>
        <select
          {...register("courseCategory", { required: true })}
          defaultValue=""
          id="courseCategory"
          className="form-style w-full"
        >
          <option value="" disabled>
            Choose a Category
          </option>
          {!loading &&
            courseCategories?.map((category, index) => (
              <option key={index} value={category?._id}>
                {category?.name}
              </option>
            ))}
        </select>
        {errors.courseCategory && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course Category is required
          </span>
        )}
      </div>

      {/* Course Tags */}
      <ChipInput
        label="Tags"
        name="courseTags"
        placeholder="Enter Tags and press Enter"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />

      {/* Course Thumbnail Image */}
      <Upload
        name="courseImage"
        label="Course Thumbnail"
        register={register}
        setValue={setValue}
        errors={errors}
        editData={editCourse ? course?.thumbnail : null}
      />

      {/* Benefits of the Course */}
      <div className="flex flex-col space-y-2">
        <label htmlFor="courseBenefits" className="text-sm text-richblack-5">
          Benefits of the Course <sup className="text-pink-200">*</sup>
        </label>
        <textarea // Changed to textarea for benefits
          id="courseBenefits"
          placeholder="Enter Benefits of the course" // Updated placeholder
          {...register("courseBenefits", { required: true })}
          className="form-style resize-y min-h-[100px] w-full" // Adjusted min-h and resize
        />
        {errors.courseBenefits && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Benefits of the course is required
          </span>
        )}
      </div>

      {/* Requirements or Instructions */}
      <RequirementsField
        name="courseRequirements"
        label="Requirements/Instructions"
        register={register}
        setValue={setValue}
        errors={errors}
        getValues={getValues}
      />

      {/* Navigation Buttons */}
      <div className="flex justify-end gap-x-2 flex-col-reverse md:flex-row"> {/* Stack buttons on small screens, row on medium+ */}
        {editCourse && (
          <button
            onClick={() => dispatch(setStep(2))}
            disabled={loading}
            className={`flex cursor-pointer items-center justify-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900 mt-4 md:mt-0`}
          >
            Continue Without Saving
          </button>
        )}
        <IconBtn
          disabled={loading}
          text={!editCourse ? "Next" : "Save Changes"}
        >
          <MdNavigateNext />
        </IconBtn>
      </div>
    </form>
  );
};

export default CourseInformationForm;