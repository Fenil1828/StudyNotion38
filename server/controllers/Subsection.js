const SubSection = require("../models/SubSections");
const Section = require("../models/Section");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

exports.createSubsection = async (req,res) =>{
    try{
        //data fetch
        const { sectionId , title, description} = req.body;

        //extract file/video
        const video = req.files.videoFile;
        
        // Check if all necessary fields are provided
        if (!sectionId || !title || !description || !video) {
        return res
            .status(404)
            .json({ success: false, message: "All Fields are Required" })
        }
        console.log(video)


        //upload video to cloudinary
        const uploadDetails = await uploadImageToCloudinary(video , process.env.FOLDER_NAME);

        //create a sub section
        const SubSectionDetails = await SubSection.create({
            title:title,
            timeDuration: `${uploadDetails.duration}`,
            description:description,
            videoUrl:uploadDetails.secure_url,
        });

        //update section with this sub section objectid,
        const updatedSection = await Section
                                .findByIdAndUpdate( {_id:sectionId},
                                                    {
                                                        $push:{
                                                            subSection:SubSectionDetails._id,
                                                        }
                                                    },{new:true}).populate("subSection")



        //return response,
        return res.status(200).json({
            success:true,
            data: updatedSection,
            message:"Sub Section Created Successfully",
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Failed to create subsection",
            error:error.message,
        })
    }
};

//update subsection

exports.updateSubSection = async (req,res) => {
    try{
        //get data - data extraction and validation
        const { subSectionId , title, timeDuration, description} = req.body;

        //extract file/video
        const video = req.files.videoFile;

        //validation
        if(!subSectionId){
            return res.status(400).json({
                success:false,
                message:"SubSection ID is required",
            });
        }

        //find data - means ke existing hoy e toj update thay ne
        const existingSubSection = await SubSection.findById(subSectionId);
        if(!existingSubSection){
            return res.status(404).json({
                success:false,
                message:"SubSection not found",
            })
        }

        //video update handler
        let videoUrl = existingSubSection.videoUrl;
        if(videoFile){
            const uploadDetails = await uploadImageToCloudinary(videoFile , process.env.FOLDER_NAME);
            videoUrl = uploadDetails.secure_url;

            //add old video deletion if want
        }

        //befor push create updtatesubsectipn details
        const updateSubSectionDetails = {
            title:title,
            description:description,
            timeDuration:timeDuration,
            videoUrl:videoUrl.secure_url,
        }

        //update data
        const updatedsubsection = await SubSection.findByIdAndUpdate(subSectionId ,
            {
                $push:{
                    subSection:updateSubSectionDetails,
                }
            },
            {new :true },
        );
        //send response
            res.status(200).json({
            success: true,
            message: "SubSection updated successfully",
            data: updatedsubsection
    });


    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Failed To Update Subsection",
            error:error.message
        })
    }
}


//delete subsection

exports.deleteSubSection = async (req,res) => {
    try{
        //get data - means subsection id
        const { subSectionId } = req.body

        //validation
        if(!subSectionId){
            return res.status(404).json({
                success:false,
                message:"SUbSection Not found || SubSection Id is required",
            });
        }

        //find subsubsection details //update and delete
        await SubSection.findByIdAndDelete(subSectionId);

        //send response
        return res.status(200).json({
            success:true,
            message:"Delete Subsection Successfully",
        })

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Failed to Delete Sub Section",
        })
    }
}
