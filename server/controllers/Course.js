const Course = require("../models/Course");
const RatingAndReview = require("../models/RatingAndReview");
const Category = require("../models/Category");
const Tag = require("../models/Category");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const { json } = require("express");
const Section = require("../models/Section")
const SubSection = require("../models/SubSections")
const CourseProgress = require("../models/CourseProgress");
const { convertSecondsToDuration } = require("../utils/secToDuration");
const SubSections = require("../models/SubSections");

//create course handler function

// exports.createCourse = async (req, res) => {
//   try {
//     //data fetch
//     const { courseName, courseDescription, whatYouWillLearn, price, tag } =
//       req.body;

//     //get thumbnail
//     const thumbnail = req.files.thumbnailImage;

//     //validation
//     if (
//       !courseName ||
//       !courseDescription ||
//       !whatYouWillLearn ||
//       !price ||
//       !thumbnail ||
//       !category
//     ) {
//       return res.status(400).json({
//         success: false,
//         message: "All fields are required",
//       });
//     }

//     //check instructor hai ki nahi
//     const userId = req.user.id;
//     const instructorDetails = await User.findById(userId, {
//       accountType:"Instructor",
//     });
//     console.log("instructor details : ", instructorDetails);

//     if (!instructorDetails) {
//       return res.status(404).json({
//         success: false,
//         message: "Instructor Details Not Found",
//       });
//     }

//     //check given tag is valid or not
//     const tagDetails = await Tag.findById(tag);

//     if (!tagDetails) {
//       return res.status(404).json({
//         success: false,
//         message: "Tag Not found",
//       });
//     }

//     //upload image to cloudinary
//     const thumbnailImage = await uploadImageToCloudinary(
//       thumbnail,
//       process.env.FOLDER_NAME
//     );

//     //create an entry for new courses
//     const newCourse = await Course.create({
//       courseName,
//       courseDescription,
//       instructor: instructorDetails._id,
//       whatYouWillLearn: whatYouWillLearn,
//       price,
//       tag: tagDetails._id,
//       thumbnail: thumbnailImage.secure_url,
//     });

//     //add the new course to the userschma of instructor ,user update

//     await User.findByIdAndUpdate(
//       { _id: instructorDetails._id },
//       {
//         $push: {
//           courses: newCourse._id,
//         },
//       },
//       { new: true }
//     );

//     //update the tag ka schema

//     await Tag.findByIdAndUpdate(
//       { _id: tagDetails._id },
//       {
//         $push: {
//           courses: newCourse._id,
//         },
//       },
//       { new: true }
//     );

//     return res.status(200).json({
//       success: true,
//       message: "course created successfully",
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to create coure",
//       error: error.message,
//     });
//   }
// };

exports.createCourse = async (req, res) => {
	try {
		// Get user ID from request object
		const userId = req.user.id;

		// Get all required fields from request body
		let {
			courseName,
			courseDescription,
			whatYouWillLearn,
			price,
			tag,
			category,
			status,
			instructions,
		} = req.body;

		// Get thumbnail image from request files
		const thumbnail = req.files.thumbnailImage;

		// Check if any of the required fields are missing
		if (
			!courseName ||
			!courseDescription ||
			!whatYouWillLearn ||
			!price ||
			!tag ||
			!thumbnail ||
			!category
		) {
			return res.status(400).json({
				success: false,
				message: "All Fields are Mandatory",
			});
		}
		if (!status || status === undefined) {
			status = "Draft";
		}
		// Check if the user is an instructor
		const instructorDetails = await User.findById(userId, {
			accountType: "Instructor",
		});

		if (!instructorDetails) {
			return res.status(404).json({
				success: false,
				message: "Instructor Details Not Found",
			});
		}

		// Check if the tag given is valid
		const categoryDetails = await Category.findById(category);
		if (!categoryDetails) {
			return res.status(404).json({
				success: false,
				message: "Category Details Not Found",
			});
		}
		// Upload the Thumbnail to Cloudinary
		const thumbnailImage = await uploadImageToCloudinary(
			thumbnail,
			process.env.FOLDER_NAME
		);
		console.log(thumbnailImage);
		// Create a new course with the given details
		const newCourse = await Course.create({
			courseName,
			courseDescription,
			instructor: instructorDetails._id,
			whatYouWillLearn: whatYouWillLearn,
			price,
			tag: tag,
			category: categoryDetails._id,
			thumbnail: thumbnailImage.secure_url,
			status: status,
			instructions: instructions,
		});

		// Add the new course to the User Schema of the Instructor
		await User.findByIdAndUpdate(
			{
				_id: instructorDetails._id,
			},
			{
				$push: {
					courses: newCourse._id,
				},
			},
			{ new: true }
		);
		// Add the new course to the Categories
		await Category.findByIdAndUpdate(
			{ _id: category },
			{
				$push: {
					courses: newCourse._id,
				},
			},
			{ new: true }
		);
		// Return the new course and a success message
		res.status(200).json({
			success: true,
			data: newCourse,
			message: "Course Created Successfully",
		});
	} catch (error) {
		// Handle any errors that occur during the creation of the course
		console.error(error);
		res.status(500).json({
			success: false,
			message: "Failed to create course",
			error: error.message,
		});
	}
};

