// import React, { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux'

// const RequirementsField = ({
//   name,
//   label,
//   register,
//   setValue,
//   errors,
//   getValues,
// }) => {

//   const { editCourse, course } = useSelector((state) => state.course)
//   const [requirement, setRequirement] = useState("")
//   const [requirementsList, setRequirementsList] = useState([])

//   useEffect(() => {
//     if(editCourse){
//       setRequirementsList(course?.instructions)
//     }
//     register(name, {required: true, validate: (value) => value.length > 0})
//   }, [])

//   useEffect(() => {
//     setValue(name, requirementsList)
//   }, [requirementsList])

//   const handleAddRequirement = () => {
//     if(requirement){
//       setRequirementsList([...requirementsList, requirement])
//       setRequirement("")
//     }
//   }

//   const handleRemoveRequirement = (index) => {
//     const updatedRequirements = [...requirementsList]
//     updatedRequirements.splice(index , 1)
//     setRequirementsList(updatedRequirements)
//   }

//   return (
//    <div className='flex flex-col space-y-2'>
//       <label htmlFor={name}
//        className='text-sm text-richblack-5'
//       >
//         {label} <sup className='text-pink-200'>*</sup>
//       </label>

//       <div className='flex flex-col items-start space-y-2'>
//         <input type="text" id={name}
//         value={requirement}
//         onChange={(e) => setRequirement(e.target.value)}
//         className='form-style w-full'
//         />

//         <button
//          type='button'
//          onClick={handleAddRequirement}
//          className='font-semibold text-yellow-50'
//         >
//           Add
//         </button>
//       </div>

//       {
//         requirementsList.length > 0 && (
//           <ul className='mt-2 list-inside list-disc'>
//             {
//               requirementsList.map((requirement, index) => (
//                 <li key={index}
//                  className='flex items-center text-richblack-5'
//                 >
//                   <span>{requirement}</span>

//                   <button
//                    type='button'
//                    className='ml-2 text-xs text-pure-greys-300'
//                    onClick={() => handleRemoveRequirement(index)}
//                   >
//                     Clear

//                   </button>

//                 </li>
//               ))
//             }
//           </ul>
//         )
//       }
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

// export default RequirementsField

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const RequirementsField = ({
  name,
  label,
  register,
  setValue,
  errors,
  getValues, // getValues is passed but not directly used within this component's logic
}) => {
  const { editCourse, course } = useSelector((state) => state.course);
  const [requirement, setRequirement] = useState("");
  const [requirementsList, setRequirementsList] = useState([]);

  useEffect(() => {
    // If in edit mode, populate the requirements list from course data
    if (editCourse && course?.instructions) {
      setRequirementsList(course.instructions);
    }
    // Register the field with react-hook-form
    // The validation ensures at least one requirement is added
    register(name, { required: true, validate: (value) => value.length > 0 });
  }, [editCourse, course, name, register]); // Added dependencies

  useEffect(() => {
    // Update the form value in react-hook-form whenever requirementsList changes
    setValue(name, requirementsList, { shouldValidate: true, shouldDirty: true });
  }, [requirementsList, name, setValue]); // Added dependencies

  const handleAddRequirement = () => {
    if (requirement.trim()) { // Ensure requirement is not just whitespace
      setRequirementsList((prevList) => [...prevList, requirement.trim()]); // Trim whitespace
      setRequirement(""); // Clear the input field
    }
  };

  const handleRemoveRequirement = (index) => {
    // Filter out the requirement at the specified index
    const updatedRequirements = requirementsList.filter((_, i) => i !== index);
    setRequirementsList(updatedRequirements);
  };

  // Handle "Enter" key press to add requirement
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent form submission
      handleAddRequirement();
    }
  };

  return (
    <div className='flex flex-col space-y-2'>
      <label
        htmlFor={name}
        className='text-sm text-richblack-5'
      >
        {label} <sup className='text-pink-200'>*</sup>
      </label>

      <div className='flex flex-col sm:flex-row items-start sm:items-center gap-2'> {/* Added sm:flex-row for horizontal layout on larger screens, gap for spacing */}
        <input
          type="text"
          id={name}
          value={requirement}
          onChange={(e) => setRequirement(e.target.value)}
          onKeyPress={handleKeyPress} // Added key press handler
          className='form-style w-full sm:w-auto flex-1' // w-full on mobile, flex-1 and w-auto on sm+
          placeholder='Add a requirement' // Added placeholder
        />

        <button
          type='button'
          onClick={handleAddRequirement}
          className='font-semibold text-yellow-50 min-w-max px-4 py-2 rounded-md bg-richblack-700 hover:bg-richblack-600 transition-colors duration-200' // Added padding, background, hover effects, and min-w-max
        >
          Add
        </button>
      </div>

      {/* Displaying the list of requirements */}
      {
        requirementsList.length > 0 && (
          <ul className='mt-2 list-inside list-disc space-y-1'> {/* Added space-y for vertical spacing between list items */}
            {
              requirementsList.map((req, index) => (
                <li
                  key={index}
                  className='flex items-center text-richblack-5 break-words' // Added break-words for long requirements
                >
                  <span>{req}</span>

                  <button
                    type='button'
                    className='ml-2 text-xs text-pure-greys-300 hover:text-pure-greys-200 transition-colors duration-200' // Added hover effect
                    onClick={() => handleRemoveRequirement(index)}
                  >
                    Clear
                  </button>
                </li>
              ))
            }
          </ul>
        )
      }

      {/* Error message */}
      {
        errors[name] && (
          <span className='ml-2 text-xs tracking-wide text-pink-200'>
            {label} is required
          </span>
        )
      }
    </div>
  );
};

export default RequirementsField;