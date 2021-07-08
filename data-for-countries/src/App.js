import { useState, useEffect } from 'react'
import Filter from './components/Filter'
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

  let show
  if (filtCountries.length > 10) {
    show = <p>too many matches, specify another filter</p>
  } else if (filtCountries.length < 11 && filtCountries.length > 1) {
    show = filtCountries.map(country => <p key={country.name}>{country.name}</p>)
  } else {
    show = filtCountries.map(country =>
      <div key={country.name}>
        <h1>{country.name}</h1>
        <p>capital {country.capital}</p>
        <p>population {country.population}</p>
        <h2>languages</h2>
        <ul>
          {country.languages.map(l => <li key={l.name}>{l.name}</li>)}
        </ul>
        <img src={country.flag} title={country.name + '-flag'} alt={country.name + '-flag image'} width='200px' />
      </div>
        
    )
  }

  return (
    <div>
      <Filter 
        countries={countries}
        setFiltCountries={setFiltCountries}
      />
      {show}
    </div>
  )
}

export default App;
