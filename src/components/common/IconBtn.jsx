import React from 'react'

const IconBtn = (
    {
        text,
        onClick,
        children,
        disabled,
        outline = false,
        customClasses,
        type
    }
) => {

  return (
    <button
     disabled={disabled}
     onClick={onClick}
     className={`flex items-center ${outline ? "border border-yellow-50 bg-transparent" : "bg-yellow-50"}
     cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 ${customClasses}
     `}
     type={type}
     text={text}
    >
        {
            children ? (
                <>
                    <span className={`${outline && "text-yellow-50"}`}>
                        {text}
                    </span>
                    {children}
                </>
            ) : (text)
        }

    </button>
  )
}

export default IconBtn

// src/components/common/IconBtn.js
// import React from 'react';

// const IconBtn = ({ 
//   text, 
//   onClick, 
//   children, 
//   customClasses, 
//   type = "button",
//   disabled = false
// }) => {
//   return (
//     <button
//       type={type}
//       onClick={onClick}
//       disabled={disabled}
//       className={`flex items-center gap-2 bg-yellow-50 text-richblack-900 font-bold rounded-lg px-4 py-2 transition-all duration-200 hover:scale-95 hover:bg-yellow-100 disabled:opacity-60 disabled:cursor-not-allowed ${customClasses}`}
//     >
//       {children}
//       {text}
//     </button>
//   );
// };

// export default IconBtn;