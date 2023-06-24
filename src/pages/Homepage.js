import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import Login from "./Login.js";
import Course from "../components/Course";
import {GET_ALL_COURSE} from "../api.js"

const Home = () => {
  const { currentUser } = useSelector((state) => state.user);

  const [isLoading, setLoading] = useState(true);
  const [courses, setCourses] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allCourses = await axios.get(GET_ALL_COURSE);
        /*
        const allCourses = [
          {
            id: "1",
            title: "Pyhton 101",
            description: "Bu kursta Python programlama diline giriş yapıyoruz. Bu kursta Python programlama diline giriş yapıyoruz. Bu kursta Python programlama diline giriş yapıyoruz. Bu kursta Python programlama diline giriş yapıyoruz.",
            image:"https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Python.svg/640px-Python.svg.png",
            insturcor: "kemalsezgen",
            rate: "4.5"
          },
          {
            id: "2",
            title: "Java 101",
            description:
              "Bu kursta Java programlama diline giriş yapıyoruz. Bu kursta Java programlama diline giriş yapıyoruz. Bu kursta Java programlama diline giriş yapıyoruz. Bu kursta Java programlama diline giriş yapıyoruz.",
            image: "https://upload.wikimedia.org/wikipedia/tr/thumb/2/2e/Java_Logo.svg/1200px-Java_Logo.svg.png",
            insturcor: "kemalsezgen",
            rate: "4.6"
          },
          {
            id: "3",
            title: "React 101",
            description:
              "Bu kursta React programlama diline giriş yapıyoruz. Bu kursta React programlama diline giriş yapıyoruz. Bu kursta React programlama diline giriş yapıyoruz. Bu kursta React programlama diline giriş yapıyoruz.",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png",
            insturcor: "kemalsezgen",
            rate: "5"
          },
          {
            id: "4",
            title: "Pyhton 101",
            description: "Bu kursta Python programlama diline giriş yapıyoruz. Bu kursta Python programlama diline giriş yapıyoruz. Bu kursta Python programlama diline giriş yapıyoruz. Bu kursta Python programlama diline giriş yapıyoruz.",
            image:"https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Python.svg/640px-Python.svg.png",
            insturcor: "kemalsezgen",
            rate: "4.5"
          },
          {
            id: "5",
            title: "Java 101",
            description:
              "Bu kursta Java programlama diline giriş yapıyoruz. Bu kursta Java programlama diline giriş yapıyoruz. Bu kursta Java programlama diline giriş yapıyoruz. Bu kursta Java programlama diline giriş yapıyoruz.",
            image: "https://upload.wikimedia.org/wikipedia/tr/thumb/2/2e/Java_Logo.svg/1200px-Java_Logo.svg.png",
            insturcor: "kemalsezgen",
            rate: "4.6"
          },
          {
            id: "6",
            title: "React 101",
            description:
              "Bu kursta React programlama diline giriş yapıyoruz. Bu kursta React programlama diline giriş yapıyoruz. Bu kursta React programlama diline giriş yapıyoruz. Bu kursta React programlama diline giriş yapıyoruz.",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png",
            insturcor: "kemalsezgen",
            rate: "5"
          },
          {
            id: "7",
            title: "Pyhton 101",
            description: "Bu kursta Python programlama diline giriş yapıyoruz. Bu kursta Python programlama diline giriş yapıyoruz. Bu kursta Python programlama diline giriş yapıyoruz. Bu kursta Python programlama diline giriş yapıyoruz.",
            image:"https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Python.svg/640px-Python.svg.png",
            insturcor: "kemalsezgen",
            rate: "4.5"
          },
          {
            id: "8",
            title: "Java 101",
            description:
              "Bu kursta Java programlama diline giriş yapıyoruz. Bu kursta Java programlama diline giriş yapıyoruz. Bu kursta Java programlama diline giriş yapıyoruz. Bu kursta Java programlama diline giriş yapıyoruz.",
            image: "https://upload.wikimedia.org/wikipedia/tr/thumb/2/2e/Java_Logo.svg/1200px-Java_Logo.svg.png",
            insturcor: "kemalsezgen",
            rate: "4.6"
          },
          {
            id: "9",
            title: "React 101",
            description:
              "Bu kursta React programlama diline giriş yapıyoruz. Bu kursta React programlama diline giriş yapıyoruz. Bu kursta React programlama diline giriş yapıyoruz. Bu kursta React programlama diline giriş yapıyoruz.",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png",
            insturcor: "kemalsezgen",
            rate: "5"
          },
        ]; */
        setCourses(allCourses.data);
        setLoading(false);
      } catch (err) {
        console.log("error", err);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {!currentUser ? (
        <Login />
      ) : (
        <div className="homepage-container">
          <h2>Welcome, {currentUser.name}</h2>
          <>
            <div className="courses-container">
              <h1>All Courses in Online Education Platform</h1>
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
        </div>
      )}
    </>
  );
};

export default Home;
