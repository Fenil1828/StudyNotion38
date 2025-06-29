const User = require("../models/User");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const Profile = require("../models/Profile");
const jwt = require("jsonwebtoken");
// const { use } = require("react");
const { hash } = require("crypto");
const { error } = require("console");
const passport = require("passport");
const { emit } = require("process");
require("dotenv").config();









// const passport = require("../config/passport");
// const jwt = require("jsonwebtoken");

//sendOTP
exports.sendOTP = async (req , res) => {
    try{
        //fetch email from req ki body
        const {email} = req.body;

        //check users
        const checkUserPresent =  await User.findOne({email});

        //if already exist
        if(checkUserPresent){
            return res.status(401).json({
                success:false,
                message:"User already Registered",
            });
        }

        //generate OTP
        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
        });
        console.log("OTP generated: " , otp);

        //check unique otp or not
        const result = await OTP.findOne({otp: otp});

        while(result){
            otp = otpGenerator(6, {
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
        });
            result = await OTP.findOne({otp: otp});
        }

        const otpPayload = {email, otp};

        //create an entry in db
        const otpBody = await OTP.create(otpPayload);
        console.log(otpBody);

        //return response successfuk
        res.status(200).json({
            success:true,
            meassage:"OTP Sent Successfully",
            otp,
        })

        }catch(error){
            console.error(error);
            console.log(error);
            return res.status(500).json({
                success:false,
                message:error.message,
            });
        }
};

//signup handler
exports.signUp = async (req , res) => {
    try{
        //data fetch
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            contactNumber,
            otp
        } = req.body;

        //validation
        if(!firstName || !lastName || !email || !password || !confirmPassword || !otp){
            return res.status(403).json({
                success:false,
                message:"All Fields are required",
            });
        }


        //2 password match karlo
        if(password !== confirmPassword){
            return res.status(400).json({
                success:false,
                message:"Password and confirmPassword Value Does not match",
            })
        }

        //check user already exists
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"User is already registered",
            })
        }

        //find most recent otp stored for the user
        const recentOtp = await OTP.find({email}).sort({createdAt:-1}).limit(1);
        console.log("recent otp is : ", recentOtp);

        //validate otp
        if(recentOtp.length == 0){
            return res.status(400).json({
                success:false,
                message:"OTP NOT FOUND",
            });
        }else if(otp !== recentOtp[0].otp){
            return res.status(400).json({
                success:false,
                message:"Invalid Otp",
            })
        }

        //Hash Password

        const hashedPassword = await bcrypt.hash(password , 10);

        //entry created in DB

        const profileDetail = await Profile.create({
            gender:null,
            dateOfBirth:null,
            about:null,
            contactNumber:null,
        })

        //from dicebear name 
        // JavaScript example
        const encodedSeed = encodeURIComponent(`${firstName} ${lastName}`);
        const url = `https://api.dicebear.com/5.x/initials/svg?seed=${encodedSeed}`;
    
        const user = await User.create({
            firstName,
            lastName,
            email,
            contactNumber,
            password:hashedPassword,
            accountType:accountType,
            additionalDetails:profileDetail._id,
            image:url,

        })

        //retuen res

        res.status(200).json({
            success:true,
            message:"User is registered Successfully",
            user,
        });
    }
    catch(error){
        console.error(error);
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"User Cannot be registered Please try again",
        });
    }
}



//Login Handler

exports.login = async (req,res) => {
    try{
        //fetch data
        const {email,password} = req.body;

        //validation
        if(!email || !password){
            return res.status(403).json({
                success:false,
                message:"All field is required",
            });
        }

    

        //user chrck
        const user = await User.findOne({email})
        .populate("additionalDetails");

        if(!user){
            return res.status(401).json({
                success:false,
                message:"User is not Registered, please signUp first",
            });
        }

        // //generate JWT, after password matching
        if (await bcrypt.compare(password , user.password)){

            const payload = {
                email:user.email,
                id: user._id,
                accountType:user.accountType,
            }

            const token = jwt.sign(payload, process.env.JWT_SECRET , {
                expiresIn:"10d",
            });

        // Generate JWT token and Compare Password

		// if (await bcrypt.compare(password, user.password)) {
		// 	const token = jwt.sign(
		// 		{ email: user.email, id: user._id, accountType: user.accountType },
		// 		process.env.JWT_SECRET,
		// 		{
		// 			expiresIn: "24h",
		// 		}
		// 	);
         
            console.log("this is a create time token: ",token);


            user.token = token;
            user.password = undefined;

            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
				httpOnly: true,
            }
            //create cookies and send response
            res.cookie("token" , token , options).status(200).json({
                success:true,
                token,
                user,
                message:"Logged in Successfully",
            })

        }

        else{
            console.log(password);
            return res.status(401).json({
                success:false,
                message:"Password is incorrect"
                
            })
        }



    }catch(error){
        console.error(error);
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Login Failure, Please try again",
        })
    }
};


