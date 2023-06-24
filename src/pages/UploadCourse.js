import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import { CREATE_COURSE, UPLOAD_VIDEO } from "../api.js";

const UploadCourse = () => {
  const { currentUser } = useSelector((state) => state.user);

  const [course, setCourse] = useState({
    name: "",
    courseTypeId: 1,
    price: 0,
    instructorId: currentUser.id,
    description: "",
  });

  const [videoData, setVideoData] = useState({
    video: "",
    name: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(CREATE_COURSE, course);
    } catch (error) {
      console.log(error);
    }
  };

  const handleVideoUpload = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(UPLOAD_VIDEO, course);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    setCourse({
      ...course,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      {currentUser.role === "student" ? (
        <div>
          <h1>Öğrenciler bu alana giremez.</h1>
        </div>
      ) : (
        <>
          <h1>Öğretmenler için yükleme alanı</h1>
          <div className="loginForm">
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="formInput">
                <input
                  value={course.name}
                  type="text"
                  name="name"
                  placeholder="Course Name"
                  onChange={handleInputChange}
                />
              </div>

              <div className="formInput">
                <select
                  value={course.courseTypeId}
                  name="courseTypeId"
                  onChange={handleInputChange}
                >
                  <option value={1}>Software</option>
                  <option value={2}>Finance</option>
                  <option value={3}>Music</option>
                  <option value={4}>Design</option>
                  <option value={5}>Marketing</option>
                </select>
              </div>

              <div className="formInput">
                <input
                  value={course.price}
                  type="text"
                  name="price"
                  placeholder="Price"
                  onChange={handleInputChange}
                />
              </div>

              <div className="formInput">
                <textarea
                  id="courseDescription"
                  type="text"
                  name="description"
                  value={course.description}
                  placeholder="Text here course description."
                  onChange={handleInputChange}
                />
              </div>

              <button className="createPostFormButton" type="submit">
                Create
              </button>
            </form>
          </div>
          <div id="video-list">
            <header>
              <h3>Your videos</h3>
            </header>
            <ul id="your-videos"></ul>
          </div>
          <div id="video-player">
            <header>
              <h3 id="now-playing"></h3>
            </header>
            <video
              id="video-screen"
              width="720px"
              height="480px"
              controls
            ></video>
          </div>

          <form id="video-form" onSubmit={(e) => handleVideoUpload(e)}>
            <fieldset>
              <legend>Upload a video</legend>
              <label for="file">Video File</label>
              <input
                id="file"
                name="file"
                type="file"
                accept="application/mp4"
              />

              <div className="formInput">
                <input
                  value={videoData.video}
                  type="text"
                  name="name"
                  placeholder="video name"
                  onChange={handleInputChange}
                />
              </div>
              <button type="submit" className="createPostFormButton">
                Save
              </button>
            </fieldset>
          </form>
        </>
      )}
    </>
  );
};

export default UploadCourse;
