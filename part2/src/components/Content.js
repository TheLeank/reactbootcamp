import React from 'react'
import Part from './Part'

const Content = ({ content }) => {
    const totalExercises = () => {
        let total = 0
        content.map(part =>
            total += part.exercises
        )
        return total
    }

    return (
        <div>
            {content.map(part =>
                <Part key={part.id} name={part.name} exercises={part.exercises} />
            )}
            <strong>total of {totalExercises()}</strong>
        </div>
    )
}

export default Content