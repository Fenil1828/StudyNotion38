const express = require("express");
const app = express();

//import routes
const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payment");
const courseRoutes = require("./routes/Course");

const contactUsRoute = require("./routes/Contact");

const {cloudinaryConnect} = require("./config/cloudinary");

const database = require("./config/database");

const cookieParser = require("cookie-parser");

//corse use - froentend local machine hosted, backend hai vo froentend ki request ko entertain kare
const cors = require("cors");

//uploading multi-media
const fileUpload = require("express-fileupload");

//env fike
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 4000;

//database connect
database.dbconnect();

//middleeare
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({origin:"http://localhost:3000",
    credentials:true,
}))

app.use(fileUpload({useTempFiles:true,tempFileDir:"/tmp"}))

//cloudinary connect
cloudinaryConnect();

//routes
app.use("/api/v1/auth" , userRoutes);
app.use("/api/v1/profile" , profileRoutes);
app.use("/api/v1/course" , courseRoutes);
app.use("/api/v1/payment" , paymentRoutes);
app.use("/api/v1/reach", contactUsRoute);

//default
app.get("/" , (req,res) => {
    return res.status(200).json({
        success:true,
        message:"Your Server is Up and Running"
    })
});

app.listen(PORT , () => {
    console.log(`App is Running At ${PORT}`);
})