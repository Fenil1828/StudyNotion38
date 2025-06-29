
// import React, { useEffect, useRef, useState } from 'react'
// import { useDropzone } from 'react-dropzone'
// import { FiUploadCloud } from 'react-icons/fi'
// import { useSelector } from 'react-redux'
// import { Player } from 'video-react'

// import "video-react/dist/video-react.css"

// const Upload = ({
//     name,
//     label,
//     register,
//     setValue,
//     errors,
//     video = false,
//     viewData = null,
//     editData = null,
// }) => {
//     const { course } = useSelector((state) => state.course)
//     const [selectedFile, setSelectedFile] = useState(null)
//     const [previewSource, setPreviewSource] = useState(
//         viewData ? viewData : editData ? editData : ""
//     )

//     const inputRef = useRef(null)

//     const onDrop = (acceptedFiles) => {
//         console.log("Files dropped:", acceptedFiles) // Debug log
//         const file = acceptedFiles[0]
//         if (file) {
//             console.log("File selected:", file.name, file.size, file.type) // Debug log
//             previewFile(file)
//             setSelectedFile(file)
//         }
//     }

//     const onDropRejected = (rejectedFiles) => {
//         console.log("Files rejected:", rejectedFiles) // Debug log
//         alert("File type not supported. Please upload a valid image file.")
//     }

//     const { getRootProps, getInputProps, isDragActive } = useDropzone({
//         accept: !video
//             ? { 
//                 "image/jpeg": [".jpeg", ".jpg"],
//                 "image/png": [".png"],
//                 "image/gif": [".gif"],
//                 "image/webp": [".webp"]
//               }
//             : { 
//                 "video/mp4": [".mp4"],
//                 "video/quicktime": [".mov"],
//                 "video/x-msvideo": [".avi"]
//               },
//         onDrop,
//         onDropRejected,
//         multiple: false,
//         maxFiles: 1,
//         maxSize: video ? 100 * 1024 * 1024 : 10 * 1024 * 1024, // 100MB for video, 10MB for image
//     })

//     const previewFile = (file) => {
//         const reader = new FileReader()
//         reader.readAsDataURL(file)
//         reader.onloadend = () => {
//             console.log("File preview generated") // Debug log
//             setPreviewSource(reader.result)
//         }
//         reader.onerror = (error) => {
//             console.error("Error reading file:", error)
//             alert("Error reading file. Please try again.")
//         }
//     }

//     // Handle click on the upload area
//     const handleClick = (event) => {
//         console.log("Upload area clicked") // Debug log
//         // The dropzone should handle this automatically, but we can add manual trigger
//         if (inputRef.current) {
//             inputRef.current.click()
//         }
//     }

//     // Register field with react-hook-form
//     useEffect(() => {
//         if (register) {
//             register(name, { 
//                 required: !viewData ? `${label} is required` : false 
//             })
//         }
//     }, [register, name, label, viewData])

//     // Update form value when file changes
//     useEffect(() => {
//         if (setValue) {
//             console.log("Setting form value:", selectedFile) // Debug log
//             setValue(name, selectedFile, { 
//                 shouldValidate: true,
//                 shouldDirty: true 
//             })
//         }
//     }, [selectedFile, setValue, name])

//     const handleCancel = () => {
//         console.log("Cancel clicked") // Debug log
//         setPreviewSource("")
//         setSelectedFile(null)
//         if (setValue) {
//             setValue(name, null, { 
//                 shouldValidate: true,
//                 shouldDirty: true 
//             })
//         }
//         // Reset the input
//         if (inputRef.current) {
//             inputRef.current.value = ''
//         }
//     }

