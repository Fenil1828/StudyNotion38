import { toast } from "react-hot-toast"

import { setLoading, setToken } from "../../slices/authSlice"
import { resetCart } from "../../slices/cartSlice"
import { setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiConnector"
import { endpoints } from "../apis"

const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  RESETPASSTOKEN_API,
  RESETPASSWORD_API,
   GOOGLE_LOGIN_API,
} = endpoints

export function login(email, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      })

      console.log("LOGIN API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("Login Successful")
      dispatch(setToken(response.data.token))
      
      const userImage = response.data?.user?.image
        ? response.data.user.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
      dispatch(setUser({ ...response.data.user, image: userImage }))


      localStorage.setItem("token", JSON.stringify(response.data.token))
      localStorage.setItem("user", JSON.stringify(response.data.user))
      
      
      navigate("/dashboard/my-profile")
    } catch (error) {
      console.log("LOGIN API ERROR............", error)
      toast.error("Login Failed")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}


//for otp function

export function sendOTP(email , navigate){
    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        
        try{
            const response = await apiConnector("POST" , SENDOTP_API, {
                email,
                checkUserPresent: true,
            })
            console.log("send api response " , response)

            console.log(response.data.success)

            if(!response.data.success){
                throw new Error(response.data.message)
            }

            toast.success("OTP Sent Successfully")
            navigate("/verify-email")
        }
        catch(error){
            console.log("sendotp api error " , error)
            // toast.error("Could Not Send OTP")
              toast.error("You Have Already Signup. Please Login")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}


//signup
export function signUp(
    accountType,
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    otp,
    navigate
) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try{
            const response = await apiConnector("POST" , SIGNUP_API, {
                accountType,
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                otp,
            })

            console.log("signup api response" , response)

            if(!response.data.success){
                throw new Error(response.data.message)
            }
            toast.success("Signup Successful")
            navigate("/login")
        }
        catch(error){
            console.log("Signup api error.. ",error)
            toast.error("Signup Failed")
            navigate("/signup")

        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

//get reset password

export function getPasswordResetToken(email , setEmailSent){
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    
    try{
      const response = await apiConnector("POST" , RESETPASSTOKEN_API,{
          email,
      })

      console.log("reset password token response: " , response);

      if(!response.data.success){
        throw new Error(response.data.message)
      }

      toast.success("Reset Email Sent")
      setEmailSent(true)

    }
    catch(error){
      console.log(error)
      console.log("reset password token error : " , error)
      console.error(error)
      toast.error("Failed To Send Reset Email")
    }

    toast.dismiss(toastId)
    dispatch(setLoading(false))

  }
}

//reset password token

export function resetPassword(password , confirmPassword , token , navigate){
  return async (dispatch) => {
   
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true))

    try{
       const response = await apiConnector("POST" , RESETPASSWORD_API ,{
      password,
      confirmPassword,
      token,
    } )

    console.log("reset response: " , response);

    if(!response.data.success){
      throw new Error(response.data.message)
    }

    toast.success("Password Reset Successfully")
    // console.log(response)
    navigate("/login")
    }
    catch(error){
      console.log("reset password error : ", error)
      toast.error("Failed To Reset Password")
    }
    toast.dismiss(toastId)
    dispatch(setLoading(false))
  }
}


//logout function
export function logout(navigate){
  return (dispatch) => {
    dispatch(setToken(null))
    dispatch(setUser(null))
    // dispatch(resetCart())
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    toast.success("Logged Out")
    navigate("/")
  }
}



// google

export function googleLogin(tokenId, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", GOOGLE_LOGIN_API, {
        tokenId,
      })

      console.log("GOOGLE LOGIN API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("Google Login Successful")
      dispatch(setToken(response.data.token))

      // const userImage = response.data?.user?.image
      //   ? response.data.user.image
      //   : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`

      // dispatch(setUser({ ...response.data.user, image: userImage }))


       const userImage = response.data?.user?.image
        ? response.data.user.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
      dispatch(setUser({ ...response.data.user, image: userImage }))



      localStorage.setItem("token", JSON.stringify(response.data.token))
      localStorage.setItem("user", JSON.stringify(response.data.user))
      navigate("/dashboard/my-profile")
    } catch (error) {
      console.log("GOOGLE LOGIN API ERROR............", error)
      // toast.error("Google Login Failed")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}



// // Google Login Thunk
// export function googleLogin(tokenId, navigate) {
//   return async (dispatch) => {
//     const toastId = toast.loading("Logging in with Google...");
//     dispatch(setLoading(true));

//     try {
//       const response = await apiConnector("POST", GOOGLE_LOGIN_API, { tokenId });

//       console.log("GOOGLE LOGIN API RESPONSE:", response);

//       if (!response.data.success) {
//         throw new Error(response.data.message);
//       }

//       const user = response.data.user;
//       const seed = encodeURIComponent(`${user.firstName} ${user.lastName}`);
//       const fallbackUrl = `https://api.dicebear.com/9.x/initials/png?seed=${seed}`;
//       const userImage = user.image ? user.image : fallbackUrl;

//       toast.success("Google Login Successful");
//       dispatch(setToken(response.data.token));
//       dispatch(setUser({ ...user, image: userImage }));

//       localStorage.setItem("token", JSON.stringify(response.data.token));
//       localStorage.setItem("user", JSON.stringify({ ...user, image: userImage }));

//       navigate("/dashboard/my-profile");
//     } catch (error) {
//       console.error("GOOGLE LOGIN API ERROR:", error);
//       toast.error("Google Login Failed");
//     } finally {
//       dispatch(setLoading(false));
//       toast.dismiss(toastId);
//     }
//   };
// }
