import React from 'react'
import ReactDOM from 'react-dom'

// En vez de usar props.name o props.age, podemos desestructurar la variable, 
// pues sabemos que el objeto tiene la siguiente estructura:
// props: {
//   name: 'Name',
//   age: 10
// }

const Hello = ({name, age}) => {

  // Cuando una función tiene una única sentencia y devuelve algo, podemos
  // eliminar return y {}
  const bornYear = () => new Date().getFullYear() - age

  return (
    <div>
      <p>
       Hello {name}, you are {age} years old
      </p>
      <p>So you were probably born in {bornYear()}</p>
    </div>
  )
}
  
const App = () => {
  const name = 'Peter'
  const age = 10

return (
  <div>
    <h1>Greetings</h1>
    <Hello name="Maya" age={26 + 10} />
    <Hello name={name} age={age} />
  </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)