import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Course from "../components/Course";
import { GET_STUDENTS_COURSES, GET_USER, GET_ALL_COURSE } from "../api.js";
import { GET_INSTRUCTORS_UPLOADED_COURSES } from "../api.js";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { id } = useParams();
  const navigate = useNavigate();

  const [userProfile, setUserProfile] = useState();
  const [isLoading, setLoading] = useState(true);
  const [courses, setCourses] = useState();
  const [uploadedCourses, setUploadedCourses] = useState();
  const [role, setRole] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userProfileResponse = await axios.get(GET_USER + id);
        const userProfile = userProfileResponse.data;
        setUserProfile(userProfile);

        const coursesResponse = await axios.get(
          GET_STUDENTS_COURSES + userProfile.id
        );
        const coursesData = coursesResponse.data;
        const enrolledCourseIds = coursesData.map((course) => course.courseId);

        const allCoursesResponse = await axios.get(GET_ALL_COURSE);
        const allCourses = allCoursesResponse.data;
        const enrolledCourses = allCourses.filter((course) =>
          enrolledCourseIds.includes(course.id)
        );
        setCourses(enrolledCourses);

        setLoading(false);

        const instructorsCoursesResponse = await axios.get(
          GET_INSTRUCTORS_UPLOADED_COURSES + id
        );
        const instructorsCourses = instructorsCoursesResponse.data;
        setUploadedCourses(instructorsCourses);
      } catch (err) {
        console.log("error", err);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="homepage-container">
        {userProfile && (
          <>
            {userProfile.role === "student" ? (
              <h1>student {userProfile.username}</h1>
            ) : (
              <>
                <h1>instructor {userProfile.username}</h1>
                <button
                  className="uploadButton"
                  onClick={() => navigate("/upload")}
                >
                  KURS YÜKLE
                </button>
              </>
            )}
          </>
        )}
        <h3>Here are the courses you enrolled in: </h3>
        {courses && (
          <>
            <div className="courses-container">
              {isLoading ? (
                <div>
                  <p>Loading...</p>
                </div>
              ) : (
                <>
                  <div>
                    {courses && (
                      <div className="courses">
                        {courses.map((course, id) => (
                          <Course key={id} course={course} />
                        ))}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </>
        )}

        {userProfile && userProfile.role === "instructor" && (
          <>
            <h3>Here are the courses you uploaded: </h3>
            <>
              <div className="courses-container">
                {isLoading ? (
                  <div>
                    <p>Loading...</p>
                  </div>
                ) : (
                  <div>
                    {uploadedCourses && (
                      <div className="courses">
                        {uploadedCourses.map((course, id) => (
                          <Course key={id} course={course} />
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </>
          </>
        )}
      </div>
    </>
  );
};

export default Profile;
