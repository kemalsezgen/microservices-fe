import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  GET_COURSE,
  GET_USER,
  ENROLL,
  DELIST,
  GET_STUDENTS_COURSES,
} from "../api.js";

const CourseDetail = () => {
  const { currentUser } = useSelector((state) => state.user);

  const [course, setCourse] = useState();
  const [instructor, setInstructor] = useState();
  const [isEnrolled, setIsEnrolled] = useState();
  const { id } = useParams();

  const fetchData = async () => {
    try {
      const currentCourseResponse = await axios.get(GET_COURSE + id);
      const currentCourse = currentCourseResponse.data;
      setCourse(currentCourse);

      const instructorResponse = await axios.get(
        GET_USER + currentCourse.instructorId
      );
      const instructor = instructorResponse.data;
      setInstructor(instructor);

      const studentCoursesResponse = await axios.get(
        GET_STUDENTS_COURSES + currentUser.id
      );
      const studentCourses = studentCoursesResponse.data;

      const enrolled = studentCourses.some((c) => c.courseId === currentCourse.id);

      setIsEnrolled(enrolled);
    } catch (err) {
      console.log("error", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleEnroll = async () => {
    try {
      const response = await axios.post(
        ENROLL + "?courseId=" + course.id + "&studentId=" + currentUser.id
      );
      fetchData(); // Fetch updated data after enrollment
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelist = async () => {
    try {
      console.log("unenroll deneme");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="coursePage-container">
        {course && (
          <>
            <div className="coursePage-header">
              {instructor ? (
                <>
                  <h2>
                    <a href={`/profile/${instructor.id}`}>
                      {instructor.username}
                    </a>
                  </h2>
                  {isEnrolled ? (
                    <button className="delistButton" onClick={handleDelist}>
                      KAYDINI SİL
                    </button>
                  ) : (
                    <button className="enrollButton" onClick={handleEnroll}>
                      KAYDOL
                    </button>
                  )}
                </>
              ) : (
                "-"
              )}
            </div>
            <div className="coursePage-photo">
              <img
                src={
                  course && course.image
                    ? course.image
                    : "https://images.unsplash.com/photo-1620371350502-999e9a7d80a4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=740&q=80"
                }
                alt="course"
              ></img>
            </div>
            <div className="coursePage-content">
              <h1>{course && course.title}</h1>
              <p>{course && course.description}</p>
            </div>
          </>
        )}
      </div>
      <div className="empty">
        <p>..</p>
      </div>
    </>
  );
};

export default CourseDetail;
