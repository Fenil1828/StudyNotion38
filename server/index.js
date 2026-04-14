// Load environment variables FIRST
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.join(__dirname, ".env") });

const express = require("express");
const app = express();

const cors = require("cors");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");

// Routes
const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payment");
const courseRoutes = require("./routes/Course");
const chatRoutes = require("./routes/Chat");
const contactUsRoute = require("./routes/Contact");

// DB + Cloudinary
const database = require("./config/database");
const { cloudinaryConnect } = require("./config/cloudinary");

const PORT = process.env.PORT || 4000;

/* ================= MIDDLEWARE ================= */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);

/* ================= INIT SERVICES ================= */

database.dbconnect();
cloudinaryConnect();

/* ================= API ROUTES ================= */

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contactUsRoute);
app.use("/api/v1/chat", chatRoutes);

/* ================= ROOT TEST ================= */

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend is Running 🚀",
  });
});

/* ================= IMPORTANT: NO BUILD STATIC SERVING ================= */
/*
   ❌ DO NOT add:
   app.use(express.static("build"))
   app.get("*") sending index.html

   Because frontend is deployed separately on Vercel
*/

/* ================= START SERVER ================= */

app.listen(PORT, () => {
  console.log(`App is Running At ${PORT}`);
});