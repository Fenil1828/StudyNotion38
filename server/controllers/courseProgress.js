// const mongoose = require("mongoose")
// const Section = require("../models/Section")
// // const SubSections = require("../models/SubSectionsn")
// // const CourseProgress = require("../models/CourseProgress")
// const Course = require("../models/Course")
// const SubSections = require("../models/SubSections")
// const CourseProgress = require("../models/CourseProgress")

// exports.updateCourseProgress = async (req, res) => {
//   const { courseId, subsectionId } = req.body
//   const userId = req.user.id

//   try {
//     // Check if the subsection is valid
//     const subsection = await SubSections.findById(subsectionId)
//     if (!subsection) {
//       return res.status(404).json({ error: "Invalid subsection" })
//     }

//     // Find the course progress document for the user and course
//     let courseProgress = await CourseProgress.findOne({
//       courseID: courseId,
//       userId: userId,
//     })

//     console.log("course progress is : " , courseProgress)

//     if (!courseProgress) {
//       // If course progress doesn't exist, create a new one
//       return res.status(404).json({
//         success: false,
//         message: "Course progress Does Not Exist",
//       })
//     } else {
//       // If course progress exists, check if the subsection is already completed
//       if (courseProgress.completedVideos.includes(subsectionId)) {
//         return res.status(400).json({ error: "Subsection already completed" })
//       }

//       // Push the subsection into the completedVideos array
//       courseProgress.completedVideos.push(subsectionId)
//     }

//     // Save the updated course progress
//     await courseProgress.save()

//     return res.status(200).json({ message: "Course progress updated" })
//   } catch (error) {
//     console.error(error)
//     return res.status(500).json({ error: "Internal server error" })
//   }
// }

// exports.getProgressPercentage = async (req, res) => {
//   const { courseId } = req.body
//   const userId = req.user.id

//   if (!courseId) {
//     return res.status(400).json({ error: "Course ID not provided." })
//   }

//   try {
//     // Find the course progress document for the user and course
//     let courseProgress = await CourseProgress.findOne({
//       courseID: courseId,
//       userId: userId,
//     })
//       .populate({
//         path: "courseID",
//         populate: {
//           path: "courseContent",
//         },
//       })
//       .exec()

//     if (!courseProgress) {
//       return res
//         .status(400)
//         .json({ error: "Can not find Course Progress with these IDs." })
//     }
//     console.log(courseProgress, userId)
//     let lectures = 0
//     courseProgress.courseID.courseContent?.forEach((sec) => {
//       lectures += sec.subSection.length || 0
//     })

//     let progressPercentage =
//       (courseProgress.completedVideos.length / lectures) * 100

//     // To make it up to 2 decimal point
//     const multiplier = Math.pow(10, 2)
//     progressPercentage =
//       Math.round(progressPercentage * multiplier) / multiplier

//     return res.status(200).json({
//       data: progressPercentage,
//       message: "Succesfully fetched Course progress",
//     })
//   } catch (error) {
//     console.error(error)
//     return res.status(500).json({ error: "Internal server error" })
//   }
// }


// controllers/Course.js
const mongoose = require("mongoose")
const Section = require("../models/Section")
const Course = require("../models/Course")
const SubSections = require("../models/SubSections")
const CourseProgress = require("../models/CourseProgress")

exports.updateCourseProgress = async (req, res) => {
  const { courseId, subsectionId } = req.body
  const userId = req.user.id

  console.log("📊 Update Course Progress Request:")
  console.log("- Course ID:", courseId)
  console.log("- Subsection ID:", subsectionId)
  console.log("- User ID:", userId)

  try {
    // Validate required fields
    if (!courseId || !subsectionId) {
      return res.status(400).json({
        success: false,
        message: "Course ID and Subsection ID are required"
      })
    }

    // Check if the subsection is valid
    const subsection = await SubSections.findById(subsectionId)
    if (!subsection) {
      return res.status(404).json({
        success: false,
        message: "Invalid subsection"
      })
    }

    // Find the course progress document for the user and course
    let courseProgress = await CourseProgress.findOne({
      courseID: courseId,
      userId: userId,
    })

    console.log("📈 Course progress found:", !!courseProgress)

    if (!courseProgress) {
      // Create new course progress if it doesn't exist
      courseProgress = await CourseProgress.create({
        courseID: courseId,
        userId: userId,
        completedVideos: [subsectionId]
      })
      
      return res.status(200).json({
        success: true,
        message: "Course progress created and updated successfully"
      })
    } else {
      // Check if the subsection is already completed
      if (courseProgress.completedVideos.includes(subsectionId)) {
        return res.status(400).json({
          success: false,
          message: "Subsection already completed"
        })
      }

      // Add the subsection to completed videos
      courseProgress.completedVideos.push(subsectionId)
      await courseProgress.save()

      return res.status(200).json({
        success: true,
        message: "Course progress updated successfully"
      })
    }

  } catch (error) {
    console.error("❌ Update Course Progress Error:", error)
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    })
  }
}