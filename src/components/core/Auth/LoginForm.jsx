import { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

import { login } from "../../../services/operations/authAPI"
import GoogleOAuthButton from "./GoogleOAuthButton"
// import GoogleOAuthButton from "./GoogleOAuthButton"
// import GoogleOAuthButton from "./GoogleOAuthButton"
// import GoogleButton from "./GoogleOAuthButton"

function LoginForm() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const [showPassword, setShowPassword] = useState(false)

  const { email, password } = formData

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData, 
      [e.target.name]: e.target.value,
    }))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    dispatch(login(email, password, navigate))
  }

  return (
    <form
      onSubmit={handleOnSubmit}
      className="mt-6 flex w-full flex-col gap-y-4"
    >
      <label className="w-full">
        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
          Email Address <sup className="text-pink-200">*</sup>
        </p>
        <input
          required
          type="text"
          name="email"
          value={email}
          onChange={handleOnChange}
          placeholder="Enter email address"
          className="form-style w-full"
        />
      </label>

      <label className="relative">
        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
          Password <sup className="text-pink-200">*</sup>
        </p>
        <input
          required
          type={showPassword ? "text" : "password"}
          name="password"
          value={password}
          onChange={handleOnChange}
          placeholder="Enter Password"
          className="form-style w-full !pr-10"
        />
        <span
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-[38px] z-[10] cursor-pointer"
        >
          {showPassword ? (
            <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
          ) : (
            <AiOutlineEye fontSize={24} fill="#AFB2BF" />
          )}
        </span>
        
        <Link to="/forgot-password">
          <p className="mt-1 ml-auto max-w-max text-xs text-blue-100">
            Forgot Password
          </p>
        </Link>
      </label>

      <button
        type="submit"
        className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
      >
        Sign In
      </button>



       <div>
        <GoogleOAuthButton
        />
      </div>

    </form>
  )
}

export default LoginForm

















// // 3. Enhanced Login Component - components/LoginForm.jsx
// import React, { useState } from 'react';
// import GoogleOAuth from './GoogleOAuth';
// import useGoogleAuth from '../hooks/useGoogleAuth';

// const LoginForm = () => {
//     const [formData, setFormData] = useState({
//         email: '',
//         password: ''
//     });
//     const [isLoading, setIsLoading] = useState(false);
    
//     const { 
//         initiateGoogleLogin, 
//         isLoading: googleLoading, 
//         error: googleError,
//         clearError
//     } = useGoogleAuth();

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({
//             ...prev,
//             [name]: value
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setIsLoading(true);
        
//         try {
//             // Your existing login logic here
//             const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/auth/login`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 credentials: 'include',
//                 body: JSON.stringify(formData),
//             });

//             const data = await response.json();
            
//             if (data.success) {
//                 // Handle successful login
//                 localStorage.setItem('token', data.token);
//                 // Navigate to dashboard or update context
//             } else {
//                 // Handle login error
//                 console.error(data.message);
//             }
//         } catch (error) {
//             console.error('Login error:', error);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return (
//         <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
//             <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>
            
//             {/* Google OAuth Button */}
//             <div className="mb-4">
//                 <GoogleOAuth />
//                 {googleError && (
//                     <div className="mt-2 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
//                         {googleError}
//                         <button 
//                             onClick={clearError}
//                             className="ml-2 text-red-800 hover:text-red-900"
//                         >
//                             ×
//                         </button>
//                     </div>
//                 )}
//             </div>

//             {/* Divider */}
//             <div className="relative my-6">
//                 <div className="absolute inset-0 flex items-center">
//                     <div className="w-full border-t border-gray-300"></div>
//                 </div>
//                 <div className="relative flex justify-center text-sm">
//                     <span className="px-2 bg-white text-gray-500">Or continue with email</span>
//                 </div>
//             </div>

//             {/* Regular Login Form */}
//             <form onSubmit={handleSubmit} className="space-y-4">
//                 <div>
//                     <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                         Email
//                     </label>
//                     <input
//                         type="email"
//                         id="email"
//                         name="email"
//                         value={formData.email}
//                         onChange={handleInputChange}
//                         required
//                         className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                     />
//                 </div>

//                 <div>
//                     <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                         Password
//                     </label>
//                     <input
//                         type="password"
//                         id="password"
//                         name="password"
//                         value={formData.password}
//                         onChange={handleInputChange}
//                         required
//                         className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                     />
//                 </div>

//                 <button
//                     type="submit"
//                     disabled={isLoading || googleLoading}
//                     className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                     {isLoading ? 'Signing in...' : 'Sign in'}
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default LoginForm;






