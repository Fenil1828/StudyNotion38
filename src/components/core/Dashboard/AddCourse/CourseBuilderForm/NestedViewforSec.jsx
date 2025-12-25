// import { useState, useCallback } from "react";
// import { AiFillCaretDown } from "react-icons/ai";
// import { FaPlus } from "react-icons/fa";
// import { MdEdit } from "react-icons/md";
// import { RiDeleteBin6Line } from "react-icons/ri";
// import { RxDropdownMenu } from "react-icons/rx";
// import { useDispatch, useSelector } from "react-redux";

// import {
//   deleteSection,
//   deleteSubSection,
// } from "../../../../../services/operations/courseDetailsAPI";
// import { setCourse } from "../../../../../slices/courseSlice";
// import ConfirmationModal from "../../../../common/ConfirmationModal";
// import SubSectionModal from "./SubSectionModal";

// const NestedViewforSec = ({ handleChangeEditSectionName }) => {
//   const { course } = useSelector((state) => state.course);
//   const { token } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();

//   const [addSubSection, setAddSubsection] = useState(null);
//   const [viewSubSection, setViewSubSection] = useState(null);
//   const [editSubSection, setEditSubSection] = useState(null);
//   const [confirmationModal, setConfirmationModal] = useState(null);

//    const handleDeleleSection = async (sectionId) => {
//     const result = await deleteSection({
//       sectionId,
//       courseId: course._id},
//       token,
//     )
//     if (result) {
//       dispatch(setCourse(result))
//     }
//     setConfirmationModal(null)
//   }

//   const handleDeleteSubSection = async (subSectionId, sectionId) => {
//     const result = await deleteSubSection({ subSectionId, sectionId, token })
//     if (result) {
//       // update the structure of course
//       const updatedCourseContent = course.courseContent.map((section) =>
//         section._id === sectionId ? result : section
//       )
//       const updatedCourse = { ...course, courseContent: updatedCourseContent }
//       dispatch(setCourse(updatedCourse))
//     }
//     setConfirmationModal(null)
//   }

//   return (
//    <div>

//       <div className="rounded-lg bg-richblack-700 p-6 px-8" id="nestedViewContainer">
//         {course?.courseContent?.map((section) => (
//           <details key={section._id} open>
//             <summary className="flex cursor-pointer items-center justify-between border-b-2 border-b-richblack-600 py-2">
//               <div className="flex items-center gap-x-3">
//                 <RxDropdownMenu className="text-2xl text-richblack-50" />
//                 <p className="font-semibold text-richblack-50">
//                   {section.sectionName}
//                 </p>
//               </div>
//               <div className="flex items-center gap-x-3">
//                 <button
//                   onClick={() =>
//                     handleChangeEditSectionName(section._id, section.sectionName)
//                   }
//                 >
//                   <MdEdit className="text-xl text-richblack-300" />
//                 </button>
//                 <button
//                   onClick={() =>
//                     setConfirmationModal({
//                       text1: "Delete this Section?",
//                       text2: "All the lectures in this section will be deleted",
//                       btn1Text: "Delete",
//                       btn2Text: "Cancel",
//                       btn1Handler: () => handleDeleleSection(section._id),
//                       btn2Handler: () => setConfirmationModal(null),
//                     })
//                   }
//                 >
//                   <RiDeleteBin6Line className="text-xl text-richblack-300" />
//                 </button>
//                 <span className="font-medium text-richblack-300">|</span>
//                 <AiFillCaretDown className="text-xl text-richblack-300" />
//               </div>
//             </summary>
//             <div className="px-6 pb-4">
//               {section.subSection.map((data) => (
//                 <div
//                   key={data._id}
//                   onClick={() => setViewSubSection(data)}
//                   className="flex cursor-pointer items-center justify-between gap-x-3 border-b-2 border-b-richblack-600 py-2"
//                 >
//                   <div className="flex items-center gap-x-3 py-2">
//                     <RxDropdownMenu className="text-2xl text-richblack-50" />
//                     <p className="font-semibold text-richblack-50">{data.title}</p>
//                   </div>
//                   <div
//                     onClick={(e) => e.stopPropagation()}
//                     className="flex items-center gap-x-3"
//                   >
//                     <button
//                       onClick={() =>
//                         setEditSubSection({ ...data, sectionId: section._id })
//                       }
//                     >
//                       <MdEdit className="text-xl text-richblack-300" />
//                     </button>
//                     <button
//                       onClick={() =>
//                         setConfirmationModal({
//                           text1: "Delete this Sub-Section?",
//                           text2: "This lecture will be deleted",
//                           btn1Text: "Delete",
//                           btn2Text: "Cancel",
//                           btn1Handler: () =>
//                             handleDeleteSubSection(data._id, section._id),
//                           btn2Handler: () => setConfirmationModal(null),
//                         })
//                       }
//                     >
//                       <RiDeleteBin6Line className="text-xl text-richblack-300" />
//                     </button>
//                   </div>
//                 </div>
//               ))}
//               <button
//                 onClick={() => setAddSubsection(section._id)}
//                 className="mt-3 flex items-center gap-x-1 text-yellow-50"
//               >
//                 <FaPlus className="text-lg" />
//                 <p>Add Lecture</p>
//               </button>
//             </div>
//           </details>
//         ))}
//       </div>

