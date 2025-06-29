// import React, { useEffect, useState } from "react"
// import { BiInfoCircle } from "react-icons/bi"
// import { HiOutlineGlobeAlt } from "react-icons/hi"
// // import { ReactMarkdown } from "react-markdown/lib/react-markdown"
// import ReactMarkdown from "react-markdown"
// import { useDispatch, useSelector } from "react-redux"
// // import { useNavigate, useParams } from "react-router-dom"

// // import ConfirmationModal from "../../components/Common/ConfirmationModal"
// // import Footer from "../../components/Common/Footer"
// // import RatingStars from "../../components/Common/RatingStars"
// import CourseAccordionBar from "../components/core/Course/CourseAccordionBar"
// import CourseDetailsCard from "../components/core/Course/CourseDetailsCard"
// import { formatDate } from "../services/formatDate"
// import { fetchCourseDetails } from "../services/operations/courseDetailsAPI"
// import { BuyCourse } from "../services/operations/studentFeaturesAPI"
// import GetAvgRating from "../utils/avgRating"
// import Error from "./Error"
// import { useNavigate, useParams } from "react-router-dom"
// import RatingStars from "../components/common/RatingStars"
// import Footer from "../components/common/Footer"
// import ConfirmationModal from "../components/common/ConfirmationModal"

// function CourseDetails() {
//   const { user } = useSelector((state) => state.profile)
//   const { token } = useSelector((state) => state.auth)
//   const { loading } = useSelector((state) => state.profile)
//   const { paymentLoading } = useSelector((state) => state.course)
//   const dispatch = useDispatch()
//   const navigate = useNavigate()

//   // Getting courseId from url parameter
//   const { courseId } = useParams()
//   // console.log(`course id: ${courseId}`)

//   // Declear a state to save the course details
//   const [response, setResponse] = useState(null)
//   const [confirmationModal, setConfirmationModal] = useState(null)
//   useEffect(() => {
//     // Calling fetchCourseDetails fucntion to fetch the details
//     ;(async () => {
//       try {
//         const res = await fetchCourseDetails(courseId)
//         // console.log("course details res: ", res)
//         setResponse(res)
//       } catch (error) {
//         console.log("Could not fetch Course Details")
//       }
//     })()
//   }, [courseId])

//   // console.log("response: ", response)

//   // Calculating Avg Review count
//   const [avgReviewCount, setAvgReviewCount] = useState(0)
//   useEffect(() => {
//     const count = GetAvgRating(response?.data?.courseDetails.ratingAndReviews)
//     setAvgReviewCount(count)
//   }, [response])
//   // console.log("avgReviewCount: ", avgReviewCount)

//   // // Collapse all
//   // const [collapse, setCollapse] = useState("")
//   const [isActive, setIsActive] = useState(Array(0))
//   const handleActive = (id) => {
//     // console.log("called", id)
//     setIsActive(
//       !isActive.includes(id)
//         ? isActive.concat([id])
//         : isActive.filter((e) => e != id)
//     )
//   }

//   // Total number of lectures
//   const [totalNoOfLectures, setTotalNoOfLectures] = useState(0)
//   useEffect(() => {
//     let lectures = 0
//     response?.data?.courseDetails?.courseContent?.forEach((sec) => {
//       lectures += sec.subSection.length || 0
//     })
//     setTotalNoOfLectures(lectures)
//   }, [response])

//   if (loading || !response) {
//     return (
//       <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
//         <div className="spinner"></div>
//       </div>
//     )
//   }
//   if (!response.success) {
//     return <Error />
//   }

  
//   console.log("corsedetails   : : :  " , response.data.courseDetails)

//   const {
//     _id: course_id,
//     courseName,
//     courseDescription,
//     thumbnail,
//     price,
//     whatYouWillLearn,
//     courseContent,
//     ratingAndReviews,
//     instructor,
//     studentEnrolled,
//     createdAt,
//   } = response.data?.courseDetails

//   // console.log("corsedetails   : : :  " , response.data?.courseDetails)

//   const handleBuyCourse = () => {
//     if (token) {
//       BuyCourse(token, [courseId], user, navigate, dispatch)
//       return
//     }
//     setConfirmationModal({
//       text1: "You are not logged in!",
//       text2: "Please login to Purchase Course.",
//       btn1Text: "Login",
//       btn2Text: "Cancel",
//       btn1Handler: () => navigate("/login"),
//       btn2Handler: () => setConfirmationModal(null),
//     })
//   }

//   if (paymentLoading) {
//     // console.log("payment loading")
//     return (
//       <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
//         <div className="spinner"></div>
//       </div>
//     )
//   }

//   return (
//     <>
//       <div className={`relative w-full bg-richblack-800`}>
//         {/* Hero Section */}
//         <div className="mx-auto box-content px-4 lg:w-[1260px] 2xl:relative ">
          