//getAllCourses handler function
exports.getAllCourses = async (req, res) => {
  try {
    const allCourses = await Course.find(
      {},
      {
        courseName: true,
        price: true,
        thumbnail: true,
        instructor: true,
        RatingAndReview: true,
        StudentsEnrolled: true,
      }
    )
      .populate("instructor")
      .exec();

    return res.status(200).json({
      success: true,
      message: "Data for All COurses Fetch Successfully",
      data: allCourses,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "cannot fetch courses data",
      error: error.message,
    });
  }
};

//getCourseDetails

exports.getCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body;
	console.log(courseId)

    //find course details
    const courseDetails = await Course.findOne({ _id: courseId })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
                   select: "-videoUrl",
        },
      })
      .exec();

	  console.log(courseDetails)

      //validation
      if(!courseDetails){
        return res.status(400).json({
            success:false,
            message:`Could not find the course with ${courseId}`,
        });
      }

        let totalDurationInSeconds = 0
    courseDetails.courseContent.forEach((content) => {
      content.subSection.forEach((subSection) => {
        const timeDurationInSeconds = parseInt(subSection.timeDuration)
        totalDurationInSeconds += timeDurationInSeconds
      })
    })

    const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

    return res.status(200).json({
      success: true,
      data: {
        courseDetails,
        totalDuration,
      },
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}


//edit course detials

// exports.editCourse = async (req, res) => {
// 	try{
// 		const { courseId } = req.body;

// 		const updates = req.body

// 		const course = await Course.findById(courseId)

// 		if(!course){
// 			return res.status(404).json({
// 				error: " Course Not Found"
// 			})
// 		}


// 		if(req.files){
// 			console.log("Thumbnail update")

// 			const thumbnail = req.files.thumbnailImage

// 			const thumbnailImage = await uploadImageToCloudinary(
// 				thumbnail,
// 				process.env.FOLDER_NAME
// 			)
// 			course.thumbnail = thumbnailImage.secure_url
// 		}

// 		//update only fields that are present in the request body

// 		for(const key in updates){
// 			if(updates.hasOwnProperty(key)){
// 				if(key === "tag" || key === "instructions"){
// 					course[key] = JSON.parse(updates[key])
// 				}
// 				else{
// 					course[key] = updates[key]
// 				}
// 			}
// 		}

		
//     await course.save()

//     const updatedCourse = await Course.findOne({
//       _id: courseId,
//     })
//       .populate({
//         path: "instructor",
//         populate: {
//           path: "additionalDetails",
//         },
//       })
//       .populate("category")
//       .populate("ratingAndReviews")
//       .populate({
//         path: "courseContent",
//         populate: {
//           path: "subSection",
//         },
//       })
//       .exec()

//     res.json({
//       success: true,
//       message: "Course updated successfully",
//       data: updatedCourse,
//     })
//   } catch (error) {
//     console.error(error)

//     res.status(500).json({
//       success: false,
//       message: "Internal server error",
//       error: error.message,
//     })
//   }
// }

// exports.editCourse = async (req, res) => {
//   try {
//     // Destructure courseId and separate other update fields
//     const { courseId, ...updates } = req.body;

//     // Fetch the existing course
//     const course = await Course.findById(courseId);
//     if (!course) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Course not found" });
//     }

//     // Handle optional thumbnail image upload
//     if (req.files?.thumbnailImage) {
//       console.log("Thumbnail update");
//       const thumbnail = req.files.thumbnailImage;
//       const thumbnailImage = await uploadImageToCloudinary(
//         thumbnail,
//         process.env.FOLDER_NAME
//       );
//       course.thumbnail = thumbnailImage.secure_url;
//     }

//     // Define a whitelist of fields that can be updated
//     const allowed = ["title", "description", "price", "tag", "instructions"];
//     for (const key of allowed) {
//       if (updates[key] !== undefined) {
//         if (key === "tag" || key === "instructions") {
//           // Safely parse JSON for these fields
//           try {
//             course[key] = JSON.parse(updates[key]);
//           } catch (e) {
//             return res
//               .status(400)
//               .json({
//                 success: false,
//                 message: `${key} must be valid JSON`,
//               });
//           }
//         } else {
//           course[key] = updates[key];
//         }
//       }
//     }

//     // Save the updated course
//     await course.save();

//     // Re-fetch with full population for the response
//     const updatedCourse = await Course.findById(courseId)
//       .populate({
//         path: "instructor",
//         populate: { path: "additionalDetails" },
//       })
//       .populate("category ratingAndReviews")
//       .populate({
//         path: "courseContent",
//         populate: { path: "subSection" },
//       })
//       .exec();

//     res.json({
//       success: true,
//       message: "Course updated successfully",
//       data: updatedCourse,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: "Internal server error",
//       error: error.message,
//     });
//   }
// };

// Edit Course Details
exports.editCourse = async (req, res) => {
  try {
    const { courseId } = req.body
    const updates = req.body
    const course = await Course.findById(courseId)

    if (!course) {
      return res.status(404).json({ error: "Course not found" })
    }

    // If Thumbnail Image is found, update it
    if (req.files) {
      console.log("thumbnail update")
      const thumbnail = req.files.thumbnailImage
      const thumbnailImage = await uploadImageToCloudinary(
        thumbnail,
        process.env.FOLDER_NAME
      )
      course.thumbnail = thumbnailImage.secure_url
    }

    // Update only the fields that are present in the request body
    // for (const key in updates) {
    //   if (updates.hasOwnProperty(key)) {
    //     if (key === "tag" || key === "instructions") {
    //       course[key] = JSON.parse(updates[key])
    //     } else {
    //       course[key] = updates[key]
    //     }
    //   }
    // }

    for (const key in updates) {
  if (Object.hasOwn(updates, key)) {
    if (key === "tag" || key === "instructions") {
      course[key] = JSON.parse(updates[key]);
    } else {
      course[key] = updates[key];
    }
  }
}



    await course.save()

    const updatedCourse = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec()

    res.json({
      success: true,
      message: "Course updated successfully",
      data: updatedCourse,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    })
  }
}



// //get instructore courses

// exports.getInstructorCourses = async (req, res) => {

// 	try{
// 		const instructorId = req.user.id

// 		//find all course belonging to instructor

// 		const instructorCourses = await Course.find({
// 			instructor: instructorId,
// 		}).sort({ createdAt: -1})

// 		res.status(200).json({
// 			success:true,
// 			data: instructorCourses,
// 		})
// 	}
// 	catch(error){
// 		console.error(error)
// 		res.status(500).json({
// 			success: false,
// 			message: "Failed to retrives instructor courses",
// 			error: error.message,
// 		})
// 	}
// }

exports.getInstructorCourses = async (req, res) => {
  try {
    const instructorId = req.user.id;

    // Find all courses belonging to instructor with proper population
    const instructorCourses = await Course.find({
      instructor: instructorId,
    })
    .populate({
      path: "courseContent",
      model: "Section",
      populate: {
        path: "subSection",
        model: "SubSections"
      }
    })
    .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: instructorCourses,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve instructor courses",
      error: error.message,
    });
  }
};












