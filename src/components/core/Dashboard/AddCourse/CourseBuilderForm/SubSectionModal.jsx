// import React, { useEffect, useState } from 'react'
// import { useForm } from 'react-hook-form'
// import { useDispatch, useSelector } from 'react-redux'
// import { createSubSection, updateSubSection } from '../../../../../services/operations/courseDetailsAPI'
// import toast from 'react-hot-toast'
// import { setCourse } from '../../../../../slices/courseSlice'
// import { RxCross2 } from 'react-icons/rx'
// import Upload from "../Upload"
// import IconBtn from '../../../../common/IconBtn'

// const SubSectionModal = ({
//   modalData,
//   setModalData,
//   add = false,
//   view = false,
//   edit = false,
// }) => {

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     formState: { errors },
//     getValues,
//   } = useForm()


//   const dispatch = useDispatch()
//   const [loading, setLoading] = useState(false)
//   const { token } = useSelector((state) => state.auth)
//   const { course } = useSelector((state) => state.course)

//   useEffect(() => {
//     if(view || edit){
      
//       setValue("lectureTitle", modalData.title)
//       setValue("lectureDesc", modalData.description)
//       setValue("lectureVideo", modalData.videoUrl)
//     }
//   } , [])


//   const isFormUpdated = () => {
//     const currentValues = getValues()

//     if(
//       currentValues.lectureTitle !== modalData.title ||
//       currentValues.lectureDesc !== modalData.description ||
//       currentValues.lectureVideo !== modalData.videoUrl
//     ){
//         return true
//     }
//     return false
//   }


//   //editing the subsection

//   const handleEditSubsection = async () => {
//     const currentValues = getValues()

//     const formData = new FormData()

//     formData.append("sectionId" , modalData.sectionId)
//     formData.append("subSectionId" , modalData._id)

//     if(currentValues.lectureTitle !== modalData.title){
//       formData.append("title" , currentValues.title)
//     }
//     if (currentValues.lectureDesc !== modalData.description) {
//       formData.append("description", currentValues.lectureDesc)
//     }
//     if (currentValues.lectureVideo !== modalData.videoUrl) {
//       formData.append("videoFile", currentValues.lectureVideo)
//     }
//     setLoading(true)

//     const result = await updateSubSection(formData , token)

//     if(result){

//       const updatedCourseContent = course.courseContent.map((section) => (
//         section._id === modalData.sectionId ? result : section
//       ))
//       const updatedCourse = { ...course, courseContent: updatedCourseContent }
//       dispatch(setCourse(updatedCourse))
//     }
//     setModalData(null)
//     setLoading(false)

//   }

//   const onSubmit = async (data) => {
//     if (view) return

//     if(edit){
//       if(!isFormUpdated()){
//         toast.error("No Changes Made To The Form")
//       }
//       else{
//         handleEditSubsection()
//       }
//       return
//     }
  

//   const formData = new FormData()

//   formData.append("sectionId" , modalData)
//   formData.append("title", data.lectureTitle)
//   formData.append("description", data.lectureDesc)
//   formData.append("videoFile", data.lectureVideo)

//   setLoading(true)

//   const result = await createSubSection(formData, token)

//   if(result){

//     const updatedCourseContent = course.courseContent.map((section) => 
//        section._id === modalData ? result : section
//     )

//     const updatedCourse = { ...course, courseContent: updatedCourseContent}
//     dispatch(setCourse(updatedCourse))
//   }

//   setModalData(null)
//   setLoading(false)

//   }

//   return (
//     <div className='fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm'>
//       <div className='my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800'>
         
//          <div className='flex items-center justify-between rounded-t-lg bg-richblack-700 p-5'>
//           <p className='text-xl font-semibold text-richblack-5'>
//             {view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture
//           </p>

//           <button onClick={() => {
//             if (!loading) {
//               setModalData(null);
//             }
//             }}>
//             <RxCross2 className='text-2xl text-richblack-5' />
//           </button>

//          </div>

     


//       <form
//        onSubmit={handleSubmit(onSubmit)}
//        className='space-y-8 px-8 py-10'
//       >

//         <Upload
//             name="lectureVideo"
//             label="Lecture Video"
//             register={register}
//             setValue={setValue}
//             errors={errors}
//             video={true}
//             viewData={view ? modalData.videoUrl : null}
//             editData={edit ? modalData.videoUrl : null}
//         />