//           <div className="mx-auto grid min-h-[450px] max-w-maxContentTab justify-items-center py-8 lg:mx-0 lg:justify-items-start lg:py-0 xl:max-w-[810px]">
//             <div className="relative block max-h-[30rem] lg:hidden">
//               <div className="absolute bottom-0 left-0 h-full w-full shadow-[#161D29_0px_-64px_36px_-28px_inset]"></div>
//               <img
//                 src={thumbnail}
//                 alt="course thumbnail"
//                 className="aspect-auto w-full"
//               />
//             </div>
//             <div
//               className={`z-30 my-5 flex flex-col justify-center gap-4 py-5 text-lg text-richblack-5`}
//             >
//               <div>
//                 <p className="text-4xl font-bold text-richblack-5 sm:text-[42px]">
//                   {courseName}
//                 </p>
//               </div>

//               <p className={`text-richblack-200`}>{courseDescription}</p>
//               <div className="text-md flex flex-wrap items-center gap-2">
//                 <span className="text-yellow-25">{avgReviewCount}</span>
//                 <RatingStars Review_Count={avgReviewCount} Star_Size={24} />
//                 <span>{`(${ratingAndReviews.length} reviews)`}</span>
//                 <span>{`${studentEnrolled.length} students enrolled`}</span>
//               </div>

//               <div>
//                 <p className="">
//                   Created By {`${instructor.firstName} ${instructor.lastName}`}
//                 </p>
//               </div>

//               <div className="flex flex-wrap gap-5 text-lg">
//                 <p className="flex items-center gap-2">
//                   {" "}
//                   <BiInfoCircle /> Created at {formatDate(createdAt)}
//                 </p>
//                 <p className="flex items-center gap-2">
//                   {" "}
//                   <HiOutlineGlobeAlt /> English
//                 </p>
//               </div>

//             </div>
//             <div className="flex w-full flex-col gap-4 border-y border-y-richblack-500 py-4 lg:hidden">
//               <p className="space-x-3 pb-4 text-3xl font-semibold text-richblack-5">
//                 Rs. {price}
//               </p>
//               <button className="yellowButton" onClick={handleBuyCourse}>
//                 Buy Now
//               </button>
//               <button className="blackButton">Add to Cart</button>
//             </div>
//           </div>
//           {/* Courses Card */}
//           <div className=" right-[1rem] top-[60px] mx-auto hidden min-h-[600px] w-1/3 max-w-[410px] translate-y-24 md:translate-y-0 lg:absolute  lg:block">
//             <CourseDetailsCard
//               course={response?.data?.courseDetails}
//               setConfirmationModal={setConfirmationModal}
//               handleBuyCourse={handleBuyCourse}
//             />
//           </div>
          
//         </div>
//       </div>

//       <div className="mx-auto box-content px-4 text-start text-richblack-5 lg:w-[1260px]">
//         <div className="mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[810px]">
//           {/* What will you learn section */}
//           <div className="my-8 border border-richblack-600 p-8">
//             <p className="text-3xl font-semibold">What you'll learn</p>
//             <div className="mt-5">
//               <ReactMarkdown>{whatYouWillLearn}</ReactMarkdown>
//             </div>
//           </div>

//           {/* Course Content Section */}
//           <div className="max-w-[830px] ">
//             <div className="flex flex-col gap-3">
//               <p className="text-[28px] font-semibold">Course Content</p>
//               <div className="flex flex-wrap justify-between gap-2">
//                 <div className="flex gap-2">
//                   <span>
//                     {courseContent.length} {`section(s)`}
//                   </span>
//                   <span>
//                     {totalNoOfLectures} {`lecture(s)`}
//                   </span>
//                   <span>{response.data?.totalDuration} total length</span>
//                 </div>
//                 <div>
//                   <button
//                     className="text-yellow-25"
//                     onClick={() => setIsActive([])}
//                   >
//                     Collapse all sections
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Course Details Accordion */}
//             <div className="py-4">
//               {courseContent?.map((course, index) => (
//                 <CourseAccordionBar
//                   course={course}
//                   key={index}
//                   isActive={isActive}
//                   handleActive={handleActive}
//                 />
//               ))}
//             </div>

//             {/* Author Details */}
//             <div className="mb-12 py-4">
//               <p className="text-[28px] font-semibold">Author</p>
//               <div className="flex items-center gap-4 py-4">
//                 <img
//                   src={
//                     instructor.image
//                       ? instructor.image
//                       : `https://api.dicebear.com/5.x/initials/svg?seed=${instructor.firstName} ${instructor.lastName}`
//                   }
//                   alt="Author"
//                   className="h-14 w-14 rounded-full object-cover"
//                 />
//                 <p className="text-lg">{`${instructor.firstName} ${instructor.lastName}`}</p>
//               </div>
//               <p className="text-richblack-50">
//                 {instructor?.additionalDetails?.about}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       <Footer />
//       {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
//     </>
//   )
// }

