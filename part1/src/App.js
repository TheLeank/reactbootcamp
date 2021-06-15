import React, { useState } from 'react'

const App = () => {
    const [value, setValue] = useState(10)


    const hello = () => {
        const handler = () => console.log('hello world')
        return handler
    }

    return (
        <div>
            {value}
            {/* Normalmente no llamamos a una función desde un event, sin
            embargo en esta ocasión, llamar a hello() devuelve
            () => console.log('hello world'), lo que no produce un loop infinito
            Usar funciones que devuelven funciones es útil en ocasiones */}
            <button onClick={hello()}>reset to zero</button>
        </div>
    )
}

export default App
