import toast from "react-hot-toast"
import { setLoading } from "../../slices/authSlice"
import { apiConnector } from "../apiConnector"
import { setUser } from "../../slices/profileSlice"
import { logout } from "./authAPI"
import { profileEndpoints } from "../apis"

//api to connect routes
const{
    GET_USER_DETAILS_API,
    GET_USER_ENROLLED_COURSES_API,
    GET_INSTRUCTOR_DATA_API,
} = profileEndpoints




export function getUserDetails(token , navigate){
    return async (dispatch) => {

        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))

        try{
            const response = await apiConnector("GET" , GET_USER_DETAILS_API, null , {
                Authorization: `Bearer ${token}`,
            } )
            console.log("user details response : " , response)

            if(!response.data.success){
                throw new Error(response.data.message)

            }

            const userImage = response.data.data.image 
            ? response.data.data.image
            : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`

            dispatch(setUser({ ...response.data.data, image: userImage}))

            //  localStorage.setItem("user", JSON.stringify(response.data.user))

        }
        catch(error){
            dispatch(logout(navigate))
            console.log("user details error : " , error)
            toast.dismiss("Could Not Get User Details")
        }

        toast.dismiss(toastId)
        dispatch(setLoading(false))
    }
}

export async function getInstructorData(token) {
    const toastId = toast.loading("Loading...")

    let result = []

    try{
        const response = await apiConnector("GET" , GET_INSTRUCTOR_DATA_API, null , {
            Authorization: `Bearer ${token}`,
        })
        console.log("get instructor data api response : " , response)
        result = response?.data?.courses
    }
    catch(error){
        console.log("get instructor data error : " , error)
        toast.error("Could Not Get Instructor Data")
    }
    toast.dismiss(toastId)
    return result
}


export async function getUserEnrolledCourses(token){

    const toastId = toast.loading("Loading..")

    let result = []

    try{
        const response = await apiConnector("GET" , GET_USER_ENROLLED_COURSES_API,null,{
            Authorization: `Bearer ${token}`
        })

        console.log("getuserenrolled course data : " , response)

        if(!response.data.success){
            throw new Error(response.data.message)
        }
        result = response.data.data

        
        console.log("getuserenrolled course data : " , result)
    }
    catch(error){
        console.log("GET_USER_ENROLLED_COURSES_API API ERROR............", error)
        toast.error("Could Not Get Enrolled Courses")
    }
    toast.dismiss(toastId)
    return result
}