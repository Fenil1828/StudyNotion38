import { useState } from "react"
import { ACCOUNT_TYPE } from "../../../utils/constants"
import Tab from "../../common/Tab"
import toast from "react-hot-toast"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setSignupData } from "../../../slices/authSlice"
import { sendOTP, sendOtp } from "../../../services/operations/authAPI"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import GoogleOAuthButton from "./GoogleOAuthButton"


function SignupForm(){

    const navigate = useNavigate()
    const dispatch = useDispatch()

    // select student or instructor
    const [accountType , setAccountType] = useState(ACCOUNT_TYPE.STUDENT)

    const [formData , setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    const [showPassword , setShowPassword] = useState(false)
    const [showConfirmPassword , setShowConfirmPassword] = useState(false)

    const {firstName , lastName , email, password , confirmPassword} = formData


    //without rendering change

    const handleChange = (e) => {
        setFormData((preData) => ({
            ...preData,
            [e.target.name]: e.target.value,
        }))
    }

      //form submit event
    const handleOnSubmit = (e) => {
        e.preventDefault()

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            toast.error("Please enter a valid email address");
            return;
        }

        // Password validation
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if(!passwordRegex.test(password)){
            toast.error("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character");
            return;
        }

        if(password !== confirmPassword){
            toast.error("Password Do Not Match")
            return
        }

        const singupData = {
            ...formData,
            accountType,
        }


        
    // Setting signup data to state
    // To be used after otp verification
        dispatch(setSignupData(singupData))

        //send otp for the verification
        dispatch(sendOTP(formData.email, navigate))
    }

    //form submit event
    // const handleOnSubmit = (e) => {
    //     e.preventDefault()

    //     if(password !== confirmPassword){
    //         toast.error("Password Do Not Match")
    //         return
    //     }

    //     const singupData = {
    //         ...formData,
    //         accountType,
    //     }


        
    // // Setting signup data to state
    // // To be used after otp verification
    //     dispatch(setSignupData(singupData))

    //     //send otp for the verification
    //     dispatch(sendOTP(formData.email, navigate))
    // }



//data to pass to tab component
const tabData = [
    {
        id: 1,
        tabName : "Student",
        type: ACCOUNT_TYPE.STUDENT,
    },
    {
        id: 2,
        tabName: "Instructor",
        type: ACCOUNT_TYPE.INSTRUCTOR,
    }
]



return(
    <div>

        <Tab tabData={tabData} field={accountType} setField={setAccountType} />

        <form action="" 
        onSubmit={handleOnSubmit}
        className="flex w-full flex-col gap-y-4">

            <div className="flex gap-x-4">

                <label htmlFor="">
                    <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                        First Name <sup className="text-pink-200">*</sup>
                    </p>

                    <input 
                    required
                    type="text" 
                    name="firstName" 
                    value={firstName}
                    onChange={handleChange}
                    placeholder="Enter First Name"
                    className="form-style w-full"
                    />
                </label>

                <label htmlFor="">
                    <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                        Last Name <sup className="text-pink-200">*</sup>
                    </p>

                    <input 
                    required
                    type="text" 
                    name="lastName" 
                    value={lastName}
                    onChange={handleChange}
                    placeholder="Enter last Name"
                    className="form-style w-full"
                    />
                </label>

            </div>

            <label htmlFor="" className="w-full">
                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                    Email Address <sup className="text-pink-200">*</sup>
                </p>

                <input 
                type="text" 
                name="email" 
                value={email}
                onChange={handleChange}
                placeholder="Enter email address"
                className="form-style w-full"
                />
            </label>

            <div className="flex gap-x-4">

                <label htmlFor="" className="relative">
                    <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                        Create Password <sup className="text-pink-200">*</sup>
                    </p>

                    <input
                    required 
                    type={showPassword ? "text" : "password"} 
                    name="password"
                    value={password}
                    onChange={handleChange}
                    placeholder="Enter Password"
                    className="form-style w-full !pr-10"   
                    />

                    <span
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                    >

                        {
                            showPassword ? ( <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />) : (
                                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                            )
                        }
                    </span>

                </label>

                <label htmlFor="" className="relative">

                    <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                        Confirm Password <sup className="text-pink-200">*</sup>
                    </p>

                    <input 
                    required
                    type={showConfirmPassword ? "text" : "password"} 
                    name="confirmPassword" 
                    value={confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm Password"
                    className="form-style  w-full !pr-10"
                    />

                    <span
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                    >
                        {
                            showConfirmPassword ? (
                                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                            ) : (
                                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                            )
                        }
                    </span>
                </label>
            </div>

            <button
            type="submit"
            className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
            >
                Create Account
            </button>

            <div>
        <GoogleOAuthButton
        />
      </div>

        </form>

    </div>
)


}

export default SignupForm
