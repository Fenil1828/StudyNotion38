// import React from 'react'
// import RenderStep from './RenderStep'

// const AddCourse = () => {
//   return (
//       <>
//       <div className='flex w-full items-center gap-x-6'>
//           <div className='flex flex-1 flex-col'>
//             <h1 className='mb-14 text-3xl font-medium text-richblack-5'>
//                 Add Course
//             </h1>

//             <div className='flex-1'>
//                 <RenderStep/>
//             </div>

//           </div>

//           <div className='sticky top-10 hidden max-w-[400px] w-[400px] flex-shrink-0 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6 xl:block self-start' >
//             <p className='mb-8 text-lg text-richblack-5'>⚡ Course Upload Tips</p>

//             <ul className='ml-5 list-item list-disc space-y-4 text-xs text-richblack-5'>
//                 <li>Set the Course Price option or make it free.</li>
//                 <li>Standard size for the course thumbnail is 1024x576.</li>
//                 <li>Video section controls the course overview video.</li>
//                 <li>Course Builder is where you create & organize a course.</li>
//                 <li>
//                 Add Topics in the Course Builder section to create lessons,
//                 quizzes, and assignments.
//                 </li>
//                 <li>
//                 Information from the Additional Data section shows up on the
//                 course single page.
//                 </li>
//                 <li>Make Announcements to notify any important</li>
//                 <li>Notes to all enrolled students at once.</li>
//             </ul>
          
//           </div>
//     </div>
//       </>
//   )
// }

// export default AddCourse

import React from 'react';
import RenderStep from './RenderStep';

const AddCourse = () => {
  return (
    <>
      <div className='flex flex-col lg:flex-row w-full items-start gap-y-8 lg:gap-x-6'> {/* Changed to flex-col for mobile, lg:flex-row for larger screens */}
        {/* Main Course Form Area */}
        <div className='flex flex-1 flex-col w-full'> {/* Added w-full to ensure it takes full width on mobile */}
          <h1 className='mb-6 md:mb-14 text-2xl md:text-3xl font-medium text-richblack-5 text-center lg:text-left'> {/* Adjusted heading size and alignment for mobile */}
            Add Course
          </h1>

          <div className='flex-1'>
            <RenderStep />
          </div>
        </div>

        {/* Course Upload Tips Sidebar */}
        <div className='w-full lg:w-[400px] flex-shrink-0 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-4 md:p-6 lg:sticky lg:top-10 lg:self-start'> {/* Made it full width on mobile, fixed width on large screens, adjusted padding */}
          <p className='mb-4 md:mb-8 text-base md:text-lg text-richblack-5'>⚡ Course Upload Tips</p>

          <ul className='ml-5 list-item list-disc space-y-2 text-xs text-richblack-5'> {/* Adjusted space-y for tighter spacing on mobile */}
            <li>Set the Course Price option or make it free.</li>
            <li>Standard size for the course thumbnail is 1024x576.</li>
            <li>Video section controls the course overview video.</li>
            <li>Course Builder is where you create & organize a course.</li>
            <li>
              Add Topics in the Course Builder section to create lessons,
              quizzes, and assignments.
            </li>
            <li>
              Information from the Additional Data section shows up on the
              course single page.
            </li>
            <li>Make Announcements to notify any important</li>
            <li>Notes to all enrolled students at once.</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default AddCourse;