//       {addSubSection && (
//         <SubSectionModal
//           modalData={addSubSection}
//           setModalData={setAddSubsection}
//           add={true}
//         />
//       )}
//       {viewSubSection && (
//         <SubSectionModal
//           modalData={viewSubSection}
//           setModalData={setViewSubSection}
//           view={true}
//         />
//       )}
//       {editSubSection && (
//         <SubSectionModal
//           modalData={editSubSection}
//           setModalData={setEditSubSection}
//           edit={true}
//         />
//       )}
//       {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}

//    </div> 
//   )
// };

// export default NestedViewforSec;

import { useState, useCallback } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { RxDropdownMenu } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";

import {
  deleteSection,
  deleteSubSection,
} from "../../../../../services/operations/courseDetailsAPI";
import { setCourse } from "../../../../../slices/courseSlice";
import ConfirmationModal from "../../../../common/ConfirmationModal";
import SubSectionModal from "./SubSectionModal";

const NestedViewforSec = ({ handleChangeEditSectionName }) => {
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [addSubSection, setAddSubsection] = useState(null);
  const [viewSubSection, setViewSubSection] = useState(null);
  const [editSubSection, setEditSubSection] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState(null);

  // Memoize handlers for performance, though not strictly necessary for responsiveness
  const handleDeleleSection = useCallback(async (sectionId) => {
    const result = await deleteSection({
      sectionId,
      courseId: course._id
    },
      token,
    );
    if (result) {
      dispatch(setCourse(result));
    }
    setConfirmationModal(null);
  }, [course, token, dispatch]); // Added dependencies

  const handleDeleteSubSection = useCallback(async (subSectionId, sectionId) => {
    const result = await deleteSubSection({ subSectionId, sectionId, token });
    if (result) {
      // Update the structure of course
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === sectionId ? result : section
      );
      const updatedCourse = { ...course, courseContent: updatedCourseContent };
      dispatch(setCourse(updatedCourse));
    }
    setConfirmationModal(null);
  }, [course, token, dispatch]); // Added dependencies

  return (
    <div>
      <div className="rounded-lg bg-richblack-700 p-4 md:p-6 lg:p-8 px-4 md:px-6 lg:px-8" id="nestedViewContainer"> {/* Adjusted padding for various screen sizes */}
        {course?.courseContent?.map((section) => (
          <details key={section._id} open className="mb-4 last:mb-0"> {/* Added margin-bottom for spacing between sections */}
            <summary className="flex cursor-pointer items-center justify-between border-b-2 border-b-richblack-600 py-2 sm:py-3 px-2 sm:px-4"> {/* Adjusted vertical padding and horizontal padding for summary */}
              <div className="flex items-center gap-x-2 sm:gap-x-3 w-4/5 overflow-hidden"> {/* Adjusted gap and added width with overflow handling */}
                <RxDropdownMenu className="text-xl sm:text-2xl text-richblack-50 shrink-0" /> {/* Adjusted icon size, added shrink-0 */}
                <p className="font-semibold text-richblack-50 text-base sm:text-lg truncate"> {/* Adjusted font size, added truncate */}
                  {section.sectionName}
                </p>
              </div>
              <div className="flex items-center gap-x-2 sm:gap-x-3 min-w-max"> {/* Adjusted gap, added min-w-max to prevent wrapping */}
                <button
                  onClick={() =>
                    handleChangeEditSectionName(section._id, section.sectionName)
                  }
                  aria-label={`Edit section ${section.sectionName}`} // Added accessibility label
                >
                  <MdEdit className="text-lg sm:text-xl text-richblack-300 hover:text-richblack-50 transition-colors duration-200" /> {/* Adjusted icon size, added hover */}
                </button>
                <button
                  onClick={() =>
                    setConfirmationModal({
                      text1: "Delete this Section?",
                      text2: "All the lectures in this section will be deleted",
                      btn1Text: "Delete",
                      btn2Text: "Cancel",
                      btn1Handler: () => handleDeleleSection(section._id),
                      btn2Handler: () => setConfirmationModal(null),
                    })
                  }
                  aria-label={`Delete section ${section.sectionName}`} // Added accessibility label
                >
                  <RiDeleteBin6Line className="text-lg sm:text-xl text-richblack-300 hover:text-richblack-50 transition-colors duration-200" /> {/* Adjusted icon size, added hover */}
                </button>
                <span className="font-medium text-richblack-300">|</span>
                <AiFillCaretDown className="text-lg sm:text-xl text-richblack-300" /> {/* Adjusted icon size */}
              </div>
            </summary>
            <div className="px-2 sm:px-4 md:px-6 pb-2 sm:pb-4"> {/* Adjusted padding */}
              {section.subSection.map((data) => (
                <div
                  key={data._id}
                  onClick={() => setViewSubSection(data)}
                  className="flex cursor-pointer items-center justify-between gap-x-2 sm:gap-x-3 border-b-2 border-b-richblack-600 py-2" // Adjusted gap and vertical padding
                >
                  <div className="flex items-center gap-x-2 sm:gap-x-3 py-1 sm:py-2 w-4/5 overflow-hidden"> {/* Adjusted gap, vertical padding, width, and overflow */}
                    <RxDropdownMenu className="text-xl sm:text-2xl text-richblack-50 shrink-0" /> {/* Adjusted icon size, added shrink-0 */}
                    <p className="font-semibold text-richblack-50 text-base sm:text-lg truncate"> {/* Adjusted font size, added truncate */}
                      {data.title}
                    </p>
                  </div>
                  <div
                    onClick={(e) => e.stopPropagation()} // Prevents opening modal when clicking buttons
                    className="flex items-center gap-x-2 sm:gap-x-3 min-w-max" // Adjusted gap, added min-w-max
                  >
                    <button
                      onClick={() =>
                        setEditSubSection({ ...data, sectionId: section._id })
                      }
                      aria-label={`Edit lecture ${data.title}`} // Added accessibility label
                    >
                      <MdEdit className="text-lg sm:text-xl text-richblack-300 hover:text-richblack-50 transition-colors duration-200" /> {/* Adjusted icon size, added hover */}
                    </button>
                    <button
                      onClick={() =>
                        setConfirmationModal({
                          text1: "Delete this Sub-Section?",
                          text2: "This lecture will be deleted",
                          btn1Text: "Delete",
                          btn2Text: "Cancel",
                          btn1Handler: () =>
                            handleDeleteSubSection(data._id, section._id),
                          btn2Handler: () => setConfirmationModal(null),
                        })
                      }
                      aria-label={`Delete lecture ${data.title}`} // Added accessibility label
                    >
                      <RiDeleteBin6Line className="text-lg sm:text-xl text-richblack-300 hover:text-richblack-50 transition-colors duration-200" /> {/* Adjusted icon size, added hover */}
                    </button>
                  </div>
                </div>
              ))}
              <button
                onClick={() => setAddSubsection(section._id)}
                className="mt-3 flex items-center gap-x-1 sm:gap-x-2 text-yellow-50 text-base sm:text-lg hover:text-yellow-25 transition-colors duration-200" // Adjusted gap, font size, added hover
              >
                <FaPlus className="text-md sm:text-lg" /> {/* Adjusted icon size */}
                <p>Add Lecture</p>
              </button>
            </div>
          </details>
        ))}
      </div>

      {/* Modals for Add, View, Edit SubSection and Confirmation */}
      {addSubSection && (
        <SubSectionModal
          modalData={addSubSection}
          setModalData={setAddSubsection}
          add={true}
        />
      )}
      {viewSubSection && (
        <SubSectionModal
          modalData={viewSubSection}
          setModalData={setViewSubSection}
          view={true}
        />
      )}
      {editSubSection && (
        <SubSectionModal
          modalData={editSubSection}
          setModalData={setEditSubSection}
          edit={true}
        />
      )}
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
};

export default NestedViewforSec;