// import React from 'react'

// import Iconbtn from "../../common/IconBtn"
// import { useSelector } from 'react-redux'
// import IconBtn from '../../common/IconBtn'
// import { useNavigate } from 'react-router-dom'
// import { RiEditBoxLine } from 'react-icons/ri'
// import { formattedDate } from '../../../utils/dateFormatter'

// const MyProfile = () => {

//   const {user} = useSelector((state) => state.profile)
//   console.log("user is : " , user)

//   const navigate = useNavigate();

//   return (
//     <>
//         <h1 className='mb-14 text-3xl font-medium text-richblack-5'>
//           My Profile
//         </h1>

//         <div className='flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12'>
//           <div className='flex items-center gap-x-4'> 
//             <img 
//             src={user?.image} 
//             alt={`profile-${user?.firstName}`} 
//             className='aspect-square w-[78px] rounded-full object-cover'
//             />
//             <div className='space-y-1'> 
//               <p className='text-lg font-semibold text-richblack-5'>
//                 {user?.firstName + " " + user?.lastName}
//               </p>

//               <p className='text-sm text-richblack-300'>
//                 {user?.email}
//               </p>

//             </div>
//           </div>

//           <IconBtn
//            text="Edit"
//            onClick={() => {
//             navigate("/dashboard/settings")
//            }}
//           >
//             <RiEditBoxLine/>

//           </IconBtn>
//         </div>


//         {/* section 2 */}

//         <div className='my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12'>
//           <div className='flex w-full items-center justify-between'>
//             <p className='text-lg font-semibold text-richblack-5'>About</p>

//               <IconBtn
//                text="Edit"
//                onClick={() => {
//                 navigate("/dashboard/settings")
//                }}
//               >
//                 <RiEditBoxLine/>
//               </IconBtn>
//             </div>
           

//             {/* <p
//             className={`${user?.additionalDetails?.about ? "text-richblack-5" : "text-richblack-400"} text-sm font-medium`}
//             >
//             </p> */}

//             <p className='text-sm text-richblack-300'>
//                 {user?.additionalDetails?.about}
//             </p>

          
//         </div>





//         {/* section 3 */}
//         <div className='my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12'>
//             <div className='flex w-full items-center justify-between'>
//                 <p className='text-lg font-semibold text-richblack-5'>
//                   Personal Details
//                 </p>

//                 <IconBtn
//                   text="Edit"
//                   onClick={() => {
//                     navigate("/dashboard/settings")
//                   }}
//                 >
//                   <RiEditBoxLine />
//                 </IconBtn>
//             </div>

          
//           <div className='flex max-w-[500px] justify-between'>
//             <div className='flex flex-col gap-y-5'>

//                <div>
//                   <p className='mb-2 text-sm text-richblack-600'>First Name</p>
//                   <p className='text-sm font-medium text-richblack-5'>
//                     {user?.firstName}
//                   </p>
//                 </div>   

//                  <div>
//                   <p className='mb-2 text-sm text-richblack-600'>Email</p>
//                   <p className='text-sm font-medium text-richblack-5'>
//                     {user?.email}
//                   </p>
//                 </div>   

//                  <div>
//                   <p className='mb-2 text-sm text-richblack-600'>Gender</p>
//                   <p className='text-sm font-medium text-richblack-5'>
//                     {user?.additionalDetails?.gender ?? "Add Gender"}
//                   </p>
//                 </div>   

//             </div>

//             <div className='flex flex-col gap-y-5 '>
//               <div>
//                 <p className='mb-2 text-sm text-richblack-600'> Last Name</p>
//                 <p className='text-sm font-medium text-richblack-5'>
//                   {user?.lastName}
//                 </p>
//               </div>

//                <div>
//                 <p className='mb-2 text-sm text-richblack-600'>Phone Number</p>
//                 <p className='text-sm font-medium text-richblack-5'>
//                   {user?.additionalDetails?.contactNumber ?? "Add Contact Number"}
//                 </p>
//               </div>   

//               <div>
//                 <p className='mb-2 text-sm text-richblack-600'>Date of Birth</p>
//                 <p className='text-sm font-medium text-richblack-5'>
//                   {formattedDate(user?.additionalDetails?.dateOfBirth)
//                   ?? "Add Date Of Birth"
//                   }
//                 </p>
//               </div>

