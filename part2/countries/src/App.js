import axios from 'axios'
import { useState, useEffect } from 'react'
function App() {
  const [newFilter, setFilter] = useState('')
  const [countries, setCountries] = useState([])


  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then(response => {
      console.log(response.data.map(country => country.name.common))
      console.log(newFilter)
      setCountries(response.data.map(country => country.name.common).filter(name => name.includes(newFilter)))
    })
  }, [newFilter])

  const handleFilterChange = (event) =>
  {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  const textToShow = countries.length > 10 ? <p>Too many matches</p> : countries.map(country => <p>{country}</p>)

  return (
    <div>
      <p>Find countries</p>
      <input value={newFilter} onChange={handleFilterChange}/>
      {textToShow}
    </div>
  );
}

export default App;
