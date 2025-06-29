// import React, { useState } from 'react'
// import { useForm } from 'react-hook-form'
// import { useDispatch, useSelector } from 'react-redux'
// import IconBtn from '../../../../common/IconBtn'
// import { IoAddCircleOutline } from 'react-icons/io5'
// import { MdNavigateNext } from 'react-icons/md'
// import { createSection, updateSection } from '../../../../../services/operations/courseDetailsAPI'
// import { setCourse, setEditCourse, setStep } from '../../../../../slices/courseSlice'
// import toast from 'react-hot-toast'
// // import NestedView from './NestedView'
// import NestedViewforSec from "./NestedViewforSec"

// const CourseBuilderForm = () => {

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     formState: { errors },
//   } = useForm()

  
//   const {course} = useSelector((state) => state.course)
//   const { token } = useSelector((state) => state.auth)
  
//   const [loading, setLoading] = useState(false)
//   const [editSectionName, setEditSectionName] = useState(null)

//   const dispatch = useDispatch()

//   //handle submit
//   const onSubmit = async (data) => {
//     setLoading(true)

//     let result

//     if(editSectionName){

//       result = await updateSection(
//         {
//           sectionName: data.sectionName,
//           sectionId: editSectionName,
//           courseId: course._id,
//         },
//         token
//       )
//     }
//     else{
//       result = await createSection(
//         {
//           sectionName: data.sectionName,
//           courseId: course._id,
//         },
//         token
//       )
//     }

//     if(result){
//       console.log("corse content sis : " , course.courseContent)

//          console.log("result is before dispatch: " , result)

//       dispatch(setCourse(result))
//       setEditSectionName(null)
//       setValue("sectionName" , "")

      
//          console.log("result is after dispatch: " , result)

//     }
//     setLoading(false)

//   }

//   const cancelEdit = () => {
//     setEditSectionName(null)
//     setValue("sectionName" , "")
//   }

//   const handleChangeEditSectionName = (sectionId , sectionName) => {
//     if(editSectionName === sectionId){
//       cancelEdit()
//       return
//     }
//     setEditSectionName(sectionId)
//     setValue("sectionName" , sectionName)
//   }


//   const goToNext = () => {
//     if(course.courseContent.length === 0){
//       toast.error("Please add atleast one section")
//       return
//     }
//     if(
//       course.courseContent.some((section) => section.subSection.length === 0)
//     ){
//       toast.error("Please add atleast one lecture in each section")
//       return
//     }
//     dispatch(setStep(3))
//   }

//   const goBack = () => {
//     dispatch(setStep(1))
//     dispatch(setEditCourse(true))
    
//   }


//   return (
//     <div className='space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6'>
//       <p className='text-2xl font-semibold text-richblack-5'>Course Builder</p>
    
//       <form onSubmit={handleSubmit(onSubmit)} className='space-y-4' >
//         <div className='flex flex-col space-y-2'>
//           <label htmlFor="sectionName" className='text-sm text-richblack-5'>
//             Section Name <sup className='text-pink-200'>*</sup>
//           </label>

//           <input 
//           id="sectionName"
//           disabled={loading}
//           placeholder='Add a Section to build your course'
//           {...register("sectionName" , {required: true})}
//           className='form-style w-full'
//           />

//           {
//             errors.sectionName && (
//               <span className='ml-2 text-xs tracking-wide text-pink-200'>
//                 Section name is required
                
//               </span>
//             )
//           }
//         </div>

          
          

//         <div className='flex items-end gap-x-4'>
//           <IconBtn
//            type="Submit"
//            disabled={loading}
//            text={editSectionName ? "Edit Section Name" : "Create Section"}
//            outline={true}
//           >
//             <IoAddCircleOutline size={20} className='text-yellow-50' />
//           </IconBtn>
//           {
//             editSectionName && (
//               <button
//                type='button'
//                onClick={cancelEdit}
//               className='text-sm text-richblack-300 underline'
//               >
//                 Cancel Edit
//               </button>
//             )
//           }

//         </div>

//       </form>
    
//           {
//             course.courseContent.length > 0 && (
//               console.log("corse length is :  " , course.courseContent),
//               <NestedViewforSec handleChangeEditSectionName={handleChangeEditSectionName} />
              
//             )
//           }



//           {/* next button */}

//           <div className='flex justify-end gap-x-3'>
//             <button
//              onClick={goBack}
//             className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblue-900 `}
//             >
//               Back
//             </button>
//             <IconBtn disabled={loading} text="Next" onClick={goToNext}>
//               <MdNavigateNext/>
//             </IconBtn>
//           </div>
    
    
    
    
    
    
    
//     </div>
//   )
// }

