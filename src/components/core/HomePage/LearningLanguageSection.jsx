import React from 'react'
import HighlightText from './HighlightText'
import CTAButton from "../HomePage/Button"

// import moduleName from 'module'

import Know_your_progress from "../../../assets/Images/Know_your_progress.png";
import Compare_with_others from "../../../assets/Images/Compare_with_others.svg";
import Plan_your_lessons from "../../../assets/Images/Plan_your_lessons.svg";

const LearningLanguageSection = () => {
  return (
    <div className='mb-4'>
      <div className='flex flex-col gap-5'>

            <div className='text-4xl font-semibold text-center '>
                Your swiss Knife for
                <HighlightText text={"learning any language"}/>

                <div className='text-center text-richblack-700 mx-auto text-base font-semibold lg:w-[75%] leading-6 mt-3'>
                Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, 
                progress tracking, custom schedule and more.
                </div>
            </div>

            <div className='flex flex-col lg:flex-row items-center justify-center mt-8 lg:mt-0'>
                <img src={Know_your_progress} 
                alt="" 
                className='object-contain lg:-mr-32 '
                />
                <img src={Compare_with_others}
                 alt="" 
                 className='object-contain lg:-mb-10 lg:-mt-0 -mt-12' 
                 />
                <img src={Plan_your_lessons}
                 alt="" 
                 className='object-contain lg:-ml-36 lg:-mt-5 -mt-16'
                 />
            </div>

            <div className='w-fit mx-auto lg:mb-20 mb-7 '>
                <CTAButton active={true} linkto={"/signup"}> 
                    <div>Learn More</div>
                </CTAButton>
            </div>

      </div>
    </div>
  )
}

export default LearningLanguageSection
