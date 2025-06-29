const { FaS } = require("react-icons/fa6");
const Profile = require("../models/Profile");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const mailSender = require("../utils/mailSender");
const CourseProgress = require("../models/CourseProgress")

const Course = require ("../models/Course");


const { convertSecondsToDuration } = require("../utils/secToDuration")

// exports.updateProfile  = async (req,res) => {
//     try{
//         //data fetch
//         const { gender = "",dateOfBirth="",about="",contactNumber ="",
//          } = req.body;
        
//         //get userid
//         const id = req.user.id;
        
//         // //validation
//         // if(!gender || !contactNumber){
//         //     return res.status(400).json({
//         //         success:false,
//         //         message:"Gender and contactnumber mandatory",

//         //     })
//         // }

//         //find profile
//         const userDetails = await User.findById(id);
//         const profileId = userDetails.additionalDetails;
//         const profileDetail = await Profile.findByIdAndUpdate(profileId);

//         //update
//         profileDetail.dateOfBirth = dateOfBirth;
//         profileDetail.about = about;
//         profileDetail.gender = gender;
//         profileDetail.contactNumber = contactNumber;
   
//         //db entry
//         await profileDetail.save();


        
//     // Find the updated user details
//     const updatedUserDetails = await User.findById(id)
//       .populate("additionalDetails")
//       .exec()


//         //response
//         return res.status(200).json({
//             success:true,
//             message:"Profile updated Successfully",
//             profileDetail,
//             updatedUserDetails
//         });
//     }
//     catch(error){
//         console.log(error);
//         return res.status(500).json({
//             success:false,
//             message:"Failed to Update Profile",
//             error:error.message,
//         });
//     }
// };

//delete account function

exports.updateProfile = async (req, res) => {
  try {
    const {
      gender = "",
      dateOfBirth = "",
      about = "",
      contactNumber = "",
    } = req.body;

    const id = req.user.id;
    const userDetails = await User.findById(id);
    if (!userDetails) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    const profileId = userDetails.additionalDetails;
    if (!profileId) {
      return res.status(400).json({ success: false, message: "Profile ID missing." });
    }

    // Retrieve the profile document first
    const profileDetail = await Profile.findById(profileId);
    if (!profileDetail) {
      return res.status(404).json({ success: false, message: "Profile record not found." });
    }

    // Update properties
    profileDetail.gender = gender;
    profileDetail.dateOfBirth = dateOfBirth;
    profileDetail.about = about;
    profileDetail.contactNumber = contactNumber;
    await profileDetail.save();

    const updatedUserDetails = await User.findById(id)
                                        .populate("additionalDetails")
                                        .exec();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      profileDetail,
      updatedUserDetails
    });
  } catch (error) {
    console.error("Error in updateProfile:", error);
    console.log(error)
    return res.status(500).json({
      success: false,
      message: "Failed to Update Profile",
      error: error.message,
    });
  }
};


exports.deleteAccount = async (req,res) => {
    try{
        //get id
        const id = req.user.id;

        //validation
        const userDetails = await User.findById(id);
        if(!userDetails){
            return res.status(500).json({
                success:false,
                message:"User Not Found"
            });
        }

        //delete profile
        await Profile.findByIdAndDelete({_id:userDetails.additionalDetails});

        //delete user
        await User.findByIdAndDelete({_id:id});


        //responce
        return res.status(200).json({
            success:true,
            message:"Delete Account Successfully",
        });

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Failed To User Delete Account",
        });
    }
}

//fetch all details of users
exports.getAllUserDetails = async (req,res) => {
    try{
        //get id
        const id = req.user.id;

        //validation
        const userDetails = await User.findById(id)
        .populate("additionalDetails")
        .exec();

        if(!userDetails){
            return res.status(404).json({
                success:false,
                message:"User Not Found"
            });
        }

        //db call

        //return response
        return res.status(200).json({
            success:true,
            message:"User data Fetched Successfully",
            data:userDetails
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Failed to Fetch User Details",
            error: error.message // Helpful for debugging
        });
    }
};

//copy

