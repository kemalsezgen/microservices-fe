import {useState} from 'react'
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import "./app.css";

//pages
import Homepage from "./pages/Homepage.js";
import Profile from "./pages/Profile.js"
import Login from "./pages/Login.js";
import Register from "./pages/Register.js";
import CourseDetail from "./pages/CourseDetail.js";
import AboutUs from './pages/AboutUs';
import UploadCourse from './pages/UploadCourse';

//components
import Navbar from "./components/Navbar";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <div className="outlet">
        <Outlet />
      </div>
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Homepage /> },
      { path: "/profile/:id", element: <Profile /> },
      { path: "/login", element: <Login />},
      { path: "/signout", element: <Login />},
      { path: "/register", element: <Register />},
      { path: "/course/:id", element: <CourseDetail />},
      { path: "/about", element: <AboutUs />},
      { path: "/upload", element: <UploadCourse />}
    ]
  }
])

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
