const {instance} = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const {courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail");
const { mongo, default: mongoose, Mongoose } = require("mongoose");
const { json } = require("express");

const { paymentSuccessEmail } = require("../mail/templates/paymentSuccessEmail")
const crypto = require("crypto")

//initiate the razorpay initiate
exports.capturePayment = async (req,res) => {

    try{

        const { courses } = req.body
        const userId = req.user.id

        if(courses.length ===0){
            return res.json({
                success:false,
                message: "Please provide course id"
            })
        }

        let totalAmount = 0

        for(const course_id of courses){
            let course;

            try{
                course = await Course.findById(course_id)

                if(!course){
                    return res.status(401).json({
                        success:false,
                        message: "Could not find the course"
                    })
                }

                const uid = new mongoose.Types.ObjectId(userId)

                if(course.studentEnrolled.includes(uid)){
                    return res.status(401).json({
                        success:false,
                        message: " student is already enrolled"
                    })
                }

                totalAmount += course.price
                console.log("course price is : " , course.price)

            }
            catch(error){
                console.log(error)
                return res.status(500).json({
                    success:false,
                    message:error.message
                })
            }

            const options = {
                amount: totalAmount * 100,
                currency: "INR",
                receipt: Math.random(Date.now()).toString(),
            }

            try{
                  const paymentResponse = await  instance.orders.create(options)
                  return res.status(200).json({
                    success:true,
                    message: paymentResponse
                  })
            }
            catch(error){
                console.log(error)
                return res.status(500).json({
                    success:false,
                    message:"could not payment"
                })
            }
        
        }
    }

    catch(error){
        console.log("capture payment failed")
        return res.status(500).json({
            success:false,
            message: error.message
        })
    }
}


//  payment verify

exports.verifyPayment = async (req,res) => {

    try{
        const razorpay_order_id = req.body?.razorpay_order_id
        const razorpay_payment_id = req.body?.razorpay_payment_id
        const razorpay_signature = req.body?.razorpay_signature
        const courses = req.body?.courses
        const userId = req.user.id;


        if(!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !courses || !userId){
            return res.status(200).json({
                success:false,
                message: "Payment Failed"
            })
        }

        let body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto.createHmac("sha256" , process.env.RAZORPAY_SECRET)
            .update(body.toString())
            .digest("hex")

            if(expectedSignature === razorpay_signature){
                //enrolle karvao students ko

                await enrolledStudents(courses , userId , res);


                //return response
                return res.status(200).json({
                    success:true,
                    message : "Payment Verified"
                })
            }

    }
    catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message: "paymnt failed"
        })

    }
}


const enrolledStudents  = async (courses , userId , res) =>{
    

    if(!courses || !userId){
        return res.status(400).json({
            success:false,
            message: "please provide data"
        })
    }

    for(const courseId of courses){
    try{
         //find the course and enrolle the students

        const enrolledCourse = await Course.findOneAndUpdate(
            {_id:courseId},
            {$push: {studentEnrolled: userId}},
            {new:true},
        )

        if(!enrolledCourse){
            return res.status(500).json({
                success:false,
                message: "Course Not found"
            })
        }

        // find the student anda addd the courses their list of enrolled courses

        const enrolledStudent = await User.findByIdAndUpdate(userId,
            {$push: {
                courses: courseId,
            }},
            {new: true},
        )

        //bachhe ko mail send kardo

        const emailResponse = await mailSender(
            enrolledStudents.email,
            `Successfully Enrolled into ${enrolledCourse.courseName}`,
            courseEnrollmentEmail(enrolledCourse.courseName, `${enrolledStudent.firstName}`)
        )

        console.log("email send successfully " , emailResponse)
    }


    catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message: error.message
        })
    }
    }


}



