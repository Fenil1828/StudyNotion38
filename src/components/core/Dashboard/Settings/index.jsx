import React from 'react'
import EditProfile from './EditProfile'
import ChangeProfilePicture from './ChangeProfilePicture'
import UpdatePassword from './UpdatePassword'
import DeleteAccount from './DeleteAccount'

const Settings = () => {
  return (
    <>
        <h1 className='mb-14 text-3xl font-medium text-richblack-5'>
            Edit Profile
        </h1>

        {/* //change profile picture */}
        <ChangeProfilePicture/>

        {/* //profiles */}
        <EditProfile/>

        {/* //password */}
        <UpdatePassword/>

        {/* delete account */}
        <DeleteAccount/>
    </>
  )
}

export default Settings