//     return (
//         <div className="flex flex-col space-y-2">
//             <label className="text-sm text-richblack-5" htmlFor={name}>
//                 {label} {!viewData && <sup className="text-pink-200">*</sup>}
//             </label>
//             <div
//                 className={`${
//                     isDragActive ? "bg-richblack-600" : "bg-richblack-700"
//                 } flex min-h-[250px] cursor-pointer items-center justify-center rounded-md border-2 border-dotted border-richblack-500 transition-colors duration-200`}
//             >
//                 {previewSource ? (
//                     <div className="flex w-full flex-col p-6">
//                         {!video ? (
//                             <img
//                                 src={previewSource}
//                                 alt="Preview"
//                                 className="h-full w-full rounded-md object-cover max-h-[200px]"
//                             />
//                         ) : (
//                             <Player aspectRatio="16:9" playsInline src={previewSource} />
//                         )}
//                         {selectedFile && (
//                             <div className="mt-2 text-xs text-richblack-300">
//                                 <p>File: {selectedFile.name}</p>
//                                 <p>Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
//                             </div>
//                         )}
//                         {!viewData && (
//                             <button
//                                 type="button"
//                                 onClick={handleCancel}
//                                 className="mt-3 text-richblack-400 underline hover:text-richblack-300 transition-colors"
//                             >
//                                 Cancel
//                             </button>
//                         )}
//                     </div>
//                 ) : (
//                     <div
//                         className="flex w-full flex-col items-center p-6"
//                         {...getRootProps()}
//                         onClick={handleClick}
//                     >
//                         <input 
//                             {...getInputProps()} 
//                             ref={inputRef}
//                             style={{ display: 'none' }} // Ensure it's hidden
//                         />
//                         <div className="grid aspect-square w-14 place-items-center rounded-full bg-pure-greys-800">
//                             <FiUploadCloud className="text-2xl text-yellow-50" />
//                         </div>
//                         <p className="mt-2 max-w-[200px] text-center text-sm text-richblack-200">
//                             Drag and drop an {!video ? "image" : "video"}, or click to{" "}
//                             <span className="font-semibold text-yellow-50">Browse</span> a
//                             file
//                         </p>
//                         <ul className="mt-10 flex list-disc justify-between space-x-12 text-center text-xs text-richblack-200">
//                             <li>Aspect ratio 16:9</li>
//                             <li>Recommended size 1024x576</li>
//                             <li>Max size: {video ? '100MB' : '10MB'}</li>
//                         </ul>
//                     </div>
//                 )}
//             </div>
//             {/* {errors[name] && (
//                 <span className="ml-2 text-xs tracking-wide text-pink-200">
//                     {errors[name]?.message || `${label} is required`}
//                 </span>
//             )} */}

//             {errors[name] && (
//               <span className="ml-2 text-xs tracking-wide text-pink-200">
//                 {label} is required
//               </span>
//             )}
//         </div>
//     )
// }

// export default Upload

import React, { useEffect, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUploadCloud } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { Player } from 'video-react';

import "video-react/dist/video-react.css";

