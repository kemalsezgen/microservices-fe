import React from 'react'

const Course = ({ course }) => {
  return (
    <>
      <div className='courseCard'>
        <div className='coursePhoto'>
          <img src={course.image ? course.image : 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png'}
            alt='course' />
        </div>
        <div className='course-cardText'>
          <div className='course-cardTextTop'>
            <h2><a href={`/course/${course.id}`}>{course.name}</a></h2>
            <p>Puan: 4.6 / 5</p>
            <p id="viewProfile"><a href={`/course/${course.id}`}>{'>>>'}</a></p>
          </div>
          <p>{course.description ? course.description.length > 200 ? course.description.substring(0,200) + "..." : course.description : ""}</p>
        </div>
      </div>
    </>
  )
}

export default Course