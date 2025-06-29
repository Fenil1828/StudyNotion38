
// import { useEffect, useState } from "react"
// import { useDispatch, useSelector } from "react-redux"
// import { Outlet, useParams } from "react-router-dom"

// import CourseReviewModal from "../components/core/ViewCourse/CourseReviewModal"
// import VideoDetailsSidebar from "../components/core/ViewCourse/VideoDetailsSidebar"
// import { getFullDetailsOfCourse } from "../services/operations/courseDetailsAPI"
// import {
//   setCompletedLectures,
//   setCourseSectionData,
//   setEntireCourseData,
//   setTotalNoOfLectures,
// } from "../slices/viewCourseSlice"

// export default function ViewCourse() {
//   const { courseId } = useParams()
//   const { token } = useSelector((state) => state.auth)
//   const dispatch = useDispatch()
//   const [reviewModal, setReviewModal] = useState(false)

//   useEffect(() => {
//     ;(async () => {
//       const courseData = await getFullDetailsOfCourse(courseId, token)
//       console.log("Course Data here... ", courseData.courseDetails)


//       dispatch(setCourseSectionData(courseData.courseDetails.courseContent))
//       dispatch(setEntireCourseData(courseData.courseDetails))
//       dispatch(setCompletedLectures(courseData.completedVideos))
//       let lectures = 0
//       courseData?.courseDetails?.courseContent?.forEach((sec) => {
//         lectures += sec.subSection.length
//       })
//       dispatch(setTotalNoOfLectures(lectures))
//     })()
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [])

//   return (
//     <>
//       <div className="relative flex min-h-[calc(100vh-3.5rem)]">
//         <VideoDetailsSidebar setReviewModal={setReviewModal} />
//         <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
//           <div className="mx-6">
//             <Outlet />
//           </div>
//         </div>
//       </div>
//       {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
//     </>
//   )
// }


// src/pages/ViewCourse.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import CourseReviewModal from "../components/core/ViewCourse/CourseReviewModal";
import VideoDetailsSidebar from "../components/core/ViewCourse/VideoDetailsSidebar";
import { getFullDetailsOfCourse } from "../services/operations/courseDetailsAPI";
import {
  setCompletedLectures,
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
} from "../slices/viewCourseSlice";

export default function ViewCourse() {
  const { courseId } = useParams();
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [reviewModal, setReviewModal] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const courseData = await getFullDetailsOfCourse(courseId, token);
      
      dispatch(setCourseSectionData(courseData.courseDetails.courseContent));
      dispatch(setEntireCourseData(courseData.courseDetails));
      dispatch(setCompletedLectures(courseData.completedVideos));
      
      let lectures = 0;
      courseData?.courseDetails?.courseContent?.forEach((sec) => {
        lectures += sec.subSection.length;
      });
      dispatch(setTotalNoOfLectures(lectures));
    })();
  }, [courseId, token, dispatch]);

  return (
    <div className="relative flex min-h-[calc(100vh-3.5rem)]  bg-richblack-900 text-richblack-5 ">
      {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
      
      {/* Mobile sidebar toggle */}
      <button
        onClick={() => setIsMobileSidebarOpen(true)}
        className="md:hidden fixed top-20 left-4 z-30 p-2 rounded-lg bg-richblack-800 border border-richblack-600 shadow-lg"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-richblack-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>

      <VideoDetailsSidebar 
        setReviewModal={setReviewModal} 
        isMobileSidebarOpen={isMobileSidebarOpen}
        setIsMobileSidebarOpen={setIsMobileSidebarOpen}
      />
      
      <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
        <div className="mx-4 md:mx-8 py-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}