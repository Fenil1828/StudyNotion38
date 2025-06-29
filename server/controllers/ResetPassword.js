const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");

//resetPasswordToken - mail send karne ka kaam
exports.resetPasswordToken = async (req,res) => {
    
    try{
        //get email
    const {email} = req.body;
    console.log("this is req body : ." ,req.body)
    console.log("after is : ", email)

    //validation
    const user = await User.findOne({email})
    console.log("this is a users: " ,user);
    if(!user){
        return res.json({
            success:false,
            message:"Your email is not registered with us"
        })
    }

    //generate token
    const token = crypto.randomUUID();

    
    // const token = crypto.randomBytes(20).toString("hex")

    //updatein user
    const updatedDetails = await User.findOneAndUpdate({email: email} , {
        token:token,
        resetPasswordExpires: Date.now() + 5*60*1000,
    },{new:true});

    //create url
    // const url = `httpls://localhost:3000/update-password/${token}`
    	const url = `http://localhost:3000/update-password/${token}`;

    //send mail
    await mailSender(email , "Password Reset" , `Your Link for email verification is ${url}. Please click this url to reset your password.`);

    //return response
    return res.json({
        success:true,
        message:"Email sent Successfully, Please check email and check password",
    })

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Cannot reset Password, Something Went wrong"
        })
    }
    
}

//resetPassword

exports.resetPassword = async (req,res) => {
    try{
        //data fetch
        const {password , confirmPassword, token} = req.body;
        
        //validation
        if(password !== confirmPassword){
            return res.json({
                success:false,
                message:"Password not matching",
            });
        }
        
        //get user details from db token
        const userDetails = await User.findOne({token: token});
        console.log("this is userdetails : ," ,userDetails)
        
        //if no entry invalid token
        if(!userDetails){
            return res.json({
                success:false,
                message:"token invalid",
            });
        }
        
        //token time check
        if( userDetails.resertPasswordExpires < Date.now() ){
            return res.json({
                success:false,
                message:"Token is expired, please regenerate your token",
            });
        }
        
        //hash pwd
        const hashedPassword = await bcrypt.hash(password , 10);
        
        //password update
        await User.findOneAndUpdate(
            {token:token},
            {password: hashedPassword},
            {new:true},
        )
        
        //return respons
        return res.status(200).json({
            success:true,
            message:"Password Reset Successfully",
        })
    }
    catch(error){
        console.log(error);
    }
}

