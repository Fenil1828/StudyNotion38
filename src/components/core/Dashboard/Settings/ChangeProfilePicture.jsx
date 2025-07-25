import React, { useEffect, useRef, useState } from 'react'
import { CiLineHeight } from 'react-icons/ci'
import { useDispatch, useSelector } from 'react-redux'
import { updateDisplayPicture } from '../../../../services/operations/SettingsAPI'
import IconBtn from '../../../common/IconBtn'
import { FiUpload } from 'react-icons/fi'

const ChangeProfilePicture = () => {

  const {token} = useSelector((state) => state.auth)
  const {user} = useSelector((state) => state.profile)

  // console.log("user details here: " , user)

  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)
  const [imageFile, setImageFile] = useState(null)
  const [previewSource , setPreviewSource] = useState(null)

  const fileInputRef = useRef(null)

  const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5 MB
  const VALID_TYPES = ['image/png', 'image/jpeg', 'image/gif']

  const handleClick = () => {
    fileInputRef.current.click()
  }

  //additional add for valid file or not
  const isValid = (file) => {
    if(!VALID_TYPES.includes(file.type)){
      alert('Please select a PNG, JPG, or GIF image.')
      return false
    }
    if(file.size > MAX_FILE_SIZE){
      alert('File size must be less than 5 MB.')
      return false
    }
    return true
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    // console.log(file)
    if (file && isValid(file)) {
      setImageFile(file)
      previewFile(file)
    }
  }

  const previewFile = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend =  () => {
      setPreviewSource(reader.result)
    }
  }

  const handleFileUpload = () => {
    try{

      if(!imageFile) return 

      console.log("Uploading..")
      setLoading(true)

      const formData = new FormData()
      formData.append("displayPicture" , imageFile)

      dispatch(updateDisplayPicture(token, formData))
      .catch((err) => {
        console.error('Upload Failed :' , err)
      })
      .finally(() => {
        setLoading(false)
      })
    }
    catch(error){
      console.log("error message :" , error)
    }
  }

  useEffect(() => {
    if(imageFile){
      previewFile(imageFile)
    }
  }, [imageFile])

  return (
    <div className='flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12 text-richblack-5'>
      <div className='flex items-center gap-x-4'>
        <img 
        src={previewSource || user?.image} 
        alt={`profile-${user?.firstName}`}
        className='aspect-square w-[78px] rounded-full object-cover'
         />

         <div className='space-y-2'>
          <p>Change Profile Picture</p>

            <div className='flex flex-row gap-3'>
              <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleFileChange}
              className='hidden'
              accept='image/png, image/gif, image/jpeg'
              />

              <button
                onClick={handleClick}
                disabled={loading}
                className='cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50'

              >
                Select
              </button>
              <IconBtn
               text={loading ? "Uploading..." : "Upload"}
               onClick={handleFileUpload}
               disabled={loading || !imageFile}
              >
                {
                  !loading && (
                    <FiUpload className='text-lg text-richblack-900' />
                  )
                }

              </IconBtn>
            </div>

         </div>
      </div>
    </div>
  )
}

export default ChangeProfilePicture