// Send Payment Success Email
exports.sendPaymentSuccessEmail = async (req, res) => {
  const { orderId, paymentId, amount } = req.body

  const userId = req.user.id

  if (!orderId || !paymentId || !amount || !userId) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all the details" })
  }

  try {
    const enrolledStudent = await User.findById(userId)
    console.log("enrolled student details is : " , enrolledStudent)

    await mailSender(
      enrolledStudent.email,
      `Payment Received`,
      paymentSuccessEmail(
        `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
        amount / 100,
        orderId,
        paymentId
      )
    )
  } catch (error) {
    console.log("error in sending mail", error)
    return res
      .status(400)
      .json({ success: false, message: "Could not send email" })
  }
}






















// //capture the payment and iniasiate the razorpay order

// exports.capturePayment = async (req,res) => {
//     try{
//         //get id
//         const {course_id} = req.body;
//         const userId = req.user.id;

//         //validation courseId
//         if(!course_id){
//             return res.status(400).json({
//                 success:false,
//                 message:"Please Provide Valid course Id",
//             });
//         }

//         //valid coursedetails
//         let course;
//         try{
//             course = await Course.findById(course_id);
//             if(!course){
//                 return res.status(400).json({
//                     success:false,
//                     message:"Could not find the course",
//                 });
//             }

//             //user already pay for the same course
//             const uid = mongoose.Types.ObjectId(userId);
//             if(course.studentEnrolled.includes(uid)){
//                 return res.status(400).json({
//                     success:false,
//                     message:"Student is already enrolled",
//                 })
//             }

//         }catch(error){
//             console.error(error);
//             console.log(error);
//             return res.status(500).json({
//                 success:false,
//                 message:error.message,
//             });
//         }  
        
//         //order create
//         const amount = course.price;
//         const currency = "INR";

//         const options = {
//             amount: amount * 100,
//             currency,
//             recipt:Math.random(Date.now()).toString(),
//             notes:{
//                 courseId: course_id,
//                 userId
//             }
//         }

//         //function call
//         try{
//             //iniatiate the payment using razorpay
//             const paymentResponce = await instance.orders.create(options);
//             console.log(paymentResponce);
//             //return response
//             return res.status(200).json({
//                 success:true,
//                 coursename: course.courseName,
//                 courseDescription: course.courseDescription,
//                 thumbnail:course.thumbnail,
//                 orderId:paymentResponce.id,
//                 currency:paymentResponce.currency,
//                 amount:paymentResponce.amount,
//             })

//         }
//         catch(error){
//             console.log(error);
//             return res.json({
//                 success:false,
//                 message:"Could not initiate Order",
//             })
//         }


//         //return response
//         return res.status(200).json({
//             success:true,
//             message:"Payment Captured Successfully",
//         });


//     }
//     catch(error){
//         console.log(error);
//         return res.status(500).json({
//             success:false,
//             message:"Failed To Capture Payment",
//         })
//     }
// }

// //verify signature

// exports.verifySignature = async (req,res) => {
//     try{
//         const webhookSecret = "12345678";

//         //razorpay se aa raha hai jab webhook hit karege
//         const signature = req.headers["x-razorpay-signature"];

//         //Step-1
//         const shasum = crypto.createHmac("sha256", webhookSecret);

//         //Step-2
//         shasum.update(json.stringify(req.body));

//         //Step-3
//         const digest = shasum.digest("hex");

//         if(signature === digest){
//             console.log("Payment is Authorized");

//             const {courseId , userId} = req.body.payload.payment.entity.notes;

//             try{
//                 //fulfill the action

//                 //find the course and eroll the student in it
//                 const enrolledcourse = await Course.findById( {_id: courseId},
//                                                                     {$push:{studentEnrolled: userId}},
//                                                                     {new:true});
//                 if(!enrolledcourse){
//                     return res.status(500).json({
//                         success:false,
//                         message:"Course not found",
//                     });
//                 }
//                 console.log(enrolledcourse);

//                 //find the student and add course list of enroll courses
//                 const enrolledStudent = await User.findOneAndUpdate({_id: userId},
//                     {$push:{courses: courseId}},
//                     {new:true},
//                 );

//                 console.log(enrolledStudent);

//                 //send mail

//                 const emailResponse = await mailSender(
//                     enrolledStudent.email,
//                     "COngratulation From CodeHelp",
//                     "Congratulation, you are onboarded into new Codehelp Course",
//                 );

//                 console.log(emailResponse)

//                 return res.status(200).json({
//                     success:true,
//                     message:"VErify Signature Successfully",
//                 });

//             }
//             catch(error){
//                 console.log(error);
//                 return res.status(500).json({
//                     success:false,
//                     message:error.message,
//                 })
//             }
//         }
//         else{
//              return res.status(400).json({
//                 success:false,
//                 message:"Invalid Request",
//              })   
//         }
//     }
//     catch(error){
//         console.log(error);
//         return res.status(500).json({
//                 success:false,
//                 message:error.message,
//         });
//     }
// }