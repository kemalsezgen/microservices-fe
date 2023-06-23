import React from 'react'

const Course = ({ course }) => {
  return (
    <>
      <div className='courseCard'>
        <div className='coursePhoto'>
          <img src={course.image ? course.image : 'https://images.unsplash.com/photo-1620371350502-999e9a7d80a4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=740&q=80'}
            alt='course' />
        </div>
        <div className='course-cardText'>
          <div className='course-cardTextTop'>
            <h2><a href={`/course/${course.id}`}>{course.title}</a></h2>
            <p>Puan: {course.rate} / 5</p>
            <p id="viewProfile"><a href={`/course/${course.id}`}>{'>>>'}</a></p>
          </div>
          <p>{course.description ? course.description.length > 200 ? course.description.substring(0,200) + "..." : course.description : ""}</p>
        </div>
      </div>
    </>
  )
}

export default Course