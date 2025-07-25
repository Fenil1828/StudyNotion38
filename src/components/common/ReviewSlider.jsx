// import React, { useEffect, useState } from "react"
// import ReactStars from "react-rating-stars-component"
// // Import Swiper React components
// import { Swiper, SwiperSlide } from "swiper/react"

// // Import Swiper styles
// import "swiper/css"
// import "swiper/css/free-mode"
// import "swiper/css/pagination"
// import "../../App.css"
// // Icons
// import { FaStar } from "react-icons/fa"
// // Import required modules

// // Get apiFunction and the endpoint
// import { apiConnector } from "../../services/apiConnector"
// import { ratingsEndpoints } from "../../services/apis"
// import { Autoplay, FreeMode, Pagination } from "swiper/modules"

// function ReviewSlider() {
//   const [reviews, setReviews] = useState([])
//   const truncateWords = 15

// //   useEffect(() => {
// //     ;(async () => {
// //       const { data } = await apiConnector(
// //         "GET",
// //         ratingsEndpoints.REVIEWS_DETAILS_API
// //       )
// //       if (data?.success) {
// //         setReviews(data?.data)
// //       }
// //     })()
// //   }, [])

// useEffect(() => {
//   (async () => {
//     const res = await apiConnector("GET", ratingsEndpoints.REVIEWS_DETAILS_API);
//     if (res.data?.success && Array.isArray(res.data.data)) {
//       setReviews(res.data.data);
//     } else {
//       setReviews([]); // fallback to empty array
//     }
//   })();
// }, []);










import React, { useEffect, useState } from "react"
import ReactStars from "react-rating-stars-component"
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import "../../App.css"
// Icons
import { FaStar } from "react-icons/fa"
// Import required modules

// Get apiFunction and the endpoint
import { apiConnector } from "../../services/apiConnector"
import { ratingsEndpoints } from "../../services/apis"
import { Autoplay, FreeMode, Pagination } from "swiper/modules"

function ReviewSlider() {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const truncateWords = 15

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true)
        console.log("Fetching reviews from:", ratingsEndpoints.REVIEWS_DETAILS_API)
        
        const res = await apiConnector("GET", ratingsEndpoints.REVIEWS_DETAILS_API)
        console.log("API Response:", res)
        
        if (res.data?.success && Array.isArray(res.data.data)) {
          console.log("Reviews data:", res.data.data)
          setReviews(res.data.data)
        } else {
          console.log("Invalid response structure or empty data")
          setReviews([]) // fallback to empty array
        }
      } catch (err) {
        console.error("Error fetching reviews:", err)
        setError(err.message)
        setReviews([])
      } finally {
        setLoading(false)
      }
    }

    fetchReviews()
  }, [])













// console.log(reviews)

  return (
    <div className="text-white">
      <div className="my-[50px] h-[184px] max-w-maxContentTab lg:max-w-maxContent">
        <Swiper
          slidesPerView={4}
          spaceBetween={25}
          loop={true}
          freeMode={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[FreeMode, Pagination, Autoplay]}
          className="w-full "
        >
          {reviews.map((review, i) => {
            return (
              <SwiperSlide key={i}>
                <div className="flex flex-col gap-3 bg-richblack-800 p-3 text-[14px] text-richblack-25">
                  <div className="flex items-center gap-4">
                    <img
                      src={
                        review?.user?.image
                          ? review?.user?.image
                          : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                      }
                      alt=""
                      className="h-9 w-9 rounded-full object-cover"
                    />
                    <div className="flex flex-col">
                      <h1 className="font-semibold text-richblack-5">{`${review?.user?.firstName} ${review?.user?.lastName}`}</h1>
                      <h2 className="text-[12px] font-medium text-richblack-500">
                        {review?.course?.courseName}
                      </h2>
                    </div>
                  </div>
                  <p className="font-medium text-richblack-25">
                    {review?.review.split(" ").length > truncateWords
                      ? `${review?.review
                          .split(" ")
                          .slice(0, truncateWords)
                          .join(" ")} ...`
                      : `${review?.review}`}
                  </p>
                  <div className="flex items-center gap-2 ">
                    <h3 className="font-semibold text-yellow-100">
                      {review.rating.toFixed(1)}
                    </h3>
                    <ReactStars
                      count={5}
                      value={review.rating}
                      size={20}
                      edit={false}
                      activeColor="#ffd700"
                      emptyIcon={<FaStar />}
                      fullIcon={<FaStar />}
                    />
                  </div>
                </div>
              </SwiperSlide>
            )
          })}
          {/* <SwiperSlide>Slide 1</SwiperSlide> */}
        </Swiper>
      </div>
    </div>
  )
}

export default ReviewSlider