const Upload = ({
  name,
  label,
  register,
  setValue,
  errors,
  video = false,
  viewData = null,
  editData = null,
}) => {
  const { course } = useSelector((state) => state.course);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(
    viewData ? viewData : editData ? editData : ""
  );

  const inputRef = useRef(null);

  const onDrop = (acceptedFiles) => {
    console.log("Files dropped:", acceptedFiles); // Debug log
    const file = acceptedFiles[0];
    if (file) {
      console.log("File selected:", file.name, file.size, file.type); // Debug log
      previewFile(file);
      setSelectedFile(file);
    }
  };

  const onDropRejected = (rejectedFiles) => {
    console.log("Files rejected:", rejectedFiles); // Debug log
    // You might want a more user-friendly toast message here
    alert("File type not supported or file is too large. Please upload a valid file.");
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: !video
      ? {
          "image/jpeg": [".jpeg", ".jpg"],
          "image/png": [".png"],
          "image/gif": [".gif"],
          "image/webp": [".webp"],
        }
      : {
          "video/mp4": [".mp4"],
          "video/quicktime": [".mov"],
          "video/x-msvideo": [".avi"],
        },
    onDrop,
    onDropRejected,
    multiple: false,
    maxFiles: 1,
    maxSize: video ? 100 * 1024 * 1024 : 10 * 1024 * 1024, // 100MB for video, 10MB for image
  });

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      console.log("File preview generated"); // Debug log
      setPreviewSource(reader.result);
    };
    reader.onerror = (error) => {
      console.error("Error reading file:", error);
      alert("Error reading file. Please try again.");
    };
  };

  // Handle click on the upload area (optional, as dropzone handles click on input)
  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  // Register field with react-hook-form
  useEffect(() => {
    if (register) {
      register(name, {
        required: !viewData ? `${label} is required` : false,
      });
    }
  }, [register, name, label, viewData]);

  // Update form value when file changes
  useEffect(() => {
    if (setValue) {
      console.log("Setting form value:", selectedFile); // Debug log
      setValue(name, selectedFile, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  }, [selectedFile, setValue, name]);

  const handleCancel = () => {
    console.log("Cancel clicked"); // Debug log
    setPreviewSource("");
    setSelectedFile(null);
    if (setValue) {
      setValue(name, null, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
    // Reset the input
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm text-richblack-5" htmlFor={name}>
        {label} {!viewData && <sup className="text-pink-200">*</sup>}
      </label>
      <div
        className={`${
          isDragActive ? "bg-richblack-600" : "bg-richblack-700"
        } flex min-h-[200px] sm:min-h-[250px] cursor-pointer items-center justify-center rounded-md border-2 border-dotted border-richblack-500 transition-colors duration-200 p-4 sm:p-6`} 
      >
        {previewSource ? (
          <div className="flex w-full flex-col p-2 sm:p-6"> 
            {!video ? (
              <img
                src={previewSource}
                alt="Preview"
                className="h-auto max-h-[180px] sm:max-h-[200px] w-full rounded-md object-cover" // Adjusted max-height, using h-auto for responsiveness
              />
            ) : (
              <Player aspectRatio="16:9" playsInline src={previewSource} />
            )}
            {selectedFile && (
              <div className="mt-2 text-xs text-richblack-300 break-words"> {/* Added break-words for long file names */}
                <p>File: {selectedFile.name}</p>
                <p>Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            )}
            {!viewData && (
              <button
                type="button"
                onClick={handleCancel}
                className="mt-3 text-richblack-400 underline hover:text-richblack-300 transition-colors text-sm" // Adjusted text size
              >
                Cancel
              </button>
            )}
          </div>
        ) : (
          <div
            className="flex w-full flex-col items-center p-4 sm:p-6 text-center" // Adjusted padding, added text-center
            {...getRootProps()}
            onClick={handleClick}
          >
            <input
              {...getInputProps()}
              ref={inputRef}
              style={{ display: 'none' }} // Ensure it's hidden
            />
            <div className="grid aspect-square w-12 sm:w-14 place-items-center rounded-full bg-pure-greys-800"> {/* Adjusted width */}
              <FiUploadCloud className="text-xl sm:text-2xl text-yellow-50" /> {/* Adjusted icon size */}
            </div>
            <p className="mt-2 max-w-[90%] text-sm text-richblack-200"> {/* Adjusted max-width for better wrapping */}
              Drag and drop an {!video ? "image" : "video"}, or click to{" "}
              <span className="font-semibold text-yellow-50">Browse</span> a
              file
            </p>
            <ul className="mt-6 sm:mt-10 flex flex-col sm:flex-row list-disc justify-center sm:space-x-12 text-center text-xs text-richblack-200"> {/* Adjusted top margin, changed to flex-col on mobile */}
              <li className='mb-1 sm:mb-0'>Aspect ratio 16:9</li> {/* Added margin-bottom for stacked items */}
              <li className='mb-1 sm:mb-0'>Recommended size 1024x576</li>
              <li>Max size: {video ? '100MB' : '10MB'}</li>
            </ul>
          </div>
        )}
      </div>
      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )}
    </div>
  );
};

export default Upload;