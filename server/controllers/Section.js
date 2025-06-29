const Section = require("../models/Section");
const Course = require("../models/Course");
const SubSection = require("../models/SubSections")

//create section handler functions

exports.createSection = async (req,res) => {
    try{
        //data fetch
        const { sectionName, courseId} = req.body;

        //data validation
        if(!sectionName || !courseId){
            return res.status(400).json({
                success:false,
                message:"All fields are required",
            });
        }

        //create section
       
        const newSection = await Section.create({sectionName});
        
        console.log(newSection);

        //update course with section object id
        const updatedCourseDetails = await Course.findByIdAndUpdate(
            courseId,
            {
                $push:{
                    courseContent:newSection._id,
                }
            },
            {new:true},
        ).populate({
				path: "courseContent",
				populate: {
					path: "subSection",
				},
			})
			.exec();
            console.log("updated  course details :  " ,updatedCourseDetails)

        return res.status(200).json({
            success:true,
            message:"Section Create Successfully",
            updatedCourseDetails,
        })

    }
    catch(error){
        console.log(error);
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Unable to create section please try again",
            error:error.message,
        })
    }
}

//update section handler

exports.updateSection = async (req,res) => {
    try{
        //data fetch
        const { sectionName, sectionId, courseId } = req.body;

        //data validation
        if(!sectionName || !sectionId){
            return res.status(400).json({
                success:false,
                message:"All Fields are required",
            });
        }

        //update data
        const updateSectionDetails = await Section.findByIdAndUpdate(
            sectionId,
            {sectionName},
            {new:true},
        )

        const course = await Course.findById(courseId)
        .populate({
            path:"courseContent",
            populate: {
                path:"subSections"
            }
        })
        .exec()

        console.log(course)


        return res.status(200).json({
            success:true,
            data: course,
            message:"Section Updated Successfully",
        });

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Unable to update section, Please try again",
            error:error.message,
        })
    }
}

//delete section

exports.deleteSection = async (req,res) => {
    try{
        const { sectionId, courseId } = req.body;


        await Course.findByIdAndUpdate(courseId, {
            $pull: {
                courseContent: sectionId,
            }
        })

        //findanddelete
        const section =  await Section.findById(sectionId);
        console.log(section)

        if(!section){
            return res.status(404).json({
                success:false,
                message: "Section Not found"
            })
        }

        await SubSection.deleteMany({ _id: { $in: section.subSection}})

        await Section.findByIdAndDelete(sectionId)

         // find the updated course and return it
        const course = await Course.findById(courseId)
        .populate({
            path: "courseContent",
            populate: {
            path: "subSection",
            },
        })
        .exec()

        return res.status(200).json({
            success:true,
            data: course,
            message:"Section Deleted Successfully",
        });

    }
    catch(error){
        console.log(error);
    }
}