// export default CourseDetails

import React, { useEffect, useState } from "react";
import { BiInfoCircle } from "react-icons/bi";
import { HiOutlineGlobeAlt } from "react-icons/hi";
import ReactMarkdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import CourseAccordionBar from "../components/core/Course/CourseAccordionBar";
import CourseDetailsCard from "../components/core/Course/CourseDetailsCard";
import { formatDate } from "../services/formatDate";
import { fetchCourseDetails } from "../services/operations/courseDetailsAPI";
// import { BuyCourse, addToCart } from "../services/operations/studentFeaturesAPI";
import { BuyCourse } from "../services/operations/studentFeaturesAPI"
import GetAvgRating from "../utils/avgRating";
import Error from "./Error";
import RatingStars from "../components/common/RatingStars";
import Footer from "../components/common/Footer";
import ConfirmationModal from "../components/common/ConfirmationModal";
import { motion } from "framer-motion";
import { FaCartPlus } from "react-icons/fa";
import { addToCart } from "../slices/cartSlice";

function CourseDetails() {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.profile);
  const { paymentLoading } = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [response, setResponse] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const [showStickyBar, setShowStickyBar] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchCourseDetails(courseId);
        setResponse(res);
      } catch (error) {
        console.log("Could not fetch Course Details");
      }
    };
    fetchData();
  }, [courseId]);

  // Handle scroll for sticky bar
  useEffect(() => {
    const handleScroll = () => {
      setShowStickyBar(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [avgReviewCount, setAvgReviewCount] = useState(0);
  useEffect(() => {
    const count = GetAvgRating(response?.data?.courseDetails.ratingAndReviews);
    setAvgReviewCount(count);
  }, [response]);

  const [isActive, setIsActive] = useState([]);
  const handleActive = (id) => {
    setIsActive(
      !isActive.includes(id)
        ? isActive.concat([id])
        : isActive.filter((e) => e !== id)
    );
  };

  const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);
  useEffect(() => {
    let lectures = 0;
    response?.data?.courseDetails?.courseContent?.forEach((sec) => {
      lectures += sec.subSection.length || 0;
    });
    setTotalNoOfLectures(lectures);
  }, [response]);

  if (loading || !response) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    );
  }
  
  if (!response.success) {
    return <Error />;
  }

  const {
    courseName,
    courseDescription,
    thumbnail,
    price,
    whatYouWillLearn,
    courseContent,
    ratingAndReviews,
    instructor,
    studentEnrolled,
    createdAt,
  } = response.data?.courseDetails;

  const handleBuyCourse = () => {
    if (token) {
      BuyCourse(token, [courseId], user, navigate, dispatch);
      return;
    }
    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to Purchase Course.",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    });
  };

  const handleAddToCart = () => {
    if (token) {
      dispatch(addToCart(response.data?.courseDetails, navigate));
      return;
    }
    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to add to cart.",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    });
  };

  if (paymentLoading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <>
      <div className={`relative w-full bg-richblack-800`}>
        {/* Hero Section */}
        <div className="mx-auto box-content px-4 lg:w-[1260px] 2xl:relative">
          <div className="mx-auto grid min-h-[450px] max-w-maxContentTab justify-items-center py-8 lg:mx-0 lg:justify-items-start lg:py-0 xl:max-w-[810px]">
            <div className="relative block max-h-[30rem] w-full lg:hidden">
              <div className="absolute bottom-0 left-0 h-full w-full shadow-[#161D29_0px_-64px_36px_-28px_inset]"></div>
              <img
                src={thumbnail}
                alt="course thumbnail"
                className="aspect-video w-full rounded-xl object-cover"
              />
            </div>
            <div
              className={`z-30 my-5 flex flex-col justify-center gap-4 py-5 text-lg text-richblack-5`}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-3xl font-bold text-richblack-5 sm:text-4xl">
                  {courseName}
                </p>
              </motion.div>

              <p className={`text-richblack-200 text-sm md:text-base`}>
                {courseDescription}
              </p>
              <div className="text-md flex flex-wrap items-center gap-2 text-sm md:text-base">
                <span className="text-yellow-25">{avgReviewCount}</span>
                <RatingStars Review_Count={avgReviewCount} Star_Size={20} />
                <span>{`(${ratingAndReviews.length} reviews)`}</span>
                <span>{`${studentEnrolled.length} students enrolled`}</span>
              </div>

              <div>
                <p className="text-sm md:text-base">
                  Created By{" "}
                  <span className="font-semibold text-yellow-50">
                    {`${instructor.firstName} ${instructor.lastName}`}
                  </span>
                </p>
              </div>

              <div className="flex flex-wrap gap-3 text-sm md:text-base">
                <p className="flex items-center gap-2">
                  <BiInfoCircle /> Created at {formatDate(createdAt)}
                </p>
                <p className="flex items-center gap-2">
                  <HiOutlineGlobeAlt /> English
                </p>
              </div>
            </div>
            
            {/* Mobile Buttons */}
            <div className="flex w-full flex-col gap-4 border-y border-y-richblack-500 py-4 lg:hidden">
              <p className="space-x-3 pb-2 text-2xl font-semibold text-richblack-5">
                ₹ {price}
              </p>
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex-1 rounded-lg bg-yellow-50 py-3 px-4 font-bold text-richblack-900 transition-all hover:bg-yellow-100"
                  onClick={handleBuyCourse}
                >
                  Buy Now
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center justify-center gap-2 rounded-lg bg-richblack-700 py-3 px-4 font-bold text-richblack-5 transition-all hover:bg-richblack-600"
                  onClick={handleAddToCart}
                >
                  <FaCartPlus className="text-lg" /> 
                  <span className="hidden sm:inline">Add to Cart</span>
                </motion.button>
              </div>
            </div>
          </div>
          
          {/* Courses Card - Desktop */}
          <div className="right-[1rem] top-[60px] mx-auto hidden min-h-[600px] w-1/3 max-w-[410px] translate-y-24 md:translate-y-0 lg:absolute lg:block">
            <CourseDetailsCard
              course={response?.data?.courseDetails}
              setConfirmationModal={setConfirmationModal}
              handleBuyCourse={handleBuyCourse}
              handleAddToCart={handleAddToCart}
            />
          </div>
        </div>
      </div>

      {/* Sticky Purchase Bar - Mobile */}
      {showStickyBar && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed bottom-0 left-0 z-50 flex w-full items-center justify-between bg-richblack-800 p-4 shadow-[0_-2px_10px_0_rgba(0,0,0,0.5)] lg:hidden"
        >
          <div>
            <p className="text-xl font-bold text-richblack-5">₹ {price}</p>
          </div>
          <div className="flex gap-3">
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="rounded-lg bg-yellow-50 px-4 py-2 font-bold text-richblack-900"
              onClick={handleBuyCourse}
            >
              Buy Now
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="rounded-lg bg-richblack-700 px-4 py-2 font-bold text-richblack-5"
              onClick={handleAddToCart}
            >
              <FaCartPlus className="inline text-lg" />
            </motion.button>
          </div>
        </motion.div>
      )}

      <div className="mx-auto box-content px-4 text-start text-richblack-5 lg:w-[1260px]">
        <div className="mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[810px]">
          {/* What will you learn section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="my-8 rounded-xl border border-richblack-600 p-4 md:p-8"
          >
            <p className="text-2xl font-semibold md:text-3xl">
              What you'll learn
            </p>
            <div className="mt-5 text-sm md:text-base">
              <ReactMarkdown>{whatYouWillLearn}</ReactMarkdown>
            </div>
          </motion.div>

          {/* Course Content Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-[830px]"
          >
            <div className="flex flex-col gap-3">
              <p className="text-2xl font-semibold md:text-[28px]">
                Course Content
              </p>
              <div className="flex flex-wrap justify-between gap-2">
                <div className="flex flex-wrap gap-2 text-sm md:text-base">
                  <span>{courseContent.length} section(s)</span>
                  <span>{totalNoOfLectures} lecture(s)</span>
                  <span>{response.data?.totalDuration} total length</span>
                </div>
                <div>
                  <button
                    className="text-sm text-yellow-25 md:text-base"
                    onClick={() => setIsActive([])}
                  >
                    Collapse all sections
                  </button>
                </div>
              </div>
            </div>

            {/* Course Details Accordion */}
            <div className="py-4">
              {courseContent?.map((course, index) => (
                <CourseAccordionBar
                  course={course}
                  key={index}
                  isActive={isActive}
                  handleActive={handleActive}
                />
              ))}
            </div>

            {/* Author Details */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-12 py-4"
            >
              <p className="text-2xl font-semibold md:text-[28px]">Author</p>
              <div className="flex items-center gap-4 py-4">
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  src={
                    instructor.image
                      ? instructor.image
                      : `https://api.dicebear.com/5.x/initials/svg?seed=${instructor.firstName} ${instructor.lastName}`
                  }
                  alt="Author"
                  className="h-14 w-14 rounded-full object-cover"
                />
                <p className="text-lg font-medium">{`${instructor.firstName} ${instructor.lastName}`}</p>
              </div>
              <p className="text-richblack-50 text-sm md:text-base">
                {instructor?.additionalDetails?.about}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <Footer />
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  );
}

export default CourseDetails;