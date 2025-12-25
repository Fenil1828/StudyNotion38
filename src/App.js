import "./App.css";
import { Route,Routes, useNavigate, useParams } from "react-router-dom";
import Home from "./Pages/Home";
// import Login from "./Pages/Login";
// import ErrorBoundary from "./components/core/Auth/ErrorBoundary ";
import Navbar from "./components/common/Navbar";
import OpenRoute from "./components/core/Auth/OpenRoute";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import VerifyEmail from "./Pages/VerifyEmail";
import ForgotPassword from "./Pages/ForgotPassword";
import UpdatePassword from "./Pages/UpdatePassword";
import About from "./Pages/About";
import Contact from "./Pages/Contact"
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import Dashboard from "./Pages/Dashboard";
import MyProfile from "./components/core/Dashboard/MyProfile";
import Settings from "./components/core/Dashboard/Settings";
import { ACCOUNT_TYPE } from "./utils/constants";
// import Cart from "./components/core/Dashboard/Cart";
import { useDispatch, useSelector } from "react-redux";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import Cart from "./components/core/Dashboard/Cart";
import { useEffect } from "react";
import { jsx } from "react/jsx-runtime";
import { getUserDetails } from "./services/operations/profileAPI";
import AddCourse from "./components/core/Dashboard/AddCourse";
import Instructor from "./components/core/Dashboard/Instructor";
import MyCourses from "./components/core/Dashboard/MyCourses";
import Catalog from "./Pages/Catalog";
import EditCourse from "./components/core/Dashboard/EditCourse";
import Error from "./Pages/Error";
import CourseDetails from "./Pages/CourseDetails";
import ViewCourse from "./Pages/ViewCourse";
import VideoDetails from "./components/core/ViewCourse/VideoDetails";
import Ai from "./components/core/Course/Ai";


function App() {

  const { user} = useSelector((state) => state.profile)

  const dispatch = useDispatch()
  const navigate = useNavigate()


  useEffect(() => {
    if(localStorage.getItem("token")){
      const token = JSON.parse(localStorage.getItem("token"))
      dispatch(getUserDetails(token,navigate ))
    }
  }, [])


  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <div className="mb-[64px] ">
        <Navbar/>
         {/* <Ai /> */}
      </div>
      

      <Routes>

        <Route path="/" element={<Home/>} ></Route>
        <Route path="/about" element={<About/>}></Route>
        <Route path="/contact" element={<Contact/>}></Route>       
        <Route path="/courses/:courseId" element={<CourseDetails />}></Route>
        {/* <Route path="/catalog/:catalogName" element={<Catalog/>}></Route> */}
        
        {/* Open Route - for Only Non Logged in User */}
        <Route path="login" element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />

        {/* //forgot-password */}
        <Route
          path="forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />

        {/* //update Password */}
        <Route
         path="update-password/:id"
         element={
          <OpenRoute>
            <UpdatePassword/>
          </OpenRoute>
         }
        />

        {/* Open Route - for Only Non Signup in User */}
        <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />

        {/* verify-email */}

        <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerifyEmail/>
            </OpenRoute>
          }
        />


        {/* //private route for only logged users */}
        <Route
          element={
            <PrivateRoute>
              <Dashboard/>
            </PrivateRoute>
          }
        >


              <Route path="dashboard/my-profile" element={<MyProfile/>} />
              {/* <Route path="dashboard/settings" element={<Settings />} /> */}


             {/* {
               user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
              <>
                <Route path="/dashboard/instructor" element={<Instructor/>} />
                <Route path="/dashboard/my-courses" element={<MyCourses/>} />
                <Route path="dashboard/add-course" element={<AddCourse/>} />

                <Route path="dashboard/edit-course/:courseId" element={<EditCourse/>} />
              </>
            )
          } */}

                
          {/* {
            user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
              <Route path="dashboard/enrolled-courses" element={<EnrolledCourses />} />
            
              <Route path="/dashboard/cart" element={<Cart />} />
              
              <Route path="dashboard/settings" element={<Settings />} />
              
              </>
            )
          } */}
          </Route>



        {/* <Route
          element={
            <PrivateRoute>
              <ViewCourse />
            </PrivateRoute>
          }
        >
          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route
                path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                element={<VideoDetails />}
              />
            </>
          )}
        </Route> */}

          {/* For the watching course lectures */}

        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
