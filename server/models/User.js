//in case model cretion to help of mongoose

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true,
    },
    lastName:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
    },
    accountType:{
        type:String,
        enum:["Admin" , "Student" , "Instructor"],
        required:true,
    },
    additionalDetails:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Profile",
    },
    courses:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Course",
        }
    ],
    image:{
        type:String,
        required:true,
    },
    token:{
        type:String,
    },
    resertPasswordExpires:{
        type:Date,
    },
    courseProgress:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"CourseProgress",
        }
    ],
      googleId: {
        type: String,
        sparse: true, // Allows multiple null values but ensures uniqueness for non-null values
    },
    approved: {
        type: Boolean,
        default: true,
    },
    contactNumber: {
        type: String,
    },

    
});

module.exports = mongoose.model("User" , userSchema);