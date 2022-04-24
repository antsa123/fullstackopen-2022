import axios from 'axios'
import { useState, useEffect } from 'react'
import CountryInfo from './components/CountryInfo'

function App() {
  const [newFilter, setFilter] = useState('')
  const [countries, setCountries] = useState([])


  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then(response => {
      console.log(response.data.map(country => country.name.common).filter(name => name.toLowerCase().includes(newFilter)))
      setCountries(response.data.filter(country => country.name.common.toLowerCase().includes(newFilter)))
    })
  }, [newFilter])

  const handleFilterChange = (event) =>
  {
    setFilter(event.target.value)
  }

  return (
    <div>
      <p>Find countries</p>
      <input value={newFilter} onChange={handleFilterChange}/>
      <CountryInfo countries={countries}/>
    </div>
  );
}

export default App;
