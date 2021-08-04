import React from 'react'
import Header from './Header'
import Content from './Content'

const Course = ({ course }) => (
    <div>
        <Header name={course.name} />
        <Content content={course.parts} />
    </div>
)

export default Course