//             {/* lecture title */}
//           <div className='flex flex-col space-y-2'>
//             <label htmlFor="lectureTitle"
//              className='text-sm text-richblack-5'
//             >
//               Lecture Title {!view && <sup className='text-pink-200'>*</sup>}
//             </label>

//             <input 
//              disabled={view || loading}
//              id='lectureTitle'
//              placeholder='Enter Lecture Title'
//              { ...register("lectureTitle" , {required: true})}
//              className='form-style w-full'
//             />

//             {
//               errors.lectureTitle && (
//                 <span className='ml-2 text-xs tracking-wide text-pink-200'>
//                   Lecture title is required
//                 </span>
//               )
//             }
//           </div>

//           {/*  lecture description */}

//           <div className='flex flex-col space-y-2'>
//             <label htmlFor="lectureDesc"
//              className='text-sm text-richblack-5'
//             >
//               Lecture Description {" "} 
//               {!view && <sup className='text-pink-200'>*</sup>}
//             </label>

//             <textarea 
//              disabled={view || loading}
//              id='lectureDesc'
//              placeholder='Enter Lecture Description'
//              { ...register("lectureDesc" , {required: true})}
//              className='form-style resize-x-none min-h-[130px] w-full'
//             />

//             {
//               errors.lectureDesc && (
//                 <span className='ml-2 text-xs tracking-wide text-pink-200'>
//                   Lecture Description is required
//                 </span>
//               )
//             }
//           </div>

//             {
//               !view && (
//                 <div className='flex justify-end'>
//                   <IconBtn
//                     disabled={loading}
//                     text={loading ? "Loading.." : edit ? "Save Changes" : "Save"}
//                   />
//                 </div>

//               )
//             }

      

//       </form>
//        </div>
//     </div>
//   )
// }

// export default SubSectionModal

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { createSubSection, updateSubSection } from '../../../../../services/operations/courseDetailsAPI';
import toast from 'react-hot-toast';
import { setCourse } from '../../../../../slices/courseSlice';
import { RxCross2 } from 'react-icons/rx';
import Upload from "../Upload"; // Assuming Upload component is already responsive or will be
import IconBtn from '../../../../common/IconBtn'; // Assuming IconBtn is already responsive or will be

