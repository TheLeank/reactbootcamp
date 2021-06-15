import React, { useState } from 'react'

const App = () => {
    const [value, setValue] = useState(10)

    // Ahora pasámos un parámetro a hello
    const hello = (who) => {
        const handler = () => console.log('hello', who)
        return handler
    }

    return (
        <div>
            {value}
            {/* Y llamamos a hello dando diferentes parámetros, creando así
            una función genérica */}
            <button onClick={hello('world')}>button</button>
            <button onClick={hello('react')}>button</button>
            <button onClick={hello('function')}>button</button>
        </div>
    )
}

export default App
