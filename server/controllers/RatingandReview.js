
const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");
const { json } = require("express");
const { default: mongoose } = require("mongoose");
const { data } = require("react-router-dom");
const { default: toast } = require("react-hot-toast");


// Create a new rating and review
exports.createRating = async (req, res) => {
  try {
    const userId = req.user.id
    const { rating, review, courseId } = req.body

    // Check if the user is enrolled in the course

    const courseDetails = await Course.findOne({
      _id: courseId,
      studentEnrolled: { $elemMatch: { $eq: userId } },
    })

    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: "Student is not enrolled in this course",
      })
    }

    // Check if the user has already reviewed the course
    const alreadyReviewed = await RatingAndReview.findOne({
      user: userId,
      course: courseId,
    })

    if (alreadyReviewed) {
      return res.status(403).json({
        success: false,
        message: "Course already reviewed by user",
      })
    }

    // Create a new rating and review
    const ratingReview = await RatingAndReview.create({
      rating,
      review,
      course: courseId,
      user: userId,
    })

    // Add the rating and review to the course
    await Course.findByIdAndUpdate(courseId, {
      $push: {
        ratingAndReviews: ratingReview,
      },
    })
    await courseDetails.save()

    return res.status(201).json({
      success: true,
      message: "Rating and review created successfully",
      ratingReview,
    })
  } catch (error) {
    console.error(error)
    console.log(error)
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    })
  }
}


//get Average Rating
exports.getAverageRating = async (req, res) => {
  try {
    //get course ID
    const courseId = req.body.courseId;

    //Calculate avg
    const result = await RatingAndReview.aggregate([
      {
        $match: {
          course: mongoose.Types.ObjectId(courseId),
        },
      },
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
        },
      },
    ]);

    //return response
    if (result.length > 0) {
      return res.status(200).json({
        success: true,
        averageRating: result[0].averageRating,
      });
    }

    //rating not exist in case
    return res.status(200).json({
      success: true,
      message: "Average rating is0, no ratings give till now",
      averageRating: 0,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to Average rating ",
    });
  }
};

//get All Rating and reviews

exports.getAllRatingReview = async (req, res) => {
  try {
    const allReviews = await RatingAndReview.find({})
      .sort({ rating: "desc" })
      .populate({
        path: "user",
        select: "firstName lastName image email",
      })
      .populate({
        path: "course",
        select: "courseName",
      })
      .exec();

      return res.status(200).json({
        success:true,
        message:"All Review Fetched Successfully",
        data: allReviews
      });


  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Could not fetch All Rating and Reviews",
      error: error.message,
    });
  }
};


// const RatingAndReview = require("../models/RatingAndReview");
// const Course = require("../models/Course");
// const { json } = require("express");
// const { default: mongoose } = require("mongoose");
// const { data } = require("react-router-dom");
// const { default: toast } = require("react-hot-toast");

// // //create rating
// // exports.createRating = async (req, res) => {
// //   try {
// //     //get user id
// //     const userId = req.user.id;

// //     //fetch data from req body
// //     const { rating, review, courseId } = req.body;

// //     //check if user is enrolled or not
// //     const courseDetails = await Course.findOne({
// //       _id: courseId,
// //       studentEnrolled: { $elemMatch: { $eq: userId } },
// //     });

// //     if (!courseDetails) {
// //       return res.status(404).json({
// //         success: false,
// //         message: "Could not find courseDetails",
// //       });
// //     }

// //     //check if user already review the course
// //     const alreadyReviewed = await RatingAndReview.findOne({
// //       user: userId,
// //       course: courseId,
// //     });

// //     if (alreadyReviewed) {
// //       return res.status(403).json({
// //         success: false,
// //         message: "Course is already revied by users ",
// //       });
// //     }

// //     //create rating and review
// //     const ratingReview = await RatingAndReview.create({
// //       rating,
// //       review,
// //       course: courseId,
// //       user: userId,
// //     });

// //     //update course with this rating and review
// //     const updateCoursedetails = await Course.findByIdAndUpdate(
// //       courseId,
// //       {
// //         $push: {
// //           RatingAndReview: ratingReview._id,
// //         },
// //       },
// //       { new: true }
// //     );

// //     console.log(updateCoursedetails);
// //     // return response

// //     return res.status(200).json({
// //       success: true,
// //       message: "Create Rating Successfully",
// //     });
// //   } catch (error) {
// //     console.log(error);
// //     console.error(error)
// //     return (
// //       res.status(500),
// //       json({
// //         success: true,
// //         message: "Failed to create rating",
// //         error: error.message,
        
// //       })
// //     );
// //   }
// // };

// // Create a new rating and review
// exports.createRating = async (req, res) => {
//   try {
//     const userId = req.user.id
//     const { rating, review, courseId } = req.body

//     // Check if the user is enrolled in the course

//     const courseDetails = await Course.findOne({
//       _id: courseId,
//       studentEnrolled: { $elemMatch: { $eq: userId } },
//     })

//     if (!courseDetails) {
//       return res.status(404).json({
//         success: false,
//         message: "Student is not enrolled in this course",
//       })
//     }

//     // Check if the user has already reviewed the course
//     const alreadyReviewed = await RatingAndReview.findOne({
//       user: userId,
//       course: courseId,
//     })

//     if (alreadyReviewed) {
//       return res.status(403).json({
//         success: false,
//         message: "Course already reviewed by user",
//       })
//     }

//     // Create a new rating and review
//     const ratingReview = await RatingAndReview.create({
//       rating,
//       review,
//       course: courseId,
//       user: userId,
//     })

//     // Add the rating and review to the course
//     await Course.findByIdAndUpdate(courseId, {
//       $push: {
//         ratingAndReviews: ratingReview,
//       },
//     })
//     await courseDetails.save()

//     return res.status(201).json({
//       success: true,
//       message: "Rating and review created successfully",
//       ratingReview,
//     })
//   } catch (error) {
//     console.error(error)
//     console.log(error)
//     return res.status(500).json({
//       success: false,
//       message: "Internal server error",
//       error: error.message,
//     })
//   }
// }


// //get Average Rating
// exports.getAverageRating = async (req, res) => {
//   try {
//     //get course ID
//     const courseId = req.body.courseId;

//     //Calculate avg
//     const result = await RatingAndReview.aggregate([
//       {
//         $match: {
//           course: mongoose.Types.ObjectId(courseId),
//         },
//       },
//       {
//         $group: {
//           _id: null,
//           averageRating: { $avg: "$rating" },
//         },
//       },
//     ]);

//     //return response
//     if (result.length > 0) {
//       return res.status(200).json({
//         success: true,
//         averageRating: result[0].averageRating,
//       });
//     }

//     //rating not exist in case
//     return res.status(200).json({
//       success: true,
//       message: "Average rating is0, no ratings give till now",
//       averageRating: 0,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to Average rating ",
//     });
//   }
// };

// //get All Rating and reviews

// exports.getAllRatingReview = async (req, res) => {
//   try {
//     const allReviews = await RatingAndReview.find({})
//       .sort({ rating: "desc" })
//       .populate({
//         path: "user",
//         select: "firstName lastName image email",
//       })
//       .populate({
//         path: "course",
//         select: "courseName",
//       })
//       .exec();

//       return res.status(200).json({
//         success:true,
//         message:"All Review Fetched Successfully",
//         data: allReviews
//       });


//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       success: false,
//       message: "Could not fetch All Rating and Reviews",
//       error: error.message,
//     });
//   }
// };