const SubSectionModal = ({
  modalData,
  setModalData,
  add = false,
  view = false,
  edit = false,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
  } = useForm();

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const { course } = useSelector((state) => state.course);

  // Set form values when in view or edit mode
  useEffect(() => {
    if (view || edit) {
      setValue("lectureTitle", modalData.title);
      setValue("lectureDesc", modalData.description);
      setValue("lectureVideo", modalData.videoUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array means this runs once on mount, which is fine for initial value setting.

  // Check if form values have been updated from initial modalData
  const isFormUpdated = () => {
    const currentValues = getValues();
    if (
      currentValues.lectureTitle !== modalData.title ||
      currentValues.lectureDesc !== modalData.description ||
      currentValues.lectureVideo !== modalData.videoUrl // Compare video URL, not the file object directly
    ) {
      return true;
    }
    return false;
  };

  // Handle saving changes when in edit mode
  const handleEditSubsection = async () => {
    const currentValues = getValues();
    const formData = new FormData();

    formData.append("sectionId", modalData.sectionId);
    formData.append("subSectionId", modalData._id);

    // Only append fields if they have changed
    if (currentValues.lectureTitle !== modalData.title) {
      formData.append("title", currentValues.lectureTitle); // Corrected to use currentValues.lectureTitle
    }
    if (currentValues.lectureDesc !== modalData.description) {
      formData.append("description", currentValues.lectureDesc);
    }
    // Only append video if it's a new file (not just the same URL)
    if (currentValues.lectureVideo instanceof File) { // Check if it's a new file object
        formData.append("videoFile", currentValues.lectureVideo);
    } else if (currentValues.lectureVideo !== modalData.videoUrl) {
        // Handle case where video URL changed but it's not a new file upload (less common, usually a file replaces it)
        // For simplicity, we assume if it's not a file, it's the old URL, or it's an empty string if cleared.
        // If your backend handles updating video by URL directly, you might need a different approach here.
        // For now, only send the file if it's a File object.
    }

    setLoading(true);
    const result = await updateSubSection(formData, token);

    if (result) {
      // Update the course content in Redux store
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === modalData.sectionId ? result : section
      );
      const updatedCourse = { ...course, courseContent: updatedCourseContent };
      dispatch(setCourse(updatedCourse));
    }
    setModalData(null); // Close the modal
    setLoading(false);
  };

  // Handle form submission (create or edit)
  const onSubmit = async (data) => {
    if (view) return; // Do nothing if in view mode

    if (edit) {
      if (!isFormUpdated()) {
        toast.error("No Changes Made To The Form");
      } else {
        handleEditSubsection();
      }
      return;
    }

    // Logic for adding a new subsection
    const formData = new FormData();
    formData.append("sectionId", modalData); // modalData is sectionId when adding
    formData.append("title", data.lectureTitle);
    formData.append("description", data.lectureDesc);
    formData.append("videoFile", data.lectureVideo);

    setLoading(true);
    const result = await createSubSection(formData, token);

    if (result) {
      // Update the course content in Redux store after adding
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === modalData ? result : section
      );
      const updatedCourse = { ...course, courseContent: updatedCourseContent };
      dispatch(setCourse(updatedCourse));
    }

    setModalData(null); // Close the modal
    setLoading(false);
  };

  return (
    // Modal Overlay
    <div className='fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm p-4'> {/* Added padding to overlay for small screens */}
      {/* Modal Container */}
      <div className='my-10 w-full max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800 animate-slide-in-top'> {/* Made width full on mobile, max-width for larger screens */}
        {/* Modal Header */}
        <div className='flex items-center justify-between rounded-t-lg bg-richblack-700 p-3 sm:p-5'> {/* Adjusted padding for header */}
          <p className='text-lg sm:text-xl font-semibold text-richblack-5'> {/* Adjusted font size for header title */}
            {view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture
          </p>
          <button
            onClick={() => {
              if (!loading) {
                setModalData(null); // Close modal only if not loading
              }
            }}
            aria-label="Close modal" // Added accessibility label
          >
            <RxCross2 className='text-xl sm:text-2xl text-richblack-5 hover:text-richblack-200 transition-colors duration-200' /> {/* Adjusted icon size, added hover effect */}
          </button>
        </div>

        {/* Modal Body (Form) */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='space-y-6 p-4 sm:p-8 lg:p-10' // Adjusted padding and vertical spacing
        >
          {/* Lecture Video Upload */}
          <Upload
            name="lectureVideo"
            label="Lecture Video"
            register={register}
            setValue={setValue}
            errors={errors}
            video={true}
            viewData={view ? modalData.videoUrl : null}
            editData={edit ? modalData.videoUrl : null}
            disabled={view || loading} // Added disabled prop to Upload component
          />

          {/* Lecture Title Input */}
          <div className='flex flex-col space-y-2'>
            <label
              htmlFor="lectureTitle"
              className='text-sm text-richblack-5'
            >
              Lecture Title {!view && <sup className='text-pink-200'>*</sup>}
            </label>
            <input
              disabled={view || loading}
              id='lectureTitle'
              placeholder='Enter Lecture Title'
              {...register("lectureTitle", { required: true })}
              className='form-style w-full'
            />
            {errors.lectureTitle && (
              <span className='ml-2 text-xs tracking-wide text-pink-200'>
                Lecture title is required
              </span>
            )}
          </div>

          {/* Lecture Description Textarea */}
          <div className='flex flex-col space-y-2'>
            <label
              htmlFor="lectureDesc"
              className='text-sm text-richblack-5'
            >
              Lecture Description {" "}
              {!view && <sup className='text-pink-200'>*</sup>}
            </label>
            <textarea
              disabled={view || loading}
              id='lectureDesc'
              placeholder='Enter Lecture Description'
              {...register("lectureDesc", { required: true })}
              className='form-style resize-y min-h-[100px] sm:min-h-[130px] w-full' // Changed resize-x-none to resize-y, adjusted min-height
            />
            {errors.lectureDesc && (
              <span className='ml-2 text-xs tracking-wide text-pink-200'>
                Lecture Description is required
              </span>
            )}
          </div>

          {/* Action Button (Save/Save Changes) */}
          {!view && (
            <div className='flex justify-end mt-4'> {/* Adjusted top margin */}
              <IconBtn
                disabled={loading}
                text={loading ? "Loading..." : edit ? "Save Changes" : "Save"}
                type="submit" // Ensure button type is submit
                className="w-full sm:w-auto justify-center" // Full width on mobile, auto width on sm+, centered content
              />
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default SubSectionModal;