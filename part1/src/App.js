import React, { useState } from 'react'

const App = () => {
    const [left, setLeft] = useState(0)
    const [right, setRight] = useState(0)
    // Esta vez el estado es un array, en el cuál almacenaremos cada click que
    // realicemos en los botones left y right
    const [allClicks, setAll] = useState([])

    const handleLeftClick = () => {
        // Además de aumentar el contador left, concatenamos la letra 
        // correspondiente. Importante: en react no se mutan los datos, sino que
        // se crean nuevos objetos añadiendo la nueva información. concat
        // devuelve un nuevo array al que se añade L, pero no modifica
        // directamente el valor de allClicks. De esto se encarga su función
        // setAll

        // En javascript también es posible usar allClicks.push('L') y
        // setAll(allClicks), y de hecho funciona en React, pero .push muta el
        // array, lo cuál está prohibido en React ya que puede ocasionar 
        // errores muy difíciles de depurar 
        setAll(allClicks.concat('L'))
        setLeft(left + 1)
    }

    const handleRightClick = () => {
        setAll(allClicks.concat('R'))
        setRight(right + 1)
    }

    return (
        <div>
            {left}
            <button onClick={handleLeftClick}>left</button>
            <button onClick={handleRightClick}>right</button>
            {right}
            <p>{allClicks.join(' ')}</p>
        </div>
    )
}

const Display = ({ counter }) => {
    return <div>{counter}</div>
}

const Button = ({ handleClick, text }) => {
    return <button onClick={handleClick}>{text}</button>
}

export default App
