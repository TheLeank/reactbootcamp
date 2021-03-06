import React from 'react'
import Part from './Part'

const Content = ({ content }) => {
    const totalExercises = content.reduce((sum, current) => {
        return sum.exercises + current.exercises
    })
    
    return (
        <div>
            {content.map(part =>
                <Part key={part.id} name={part.name} exercises={part.exercises} />
            )}
            <strong>total of {totalExercises}</strong>
        </div>
    )
}

export default Content