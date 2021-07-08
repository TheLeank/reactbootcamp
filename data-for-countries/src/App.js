import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Country from './components/Country'
import axios from 'axios'

function App() {
  const [countries, setCountries] = useState([])
  const [filtCountries, setFiltCountries] = useState([])
  
  useEffect(() => {
    axios
        .get('https://restcountries.eu/rest/v2/all')
        .then(response => {
            setCountries(response.data)
        })
  }, [])

  const handleShow = (props) => {
    setFiltCountries(countries.filter(c => c.name === props.target.value))
  } 

  return (
    <div>
      <Filter 
        countries={countries}
        setFiltCountries={setFiltCountries}
      />
      {
        // Operador ternario con varias condiciones (else if).
        // Siempre ha de acabar : como si fuese un else, y no podrá acabar en
        // ? como si fuera un else if o da error
        filtCountries.length === 1 ? <Country country={filtCountries[0]} />
        : filtCountries.length < 11 ? filtCountries.map(c => 
          <p key={c.name}>{c.name}<button value={c.name} onClick={handleShow}>show</button></p>
        )
        : <p>too many matches, specify another filter</p>
      }
    </div>
  )
}

export default App;