//             </div>
//           </div>


//         </div>
//     </>
//   )
// }

// export default MyProfile

import React from 'react';
import { useSelector } from 'react-redux';
import IconBtn from '../../common/IconBtn';
import { useNavigate } from 'react-router-dom';
import { RiEditBoxLine } from 'react-icons/ri';
import { formattedDate } from '../../../utils/dateFormatter';

const MyProfile = () => {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();

  return (
    <div className="max-w-[1000px] mx-auto px-4 py-6">
      <h1 className='mb-6 md:mb-10 text-2xl md:text-3xl font-medium text-richblack-5'>
        My Profile
      </h1>

      {/* Profile Card */}
      <div className='flex flex-col sm:flex-row sm:items-center justify-between rounded-lg border border-richblack-700 bg-richblack-800 p-4 sm:p-6'>
        <div className='flex items-center gap-3 sm:gap-4 mb-4 sm:mb-0'>
          <img 
            src={user?.image} 
            alt={`profile-${user?.firstName}`} 
            className='w-14 h-14 sm:w-16 sm:h-16 md:w-[78px] md:h-[78px] rounded-full object-cover border-2 border-richblack-700'
          />
          <div>
            <p className='text-base sm:text-lg font-semibold text-richblack-5'>
              {user?.firstName} {user?.lastName}
            </p>
            <p className='text-xs sm:text-sm text-richblack-300 break-all'>
              {user?.email}
            </p>
          </div>
        </div>
        
        <div className="self-end sm:self-auto">
          <IconBtn
            text="Edit"
            onClick={() => navigate("/dashboard/settings")}
            customClasses="text-xs py-1.5 px-3 sm:py-2 sm:px-4"
          >
            <RiEditBoxLine className="text-sm sm:text-base" />
          </IconBtn>
        </div>
      </div>

      {/* About Section */}
      <div className='my-6 md:my-8 rounded-lg border border-richblack-700 bg-richblack-800 p-4 sm:p-6'>
        <div className='flex items-center justify-between mb-4'>
          <p className='text-base md:text-lg font-semibold text-richblack-5'>About</p>
          <IconBtn
            text="Edit"
            onClick={() => navigate("/dashboard/settings")}
            customClasses="text-xs py-1.5 px-3"
          >
            <RiEditBoxLine className="text-sm" />
          </IconBtn>
        </div>
        
        <p className='text-xs sm:text-sm text-richblack-300 leading-relaxed'>
          {user?.additionalDetails?.about || 'No description added yet'}
        </p>
      </div>

      {/* Personal Details */}
      <div className='my-6 md:my-8 rounded-lg border border-richblack-700 bg-richblack-800 p-4 sm:p-6'>
        <div className='flex items-center justify-between mb-4'>
          <p className='text-base md:text-lg font-semibold text-richblack-5'>
            Personal Details
          </p>
          <IconBtn
            text="Edit"
            onClick={() => navigate("/dashboard/settings")}
            customClasses="text-xs py-1.5 px-3"
          >
            <RiEditBoxLine className="text-sm" />
          </IconBtn>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6'>
          <div className='space-y-4'>
            <DetailItem label="First Name" value={user?.firstName} />
            <DetailItem label="Email" value={user?.email} />
            <DetailItem 
              label="Gender" 
              value={user?.additionalDetails?.gender || "Not specified"} 
            />
          </div>
          
          <div className='space-y-4'>
            <DetailItem label="Last Name" value={user?.lastName} />
            <DetailItem 
              label="Phone Number" 
              value={user?.additionalDetails?.contactNumber || "Not specified"} 
            />
            <DetailItem 
              label="Date of Birth" 
              value={
                user?.additionalDetails?.dateOfBirth 
                  ? formattedDate(user.additionalDetails.dateOfBirth) 
                  : "Not specified"
              } 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper component for consistent detail items
const DetailItem = ({ label, value }) => (
  <div>
    <p className='text-xs text-richblack-500 mb-1'>{label}</p>
    <p className='text-sm text-richblack-50 font-medium break-words'>
      {value}
    </p>
  </div>
);

export default MyProfile;