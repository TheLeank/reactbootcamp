// Importamos useState
import React, { useState } from 'react'

const App = () => {
    // Usando desestructuración, asignamos a counter y setCounter el valor
    // del estado (0 en este caso) y una función que nos permite alterar ese
    // estado (e.g. setCounter(5 | counter + 1) respectivamente
    const [counter, setCounter] = useState(0)

    const increaseByOne = () => setCounter(counter + 1)
    const setToZero = () => setCounter(0)

    return (
        <div>
            {/* En vez de tener el counter en App, refactorizamos para dividir
            la aplicación en varios componentes. De esta forma, creamos el
            componente Display, el cuál usaremos para mostrar el valor del 
            contador */}
            <Display counter={counter} />
            {/* Añadimos un handler a un button. Al usar useState y modificar el
            estado, el componente se re-renderizará. En este caso hemos usado
            arrow function directamente en el button, pero no es una buena
            práctica. Lo normal es crear la función en el cuerpo del componente
            y llamarla en el onClick i.e. onClick={increaseByOne} */}
            <button onClick={() => setCounter(counter + 1)}>
                plus
            </button>
            {/* En este caso usamos function reference en vez de function call, 
            que sería setToZero() */}
            <button onClick={setToZero}>
                zero
            </button>
        </div>
    )
}

export default App