//delete course

exports.deleteCourse = async (req,res) => {

  try{

    const { courseId } = req.body

    const course = await Course.findById(courseId)

    if(!course){
      return res.status(404).json({
        message:"Course Not found"
      })
    }

    //unenroll student from course

    const studentsEnrolled  = course.studentEnrolled

    for (const studentId of studentsEnrolled ){
      await User.findByIdAndUpdate(studentId , {
        $pull: {course : courseId},
      })
    }

    //delete section and subsections

    const courseSections = course.courseContent

    for(const sectionId of courseSections){
      const section = await Section.findById(sectionId)

      if(section){

        const subSections = section.subSection

        for(const subSectionId of subSections){
          await SubSection.findByIdAndDelete(subSectionId)
        }
      }

      await Section.findByIdAndDelete(sectionId)
    }


    await Course.findByIdAndDelete(courseId)

    return res.status(200).json({
      success:  true,
      messsage:"Course deleted Successfully"
    }
  )
  }
  catch(error){
    console.log(error)
       return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
       })
  }
}


//grt full course dertsil

exports.getFullCourseDetails = async (req, res) => {

  try{
    const { courseId } = req.body

    const userId = req.user.id

    const courseDetails = await Course.findOne({
      _id: courseId,
    }).populate({
      path: "instructor",
      populate: {
        path: "additionalDetails",
      },
    })
    .populate("category")
    .populate("ratingAndReviews")
    .populate({
      path: "courseContent",
      populate: {
        path: "subSection",
      }
    })
    .exec()

    let courseProgressCount = await CourseProgress.findOne({
      courseId: courseId,
      userId: userId
    })

    console.log("course detaiols is from backed side : ",courseDetails)
    console.log("course progress count , " , courseProgressCount)

    if(!courseDetails){
      return res.status(400).json({
        success: false,
        message: `Could Not find course with id : ${courseId}`
      })
    }

    let totalDurationInSeconds = 0
    courseDetails.courseContent.forEach((content) => {
      content.subSection.forEach((subSection) => {
        const timeDurationInSeconds = parseInt(SubSections.timeDuration)
        totalDurationInSeconds += timeDurationInSeconds
      })
    })

    const totalDuration = convertSecondsToDuration(totalDurationInSeconds)
    
        return res.status(200).json({
      success: true,
      data: {
        courseDetails,
        totalDuration,
        completedVideos: courseProgressCount?.completedVideos
          ? courseProgressCount?.completedVideos
          : [],
      },
    })

  }
  catch(error){
      return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}