exports.updateDisplayPicture = async (req, res) => {
    try {
      console.log("backend me update display picture pe aagye babu")
      const displayPicture = req.files.displayPicture
      const userId = req.user.id
      const image = await uploadImageToCloudinary(
        displayPicture,
        process.env.FOLDER_NAME,
        1000,
        1000
      )
      console.log(image)
      const updatedProfile = await User.findByIdAndUpdate(
        { _id: userId },
        { image: image.secure_url },
        { new: true }
      )
      res.send({
        success: true,
        message: `Image Updated successfully`,
        data: updatedProfile,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};
  
// exports.getEnrolledCourses = async (req, res) => {
//     try {
//       const userId = req.user.id
//       const userDetails = await User.findOne({
//         _id: userId,
//       })
//         .populate("courses")
//         .exec()

//         console.log("get enroll course from backend response : ",userDetails)
//       if (!userDetails) {
//         return res.status(400).json({
//           success: false,
//           message: `Could not find user with id: ${userDetails}`,
//         })
//       }
//       return res.status(200).json({
//         success: true,
//         data: userDetails.courses,
//       })
//     } catch (error) {
//       return res.status(500).json({
//         success: false,
//         message: error.message,
//       })
//     }
// };


exports.getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id
    let userDetails = await User.findOne({
      _id: userId,
    })
      .populate({
        path: "courses",
        populate: {
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        },
      })
      .exec()
    userDetails = userDetails.toObject()
    var SubsectionLength = 0
    for (var i = 0; i < userDetails.courses.length; i++) {
      let totalDurationInSeconds = 0
      SubsectionLength = 0
      for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
        totalDurationInSeconds += userDetails.courses[i].courseContent[
          j
        ].subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0)
        userDetails.courses[i].totalDuration = convertSecondsToDuration(
          totalDurationInSeconds
        )
        SubsectionLength +=
          userDetails.courses[i].courseContent[j].subSection.length
      }
      let courseProgressCount = await CourseProgress.findOne({
        courseID: userDetails.courses[i]._id,
        userId: userId,
      })
      courseProgressCount = courseProgressCount?.completedVideos.length
      if (SubsectionLength === 0) {
        userDetails.courses[i].progressPercentage = 100
      } else {
        // To make it up to 2 decimal point
        const multiplier = Math.pow(10, 2)
        userDetails.courses[i].progressPercentage =
          Math.round(
            (courseProgressCount / SubsectionLength) * 100 * multiplier
          ) / multiplier
      }
    }

    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find user with id: ${userDetails}`,
      })
    }
    return res.status(200).json({
      success: true,
      data: userDetails.courses,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}




exports.sendPaymentSuccessEmail = async (req,res) => {
    const { orderId, paymentId, amount} = req.body

    const userId = req.user.id

    if(!orderId || !paymentId || !amount || !userId){
      return res.status(400).json({
        success:false,
        message: "please provide all the fields"
      })
    }

    try{
        //student ko di=udhio
        const enrolledStudent =await User.findById(userId)

        await mailSender(
          enrolledStudent.email,
          `Payment Received`,
          paymentSuccessEmail(`${enrolledStudent.firstName}`),
          amount/100, orderId ,paymentId
        )
    }
    catch(error){
      console.log("error in dending mail",error)
      return res.status(500).json({
        success:false,
        message: " Could not send mail"
      })
    }


}

exports.instructorDashboard = async (req, res) => {
  try {
    const courseDetails = await Course.find({ instructor: req.user.id })

    const courseData = courseDetails.map((course) => {
      const totalStudentsEnrolled = course.studentEnrolled.length
      const totalAmountGenerated = totalStudentsEnrolled * course.price

      // Create a new object with the additional fields
      const courseDataWithStats = {
        _id: course._id,
        courseName: course.courseName,
        courseDescription: course.courseDescription,
        // Include other course properties as needed
        totalStudentsEnrolled,
        totalAmountGenerated,
      }

      return courseDataWithStats
    })

    res.status(200).json({ courses: courseData })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server Error" })
  }
}
