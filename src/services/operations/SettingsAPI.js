import React from 'react'
import toast from 'react-hot-toast'
import { apiConnector } from '../apiConnector'
import { setUser } from '../../slices/profileSlice'
import { settingsEndpoints } from '../apis'
import { logout } from './authAPI'

const {
  UPDATE_DISPLAY_PICTURE_API,
  UPDATE_PROFILE_API,
  CHANGE_PASSWORD_API,
  DELETE_PROFILE_API,
} = settingsEndpoints

export function updateProfile(token , formData){
    return async (dispatch) => {
        const toastId = toast.loading("Loading...")

        try{
            const response = await apiConnector("PUT" , UPDATE_PROFILE_API ,formData, {
                Authorization: `Bearer ${token}`
            })
            console.log("update profile response is : " ,response)

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            const userImage = response.data.updatedUserDetails.image  
            ? response.data.updatedUserDetails.image
            : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.updatedUserDetails.firstName} ${response.data.updatedUserDetails.lastName}`

            dispatch(
                setUser({
                    ...response.data.updatedUserDetails, image: userImage

                })
                  
            )
        toast.success("Profile Updated Successfully")


        }
        catch(error){
            console.log("error is : " , error);
            toast.error("Could Not Update Profile")
        }
        toast.dismiss(toastId)
    }
}

export async function changepassword(token, formData){
        const toastId = toast.loading("Loading...")

        try{
            const response = await apiConnector("POST" , CHANGE_PASSWORD_API, formData ,{
                Authorization: `Bearer ${token}`
            })
            console.log("change password response : " , response)

            if(!response.data.success){
                throw new Error(response.data.message)
            }

            toast.success("Password Changed Successfully")
        }
        catch(error){
            console.log(error)
            toast.error("Could Not Change Password")
        }
        toast.dismiss(toastId)
    }


    export function updateDisplayPicture(token , formData){
        return async (dispatch) => {
            const toastId = toast.loading("Loading...")

            console.log("token mil gaya : " , token)
            try{
                console.log("call pe aagye babu :")
                const response = await apiConnector("PUT" ,
                     UPDATE_DISPLAY_PICTURE_API, formData , {
                        "Content-Type": "multipart/form-data",
                      Authorization: `Bearer ${token}`
                })
            
                console.log("response mil gaya babu")
                console.log("token mil gaya : " , token)

                console.log("update profile picture response .. " , response)

                if(!response.data.success){
                    throw new Error(response.data.message)
                }

                toast.success("Display Picture Updated Successfully")
                dispatch(setUser(response.data.data))
            }
            catch(error){
                console.log("display picture update error" , error)
                toast.success("Could Not Update Display Picture")
            }
            toast.dismiss(toastId)
        }
    }


    export function deleteProfile(token , navigate){
        return async (dispatch) => {
            const toastId = toast.loading("Loading...")

            try{
                const response = await apiConnector("DELETE" ,DELETE_PROFILE_API ,null ,{
                    Authorization: `Bearer ${token}`,
                })

                console.log("dlete profile response is : " , response)

                if(!response.data.success){
                    throw new Error(response.data.message)
                }
                toast.success("Profile Deleted Successfully")
                dispatch(logout(navigate))
            }
            catch(error){
                console.log("delete profile error : " , error)
                toast.error("Could Not Delete Profile")
            }
            toast.dismiss(toastId)
        }
    }