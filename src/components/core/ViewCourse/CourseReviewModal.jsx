
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { createRating } from '../../../services/operations/courseDetailsAPI';
import { RxCross2 } from 'react-icons/rx';
import ReactStars from "react-rating-stars-component";
import IconBtn from '../../common/IconBtn';

const CourseReviewModal = ({ setReviewModal }) => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { courseEntireData } = useSelector((state) => state.viewCourse);
  
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue("courseExperience", "");
    setValue("courseRating", 0);
  }, [setValue]);

  const ratingChanged = (newRating) => {
    setValue("courseRating", newRating);
  };

  const onSubmit = async (data) => {
    // Check if rating is provided
    if (!data.courseRating || data.courseRating === 0) {
      setSubmitError("Please provide a rating");
      return;
    }

    setLoading(true);
    setSubmitError(null);
    
    try {
      const response = await createRating(
        {
          courseId: courseEntireData._id,
          rating: data.courseRating,
          review: data.courseExperience,
        },
        token
      );
      
      if (response) {
        setSubmitSuccess(true);
        setTimeout(() => {
          setReviewModal(false);
        }, 1500);
      }
    } catch (error) {
      console.error("Review submission error:", error);
      setSubmitError(
        error.response?.data?.message || 
        "Failed to submit review. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='fixed inset-0 z-50 grid place-items-center bg-black/70 backdrop-blur-sm p-4'>
      <div className='relative w-full max-w-md rounded-xl bg-richblack-800 border border-richblack-600 shadow-2xl overflow-hidden'>
        <div className='flex items-center justify-between p-5 bg-richblack-700'>
          <h3 className='text-xl font-bold text-richblack-5'>Add Review</h3>
          <button 
            onClick={() => setReviewModal(false)}
            className='p-1 rounded-full hover:bg-richblack-600 transition-colors'
            disabled={loading}
          >
            <RxCross2 className='text-richblack-5 text-xl' />
          </button>
        </div>
        
        <div className='p-6'>
          {submitSuccess ? (
            <div className="flex flex-col items-center text-center py-8">
              <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-richblack-5 mb-2">Review Submitted!</h4>
              <p className="text-richblack-200">Thank you for your feedback.</p>
              <p className="text-richblack-200">This window will close shortly.</p>
            </div>
          ) : (
            <>
              <div className='flex items-center justify-center gap-4 mb-6'>
                <img 
                  src={user?.image} 
                  alt={user?.firstName + "profile"}
                  className='w-14 h-14 rounded-full object-cover border-2 border-richblack-500'
                />
                <div>
                  <p className='font-semibold text-richblack-5'>{user?.firstName} {user?.lastName}</p>
                  <p className='text-sm text-richblack-400'>Posting Publicly</p>
                </div>
              </div>
              
              <form
                onSubmit={handleSubmit(onSubmit)}
                className='flex flex-col items-center w-full'
              >
                <div className="mb-6">
                  <ReactStars
                    count={5}
                    onChange={ratingChanged}
                    size={32}
                    activeColor="#ffd700"
                    className="mx-auto"
                  />
                </div>

                <div className='w-full mb-4'>
                  <label htmlFor="courseExperience" className='block text-sm font-medium text-richblack-5 mb-2'>
                    Add Your Experience <sup className='text-pink-200'>*</sup>
                  </label>
                  <textarea
                    id="courseExperience"
                    placeholder='Share your thoughts about this course...'
                    {...register("courseExperience", {
                      required: "Please add your experience",
                      minLength: {
                        value: 5,
                        message: "Experience should be at least 10 characters long"
                      }
                    })}
                    className='w-full bg-richblack-700 border border-richblack-600 rounded-lg p-3 text-richblack-5 placeholder-richblack-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent min-h-[150px] resize-none'
                    rows={6}
                    maxLength={1000}
                    style={{
                      fontFamily: 'inherit',
                      fontSize: '14px',
                      lineHeight: '1.5',
                      whiteSpace: 'pre-wrap',
                      wordWrap: 'break-word'
                    }}
                    autoComplete="off"
                    spellCheck="true"
                  />
                  {errors.courseExperience && (
                    <span className='ml-2 text-xs tracking-wide text-pink-200 block mt-1'>
                      {errors.courseExperience.message}
                    </span>
                  )}
                  <div className="text-xs text-richblack-400 mt-1 text-right">
                    {watch("courseExperience")?.length || 0}/1000 characters
                  </div>
                </div>
                
                {submitError && (
                  <div className="w-full mb-4 p-3 bg-red-900/30 border border-red-500 rounded-lg">
                    <p className="text-red-300 text-sm">{submitError}</p>
                  </div>
                )}

                <div className='flex gap-3 w-full'>
                  <button
                    type="button"
                    onClick={() => setReviewModal(false)}
                    className='flex-1 py-3 px-4 bg-richblack-600 hover:bg-richblack-500 rounded-lg text-richblack-5 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                    disabled={loading}
                  >
                    Cancel
                  </button>
                  <IconBtn 
                    text={loading ? "Submitting..." : "Submit Review"} 
                    type="submit"
                    customClasses="flex-1 py-3"
                    disabled={loading}
                  />
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseReviewModal;
