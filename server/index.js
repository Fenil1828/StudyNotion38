// Load environment variables FIRST before anything else
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.join(__dirname, '.env') });

const express = require("express");
const app = express();

//import routes
const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payment");
const courseRoutes = require("./routes/Course");
const chatRoutes = require("./routes/Chat");
const contactUsRoute = require("./routes/Contact");

const {cloudinaryConnect} = require("./config/cloudinary");

const database = require("./config/database");

const cookieParser = require("cookie-parser");

//corse use - froentend local machine hosted, backend hai vo froentend ki request ko entertain kare
const cors = require("cors");

//uploading multi-media
const fileUpload = require("express-fileupload");

const PORT = process.env.PORT || 4000;

//database connect
database.dbconnect();

//middleeare
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
        app.use(cors({origin:true,
    credentials:true,
}))

app.use(fileUpload({useTempFiles:true,tempFileDir:"/tmp"}))

//cloudinary connect
cloudinaryConnect();

//serve static files from build folder with correct MIME types
app.use(express.static(path.join(__dirname, '../build'), {
  setHeaders: (res, filepath) => {
    if (filepath.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css; charset=utf-8');
    } else if (filepath.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
    } else if (filepath.endsWith('.json')) {
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
    } else if (filepath.endsWith('.svg')) {
      res.setHeader('Content-Type', 'image/svg+xml; charset=utf-8');
    }
  }
}));

// SPA route - serve index.html for all unmatched routes
app.get(/^(?!\/api\/).*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

//routes
app.use("/api/v1/auth" , userRoutes);
app.use("/api/v1/profile" , profileRoutes);
app.use("/api/v1/course" , courseRoutes);
app.use("/api/v1/payment" , paymentRoutes);
app.use("/api/v1/reach", contactUsRoute);
app.use("/api/v1/chat", chatRoutes);

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