// export default CourseBuilderForm

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import IconBtn from '../../../../common/IconBtn';
import { IoAddCircleOutline } from 'react-icons/io5';
import { MdNavigateNext } from 'react-icons/md';
import { createSection, updateSection } from '../../../../../services/operations/courseDetailsAPI';
import { setCourse, setEditCourse, setStep } from '../../../../../slices/courseSlice';
import toast from 'react-hot-toast';
import NestedViewforSec from "./NestedViewforSec"; // Ensure this component is also responsive internally

const CourseBuilderForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(false);
  const [editSectionName, setEditSectionName] = useState(null);

  const dispatch = useDispatch();

  // Handle form submission (create/update section)
  const onSubmit = async (data) => {
    setLoading(true);
    let result;

    if (editSectionName) {
      // Logic for updating an existing section
      result = await updateSection(
        {
          sectionName: data.sectionName,
          sectionId: editSectionName,
          courseId: course._id,
        },
        token
      );
    } else {
      // Logic for creating a new section
      result = await createSection(
        {
          sectionName: data.sectionName,
          courseId: course._id,
        },
        token
      );
    }

    if (result) {
      // Update the course state with the new/updated section
      dispatch(setCourse(result));
      setEditSectionName(null); // Reset edit state
      setValue("sectionName", ""); // Clear input field
    }
    setLoading(false);
  };

  // Cancel edit mode
  const cancelEdit = () => {
    setEditSectionName(null);
    setValue("sectionName", "");
  };

  // Handle click on "Edit Section" button in NestedViewforSec
  const handleChangeEditSectionName = (sectionId, sectionName) => {
    if (editSectionName === sectionId) {
      // If clicking the same section again, cancel edit mode
      cancelEdit();
      return;
    }
    setEditSectionName(sectionId);
    setValue("sectionName", sectionName); // Populate input with current section name
  };

  // Navigate to the next step (Publish Course)
  const goToNext = () => {
    if (course.courseContent.length === 0) {
      toast.error("Please add at least one section");
      return;
    }
    // Check if any section is empty (has no lectures)
    if (
      course.courseContent.some((section) => section.subSection.length === 0)
    ) {
      toast.error("Please add at least one lecture in each section");
      return;
    }
    dispatch(setStep(3)); // Move to the next step
  };

  // Navigate back to the previous step (Course Information)
  const goBack = () => {
    dispatch(setStep(1));
    dispatch(setEditCourse(true)); // Set editCourse to true to pre-populate form
  };

  return (
    <div className='space-y-6 md:space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-4 md:p-6'> {/* Adjusted vertical spacing and padding for mobile */}
      <p className='text-xl md:text-2xl font-semibold text-richblack-5'>Course Builder</p> {/* Adjusted font size for mobile */}

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        <div className='flex flex-col space-y-2'>
          <label htmlFor="sectionName" className='text-sm text-richblack-5'>
            Section Name <sup className='text-pink-200'>*</sup>
          </label>
          <input
            id="sectionName"
            disabled={loading}
            placeholder='Add a Section to build your course'
            {...register("sectionName", { required: true })}
            className='form-style w-full'
          />
          {errors.sectionName && (
            <span className='ml-2 text-xs tracking-wide text-pink-200'>
              Section name is required
            </span>
          )}
        </div>

        {/* Action Buttons: Create/Edit Section & Cancel Edit */}
        <div className='flex flex-col sm:flex-row items-start sm:items-center gap-x-4 gap-y-2'> {/* Stack on mobile, row on sm+, adjusted gaps */}
          <IconBtn
            type="submit"
            disabled={loading}
            text={editSectionName ? "Edit Section Name" : "Create Section"}
            outline={true}
            className="w-full sm:w-auto justify-center" // Ensure button takes full width on mobile, centers text
          >
            <IoAddCircleOutline size={20} className='text-yellow-50' />
          </IconBtn>
          {editSectionName && (
            <button
              type='button'
              onClick={cancelEdit}
              className='text-sm text-richblack-300 underline w-full sm:w-auto text-center sm:text-left py-2' // Added width classes and text alignment for mobile
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {/* Nested View for Sections and Subsections */}
      {course?.courseContent?.length > 0 && ( // Added optional chaining for safer access
        <>
          {/* console.log("corse length is : ", course.courseContent) */}
          <NestedViewforSec handleChangeEditSectionName={handleChangeEditSectionName} />
        </>
      )}

      {/* Navigation Buttons: Back and Next */}
      <div className='flex justify-end gap-x-2 flex-col-reverse md:flex-row mt-6 md:mt-8'> 
        <button
          onClick={goBack}
          disabled={loading}
          className={`flex cursor-pointer items-center justify-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900 mt-4 md:mt-0 w-full md:w-auto`} 
        >
          Back
        </button>
        <IconBtn disabled={loading} text="Next" onClick={goToNext} className="w-full md:w-auto justify-center">
          <MdNavigateNext />
        </IconBtn>
      </div>
    </div>
  );
};

export default CourseBuilderForm;