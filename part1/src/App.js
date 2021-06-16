import React, { useState } from 'react'

const App = () => {
    const [feedback, setFeedback] = useState({
        good: 0,
        neutral: 0,
        bad: 0,
        all: 0
    })

    const handleGood = () => {
        setFeedback({
            ...feedback,
            good: feedback.good + 1,
            all: feedback.all + 1
        })
    }
    
    const handleNeutral = () => {
        setFeedback({
            ...feedback,
            neutral: feedback.neutral + 1,
            all: feedback.all + 1
        })
    }
    
    const handleBad = () => {
        setFeedback({
            ...feedback,
            bad: feedback.bad + 1,
            all: feedback.all + 1
        })
    }   

    return (
        <div>
            <h1>give feedback</h1>
            <Button handleClick={handleGood} text='good' />
            <Button handleClick={handleNeutral} text='neutral' />
            <Button handleClick={handleBad} text='bad' />
            <h1>statistics</h1>
            <table>
                <tbody>
                    <Statistics text='good' value={feedback.good} />
                    <Statistics text='neutral' value={feedback.neutral} />
                    <Statistics text='bad' value={feedback.bad} />
                    <Statistics text='all' value={feedback.all} />
                    <Statistics text='average' value={(feedback.good - feedback.neutral) / feedback.all} />
                    <Statistics text='positive' value={(feedback.good * 100) / feedback.all} />
                </tbody>
            </table>
        </div>
    )
}

const Button = ({ handleClick, text }) =>
        <button onClick={handleClick}>{text}</button>
    

const Statistics = ({ text, value }) => {
    if (value === 0) {
        return <tr><td>No feedback given</td></tr>
    }
    
    return (
    <tr>
        <td>{text}</td>
        <td>{value}</td>
    </tr>
    )
}


export default App
