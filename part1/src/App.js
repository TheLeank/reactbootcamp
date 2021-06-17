import React, { useState } from 'react'

const App = () => {
    const anecdotes = [
        'If it hurts, do it more often',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when dianosing patients'
    ]
    const [selected, setSelected] = useState({
        value: 0,
        // Creo un array de la longitud de anecdotes y lo relleno con ceros
        votes: new Array(anecdotes.length).fill(0),
        top: 0
    })

    // Handle functions 
    const handleClick = () => {
        const r = Math.floor(Math.random() * anecdotes.length)
        setSelected({
            ...selected,
            value: r
        })
    }

    const handleVote = () => {
        // Copio el array del estado, al cual añado el voto y posteriormente
        // lo guardo en el estad
        const newVotes = [...selected.votes]
        newVotes[selected.value] += 1
        // Usando spread operator podemos sacar fácilmente el mayor valor del
        // array
        const topValue = Math.max(...newVotes)
        // Dicho valor lo uso en una función para poder compararlo a los valores
        // del array usando findIndex, que usa como primer parámetro una función
        // y así, sacar la key del array donde se encuentra ese value
        const largest = (element) => element === topValue
        const key = newVotes.findIndex(largest)
        // Y finalmente actualizo el estado
        setSelected({
            ...selected,
            votes: newVotes,
            top: key
        })
        
    }

    return (
        <div>
            <h1>anecdote of the day</h1>
            <p>{anecdotes[selected.value]}</p>
            <p>has {selected.votes[selected.value]} votes</p>
            <div>
                <button onClick={handleVote}>vote</button>
                <button onClick={handleClick}>next anecdote</button>
            </div>
            <h1>anecdote with most votes</h1>
            <p>{anecdotes[selected.top]}</p>
            <p>has {selected.votes[selected.top]} votes</p>
        </div>
    )
}

export default App
