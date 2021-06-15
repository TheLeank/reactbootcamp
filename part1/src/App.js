// Importamos useState
import React, { useState } from 'react'

const App = () => {
    const [counter, setCounter] = useState(0)

    const increaseByOne = () => setCounter(counter + 1)
    const decreaseByOne = () => setCounter(counter - 1)
    const setToZero = () => setCounter(0)

    return (
        <div>
            {/* Dado que ahora usamos componentes, el código es más corto
            y legible */}
            <Display counter={counter} />
            <Button handleClick={increaseByOne} text="plus" />
            <Button handleClick={decreaseByOne} text="minus" />
            <Button handleClick={setToZero} text="zero" />
        </div>
    )
}

// Creamos dos componentes, Display y Button, para poder reusarlos
// Además, podemos usar desestructuración. Sabemos que usaremos la prop counter
// por tanto podemos reemplazar (props) por ({ counter }) y así, usar dichos 
// nombres dentro del componente. Recuerda que el orden de los props se define
// por el orden en que son escritos los atributos al llamar al componente
const Display = ({ counter }) => {
    return <div>{counter}</div>
}

const Button = ({ handleClick, text }) => {
    return <button onClick={handleClick}>{text}</button>
}

export default App