//ChangePassword

exports.changePassword = async (req,res) => {
    try{
        //data fetch from req body
        const { oldPassword, newPassword} = req.body;

        //validation
        if(!oldPassword || !newPassword){
            return res.status(400).json({
                success:false,
                message:"Both old and new Password are required",
            });
        }

        //comparing
        if(oldPassword === newPassword){
            return res.status(400).json({
                success:false,
                message:"New Password must be different from old Password",
            });
        }

        //user checking
        // const user = User.findOne({email});
            const user = await User.findById(req.user.id)

        if(!user){
            return res.status(404).json({
                success:false,
                message:"User Not found",
            });
        }

        //verify old password matching
        const isMatch = await bcrypt.compare(oldPassword , user.password);
        if(!isMatch){
            return res.status(401).json({
                success:false,
                message:"Old password is incorrected",
            });
        }

        //hashing
        const hashedPassword = await bcrypt.hash(newPassword , 10);

        //update password in database
        user.password = hashedPassword;
        await user.save();

        //mail sender

        // async function sendVerificationEmail(email){
        //     try{
        //         const response = await mailSender(email, "Verification Email From StudyNotion For Password Updated Successfully");
        //         console.log("EMail Send Successfully " ,response);

        //     }catch(error){
        //         console.log("error occured while sending mails " , error);
        //     }
        // }

        try {
            const emailBody = `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #333;">Password Change Notification</h2>
                    <p>Hello ${user.name || user.email},</p>
                    <p>Your password was successfully changed on ${new Date().toLocaleString()}.</p>
                    <p>If you didn't make this change, please contact support immediately.</p>
                    <hr style="border-top: 1px solid #eee; margin: 20px 0;">
                    <p style="font-size: 0.9em; color: #777;">
                        This is an automated message - please do not reply.
                    </p>
                </div>
            `;
            
            await mailSender(
                user.email,
                "Password Updated Successfully | StudyNotion",
                emailBody
            );
        } catch (emailError) {
            console.error("Error sending email:", emailError);
            // Don't fail the request just because email failed
        }

        //return response
        return res.status(200).json({
            success:true,
            message:"Password Updated Successfully",
        })

    }
    catch(error){
        console.error(error);
         return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
}



//  google
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);



// Google Login Controller
exports.googleLogin = async (req, res) => {
  try {
    const { tokenId } = req.body;
    console.log("tokenId is : " , tokenId)

    if (!tokenId) {
      return res.status(400).json({
        success: false,
        message: "Google token is required",
      });
    }

    // Verify Google token
    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, given_name, family_name, picture, sub: googleId } = payload;

    // Check if user already exists
    let user = await User.findOne({ 
      $or: [{ email }, { googleId }] 
    }).populate("additionalDetails");

    if (user) {
      // User exists, update googleId if not present
      if (!user.googleId) {
        user.googleId = googleId;
        await user.save();
      }
    } else {
      // Create new user
      const profileDetails = await Profile.create({
        gender: null,
        dateOfBirth: null,
        about: null,
        contactNumber: null,
      });

      user = await User.create({
        firstName: given_name,
        lastName: family_name,
        email,
        googleId,
        password: await bcrypt.hash(Math.random().toString(36), 10), // Random password for Google users
        accountType: "Student", // Default account type
        approved: true,
        additionalDetails: profileDetails._id,
        image: picture || `https://api.dicebear.com/5.x/initials/svg?seed=${given_name} ${family_name}`,
      });

      user = await User.findById(user._id).populate("additionalDetails");
    }
    

    // Generate JWT token
    const token = jwt.sign(
      { email: user.email, id: user._id, accountType: user.accountType },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );

    // Save token to user document
    user.token = token;
    user.password = undefined;

    // Set cookie for token and return success response
    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    res.cookie("token", token, options).status(200).json({
      success: true,
      token,
      user,
      message: "Google Login Success",
    });

  } catch (error) {
    console.error("Google Login Error:", error);
    return res.status(500).json({
      success: false,
      message: "Google Login Failed, Please Try Again",
    });
  }
};
