const Country = ({ country }) => {
    return (
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

export default Country