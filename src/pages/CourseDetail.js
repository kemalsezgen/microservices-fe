import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux';

const CourseDetail = () => {

  const { currentUser } = useSelector((state) => state.user);

  const [course, setCourse] = useState();
  const [instructor, setInstructor] = useState();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        //const currentPost = await axios.get(`/posts/${id}`)
        //setPost(currentPost.data)

        const currentCourse = {
            id: "1",
            title: "Pyhton 101",
            description: "Bu kursta Python programlama diline giriş yapıyoruz. Bu kursta Python programlama diline giriş yapıyoruz. Bu kursta Python programlama diline giriş yapıyoruz. Bu kursta Python programlama diline giriş yapıyoruz.",
            image:"https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Python.svg/640px-Python.svg.png",
            insturcor: "kemalsezgen",
        }

        setCourse(currentCourse)
        setInstructor({_id: "123456", name: "kemal", email: "kemal@gmail.com", username: "kemalsezgen"})

        //const user = await axios.get(`/users/find/${currentPost.data.userId}`)
        //setPostOwner(user.data);
      } catch (err) {
        console.log("error", err);
      }
    };

    fetchData();
  }, [id]);

  const handleEnroll = () => {
    try {
      //const response = await axios.get('/enroll/${currentUser._id}/${course._id}');
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelist = () => {
    try {
      //const response = await axios.get('/delist/${currentUser._id}/${course_id}');
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className="coursePage-container">
        {course && (
          <>
            <div className="coursePage-header">
              {instructor ? (
                <>
                <h2>
                  <a href={`/profile/${instructor._id}`}>{instructor.username}</a>
                </h2>
                {
                  currentUser.username === "kemalsezgen" ? <button className="enrollButton" onClick={handleEnroll}>KAYDOL</button> 
                  : <button className="delistButton" onClick={handleDelist}>KAYDINI SİL</button>
                }
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
