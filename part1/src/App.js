import React, { useState } from 'react'

const App = () => {
    const [value, setValue] = useState(10)

    // Dado que el return es una sola declaración, podemos eliminar las
    // variables, el return y sus llaves correspondientes. 
    const hello = (who) => () => {
         console.log('hello', who)
    }

    // Podemos usar estas funciones para establecer un valor dado en un estado
    const setToValue = (newValue) => () => {
        setValue(newValue)
    }

    return (
        <div>
            {value}
            <button onClick={hello('world')}>world</button>
            <button onClick={hello('react')}>react</button>
            <button onClick={hello('function')}>function</button>
            <button onClick={setToValue(1000)}>thousand</button>
            <button onClick={setToValue(0)}>reset</button>
            <button onClick={setToValue(value + 1)}>increment</button>
        </div>
    )
}

export default App
