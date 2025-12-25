
// src/components/core/ViewCourse/VideoDetailsSidebar.js
import React, { useEffect, useState } from "react";
import { BsChevronDown, BsCheck2 } from "react-icons/bs";
import { IoIosArrowBack } from "react-icons/io";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import IconBtn from "../../common/IconBtn";
import { RxCross2 } from "react-icons/rx";

export default function VideoDetailsSidebar({ setReviewModal, isMobileSidebarOpen, setIsMobileSidebarOpen }) {
  const [activeStatus, setActiveStatus] = useState("");
  const [videoBarActive, setVideoBarActive] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { sectionId, subSectionId } = useParams();
  const {
    courseSectionData,
    courseEntireData,
    totalNoOfLectures,
    completedLectures,
  } = useSelector((state) => state.viewCourse);

  useEffect(() => {
    if (!courseSectionData.length) return;
    const currentSectionIndx = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );

    const currentSubSectionIndx = courseSectionData?.[
      currentSectionIndx
    ]?.subSection.findIndex((data) => data._id === subSectionId);

    const activeSubSectionId =
      courseSectionData[currentSectionIndx]?.subSection?.[
        currentSubSectionIndx
      ]?._id;

    setActiveStatus(courseSectionData?.[currentSectionIndx]?._id);
    setVideoBarActive(activeSubSectionId);
  }, [courseSectionData, courseEntireData, location.pathname, sectionId, subSectionId]);

  return (
    <div className={`
      fixed md:relative inset-y-0 left-0 z-40 w-full md:w-80 flex-shrink-0
      bg-gradient-to-b from-richblack-900 to-richblack-800 border-r border-richblack-700
      transform ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      transition-transform duration-300 ease-in-out
      overflow-y-auto 
    `}>
      {/* Close button for mobile */}
      <button
        onClick={() => setIsMobileSidebarOpen(false)}
        className="md:hidden absolute top-24 right-4 p-1.5 rounded-lg hover:bg-richblack-700"
      >
        <RxCross2 className="text-richblack-5 text-xl" />
      </button>
      
      <div className="p-4 pt-24 md:p-4 flex flex-col gap-4 border-b border-richblack-600">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate("/dashboard/enrolled-courses")}
            className="flex items-center gap-2 text-richblack-300 hover:text-richblack-5 transition-colors"
          >
            <IoIosArrowBack className="text-xl" />
            <span className="hidden md:inline">Back to Courses</span>
          </button>
          
          <IconBtn
            text="Add Review"
            customClasses="hidden md:block"
            onClick={() => {
              setReviewModal(true);
              setIsMobileSidebarOpen(false);
            }}
          />
        </div>

        <div className="flex flex-col">
          <h2 className="text-xl font-bold text-richblack-5">{courseEntireData?.courseName}</h2>
          <p className="text-sm font-medium text-richblack-400">
            {completedLectures?.length} / {totalNoOfLectures} lectures completed
          </p>
        </div>
      </div>

      {/* Mobile review button */}
      <div className="md:hidden p-4">
        <button
          onClick={() => {
            setReviewModal(true);
            setIsMobileSidebarOpen(false);
          }}
          className="w-full py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg text-richblack-900 font-medium"
        >
          Add Course Review
        </button>
      </div>

      <div className="p-2">
        {courseSectionData.map((course, index) => (
          <div
            className="mt-1 cursor-pointer text-richblack-5"
            onClick={() => setActiveStatus(activeStatus === course?._id ? "" : course?._id)}
            key={index}
          >
            {/* Section */}
            <div className="flex flex-row justify-between items-center bg-richblack-700 hover:bg-richblack-600 rounded-lg p-3 transition-colors">
              <div className="flex items-center gap-3">
                <div className="bg-richblack-800 w-8 h-8 rounded-full flex items-center justify-center text-yellow-50 font-bold">
                  {index + 1}
                </div>
                <h3 className="font-medium text-richblack-5">{course?.sectionName}</h3>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-medium bg-richblack-900 px-2 py-1 rounded-full">
                  {course?.subSection.length} lectures
                </span>
                <BsChevronDown 
                  className={`text-richblack-300 transition-transform ${
                    activeStatus === course?._id ? 'rotate-180' : ''
                  }`}
                />
              </div>
            </div>

            {/* Sub Sections */}
            {activeStatus === course?._id && (
              <div className="ml-4 pl-6 border-l border-richblack-600 py-2">
                {course.subSection.map((topic, i) => (
                  <div
                    className={`flex gap-3 items-center p-3 rounded-lg ${
                      videoBarActive === topic._id
                        ? "bg-yellow-900/30 text-yellow-100"
                        : "hover:bg-richblack-700"
                    } transition-colors`}
                    key={i}
                    onClick={() => {
                      navigate(
                        `/view-course/${courseEntireData?._id}/section/${course?._id}/sub-section/${topic?._id}`
                      );
                      setVideoBarActive(topic._id);
                      setIsMobileSidebarOpen(false);
                    }}
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      completedLectures.includes(topic?._id)
                        ? 'bg-green-500'
                        : videoBarActive === topic._id 
                          ? 'bg-yellow-500' 
                          : 'bg-richblack-600'
                    }`}>
                      {completedLectures.includes(topic?._id) ? (
                        <BsCheck2 className="text-white text-xs" />
                      ) : (
                        <div className="w-2 h-2 rounded-full bg-richblack-200"></div>
                      )}
                    </div>
                    <span className={`${videoBarActive === topic._id ? 'font-medium' : ''}`}>
                      {topic.title}
                    </span>
                    <span className="ml-auto text-xs text-richblack-400">
                      {topic.timeDuration}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}