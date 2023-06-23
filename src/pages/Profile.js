import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";

import Course from "../components/Course";
import {GET_STUDENTS_COURSES} from "../api.js"
import {GET_INSTRUCTORS_UPLOADED_COURSES} from "../api.js"

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { id } = useParams();

  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [courses, setCourses] = useState();
  const [uploadedCourses, setUploadedCourses] = useState();
  const [role, setRole] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userProfile = await axios.get(`/users/find/${id}`)
        setUserProfile(userProfile.data)

        setRole(userProfile.role)

        const courses = await axios.get(GET_STUDENTS_COURSES + userProfile.id)
        setCourses(courses)

        /*
        const allCourses = [
          {
            id: "1",
            title: "Pyhton 101",
            description:
              "Bu kursta Python programlama diline giriş yapıyoruz. Bu kursta Python programlama diline giriş yapıyoruz. Bu kursta Python programlama diline giriş yapıyoruz. Bu kursta Python programlama diline giriş yapıyoruz.",
            image:
              "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Python.svg/640px-Python.svg.png",
            insturcor: "kemalsezgen",
            rate: "4.5",
          },
          {
            id: "2",
            title: "Java 101",
            description:
              "Bu kursta Java programlama diline giriş yapıyoruz. Bu kursta Java programlama diline giriş yapıyoruz. Bu kursta Java programlama diline giriş yapıyoruz. Bu kursta Java programlama diline giriş yapıyoruz.",
            image:
              "https://upload.wikimedia.org/wikipedia/tr/thumb/2/2e/Java_Logo.svg/1200px-Java_Logo.svg.png",
            insturcor: "kemalsezgen",
            rate: "4.6",
          },
        ];
        */

        //setCourses(allCourses);
        setLoading(false);
        //setRole(2);

        if (role === "instructor") {
          const instructorsCourses = await axios.get(GET_INSTRUCTORS_UPLOADED_COURSES + userProfile.id)
          setUploadedCourses(instructorsCourses)
        }

      } catch (err) {
        console.log("error", err);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="homepage-container">
        {role === "student" ? (
          <h1>Hey student {currentUser.username}</h1>
        ) : (
          <h1>Hey insturactor {currentUser.username}</h1>
        )}
        <h3>Here is courses you enrolled: </h3>
        <>
          <div className="courses-container">
            {isLoading ? (
              <div>
                <p>Loading...</p>
              </div>
            ) : (
              <div>
                <div className="courses">
                  {courses.map((course, id) => (
                    <Course key={id} course={course} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </>

        {role === 2 ? (
          <>
            <h3>Here is courses you uploaded: </h3>
            <>
              <div className="courses-container">
                {isLoading ? (
                  <div>
                    <p>Loading...</p>
                  </div>
                ) : (
                  <div>
                    <div className="courses">
                      {courses.map((course, id) => (
                        <Course key={id} course={course} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </>
          </>
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
};

export default Profile;
