const mongoose = require("mongoose")

const contactSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },

    firstname:{
        type:String
    },

    lastname:{
        type:String
    },

    message:{
        type:String
    },

    phoneNo:{
        type:String
    },

    countrycode:{
        type:String
    }


})

module.exports = mongoose.model("Contact" , contactSchema);