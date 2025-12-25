// const jwt = require("jsonwebtoken");
// require("dotenv").config();
// const User = require("../models/User");

// //auth
// exports.auth = async (req,res,next) => {
//     try{
//         //extract token
//         // console.log("before token " , req.body.token)

//         // console.log("auth token : " , req.header("Authorization").replace('Bearer ' ,""))
//         // console.log("before token extract")
//         const token =  req.header("Authorization").replace('Bearer ' ,"") ||
//         req.cookies.token  || req.body.token 
                        
                     
                        
//                         //  console.log("before token extract")

//                         console.log("this is for token : ," , token)

//         //if token missing then return response
//         if(!token){
//             return res.staus(401).json({
//                 success:false,
//                 message:"Token is Missing . please login",
//             });
//         }

//             //verify token using secret
//         try{
//             const decode = await jwt.verify(token , process.env.JWT_SECRET);
//             console.log(decode);
//             req.user = decode;
//         }
//         catch(err){
//             console.log("token releated : " ,err)
//             console.error(err)
//             return res.status(401).json({
//                 success:false,
//                 message: "Token is invalid",
//             });
//         }
//         next();
//     }
//     catch(error){
//         console.log(error);
//         return res.status(401).json({
//             success:false,
//             message:"Something went wrong while validating the token",
//         })
//     }
// }

// //isStudent

// exports.isStudent = async (req,res,next) => {
//     try{
//         if(req.user.accountType !== "Student"){
//             return res.status(401).json({
//                 success:false,
//                 message:"This is a protected route for Students Only",
//             });
//         }
//         next();
//     }
//     catch(error){
//         console.log(error);
//         return res.status(500).json({
//             success:false,
//             message:"User role cannot be verified, please try again",
//         })
//     }
// }


// //isInstructor

// exports.isInstructor = async (req,res,next) => {
//     try{

//         console.log(req.user.accountType)
//         if(req.user.accountType !== "Instructor"){
//             return res.status(500).json({
//                 success:false,
//                 message:"This is protected routes for Instructor only",
//             });
//         }
//         next();
//     }
//     catch(error){
//         console.error(error);
//         console.log(error);
//         return res.status(500).json({
//             success:false,
//             message:"User role cannot be verified, please try again",
//         });
//     }
// }


// //isAdmin

// exports.isAdmin = async (req,res,next) => {
//     try{
//         console.log("printing at: ", req.user.accountType);
//         if(req.user.accountType !== "Admin"){
//             return res.status(401).json({
//                 success:false,
//                 message:"This is Protected routes for Admin only",
//             })
//         }
//         next();
//     }
//     catch(error){
//         console.log(error);
//         console.error(error);
//         return res.status(500).json({
//             success:false,
//             message:"User role cannot be verified, please try again",
//         })
//     }
// }

// middleware/auth.js

const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../models/User"); // remove unused imports if not needed

// Auth middleware
exports.auth = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    let token = null;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    } else if (req.cookies?.token) {
      token = req.cookies.token;
    } else if (req.body?.token) {
      token = req.body.token;
    }

    console.log("Extracted JWT token:", token);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token missing. Please log in.",
      });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      console.log("Decoded JWT payload:", decoded);
    } catch (err) {
      console.error("JWT verification failed:", err);
      return res.status(401).json({
        success: false,
        message: "Token invalid or malformed.",
      });
    }

    next();
  } catch (err) {
    console.error("Middleware error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error during token validation.",
    });
  }
};

// Role-checking middlewares
exports.isStudent = (req, res, next) => {
  if (req.user.accountType !== "Student") {
    return res.status(403).json({
      success: false,
      message: "Access denied: Students only.",
    });
  }
  next();
};

exports.isInstructor = (req, res, next) => {
  if (req.user.accountType !== "Instructor") {
    return res.status(403).json({
      success: false,
      message: "Access denied: Instructors only.",
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.user.accountType !== "Admin") {
    return res.status(403).json({
      success: false,
      message: "Access denied: Admins only.",
    });
  }
  next();
};
