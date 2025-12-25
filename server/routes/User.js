const express = require("express");
const router = express.Router();

//import controller and middleware
const{
    login,
    // signUp,
    sendOTP,
    changePassword,
    googleLogin,
    signUp
} = require("../controllers/Auth");

const {
    resetPasswordToken,
    resetPassword,
} = require("../controllers/ResetPassword");

const {auth} = require("../middleware/auth");

//for login
router.post("/login" , login);

//for signup
router.post("/signup" , signUp);

//sending otp
router.post("/sendotp" , sendOTP);

//route for google auth
router.post("/google-login" , googleLogin)


//change password

router.post("/changepassword" , auth ,changePassword)


//generating reset password
router.post("/reset-password-token" , resetPasswordToken);

//resetting user password
router.post("/reset-password" , resetPassword);

module.exports = router