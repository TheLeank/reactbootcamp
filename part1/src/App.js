import React, { useState } from 'react'

const App = () => {
    // El estado puede ser cualquier tipo de estructura de datos. Pasamos de
    // usar int a object
    const [clicks, setClicks] = useState({
        left: 0,
        right: 0
    })

    // Usamos spread operator (...) para crear una copia del objeto (clicks)
    // con sus valores actuales, y modificamos la propiedad deseada
    const handleLeftClick = () => {
        setClicks({...clicks, left: clicks.left + 1})
    }

    const handleRightClick = () => {
        setClicks({...clicks, right: clicks.right + 1})
    }

    return (
        <div>
            {clicks.left}
            <button onClick={handleLeftClick}>left</button>
            <button onClick={handleRightClick}>right</button>
            {clicks.right}
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
