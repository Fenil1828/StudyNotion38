// import React, { useEffect, useState } from 'react'
// import { MdClose } from 'react-icons/md'
// import { useSelector } from 'react-redux'

// const ChipInput = ({
//   // props to be passed to the component

//   label,
//   name,
//   placeholder,
//   register,
//   errors,
//   setValue,
//   getValues

// }) => {

//   const {editCourse, course} = useSelector((state) => state.course)

//   const [chips, setChips] = useState([])

//   useEffect(() => {
//     if(editCourse){
//       setChips(course?.tag)
//     }
//     register(name, {required: true, validate: (value) => value.length > 0})
//   } , [])

//   useEffect(() => {
//     setValue(name , chips)
//   }, [chips])

//   const handleKeyDown = (event) => {
//       if(event.key === "Enter" || event.key === ","){
//         event.preventDefault()

//         const chipValue = event.target.value.trim()

//         if(chipValue && !chips.includes(chipValue)){

//           const newChips = [...chips, chipValue]
//           setChips(newChips)
//           event.target.value = ""
//         }
//       }
//   }

//   const handleDeleteChip = (chipIndex) => {
//     const newchips = chips.filter((_, index) => index !== chipIndex)
//     setChips(newchips)
//   }

//   return (
//     <div className='flex flex-col space-y-2'>
      
//       <label htmlFor={name} className='text-sm text-richblack-5'>
//         {label} <sup className='text-pink-200'>*</sup>
//       </label>

//       <div className='flex w-full flex-wrap gap-y-2'>

//         {
//           chips.map((chip,index) => (
//             <div
//               key={index}
//               className='m-1 flex items-center rounded-full bg-yellow-400 px-2 py-1 text-sm text-richblack-5'
//             >
//               {chip}

//               <button
//                 type='button'
//                 className='ml-2 focus:outline-none'
//                 onClick={() => handleDeleteChip(index)}
//               >
//                 <MdClose className='text-sm' />

//               </button>
//             </div>
//           ))
//         }

//         <input type="text" 
//         name={name} 
//         id={name}
//         placeholder={placeholder}
//         onKeyDown={handleKeyDown}
//         className='form-style w-full'
//         />

//       </div>

//       {
//         errors[name] && (
//           <span className='ml-2 text-xs tracking-wide text-pink-200'>
//             {label} is required
//           </span>
//         )
//       }

//     </div>
//   )
// }

// export default ChipInput

import React, { useEffect, useState } from 'react';
import { MdClose } from 'react-icons/md';
import { useSelector } from 'react-redux';

const ChipInput = ({
  // props to be passed to the component
  label,
  name,
  placeholder,
  register,
  errors,
  setValue,
  getValues, // Keep getValues, though not directly used in this component, it's good practice
}) => {
  const { editCourse, course } = useSelector((state) => state.course);

  const [chips, setChips] = useState([]);

  useEffect(() => {
    if (editCourse && course?.tag) { // Check if course.tag exists before setting
      setChips(course.tag);
    }
    // Register the field with react-hook-form
    register(name, {
      required: true,
      validate: (value) => value.length > 0 || "At least one tag is required", // Custom message for validation
    });
  }, [editCourse, course, name, register]); // Added dependencies

  useEffect(() => {
    // Update the form value whenever chips array changes
    setValue(name, chips, { shouldValidate: true, shouldDirty: true });
  }, [chips, name, setValue]); // Added dependencies

  const handleKeyDown = (event) => {
    // Check if Enter or comma key is pressed
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault(); // Prevent default form submission or comma insertion

      const chipValue = event.target.value.trim();

      // Add chip only if it's not empty and not already present
      if (chipValue && !chips.includes(chipValue)) {
        setChips((prevChips) => [...prevChips, chipValue]);
        event.target.value = ""; // Clear the input field
      }
    }
  };

  const handleDeleteChip = (chipIndex) => {
    const newChips = chips.filter((_, index) => index !== chipIndex);
    setChips(newChips);
  };

  return (
    <div className='flex flex-col space-y-2'>
      <label htmlFor={name} className='text-sm text-richblack-5'>
        {label} <sup className='text-pink-200'>*</sup>
      </label>

      {/* Container for chips and input */}
      <div className='flex w-full flex-wrap gap-x-2 gap-y-2 rounded-md bg-richblack-700 p-3'> {/* Added bg, padding, and consistent gap */}
        {/* Render existing chips */}
        {chips.map((chip, index) => (
          <div
            key={index}
            className='flex items-center rounded-full bg-yellow-400 px-3 py-1 text-sm text-richblack-900 font-medium' // Adjusted padding, text color, and font weight
          >
            {chip}
            {/* Button to delete chip */}
            <button
              type='button'
              className='ml-2 text-richblack-900 focus:outline-none' // Adjusted text color
              onClick={() => handleDeleteChip(index)}
            >
              <MdClose className='text-base' /> {/* Adjusted icon size */}
            </button>
          </div>
        ))}

        {/* Input for new chips */}
        <input
          type="text"
          name={name}
          id={name}
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
          className='form-style flex-1 min-w-[150px] bg-richblack-700 text-richblack-5 placeholder:text-richblack-400 border-none outline-none focus:ring-0 focus:border-0' // Added flex-1 and min-w for responsiveness, adjusted styling
        />
      </div>

      {/* Error message */}
      {errors[name] && (
        <span className='ml-2 text-xs tracking-wide text-pink-200'>
          {errors[name].message || `${label} is required`} {/* Display specific validation message */}
        </span>
      )}
    </div>
  );
};

export default ChipInput;