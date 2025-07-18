// Import the required modules
const express = require("express")
const router = express.Router()

// Import the Controllers

// Course Controllers Import
const {
  createCourse,
  getAllCourses,
  getCourseDetails,
  editCourse,
  getInstructorCourses,
  deleteCourse,
  getFullCourseDetails,
} = require("../controllers/Course")


// Categories Controllers Import
const {
  showAllCategories,
  createCategory,
  categoryPageDetails,
} = require("../controllers/Category")

// Sections Controllers Import
const {
  createSection,
  updateSection,
  deleteSection,
} = require("../controllers/Section")

// Sub-Sections Controllers Import
const {
  createSubsection,
  updateSubSection,
  deleteSubSection,
} = require("../controllers/Subsection")

// Rating Controllers Import
const {
  createRating,
  getAverageRating,
  getAllRatingReview,
} = require("../controllers/RatingandReview")

// Importing Middlewares
const { auth, isInstructor, isStudent, isAdmin } = require("../middleware/auth")
const { updateCourseProgress } = require("../controllers/courseProgress")


// Courses can Only be Created by Instructors
router.post("/createCourse", auth, isInstructor, createCourse)

router.post("/editCourse", auth, isInstructor, editCourse)


//Add a Section to a Course
router.post("/addSection",auth,  isInstructor, createSection)

// Update a Section
router.post("/updateSection", auth, isInstructor, updateSection)

// Delete a Section
router.delete("/deleteSection", auth, isInstructor, deleteSection)

// Edit Sub Section
router.post("/updateSubSection", auth, isInstructor, updateSubSection)

// Delete Sub Section
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection)

// Add a Sub Section to a Section
router.post("/addSubSection", auth, isInstructor, createSubsection)

// Get all Registered Courses
router.get("/getAllCourses", getAllCourses)

// Get all Courses Under a Specific Instructor
router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses)


// Get Details for a Specific Courses
router.post("/getCourseDetails", getCourseDetails)

// Delete a Course
router.delete("/deleteCourse", deleteCourse)

// Get Details for a Specific Courses
router.post("/getFullCourseDetails", auth, getFullCourseDetails)

router.post("/updateCourseProgress", auth, isStudent, updateCourseProgress)

//only is admin

router.post("/createCategory", auth, isAdmin, createCategory)

router.get("/showAllCategories", showAllCategories)

router.post("/getCategoryPageDetails", categoryPageDetails)

//rating and reviews
router.post("/createRating", auth, isStudent, createRating)

router.get("/getAverageRating", getAverageRating)

router.get("/getReviews", getAllRatingReview)

module.exports = router











// // Import the required modules
// const express = require("express")
// const router = express.Router()

// // Import the Controllers

// // Course Controllers Import
// const {
//   createCourse,
//   getAllCourses,
//   getCourseDetails,
//   editCourse,
//   getInstructorCourses,
//   deleteCourse,
//   getFullCourseDetails,
// } = require("../controllers/Course")


// // Categories Controllers Import
// const {
//   showAllCategories,
//   createCategory,
//   categoryPageDetails,
// } = require("../controllers/Category")

// // Sections Controllers Import
// const {
//   createSection,
//   updateSection,
//   deleteSection,
// } = require("../controllers/Section")

// // Sub-Sections Controllers Import
// const {
//   createSubsection,
//   updateSubSection,
//   deleteSubSection,
// } = require("../controllers/Subsection")

// // Rating Controllers Import
// const {
//   createRating,
//   getAverageRating,
//   getAllRatingReview,
// } = require("../controllers/RatingAndReview")

// // Importing Middlewares
// const { auth, isInstructor, isStudent, isAdmin } = require("../middleware/auth")
// const { updateCourseProgress } = require("../controllers/courseProgress")


// // Courses can Only be Created by Instructors
// router.post("/createCourse", auth, isInstructor, createCourse)

// router.post("/editCourse", auth, isInstructor, editCourse)


// //Add a Section to a Course
// router.post("/addSection",auth,  isInstructor, createSection)

// // Update a Section
// router.post("/updateSection", auth, isInstructor, updateSection)

// // Delete a Section
// router.delete("/deleteSection", auth, isInstructor, deleteSection)

// // Edit Sub Section
// router.post("/updateSubSection", auth, isInstructor, updateSubSection)

// // Delete Sub Section
// router.post("/deleteSubSection", auth, isInstructor, deleteSubSection)

// // Add a Sub Section to a Section
// router.post("/addSubSection", auth, isInstructor, createSubsection)

// // Get all Registered Courses
// router.get("/getAllCourses", getAllCourses)

// // Get all Courses Under a Specific Instructor
// router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses)


// // Get Details for a Specific Courses
// router.post("/getCourseDetails", getCourseDetails)

// // Delete a Course
// router.delete("/deleteCourse", deleteCourse)

// // Get Details for a Specific Courses
// router.post("/getFullCourseDetails", auth, getFullCourseDetails)

// router.post("/updateCourseProgress", auth, isStudent, updateCourseProgress)

// //only is admin

// router.post("/createCategory", auth, isAdmin, createCategory)

// router.get("/showAllCategories", showAllCategories)

// router.post("/getCategoryPageDetails", categoryPageDetails)

// //rating and reviews
// router.post("/createRating", auth, isStudent, createRating)

// router.get("/getAverageRating", getAverageRating)

router.get("/getReviews", getAllRatingReview)

module.exports = router

