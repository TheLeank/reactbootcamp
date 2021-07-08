const Filter = ({ countries, setFiltCountries }) => {
    const handleFilter = (e) => {
        setFiltCountries(countries.filter(c => c.name.search(new RegExp(e.target.value, "i")) !== -1))
    }

    return (
        <>
            find countries <input onChange={handleFilter}></input>
        </>
    )
}

export default Filter